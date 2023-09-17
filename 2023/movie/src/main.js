import { createApp } from 'vue'
import App from './App.vue'
import router from './routes/index.js'    // router 설정하기
// import store from './store/index.js'    // store 설정하기
import store from './store'    // index.js는 생략 가능

createApp(App)
  .use(router)  // use 메소드는 플러그인을 연결할 때 사용하는 메소드
  .use(store)
  .mount('#app')
