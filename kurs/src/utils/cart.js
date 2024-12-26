import {reactive, ref, watch} from "vue";

const CART_KEY = 'shopping_cart';
export const cart = reactive(getCart());
watch(cart, (newCart) => {
  saveCart(newCart);
}, { deep: true });

// Функция для получения корзины из localStorage
export function getCart() {
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
}

// Сохранить корзину в localStorage
export function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// Добавить товар в корзину
export function addToCart(product, quantity = 1) {
  const existingProductIndex = cart.findIndex((item) => item.id === product.id);
  if (existingProductIndex !== -1) {
    // Если товар уже есть, увеличиваем количество
    cart[existingProductIndex].quantity += quantity;
  } else {
    // Если товара нет, добавляем его в корзину
    cart.push({
      ...product,
      quantity,
    });
  }
}

// Удалить товар из корзины
export function removeFromCart(productId) {
  const updatedCart = cart.filter((item) => item.id !== productId);
  // Применяем splice для правильного обновления реактивного массива
  cart.splice(0, cart.length, ...updatedCart);
}

// Очистить корзину
export function clearCartItems() {
  cart.length = 0; // Очищаем корзину
}
// Получить общее количество товаров в корзине
export function getCartItemCount() {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

// Получить общую сумму корзины
export function getCartTotal() {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
}
