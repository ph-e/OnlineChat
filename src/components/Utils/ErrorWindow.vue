<script>
export default {
  methods: {
    closeError() {
      /** Додаємо клас, щоб приховати вікно */
      this.$el.classList.add('closing');
      /** Через час, достатній для завершення анімації, видаляємо елемент із DOM */
      setTimeout(() => {
        this.$el.remove();
      }, 300);/** 300 мс - це час анімації, який повинен відповідати часу CSS */
    }
  }
}
</script>

<template>
  <div class="error__window">
    <button class="close__button" @click="closeError">×</button>
    <div class="error__message">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.error__window {
  position: fixed;
  top: 6vh;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: #8FBC8F;
  transition: opacity 0.3s, transform 0.3s;
}

.close__button {
  position: fixed;
  top: -20px;
  right: -25px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
}

.error__window.closing {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.8);
}
</style>
