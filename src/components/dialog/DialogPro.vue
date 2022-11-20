<template>
  <el-dialog class="custom-dialog" title="提示訊息" center>
    <p>請升級pro會員後解鎖使用進階功能！</p>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="handleConfirm">確定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  methods: {
    handleConfirm() {
      this.$emit('closeDialog');
    },
  },
};
</script>

<style lang="scss" scoped>
p {
  text-align: center;
}
</style>
