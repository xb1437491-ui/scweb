<template>
  <div style="display:flex; flex-direction:column; gap:12px;">
    <el-button text @click="router.back()">← 返回</el-button>

    <el-card v-if="p" shadow="never">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:12px;">
        <div>
          <h2 style="margin:0 0 6px 0;">{{ p.name }}</h2>
          <div style="color:#666;">{{ p.description }}</div>
        </div>
        <div style="font-weight:700; font-size:18px;">¥{{ Number(p.price).toFixed(2) }}</div>
      </div>

      <div style="margin-top:10px; display:flex; gap:6px; flex-wrap:wrap;">
        <el-tag size="small" type="success">{{ categoryLabel(p.category) }}</el-tag>
        <el-tag v-for="t in p.tags" :key="t" size="small">{{ t }}</el-tag>
      </div>

      <div style="margin-top:10px; display:flex; gap:6px; flex-wrap:wrap;">
        <el-tag v-for="m in p.markets" :key="m" size="small" type="info">{{ m }}</el-tag>
      </div>

      <div style="margin-top:16px; display:flex; gap:10px;">
        <el-button type="primary" @click="buy">虚拟购买</el-button>
        <el-button @click="addToCart">加入收藏/购物车（占位）</el-button>
      </div>
    </el-card>

    <el-empty v-else description="未找到该商品" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { products } from '../../../mock/products'

const route = useRoute()
const router = useRouter()

const id = computed(() => Number(route.params.id))
const p = computed(() => products.find((x) => Number(x.id) === id.value))

function categoryLabel(c) {
  const map = { cup: '茶杯', teabag: '茶包', tea: '茶', accessory: '配件' }
  return map[c] || c
}

function buy() {
  ElMessage.success('已模拟下单（后续接入真实支付）')
}
function addToCart() {
  ElMessage.info('已加入（占位）')
}
</script>
