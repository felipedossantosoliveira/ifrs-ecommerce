<script setup>
import axios from "axios";
import {getToken} from "@/composables/auth.js";
import {onMounted, ref} from "vue";
import { useRouter } from 'vue-router'

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

onMounted(() => {
  getProfile();
})
</script>
<template>
  <div class="mt-20">
    <h1>User</h1>
  </div>
  {{data}}
</template>