import { useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import { TrackedContext } from "../context/TrackedContext";
import { epochToDate } from "../utils/epochToDate";
import CancelSvg from "./CancelSvg";

export function TrackedEvent({ event }) {
  const { removeFromTracked } = useContext(TrackedContext);
  const getStartTime = useCallback(
    () => epochToDate(event.startTimestamp),
    [event.startTimestamp]
  );
  const handleTracked = useCallback(() => {
    removeFromTracked(event.id);
  }, [removeFromTracked, event.id]);
  return (
    <div className="tracked-event">
      <div className="start-time">
        {event.status.type === "inprogress" ? (
          <p className="inprogressLabel">Live</p>
        ) : event.status.type === "finished" ? (
          <p className="endLabel">End</p>
        ) : (
          getStartTime()
        )}
      </div>
      <div className="teams">
        <Link
          to={{ pathname: `/event/${event?.id}`, state: { event: event } }}
          style={{ textDecoration: "none", color: "black" }}
        >
          {/* napraviti /components za prikaz tima i imena pokraj */}
          <p>{event.homeTeam.name}</p>
          <p>{event.awayTeam.name}</p>
        </Link>
      </div>
      <div className={`${event.status.type}`}>
        {event.status.type === "finished" ||
        event.status.type === "inprogress" ? (
          <>
            <p className="score">{event.homeScore.display}</p>
            <p className="score">{event.awayScore.display}</p>
          </>
        ) : (
          <CancelSvg
            fill="#F7DC6F"
            onClick={handleTracked}
            height="20"
          ></CancelSvg>
        )}
      </div>
    </div>
  );
}
