<script setup>
import { getToken } from '@/composables/auth';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
	show: {
		type: Boolean,
		default: false
	}
})

const emit = defineEmits(['close', 'discount'])

const data = ref(null);

const router = useRouter()

function getDiscounts() {
	axios({
		method: 'get',
		url: import.meta.env.VITE_BACKEND_URL + 'discounts',
		headers: {
			Authorization: 'Bearer ' + getToken(router),
		},
	}).then(response => {
		data.value = response.data
	}).catch(error => {
		console.log(error);
	});
}

onMounted(() => {
	getDiscounts();
})

</script>
<template>
	<div v-show="show" class="fixed top-0 w-screen h-screen bg-neutral-600/30 backdrop-blur z-[100] flex items-center justify-center">
		<div class="w-96 bg-white p-4 border">
			<div
				class="flex justify-between items-center border-neutral-600/50 p-1 bg-neutral-300 text-xs border uppercase">
				<h1>discounts</h1>
				<button @click="$emit('close')" class="text-xs">X</button>
			</div>
			<hr class="w-full mt-2 border-neutral-700/50">
			<div v-show="discount.quantity > 0" @click="emit('discount', discount.id)" class="hover:bg-neutral-200 cursor-pointer" v-for="(discount, index) in data?.data">
				<div class="flex items-center justify-between py-2">
					<p class="w-32 text-xs">{{ discount.code }}</p>
					<p class="text-xs">{{ discount.percentage }}%</p>
				</div>
				<hr class="w-full border-neutral-700/50">
			</div>
		</div>
	</div>
</template>