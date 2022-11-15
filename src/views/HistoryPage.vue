<template>
  <section class="history">
    <div class="container">
      <img src="@/assets/images/history/empty.svg" alt="空值" />
      <p>沒有文件喔～快上傳簽署文件，進行文件管理吧！</p>
      <el-button @click="goCreateContract" type="primary" size="large">立即建立新合約</el-button>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    goCreateContract() {
      this.$router.push('/');
    },
  },
  created() {
    this.$store.commit('SET_SIDEBAR_VALUE', false);
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

.history {
  display: flex;
  align-items: center;
  height: calc(100vh - 66.13px - 60px);
  background-color: #fff;
  margin: 30px 24px;
}
.container {
  width: 80%;
  max-width: 466px;
  text-align: center;
  margin: 0 auto;
}
img {
  width: 100%;
  margin-bottom: 50px;
}
p {
  font-size: 14px;
  color: $dark;
  margin-bottom: 100px;
}
.el-button {
  max-width: 304px;
}
</style>
