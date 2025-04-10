import { createApp } from 'vue'
import App from './App.vue'

// Bootstrap CSS & JS
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// (Opsional) Router, jika kamu pakai vue-router
import router from './router'

createApp(App)
  .use(router) // hanya jika pakai router
  .mount('#app')
