<script setup>
</script>
<template>
  <header class="w-full flex justify-between *:border-neutral-500/50">
    <div class="w-full flex flex-col border-b">
      <div class="w-full border-b border-neutral-500/50 h-full">
        <nav>
          <ul class="flex *:uppercase *:text-xs *:py-2 *:px-4 *:cursor-pointer">
            <li class="group">
              <router-link to="/">
                <span class="border border-transparent group-hover:bg-gray-400 group-hover:text-white group-hover:border-black px-0.5">
                  shop
                </span>
              </router-link>
            </li>
            <li class="group">
              <router-link to="/">
                <span class="border border-transparent group-hover:bg-gray-400 group-hover:text-white group-hover:border-black px-0.5">
                looks
                </span>
              </router-link>
            </li>
            <li class="group">
              <router-link to="/">
                <span class="border border-transparent group-hover:bg-gray-400 group-hover:text-white group-hover:border-black px-0.5">
                radio
                </span>
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
      <div class="w-full h-full"></div>
    </div>
    <div class="py-6 px-28 border">
      <h1 class="fuct-font text-5xl text-neutral-900">ifrs</h1>
    </div>
    <div class="w-full flex flex-col border-b">
      <div class="w-full border-b border-neutral-500/50 h-full"></div>
      <div class="w-full h-full"></div>
    </div>
  </header>
</template>