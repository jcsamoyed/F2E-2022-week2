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
      workerSrc: 'https://mozilla.github.io/pdf.js/build/pdf.worker.js',
      pdfjsLib: {},
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
    pdfInit() {
      const s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = 'https://mozilla.github.io/pdf.js/build/pdf.js';
      document.body.appendChild(s);
    },
    renderPdf() {
      setTimeout(() => {
        const { canvas } = this.$refs;
        const ctx = canvas.getContext('2d');
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = this.workerSrc;
        window.pdfjsLib.getDocument(this.originalFile).promise.then((doc) => {
          // 抓取第一頁
          doc.getPage(1).then((page) => {
            // 設定 PDF 內容的顯示比例
            const viewport = page.getViewport({ scale: 1.5 });
            // 設定 canvas 的大小與 PDF 相等
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            // 實際渲染 PDF
            page.render({
              canvasContext: ctx,
              viewport,
            });
            this.$store.commit('SET_SIDEBAR_VALUE', true);
            this.$store.commit('SET_LOADING_VALUE', false);
          });
        });
      }, 1000);
    },
  },
  created() {
    this.pdfInit();
  },
  mounted() {
    this.renderPdf();
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
