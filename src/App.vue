<template>
  <div class="common-layout">
    <el-container>
      <el-header height="auto">
        <router-link to="/" class="login-btn">
          <el-icon size="24" color="#fff"><UserFilled /></el-icon>
        </router-link>
        <router-link to="/">
          <img src="@/assets/images/common/logo.svg" class="logo" alt="Master Sign logo" />
        </router-link>
        <el-icon @click="toggleHamburger" size="24" color="#fff" class="hamburger">
          <Fold v-if="!isSidebarOpen" />
          <Expand v-else />
        </el-icon>
      </el-header>
      <el-container>
        <el-main>
          <router-view />
        </el-main>
        <el-aside width="300px" :class="{ open: isSidebarOpen }">
          <ul>
            <li>
              <span class="list-text">您的簽名</span>
              <div class="btn-wrap">
                <el-button type="primary">新增</el-button>
              </div>
            </li>
            <li>
              <span class="list-text">上傳圖片</span>
              <div class="btn-wrap">
                <el-badge value="pro" class="item" type="warning">
                  <el-button type="primary">新增</el-button>
                </el-badge>
              </div>
            </li>
            <li>
              <span class="list-text">新增日期</span>
              <div class="btn-wrap">
                <el-badge value="pro" class="item" type="warning">
                  <el-button type="primary">新增</el-button>
                </el-badge>
              </div>
            </li>
          </ul>
          <router-link :to="pageBtnUrl" class="page-wrap">
            <el-button type="primary" plain>{{ pageBtnText }}</el-button>
          </router-link>
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { UserFilled, Expand, Fold } from '@element-plus/icons-vue';
</script>

<script>
export default {
  computed: {
    isSidebarOpen() {
      return this.$store.state.isSidebarOpen;
    },
    path() {
      return this.$route.path;
    },
    pageBtnUrl() {
      if (this.path === '/') {
        return '/history';
      }
      return '/';
    },
    pageBtnText() {
      if (this.path === '/') {
        return '文件紀錄';
      }
      return '建立合約';
    },
  },
  methods: {
    toggleHamburger() {
      this.$store.commit('SET_SIDEBAR_VALUE', !this.isSidebarOpen);
    },
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@500;700&display=swap');

#app {
  font-family: 'Noto Sans TC', sans-serif;
  -webkit-font-smoothing: antialiased;
}
</style>
