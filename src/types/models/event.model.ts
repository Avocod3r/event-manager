import { z } from "zod";

export enum EventCategory {
  WORK = "work",
  PERSONAL = "personal",
  LEISURE = "leisure",
}

export enum EventStatus {
  UPCOMING = "upcoming",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export type Event = {
  id: number;
  name: string;
  description: string;
  category: EventCategory;
  date: Date;
  status: EventStatus;
};

export const eventSchema = z.object({
  name: z.string().min(1, "Event name is  required"),
  description: z.string(),
  category: z.nativeEnum(EventCategory),
  date: z.coerce
    .date()
    .refine(
      (date) => date > new Date(),
      "Date must be in the future"
    ),
  status: z.nativeEnum(EventStatus),
});
