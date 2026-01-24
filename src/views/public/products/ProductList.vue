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
          style="cursor:pointer; height:100%; overflow:hidden;"
          @click="goDetail(p.id)"
        >
          <!-- 主图 -->
          <div class="pl-img" v-if="cardImage(p)">
            <img :src="cardImage(p)" :alt="p.name" />
          </div>
          <div class="pl-img pl-img-ph" v-else>
            <div>暂无图片</div>
          </div>

          <!-- 信息 -->
          <div style="padding-top:10px; display:flex; flex-direction:column; gap:8px;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px;">
              <div style="font-weight:800; line-height:1.2;">{{ p.name }}</div>
              <div style="font-weight:800; white-space:nowrap;">¥{{ formatPrice(p.price) }}</div>
            </div>

            <div style="color:#666; font-size:13px; line-height:1.6; min-height:42px;">
              {{ p.description }}
            </div>

            <!-- 亮点（自动取第一条） -->
            <el-tag v-if="firstHighlight(p)" type="success" effect="plain">
              亮点：{{ firstHighlight(p) }}
            </el-tag>

            <!-- 分类 + 标签 -->
            <div style="display:flex; gap:6px; flex-wrap:wrap;">
              <el-tag size="small" type="success">{{ categoryLabel(p.category) }}</el-tag>
              <el-tag v-for="t in (p.tags || [])" :key="t" size="small">{{ t }}</el-tag>
            </div>

            <!-- 市场 -->
            <div style="display:flex; gap:6px; flex-wrap:wrap;">
              <el-tag
                v-for="m in (p.markets || [])"
                :key="m"
                size="small"
                type="info"
              >
                {{ m }}
              </el-tag>
            </div>
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

// ✅ 取卡片图片：优先 hero.image，没有就空
function cardImage(p) {
  return p?.hero?.image || ''
}

// ✅ 取第一条亮点：没有就空
function firstHighlight(p) {
  const h = p?.highlights?.[0]
  if (!h) return ''
  return h.title ? `${h.title}` : ''
}

const filtered = computed(() => {
  let list = [...products]

  list = list.filter((p) => matchText(p, q.value))
  if (category.value) list = list.filter((p) => p.category === category.value)
  if (market.value) list = list.filter((p) => (p.markets || []).includes(market.value))

  if (sort.value === 'price_asc') list.sort((a, b) => Number(a.price) - Number(b.price))
  if (sort.value === 'price_desc') list.sort((a, b) => Number(b.price) - Number(a.price))
  if (sort.value === 'name_asc') list.sort((a, b) => String(a.name).localeCompare(String(b.name)))

  return list
})
</script>

<style scoped>
.pl-img {
  width: 100%;
  height: 150px;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #eee;
  background: #fafafa;
}
.pl-img img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}
.pl-img-ph {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 13px;
}
</style>
