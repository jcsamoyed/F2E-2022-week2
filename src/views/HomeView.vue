<template>
  <div class="page">
    <TheStepBar />
    <component :is="currentPage"></component>
  </div>
</template>

<script>
import TheStepBar from '@/components/TheStepBar.vue';
import Step1Page from '@/views/Step1Page.vue';
import Step2Page from '@/views/Step2Page.vue';

export default {
  name: 'HomeView',
  components: {
    TheStepBar,
    Step1Page,
    Step2Page,
  },
  computed: {
    currentStep() {
      return this.$store.state.currentStep;
    },
    currentPage() {
      return `Step${this.currentStep + 1}Page`;
    },
  },
};
</script>
