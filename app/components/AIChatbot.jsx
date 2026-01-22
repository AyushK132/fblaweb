"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I'm your coding assistant. Ask me anything about programming, data structures, or algorithms!" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages }),
      });
      const data = await res.json();
      const botMessage = { from: "bot", text: data.text };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Oops! Something went wrong. Try again." },
      ]);
      console.error(err);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50 flex items-center justify-center"
        title="Chat with AI"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-96 max-h-[600px] bg-white border border-green-500 rounded-xl shadow-xl flex flex-col z-50">
          {/* Header */}
          <div className="bg-green-500 text-white px-4 py-3 rounded-t-xl font-semibold flex justify-between items-center">
            AI Coding Assistant
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-green-200"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.from === "bot" ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`px-3 py-2 rounded-lg max-w-[75%] text-sm ${
                    msg.from === "bot"
                      ? "bg-green-100 text-green-900"
                      : "bg-green-500 text-white"
                  }`}
                >
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-green-200 p-3 flex gap-2">
            <input
              type="text"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              onClick={sendMessage}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
