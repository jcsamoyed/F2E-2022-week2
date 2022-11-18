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
      Base64Prefix: 'data:application/pdf;base64,',
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
    // 使用原生 FileReader 轉檔
    readBlob(blob) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => resolve(reader.result));
        reader.addEventListener('error', reject);
        reader.readAsDataURL(blob);
      });
    },
    async printPDF(pdfData) {
      // 將檔案處理成 base64
      const pdfDataFormat = await this.readBlob(pdfData);

      // 將 base64 中的前綴刪去，並進行解碼
      const data = atob(pdfDataFormat.substring(this.Base64Prefix.length));

      // 利用解碼的檔案，載入 PDF 檔及第一頁
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = this.workerSrc;
      const pdfDoc = await window.pdfjsLib.getDocument({ data }).promise;
      const pdfPage = await pdfDoc.getPage(1);

      // 設定尺寸及產生 canvas
      const viewport = pdfPage.getViewport({ scale: window.devicePixelRatio });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      // 設定 PDF 所要顯示的寬高及渲染
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      const renderContext = {
        canvasContext: context,
        viewport,
      };
      const renderTask = pdfPage.render(renderContext);

      // 回傳做好的 PDF canvas
      return renderTask.promise.then(() => canvas);
    },
    async pdfToImage(pdfData) {
      // 設定 PDF 轉為圖片時的比例
      const scale = 1 / window.devicePixelRatio;

      // 回傳圖片
      return new window.fabric.Image(pdfData, {
        id: 'renderPDF',
        scaleX: scale,
        scaleY: scale,
      });
    },
    async setPdfToBackground(file) {
      // 此處 canvas 套用 fabric.js
      const canvas = new window.fabric.Canvas(this.$refs.canvas);

      canvas.requestRenderAll();
      const pdfData = await this.printPDF(file);
      const pdfImage = await this.pdfToImage(pdfData);

      // 透過比例設定 canvas 尺寸
      canvas.setWidth(pdfImage.width / window.devicePixelRatio);
      canvas.setHeight(pdfImage.height / window.devicePixelRatio);

      // 將 PDF 畫面設定為背景
      canvas.setBackgroundImage(pdfImage, canvas.renderAll.bind(canvas));
      this.$store.commit('SET_SIDEBAR_VALUE', true);
      this.$store.commit('SET_LOADING_VALUE', false);
    },
  },
  mounted() {
    this.initCanvas();
    this.setPdfToBackground(this.originalFile);
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
