<template>
  <div class="max-w-2xl mx-auto mt-10">
    <h1 class="text-2xl font-bold mb-4">Оформление заказа</h1>

    <!-- Форма для данных клиента -->
    <form @submit.prevent="submitOrder">
      <div class="mb-4">
        <label for="name" class="block text-sm font-medium text-gray-700">Имя</label>
        <input
          type="text"
          id="name"
          v-model="customer.name"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          v-model="customer.email"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div class="mb-4">
        <label for="phone" class="block text-sm font-medium text-gray-700">номер телефона</label>
        <input
          type="text"
          id="phone"
          @blur="validatePhone"
          v-model="customer.phone"
          :class="{'border-red-500': phoneError}"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        <p v-if="phoneError" class="text-sm text-red-500">Введите  номер телефона</p>
      </div>

      <div class="mb-4">
        <label for="address" class="block text-sm font-medium text-gray-700">Адрес</label>
        <textarea
          id="address"
          v-model="customer.address"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        ></textarea>
      </div>

      <h2 class="text-xl font-semibold mt-6 mb-4">Ваша корзина</h2>
      <div v-if="cart.length === 0" class="text-gray-500">Ваша корзина пуста</div>
      <div v-else>
        <ul>
          <li v-for="item in cart" :key="item.id" class="flex justify-between items-center mb-4">
            <div>
              <h3 class="font-semibold">{{ item.name }}</h3>
              <p class="text-sm text-gray-600">Количество: {{ item.quantity }}</p>
              <p class="text-sm text-gray-600">Цена: {{ item.price }} руб</p>
            </div>
          </li>
        </ul>
      </div>

      <div class="mt-6">
        <p  class="font-semibold">Всего: {{ cartTotal }} руб</p>
        <button type="submit" class="bg-green-500 text-white px-4 py-2 mt-4 rounded w-full" :disabled="phoneError || !isFormValid">
          Заказать
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import {ref, computed, onMounted, watch} from 'vue';
import {clearCartItems, getCart, getCartTotal, saveCart} from '../utils/cart.js';
import { useRouter } from 'vue-router';
import {aFetch, aFetchPost} from "@/axiosConfig.js";
const token = localStorage.getItem('token')

const customer = ref({
  name: '',
  email: '',
  phone: '',
  address: '',
});

const cart = ref([]);
const router = useRouter();
const phoneRegex = /^(\+7|7)\d{10}$/;
const phoneError = ref(false);
const isFormValid = computed(() => !phoneError.value);
// Загрузка данных корзины
const loadCart = () => {
  cart.value = getCart();
};
const user =localStorage.getItem('user')

// Подсчёт общей стоимости
const cartTotal = computed(() => getCartTotal());
watch(cart, () => {
  cartTotal.value = getCartTotal() ; // Сохраняем обновленную корзину в localStorage
});

onMounted(async () => {
  // Данные клиента
  if (user){
    customer.value.name =  JSON.parse(user).name
    customer.value.email =  JSON.parse(user).email
  }
  loadCart();
});

// Отправка заказа
const submitOrder = async () => {
  // Здесь можно отправить данные на сервер для обработки заказа
  try {
    const response = await aFetchPost('orders', {
      name: customer.value.name,
      email: customer.value.email,
      phone: customer.value.phone,
      address: customer.value.address,
      cart: cart.value.map(item => ({
        product_id: item.id,
        quantity: item.quantity,
      })),
    });
    if (!user){
      localStorage.setItem('customer',response.order.customer_id)
    }
    if (response.status >=400){
      alert('Error placing order. Please try again later.');
      return
    }
    alert('Order placed successfully!');

    // Очистить корзину
    clearCart();
    // Перенаправление на страницу благодарности или главную
    router.push('/');
  } catch (error) {
    alert('Error placing order. Please try again later.');
  }
};
// Валидация номера телефона
const validatePhone = () => {
  if (!phoneRegex.test(customer.value.phone)) {
    phoneError.value = true;
  } else {
    phoneError.value = false;
  }
};
// Очистка корзины после оформления
const clearCart = () => {
  clearCartItems()
  localStorage.removeItem('shopping_cart'); // Очищаем корзину в localStorage
  // cart.value =
};
</script>
