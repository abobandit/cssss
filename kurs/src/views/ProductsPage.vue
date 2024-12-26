<script setup>
import {aFetch} from "@/axiosConfig.js";
import {onMounted, ref} from "vue";

const products = ref([])

onMounted(async()=>{
  products.value = await aFetch('products')
  console.log(products.value)
})
</script>

<template>
<div class="grid grid-cols-5 gap-5">
  <RouterLink v-for="product of products" :to="{
    name:'product',
    params:{
      id:product.id
    }
  }">
  <el-card >
    <template #header>{{ product.name }}</template>
    <div class="grid grid-rows-[11fr,1fr] gap-3 items-end" >
      <img
        :src="product.img_url"
        style="width: 300px;height: 400px"
      />
      <el-button plain type="primary">Купить</el-button>
    </div>
  </el-card>
  </RouterLink>
</div>
</template>

<style scoped>
</style>
