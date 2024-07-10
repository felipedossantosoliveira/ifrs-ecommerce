<script setup>

import axios from "axios";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import {getToken} from "@/composables/auth.js";

const router = useRouter();

const props = defineProps({
  id: String,
})

const data = ref(null);

const features = ref(null);

function getFeatures() {
  axios({
    method: 'get',
    url: import.meta.env.VITE_BACKEND_URL + `products/${props.id}/features`,
    headers: {
      'Authorization': 'Bearer ' + getToken(router)
    }
  })
      .then(response => {
        features.value = response.data.data;
      })
      .catch(error => {
        console.log(error);
      });
}

function getItem() {
  axios({
    method: 'get',
    url: import.meta.env.VITE_BACKEND_URL + 'products/' + props.id,
    headers: {
      'Authorization': 'Bearer ' + getToken(router)
    }

  }).then(response => {
    data.value = response.data.data;
  })
      .catch(error => {
        console.log(error);
      });
}

onMounted(() => {
  getItem();
  getFeatures();
});
</script>
<template>
  <div class="mt-20 w-full flex">
    <div class="w-1/2 p-10 border-r">
      <div class="p-10 border">
        <img :src="data?.favoritePhotoUrl">
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
        <div class="*:text-xs *:size-8 *:text-center flex gap-1 *:border mt-2">
          <div>
            S
          </div>
          <div>
            M
          </div>
          <div class="bg-black text-white">
            L
          </div>
          <div>
            XL
          </div>
        </div>
        <div class="mt-2">
          <button
              class="w-full bg-black text-white py-3 uppercase text-xs hover:bg-neutral-400/50 border hover:border-black hover:text-black">
            add to cart
          </button>
        </div>
        <div class="mt-2">
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
    </div>
  </div>
</template>