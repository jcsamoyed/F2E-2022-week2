<template>
  <el-dialog title="請確認檔案名稱" center>
    <p>確認完成後，檔案將進行下載後輸出PDF</p>
    <el-input v-model="fileNameEdit" placeholder="請輸入檔案名稱" clearable />
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
  data() {
    return {
      fileNameEdit: `${this.originFileName}`,
    };
  },
  props: {
    originFileName: String,
  },
  methods: {
    handleCancel() {
      this.$emit('closeDialog');
    },
    handleConfirm() {
      this.$message('文件處理中');
      this.$store.commit('SET_FILE_NAME', this.fileNameEdit);
      this.$emit('closeDialog');
      this.eventBus.emit('confirm-file-name');
    },
  },
};
</script>

<style lang="scss" scoped>
p {
  text-align: center;
  margin-bottom: 30px;
}
</style>
