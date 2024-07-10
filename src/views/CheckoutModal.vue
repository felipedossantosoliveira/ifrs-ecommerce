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

const emit = defineEmits(['close', 'checkout'])

const data = ref(null);

const router = useRouter()

function getAddresses() {
	axios({
		method: 'get',
		url: import.meta.env.VITE_BACKEND_URL + 'profile/addresses',
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
	getAddresses();
})

</script>
<template>
	<div v-show="show"
		class="fixed top-0 w-screen h-screen bg-neutral-600/30 backdrop-blur z-[100] flex items-center justify-center">
		<div class="w-96 bg-white p-4 border">
			<div
				class="flex justify-between items-center border-neutral-600/50 p-1 bg-neutral-300 text-xs border uppercase">
				<h1>delivery address</h1>
				<button @click="$emit('close')" class="text-xs">X</button>
			</div>
			<hr class="w-full mt-2 border-neutral-700/50">
			<div @click="emit('checkout', address.id)" v-for="(address, index) in data?.data" :key="index"
				class="flex mt-2 border hover:bg-neutral-200 cursor-pointer">
				<div class="w-full">
					<div class="flex items-center space-x-2 p-2">
						<p class="w-32 text-xs uppercase">Street</p>
						<p class="text-xs">
							|
						</p>
						<p class="text-xs">{{ address.street }}</p>
					</div>
					<hr class="w-full border-neutral-700/50">
					<div class="flex items-center space-x-2 p-2">
						<p class="w-32 text-xs uppercase">Zip code</p>
						<p class="text-xs">
							|
						</p>
						<p class="text-xs">{{ address.zipCode }}</p>
					</div>
					<hr class="w-full border-neutral-700/50">
					<div class="flex items-center space-x-2 p-2">
						<p class="w-32 text-xs uppercase">complement</p>
						<p class="text-xs">
							|
						</p>
						<p class="text-xs">{{ address.complement }}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>