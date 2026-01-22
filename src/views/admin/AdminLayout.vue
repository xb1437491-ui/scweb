<template>
  <el-container style="min-height:100vh;">
    <el-aside width="220px" style="border-right:1px solid #eee;">
      <div style="padding:16px; font-weight:700;">后台管理</div>
      <el-menu :default-active="active" @select="onSelect">
        <el-menu-item index="/admin">仪表盘</el-menu-item>
        <el-menu-item index="/admin/products">商品</el-menu-item>
        <el-menu-item index="/admin/news">咨询</el-menu-item>
        <el-menu-item index="/admin/papers">文献</el-menu-item>
        <el-menu-item index="/admin/videos">纪录片</el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="display:flex; align-items:center; justify-content:space-between;">
        <div>Admin</div>
        <el-button text @click="go('/')">返回前台</el-button>
      </el-header>

      <el-main>
        <router-view />
      </el-main>
    </el-container>
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
