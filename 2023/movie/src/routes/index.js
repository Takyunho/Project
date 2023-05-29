import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './Home'
import Movie from './Movie'
import About from './About'

export default createRouter({
  // Hash 모드, History 모드
  // Hash 모드 예시 : http://localhost:8080/#/about (#/ 뒤에 about이 붙음)
  history: createWebHashHistory(),  // Hash 모드 사용
  
  // page
  routes: [
    {
      path: '/',    // main page
      component: Home
    },
    {
      path: '/movie',
      component: Movie
    },
    {
      path: '/about',   // about page
      component: About
    }
  ]
})