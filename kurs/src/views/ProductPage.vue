<script setup>
import {aFetch, aFetchPost} from "@/axiosConfig.js";
import {computed, onMounted, ref} from "vue";
import {addToCart} from '../utils/cart.js'
import router from "@/router";

const product = ref([])
const quantity = ref(0)
const orderedProduct = computed(() => {
  return {
    ...product.value,
    ...quantity.value
  }})
onMounted(async () => {
  const id = ref(router.currentRoute.value.params.id)
  product.value = await aFetch('product/' + id.value)
})
</script>

<template>
  <el-main>
    <el-row>
      <el-col :span="12">
        <!-- Изображение товара -->
        <el-image
          :src="product?.img_url"
          alt="Сухой корм для кошек"
          style="width: 100%; "
        />
      </el-col>
      <el-col :span="12" style="padding-left: 20px;">
        <h2>{{ product.name }}</h2>
        <p>{{ product.description }}</p>
        <el-divider></el-divider>
        <p><strong>Цена:</strong> {{ product.price}} руб</p>
        <p><strong>Осталось на складе:</strong> {{ product.quantity }} шт.</p>
        <div class="w-24">
          <span class="demonstration">Укажите количество {{quantity}}</span>
          <el-slider
            :min="1"
            :max="product.quantity"
            :step="1"
            class="my-4"
            show-tooltip
            v-model="quantity" />
        </div>
        <el-button type="primary" @click="addToCart(product,quantity)">Добавить в корзину</el-button>
      </el-col>
    </el-row>
  </el-main>
</template>

<style scoped>

</style>
