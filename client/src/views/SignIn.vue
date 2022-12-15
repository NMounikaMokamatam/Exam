<script setup lang="ts">
import {ref} from 'vue'
import { login } from '../stores/session'
const useremail = ref('');
const password = ref('');

function userLogin(){

  login(useremail.value,password.value)
}

</script>
<template>
  <div class="columns is-mobile is-centered">
    <div class="column top-gap is-11-mobile is-half-tablet is-half-desktop is-half-widescreen is-half-fullhd">
      <div class="box">
        <h1 class="title text-center">Signin</h1>
        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input v-model="useremail" class="input" name="email" type="email" placeholder="Enter your email" />
          </div>
        </div>
        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input v-model="password" class="input" name="password" type="password" placeholder="Enter password" />
          </div>
        </div>
        <button class="button is-primary" v-on:click="userLogin()">Sign in</button>
      </div>
    </div>
  </div>
</template>
<style>
.top-gap {
  margin-top: 2rem;
}
.text-center{
    text-align: center;
}
</style>
