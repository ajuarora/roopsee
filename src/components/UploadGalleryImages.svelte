<script>
  import FileUpload from "sveltefileuploadcomponent";
  import CustomGrid from "../components/CustomGrid.svelte";

  let files = [];
  let header = "";

  import UploadImage from "../components/UploadImage.svelte";
  const handleUploads = uploadeFiles => {
    var addedFiles = [];
    var found = false;
    console.log(uploadeFiles);
    // Array.from(event.target.files).forEach(file => {
    uploadeFiles.detail.files.forEach(file => {
      found = false;
      files.forEach(a => {
        if (a.name == file.name) {
          found = true;
        }
      });
      if (!found) addedFiles.push(file);
    });
    files = [...files, ...addedFiles];
  };
</script>

<style>
  span {
    margin-top: 20px;
  }
  .divButton {
    display: inline-block;
    color: #444;
    border: 1px solid #ccc;
    background: #ddd;
    box-shadow: 0 0 5px -1px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    vertical-align: middle;
    /* max-width: 100px; */
    margin-top: 25px;
    padding: 5px;
    text-align: center;
  }
  .divButton:active {
    color: white;
    background-color: indigo;
    box-shadow: 0 0 5px -1px rgba(0, 0, 0, 0.6);
  }
</style>

<FileUpload multiple={true} on:input={handleUploads}>
  <div class="divButton">Click to upload files.</div>
</FileUpload>

<!-- <input
      type="file"
      multiple
      on:change={handleUploads}
      style="padding-top:20px" /> -->
<CustomGrid {header}>
  {#each files as file}
    <UploadImage {file} />
  {/each}
</CustomGrid>
