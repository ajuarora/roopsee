<script>
  import UploadGalleryLayout from "../components/UploadGalleryLayout.svelte";

  import UploadGalleryDetails from "../components/UploadGalleryDetails.svelte";
</script>

<style>
  span {
    margin-top: 20px;
  }
  .wrapper {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 5px;
  }

  .pageContainer {
    display: flex;
    x-justify-content: space-around;
    x-align-items: stretch;
    max-width: 1200px;
  }
  .column.left {
    width: 600px;
    flex: 0 0 600px;
  }
  .column.right {
    width: 600px;
    flex: 0 0 600px;
    border-left: 1px solid #eee;
  }
  .column.center {
    border-left: 1px solid #eee;
  }
</style>

<div class="wrapper pageContainer">
  <div class="column left">
    <span>
      <p>Step 1. Provide gallery details</p>
      <UploadGalleryDetails />
    </span>
  </div>
  <div class="column right">

    <span>
      <p>Step 2. Upload images</p>

    </span>
  </div>
</div>
