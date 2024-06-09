<script>
export default {
  data() {
    return {
      errorMessage: '',
      errorVisible: false,
      userName: '',
      forbiddenCharsRegex: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
    }
  },
  methods: {
    validate() {
      this.errorMessage = ''
      /**
       * Видалення пробілів
       */
      this.userName = this.userName.replace(/\s/g, '')
      /**
       * Перевірка довжини рядка
       */
      if (this.userName.length < 3 || this.userName.length > 8) {
        this.errorMessage = "The length of the line must be at least 3 characters and no more than 8."
      }
      /**
       * Перевірка на заборонені символи
       */
      if (this.forbiddenCharsRegex.test(this.userName)) {
        this.errorMessage = "The string contains illegal characters";
      }
      if (this.errorMessage != '') {
        this.errorVisible = true
      }
      else {
        /**
         * Відправка даних у батьківський компонент
         */
        this.$emit('update', this.userName);
      }
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="id__page">
      <ErrorWindow v-if="this.errorVisible">
        {{ this.errorMessage }}
      </ErrorWindow>
      <div class="chat__form">
        <label>Enter u nickname(3-8 characters)</label><br>
        <input v-model="this.userName" id="nickname" placeholder="Enter u nickname" autofocus
          @keydown.enter="this.validate" /><br>
        <button @click="this.validate" :disabled="this.userName.length === 0">
          Enter
        </button>
        <p> Hello {{ this.userName }} ! </p>
      </div>
    </div>
  </div>

</template>

<style scoped>
.id__page {
  min-width: 300px;
  width: 60vh;
  min-height: 100px;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
}

.container {
  height: 70vh;
}
</style>
