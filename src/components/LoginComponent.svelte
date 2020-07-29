<script>
  import { fade, fly } from "svelte/transition";
  import { auth, db } from "../firebase/firebase";
  import { Modal } from "svelte-chota";
  import Tos from "./Tos.svelte";
  let open = false;

  import { Sveltik, Form, Field, ErrorMessage } from "sveltik";
  let errorMessage = "";
  let initialValues = {
    email: "",
    password: ""
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

<style>
  * {
    box-sizing: border-box;
  }

  /* Add padding to containers */
  .container {
    padding: 10px 20px 10px 40px;
    min-width: 500px;
    max-width: 500px;
    margin-top: 100px;
    opacity: 0.9;
    background-color: rgb(65, 65, 65);
    justify-content: flex-start;
  }

  /* Full-width input fields */

  /* 
  .inputfield[type="text"]:focus,
  .inputfield[type="password"]:focus {
    background-color: #ddd;
    outline: none;
  } */
  label {
    color: white;
    width: 100%;
    overflow-wrap: break-word;
  }
  /* Set a style for the submit/register button */
  .registerbtn {
    background-color: rgb(123, 31, 162);
    color: white;
    padding: 5px 10px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
    width: 100%;
    opacity: 0.9;
  }

  .registerbtn:hover {
    opacity: 1;
  }

  /* Add a blue text color to links */
  a {
    color: dodgerblue;
  }
  p {
    font-size: small;
    color: white;
  }
  /* Set a grey background color and center the text of the "sign in" section */
  .signin {
    color: #f1f1f1;
    text-align: center;
  }
  .errorMessage {
    color: white;
    display: inline-block;
    font-style: italic;
  }
  input {
    width: 100%;
    padding: 5px;
    margin: 5px 0 15px 0;
    display: inline-block;
    border: none;
  }
  .container {
    opacity: 0.9;
    width: 100%;
    background-color: rgb(65, 65, 65);
    justify-content: flex-start;
  }
</style>

<div class="container" in:fly={{ y: -200, duration: 500 }}>
  <label id="errorMessage">{errorMessage}</label>
  <Sveltik {initialValues} {validate} {onSubmit} let:isSubmitting>
    <Form>
      <div>
        <div class="block">

          <label for="email">
            <b>Email</b>

          </label>
          <ErrorMessage class="errorMessage" name="email" as="label" />
        </div>
        <Field
          type="text"
          class="inputfield"
          placeholder="Enter Email"
          name="email"
          id="email"
          style="width:100%"
          bind:value={initialValues.email} />
        <div class="block">
          <label for="password">
            <b>Password</b>

          </label>
          <ErrorMessage class="errorMessage" name="password" as="label" />
        </div>
        <Field
          class="inputfield"
          type="password"
          placeholder="Enter Password"
          name="password"
          id="password"
          style="width:100%"
          bind:value={initialValues.password} />

        <button type="submit" class="registerbtn">Login</button>
      </div>

      <div class="signin">
        <p>
          Need an account?
          <a href="/login/register">Sign up</a>
          .
        </p>
      </div>
    </Form>
  </Sveltik>
  <Modal bind:open>
    <Tos />
  </Modal>
</div>
