import { sortUsers } from "./sortUsers.js";

export function getAutoSuggestUsers (loginSubstring = "", limit) {
  return this.filter(({ login }) => login.startsWith(loginSubstring)).slice(0, limit).sort(sortUsers);
};
