<template>
  <div id="user-form">
    <p
      v-if="Object.keys(user).length === 0"
      class="empty-page"
    >
      No such user
    </p>
    <div v-else>
      <label for="name">Name</label>
      <input
        id="name"
        type="text"
        v-model="user.name"
      >
      <label for="email">Email</label>
      <input
        id="email"
        type="text"
        v-model="user.email"
      >
      
      <button @click="saveUser(user)">Save</button>
      <button
        class="muted-button"
        @click="cancelEdit(user)"
      >Cancel</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'user-form',
  props: {
    user: {}
  },
  methods: {
    cancelEdit() {
      this.$router.go(-1)
    },
    saveUser(user) {
      if (user.name === '' || user.email === '') return
      this.$emit('save:user', user.id, user)
    }
  }
}
</script>

<style scoped>
button {
  margin: 0 0.5rem 0 0;
}
input {
  margin: 0;
}
.empty-table {
  text-align: center;
}
</style>