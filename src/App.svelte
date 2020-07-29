<script>
  import Session from "./stores/Session";

  import Navbar from "./Components/Navbar.svelte";

  import { onMount } from "svelte";
  import { auth, db } from "./firebase/firebase";
  onMount(async () => {});

  auth.onAuthStateChanged(user => {
    if (user) {
      $Session.loggedIn = true;
      $Session.userName = user.email;
    } else {
      $Session.loggedIn = false;
      $Session.userName = "";
    }
  });
</script>

<style>

</style>

<Navbar />
