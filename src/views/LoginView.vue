<script setup>
import {ref} from "vue";
import Input from "@/components/Input.vue";
import axios from "axios";
import {useRouter} from "vue-router";

const router = useRouter();

function login() {
  axios.post(import.meta.env.VITE_BACKEND_URL + 'auth/login', form.value)
    .then(res => {
      localStorage.setItem('token', res.data.data.token)
      router.push({name: 'home'})
    })
    .catch(err => {
      console.log(err)
    })
}

const form = ref({
  email: '',
  password: ''
})

</script>
<template>
  <div class="flex items-center justify-center h-dvh">
    <div class="w-80">
      <h1 class="text-xs">SIGN IN</h1>
      <hr class="w-full my-2 border-neutral-700/50">
      <Input type="email" v-model="form.email" placeholder="Email" />
      <Input type="password" v-model="form.password" placeholder="Password" class="mt-2"/>
      <button @click="login" class="w-full bg-black text-white py-2 mt-2 uppercase text-sm">Sign In</button>
      <div class="flex justify-between mt-2 *:text-xs *:uppercase">
        <router-link to="/" class="hover:underline">
          forgot password?
        </router-link>
        <router-link to="/" class="hover:underline">
          register
        </router-link>
      </div>
    </div>
  </div>
</template>