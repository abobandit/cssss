<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
    <h2 class="text-2xl font-bold text-center mb-6">Войти</h2>
    <router-link to="/register">
      <button
        class="w-full mx-auto p-1 text-center rounded-lg  outline-none hover:bg-gray-100 focus:border focus:border-black mb-5 bg-white">
        Регистрация
      </button>
    </router-link>
    <form @submit.prevent="handleLogin">
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input
          v-model="email"
          type="email"
          id="email"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your email"
          required
        />
      </div>
      <div class="mb-4">
        <label for="password" class="block text-sm font-medium text-gray-700">Пароль</label>
        <input
          v-model="password"
          type="password"
          id="password"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your password"
          required
        />
      </div>
      <button
        type="submit"
        class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
      >
        Войти
      </button>
    </form>
    <p v-if="error" class="text-red-500 mt-4">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import {aFetchPost} from "@/axiosConfig.js";
import { useRoute, useRouter } from 'vue-router'
const email = ref("");
const password = ref("");
const error = ref("");

const router = useRouter()
const route = useRoute()
const handleLogin = async () => {
  try {
    const response = await aFetchPost("login", { email: email.value, password: password.value });
    localStorage.setItem("token", response.token); // Сохраняем токен
    localStorage.setItem('user',JSON.stringify(response.user) );
    localStorage.setItem("role", response.user.role); // Сохраняем роль
      router.push("/"); // Перенаправляем на панель
  } catch (err) {
    console.log(err)
    error.value = err.response?.data?.message || "Не удалось войти";
  }
};
</script>
