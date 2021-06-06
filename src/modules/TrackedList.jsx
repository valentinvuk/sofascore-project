import { useCallback, useContext, useEffect, useState } from "react";
import { TrackedContext } from "../context/TrackedContext";
import { TrackedCard } from "./TrackedCard";

export function TrackedList() {
  const { tracked } = useContext(TrackedContext);
  const [sports, setSports] = useState([]);

  useEffect(() => {
    tracked.map((event) => {
      let sportOfEventID = event?.tournament?.category?.sport?.id;
      if (!(sportOfEventID in sports)) {
        setSports((prev) => [...prev, sportOfEventID]);
      }
    });
  }, [tracked]);

  const renderTrackedSportsCards = useCallback(() => {
    let uniqSports = Array.from(new Set(sports));
    return uniqSports.map((sport) => {
      return (
        <TrackedCard
          key={sport}
          events={tracked.filter(
            (event) => event?.tournament?.category?.sport?.id === sport
          )}
        />
      );
    });
  }, [tracked, sports]);

  return <div className="trackedCards">{renderTrackedSportsCards()}</div>;
}
