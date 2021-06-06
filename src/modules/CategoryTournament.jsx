import { useEffect, useState } from "react";

export function CategoryTournament({ unique, tournament }) {
  const [image, setImage] = useState();

  useEffect(() => {
    async function fetchImage() {
      try {
        const res = await fetch(
          `https://master.dev.sofascore.com/api/v1/unique-tournament/${unique.id}/image`
        );
        if (res.status === 404) {
          setImage(false);
        } else {
          const blob = await res.blob();

          setImage(URL.createObjectURL(blob));
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchImage();

    return () => setImage();
  }, [unique?.id]);

  return (
    <div className="uniqueTournament">
      {image ? <img src={image} alt=" " /> : " "}
      <p>{tournament?.name ? tournament.name : "Other "}</p>
    </div>
  );
}
