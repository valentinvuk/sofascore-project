import { useParams } from "react-router";

export function CategoryPage() {
  let { id } = useParams();
  return <div className="App">Category:{id}</div>;
}
