<template>
  <div class="common-layout">
    <el-container>
      <el-header height="auto">
        <router-link to="/" class="login-btn">
          <el-icon size="24" color="#fff"><UserFilled /></el-icon>
        </router-link>
        <router-link to="/">
          <img src="@/assets/images/common/logo.svg" class="logo" alt="Master Sign logo" />
          <span class="title">{{ $route.meta.title }}</span>
        </router-link>
        <div class="download-and-hamburger">
          <div v-if="currentStep" class="download-wrap">
            <el-button @click="isShowDialogCancel = true" type="primary" plain>取消</el-button>
            <el-button @click="handleDownload" type="primary">下載</el-button>
          </div>
          <el-icon @click="toggleHamburger" size="24" color="#fff" class="hamburger">
            <Fold v-if="!isSidebarOpen" />
            <Expand v-else />
          </el-icon>
        </div>
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
    <el-icon v-if="currentStep" @click="handleDownload" color="#fff" size="54" class="icon-download"
      ><Download
    /></el-icon>
  </div>
  <DialogSign
    v-model="isShowDialogSign"
    :isShowDialogSign="isShowDialogSign"
    @closeDialog="isShowDialogSign = false"
  />
  <DialogPro v-model="isShowDialogPro" @closeDialog="isShowDialogPro = false" />
  <DialogCancel v-model="isShowDialogCancel" @closeDialog="isShowDialogCancel = false" />
</template>

<script setup>
// eslint-disable-next-line
import { UserFilled, Expand, Fold, Download } from '@element-plus/icons-vue';
</script>

<script>
import { mapState } from 'vuex';
import DialogSign from '@/components/dialog/DialogSign.vue';
import DialogPro from '@/components/dialog/DialogPro.vue';
import DialogCancel from '@/components/dialog/DialogCancel.vue';
import TheSignList from '@/components/TheSignList.vue';

export default {
  components: {
    DialogSign,
    DialogPro,
    DialogCancel,
    TheSignList,
  },
  data() {
    return {
      isShowDialogSign: false,
      isShowDialogPro: false,
      isShowDialogCancel: false,
    };
  },
  computed: {
    ...mapState(['isSidebarOpen', 'currentStep', 'signList']),
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
    handleCancel() {
      this.isShowDialogCancel = true;
    },
    handleDownload() {
      this.eventBus.emit('click-download');
    },
  },
  created() {
    this.$store.dispatch('checkIsMobileDevice');
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@500;700&display=swap');
@import '@/assets/scss/variables';

#app {
  font-family: 'Noto Sans TC', sans-serif;
  -webkit-font-smoothing: antialiased;
}
.icon-download {
  display: none;
  position: fixed;
  bottom: 20px;
  right: 22px;
  background-color: $primary;
  padding: 12px;
  border-radius: 100%;
  box-sizing: border-box;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
}

@media screen and (max-width: 640px) {
  .icon-download {
    display: inline-flex;
  }
}
</style>
