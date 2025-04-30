# Fit-AI

Fit-AI is a full-stack application that leverages Google's Gemini AI to provide personalized workout plans.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [API Configuration](#api-configuration)
- [Screenshots](#screenshots)
- [License](#license)
- [Contact](#contact)

## Overview

Fit-AI creates personalized workout plans based on your fitness level, available equipment, and physical capabilities. The application uses Google's Gemini AI to generate custom workout routines tailored to your specific needs and goals.

## Features

- **Personalized Workout Plans**: AI-generated fitness routines based on your profile
- **Beginner-Friendly Interface**: Easy-to-use form for inputting your fitness details
- **Real-time AI Responses**: Instant workout plan generation with typing effect
- **Equipment Adaptation**: Customized workouts based on available equipment
- **Fitness Level Customization**: Plans adjusted to beginner, intermediate, or advanced levels
- **Streaming Response**: Watch as your workout plan is generated in real-time

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Backend**: Python, FastAPI
- **AI**: Google Generative AI (Gemini 2.5)
- **Styling**: CSS/SCSS
- **Package Management**: npm

## Demo

Try out the live demo of Fit-AI: [FIT AI]([https://www.fitai.app](https://fit-ai-pi.vercel.app/))

## Installation

### Prerequisites
- Node.js and npm
- Python 3.8+
- Google Generative AI API key

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/sakshamm0507/Fit-AI.git
   cd Fit-AI
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Install backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a .env file in the project root:
   ```
   GOOGLE_API_KEY=your_google_api_key_here
   ```

## Usage

1. Start the backend server:
   ```bash
   python workout.py
   ```

2. In a separate terminal, start the frontend:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## API Configuration

The application uses Google's Gemini API for generating workout plans. To configure:

1. Obtain an API key from [Google AI Studio](https://ai.google.dev/)
2. Add your key to the .env file as shown above
3. The backend will automatically load this key when starting

## License

This project is licensed under the MIT License.

## Contact

For any questions or feedback, reach out to [sakshamm0507](https://github.com/sakshamm0507).

---

**Note:** This project is for educational purposes only. Always consult with a fitness professional before starting any new workout program.
