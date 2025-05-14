import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, Send, X, Minimize, Maximize } from 'lucide-react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import PageTransition from '../components/ui/PageTransition';
import SectionHeading from '../components/ui/SectionHeading';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
}

interface UserProfile {
  name: string;
  age: number;
  height: number;
  weight: number;
  level: string;
  equipment: string;
  pushups: number;
  squats: number;
  planks: number;
  workout: string;
  frequency: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    age: 0,
    height: 0,
    weight: 0,
    level: '',
    equipment: '',
    pushups: 0,
    squats: 0,
    planks: 0,
    workout: '',
    frequency: ''
  });

  const questions = [
    "What's your name?",
    "How old are you?",
    "What's your height in cm?",
    "What's your weight in kg?",
    "What's your fitness level? (beginner/intermediate/advanced)",
    "Do you have any equipment? If yes, please list them:",
    "How many pushups can you do?",
    "How many squats can you do?",
    "How long can you hold a plank? (in seconds)",
    "What type of workout do you want to do? (Cardio, Strength, etc.)",
    "How many days a week do you want to workout?"
  ];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: '1',
          type: 'assistant',
          content: "Welcome to the AI Fitness Assistant! Let's create your personalized workout plan. " + questions[0]
        }
      ]);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const updateProfile = (answer: string) => {
    const updatedProfile = { ...profile };
    switch (currentStep) {
      case 0:
        updatedProfile.name = answer;
        break;
      case 1:
        updatedProfile.age = parseInt(answer);
        break;
      case 2:
        updatedProfile.height = parseInt(answer);
        break;
      case 3:
        updatedProfile.weight = parseInt(answer);
        break;
      case 4:
        updatedProfile.level = answer.toLowerCase();
        break;
      case 5:
        updatedProfile.equipment = answer;
        break;
      case 6:
        updatedProfile.pushups = parseInt(answer);
        break;
      case 7:
        updatedProfile.squats = parseInt(answer);
        break;
      case 8:
        updatedProfile.planks = parseInt(answer);
        break;
      case 9:
        updatedProfile.workout = answer;
        break;
      case 10:
        updatedProfile.frequency = answer;
        break;
    }
    setProfile(updatedProfile);
  };

  const startChat = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post('http://localhost:8000/api/start-chat', profile);
      setSessionId(response.data.session_id);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'assistant',
        content: response.data.response
      }]);
    } catch (error) {
      console.error('Error starting chat:', error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'assistant',
        content: 'Sorry, there was an error creating your workout plan. Please try again.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    updateProfile(inputValue);

    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: questions[currentStep + 1]
      }]);
    } else if (currentStep === questions.length - 1) {
      await startChat();
    } else if (sessionId) {
      try {
        setIsLoading(true);
        const response = await axios.post('http://localhost:8000/api/chat', {
          session_id: sessionId,
          message: inputValue
        });
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: response.data.response
        }]);
      } catch (error) {
        console.error('Error sending message:', error);
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: 'Sorry, there was an error processing your message. Please try again.'
        }]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <PageTransition>
      <div className="py-12 md:py-16">
        <SectionHeading
          title="Fitness AI Assistant"
          subtitle="Get personalized workout plans based on your fitness profile"
          centered={true}
        />

        <div className="max-w-4xl mx-auto mt-12">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative bg-dark-300 rounded-xl shadow-xl overflow-hidden"
          >
            {/* Chat header */}
            <div className="bg-primary-600 p-4 flex items-center justify-between">
              <div className="flex items-center">
                <Bot size={24} className="mr-2" />
                <h3 className="text-lg font-medium">AI Fitness Assistant</h3>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-primary-700 rounded"
                >
                  {isMinimized ? <Maximize size={16} /> : <Minimize size={16} />}
                </button>
                <button className="p-1 hover:bg-primary-700 rounded">
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Chat messages */}
            <motion.div
              animate={{ height: isMinimized ? 0 : 'auto' }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="max-h-[400px] overflow-y-auto p-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-4 flex ${
                      message.type === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.type === 'assistant' && (
                      <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center mr-2 flex-shrink-0">
                        <Bot size={16} />
                      </div>
                    )}
                    <div
                      className={`rounded-lg p-3 max-w-[80%] ${
                        message.type === 'user'
                          ? 'bg-primary-600 text-white'
                          : 'bg-dark-500 text-white'
                      }`}
                    >
                      {message.type === 'user' ? (
                        message.content
                      ) : (
                        <div className="markdown-content">
                          <ReactMarkdown 
                            remarkPlugins={[remarkGfm]}
                            components={{
                              h1: ({node, ...props}) => <h1 className="text-xl font-bold my-2" {...props} />,
                              h2: ({node, ...props}) => <h2 className="text-lg font-semibold my-2" {...props} />,
                              h3: ({node, ...props}) => <h3 className="text-md font-medium my-1" {...props} />,
                              ul: ({node, ...props}) => <ul className="list-disc pl-5 my-2" {...props} />,
                              ol: ({node, ...props}) => <ol className="list-decimal pl-5 my-2" {...props} />,
                              li: ({node, ...props}) => <li className="my-1" {...props} />,
                              p: ({node, ...props}) => <p className="my-2" {...props} />,
                              strong: ({node, ...props}) => <strong className="font-bold text-primary-300" {...props} />
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat input */}
              <form onSubmit={handleSubmit} className="border-t border-dark-500 p-4">
                <div className="flex items-center">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Type your answer..."
                    className="flex-grow bg-dark-500 border-none rounded-l-md p-3 text-white focus:outline-none focus:ring-1 focus:ring-primary-500"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    className="bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-r-md flex items-center justify-center disabled:opacity-50"
                    disabled={isLoading}
                  >
                    <Send size={18} />
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Chat;