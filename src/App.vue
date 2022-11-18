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
              <div class="flex-container">
                <span class="list-text">您的簽名</span>
                <div class="btn-wrap">
                  <el-button
                    @click="isShowDialogSign = !isShowDialogSign"
                    type="primary"
                    :disabled="signList.length >= 2"
                    >{{ createBtnText }}</el-button
                  >
                </div>
              </div>
              <TheSignList />
            </li>
            <li>
              <div class="flex-container">
                <span class="list-text">上傳圖片</span>
                <div class="btn-wrap">
                  <el-badge value="pro" class="item" type="warning">
                    <el-button @click="isShowDialogPro = true" type="primary">新增</el-button>
                  </el-badge>
                </div>
              </div>
            </li>
            <li>
              <div class="flex-container">
                <span class="list-text">新增日期</span>
                <div class="btn-wrap">
                  <el-badge value="pro" class="item" type="warning">
                    <el-button @click="isShowDialogPro = true" type="primary">新增</el-button>
                  </el-badge>
                </div>
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
  <DialogSign
    v-model="isShowDialogSign"
    :isShowDialogSign="isShowDialogSign"
    @closeDialog="isShowDialogSign = false"
  />
  <DialogPro v-model="isShowDialogPro" @closeDialog="isShowDialogPro = false" />
</template>

<script setup>
import { UserFilled, Expand, Fold } from '@element-plus/icons-vue';
</script>

<script>
import DialogSign from '@/components/dialog/DialogSign.vue';
import DialogPro from '@/components/dialog/DialogPro.vue';
import TheSignList from '@/components/TheSignList.vue';

export default {
  components: {
    DialogSign,
    DialogPro,
    TheSignList,
  },
  data() {
    return {
      isShowDialogSign: false,
      isShowDialogPro: false,
    };
  },
  computed: {
    isSidebarOpen() {
      return this.$store.state.isSidebarOpen;
    },
    signList() {
      return this.$store.state.signList;
    },
    path() {
      return this.$route.path;
    },
    createBtnText() {
      if (this.signList.length >= 2) {
        return '簽名額度已滿';
      }
      return '新增';
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
