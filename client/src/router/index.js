import { createRouter, createWebHistory } from "vue-router";
import logoview from"../views/logoView.vue";
import fitness from "../views/fitness.vue";
import HomeView from "../views/HomeView.vue";
import SignUp from "../views/SignUp.vue";
import SignIn from "../views/SignIn.vue";
import AboutView from "../views/AboutView.vue"
import UserView from "../views/Users.vue"
import session from "../stores/session"
import ManageView from "../views/manage.vue"


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'is-active',
  routes: [
    {
      path: "/",
      name:"logoView",
      component: logoview,
       },
      {
        path: "/fitness",
        name: "/fitness",
        component: fitness,
      }, 
    {
      path: "/home",
      name: "home",
      component: HomeView,
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUp,
    },
    {
      path: "/signin",
      name: "signin",
      component: SignIn,
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
    {
      path: "/users",
      name: "users",
      component: UserView,
    },
    {
      path: "/manage",
      name: "manage",
      component: ManageView,
    },
  ],
});

router.beforeEach((to, from) => {
  if (['/home', '/users', '/manage'].includes(to.path)) {
      if (!session.user) {
          return '/signin';
      }
  }
})

export default router;
