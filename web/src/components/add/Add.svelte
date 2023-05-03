<script>
  import CancelButton from "./CancelButton.svelte";

  const handleFileUpload = (event ) => {
    console.log(event)
  }
</script>

<form on:submit|preventDefault={handleFileUpload}>
  <input type="text" id="name" class="border border-gray-500 rounded-lg" placeholder="Name" required>

  <input type="file" id="file" name="file" required />

  <button type="submit">Submit</button>
</form>
<CancelButton />
