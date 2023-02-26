import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import RestaurantsView from '@/views/RestaurantsView.vue';
import RestaurantView from '@/views/RestaurantView.vue';
import ProfileView from '../views/ProfileView.vue';
import AuthView from '@/views/AuthView.vue';
import store from '@/store';
import service from '@/api';
import { useToast } from 'vue-toastification';
import { POSITION } from 'vue-toastification';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthView,
  },
  {
    path: '/restaurants',
    name: 'restaurants',
    component: RestaurantsView,
  },
  {
    path: '/restaurants/:id',
    name: 'restaurant',
    component: RestaurantView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

const toast = useToast();

router.beforeEach(async (to, from, next) => {
  let isValidated = null;
  const usertoken = localStorage.getItem('usertoken');
  if (usertoken && usertoken !== 'null') {
    const res = await service.checkSession(usertoken);
    // console.log(res.data.data);
    if (res.status === 200) {
      store.state.user.uid = res.data.data.uid;
      store.state.user.email = res.data.data.email;
      store.state.user.role = res.data.data.role;
      store.state.user.username = res.data.data.username;
      isValidated = true;
    }
  }

  if (to.name === 'profile' && !isValidated) {
    toast.warning('Please log in!', { position: POSITION.TOP_CENTER });
    next({ name: 'auth' });
  } else {
    next();
  }
});

export default router;
