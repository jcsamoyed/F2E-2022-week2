<template>
  <nav>
    <el-steps :active="currentStep" align-center finish-status="success">
      <el-step title="上傳文件" />
      <el-step title="簽核文件" />
      <el-step title="下載檔案" />
    </el-steps>
  </nav>
</template>

<script>
export default {
  name: 'TheStepBar',
  computed: {
    currentStep() {
      return this.$store.state.currentStep;
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/variables';

nav {
  background-color: $dark;
  padding: 16px;
}
::v-deep {
  .el-step__line {
    background-color: #fff;
  }
  .el-step__title {
    font-size: 14px;
  }
  .el-step__icon-inner {
    color: $light;
  }
  .el-step__icon {
    border-color: $light;
    background-color: $dark;
  }
  .el-step__title {
    color: $light;
  }
  // 已完成
  .is-success {
    .el-step__line {
      background-color: $light;
    }
    .el-step__line-inner {
      border-color: $light;
    }
  }
  // 進行中
  .is-process {
    &.el-step__title {
      font-weight: 700;
    }
    .el-step__icon {
      background-color: $light;
    }
    .el-step__icon-inner {
      color: $dark;
    }
  }
  // 未完成
  .is-wait {
    &.el-step__title {
      color: #fff;
    }
    .el-step__icon {
      border-color: #fff;
      background-color: $dark;
    }
    .el-step__icon-inner {
      color: #fff;
    }
  }
}
</style>
