<template>
  <div>
    <!-- Кнопка для открытия модального окна -->
    <button @click="openModal" class="bg-blue-500 text-white px-4 py-2 rounded">
      Корзина ({{ cartItemCount }})
    </button>

    <!-- Модальное окно -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div class="bg-white p-6 rounded w-96">
        <h2 class="text-xl font-bold mb-4">Ваша корзина</h2>

        <div v-if="cart.length === 0" class="text-gray-500">Ваша корзина пуста</div>

        <!-- Список товаров в корзине -->
        <div v-else>
          <ul>
            <li v-for="item in cart" :key="item.id" class="flex justify-between items-center mb-4">
              <div>
                <h3 class="font-semibold">{{ item.name }}</h3>
                <p class="text-sm text-gray-600">Цена: {{ item.price }}</p>
                <p class="text-sm text-gray-600">количество: {{ item.quantity }}</p>
              </div>
              <button
                @click="removeItem(item.id)"
                class="bg-red-500 text-white px-3 py-1 rounded"
              >
                Убрать
              </button>
            </li>
          </ul>

          <!-- Кнопка для оформления заказа -->
          <div class="mt-6">
            <p v-text="'Всего ' + cartTotal+ 'руб'" class="font-semibold"></p>
            <button @click="orderCart" class="bg-green-500 text-white px-4 py-2 mt-4 rounded w-full">
              Заказать
            </button>
          </div>
        </div>

        <!-- Кнопка для закрытия модального окна -->
        <button @click="closeModal" class="mt-4 text-blue-500">Закрыть</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { getCart, removeFromCart, getCartTotal, getCartItemCount } from '../utils/cart.js';
import { useRouter } from 'vue-router';
const cart = ref([]);
const isModalOpen = ref(false);
const router = useRouter();
// Загрузка корзины
const loadCart = () => {
  cart.value = getCart();
};

const openModal = () => {
  loadCart();
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  loadCart();
};

// Удалить товар из корзины
const removeItem = (productId) => {
  removeFromCart(productId); // Удаляем товар из корзины
  closeModal();
};

// Оформить заказ
const orderCart = () => {
  closeModal()
  router.push('/order'); // Перенаправление на страницу оформления заказа
};

const cartTotal = computed(()=>getCartTotal()) ;
const cartItemCount = computed(() => getCartItemCount());
</script>
