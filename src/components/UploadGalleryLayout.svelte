<script>

</script>

<style>
  .content {
    display: grid;
    grid-template-columns: repeat(1, minmax(10px, 1fr));
    grid-gap: 10px 10px;
  }

  /* @media screen and (min-width: 375px) {
    .content {
      grid-template-columns: repeat(2, minmax(10px, 1fr));
    }
  } 

  @media screen and (min-width: 400px) {
    .content {
      grid-template-columns: repeat(1, minmax(10px, 1fr));
    }
  }

  @media screen and (min-width: 569px) {
    .content {
      grid-template-columns: repeat(2, minmax(10px, 1fr));
    }
  }*/
</style>

<div class="content">
  <slot />
</div>
