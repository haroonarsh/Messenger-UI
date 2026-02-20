import { API_BASE_URL } from "@/libs/api";
import { Conversation } from "@/libs/types";
import api from "@/utils/api";

export const findOrCreateConversation = async (participants: string[]): Promise<Conversation> => {
  const response = await api.post(`${API_BASE_URL}/api/chat/conversations/find-or-create`, { participants });

  return response.data;
};