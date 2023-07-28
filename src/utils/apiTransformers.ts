import { MessageDTO, FileDTO } from "../types";
import { bytesToString } from "./bytesToString";

export type File = {
  id: number;
  userId: number;
  path: string;
  filename: string;
  contentType: string;
  contentSize: string;
  uploadDate: string;
};

export const transformFile = (data: FileDTO): File => {
  return {
    id: data.id,
    userId: data.user_id,
    path: data.path,
    filename: data.filename,
    contentType: data.content_type,
    contentSize: bytesToString(data.content_size),
    uploadDate: data.upload_date,
  };
};

export type Message = {
  id: number;
  isRead: boolean | null;
  chatId: number | null;
  time: string;
  type: "message" | "file";
  userId: number;
  content: string;
  file: File | null;
};

export const transformMessage = (data: MessageDTO): Message => {
  return {
    id: data.id,
    isRead: data.is_read || null,
    chatId: data.chat_id || null,
    time: data.time,
    type: data.type,
    userId: data.user_id,
    content: data.content,
    file: data.file ? transformFile(data.file as FileDTO) : null,
  };
};

export const transformMessages = (data: MessageDTO[]): Message[] => {
  return data.map((message) => transformMessage(message));
};
