import { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm Sarvathan's assistant 👋 Ask me about services, projects, or freelance availability.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!userMessage.trim()) return;

    const updatedMessages = [...messages, { role: "user", content: userMessage }];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/chat", {
        conversationHistory: updatedMessages,
      });
      setMessages([...updatedMessages, { role: "assistant", content: res.data.reply }]);
    } catch (error) {
      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: "AI assistant is temporarily busy. Please contact Sarvathan at Sarvathan9363@gmail.com",
        },
      ]);
    }

    setUserMessage("");
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* ── Chat Bubble ── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300"
        style={{
          background: isOpen
            ? "linear-gradient(135deg, #7f1d1d 0%, #991b1b 100%)"
            : "linear-gradient(135deg, #991b1b 0%, #b91c1c 100%)",
          border: "1px solid rgba(212,175,55,0.45)",
          boxShadow: isOpen
            ? "0 0 24px rgba(185,28,28,0.6), 0 0 48px rgba(185,28,28,0.15)"
            : "0 0 16px rgba(185,28,28,0.45), 0 4px 20px rgba(0,0,0,0.5)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 0 28px rgba(212,175,55,0.4), 0 0 50px rgba(185,28,28,0.25)";
          e.currentTarget.style.borderColor = "rgba(212,175,55,0.8)";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0 0 16px rgba(185,28,28,0.45), 0 4px 20px rgba(0,0,0,0.5)";
          e.currentTarget.style.borderColor = "rgba(212,175,55,0.45)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
        title="Chat with Sarvathan's Assistant"
      >
        {/* Pulse ring */}
        <span
          className="absolute w-14 h-14 rounded-2xl pointer-events-none"
          style={{ border: "1px solid rgba(185,28,28,0.5)", animation: "chatPulse 2.4s ease-in-out infinite" }}
        />
        <span
          className="text-sm font-bold text-white relative z-10"
          style={{ fontFamily: "'Sora', sans-serif", letterSpacing: "0.05em" }}
        >
          {isOpen ? "✕" : "AI"}
        </span>
      </button>

      {/* ── Chat Window ── */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-50 flex flex-col overflow-hidden rounded-2xl"
          style={{
            width: "360px",
            background: "linear-gradient(160deg, #0a0404 0%, #0f0606 100%)",
            border: "1px solid rgba(185,28,28,0.35)",
            boxShadow: "0 24px 80px rgba(0,0,0,0.7), 0 0 40px rgba(185,28,28,0.1), inset 0 1px 0 rgba(255,255,255,0.04)",
            animation: "windowOpen 0.28s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          {/* Top shimmer line */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent 0%, #b91c1c 40%, #d4af37 60%, transparent 100%)" }}
          />

          {/* ── Header ── */}
          <div
            className="relative flex items-center gap-3 px-4 py-3.5"
            style={{
              borderBottom: "1px solid rgba(185,28,28,0.2)",
              background: "rgba(185,28,28,0.05)",
            }}
          >
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold text-white"
                style={{
                  background: "linear-gradient(135deg, #7f1d1d 0%, #b91c1c 100%)",
                  border: "1px solid rgba(212,175,55,0.4)",
                  fontFamily: "'Sora', sans-serif",
                  boxShadow: "0 0 14px rgba(185,28,28,0.5)",
                }}
              >
                S
              </div>
              <span
                className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400"
                style={{ border: "2px solid #0a0404", boxShadow: "0 0 6px rgba(74,222,128,0.9)" }}
              />
            </div>

            <div className="flex-1 min-w-0">
              <p
                className="text-sm font-bold text-white truncate"
                style={{ fontFamily: "'Sora', sans-serif", letterSpacing: "0.05em" }}
              >
                Sarvathan's Assistant
              </p>
              <p className="text-xs" style={{ color: "rgba(74,222,128,0.75)", fontFamily: "'Outfit', sans-serif" }}>
                ● Online now
              </p>
            </div>

            <div
              className="text-xs px-2.5 py-1 rounded-lg font-medium"
              style={{
                color: "rgba(212,175,55,0.7)",
                border: "1px solid rgba(212,175,55,0.2)",
                background: "rgba(212,175,55,0.05)",
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              AI
            </div>
          </div>

          {/* ── Messages ── */}
          <div
            className="flex flex-col gap-3 p-4 overflow-y-auto"
            style={{
              height: "300px",
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(185,28,28,0.35) transparent",
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className="max-w-[82%] px-3.5 py-2.5 text-sm leading-relaxed rounded-xl"
                  style={
                    msg.role === "user"
                      ? {
                          background: "linear-gradient(135deg, rgba(185,28,28,0.65) 0%, rgba(153,27,27,0.55) 100%)",
                          border: "1px solid rgba(185,28,28,0.4)",
                          color: "#fff",
                          fontFamily: "'Outfit', sans-serif",
                          lineHeight: 1.6,
                          borderRadius: "14px 14px 4px 14px",
                        }
                      : {
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(212,175,55,0.15)",
                          borderLeft: "2px solid rgba(212,175,55,0.45)",
                          color: "rgba(220,220,220,0.88)",
                          fontFamily: "'Outfit', sans-serif",
                          lineHeight: 1.6,
                          borderRadius: "4px 14px 14px 14px",
                        }
                  }
                >
                  {msg.role === "assistant" && (
                    <span
                      className="block text-xs font-semibold mb-1"
                      style={{ color: "rgba(212,175,55,0.6)", fontFamily: "'Outfit', sans-serif" }}
                    >
                      Assistant
                    </span>
                  )}
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="flex justify-start">
                <div
                  className="px-4 py-3 flex items-center gap-1.5 rounded-xl"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(212,175,55,0.15)",
                    borderLeft: "2px solid rgba(212,175,55,0.45)",
                  }}
                >
                  {[0, 150, 300].map((delay) => (
                    <span
                      key={delay}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        background: "#d4af37",
                        animation: "typingDot 1.2s ease-in-out infinite",
                        animationDelay: `${delay}ms`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Divider */}
          <div
            style={{
              height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(185,28,28,0.3), rgba(212,175,55,0.2), transparent)",
            }}
          />

          {/* ── Input row ── */}
          <div
            className="flex items-center gap-2 px-3 py-2.5"
            style={{ background: "rgba(0,0,0,0.25)" }}
          >
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="flex-1 bg-transparent text-sm outline-none"
              style={{
                color: "rgba(220,220,220,0.9)",
                fontFamily: "'Outfit', sans-serif",
                caretColor: "#d4af37",
              }}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !userMessage.trim()}
              className="px-4 py-2 rounded-xl text-xs font-semibold tracking-wide uppercase transition-all duration-200"
              style={{
                background:
                  loading || !userMessage.trim()
                    ? "rgba(185,28,28,0.15)"
                    : "linear-gradient(135deg, #991b1b 0%, #b91c1c 100%)",
                border: "1px solid rgba(185,28,28,0.4)",
                color:
                  loading || !userMessage.trim() ? "rgba(255,255,255,0.3)" : "#fff",
                fontFamily: "'Outfit', sans-serif",
                cursor: loading || !userMessage.trim() ? "not-allowed" : "pointer",
              }}
              onMouseEnter={(e) => {
                if (!loading && userMessage.trim()) {
                  e.currentTarget.style.boxShadow = "0 0 16px rgba(185,28,28,0.45)";
                  e.currentTarget.style.borderColor = "rgba(212,175,55,0.45)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "rgba(185,28,28,0.4)";
              }}
            >
              Send
            </button>
          </div>

          {/* Footer */}
          <div
            className="text-center py-1.5 text-xs font-medium"
            style={{
              color: "rgba(212,175,55,0.25)",
              borderTop: "1px solid rgba(185,28,28,0.08)",
              fontFamily: "'Outfit', sans-serif",
              letterSpacing: "0.05em",
            }}
          >
            Powered by OpenRouter
          </div>

          {/* Bottom shimmer line */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, #b91c1c, #d4af37, #b91c1c, transparent)" }}
          />
        </div>
      )}

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes chatPulse {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50%       { opacity: 0.75; transform: scale(1.1); }
        }
        @keyframes windowOpen {
          from { opacity: 0; transform: scale(0.93) translateY(10px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes typingDot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30%           { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </>
  );
}