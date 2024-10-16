import { EventForm } from "./components/EventForm";
import { EventTable } from "./components/EventTable";

export default function App() {
  return (
    <>
      <EventForm onSubmit={() => {}} />
      <EventTable onDelete={() => {}} onEdit={() => {}} events={[]} />
    </>
  );
}
