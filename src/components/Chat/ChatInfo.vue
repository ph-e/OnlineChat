<script>
import socket from '@/socket';

export default {
    data() {
        return {
            count: 0,
            usersList: []
        }
    },
    methods: {
        getUsers() {
            /**
             * Функція для оновлення списку користувачів
             */
            socket.on('updateUsers', users => {
                this.usersList = [...users];
                this.count = this.usersList.length;
            });
        }
    },
    mounted() {
        this.getUsers();
    }
}
</script>

<template>
    <div class="container__info">
        <p><strong>Online: {{ count }}</strong></p>
        <div class="user__list">
            <p class="user" v-for="user in usersList" :key="user.id">{{ user.name }}</p>
        </div>
    </div>
</template>

<style scoped>
.container__info {
    min-width: 200px;
    width: 30vh;
    max-width: 400px;
    height: 40vh;
    min-height: 250px;
    max-height: 300px;
    position: relative;
    right: 10%;
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

.user__list {
    max-height: 80%;
    overflow-y: auto;
}
</style>
