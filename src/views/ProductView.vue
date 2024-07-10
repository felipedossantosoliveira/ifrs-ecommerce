<script setup>

import { getToken } from "@/composables/auth";
import axios from "axios";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();

const props = defineProps({
  id: String,
})

const data = ref(null);

function getItem() {
  axios({
    method: 'get',
    url: import.meta.env.VITE_BACKEND_URL + 'public/products/' + props.id,
  }).then(response => {
    data.value = response.data.data;
    verifyStock(data.value);
  })
  .catch(error => {
    console.log(error);
  });
}

function verifyStock(data) {
  soldOut.value = true;
  for (let i = 0; i < data.features.length; i++) {
    if (data.features[i].quantity !== 0) {
      soldOut.value = false;
      featureIndex.value = i;
      featureId.value = data.features[i].id;
      return;
    }
  }
}

const soldOut = ref(false);

const featureIndex = ref(0);

const featureId = ref(null);  

function selectFeature(index, feature) {
  if (feature.quantity === 0) {
    return;
  }
  featureId.value = feature.id;
  featureIndex.value = index;
}

function addToCart() {
  axios({
    method: 'post',
    url: import.meta.env.VITE_BACKEND_URL + 'cart-items',
    headers: {
      Authorization: 'Bearer ' + getToken(router),
    },
    data: {
      productFeatureId: featureId.value,
      quantity: 1,
    }
  }).then(response => {
    router.push({name: 'shop'});
  })
  .catch(error => {
    console.log(error);
  });
}

onMounted(() => {
  getItem();
});
</script>
<template>
  <div class="mt-20 w-full flex">
    <div class="w-1/2 p-10 border-r">
      <div class="flex flex-col">
        <img v-for="(photo,index) in data?.photos" :key="index" :src="photo.photoUrl" class="p-10 border mb-5">
      </div>
    </div>
    <div class="w-1/2 px-20">
      <div class="mt-48 w-2/3">
        <div class="border-neutral-600/50 p-1 bg-neutral-300 text-xs border">
          {{ data?.name }}
        </div>
        <div class="text-xs mt-2">
          ${{ parseFloat(data?.price).toFixed(2) }}
        </div>
        <div v-show="!soldOut" class="*:text-xs *:size-8 *:text-center flex gap-1 *:border mt-2">
          <div
            @click="selectFeature(index,feature)"
           v-for="(feature, index) in data?.features" 
           :key="index"
          :class="[featureIndex === index ? 'bg-black text-white' : 'border-black',
            feature.quantity === 0 ? 'bg-neutral-400/50' : 'border-black hover:bg-black hover:text-white cursor-pointer',
          ]"
           >
            {{ feature.name }}
          </div>
        </div>
        <div v-show="soldOut" class="border-neutral-600/50 p-1 bg-neutral-300 text-xs border uppercase mt-2">
          Sold Out
        </div>
        <div v-show="!soldOut" class="mt-2">
          <button @click="addToCart"
              class="w-full bg-black text-white py-3 uppercase text-xs hover:bg-neutral-400/50 border hover:border-black hover:text-black">
            add to cart
          </button>
        </div>
        <div v-show="!soldOut" class="mt-2">
          <button class="w-full border border-black py-3 uppercase text-xs hover:bg-neutral-400/50 hover:text-black">
            Checkout
          </button>
        </div>
        <div>
          <h1 class="text-xs mt-2 uppercase">Description</h1>
          <p class="text-xs mt-2 uppercase">
            {{ data?.description }}
          </p>
        </div>
      </div>
      <pre>
    </pre>
    </div>
  </div>
</template>