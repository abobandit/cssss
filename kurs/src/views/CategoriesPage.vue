<template>
  <div class="container mx-auto my-8">
    <h1 class="text-3xl font-semibold mb-6">Категории товаров</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <el-card
        v-for="category in categories"
        :key="category.id"
        class="w-full"
        :body-style="{ padding: '20px' }"
      >
        <template #header>
          <span class="text-xl font-semibold">{{ category.name }}</span>
        </template>

        <div class="flex justify-center items-center h-48 bg-gray-100 rounded-lg">
          <p class="text-gray-500">Товары этой категории</p>
        </div>

        <el-button
          type="primary"
          class="mt-4 w-full"
          @click="viewCategory(category.id)"
        >
          Перейти в категорию
        </el-button>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { ElCard, ElButton } from 'element-plus';
import {aFetch} from "@/axiosConfig.js";
import {useRouter} from "vue-router";

const categories = ref([]);
const router = useRouter()
// Функция для получения категорий из API
const fetchCategories = async () => {
  try {
    const response = await aFetch('categories');
    categories.value = response;
  } catch (error) {
    console.error('Ошибка при загрузке категорий:', error);
  }
};

// Функция для перехода к товарам категории
const viewCategory = (categoryId) => {
  router.push('/productByCategory/'+categoryId)
};

onMounted(() => {
  fetchCategories();
});
</script>

<style scoped>
.container {
  padding: 0 2rem;
}
</style>
