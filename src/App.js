import "./App.css";
import { useState, useCallback, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Header } from "./components/Header";
import { HomePage } from "./views/HomePage";
import { CategoryPage } from "./views/CategoryPage";
import { EventPage } from "./views/EventPage";
import { TrackedContext } from "./context/TrackedContext";

function App() {
  const [tracked, setTracked] = useState([]);

  const addToTracked = useCallback((newItem) => {
    setTracked((prev) => [...prev, newItem]);
  }, []);
  const removeFromTracked = useCallback((itemId) => {
    setTracked((prev) => prev.filter((i) => i.id !== itemId));
  }, []);
  const isInTracked = useCallback(
    (itemId) => {
      return tracked.some((i) => i.id === itemId);
    },
    [tracked]
  );
  useEffect(() => {
    console.log(tracked);
  }, [tracked]);

  return (
    <TrackedContext.Provider
      value={{ tracked: tracked, addToTracked, removeFromTracked, isInTracked }}
    >
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Redirect to="/home/football/0"></Redirect>
          </Route>
          <Route path="/home/:sport/:offset" component={HomePage} />
          <Route path="/category/:id" component={CategoryPage} />
          <Route path="/event/:id" component={EventPage} />
          <Route path="*">
            <div className="App">404</div>
          </Route>
        </Switch>
      </Router>
    </TrackedContext.Provider>
  );
}

export default App;
