import express from 'express'
import { Server } from 'socket.io'
import http from 'http'
import env from 'dotenv'
import Users from './users.js'
import { getTime } from './utils.js'

/**
 * Створюємо інстанс нашого застосунку
 */
const app = express()

/**
 * Обертаємо сервер в функціонал сокетів (socket io)
 */
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        /** Адреса frontend від якого отримуємо запити */
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
})

/**
 * Читаємо файл .env
 */
env.config()

const msg = (name, text, time) => ({ name, text, time })
const users = new Users();

/**
 * Запускаємо сервер на вказаному порту
 */
server.listen(process.env.PORT, () => {
    console.log(`Server started at http://localhost:${process.env.PORT}`)
});

io.sockets.on('connection', (socket) => {
    console.log(`${socket.id} was connected`)

    socket.on('disconnect', () => {
        /**
         * Видаляємо користувача з масиву, якщо він був у кімнаті
         */
        const user = users.remove(socket.id)
        if (user) {
            /**
             * Сповіщуємо інших користувачів про відключення та оновлюємо список користувачів
             */
            io.to(user.room).emit('takeMessage', msg('Admin', `The user ${user.name} left the room!`, getTime()))
            io.to(user.room).emit('updateUsers', users.getByRoom(user.room))
        }
        console.log(`${socket.id} was diconnected`)
    })

    socket.on('newMessage', (message, callback) => {
        /**
         * Перевіряємо чи отримано повідомлення
         */
        if (!message) {
            return callback('Error sending message: message entered incorrectly')
        }
        /**
         * Шукаємо користувача, який надіслав повідомлення
         * Якщо користувача знайдено, то відправляємо повідомлення у певну кімнату
         * Якщо ні, сповіщуєпо про помилку
         */
        const user = users.get(socket.id)
        if (user) {
            io.to(user.room).emit('takeMessage', msg(message.name, message.text, getTime()))

            callback()
        } else {
            callback('Error sending message: user not found')
        }
    })

    socket.on('joinRoom', (user, callback) => {
        /**
         * Перевірити на коректність отримані дані
         */
        if (!user.name || !user.room || user.room.length < 10) {
            return callback('The data is incorrect')
        }
        /**
         * Додаємо до масиву нового користувача
         */
        users.add(socket.id, user.name, user.room)

        /**
         * Додаємо сокет до певної кімнати
         */
        socket.join(user.room)

        callback({ id: socket.id })
            /**
             * Відправляємо в чат повідомлення для користувача
             */
        socket.emit('takeMessage', msg('Admin', `Welcome ${user.name}!`, getTime()))
            /**
             * Сповіщаємо інших користувачів(окрім себе) про нове підключення до кімнати та оновлюємо список користувачів
             */
        io.to(user.room).emit('updateUsers', users.getByRoom(user.room))
        socket.broadcast.to(user.room).emit('takeMessage', msg('Admin', `The user ${user.name} is connected to the room!`, getTime()))
    })
});