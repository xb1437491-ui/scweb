<template>
  <div style="display:flex; flex-direction:column; gap:14px;">
    <!-- 顶部横幅 -->
    <el-card shadow="never">
      <div class="hero">
        <div>
          <div style="font-size:22px; font-weight:900; line-height:1.2;">
            PLATFORM · 中式养生文化与生活器物
          </div>
          <div style="margin-top:8px; color:#666; line-height:1.8;">
            以“市场适配”为导向的选品：把东方的日常节律，带进欧洲消费者的生活方式。
          </div>

          <div style="margin-top:12px; display:flex; gap:10px; flex-wrap:wrap;">
            <el-button type="primary" @click="go('/products')">去逛商品</el-button>
            <el-button @click="go('/news')">看咨询</el-button>
            <el-button @click="go('/papers')">读文献</el-button>
            <el-button @click="go('/videos')">看纪录片</el-button>
          </div>
        </div>

        <div class="hero-right">
          <div class="hero-badge">
            <div style="font-weight:900; font-size:18px;">今日推荐</div>
            <div style="margin-top:6px; color:#666; line-height:1.6;">
              选择一个目标市场，我们给出“最适配”的商品组合。
            </div>

            <div style="margin-top:10px; display:flex; gap:8px; align-items:center;">
              <el-select v-model="market" style="width:180px;">
                <el-option label="德国 DE" value="DE" />
                <el-option label="丹麦 DK" value="DK" />
                <el-option label="法国 FR" value="FR" />
                <el-option label="英国 UK" value="UK" />
              </el-select>
              <el-button @click="goMarket">查看推荐</el-button>
            </div>

            <div style="margin-top:10px; display:flex; gap:6px; flex-wrap:wrap;">
              <el-tag type="info">市场导向选品</el-tag>
              <el-tag type="success">文化叙事</el-tag>
              <el-tag>可持续</el-tag>
            </div>
          </div>
        </div>
      </div>
    </el-card>

    <!-- 精选推荐 -->
    <el-card shadow="never">
      <div style="display:flex; align-items:center; justify-content:space-between; gap:10px;">
        <div style="font-weight:900; font-size:18px;">精选推荐</div>
        <el-button text @click="go('/products')">查看全部 →</el-button>
      </div>

      <el-row :gutter="12" style="margin-top:10px;">
        <el-col v-for="p in featured" :key="p.id" :xs="24" :sm="12" :md="8" :lg="6">
          <el-card shadow="hover" style="cursor:pointer; height:100%;" @click="go(`/products/${p.id}`)">
            <div class="card-img" v-if="p?.hero?.image">
              <img :src="p.hero.image" :alt="p.name" />
            </div>
            <div class="card-img ph" v-else>暂无图片</div>

            <div style="padding-top:10px; display:flex; flex-direction:column; gap:8px;">
              <div style="display:flex; justify-content:space-between; gap:10px; align-items:flex-start;">
                <div style="font-weight:900;">{{ p.name }}</div>
                <div style="font-weight:900; white-space:nowrap;">¥{{ fmt(p.price) }}</div>
              </div>

              <div style="color:#666; font-size:13px; line-height:1.6; min-height:40px;">
                {{ p.description }}
              </div>

              <div style="display:flex; gap:6px; flex-wrap:wrap;">
                <el-tag size="small" type="success">{{ categoryLabel(p.category) }}</el-tag>
                <el-tag v-for="m in p.markets" :key="m" size="small" type="info">{{ m }}</el-tag>
              </div>

              <el-tag v-if="firstHighlight(p)" type="success" effect="plain">
                亮点：{{ firstHighlight(p) }}
              </el-tag>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>

    <!-- 按目标市场推荐 -->
    <el-card shadow="never">
      <div style="display:flex; align-items:center; justify-content:space-between; gap:10px;">
        <div style="font-weight:900; font-size:18px;">按目标市场推荐</div>
        <div style="display:flex; gap:8px; align-items:center;">
          <el-select v-model="market" style="width:180px;">
            <el-option label="德国 DE" value="DE" />
            <el-option label="丹麦 DK" value="DK" />
            <el-option label="法国 FR" value="FR" />
            <el-option label="英国 UK" value="UK" />
          </el-select>
          <el-button type="primary" @click="goMarket">查看该市场推荐</el-button>
        </div>
      </div>

      <div style="margin-top:10px; color:#666; line-height:1.7;">
        我们按市场偏好组织选品：例如德国偏好耐用与功能理性、丹麦偏好极简与自然材料、法国关注品质与性价比、英国重视礼品与氛围感。
      </div>

      <el-row :gutter="12" style="margin-top:10px;">
        <el-col v-for="p in byMarket" :key="p.id" :xs="24" :sm="12" :md="8" :lg="6">
          <el-card shadow="hover" style="cursor:pointer; height:100%;" @click="go(`/products/${p.id}`)">
            <div class="card-mini">
              <div style="font-weight:900;">{{ p.name }}</div>
              <div style="color:#666; font-size:13px;">¥{{ fmt(p.price) }}</div>
            </div>
            <div style="margin-top:8px; display:flex; gap:6px; flex-wrap:wrap;">
              <el-tag size="small" type="success">{{ categoryLabel(p.category) }}</el-tag>
              <el-tag v-for="t in (p.tags || [])" :key="t" size="small">{{ t }}</el-tag>
            </div>
            <el-tag v-if="firstHighlight(p)" style="margin-top:8px;" type="success" effect="plain">
              亮点：{{ firstHighlight(p) }}
            </el-tag>
          </el-card>
        </el-col>
      </el-row>
    </el-card>

    <!-- 快速入口 -->
    <el-card shadow="never">
      <div style="font-weight:900; font-size:18px;">快速入口</div>
      <div style="margin-top:10px; display:flex; gap:10px; flex-wrap:wrap;">
        <el-button @click="go('/products')">商品展示</el-button>
        <el-button @click="go('/support')">客服支持</el-button>
        <el-button @click="go('/stats')">销量统计</el-button>
        <el-button @click="go('/admin')">后台入口</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { products } from '../../mock/products'

const router = useRouter()

// 默认市场（你也可以改成 DK/UK）
const market = ref('DE')

function go(path) {
  router.push(path)
}

function goMarket() {
  // 这里先用 query 参数，后面我们可以做“按市场筛选的商品页”
  router.push({ path: '/products', query: { market: market.value } })
}

function fmt(v) {
  const n = Number(v)
  return Number.isFinite(n) ? n.toFixed(2) : v
}

function categoryLabel(c) {
  const map = { cup: '茶杯', teabag: '茶包', tea: '茶', accessory: '配件' }
  return map[c] || c
}

function firstHighlight(p) {
  const h = p?.highlights?.[0]
  if (!h) return ''
  return h.title || ''
}

// 精选：优先展示“完整级别”（有 hero + marketFit + cultureStory）
// 如果不足 4 个，就按价格/名字补齐
const featured = computed(() => {
  const complete = products.filter((p) => p?.hero?.image && p?.marketFit && p?.cultureStory)
  const rest = products.filter((p) => !complete.includes(p))
  return [...complete, ...rest].slice(0, 4)
})

// 按市场推荐：markets 包含该国家的商品
const byMarket = computed(() => {
  return products
    .filter((p) => (p.markets || []).includes(market.value))
    .slice(0, 4)
})
</script>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 14px;
  align-items: stretch;
}
.hero-right {
  display: flex;
  align-items: stretch;
}
.hero-badge {
  width: 100%;
  border: 1px solid #eee;
  border-radius: 14px;
  padding: 14px;
  background: #fafafa;
}
.card-img {
  width: 100%;
  height: 150px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #eee;
  background: #fafafa;
}
.card-img img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}
.card-img.ph {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 13px;
}
.card-mini {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
}
@media (max-width: 980px) {
  .hero {
    grid-template-columns: 1fr;
  }
}
</style>
