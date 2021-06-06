import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { fetchVenue } from "../api/eventVenue";

export function EventPage() {
  const [homeImage, setHomeImage] = useState();
  const [awayImage, setAwayImage] = useState();
  const [venue, setVenue] = useState();
  let { id } = useParams();
  let { event } = useLocation().state;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    async function fetchEventVenue() {
      try {
        const res = await fetchVenue(id);
        setVenue(res?.event?.venue?.stadium?.name);
      } catch (error) {
        console.log(error);
      }
    }
    fetchEventVenue();

    return () => setVenue();
  }, [id]);

  useEffect(() => {
    async function fetchHomeImage() {
      try {
        const res = await fetch(
          `https://master.dev.sofascore.com/api/v1/team/${event.homeTeam.id}/image`
        );
        if (res.status === 404) {
          setHomeImage(false);
        } else {
          const blob = await res.blob();

          setHomeImage(URL.createObjectURL(blob));
        }
      } catch (error) {
        console.log(error);
      }
    }
    async function fetchAwayImage() {
      try {
        const res = await fetch(
          `https://master.dev.sofascore.com/api/v1/team/${event.awayTeam.id}/image`
        );
        if (res.status === 404) {
          setAwayImage(false);
        } else {
          const blob = await res.blob();

          setAwayImage(URL.createObjectURL(blob));
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchHomeImage();
    fetchAwayImage();

    return () => {
      setHomeImage();
      setAwayImage();
    };
  }, [event]);

  return (
    <div className="App eventPage" style={{ color: "white" }}>
      <div className="event-container">
        <div className="eventHeadline">
          <div className="evenTeam">
            {homeImage ? <img src={homeImage} alt=" " /> : ""}
            <p>{event.homeTeam.name}</p>
          </div>
          <h1 className={`${event.status.type}`}>
            &nbsp;{event.homeScore.display}&nbsp;
          </h1>
          <div className="eventMiddle">
            <h3>vs</h3>
            {event.status.code !== 100 ? (
              event.status.type === "inprogress" ? (
                <p className="inprogressLabel">Live</p>
              ) : (
                "Yet to play"
              )
            ) : (
              ""
            )}
          </div>
          <h1 className={`${event.status.type}`}>
            &nbsp;{event.awayScore.display}&nbsp;
          </h1>
          <div className="evenTeam">
            {awayImage ? <img src={awayImage} alt=" " /> : ""}
            <p>{event.awayTeam.name}</p>
          </div>
        </div>
        {venue ? <p>Venue: {venue}</p> : null}
      </div>
    </div>
  );
}
