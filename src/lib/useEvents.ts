import { useState } from "react";
import { Event } from "../types/models/event.model";

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);

  const addEvent = (newEvent: Event) => {
    setEvents([...events, { ...newEvent, id: events.length + 1 }]);
  };

  const editEvent = (editedEvent: Event) => {
    setEvents(
      events.map((event) =>
        event.id === editedEvent.id ? editedEvent : event
      )
    );
  };

  const deleteEvent = (eventId: number) => {
    setEvents(events.filter((event) => event.id !== eventId));
  };

  return { events, addEvent, editEvent, deleteEvent };
};
