export interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
}

export interface ChatResponse {
  reply: string;
}
