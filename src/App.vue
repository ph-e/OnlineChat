<script>
import socket from './socket.js';

export default {
  mounted() {
    socket.on('connect', () => {
      console.log('Connected to server');
    })
  },
}
</script>

<template>
  <ChatLogo />
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
  <Footer />
</template>


<style scoped>
.fade-enter-active,.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,.fade-leave-to{
  opacity: 0;
}
</style>