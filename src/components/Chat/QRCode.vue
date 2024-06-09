<script>
import QrcodeVue from 'qrcode.vue'
export default {
  components: {
    QrcodeVue,
  },
  data() {
    return {
      value: '',
      size: 100,
    }
  },
  mounted() {
    this.value = window.location.href
  },
  computed: {
    id() {
      return this.$route.params.id
    }
  },
  methods: {
    copyToClipboard() {
      navigator.clipboard.writeText(this.id).then(() => {
        alert('ID copied to clipboard!')
      }).catch(err => {
        console.error('Failed to copy text: ', err)
      });
    },
  },
};
</script>

<template>
  <div class="chat__info">
    <p>Information </p>
    <div class="container__info">
      <p class="room__id">Room ID: {{ id }}</p>
      <button @click="copyToClipboard" class="copy__button">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="icon icon-tabler icon-tabler-copy">
          <rect x="8" y="8" width="12" height="12" rx="2" ry="2"></rect>
          <path d="M16 8v-4a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h4"></path>
        </svg>
      </button>
    </div>
    <qrcode-vue :value="value" :size="size" level="H" />
  </div>
</template>

<style scoped>
.chat__info {
  min-width: 200px;
  width: 30vh;
  max-width: 400px;
  height: 40vh;
  min-height: 250px;
  max-height: 300px;
  position: relative;
  left: 10%;
  margin-top: 20px;
  border: 1px solid #000;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 10px;
  text-align: center;
  background-color: #b3ffb3;
  border-radius: 10px;
  box-sizing: border-box;
  overflow: hidden;

}

qrcode-vue {
  width: 100%;
  max-width: 200px;
  margin: 10px auto;
  height: auto;
  display: block;
}

.container__info {
  display: flex;
  align-items: center;
}

.room__id {
  margin-right: 10px;
}

.copy__button {
  background-color: #80ff80;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.copy__button:hover {
  background-color: #00ff00;
}

.icon {
  color: #fff;
}
</style>
