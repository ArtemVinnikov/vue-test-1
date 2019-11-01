<template>
  <div class="data-page">
    <h2>User Page</h2>
    <user-form 
      :user="user_data"
      @save:user="saveUser"
    />
  </div>
</template>

<script>
import axios from 'axios';
import UserForm from './UserForm.vue';

export default {
  name: 'UserTable',
  components: {
    UserForm
  },
  data() {
    return {
      user_data: {}
    }
  },
  mounted() {
    axios.get('https://jsonplaceholder.typicode.com/users/' + this.$route.params.id)
    .then(response => {
      this.user_data = response.data
      console.log(this.user_data)
    })
    .catch(e => {
      console.error(e)
    })
  },
  methods: {
    async getUsers() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const data = await response.json()
        this.users = data
      } catch (error) {
        console.error(error)
      }
    },
    async addUser(user) {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users', {
          method: 'POST',
          body: JSON.stringify(user),
          headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        const data = await response.json()
        this.users = [...this.users, data]
      } catch (error) {
        console.error(error)
      }
    },
    async saveUser(id, updatedEmployee) {
      axios.put('https://jsonplaceholder.typicode.com/users/' + id, {
        body: updatedEmployee
      })
      .then(response => {
        console.log(response)
      })
      .catch(e => {
        console.error(e)
      })
    },
    async deleteUser(id) {
      try {
        await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
          method: 'DELETE'
        })
        this.users = this.users.filter(user => user.id !== id)
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>

<style scoped>

</style>
