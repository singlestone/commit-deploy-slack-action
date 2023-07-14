import { registerFilters, unregisterFilters } from "./filters.js";
import { registerHelpers, unregisterHelpers } from "./helpers.js";

export const register = () => {
  registerFilters();
  registerHelpers();
};

export const unregister = () => {
  unregisterHelpers();
  unregisterFilters();
};
