import { useCallback } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export function DateChooser() {
  const { sport, offset } = useParams();
  const showDate = useCallback(() => {
    let today = new Date();
    today.setDate(today.getDate() + Number(offset));
    let dd = String(today.getDate());
    let mm = String(today.getMonth() + 1);
    let yyyy = today.getFullYear();
    return dd + "/" + mm + "/" + yyyy;
  }, [offset]);

  return (
    <div className="date-chooser">
      <Link to={`/home/${sport}/${String(Number(offset) - 1)}`}>&lt;</Link>
      <p>{showDate()}</p>
      <Link to={`/home/${sport}/${String(Number(offset) + 1)}`}>&gt;</Link>
    </div>
  );
}
