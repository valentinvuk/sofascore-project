export async function fetchCategoryList(sport, offset = 0) {
  let today = new Date();
  today.setDate(today.getDate() + Number(offset));
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();
  let fetchDate = yyyy + "-" + mm + "-" + dd;
  const res = await fetch(
    `https://master.dev.sofascore.com/api/v1/sport/${sport}/${fetchDate}/7200/categories`
  );
  return res.json();
}
