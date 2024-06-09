<script>
export default {
    props: {
        errorMessage: {
            type: String,
            required: false,
            default: '404'
        }
    },
    methods: {
        /** Метод для повернення на головну сторінку */
        goToHome() {
            this.$router.push({ name: 'home dir' })
        }
    }

}
</script>

<template>
    <div class="error__page">
        <div class="error">
            <h1>Error</h1>
            <div class="error__message">
                <p>{{ this.errorMessage }}</p>
            </div>
            <button @click="this.goToHome">Home page</button>
        </div>
    </div>
</template>

<style scoped>
.error__page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70vh;
}

.error {
    text-align: center;
}
</style>
