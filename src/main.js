import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {Notify, Quasar} from 'quasar'

import App from './App.vue'
import router from './router'

import './assets/main.css'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBO2HxxJF2OsES2eNo31pX2gH953RXdfAQ",
    authDomain: "vuefs-prod-f327a.firebaseapp.com",
    projectId: "vuefs-prod-f327a",
    storageBucket: "vuefs-prod-f327a.appspot.com",
    messagingSenderId: "710035190403",
    appId: "1:710035190403:web:2c6ad14f2945aa5d5721b6",
    measurementId: "G-MWMZKEQSBG"
};

// Initialize Firebase
initializeApp(firebaseConfig);


const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(Quasar, {
    plugins: {Notify}, // import Quasar plugins and add here
})

app.mount('#app')
