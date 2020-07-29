<script>
  let src = "images/login/login.jpg";
  export let mode = "Login";
  import LoginComponent from "../components/LoginComponent.svelte";
  import RegisterComponent from "../components/RegisterComponent.svelte";

  const setMode = value => {
    mode = value;
  };
  let showModal = false;
</script>

<style>
  .page-container {
    position: relative;
    display: flex;
    justify-content: flex-end;
    border-radius: 0px;
    background-color: rgb(65, 65, 65);
    background-repeat: no-repeat;

    height: 100vh;
    width: 100%;
    background-image: url("../images/login/login.jpg");
  }
</style>

<div class="page-container">
  <div>

    {#if mode == 'Login'}
      <LoginComponent />
    {:else}
      <RegisterComponent />
    {/if}

  </div>
</div>
