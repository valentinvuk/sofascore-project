import { CategoryList } from "../modules/CategoryList";
import { DateChooser } from "../components/DateChooser";
import { SportChooser } from "../components/SportChooser";

export function HomePage() {
  return (
    <div className="App">
      <div className="chooser-container">
        <SportChooser />
        <DateChooser />
      </div>
      <CategoryList />
    </div>
  );
}
