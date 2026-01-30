import { api } from "./axiosInstance";
import type { Message, ChatResponse } from "../types";

export const chatService = {
  async sendMessage(message: string): Promise<string> {
    const { data } = await api.post<ChatResponse>("/chat", { message });
    return data.reply;
  },
};
