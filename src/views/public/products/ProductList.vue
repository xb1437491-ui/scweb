<template>
  <div style="display:flex; flex-direction:column; gap:12px;">
    <h2 style="margin:0;">商品</h2>

    <!-- 筛选栏 -->
    <el-card shadow="never">
      <div
        style="
          display: grid;
          grid-template-columns: 1fr 180px 180px 180px auto;
          gap: 12px;
          align-items: center;
        "
      >
        <el-input
          v-model="q"
          clearable
          placeholder="搜索：名称 / 标签 / 描述"
          @keyup.enter="noop"
        />

        <el-select v-model="category" clearable placeholder="分类">
          <el-option label="茶杯" value="cup" />
          <el-option label="茶包" value="teabag" />
          <el-option label="茶" value="tea" />
          <el-option label="配件" value="accessory" />
        </el-select>

        <el-select v-model="market" clearable placeholder="市场">
          <el-option label="英国 UK" value="UK" />
          <el-option label="法国 FR" value="FR" />
          <el-option label="德国 DE" value="DE" />
          <el-option label="丹麦 DK" value="DK" />
          <el-option label="塞尔维亚 RS" value="RS" />
        </el-select>

        <el-select v-model="sort" placeholder="排序">
          <el-option label="价格：低 → 高" value="price_asc" />
          <el-option label="价格：高 → 低" value="price_desc" />
          <el-option label="名称：A → Z" value="name_asc" />
        </el-select>

        <div style="display:flex; justify-content:flex-end; gap:8px;">
          <el-button @click="reset">重置</el-button>
          <el-tag type="info">共 {{ filtered.length }} 件</el-tag>
        </div>
      </div>
    </el-card>

    <!-- 列表 -->
    <el-row :gutter="12">
      <el-col
        v-for="p in filtered"
        :key="p.id"
        :xs="24"
        :sm="12"
        :md="8"
        :lg="6"
      >
        <el-card
          shadow="hover"
          style="cursor:pointer; height:100%;"
          @click="goDetail(p.id)"
        >
          <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px;">
            <div style="font-weight:700; line-height:1.2;">{{ p.name }}</div>
            <div style="font-weight:700;">¥{{ formatPrice(p.price) }}</div>
          </div>

          <div style="margin-top:8px; color:#666; font-size:13px; min-height:40px;">
            {{ p.description }}
          </div>

          <div style="margin-top:10px; display:flex; gap:6px; flex-wrap:wrap;">
            <el-tag size="small" type="success">{{ categoryLabel(p.category) }}</el-tag>
            <el-tag v-for="t in p.tags" :key="t" size="small">{{ t }}</el-tag>
          </div>

          <div style="margin-top:10px; display:flex; gap:6px; flex-wrap:wrap;">
            <el-tag
              v-for="m in p.markets"
              :key="m"
              size="small"
              type="info"
            >
              {{ m }}
            </el-tag>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-empty v-if="filtered.length === 0" description="没有匹配的商品" />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { products } from '../../../mock/products'

const router = useRouter()

// 筛选状态
const q = ref('')
const category = ref('')
const market = ref('')
const sort = ref('price_asc')

function reset() {
  q.value = ''
  category.value = ''
  market.value = ''
  sort.value = 'price_asc'
}

function noop() {}

function goDetail(id) {
  router.push(`/products/${id}`)
}

function formatPrice(v) {
  const n = Number(v)
  if (Number.isNaN(n)) return v
  return n.toFixed(2)
}

function categoryLabel(c) {
  const map = {
    cup: '茶杯',
    teabag: '茶包',
    tea: '茶',
    accessory: '配件',
  }
  return map[c] || c
}

function matchText(p, text) {
  const t = (text || '').trim().toLowerCase()
  if (!t) return true
  const hay = [
    p.name,
    p.description,
    ...(p.tags || []),
    ...(p.markets || []),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
  return hay.includes(t)
}

const filtered = computed(() => {
  let list = [...products]

  // 搜索
  list = list.filter((p) => matchText(p, q.value))

  // 分类筛选
  if (category.value) list = list.filter((p) => p.category === category.value)

  // 市场筛选
  if (market.value) list = list.filter((p) => (p.markets || []).includes(market.value))

  // 排序
  if (sort.value === 'price_asc') list.sort((a, b) => Number(a.price) - Number(b.price))
  if (sort.value === 'price_desc') list.sort((a, b) => Number(b.price) - Number(a.price))
  if (sort.value === 'name_asc') list.sort((a, b) => String(a.name).localeCompare(String(b.name)))

  return list
})
</script>
