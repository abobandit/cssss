<script setup>
import HeaderComponent from "@/components/HeaderComponent.vue";
import {onMounted, ref} from "vue";
import {aFetch} from "@/axiosConfig.js";
import {useRouter} from "vue-router";

const router = useRouter()
const cart = ref(null)
const user = ref(null)
onMounted(async () => {
    const response = await aFetch("me")
      .then(()=>{
        cart.value =  aFetch('cart')
        localStorage.setItem('user', JSON.stringify(response));
      })
      .catch(()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('role')
    });

})
</script>

<template>
  <HeaderComponent
    v-if="router.currentRoute.value.fullPath !== '/login' && router.currentRoute.value.fullPath !== '/register' && router.currentRoute.value.fullPath.substring(0,6) !== '/admin'"/>
  <RouterView/>
</template>
