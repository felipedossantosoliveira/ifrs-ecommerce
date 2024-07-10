<script setup>
import {onMounted, ref} from "vue";
import Input from "@/components/Input.vue";
import {useRouter} from "vue-router";
import {hasToken, register} from "@/composables/auth.js";

const router = useRouter();

function submit() {
  register(form, router,() => error.value = true)
}

const form = ref({
  name: '',
  email: '',
  password: ''
})

const error = ref(false)

onMounted(() => {
  if (hasToken()) {
    router.push('/')
  }
})

</script>
<template>
  <div class="flex items-center justify-center h-dvh">
    <div class="w-80">
      <h1 class="text-xs">REGISTER</h1>
      <hr class="w-full my-2 border-neutral-700/50">
      <div v-show="error" class="border border-red-400 bg-red-400/20 p-1 text-red-600 text-xs uppercase mb-2">
        ERRO
      </div>
      <form @submit.prevent="submit">
        <Input type="text" v-model="form.name" placeholder="Name"/>
        <Input type="email" v-model="form.email" placeholder="Email" class="mt-2"/>
        <Input type="password" v-model="form.password" placeholder="Password" class="mt-2"/>
        <button class="w-full bg-black text-white py-2 mt-2 uppercase text-sm">register</button>
      </form>
    </div>
  </div>
</template>