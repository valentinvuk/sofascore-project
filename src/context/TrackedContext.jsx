import { createContext } from "react";

export const TrackedContext = createContext({
  events: [],
  addToTracked: () => {},
  removeFromTracked: () => {},
});
