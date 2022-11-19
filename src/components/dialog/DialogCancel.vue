<template>
  <el-dialog title="提示訊息" center>
    <p>確定放棄編輯文件？確定後文件將無法再次編輯。</p>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleConfirm">確定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  methods: {
    handleCancel() {
      this.$emit('closeDialog');
    },
    handleConfirm() {
      this.$store.commit('SET_ORIGINAL_FILE', {});
      this.$store.commit('SET_CURRENT_STEP', 0);
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
