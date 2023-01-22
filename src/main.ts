import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router';

import './assets/main.css'
import { VueQueryPlugin } from '@tanstack/vue-query';

const pinia = createPinia()

const app = createApp(App)

app.use(pinia)
app.use(router);

VueQueryPlugin.install( app, { // Todos los querys van a tener esta configuración de cache
    queryClientConfig: {
        defaultOptions: {
            queries: {
                cacheTime: 1000 * 60
            }
        }
    }
})

app.mount('#app');