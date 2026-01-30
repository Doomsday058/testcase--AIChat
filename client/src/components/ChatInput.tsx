import React, { useState, KeyboardEvent, useEffect } from "react";
import { PaperAirplaneIcon, MicrophoneIcon } from "@heroicons/react/24/solid";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled }) => {
  const [text, setText] = useState("");

  const {
    text: voiceText,
    isListening,
    startListening,
    isSupported,
  } = useSpeechRecognition();

  useEffect(() => {
    if (voiceText) {
      setText((prev) => (prev ? prev + " " : "") + voiceText);
    }
  }, [voiceText]);

  const handleSendClick = () => {
    if (text.trim() && !disabled) {
      onSend(text);
      setText("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendClick();
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 max-w-4xl mx-auto">
        <input
          type="text"
          className="flex-1 bg-gray-700 text-white border border-gray-600 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 disabled:opacity-50"
          placeholder={isListening ? "Слушаю..." : "Ask whatever you want"}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled || isListening}
        />

        <button
          onClick={handleSendClick}
          disabled={!text.trim() || disabled}
          className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-gray-700 disabled:text-gray-500 transition-colors"
        >
          <PaperAirplaneIcon className="h-5 w-5" />
        </button>

        {isSupported && (
          <button
            className={`p-2 rounded-full transition-all duration-200 ${
              isListening
                ? "bg-red-500 text-white animate-pulse shadow-lg ring-2 ring-red-300"
                : "bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-white"
            }`}
            onClick={startListening}
            disabled={disabled || isListening}
            title="Нажми и говори"
          >
            <MicrophoneIcon className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatInput;
