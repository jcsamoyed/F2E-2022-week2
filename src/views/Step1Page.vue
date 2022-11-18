<template>
  <section class="step1">
    <div class="container">
      <h1>建立合約</h1>
      <p class="subtitle">請先上傳一份文件(PDF)</p>
      <el-upload
        v-loading="isLoading"
        element-loading-text="Loading..."
        class="upload-wrap"
        drag
        :limit="1"
        :show-file-list="true"
        :on-change="handleChangeUpload"
        :before-upload="beforeUpload"
        :http-request="afterUpload"
      >
        <div class="upload-container">
          <el-button type="primary" size="large">上傳文件 PDF</el-button>
          <p class="note">
            *或拖曳檔案在此處。<br />
            *檔案大小不得超過10MB。
          </p>
        </div>
      </el-upload>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TheStep1',
  computed: {
    currentStep() {
      return this.$store.state.currentStep;
    },
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
  methods: {
    handleChangeUpload() {
      this.$store.commit('SET_LOADING_VALUE', true);
    },
    beforeUpload(file) {
      const isPDF = file.type === 'application/pdf';
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isPDF) {
        this.$message.error('檔案格式不符合');
        this.isUploading = false;
        return false;
      }
      if (!isLt10M) {
        this.$message.error('檔案容量超過限制');
        this.isUploading = false;
        return false;
      }
      this.$store.commit('SET_ORIGINAL_FILE', file);
      this.$store.commit('SET_CURRENT_STEP', this.currentStep + 1);
      return isPDF && isLt10M;
    },
    afterUpload() {
      this.$message.success('上傳成功');
    },
  },
  created() {
    this.$store.commit('SET_SIDEBAR_VALUE', false);
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

.step1 {
  display: flex;
  align-items: center;
  height: calc(100vh - 66.13px - 89px - 60px);
  background-color: #fff;
  margin: 30px 24px;
}
.container {
  width: 90%;
  max-width: 950px;
  text-align: center;
  margin: 0 auto;
}
h1 {
  font-size: 40px;
  color: $dark;
  margin-bottom: 24px;
}
.subtitle {
  font-size: 20px;
  color: $dark;
  margin-bottom: 90px;
}
.upload-wrap {
  width: 100%;
}
.upload-container {
  width: 304px;
  padding: 40px 0;
  margin: 0 auto;
}
.note {
  font-size: 14px;
  line-height: 1.5;
  color: $dark;
  margin-top: 32px;
}
</style>
