import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchCategoryEvents } from "../api/categoryEvents";
import { CategoryEvent } from "./CategoryEvent";
import { CategoryTournament } from "./CategoryTournament";

export function CategoryCard({ category }) {
  const [events, setEvents] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const { offset } = useParams();

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetchCategoryEvents(category.id, offset);
        setEvents(res.events);
      } catch (err) {
        console.log(err);
      }
    }
    fetchEvents();

    return () => {
      setEvents([]);
      setTournaments([]);
    };
  }, [category, offset]);

  const renderTournaments = useCallback(() => {
    if (events.length) {
      events.map((event) =>
        tournaments.indexOf(event.tournament?.id) === -1
          ? setTournaments((prev) => [...prev, event.tournament?.id])
          : null
      );
      let tournamentsSet = Array.from(new Set(tournaments));
      return tournamentsSet.map((tournamentId) => {
        let tournamentEvent = events.filter(
          (event) => tournamentId === event.tournament?.id
        );
        return (
          <div key={Math.random()}>
            <CategoryTournament
              unique={tournamentEvent[0]?.tournament?.uniqueTournament}
              tournament={tournamentEvent[0]?.tournament}
            ></CategoryTournament>
            <div className="uniq-events">
              {tournamentEvent
                .sort((a, b) => a.startTimestamp - b.startTimestamp)
                .map((event) => (
                  <CategoryEvent
                    event={event}
                    key={event.id}
                    remove={false}
                  ></CategoryEvent>
                ))}
            </div>
          </div>
        );
      });
    } else return <p className="loading">Loading...</p>;
  }, [events, tournaments]);

  return (
    <div className="card">
      <div className="card-category">
        {category?.alpha2 ? (
          <img
            src={`https://www.countryflags.io/${
              category?.alpha2 === "EN" ? "GB" : category?.alpha2
            }/flat/64.png`}
            alt=" "
          />
        ) : (
          "🌍"
        )}

        <p>&nbsp;{category.name}</p>
      </div>
      <div className="card-events"> {renderTournaments()} </div>
    </div>
  );
}
