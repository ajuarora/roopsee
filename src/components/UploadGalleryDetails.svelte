<script>
  import { Sveltik, Form, Field, ErrorMessage } from "sveltik";
  let errorMessage = "";
  let initialValues = {
    title: "",
    introduction: ""
  };

  let validate = values => {
    const errors = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    return errors;
  };

  let onSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      auth
        .signInWithEmailAndPassword(values.email, values.password)
        .then(response => {
          console.log(response);
          db.collection("TOS")
            .get()
            .then(snapshot => console.log(snapshot.docs[0].data()))
            .catch(err => console.log(err));
        })
        .catch(error => {
          errorMessage = error;
        });
      setSubmitting(false);
    }, 1000);
  };
</script>

<label id="errorMessage">{errorMessage}</label>

<Sveltik {initialValues} {validate} {onSubmit} let:isSubmitting>
  <Form>
    <div>
      <div class="block">

        <label for="title">
          <b>Title</b>

        </label>
        <ErrorMessage class="errorMessage" name="title" as="label" />
      </div>
      <Field
        type="text"
        class="inputfield"
        placeholder="Gallery Title"
        name="title"
        id="title"
        style="width:100%"
        bind:value={initialValues.title} />
      <div class="block">
        <label for="introduction">
          <b>Intoduction</b>

        </label>
        <ErrorMessage class="errorMessage" name="introduction" as="label" />
      </div>
      <Field
        as="textarea"
        rows="10"
        class="inputfield"
        type="text"
        placeholder="Gallery Introduction"
        name="introduction"
        id="introduction"
        style="width:100%"
        bind:value={initialValues.introduction} />

      <button type="submit" class="registerbtn">Create Gallery</button>
    </div>
  </Form>
</Sveltik>
