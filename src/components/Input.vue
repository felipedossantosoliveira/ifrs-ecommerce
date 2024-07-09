<script setup>

defineProps(['type', 'placeholder'])

const model = defineModel()

</script>

<template>
  <input :type="type" :placeholder="placeholder" v-model="model" class="w-full border border-neutral-600/50 p-[0.150rem] bg-neutral-300 placeholder-neutral-700 text-xs focus-visible:ring-0">
</template>