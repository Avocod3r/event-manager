import { useEvents } from "../lib/useEvents";
import { EventForm } from "./EventForm";
import { EventTable } from "./EventTable";
import { Event } from "../types/models/event.model";

export const EventManager = () => {
  const { events, addEvent, editEvent, deleteEvent } = useEvents();

  return (
    <div>
      <EventForm onSubmit={addEvent} />
      <EventTable
        events={events}
        onEdit={editEvent}
        onDelete={(event: Event) => deleteEvent(event.id)}
      />
    </div>
  );
};
