<template>
  <div style="display:flex; flex-direction:column; gap:14px;">
    <el-button text @click="router.back()">← 返回</el-button>

    <el-alert
      v-if="!p"
      type="warning"
      show-icon
      title="未找到该商品"
      description="请从商品列表进入，或确认商品 id 是否存在。"
    />

    <template v-else>
      <!-- 顶部：主图 + 核心信息 -->
      <el-card shadow="never">
        <div class="pd-hero">
          <div class="pd-hero-img">
            <img :src="heroImage" :alt="heroAlt" />
          </div>

          <div class="pd-hero-info">
            <div style="display:flex; justify-content:space-between; gap:12px; align-items:flex-start;">
              <div>
                <h2 style="margin:0 0 6px 0;">{{ p.name }}</h2>
                <div style="color:#666; line-height:1.6;">{{ p.description }}</div>
              </div>
              <div style="font-weight:800; font-size:20px; white-space:nowrap;">
                ¥{{ priceText }}
              </div>
            </div>

            <div style="margin-top:10px; display:flex; gap:6px; flex-wrap:wrap;">
              <el-tag size="small" type="success">{{ categoryLabel(p.category) }}</el-tag>
              <el-tag v-for="t in p.tags" :key="t" size="small">{{ t }}</el-tag>
            </div>

            <div style="margin-top:10px; display:flex; gap:6px; flex-wrap:wrap;">
              <el-tag v-for="m in p.markets" :key="m" size="small" type="info">
                {{ m }}
              </el-tag>
            </div>

            <div style="margin-top:14px; display:flex; gap:10px; flex-wrap:wrap;">
              <el-button type="primary" @click="openBuy">虚拟购买</el-button>
              <el-button @click="fav">加入收藏（占位）</el-button>
              <el-button text @click="goList">返回商品列表</el-button>
            </div>

            <el-divider />

            <!-- 亮点 -->
            <div>
              <div style="font-weight:700; margin-bottom:8px;">产品亮点</div>
              <el-row :gutter="10">
                <el-col
                  v-for="(h, idx) in highlights"
                  :key="idx"
                  :xs="24"
                  :sm="12"
                  :md="8"
                >
                  <el-card shadow="never" style="height:100%;">
                    <div style="font-weight:700;">{{ h.title }}</div>
                    <div style="margin-top:6px; color:#666; line-height:1.6;">{{ h.text }}</div>
                  </el-card>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </el-card>

      <!-- 市场适配（加分项） -->
      <el-card shadow="never">
        <div style="display:flex; align-items:center; justify-content:space-between; gap:10px;">
          <div style="font-weight:800;">市场适配说明</div>
          <el-tag type="info">按目标国家偏好组织</el-tag>
        </div>

        <div style="margin-top:10px;">
          <el-row :gutter="10">
            <el-col
              v-for="(m, idx) in marketFit"
              :key="idx"
              :xs="24"
              :sm="12"
              :md="12"
              :lg="6"
            >
              <el-card shadow="never" style="height:100%;">
                <div style="font-weight:700;">{{ m.title }}</div>
                <div style="margin-top:6px; color:#666; line-height:1.6;">
                  {{ m.text }}
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-card>

      <!-- 文化叙事（你们项目灵魂） -->
      <el-card shadow="never">
        <div style="font-weight:800;">{{ cultureTitle }}</div>
        <div style="margin-top:8px; color:#555; line-height:1.8;">
          {{ cultureText }}
        </div>
        <div style="margin-top:12px;">
          <el-tag type="success">中国养生文化站</el-tag>
          <el-tag type="info" style="margin-left:6px;">Tea & Balance</el-tag>
        </div>
      </el-card>

      <!-- 虚拟购买弹窗 -->
      <el-dialog v-model="buyOpen" title="虚拟购买" width="520px">
        <el-form label-width="90px">
          <el-form-item label="商品">
            <el-input :model-value="p.name" disabled />
          </el-form-item>

          <el-form-item label="数量">
            <el-input-number v-model="qty" :min="1" :max="99" />
          </el-form-item>

          <el-form-item label="国家/地区">
            <el-select v-model="shipTo" placeholder="选择目标市场（演示用）" style="width:100%;">
              <el-option label="英国 UK" value="UK" />
              <el-option label="法国 FR" value="FR" />
              <el-option label="德国 DE" value="DE" />
              <el-option label="丹麦 DK" value="DK" />
              <el-option label="塞尔维亚 RS" value="RS" />
            </el-select>
          </el-form-item>

          <el-form-item label="合计">
            <div style="font-weight:800;">
              ¥{{ totalText }}
            </div>
          </el-form-item>
        </el-form>

        <template #footer>
          <el-button @click="buyOpen=false">取消</el-button>
          <el-button type="primary" @click="confirmBuy">确认下单（模拟）</el-button>
        </template>
      </el-dialog>
    </template>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { products } from '../../../mock/products'

const route = useRoute()
const router = useRouter()

const id = computed(() => Number(route.params.id))
const p = computed(() => products.find((x) => Number(x.id) === id.value))

// 详情增强字段：做了 fallback，避免你别的商品没补字段就报错
const heroImage = computed(() => p.value?.hero?.image || '')
const heroAlt = computed(() => p.value?.hero?.alt || p.value?.name || 'product')
const highlights = computed(() => p.value?.highlights || [])
const marketFit = computed(() => p.value?.marketFit || [])
const cultureTitle = computed(() => p.value?.cultureStory?.title || '文化故事')
const cultureText = computed(() => p.value?.cultureStory?.text || '（待补充）')

const priceText = computed(() => {
  const n = Number(p.value?.price)
  return Number.isFinite(n) ? n.toFixed(2) : ''
})

// 虚拟购买
const buyOpen = ref(false)
const qty = ref(1)
const shipTo = ref('DE')

const totalText = computed(() => {
  const price = Number(p.value?.price) || 0
  return (price * qty.value).toFixed(2)
})

function categoryLabel(c) {
  const map = { cup: '茶杯', teabag: '茶包', tea: '茶', accessory: '配件' }
  return map[c] || c
}

function openBuy() {
  qty.value = 1
  shipTo.value = (p.value?.markets?.[0] || 'DE')
  buyOpen.value = true
}

function confirmBuy() {
  buyOpen.value = false
  ElMessage.success(`已模拟下单：${qty.value} 件，目的地 ${shipTo.value}（后续接入真实支付）`)
}

function fav() {
  ElMessage.info('已加入收藏（占位）')
}

function goList() {
  router.push('/products')
}
</script>

<style scoped>
.pd-hero {
  display: grid;
  grid-template-columns: 420px 1fr;
  gap: 14px;
  align-items: start;
}

.pd-hero-img {
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #eee;
  background: #fafafa;
  min-height: 280px;
}

.pd-hero-img img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.pd-hero-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

@media (max-width: 980px) {
  .pd-hero {
    grid-template-columns: 1fr;
  }
  .pd-hero-img {
    min-height: 220px;
  }
}
</style>
