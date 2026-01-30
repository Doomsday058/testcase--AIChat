import { useState } from "react";
import type { Message, ChatResponse } from "../types";
import { chatService } from "../api/chat.service";

const generateId = () =>
  Date.now().toString(36) + Math.random().toString(36).substr(2);

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    setError(null);
    setIsLoading(true);

    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const reply = await chatService.sendMessage(text);

      const botMessage: Message = {
        id: generateId(),
        role: "ai",
        content: reply,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      setError("Не удалось получить ответ: попробуйте позже.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    error,
    sendMessage,
  };
};

export default useChat;
