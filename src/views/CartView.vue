<script setup>
import {getToken} from '@/composables/auth';
import axios from 'axios';
import {onMounted, ref} from 'vue';
import {useRouter} from 'vue-router';

const router = useRouter();

const emit = defineEmits(['close'])

function closeCart() {
  emit('close')
}

const data = ref(null);

function getCart() {
  axios({
    method: 'get',
    url: import.meta.env.VITE_BACKEND_URL + 'cart-items',
    headers: {
      Authorization: 'Bearer ' + getToken(router),
    },
  }).then(response => {
    data.value = response.data
  }).catch(error => {
    console.log(error);
  });
}

function removeItem(id) {
  axios({
    method: 'delete',
    url: import.meta.env.VITE_BACKEND_URL + 'cart-items/' + id,
    headers: {
      Authorization: 'Bearer ' + getToken(router),
    },
  }).then(response => {
    getCart();
  }).catch(error => {
    console.log(error);
  });
}

onMounted(() => {
  getCart();
})

</script>
<template>
  <div class="fixed z-10 top-0 right-0 h-svh w-96 bg-white border">
    <div class="flex border-b justify-between">
      <h1 class="uppercase text-xs">Cart</h1>
      <button @click="closeCart" class="text-xs px-2">X</button>
    </div>
    <div class="flex flex-col p-2">
      <div v-for="item in data?.data" class="flex border mb-1 p-1">
        <div class="w-20 border p-2 mr-1">
          <img :src="item.productFeature.product.favoritePhotoUrl" class="object-cover">
        </div>
        <div class="text-xs *:uppercase flex flex-col space-y-1 w-full">
          <p>{{ item.productFeature.product.name }}</p>
          <p>${{ parseFloat(item.productFeature.product.price).toFixed(2) }}</p>
          <p>size: {{ item.productFeature.name }}</p>
          <div class="flex justify-between items-center w-full">
            <p>Quantity: {{ item.quantity }}</p>
            <button @click="removeItem(item.id)" class="text-xs px-1 uppercase border">Remove</button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>