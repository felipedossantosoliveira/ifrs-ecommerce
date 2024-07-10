<script setup>
import axios from "axios";
import {onMounted, ref} from "vue";

const data = ref(null);

function getProducts() {
  axios.get(import.meta.env.VITE_BACKEND_URL + 'public/products')
    .then(response => {
      data.value = response.data.data;
    })
    .catch(error => {
      console.log(error);
    });
}

onMounted(() => {
  getProducts();
});

</script>
<template>
  <img src="https://cdn.shopify.com/s/files/1/2068/4441/files/DESKTOP_BANNER-NEW5.jpg?v=1711128575&width=2600&crop=center" class="h-72 w-full object-cover">
  <div class="text-xs px-2 py-0.5 border uppercase">
    <h1>products</h1>
  </div>
  <div class="w-full grid grid-cols-4 gap-10 mt-2 p-10">
    <div v-for="(item,index) in data" :key="index">
      <router-link :to="'/product/'+ item.id" class="group cursor-pointer">
        <img :src="item?.favoritePhotoUrl" alt="photo" class="w-full object-cover">

        <div class="*:group-hover:bg-gray-200 *:my-1">
          <h1 class="text-xs uppercase">{{ item?.name }}</h1>
          <h3 class="text-xs">${{ parseFloat(item?.price).toFixed(2) }}</h3>
        </div>
      </router-link>
    </div>

  </div>
</template>