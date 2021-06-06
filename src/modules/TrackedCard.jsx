import { useEffect } from "react";
import { CategoryEvent } from "./CategoryEvent";
export function TrackedCard({ events }) {
  useEffect(() => {
    console.log(events);
  }, [events]);
  return (
    <div className="card">
      <div className="card-category">
        <p>{events[0]?.tournament?.category?.sport?.name}</p>
      </div>
      <div className="card-events">
        <div className="uniq-events">
          {events
            .sort((a, b) => a.startTimestamp - b.startTimestamp)
            .map((event) => (
              <CategoryEvent
                event={event}
                key={event.id}
                remove={true}
              ></CategoryEvent>
            ))}
        </div>
      </div>
    </div>
  );
}
