'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '@/lib/gemini';

const SUGGESTED_PROMPTS = [
  "What's his tech stack?",
  "Tell me about his projects.",
  "What open-source contributions has he made?",
  "What experience does he have?",
];

const WELCOME_MESSAGE =
  "Connected to Vaibhav's portfolio — ask me about his projects, technical stack, experience, or open-source contributions.";

interface DisplayMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isError?: boolean;
}

export default function GeminiChatbot() {
  const [messages, setMessages] = useState<DisplayMessage[]>([
    {
      id: 'welcome-msg',
      role: 'assistant',
      content: WELCOME_MESSAGE,
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setErrorState] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom of conversation
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const prompt = (textToSend || inputValue).trim();
    if (!prompt || isLoading) return;

    setErrorState(null);
    const userMsgId = `user-${Date.now()}`;
    const newDisplayMessages: DisplayMessage[] = [
      ...messages,
      { id: userMsgId, role: 'user', content: prompt },
    ];

    setMessages(newDisplayMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      // Build bounded conversation payload (only user & assistant messages, exclude welcome if empty)
      const chatPayload: ChatMessage[] = newDisplayMessages
        .filter((m) => !m.isError)
        .map((m) => ({
          role: m.role,
          content: m.content,
        }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: chatPayload }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate a response from Gemini.');
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: data.response,
        },
      ]);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'An error occurred.';
      setErrorState(errMsg);
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: 'assistant',
          content: `⚠️ ${errMsg}`,
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome-msg',
        role: 'assistant',
        content: WELCOME_MESSAGE,
      },
    ]);
    setErrorState(null);
    setInputValue('');
  };

  const handleRetry = () => {
    // Find the last user message
    const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user');
    if (lastUserMsg) {
      // Remove any trailing error message
      setMessages((prev) => prev.filter((m) => !m.isError));
      handleSendMessage(lastUserMsg.content);
    }
  };

  // Simple, safe Markdown parser for formatting bold text, code, bullet lists, and links
  const renderFormattedContent = (content: string) => {
    // Process lines for bullet points
    const lines = content.split('\n');
    return lines.map((line, lIdx) => {
      const isBullet = line.trim().startsWith('- ') || line.trim().startsWith('• ');
      const cleanLine = isBullet ? line.trim().slice(2) : line;

      // Parse inline bold, code, and markdown links
      const parts = cleanLine.split(/(\*\*.*?\*\*|`.*?`|\[.*?\]\(.*?\))/g);

      const parsedParts = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
              <strong key={pIdx} style={{ color: 'var(--text-main)', fontWeight: 600 }}>
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code
              key={pIdx}
              style={{
                background: 'rgba(255, 255, 255, 0.12)',
                padding: '2px 5px',
                borderRadius: '4px',
                fontSize: '12px',
                fontFamily: 'monospace',
                color: 'var(--portfolio-accent)',
              }}
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
        if (linkMatch) {
          return (
            <a
              key={pIdx}
              href={linkMatch[2]}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'var(--portfolio-accent)',
                textDecoration: 'underline',
                fontWeight: 500,
                wordBreak: 'break-word',
              }}
            >
              {linkMatch[1]}
            </a>
          );
        }
        return part;
      });

      if (isBullet) {
        return (
          <div
            key={lIdx}
            style={{
              display: 'flex',
              gap: '6px',
              marginTop: '4px',
              paddingLeft: '6px',
            }}
          >
            <span style={{ color: 'var(--portfolio-accent)', lineHeight: 1.5 }}>•</span>
            <span style={{ flex: 1, lineHeight: 1.55 }}>{parsedParts}</span>
          </div>
        );
      }

      return (
        <span key={lIdx} style={{ display: 'block', minHeight: cleanLine ? 'auto' : '8px', lineHeight: 1.55 }}>
          {parsedParts}
        </span>
      );
    });
  };

  return (
    <div
      className="gemini-chatbot-card"
      style={{
        background: 'rgba(15, 17, 26, 0.75)',
        backdropFilter: 'blur(30px) saturate(180%)',
        WebkitBackdropFilter: 'blur(30px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.14)',
        borderRadius: '24px',
        boxShadow: '0 16px 36px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box',
        height: '100%',
        minHeight: '380px',
        maxHeight: '520px',
        position: 'relative',
      }}
    >
      {/* Terminal Header */}
      <div
        className="gemini-chatbot-header"
        style={{
          padding: '10px 14px',
          background: 'rgba(0, 0, 0, 0.3)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          flexWrap: 'wrap',
          minWidth: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* macOS window dots */}
          <div style={{ display: 'flex', gap: '5px' }}>
            <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#ff5f56', display: 'inline-block' }} />
            <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }} />
            <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#27c93f', display: 'inline-block' }} />
          </div>

          <div style={{ marginLeft: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', letterSpacing: '0.3px' }}>
              Vaibhav AI
            </span>
            <span
              style={{
                fontSize: '10px',
                fontWeight: 600,
                color: 'var(--portfolio-accent)',
                background: 'var(--portfolio-accent-soft)',
                border: '1px solid var(--portfolio-accent-border)',
                padding: '1px 6px',
                borderRadius: '6px',
              }}
            >
              Gemini 3.8 Flash
            </span>
          </div>
        </div>

        {/* Right Status + Reset Action */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: 'var(--portfolio-accent)',
                boxShadow: '0 0 6px var(--portfolio-accent)',
                display: 'inline-block',
              }}
            />
            <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.65)', fontWeight: 500 }}>
              Live Grounded
            </span>
          </div>

          <button
            onClick={handleResetChat}
            title="Reset conversation"
            aria-label="Reset conversation"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.5)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '2px',
              transition: 'color 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.5)')}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
              <path d="M21 3v5h-5" />
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
              <path d="M8 16H3v5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages Scrollable Container */}
      <div
        className="gemini-chat-messages"
        style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          width: '100%',
          boxSizing: 'border-box',
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(255, 255, 255, 0.15) transparent',
        }}
      >
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
                className={`gemini-message-bubble ${isUser ? 'is-user' : ''} ${msg.isError ? 'is-error' : ''}`}
              style={{
                display: 'flex',
                justifyContent: isUser ? 'flex-end' : 'flex-start',
                width: '100%',
              }}
            >
              <div
                style={{
                  maxWidth: '86%',
                  padding: isUser ? '10px 14px' : '12px 16px',
                  borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  background: isUser
                    ? 'var(--portfolio-accent)'
                    : msg.isError
                    ? 'rgba(255, 69, 58, 0.15)'
                    : 'rgba(255, 255, 255, 0.07)',
                  border: isUser
                    ? '1px solid var(--portfolio-accent-border)'
                    : msg.isError
                    ? '1px solid rgba(255, 69, 58, 0.4)'
                    : '1px solid rgba(255, 255, 255, 0.12)',
                  color: isUser ? 'var(--portfolio-accent-contrast)' : msg.isError ? '#ff6961' : 'var(--text-main)',
                  fontSize: '13.5px',
                  lineHeight: 1.55,
                  wordBreak: 'break-word',
                  boxShadow: isUser
                    ? '0 4px 14px var(--portfolio-accent-soft)'
                    : '0 4px 12px rgba(0, 0, 0, 0.2)',
                }}
              >
                {renderFormattedContent(msg.content)}
              </div>
            </div>
          );
        })}

        {/* Loading Animated State */}
        {isLoading && (
          <div className="gemini-thinking-row" style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
            <div
              style={{
                padding: '10px 16px',
                borderRadius: '16px 16px 16px 4px',
                background: 'rgba(255, 255, 255, 0.07)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: 'var(--portfolio-accent)',
                  animation: 'pulse 1s infinite alternate',
                }}
              />
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: 'var(--portfolio-accent)',
                  animation: 'pulse 1s infinite alternate 0.2s',
                }}
              />
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: 'var(--portfolio-accent)',
                  animation: 'pulse 1s infinite alternate 0.4s',
                }}
              />
              <span style={{ fontSize: '11.5px', color: 'rgba(255, 255, 255, 0.5)', marginLeft: '4px' }}>
                Thinking with Gemini...
              </span>
            </div>
          </div>
        )}

        {/* Error Retry Button */}
        {errorState && !isLoading && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4px' }}>
            <button
              onClick={handleRetry}
              style={{
                background: 'rgba(255, 69, 58, 0.2)',
                border: '1px solid rgba(255, 69, 58, 0.4)',
                borderRadius: '12px',
                color: '#ffffff',
                fontSize: '12px',
                fontWeight: 600,
                padding: '6px 14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
              </svg>
              Retry Last Prompt
            </button>
          </div>
        )}

        {/* Suggested Prompts Chips (Shown when conversation is short) */}
        {messages.length <= 2 && !isLoading && (
          <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.5)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Suggested Inquiries:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {SUGGESTED_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  className="gemini-suggested-prompt"
                  style={{
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '12px',
                    color: 'var(--portfolio-accent)',
                    fontSize: '11.5px',
                    fontWeight: 500,
                    padding: '6px 10px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--portfolio-accent-soft)';
                    e.currentTarget.style.borderColor = 'var(--portfolio-accent-border)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--portfolio-surface-soft)';
                    e.currentTarget.style.borderColor = 'var(--portfolio-border)';
                  }}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div
        className="gemini-chat-input-area"
        style={{
          padding: '10px 12px',
          background: 'rgba(0, 0, 0, 0.35)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          gap: '8px',
          alignItems: 'flex-end',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <textarea
          className="gemini-chat-input"
          ref={inputRef}
          rows={1}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything about Vaibhav's projects or skills..."
          disabled={isLoading}
          style={{
            flex: 1,
            background: 'var(--portfolio-surface-soft)',
            border: '1px solid var(--portfolio-border)',
            borderRadius: '12px',
            color: 'var(--text-main)',
            fontSize: '13px',
            padding: '9px 12px',
            outline: 'none',
            resize: 'none',
            lineHeight: 1.4,
            maxHeight: '80px',
            fontFamily: 'inherit',
          }}
          onFocus={(e) => (e.target.style.borderColor = 'var(--portfolio-accent)')}
          onBlur={(e) => (e.target.style.borderColor = 'var(--portfolio-border)')}
        />

        <button
          onClick={() => handleSendMessage()}
          disabled={isLoading || !inputValue.trim()}
          title="Send message"
          aria-label="Send message"
          style={{
            background: inputValue.trim() && !isLoading
              ? 'var(--portfolio-accent)'
              : 'var(--portfolio-surface-soft)',
            border: 'none',
            borderRadius: '12px',
            color: inputValue.trim() && !isLoading ? 'var(--portfolio-accent-contrast)' : 'var(--text-muted)',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: inputValue.trim() && !isLoading ? 'pointer' : 'default',
            flexShrink: 0,
            transition: 'all 0.15s ease',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </div>
  );
}
