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
    password: "",
    repeatPassword: ""
  };

  let validate = values => {
    const errors = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
    if (!values.password || values.password.length < 8) {
      errors.password = "Password of at least 8 characters required";
    }
    if (!values.repeatPassword || values.repeatPassword.length < 8) {
      errors.repeatPassword = "Password of at least 8 characters required";
    } else {
      if (values.repeatPassword != values.password) {
        errors.repeatPassword = "Password don't match";
      }
    }
    return errors;
  };

  // let handleSubmit = event => {
  //   console.log(event);
  //   email = event.target.email.value;
  //   password = event.target.email.value;

  //   auth.createUserWithEmailAndPassword(email, password).then(respnse => {
  //     console.log(respnse);
  //     event.target.reset();
  //   });
  // };

  let onSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      auth
        .createUserWithEmailAndPassword(values.email, values.password)
        .then(response => {
          console.log(response);
          event.target.reset();
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
    margin-right: 10px;
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
        <div class="block">

          <label for="repeatPassword">
            <b>Repeat Password</b>
          </label>
        </div>
        <ErrorMessage class="errorMessage" name="repeatPassword" as="label" />

        <Field
          type="password"
          class="inputfield"
          placeholder="Repeat Password"
          style="width:100%"
          name="repeatPassword"
          id="repeatPassword"
          bind:value={initialValues.repeatPassword} />

        <label>
          By creating an account you agree to our
          <a href="#" on:click={e => (open = true)}>Terms & Privacy</a>
          .
        </label>
        <button type="submit" class="registerbtn">Register</button>
      </div>

      <div class=" signin">
        <p>
          Already have an account?
          <a href="/login">Sign in</a>
          .
        </p>
      </div>
    </Form>
  </Sveltik>
  <Modal bind:open>
    <Tos />
  </Modal>
</div>
