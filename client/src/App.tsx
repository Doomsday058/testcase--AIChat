import useChat from "./hooks/useChat";
import ChatList from "./components/ChatList";
import ChatInput from "./components/ChatInput";

function App() {
  const { messages, isLoading, error, sendMessage } = useChat();

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-100 font-sans">
      <header className="p-4 border-b border-gray-700 bg-gray-800 shadow-sm flex justify-center">
        <h1 className="font-bold text-xl text-gray-100">AI Assistant</h1>
      </header>

      <main className="flex-1 overflow-hidden relative flex flex-col max-w-3xl w-full mx-auto">
        <ChatList messages={messages} />

        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-2 rounded m-4 text-center">
            {error}
          </div>
        )}
      </main>

      <footer className="p-4 bg-gray-800 border-t border-gray-700">
        <div className="max-w-3xl mx-auto">
          <ChatInput onSend={sendMessage} disabled={isLoading} />
          <p className="text-center text-xs text-gray-500 mt-2">
            Это тестовое задание
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
