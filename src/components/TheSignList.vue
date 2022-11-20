<template>
  <ul>
    <li v-for="(item, index) in signList" :key="item.src">
      <div class="sign-container" @click="addSign(item)" @keydown.enter="addSign(item)">
        <img :src="item.src" :alt="`簽名檔${index + 1}`" />
      </div>
      <div class="icon-wrap">
        <img
          @click="addSign(item)"
          @keydown.enter="addSign(item)"
          src="@/assets/images/icon/cursor.svg"
          alt="點擊示意 icon"
        />
        <el-dropdown>
          <el-icon><MoreFilled /></el-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click.stop="deleteSign(item)">刪除簽名</el-dropdown-item>
              <el-dropdown-item disabled>重新簽名</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { MoreFilled } from '@element-plus/icons-vue';
</script>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['isMobileDevice', 'signList']),
  },
  methods: {
    addSign(sign) {
      this.eventBus.emit('click-add-sign', sign);
      if (this.isMobileDevice) {
        this.$store.commit('SET_SIDEBAR_VALUE', false);
      }
    },
    deleteSign(sign) {
      const list = this.signList.filter((item) => item.src !== sign.src);
      this.$store.commit('SET_SIGN_LIST', list);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

li {
  position: relative;
  display: flex;
  justify-content: space-between;
  background-color: #ececec;
  border-radius: 5px;
  border-left: solid 14px $primary;
  padding: 8px;
  margin-top: 16px;
  z-index: 0;
  cursor: pointer;
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    border: solid 2px transparent;
    border-left: none;
    border-radius: 0 5px 5px 0;
    box-sizing: border-box;
    transition-duration: 0.2s;
  }
  &:hover {
    &::before {
      border-color: $light;
    }
  }
}
.sign-container {
  width: 100%;
  z-index: 2;
  img {
    width: 100%;
  }
}
.icon-wrap {
  display: flex;
  flex-direction: column;
  row-gap: 24px;
  justify-content: space-between;
  align-items: flex-end;
  img {
    z-index: 2;
  }
}
.el-icon {
  transform: rotate(90deg);
  transition-duration: 0.2s;
  &:hover {
    color: $light;
  }
}
</style>
