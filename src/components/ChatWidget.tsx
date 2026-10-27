import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, User, ShieldCheck, CheckCircle2, Sparkles, Building2, Phone } from 'lucide-react';
import { createLead, logAnalyticsEvent } from '../services/storageService';
import { NovitiateLogo } from './NovitiateLogo';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  isLeadPrompt?: boolean;
}

interface ChatWidgetProps {
  onLeadCaptured?: () => void;
  onNavigateToProperties?: () => void;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({
  onLeadCaptured,
  onNavigateToProperties
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [capturedLeadName, setCapturedLeadName] = useState('');
  const [capturedLeadPhone, setCapturedLeadPhone] = useState('');
  const [isLeadCaptured, setIsLeadCaptured] = useState(false);
  const [showLeadInput, setShowLeadInput] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'bot',
      text: 'Hello! Welcome to Novitiate Housing. I am your instant society tenancy and sales concierge. How can I assist you today?',
      time: 'Just now'
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleToggle = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (nextState) {
      logAnalyticsEvent('chat_interaction', 'Opened Chat Widget');
    }
  };

  const quickQuestions = [
    'How does Society NOC verification work?',
    'I want to onboard my Housing Society',
    'What is your 2-3 year tenancy policy?',
    'How do Real Estate Agents partner with you?'
  ];

  const handleSendMessage = (textToSend?: string) => {
    const userText = textToSend || input.trim();
    if (!userText) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    logAnalyticsEvent('chat_interaction', `User sent message: ${userText.slice(0, 30)}`);

    setTimeout(() => {
      let botResponse = '';
      const lower = userText.toLowerCase();

      if (lower.includes('noc') || lower.includes('society noc')) {
        botResponse =
          'At Novitiate Housing, we resolve society NOC bottlenecks by pre-screening all tenant or buyer credentials according to Maharashtra Co-operative Societies Act guidelines. Managing committees receive verified police intimations, registered agreement drafts, and employer references 48 hours prior to move-in, guaranteeing zero last-minute rejections!';
      } else if (lower.includes('onboard') || lower.includes('society') || lower.includes('committee')) {
        botResponse =
          'Housing societies can onboard completely free! We provide managing committees with automated tenant reference verification and standard 2–3 year lease governance. Would you like our society liaison desk to reach out with the committee presentation kit?';
        setShowLeadInput(true);
      } else if (lower.includes('2-3') || lower.includes('year') || lower.includes('tenancy') || lower.includes('policy')) {
        botResponse =
          'Rather than the chaotic 11-month churn that creates recurring security issues and lift wear, Novitiate Housing standardizes structured 2–3 year tenancy agreements. This provides rent escalation predictability for owners and stability for the housing society.';
      } else if (lower.includes('agent') || lower.includes('broker') || lower.includes('partner')) {
        botResponse =
          'We empower MahaRERA-certified agents by providing direct institutional access to gated housing societies across Vasai, Virar, Mumbai Suburbs, and Thane, protected by a guaranteed 50/50 co-brokering split!';
        setShowLeadInput(true);
      } else if (lower.includes('property') || lower.includes('flat') || lower.includes('bhk') || lower.includes('rent') || lower.includes('buy')) {
        botResponse =
          'We have multiple 1, 2, and 3 BHK verified flats with pre-cleared NOCs in Vasai West, Evershine City, Virar, Borivali, and Thane. You can view all listings under the "Properties" tab!';
      } else {
        botResponse =
          'Thank you for reaching out! Novitiate Housing is dedicated to simplifying the tenancy and sales process for housing societies, agents, and buyers. Leave your contact details below and our advisory desk will connect with you directly.';
        setShowLeadInput(true);
      }

      const botMsg: Message = {
        id: `b-${Date.now()}`,
        sender: 'bot',
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 700);
  };

  const handleCaptureLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!capturedLeadName || !capturedLeadPhone) return;

    createLead({
      name: capturedLeadName,
      email: `${capturedLeadName.toLowerCase().replace(/\s+/g, '')}@chatlead.com`,
      phone: capturedLeadPhone,
      role: 'Buyer',
      message: `Inquiry captured via Live Chat Concierge: "${messages[messages.length - 2]?.text || 'General Support'}"`,
      source: 'Chat Widget'
    });

    setIsLeadCaptured(true);
    setShowLeadInput(false);

    const confirmationMsg: Message = {
      id: `b-confirm-${Date.now()}`,
      sender: 'bot',
      text: `Thank you, ${capturedLeadName}! Your inquiry has been registered in our CRM. We have initiated your automated follow-up sequence and an advisory specialist will reach out to ${capturedLeadPhone}.`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, confirmationMsg]);
    if (onLeadCaptured) onLeadCaptured();
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      
      {/* Floating Trigger Button with Trademark Logo */}
      {!isOpen && (
        <button
          onClick={handleToggle}
          className="flex items-center gap-3 px-4 py-3 rounded-full bg-neutral-900 text-white shadow-2xl hover:bg-neutral-800 transition-all transform hover:scale-105 border-2 border-[#E84144]/30 hover:border-[#E84144] group"
          aria-label="Open support chat"
        >
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-xs shrink-0 p-1">
            <NovitiateLogo variant="mark" size="sm" />
          </div>
          <div className="text-left hidden sm:block pr-1">
            <div className="text-xs font-bold leading-tight flex items-center gap-1.5">
              <span>Instant Support</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#72A346] animate-pulse" />
            </div>
            <div className="text-[10px] text-neutral-400 leading-none">Novitiate Concierge</div>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl border border-neutral-200 w-[90vw] sm:w-[380px] h-[520px] max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          
          {/* Header with Trademark 4-Color Stripe */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#F59415] via-[#E84144] via-[#5C96D2] to-[#72A346]" />
          
          <div className="bg-neutral-900 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center p-1 shrink-0">
                <NovitiateLogo variant="mark" size="sm" />
              </div>
              <div>
                <h4 className="text-xs font-bold leading-tight flex items-center gap-1.5">
                  <span>Novitiate Concierge</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-[#72A346]" />
                </h4>
                <div className="text-[10px] text-neutral-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#72A346]" />
                  <span>Real-Time Support · Direct CRM Sync</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleToggle}
              className="p-1 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-neutral-50/50 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-white border border-neutral-200 flex items-center justify-center p-0.5 shrink-0 mt-0.5 shadow-2xs">
                    <NovitiateLogo variant="mark" size="sm" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-xl leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-neutral-900 text-white rounded-tr-none'
                      : 'bg-white text-neutral-800 border border-neutral-200/80 rounded-tl-none shadow-xs'
                  }`}
                >
                  <p>{msg.text}</p>
                  <div
                    className={`text-[9px] mt-1 text-right ${
                      msg.sender === 'user' ? 'text-neutral-400' : 'text-neutral-400'
                    }`}
                  >
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 items-center text-neutral-400 text-[11px] pl-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E84144] animate-pulse" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#F59415] animate-pulse delay-75" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#5C96D2] animate-pulse delay-150" />
                <span className="ml-1 text-[10px]">Novitiate is typing...</span>
              </div>
            )}

            {/* In-Chat CRM Lead Intake Form */}
            {showLeadInput && !isLeadCaptured && (
              <div className="bg-white p-3.5 rounded-xl border border-[#F59415] shadow-xs space-y-2 mt-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-900">
                  <Sparkles className="w-3.5 h-3.5 text-[#F59415]" />
                  <span>Request Callback & Society Kit</span>
                </div>
                <p className="text-[11px] text-neutral-500">
                  Enter your name and number to log this request directly into our CRM.
                </p>
                <form onSubmit={handleCaptureLead} className="space-y-2 pt-1">
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={capturedLeadName}
                    onChange={(e) => setCapturedLeadName(e.target.value)}
                    className="w-full text-xs font-medium bg-neutral-50 border border-neutral-200 rounded-lg px-2.5 py-1.5 text-neutral-900 focus:outline-none"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Your WhatsApp / Phone Number"
                    value={capturedLeadPhone}
                    onChange={(e) => setCapturedLeadPhone(e.target.value)}
                    className="w-full text-xs font-medium bg-neutral-50 border border-neutral-200 rounded-lg px-2.5 py-1.5 text-neutral-900 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 text-xs font-bold text-white bg-gradient-to-r from-[#E84144] to-[#F59415] hover:opacity-95 rounded-lg transition-opacity shadow-xs"
                  >
                    Send to Advisory Desk
                  </button>
                </form>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Reply Questions */}
          <div className="px-3 py-2 bg-white border-t border-neutral-100 flex items-center gap-1.5 overflow-x-auto">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="text-[10px] whitespace-nowrap shrink-0 px-2.5 py-1 rounded-md bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors font-medium"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-neutral-200 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask about society NOCs, flats, or agents..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              className="flex-1 text-xs font-medium bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!input.trim()}
              className="p-2 rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 disabled:opacity-40 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
