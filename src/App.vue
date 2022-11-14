<template>
  <div class="common-layout">
    <el-container>
      <el-header height="auto">
        <router-link to="/" class="login-btn">
          <el-icon size="24" color="#fff"><UserFilled /></el-icon>
          <span>會員登入</span>
        </router-link>
        <router-link to="/">
          <img src="@/assets/images/common/logo.svg" class="logo" alt="Master Sign logo" />
        </router-link>
        <el-icon size="24" color="#fff" class="hamburger">
          <Fold v-if="true" />
          <Expand v-else />
        </el-icon>
      </el-header>
      <el-container>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { UserFilled, Expand, Fold } from '@element-plus/icons-vue';
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC&display=swap');

#app {
  font-family: 'Noto Sans TC', sans-serif;
  -webkit-font-smoothing: antialiased;
}
</style>
