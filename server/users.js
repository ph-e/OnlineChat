class Users {
    constructor() {
        this.users = []
    }

    add(id, name, room) {
        /**
         * Метод додавання користувачів
         */
        this.users.push({
            id,
            name,
            room
        })
    }

    get(id) {
        /**
         * Шукаємо користувача за айді
         */
        return this.users.find(u => u.id === id)
    }

    remove(id) {
        /**
         * Шукаємо користувача
         */
        const user = this.get(id)
            /**
             * Якщо користувача знайдено, то видаляємо
             */
        if (user) {
            this.users = this.users.filter(u => u.id !== user.id)
        }
        return user
    }

    getByRoom(room) {
        /**
         * Отримуємо користувачів певної кімнати
         */
        return this.users.filter(u => u.room === room)
    }
}

/**
 * Експортуємо клас Users
 */
export default Users;