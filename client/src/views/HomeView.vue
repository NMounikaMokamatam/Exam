<script>
import session from "../stores/session";
import { defineComponent } from "vue";
import { useExcercisesStore } from "../stores/excerciseStore";

const API_URL = "http://localhost:3000/api/";
const data = [
  "Angular",
  "Angular 2",
  "Aurelia",
  "Backbone",
  "Ember",
  "jQuery",
  "Meteor",
  "Node.js",
  "Polymer",
  "React",
  "RxJS",
  "Vue.js",
];

export default defineComponent({
  name: "HomeVue",
  data: () => ({
    myExcercises: [],
    excerciseName: "",
    description: "",
    selected: ""
  }),
  mounted() {
    fetch(API_URL + "excercises/" + session.user._id)
      .then(response => response.json())
      .then(result => {
        this.myExcercises = result;
      });
  },
  computed: {
    filteredDataArray() {
      const body = JSON.stringify({
        value: this.excerciseName
      })
      const excerciseStore = useExcercisesStore();
      excerciseStore.getMatchingExcerciseTitle(body)
      return excerciseStore.exerciseTitleList;
    }
  },
  methods: {
    addExcersise() {
      const body = JSON.stringify(
        {
          userId: session.user._id,
          excercise: this.excerciseName,
          description: this.description,
        }
      );
      fetch(API_URL + "excercises", {
        method: "POST",
        body: body,
        headers: {
          "content-type": "application/json"
        }
      })
        .then(response => response.json())
        .then(result => {
          this.myExcercises.push(result)
        });
    }
  }
});
</script>
<template>
  <main class="columns is-centered is-vcentered is-mobile">
    <div class="columns is-mobile is-centered container">
      <div class="column top-gap is-11-mobile is-half-tablet is-half-desktop is-half-widescreen is-half-fullhd">
        <div class="box">
          <h1 class="title text-center">New Workout Exercise</h1>
          <div class="field">
            <label class="label">Name</label>
            <div class="control">
              <!-- <input class="input" placeholder="Enter exercise name" v-model="excerciseName" /> -->
              <o-autocomplete v-model="excerciseName" rounded expanded placeholder="e.g. Jogging" icon="search"
                clearable :data="filteredDataArray" @select="(option) => (selected = option)">
                <template #empty>No results found</template>
              </o-autocomplete>
            </div>
          </div>
          <div class="field">
            <label class="label">Description</label>
            <div class="control">
              <input v-model="description" class="textarea" name="description"
                placeholder="Enter exercise decription" />
            </div>
          </div>
          <button type="submit" class="button is-primary" v-on:click="addExcersise()">Save</button>
        </div>
      </div>
    </div>
    <div class="container is-max-desktop">
      <div class="notification is-light">
        <h1 style="font-size: 2em;">ExcersiseList:</h1>
        <div class="notification is-dark" v-for="e in myExcercises">
          <button class="delete" @click=""></button>
          {{ e.excercise }}
          <p>{{ e.description }}</p>
        </div>
      </div>
    </div>
  </main>
</template>
<style scoped>
main {
  background-image: url(../assets/2.jpg);
  background-position: center center;
  background-repeat: no-repeat;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: 100% 100%;
  min-height: 120vh;
  color: white;
}

.primary {
  color: #e40215;
}

.primary-background {
  background-color: #e40215;
}

.secondary {
  color: #f5f5f5;
}

.top-gap {
  margin-top: 2rem;
}

.text-center {
  text-align: center;
}

.notification {
  background-color: whitesmoke;
  border-radius: 10px;
  position: relative;
}

.navbar.is-spaced {
  padding: 10 px 0px;
}

.column {
  display: block;
  flex-basis: 0;
  flex-grow: 1;
  flex-shrink: 1;
  padding: 0.75px;
}

.box {
  margin-top: left;
}
</style>

