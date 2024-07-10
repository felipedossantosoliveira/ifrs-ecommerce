<script setup>
import { getToken } from '@/composables/auth';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import DiscountModal from './DiscountModal.vue';
import CheckoutModal from './CheckoutModal.vue';

const router = useRouter();

const emit = defineEmits(['close'])

function closeCart() {
  emit('close')
}

const data = ref(null);

const cart = ref(null);

function getCart(){
  axios({
    method: 'get',
    url: import.meta.env.VITE_BACKEND_URL + 'cart',
    headers: {
      Authorization: 'Bearer ' + getToken(router),
    },
  }).then(response => {
    cart.value = response.data.data
  }).catch(error => {
    console.log(error);
  });

}

function getCartItems() {
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
    getCartItems();
    getCart();
  }).catch(error => {
    console.log(error);
  });
}

const showDiscountModal = ref(false);

function openDiscountModal() {
  showDiscountModal.value = true;
}

function closeDiscountModal() {
  showDiscountModal.value = false;
}

function applyDiscount(id) {
  axios({
    method: 'patch',
    url: import.meta.env.VITE_BACKEND_URL + 'cart',
    headers: {
      Authorization: 'Bearer ' + getToken(router),
    },
    data: {
      discountId: id
    }
  }).then(response => {
    getCart();
    showDiscountModal.value = false;
  }).catch(error => {
    console.log(error);
  });
}

const showCheckoutModal = ref(false);

function openCheckoutModal() {
  showCheckoutModal.value = true;
}

function closeCheckoutModal() {
  showCheckoutModal.value = false;
}

function checkout(id) {
  axios({
    method: 'patch',
    url: import.meta.env.VITE_BACKEND_URL + 'cart/checkout',
    headers: {
      Authorization: 'Bearer ' + getToken(router),
    },
    data: {
      addressId: id
    }
  }).then(response => {
    getCart();
    getCartItems();
    showCheckoutModal.value = false;
  }).catch(error => {
    console.log(error);
  });
}

onMounted(() => {
  getCartItems();
  getCart();
})

</script>
<template>
  <div class="fixed overflow-auto z-10 top-0 right-0 h-svh w-96 bg-white border flex flex-col justify-between">
    <div>
        <div class="flex border-b h-10 justify-between items-center px-1">
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
    <div class="p-4">
      <div>
        <p class="text-xs uppercase">TOTALS</p>
        <p class="text-xs uppercase">SUBTOTAL - ${{ cart?.totalAmount }}</p>
        <p class="text-xs uppercase">DISCOUNT - {{ cart?.discount?.code }}</p>
      </div>
      <button 
        @click="openDiscountModal"
        class="border text-xs uppercase py-1 mt-2 w-full">
        Apply Discount
      </button>
      <button
        @click="openCheckoutModal"
        class="border uppercase py-1 mt-2 w-full bg-black text-white hover:bg-neutral-400/50 hover:border-black hover:text-black">
        Checkout
      </button>
    </div>
  </div>
  <DiscountModal :show="showDiscountModal" @discount="applyDiscount" @close="closeDiscountModal"/>
  <CheckoutModal :show="showCheckoutModal" @checkout="checkout" @close="closeCheckoutModal" />
</template>