// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import Contact from '../views/contact.vue';
import HomeVue from '../views/home.vue';
import lostFound from '../views/lost&found.vue';
import News from '../views/News.vue';
import PetProfile from '../views/pet-profile.vue';

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeVue,
  },
  {
    path: '/pet-profile',
    name: 'petProfile',
    component: PetProfile,
  },
  {
    path: '/contact',
    name: 'contact',
    component: Contact,
  },
  {
    path: '/lost&found',
    name: 'lost&found',
    component: lostFound,
  },

  {
    path: '/news',
    name: 'news',
    component: News,
  }


]

const router = createRouter({
history: createWebHistory(import.meta.env.BASE_URL),
routes,
})

export default router
