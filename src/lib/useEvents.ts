import {
  Event,
  EventCategory,
  EventStatus,
} from "../types/models/event.model";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

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
  const queryClient = useQueryClient();

  const { data: events, isLoading } = useQuery<Event[]>({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  const addEventMutation = useMutation({
    mutationFn: (newEvent: Event) => {
      return new Promise<Event>((resolve) => {
        setTimeout(() => {
          resolve({ ...newEvent, id: (events?.length || 0) + 1 });
        });
      });
    },

    onSuccess: (newEvent) => {
      queryClient.setQueryData<Event[]>(
        ["events"],
        (oldEvents = []) => [...oldEvents, newEvent]
      );
    },
  });

  const editEventMutation = useMutation({
    mutationFn: (updatedEvent: Event) => {
      return new Promise<Event>((resolve) => {
        setTimeout(() => {
          resolve(updatedEvent);
        }, 1000);
      });
    },
    onSuccess: (updatedEvent) => {
      queryClient.setQueryData<Event[]>(
        ["events"],
        (oldEvents = []) =>
          oldEvents.map((event) =>
            event.id === updatedEvent.id ? updatedEvent : event
          )
      );
    },
  });

  const deleteEventMutation = useMutation({
    mutationFn: (eventId: number) => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
    },
    onSuccess: (_, eventId) => {
      queryClient.setQueryData<Event[]>(
        ["events"],
        (oldEvents = []) =>
          oldEvents.filter((event) => event.id !== eventId)
      );
    },
  });

  return {
    events,
    isLoading,
    addEvent: addEventMutation,
    editEvent: editEventMutation,
    deleteEvent: deleteEventMutation,
  };
};
