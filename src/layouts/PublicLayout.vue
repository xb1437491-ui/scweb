<template>
  <el-container style="min-height: 100vh;">
    <el-header style="display:flex; align-items:center; gap:16px;">
      <div style="font-weight:700;">PLATFORM</div>

      <el-menu mode="horizontal" :default-active="active" @select="onSelect" style="flex:1;">
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/products">商品</el-menu-item>
        <el-menu-item index="/news">咨询</el-menu-item>
        <el-menu-item index="/papers">文献</el-menu-item>
        <el-menu-item index="/videos">纪录片</el-menu-item>
        <el-menu-item index="/stats">销量统计</el-menu-item>
        <el-menu-item index="/support">客服</el-menu-item>
      </el-menu>

      <el-button text @click="go('/login')">登录</el-button>
      <el-button type="primary" @click="go('/register')">注册</el-button>
    </el-header>

    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const active = computed(() => route.path)

function onSelect(index) {
  router.push(index)
}
function go(path) {
  router.push(path)
}
</script>
