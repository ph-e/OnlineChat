<script>
export default {
  methods: {
    goToHome() {
      this.$router.push('/')
    }
  }
}
</script>

<template>
  <div class="logo">
    <div class="chat__name" @click="goToHome">
      <h1>Online Chat</h1>
    </div>
  </div>
</template>

<style scoped>
.logo{
  width: 100%;
}
.chat__name {
  display: inline-block;
  cursor: pointer;
  max-height: 10vh;
  height: auto;
  max-width: 100vh;
  width: auto;
  left: 2vh;
  position: relative;
}
</style>
