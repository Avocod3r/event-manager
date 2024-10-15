import { EventForm } from "./components/EventForm";

export default function App() {
  return (
    <>
      <h1 className="text-3xl font-bold underline text-success">
        Hello world!
      </h1>
      <EventForm onSubmit={() => {}} />
    </>
  );
}
