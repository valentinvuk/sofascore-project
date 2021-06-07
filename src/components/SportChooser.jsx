import { useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { useIsWide } from "../hooks/isWide";
export function SportChooser() {
  const { sport, offset } = useParams();
  const isWide = useIsWide();

  const renderSportEmoji = useCallback(() => {
    if (sport === "football") return " ⚽";
    if (sport === "basketball") return " 🏀";
    if (sport === "handball") return " 🤾‍";
    if (sport === "baseball") return " ⚾";
    if (sport === "volleyball") return " 🏐";
  }, [sport]);

  return (
    <div className="sports-chooser">
      {isWide ? (
        <>
          <Link
            to={`/home/football/${offset}`}
            className={`${sport === "football" ? "active" : ""}`}
          >
            Football ⚽
          </Link>
          <Link
            to={`/home/basketball/${offset}`}
            className={`${sport === "basketball" ? "active" : ""}`}
          >
            Basketball 🏀
          </Link>
          <Link
            to={`/home/baseball/${offset}`}
            className={`${sport === "baseball" ? "active" : ""}`}
          >
            Baseball ⚾
          </Link>
          <Link
            to={`/home/handball/${offset}`}
            className={`${sport === "handball" ? "active" : ""}`}
          >
            Handball 🤾‍♂️
          </Link>
          <Link
            to={`/home/volleyball/${offset}`}
            className={`${sport === "volleyball" ? "active" : ""}`}
          >
            Volleyball 🏐
          </Link>
        </>
      ) : (
        <>
          <div className="dropdown">
            <h3>
              {sport}
              {renderSportEmoji()}
            </h3>
            <div className="dropdown-content">
              <Link
                to={`/home/football/${offset}`}
                className={`${sport === "football" ? "active" : ""}`}
              >
                Football
              </Link>
              <Link
                to={`/home/basketball/${offset}`}
                className={`${sport === "basketball" ? "active" : ""}`}
              >
                Basketball
              </Link>
              <Link
                to={`/home/baseball/${offset}`}
                className={`${sport === "baseball" ? "active" : ""}`}
              >
                Baseball
              </Link>
              <Link
                to={`/home/handball/${offset}`}
                className={`${sport === "handball" ? "active" : ""}`}
              >
                Handball
              </Link>
              <Link
                to={`/home/volleyball/${offset}`}
                className={`${sport === "volleyball" ? "active" : ""}`}
              >
                Volleyball
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
