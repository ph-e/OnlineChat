<script>
export default {
  data() {
    return {
      userName: ''
    }
  }
}
</script>

<template>
  <div class="chat__page">
    <ChatInfo />
    <transition name="fade" mode="out-in">
      <!-- Перевіряємо, якщо ім'я не введено, використовуємо компонент для вводу, та зберігаємо після валідації -->
      <IdentificationUser v-if="userName === ''" @update="(data) => { userName = data }" key="identification" />
      <!-- Відкриваємо чат, якщо ім'я користувача введено і пройшло валідацію -->
      <ChatWindow v-else :userName="userName" key="chatwindow" />
    </transition>
    <QRCode />
  </div>
</template>

<style scoped>
.chat__page {
  display: flex;
  justify-content: center;
  align-items: center;
}

.fade-enter-active,.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter,.fade-leave-to {
  opacity: 0;
}
</style>
