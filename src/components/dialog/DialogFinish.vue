<template>
  <el-dialog title="簽核完成" center>
    <img src="@/assets/images/common/file.svg" alt="簽核完成" />
    <p>您可以留在本頁繼續編輯此份文件，<br />或建立新合約</p>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">繼續編輯</el-button>
        <el-button type="primary" @click="handleConfirm">建立新合約</el-button>
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
  line-height: 1.5;
  margin-top: 35px;
}
img {
  display: block;
  width: 120px;
  margin: 0 auto;
}
</style>
