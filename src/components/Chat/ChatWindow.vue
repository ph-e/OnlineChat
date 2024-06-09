<script>
import socket from '../../socket.js';
export default {
  props: {
    userName: {
      type: String,
      required: true
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    }
  },
  data() {
    return {
      user: {
        name: '',
        room: ''
      },
      message: '',
      messages: []
    }
  },
  methods: {
    sendMessage() {
      /**
       * Перевірка на відсутність повідомлення
       * Якщо повідомлення немає, то нічого на сервер не буде відправлено!
       */
      if (!this.message)
        return


      /**
       * Формуємо данні для відправки
       */
      const data = {
        name: this.user.name,
        room: this.user.room,
        text: this.message
      }

      /**
       * Відправляємо повідомлення на сервер
       */
      socket.emit('newMessage', data, (data) => {
        if (data) {
          /**
           * У разі помилки переходимо на сторінку з відображенням помилки
           */
          this.$router.push({ name: 'error', query: { errorMessage: data } })
        }
      })

      /**
       * Очищуємо поле чату та робимо його знов активним, щоб одразу можна було набрати інше повідомлення
       */
      this.message = ''
      this.$refs.messageInput.focus()
    },
    scrollBottom(object) {
      /**
       * Функція, що переміщує scrollbar у низ при отриманні повідомленя.
       * Використовуємо setTimeout, щоб зробити цю функцію синхронною, щоб усі теги були у DOM-дерево
       */
      setTimeout(() => {
        object.scrollTop = object.scrollHeight
      })
    },
    takeMessage() {
      /**
       * Отримуємо нове повідомлення від серверу та додаємо його до списку!
       */
      socket.on('takeMessage', (message) => {
        this.messages.push(message)
        this.scrollBottom(this.$refs.messagesContainer)
      })
      this.scrollBottom(this.$refs.messagesContainer)
    },
    joinRoom() {
      socket.emit('joinRoom', this.user, (data) => {
        if (typeof data === 'string') {
          /**
           * У разі помилки переходимо на сторінку з відображенням помилки
           */
          this.$router.push({ name: 'error', query: { errorMessage: data } })
        }
        else {
          this.user.id = data
        }
      })
    }
  },
  created() {
    this.user.name = this.userName
    this.user.room = this.id
  },
  mounted() {
    /**
     * Ставимо фокус на інпут з вводу тексту, щоб при запуску сторінки він був обранний
     * Також запускаємо функціб з прослуховування отримання повідомлення від сокету
     */
    this.$refs.messageInput.focus()
    this.takeMessage()

    this.joinRoom()
  }
}
</script>
<template>
  <div class="chat__container">
    <div class="chat">
      <div class="messages" ref="messagesContainer">
        <div class="message" v-for="(msg, index) in this.messages" :key="index">
          <p class="message__time"><small>{{ msg.time }}</small></p>
          <p><strong>{{ msg.name }}:</strong> {{ msg.text }}</p>
        </div>
      </div>
      <div class="input-container">
        <input ref="messageInput" type="text" placeholder="Enter message" class="message__input"
          v-model.trim="this.message" autocomplete="false" @keydown.enter="sendMessage">

        <button class="send__button" @click="sendMessage" :disabled="this.message.length === 0">
          &#10095;
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.chat__container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
  width: 60vh;
  min-height: 400px;
  min-width: 300px;
}

.chat {
  height: 100%;
  width: 100%;
  background-color: #b3ffb3;
  border-radius: 10px;
  padding: 10px;
  border: 1px solid #000;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.input-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: auto;
  height: auto;
}

.messages {
  display: block;
  width: 100%;
  height: 90%;
  overflow-y: auto;
  overflow-x: hidden;
}

.message {
  width: 90%;
  margin-bottom: 10px;
  padding: 10px;
  border-bottom: 1px solid #eee;
  word-wrap: break-word;
  background-color: #9cfc9c;
  border-radius: 10px;
  position: relative;

}

.message__time {
  font-size: 12px;
  position: absolute;
  top: 0;
  right: 5%;
}

.message__input {
  flex: 1;
  margin-right: 10px;
}

.send__button {
  border-radius: 50%;
  width: 30px;
  height: 30px;
  font-size: 16px;
  line-height: 30px;
  padding: 0;
}
</style>