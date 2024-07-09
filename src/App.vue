<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <header class="w-full fixed flex top-0 left-0 justify-between *:border-neutral-500/50">
    <div class="w-full flex flex-col border-b">
      <div class="w-full bg-white border-b border-neutral-500/50 h-full">
        <nav>
          <ul class="flex *:uppercase *:text-[8pt] *:py-1 *:px-4 *:cursor-pointer">
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
      <div class="w-full flex backdrop-blur-3xl h-full">
        <div class="w-44 flex items-center h-full">
          <div class="w-full border-b border-neutral-500/50">
          </div>
        </div>
        <div class="w-44 h-full flex items-center justify-center uppercase text-[8pt] bg-gray-200 border-x border-neutral-500/50">
          {{ route.name }}
        </div>
      </div>
    </div>
    <div class="h-20 bg-white flex items-center px-28 border">
      <h1 class="fuct-font text-5xl text-neutral-900">ifrs</h1>
    </div>
    <div class="w-full flex flex-col border-b">
      <div class="w-full bg-white border-b border-neutral-500/50 h-full">
        <nav>
          <ul class="flex justify-end *:uppercase *:text-[8pt] *:py-1 *:px-4 *:cursor-pointer">
            <li class="group">
              <router-link to="/account/login">
                <span class="border border-transparent group-hover:bg-gray-400 group-hover:text-white group-hover:border-black px-0.5">
                  account
                </span>
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
      <div class="w-full backdrop-blur-3xl h-full"></div>
    </div>
  </header>

  <div class="mt-10">
    <RouterView />
  </div>
</template>