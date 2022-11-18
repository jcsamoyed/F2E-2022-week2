<template>
  <section class="step2" v-loading="isLoading">
    <canvas ref="canvas"></canvas>
  </section>
</template>

<script>
export default {
  name: 'TheStep2',
  data() {
    return {
      canvas: null,
      ctx: null,
      workerSrc: 'https://mozilla.github.io/pdf.js/build/pdf.worker.js',
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
    originalFile() {
      return this.$store.state.originalFile;
    },
  },
  methods: {
    initCanvas() {
      this.$nextTick(() => {
        this.canvas = this.$refs.canvas;
        this.ctx = this.canvas.getContext('2d');
      });
    },
    async renderPdf(data) {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = this.workerSrc;
      const pdfDoc = await window.pdfjsLib.getDocument(data).promise;
      // 抓取第一頁
      const pdfPage = await pdfDoc.getPage(1);
      // 設定 PDF 內容的顯示比例
      const viewport = pdfPage.getViewport({ scale: 1.5 });
      // 設定 canvas 的大小與 PDF 相等
      this.canvas.width = viewport.width;
      this.canvas.height = viewport.height;
      // 實際渲染 PDF
      pdfPage.render({
        canvasContext: this.ctx,
        viewport,
      });
      this.$store.commit('SET_SIDEBAR_VALUE', true);
      this.$store.commit('SET_LOADING_VALUE', false);
    },
  },
  mounted() {
    this.initCanvas();
    this.renderPdf(this.originalFile);
  },
};
</script>

<style lang="scss" scoped>
.step2 {
  margin: 30px 24px;
}
canvas {
  display: block;
  margin: 0 auto;
}
</style>
