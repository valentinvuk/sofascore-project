export async function fetchVenue(id) {
  const res = await fetch(
    `https://master.dev.sofascore.com/api/v1/event/${id}`
  );
  return res.json();
}
