<script lang="ts">
import session from "../stores/session";
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      //NEW
      loggednUser: session.user?.username,
      inputComment: false,
      commentText: "",
      allUsers: [],
      currentSelectedUser: {},
      currentSelectedUserComments: [],
      currentSelectedUserExcercises: [],
      currentSelectedUserStringInfo: ""

    }
  },
  mounted() {
    fetch("http://localhost:3000/api/users")
      .then(response => response.json())
      .then(result => {
        this.allUsers = result.filter((user) => !user.isAdmin);
        this.currentSelectedUser = result[0]
        this.currentSelectedUserStringInfo = result[0].username + " " + result[0].lastName


        fetch("http://localhost:3000/api/comments/" + this.currentSelectedUser._id)
          .then(response => response.json())
          .then(result => {
            this.currentSelectedUserComments = result
          });

        fetch("http://localhost:3000/api/excercises/" + this.currentSelectedUser._id)
          .then(response => response.json())
          .then(result => {
            this.currentSelectedUserExcercises = result
          });

      });

  },
  methods: {
    showCommentBox(user) {
      this.inputComment = true
      this.currentSelectedUserStringInfo = user.username + " " + user.lastName
      this.currentSelectedUser = user

      fetch("http://localhost:3000/api/comments/" + user._id)
        .then(response => response.json())
        .then(result => {
          this.currentSelectedUserComments = result
        });

    },
    addComment() {
      const body = JSON.stringify({
        commentTo: this.currentSelectedUser._id,
        title: this.commentText,
        createdBy: session.user?.username,
      });

      fetch("http://localhost:3000/api/comments", {
        method: "POST",
        body: body,
        headers: {
          "content-type": "application/json"
        }
      })
        .then(response => response.json())
        .then(result => {
          this.currentSelectedUserComments.push(result);
        });
      //reset
      this.commentText = ""
      this.inputComment = false
    },
    getComments(user) {
      this.inputComment = false
      this.currentSelectedUser = user
      this.currentSelectedUserStringInfo = user.username + " " + user.lastName
      fetch("http://localhost:3000/api/comments/" + user._id)
        .then(response => response.json())
        .then(result => {
          this.currentSelectedUserComments = result
        });

    }
  }
})

</script>
<template>


  <div class="columns">

    <div class="column">
      <div class="card" v-for="u in this.allUsers" style="height: 250px; width: 600px; margin-bottom: 5px;">
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title is-4">{{ u.firstName }} {{ u.lastName }} ({{ u.age + " years" }})</p>
            </div>
          </div>
          <div class="content" v-for="excercise in this.currentSelectedUserExcercises">
            {{ excercise.excercise }}: {{ excercise.description }}
          </div>
          <div>
            <span
              style="color: blue; cursor: pointer; float: right; background-color:aquamarine; padding: 10px; color: black;"
              v-on:click="showCommentBox(u)">Comment</span>
            <span style="padding: 20px; float: right; "></span>
            <span
              style="color: blue; cursor: pointer; float: right; background-color:coral; padding: 10px; color: black;"
              v-on:click="getComments(u)">Read comments
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="column" style="margin-top: 15px;">
      <h1 style="font-weight: bold; margin-bottom: 20px;">Comments for {{ currentSelectedUserStringInfo }}</h1>
      <h3>
        <span v-if="(this.currentSelectedUserComments.length > 0)" style="color:coral">{{
            this.currentSelectedUserComments.length
        }} comments</span>
        <span v-if="(this.currentSelectedUserComments.length == 0)" style="color:coral">Be the first to
          comment</span>
      </h3><br>
      <div v-if="inputComment">

        Add Comment
        <textarea class="textarea is-info" placeholder="Add your comments here" v-model="commentText">

        </textarea>
        <div class="buttons" style="margin-top: 10px; float: right;">
          <button class="button is-info" style="float: right;" v-on:click="addComment()">Submit</button>
        </div>
      </div>
      <div v-else>
        <p v-if="(this.currentSelectedUserComments.length == 0)">There no comments for this user</p>
        <div v-else>
          <article class="message" style="margin-top: 3px;" v-for="comment in this.currentSelectedUserComments">
            <div class="message-body">
              <strong>{{ comment.createdBy }} said</strong><br>
              {{ comment.title }}
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>

</template>