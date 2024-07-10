<script setup>
import { getToken } from '@/composables/auth';
import axios from 'axios';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const emit = defineEmits(['close'])

function closeCart() {
  emit('close')
}

function getCart() {
  axios({
	method: 'get',
    url: import.meta.env.VITE_BACKEND_URL + 'cart',
    headers: {
      Authorization: 'Bearer ' + getToken(router),
    },
  }).then(response => {
	console.log(response.data.data);
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
	</div>
</template>