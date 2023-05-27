import { createApp } from 'vue'
import App from './App.vue'

// router 설정하기
import router from './routes/index.js'

createApp(App)
  .use(router)  // use 메소드는 플러그인을 연결할 때 사용하는 메소드
  .mount('#app')
