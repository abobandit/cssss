<template>
  <el-container class="h-screen">
    <el-header class="bg-blue-600 text-white flex justify-between items-center px-6 py-4">
      <h1 class="text-lg font-bold">Admin Panel</h1>
    </el-header>
    <el-container>
      <el-aside width="240px" class="bg-gray-100">
        <el-menu
          default-active="users"
          @select="handleTabChange"
          class="h-full"
        >
          <el-menu-item index="users">
            <i class="el-icon-user"></i>
            <span>Управление пользователями</span>
          </el-menu-item>
          <el-menu-item index="categories">
            <i class="el-icon-user"></i>
            <span>Категории товаров</span>
          </el-menu-item>
          <el-menu-item index="orders">
            <i class="el-icon-user"></i>
            <span>Заказы</span>
          </el-menu-item>
          <el-menu-item index="products">
            <i class="el-icon-user"></i>
            <span>Товары</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <div class="container mx-auto p-6">
          <UserManagement v-if="activeTab === 'users'"/>
          <OrderManagment v-if="activeTab === 'orders'"/>
          <CategoryManagement v-if="activeTab === 'categories'"/>
          <ProductManagement v-if="activeTab === 'products'"/>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import {onBeforeMount, ref} from "vue";
import UserManagement from "./tabs/UserManagement.vue";
import router from "@/router/index.js";
import {aFetch} from "@/axiosConfig.js";
import OrderManagment from "@/views/admin/tabs/OrderManagment.vue";
import CategoryManagement from "@/views/admin/tabs/CategoryManagement.vue";
import ProductManagement from "@/views/admin/tabs/ProductManagement.vue";

const user = ref(null)
const activeTab = ref("users");

const tabs = {
  users: UserManagement,
  categories: CategoryManagement,
  orders: OrderManagment,
  products: ProductManagement,
};

const handleTabChange = (tab) => {
  activeTab.value = tab;
};

</script>

