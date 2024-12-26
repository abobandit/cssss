<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
    <h2 class="text-2xl font-bold text-center mb-6">Регистрация</h2>
    <h2 class="text-center  mb-5">Уже авторизованы?</h2>

    <router-link to="/login">
      <button
        class="w-full mx-auto p-1 text-center rounded-lg  outline-none hover:bg-gray-100 focus:border focus:border-black mb-5 bg-white">
        Войти
      </button>
    </router-link>
    <form @submit.prevent="handleRegister">
      <div class="mb-4">
        <label for="name" class="block text-sm font-medium text-gray-700">Имя</label>
        <input
          v-model="name"
          type="text"
          id="name"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Введите ваше имя"
          required
        />
      </div>
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input
          v-model="email"
          type="email"
          id="email"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="email"
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
          placeholder="Пароль"
          required
        />
      </div>
      <button
        type="submit"
        class="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none"
      >
        Отправить
      </button>
    </form>
    <p v-if="error" class="text-red-500 mt-4">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import {aFetchPost} from "@/axiosConfig.js";

const name = ref("");
const email = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();

const handleRegister = async () => {
  try {
    await aFetchPost("register", { name: name.value, email: email.value, password: password.value });
    await router.push("/login"); // Перенаправляем на страницу входа
  } catch (err) {
    error.value = err.response?.data?.message || "Не удалось зарегистрироваться";
  }
};
</script>
