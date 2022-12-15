<script lang="ts">
import session from "../stores/session";
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    name: String,
    msg: { type: String, required: true }
  },
  data() {
    return {
      generalUsers: []
    }
  },
  mounted() {
    fetch("http://localhost:3000/api/users")
      .then(response => response.json())
      .then(result => {
        this.generalUsers = result.filter((user) => user.email != session.user?.email);
      })
  },
  methods: {
    deleteUser(deleteuser) {
      this.generalUsers = this.generalUsers.filter((user) => user.email != deleteuser.email);
      fetch('http://localhost:3000/api/users/' + deleteuser._id, { method: 'DELETE' })
        .then(() => {

        });

    }
  }
})

</script>
<template>

  <div class="manage main">
    <h1 class="mgt-medium title">Manage Users</h1>
    <div class="card">
      <div class="card-content">
        <div class="content">
          <table class="table is-narrow" v-if="this.generalUsers.length > 0">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Second Name</th>
                <th>Email</th>
                <th></th>
              </tr>
            </thead>
            <tbody v-for="user in this.generalUsers">
              <tr key={{user.id}}>
                <td>{{ user.firstName }}</td>
                <td>{{ user.lastName }}</td>
                <td>{{ user.email }}</td>
                <td id="delete"><span class="icon-text">
                    <span class="icon">
                      <i class="fas fa-trash" v-on:click="this.deleteUser(user)"></i>
                    </span>
                  </span></td>
              </tr>
            </tbody>

          </table>
          <p v-else id="delete">There are no users</p>
        </div>
      </div>
    </div>
  </div>

</template>

<style>
.manage {
  padding: 40px;
  height: 50%;
}

.main {
  background-image: url(../assets/2.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;

}

.table {
  padding: 150px;

}

.card {
  width: 50%;
  height: 400px;
}

#delete {
  color: red;
  cursor: pointer;

}
</style>
