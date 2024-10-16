import { useEffect, useState } from "react";
import {
  Event,
  EventCategory,
  EventStatus,
} from "../types/models/event.model";
import { useQuery } from "@tanstack/react-query";

const fetchEvents = async (): Promise<Event[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: "Meet with team",
          description: "Sprint review",
          category: EventCategory.WORK,
          date: new Date(),
          status: EventStatus.UPCOMING,
        },
        {
          id: 2,
          name: "Mom birthday",
          description: "Celebrate with mom her birthday",
          category: EventCategory.PERSONAL,
          date: new Date(),
          status: EventStatus.UPCOMING,
        },
      ]);
    }, 1500);
  });
};

export const useEvents = () => {
  const { data, isLoading } = useQuery<Event[]>({
    queryKey: ["events"],
    queryFn: fetchEvents,
    staleTime: Infinity,
  });

  const [events, setEvents] = useState<Event[]>(data || []);

  useEffect(() => {
    if (data) {
      setEvents(data);
    }
  }, [data]);

  const addEvent = (newEvent: Event) => {
    setEvents([...events, { ...newEvent, id: events.length + 1 }]);
  };

  const editEvent = (editedEvent: Event) => {
    console.log(editedEvent);
    setEvents((prev) =>
      prev.map((event) =>
        event.id === editedEvent.id ? editedEvent : event
      )
    );
  };

  const deleteEvent = (eventId: number) => {
    setEvents(events.filter((event) => event.id !== eventId));
  };

  return {
    events,
    isLoading,
    addEvent,
    editEvent,
    deleteEvent,
  };
};
