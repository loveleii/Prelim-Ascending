import { createRouter, createWebHistory } from "vue-router";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'firstPage',
      component: () => import('../views/FirstPageView.vue')
    },

    {
      path: '/second',
      name: 'secondPage',
      component: () => import('../views/SecondPageView.vue')
    },
   

    {
      path: "/editOfficer/:id",
      name: "editOfficer",
      component: () => import('../views/EditOfficerView.vue'),
      props: true
    },
   
  ],
});

export default router;