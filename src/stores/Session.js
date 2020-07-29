import { writable } from "svelte/store";

let session = writable({
  isAdmin: "false",
  loggedIn: false,
  userName: "",
  token: "",
});

export default session;
