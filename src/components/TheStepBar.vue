<template>
  <nav>
    <el-steps :active="1" align-center finish-status="success">
      <el-step title="上傳文件" />
      <el-step title="簽核文件" />
      <el-step title="下載檔案" />
    </el-steps>
  </nav>
</template>

<script>
export default {
  name: 'TheStepBar',
};
</script>

<style scoped lang="scss">
$primary: #aece43;
$dark: #1c4f52;

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
    color: $primary;
  }
  .el-step__icon {
    border-color: $primary;
    background-color: $dark;
  }
  .el-step__title {
    color: $primary;
  }
  // 已完成
  .is-success {
    .el-step__line {
      background-color: $primary;
    }
    .el-step__line-inner {
      border-color: $primary;
    }
  }
  // 進行中
  .is-process {
    &.el-step__title {
      font-weight: 700;
    }
    .el-step__icon {
      background-color: $primary;
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
