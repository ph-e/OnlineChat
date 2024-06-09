import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ChatWindow from './components/Chat/ChatWindow.vue'
import QRCode from './components/Chat/QRCode.vue'
import Footer from './components/Utils/FooterInformation.vue'
import ChatLogo from './components/Utils/ChatLogo.vue'
import ErrorWindow from './components/Utils/ErrorWindow.vue'
import EnterChat from './components/Home/EnterChat.vue'
import IdentificationUser from './components/Chat/IdentificationUser.vue'
import ChatInfo from './components/Chat/ChatInfo.vue'

/** Створення vue застосунку */
const app = createApp(App)

/** Додаємо роути до застосунку */
app.use(router)

/** Додаємо окремі компоненти до застосунку */
app.component('QRCode', QRCode)
app.component('ChatWindow', ChatWindow)
app.component('Footer', Footer)
app.component('ChatLogo', ChatLogo)
app.component('ErrorWindow', ErrorWindow)
app.component('EnterChat', EnterChat)
app.component('IdentificationUser', IdentificationUser)
app.component('ChatInfo', ChatInfo)

app.mount('#app')