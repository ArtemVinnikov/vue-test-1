<template>
  <div class="data-page">
    <h2>Data Page</h2>
    <user-table
      :users="users"
      @delete:user="deleteUser"
      @edit:user="editUser"
      @open:user="openUser"
    />
  </div>
</template>

<script>
import axios from 'axios';
import UserTable from '@/components/UserTable.vue';

export default {
  name: 'DataTable',
  components: {
    UserTable,
  },
  data() {
    return {
      users: []
    }
  },
  mounted() {
    // this.getUsers()
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then(response => {
      this.users = response.data
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
    async editUser(id, updatedEmployee) {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
          method: 'PUT',
          body: JSON.stringify(updatedEmployee),
          headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        const data = await response.json()
        this.users = this.users.map(user => user.id === id ? data : user)
      } catch (error) {
        console.error(error)
      }
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
    openUser(id) {
      this.$router.push('/users/' + id);
    }
  },
}
</script>

<style scoped>

</style>
