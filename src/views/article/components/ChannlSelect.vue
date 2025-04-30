<script setup>
import { articleGetChannelInfoService } from '@/api/article'
import { ref,onMounted } from 'vue'
const emit = defineEmits(['update:modelValue'])
const ChannlLIst = ref([])
onMounted(async () => {
 const res = await articleGetChannelInfoService()
 ChannlLIst.value = res.data.data
})
defineProps({
    modelValue: [Number, String],
    width: String
})
</script>
<template>
    <el-select 
    :style="{width}"
    :modelValue="modelValue" 
    @update:modelValue="emit('update:modelValue',$event)" 
    placeholder="请选择" 
    class="newstyle"
    >
        <el-option
        v-for="item in ChannlLIst"
        :key="item.id"
        :label="item.cate_name" 
        :value="item.id"></el-option>
      </el-select>
</template>