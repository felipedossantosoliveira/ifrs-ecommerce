<script setup>
import axios from "axios";
import { getToken } from "@/composables/auth.js";
import { onMounted, ref } from "vue";
import { useRouter } from 'vue-router'
import Input from "@/components/Input.vue";

const router = useRouter()

const data = ref(null);

function getProfile() {
  axios({
    method: 'get',
    url: import.meta.env.VITE_BACKEND_URL + 'profile/me',
    headers: {
      Authorization: 'Bearer ' + getToken(router),
    },
  }).then(response => {
    data.value = response.data.data
  }).catch(error => {
    console.log(error);
  });
}

const addresses = ref(null);

function getAddresses() {
  axios({
    method: 'get',
    url: import.meta.env.VITE_BACKEND_URL + 'profile/addresses',
    headers: {
      Authorization: 'Bearer ' + getToken(router),
    },
  }).then(response => {
    addresses.value = response.data
  }).catch(error => {
    console.log(error);
  });
}

const addressForm = ref({
  street: "",
  city: "4322806",
  state: "43",
  country: "1058",
  zipCode: "",
  complement: ""
});

const showAddressForm = ref(false);

function addAddress() {
  axios({
    method: 'post',
    url: import.meta.env.VITE_BACKEND_URL + 'profile/addresses',
    headers: {
      Authorization: 'Bearer ' + getToken(router),
    },
    data: addressForm.value
  }).then(response => {
    getAddresses();
    showAddressForm.value = false;
  }).catch(error => {
    console.log(error);
  });
}

const orders = ref(null);

function getOrders() {
  axios({
    method: 'get',
    url: import.meta.env.VITE_BACKEND_URL + 'orders',
    headers: {
      Authorization: 'Bearer ' + getToken(router),
    },
  }).then(response => {
    orders.value = response.data
  }).catch(error => {
    console.log(error);
  });
}

onMounted(() => {
  getProfile();
  getAddresses();
  getOrders();
})
</script>
<template>
  <div class="mt-20 w-full flex h-dvh">
    <div class="w-1/2 p-10 border-r">
      <h1 class="border-neutral-600/50 p-1 bg-neutral-300 text-xs border uppercase">PROFILE</h1>
      <hr class="w-full my-2 border-neutral-700/50">
      <div class="flex">
        <div class="w-full">
          <div class="flex items-center space-x-2">
            <p class="w-32 text-xs uppercase">Name</p>
            <p class="text-xs">
              |
            </p>
            <p class="text-xs">{{ data?.name }}</p>
          </div>
          <hr class="w-full my-2 border-neutral-700/50">
          <div class="flex items-center space-x-2">
            <p class="w-32  text-xs uppercase">email</p>
            <p class="text-xs">
              |
            </p>
            <p class="text-xs">{{ data?.email }}</p>
          </div>
          <hr class="w-full my-2 border-neutral-700/50">
        </div>
      </div>

      <h1 class="border-neutral-600/50 p-1 bg-neutral-300 text-xs border uppercase mt-4">Addresses</h1>
      <div v-for="(address, index) in addresses?.data" :key="index" class="flex mt-2 border">
        <div class="w-full">
          <div class="flex items-center space-x-2 p-2">
            <p class="text-xs uppercase">{{ index + 1 }}</p>
          </div>
          <hr class="w-full border-neutral-700/50">
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

      <form v-show="showAddressForm" @submit.prevent="" class="border p-4 mt-2">
        <h2 class="uppercase text-xs">new address</h2>
        <hr class="w-full my-2 border-neutral-700/50">
        <Input type="text" v-model="addressForm.street" placeholder="Street"/>
        <Input type="text" v-model="addressForm.zipCode" placeholder="Zip code" class="mt-2"/>
        <Input type="text" v-model="addressForm.complement" placeholder="Complement" class="mt-2"/>
        <button @click="addAddress" class="border text-xs py-1 mt-2 w-full bg-black text-white hover:bg-neutral-400/50 hover:border-black hover:text-black">
          Add Address
        </button>
      </form>
      <button v-show="!showAddressForm" @click="showAddressForm = true" class="border text-xs py-1 mt-2 w-full bg-black text-white hover:bg-neutral-400/50 hover:border-black hover:text-black">
        Add Address
      </button>

    </div>
    <div class="w-1/2 p-10">
      <h1 class="border-neutral-600/50 p-1 bg-neutral-300 text-xs border uppercase">orders</h1>
      <div v-for="(order, index) in orders?.data" :key="index" class="flex mt-2 border">
        <div class="w-full">
          <div class="flex items-center space-x-2 p-2">
            <p class="text-xs uppercase">{{ index + 1 }}</p>
          </div>
          <hr class="w-full border-neutral-700/50">
          <div class="flex items-center space-x-2 p-2">
            <p class="w-32 text-xs uppercase">amount</p>
            <p class="text-xs">
              |
            </p>
            <p class="text-xs">${{ parseFloat(order.totalAmount).toFixed(2) }}</p>
          </div>
          <hr class="w-full border-neutral-700/50">
          <div class="flex items-center space-x-2 p-2">
            <p class="w-32 text-xs uppercase">payment status</p>
            <p class="text-xs">
              |
            </p>
            <p class="text-xs">{{ order.paymentStatus }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>