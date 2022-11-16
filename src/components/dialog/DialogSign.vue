<template>
  <el-dialog title="建立簽名檔" center>
    <div class="sign-block">
      <p>請在下列範圍內，手動輸入繪製簽名</p>
      <div class="canvas-container">
        <div class="option-bar">
          <div class="color-wrap">
            <div
              v-for="item in palette"
              :key="item"
              class="color"
              :style="{ backgroundColor: item }"
            ></div>
          </div>
          <el-button type="primary" plain size="small">清除</el-button>
        </div>
        <canvas ref="canvas"></canvas>
      </div>
    </div>
    <template #footer>
      <el-button @click="handleCancel">取消</el-button>
      <el-button @click="handleDone" type="primary">建立簽名</el-button>
    </template>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      palette: ['#E30000', '#000000', '#2202EA', '#00BA13'],
    };
  },
  methods: {
    handleCancel() {
      this.$emit('closeDialog');
    },
    handleDone() {
      this.$emit('closeDialog');
    },
  },
};
</script>

<style lang="scss" scoped>
p {
  text-align: center;
  margin-bottom: 16px;
}
.canvas-container {
  background-color: #f1f1f1;
  border-radius: 10px;
}
.option-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  margin-left: 36px;
  margin-right: 20px;
}
.color-wrap {
  display: flex;
  column-gap: 16px;
}
.color {
  width: 15px;
  height: 15px;
  border-radius: 100%;
  cursor: pointer;
  transition-duration: 0.2s;
  &:hover {
    opacity: 0.6;
  }
}
canvas {
  width: 100%;
}
</style>
