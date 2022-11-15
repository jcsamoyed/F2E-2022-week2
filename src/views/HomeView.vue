<template>
  <div class="page">
    <TheStepBar />
    <router-view />
  </div>
</template>

<script>
import TheStepBar from '@/components/TheStepBar.vue';

export default {
  name: 'HomeView',
  components: {
    TheStepBar,
  },
};
</script>
