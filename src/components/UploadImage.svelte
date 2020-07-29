<script>
  export let file;
  import { writable } from "svelte/store";

  const progress = writable(0);
  import { storage } from "../firebase/firebase";
  import { onMount } from "svelte";
  import FileUploadThumbnail from "file-upload-thumbnail";

  import Icon from "fa-svelte";
  import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";

  // let icon = faDumpster;

  let src;

  onMount(async () => {
    new FileUploadThumbnail({
      maxWidth: 191,
      maxHeight: 191,
      file: file,
      onSuccess: function(srcCreated) {
        console.log(srcCreated);
        src = srcCreated || "";
      }
    }).createThumbnail();
    var uploadTask = storage.ref("images/" + file.name).put(file);

    uploadTask.on(
      "state_changed",
      function(snapshot) {
        progress.set((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        console.log("Upload is " + progress + "% done");
      },
      function(error) {},
      function() {
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log("File available at", downloadURL);
          storage
            .ref("images")
            .child("Tnail/" + file.name)
            .putString(src.replace(/^data:image\/[a-z]+;base64,/, ""), "base64")
            .then(console.log("Success"))
            .catch(error => console.log(error));
        });
      }
    );
  });
</script>

<style>
  .card {
    /* Add shadows to create the "card" effect */
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
  }

  /* On mouse-over, add a deeper shadow */
  .card:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }

  /* Add some padding inside the card container */
  .container {
    display: flex;
    padding: 2px 10px;
    justify-content: space-between;
  }
  .trash {
    color: rgb(148, 0, 211);
    border: none;

    background-color: inherit;
  }
  progress {
    display: block;
    width: 100%;
  }
  label {
    font-size: x-small;
    vertical-align: middle;
  }
</style>

<div class="card">
  <img {src} alt="" />
  <div class="container">
    {#if $progress < 100}
      <progress value={$progress} />
    {:else}
      <label for="usethis">

        <input type="radio" id="usethis" name="gender" value={file.name} />
        Main picture
      </label>
      <button class="trash">
        <Icon icon={faTrash} />
      </button>
    {/if}

  </div>
</div>
