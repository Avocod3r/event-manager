import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Event,
  EventCategory,
  eventSchema,
  EventStatus,
} from "../types/models/event.model";

type EventFormProps = {
  onSubmit: (data: Event) => void;
  initialData?: Event;
};

export const EventForm: React.FC<EventFormProps> = ({
  onSubmit,
  initialData,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      category: EventCategory.PERSONAL,
      date: new Date(),
      status: EventStatus.UPCOMING,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6">
      <div>
        <label>
          Event name <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          {...register("name")}
          className="border p-2 w-full rounded-sm"
        />
        {errors.name && (
          <p className="text-danger text-sm">{errors.name.message}</p>
        )}
      </div>
      <div>
        <label>Event Description</label>
        <textarea
          {...register("description")}
          className="border p-2 w-full rounded-sm resize-none h-full"
        ></textarea>
      </div>
      <div>
        <label>Category</label>
        <select
          {...register("category")}
          className="border p-2 w-full rounded-sm"
        >
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          <option value="leisure">Leisure</option>
        </select>
      </div>
      <div>
        <label>Date</label>
        <input
          type="date"
          {...register("date")}
          className="border p-2 w-full rounded-sm"
        />
        {errors.date && (
          <p className="text-danger text-sm">{errors.date.message}</p>
        )}
      </div>
      <div>
        <label>Status</label>
        <select
          {...register("status")}
          className="border p-2 w-full rounded-sm"
        >
          <option value="upcoming">Upcoming</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-primary text-typo px-4 py-2 border-none hover:bg-primary-light rounded-sm"
      >
        Submit
      </button>
    </form>
  );
};
