import { useEvents } from "../lib/useEvents";
import { EventForm } from "./EventForm";
import { EventTable } from "./EventTable";
import { Event } from "../types/models/event.model";
import { useState } from "react";
import { Modal } from "./Modal";

export const EventManager = () => {
  const { events, isLoading, addEvent, editEvent, deleteEvent } =
    useEvents();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setSelectedEvent(null);
    setIsModalOpen(false);
  };

  const handleAddEvent = (data: Event) => {
    addEvent.mutate(data);
    handleCloseModal();
  };

  const selectEditEvent = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleEditEvent = (data: Event) => {
    editEvent.mutate(data);
    handleCloseModal();
  };

  if (isLoading) {
    return (
      <div className="w-full h-full justify-center items-center">
        Loading events...
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-primary">
        Event Manager
      </h1>
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-4 bg-primary hover:bg-primary-light text-white font-bold py-2 px-4 rounded"
      >
        Add Event
      </button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <EventForm
          onSubmit={selectedEvent ? handleEditEvent : handleAddEvent}
          initialData={selectedEvent || undefined}
        />
      </Modal>
      <EventTable
        events={events || []}
        onEdit={selectEditEvent}
        onDelete={(event: Event) => deleteEvent.mutate(event.id)}
      />
    </div>
  );
};
