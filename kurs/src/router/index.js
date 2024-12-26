import { createRouter, createWebHistory } from 'vue-router'
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import OrderForm from "@/views/OrderForm.vue";
const ProductsByCategory = () => import("@/views/ProductsByCategory.vue");
const CartItems = () => import("@/components/CartItems.vue");
const AdminPage = () => import("@/views/admin/AdminPage.vue");
const ProductsPage = () => import("@/views/ProductsPage.vue") ;
const ProductPage = () => import("@/views/ProductPage.vue") ;
const Orders = () => import("@/views/Orders.vue") ;
const CategoriesPage  = () => import('../views/CategoriesPage.vue')
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'products',
      component: ProductsPage,
    },
    {
      path:'/product/:id',
      name: 'product',
      component: ProductPage,
    },
    {
      path: '/categories',
      name: 'categories',
      component: CategoriesPage,
    },
    {
      path: '/productByCategory/:id',
      name: 'productByCategory',
      component: ProductsByCategory,
    },
    {
      path: "/cart",
      name: "CartPage",
      component: CartItems,
    },
    { path: "/admin",
      component: AdminPage,
      meta: { requiresAuth: true, roles: ['admin'] }
    },
    { path: "/login", component: Login, meta: { requiresAuth: false} },
    { path: "/register", component: Register, meta: { requiresAuth: false} },
    { path: '/order', component: OrderForm }, // Роут для оформления заказа
    { path: '/orders', component: Orders }, // Роут для оформления заказа
  ],
})
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Проверка токена
  const userRole = localStorage.getItem('role'); // Допустим, роль хранится в локальном хранилище
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else if (to.meta.roles && !to.meta.roles.includes(userRole)) {
    next('/'); // Перенаправить, если роль не подходит
  } else if (to.meta.requiresAuth === false && isAuthenticated) {
    next('/'); // Перенаправление на страницу входа
  } else {
    next(); // Разрешить переход
  }
});
export default router
