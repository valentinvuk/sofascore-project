import { useCallback, useRef, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SvgComponent from "../components/BellSvg";
import CancelSvg from "../components/CancelSvg";
import { TrackedContext } from "../context/TrackedContext";
import { epochToDate } from "../utils/epochToDate";
import { fetchVenue } from "../api/eventVenue";

export function CategoryEvent({ event, remove }) {
  const { addToTracked, isInTracked, removeFromTracked } =
    useContext(TrackedContext);
  const [eventDetails, setEventDetails] = useState({});
  const [ready, setReady] = useState(true);
  const mountedRef = useRef(true);

  /* useEffect(() => {
    async function fetchEventDetails() {
      try {
        const res = await fetchVenue(event?.id);
        setEventDetails(res?.event);
      } catch (error) {
        console.log(error);
      }
      setReady(false);
    }
    if (ready) {
      fetchEventDetails();
      console.log("fetcham");
    }

    return () => {
      mountedRef.current = false;
    };
  }, [ready, event?.id]);

  useEffect(() => {
    let intervalID = setInterval(() => {
      setReady(true);
    }, 10000);

    return () => {
      clearInterval(intervalID);
    };
  }, []); */

  const getStartTime = useCallback(
    () => epochToDate(event?.startTimestamp),
    [event?.startTimestamp]
  );
  const handleTracked = useCallback(() => {
    if (!isInTracked(event?.id)) {
      addToTracked(event);
    }
  }, [addToTracked, isInTracked, event]);

  return (
    <div className="category-event">
      <div className="start-time">
        {event?.status?.type === "inprogress" ? (
          <p className="inprogressLabel">Live</p>
        ) : event?.status?.type === "finished" ? (
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
          <p>{event?.homeTeam?.name}</p>
          <p>{event?.awayTeam?.name}</p>
        </Link>
      </div>
      {remove ? (
        <div className={`${event?.status?.type}`}>
          <CancelSvg
            height="20"
            fill="#2c2c5e"
            style={{ cursor: " pointer" }}
            onClick={() => removeFromTracked(event?.id)}
          />
        </div>
      ) : (
        <div className={`${event?.status?.type}`}>
          {event?.status?.type === "finished" ||
          event?.status?.type === "inprogress" ? (
            <>
              <p className="score">{event?.homeScore?.display}</p>
              <p className="score">{event?.awayScore?.display}</p>
            </>
          ) : (
            <SvgComponent
              fill="#F7DC6F"
              onClick={handleTracked}
              height="20"
              style={{ cursor: " pointer" }}
            ></SvgComponent>
          )}
        </div>
      )}
    </div>
  );
}
