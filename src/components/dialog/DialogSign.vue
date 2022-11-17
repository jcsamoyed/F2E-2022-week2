<template>
  <el-dialog title="建立簽名檔" center>
    <div class="sign-block">
      <p>請在下列範圍內，手動輸入繪製簽名</p>
      <div ref="container" class="canvas-container">
        <div class="option-bar">
          <div class="color-wrap">
            <button
              v-for="item in palette"
              @click="setStrokeColor(item)"
              :key="item"
              class="color"
              :style="{ backgroundColor: item }"
            ></button>
          </div>
          <el-button @click="reset" type="primary" plain size="small">清除</el-button>
        </div>
        <canvas
          ref="canvas"
          height="250"
          @mousedown="startPosition"
          @mouseup="finishedPosition"
          @mouseleave="finishedPosition"
          @focusout="finishedPosition"
          @mousemove="draw"
        ></canvas>
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
      canvas: null,
      ctx: null,
      isPainting: false,
    };
  },
  computed: {
    signList() {
      return this.$store.state.signList;
    },
  },
  methods: {
    initCanvas() {
      this.$nextTick(() => {
        this.canvas = this.$refs.canvas;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.imageSmoothingEnabled = false;
        const { container } = this.$refs;
        this.canvas.width = container.clientWidth;

        // 設定線條的相關數值
        this.ctx.lineWidth = 1;
        this.ctx.lineCap = 'round';
      });
    },
    // 取得滑鼠 / 手指在畫布上的位置
    getPaintPosition(e) {
      const canvasSize = this.canvas.getBoundingClientRect();
      if (e.type === 'mousemove') {
        return {
          x: e.clientX - canvasSize.left,
          y: e.clientY - canvasSize.top,
        };
      }
      return {
        x: e.touches[0].clientX - canvasSize.left,
        y: e.touches[0].clientY - canvasSize.top,
      };
    },
    // 開始繪圖時，將狀態開啟
    startPosition(e) {
      e.preventDefault();
      this.isPainting = true;
    },
    // 結束繪圖時，將狀態關閉，並產生新路徑
    finishedPosition() {
      this.isPainting = false;
      this.ctx.beginPath();
    },
    // 繪圖過程
    draw(e) {
      // 滑鼠移動過程中，若非繪圖狀態，則跳出
      if (!this.isPainting) return;

      // 取得滑鼠 / 手指在畫布上的 x, y 軸位置位置
      const paintPosition = this.getPaintPosition(e);

      // 移動滑鼠位置並產生圖案
      this.ctx.lineTo(paintPosition.x, paintPosition.y);
      this.ctx.stroke();
    },
    // 重新設定畫布
    reset() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    // 畫筆顏色
    setStrokeColor(color) {
      this.ctx.strokeStyle = color;
    },
    // 取消
    handleCancel() {
      this.reset();
      this.$emit('closeDialog');
    },
    // 建立簽名
    handleDone() {
      // 將簽名存成 base64 png 格式
      const newImg = this.canvas.toDataURL('image/png');
      const signListCopy = [...this.signList];
      signListCopy.push({ src: newImg });
      this.$store.commit('SET_SIGN_LIST', signListCopy);
      this.$emit('closeDialog');
      this.reset();
    },
  },
  mounted() {
    this.initCanvas();
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
  border: none;
  border-radius: 100%;
  cursor: pointer;
  transition-duration: 0.2s;
  &:hover {
    opacity: 0.6;
  }
}
</style>
