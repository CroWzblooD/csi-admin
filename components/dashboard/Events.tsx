import { getEvents } from "@/actions/events.actions"
import EventCard from "./EventCard"

export default async function Events() {
    const events = await getEvents()
  return (
    <div className="container mx-auto px-4 ">
    <h1 className="text-3xl font-bold mb-6 dark:text-white">Events</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  </div>
  )
}
