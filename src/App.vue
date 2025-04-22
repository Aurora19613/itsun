<script setup>
import {useRoute,useRouter} from 'vue-router'
import { useCounterStore } from '@/stores/index'
const set = () => {
  const Route = useRoute()
  const Router = useRouter()
  console.log(Route,Router);
}
set()
const CounterStore = useCounterStore()
</script>

<template>
  <vue-router></vue-router>
  <div>{{ CounterStore.count }}</div>
  <el-button @click="CounterStore.increment()">按钮</el-button>
</template>

<style scoped>

</style>
