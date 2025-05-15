import os
import uuid
import time
import asyncio
from typing import Dict, Optional, Any, List
from pydantic import BaseModel, Field
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import google.generativeai as genai
from dotenv import load_dotenv
import logging
from google.genai import types
import re

# Configure logging
logging.basicConfig(level=logging.INFO, 
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Load environment variables from .env file
load_dotenv()

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Google Generative AI
API_KEY = os.getenv("GOOGLE_API_KEY", "")  # Default to empty string if not found

# Log API key status (not the key itself)
logger.info(f"API Key found: {bool(API_KEY)}")
genai.configure(api_key=API_KEY)  # Configure will raise its own error if needed

# Create the model with safer settings
generation_config = {
    "temperature": 1.5,  
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 4096,  
    "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
    model_name="gemini-2.5-flash-preview-04-17", 
    system_instruction="""You are a helpful fitness expert creating workout plans. Be clear, specific and professional.You are a helpful fitness expert creating workout plans. Be clear, specific and professional. Always provide your response in a structured format with sections for Warm-up, Main Workout, and Cool-down.
      Give proper workouts for the user based on the data provided in the prompt.Provide different exercises for each day of the week. Include sets, reps, and focus areas for each exercise and include a warm-up and cool-down section and and make tables and bullet points for easy readability. and add a summary of the workout at the end and add a note about the importance of hydration and nutrition, add a note about the importance of rest and recovery, and add a note about the importance of proper form and technique. Always provide your response in a structured format with sections for Warm-up, Main Workout, and Cool-down.
      also add the calories burnt per exercise and the total calories burnt for the workout. Always provide your response in a structured format with sections for Warm-up, Main Workout, and Cool-down.
      Always provide your response in a structured format with sections for Warm-up, Main Workout, and Cool-down.
    
Always structure your response with the following markdown sections:
# Workout Plan for [User]
## Workout Frequency
[Details about frequency]
## 1. Warm-up
* [Exercise 1]: [Details]
* [Exercise 2]: [Details]
## 2. Main Workout
* **[Exercise Name]**:
  * **Sets**: [number]
  * **Reps**: [number]
  * **Focus**: [description]
## 3. Cool-down
* [Stretch 1]: [Details]
* [Stretch 2]: [Details]

Make sure to use proper markdown with headers (#, ##), bullet points (*), and text formatting (**bold**, *italic*) consistently.""",
    generation_config=generation_config
)

# Store chat sessions using Any type to avoid the type error
chat_sessions: Dict[str, Any] = {}

class UserProfile(BaseModel):
    name: str
    age: int
    height: int = Field(gt=0)  
    weight: int = Field(gt=0)  
    level: str
    equipment: str
    planks: int = Field(ge=0)  
    pushups: int = Field(ge=0)
    squats: int = Field(ge=0)  
    workout: str
    frequency: str

class ChatMessage(BaseModel):
    session_id: str
    message: str

async def stream_response(content, paragraph_delay=0.3):
    """Stream response with properly preserved markdown formatting"""
    # Add typing indicator
    yield "⏳ Thinking...\n\n"
    await asyncio.sleep(1.5)
    
    # Better preservation of markdown structure
    # Split by line instead of paragraphs to maintain list items and headers
    lines = content.split('\n')
    
    current_block = []
    for line in lines:
        current_block.append(line)
        
        # Send blocks of related content together (headers with content, list items, etc.)
        if not line.strip() or line.startswith('#'):
            if current_block:
                yield '\n'.join(current_block) + '\n'
                current_block = []
                await asyncio.sleep(paragraph_delay)
    
    # Send any remaining content
    if current_block:
        yield '\n'.join(current_block)

# Key functions to fix
import asyncio
import functools

def run_blocking_io(func, *args, **kwargs):
    """Run blocking function in a thread and return a coroutine"""
    return asyncio.to_thread(functools.partial(func, *args, **kwargs))

@app.post("/api/start-chat")
async def start_chat(profile: UserProfile, request: Request):
    try:
        # Log request info
        client_host = request.client.host
        logger.info(f"Request from {client_host} - Creating workout for {profile.name}")
        
        # Create direct prompt
        prompt = (
            f"Create a structured {profile.workout} workout plan for a {profile.level} with {profile.equipment} equipment. "
            f"They can do {profile.pushups} pushups, {profile.squats} squats, and hold a plank for {profile.planks} seconds. "
            f"Workout frequency: {profile.frequency} days per week. "
            f"Format the response with markdown, including clear headers for different sections. "
            f"Include separate sections for: 1) Warm-up, 2) Main workout with exercises, sets, and reps, 3) Cool-down."
        )
        
        # Use synchronous approach for simplicity
        direct_response = model.generate_content(prompt)
        logger.info("Direct content generation successful")
        
        # Generate unique session ID
        session_id = str(uuid.uuid4())
        chat_sessions[session_id] = model.start_chat(history=[
            {"role": "user", "parts": [prompt]},
            {"role": "model", "parts": [direct_response.text]}
        ])
        
        # Return response with proper content type
        return {
            "session_id": session_id,
            "response": direct_response.text,
            "content_type": "text/markdown"
        }
        
    except Exception as e:
        error_message = str(e)
        logger.error(f"Error in start_chat: {error_message}")
        raise HTTPException(status_code=500, detail=error_message)

def ensure_markdown_structure(text):
    """Ensure the text has proper markdown structure with line breaks"""
    # Fix common formatting issues
    
    # Make sure header lines start with proper spacing
    text = re.sub(r'([^\n])(\#{1,3}\s)', r'\1\n\2', text)
    
    # Ensure bullet points have proper spacing
    text = re.sub(r'([^\n])(\*\s)', r'\1\n\2', text)
    
    # Add extra newline after headers for better readability
    text = re.sub(r'(\#{1,3}.*?)(\n)(?!\n)', r'\1\n\n', text)
    
    # Add newline before and after list sections
    text = re.sub(r'(\n\*\s.*?)(\n)(?!\*|\n)', r'\1\n\n', text)
    
    return text

@app.post("/api/chat")
async def chat(message: ChatMessage):
    try:
        logger.info(f"Chat message received for session: {message.session_id[:8]}...")
        chat_session = chat_sessions.get(message.session_id)
        if not chat_session:
            logger.warning(f"Chat session not found: {message.session_id[:8]}...")
            raise HTTPException(status_code=404, detail="Chat session not found")
        
        response = chat_session.send_message(message.message)
        logger.info("Response received from model")
        
        # Pre-process to ensure markdown structure
        formatted_text = ensure_markdown_structure(response.text)
        
        # Return streaming response with proper content type
        async def response_generator():
            async for chunk in stream_response(formatted_text):
                yield chunk
        
        return StreamingResponse(response_generator(), media_type="text/markdown")
    except Exception as e:
        logger.error(f"Error in chat: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/session/{session_id}")
async def get_session(session_id: str):
    chat_session = chat_sessions.get(session_id)
    if not chat_session:
        raise HTTPException(status_code=404, detail="Chat session not found")
    
    # Return session information
    return {"session_id": session_id, "active": True}

if __name__ == "__main__":
    import uvicorn
    logger.info("Starting FastAPI server")
    uvicorn.run(app, host="0.0.0.0", port=8000)
