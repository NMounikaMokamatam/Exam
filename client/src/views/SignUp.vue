<template>
  <div class="columns is-mobile is-centered">
    <div class="column top-gap is-11-mobile is-half-tablet is-half-desktop is-half-widescreen is-half-fullhd">
      <div class="box">
        <h1 class="title text-center">Please Register</h1>
        <h1 class="title text-center">Signup</h1>
        <div class="field">
          <label class="label">Name</label>
          <div class="control">
            <input class="input" type="text" v-model="name" placeholder="Enter your name" />
          </div>
        </div>
        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input class="input" name="email" v-model="email" type="email" placeholder="Enter your email" />
          </div>
        </div>
        <div class="field">
          <label class="label">Age</label>
          <div class="control">
            <input class="input" v-model="age" type="number" placeholder="Enter your age" />
          </div>
        </div>
        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input class="input" name="password" v-model="password" type="password" placeholder="Enter password" />
          </div>
        </div>
        <div class="field">
          <label class="label">Confirm Password</label>
          <div class="control">
            <input class="input" name="cpassword" v-model="password_confirmation" type="password"
              placeholder="Retype password" />
          </div>
        </div>
        <button class="button is-primary" v-on:click="submitForm()">Sign up</button>
      </div>
    </div>
  </div>
</template>
<script>
import router from "../router/index"

const API_URL = "http://localhost:3000/api/users";

export default {
  name: "signup",
  data: () => ({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    age: 0,

  }),

  mounted() {

  },
  methods: {
    submitForm() {
      const body = JSON.stringify(
        {
          firstName: this.name.split(" ")[0],
          lastName: this.name.split(" ")[1],
          email: this.email,
          username: this.name.split(" ")[0],
          password: this.password,
          age: this.age,
          isAdmin: false
        }
      );

      fetch(API_URL, {
        method: "POST",
        body: body,
        headers: {
          "content-type": "application/json"
        }
      })
        .then(response => response.json())
        .then(result => {
          router.push('/signin');
        });

    }
  }
};
</script>

<style>
.top-gap {
  margin-top: 2rem;
}

.text-center {
  text-align: center;
}
</style>
