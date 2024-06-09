<script>
export default {
  data() {
    return {
      isRoom: false,
      room: '',
      errorMessage: '',
      errorVisible: false,
      forbiddenCharsPattern: /[ !@#$%^&*(),.?":{}|<>]/
    }
  },
  methods: {
    navigate() {
      if (this.errorMessage === '') {
        this.$router.push({ name: 'room', params: { id: this.room } })
      }
      else {
        this.errorVisible = true
      }
    },
    connectToChat() {
      if (this.room === '') {
        this.errorMessage = 'To connect to an existing chat, enter the chat ID'
      }
      else if (this.room.length != 10 || this.forbiddenCharsPattern.test(this.room)) {
        this.errorMessage = 'The chat ID is incorrect'
      }
      else {
        this.errorMessage = ''
      }
      this.navigate()
    },
    createNewChat() {
      /** Скидаємо помилки, якщо вони були */
      this.errorMessage = ''
      /** Генеруємо новий чат айді */
      const allowedChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      const length = 10
      this.room = Array.from({ length }, () =>
        allowedChars.charAt(Math.floor(Math.random() * allowedChars.length))).join('')
      this.navigate()
    }
  }
}
</script>

<template>
  <div class="home__page">
    <ErrorWindow v-if="this.errorVisible">
      {{ this.errorMessage }}
    </ErrorWindow>
    <div class="chat__form">
      <label>Specify chat number?</label><br>
      <input v-model="this.isRoom" id="isRoom" type="checkbox" />
      <div v-if="isRoom" class="room__id">
        <input v-model.trim="this.room" id="room" placeholder="Enter chat id" @keydown.enter="this.connectToChat"
          autofocus /><br>
        <button @click="this.connectToChat" :disabled="this.room.length === 0">
          Go To Chat
        </button>
      </div>
      <div v-else class="create__chat">
        <button @click="this.createNewChat">Create Chat</button>
      </div>
    </div>
  </div>

</template>

<style scoped>
input#isRoom[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 20px;
  height: 20px;
  border: 1px solid #a3d9a5;
  background-color: #e0f3e0;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

input#isRoom[type="checkbox"]:hover {
  background-color: #c0ecc0;
}

input#isRoom[type="checkbox"]:focus {
  border-color: #6cbf6c;
  box-shadow: 0 0 5px #6cbf6c;
}

input#isRoom[type="checkbox"]:checked {
  background-color: #6cbf6c;
}

.home__page {
  max-height: 70vh;
  height: 70vh;
}
</style>
