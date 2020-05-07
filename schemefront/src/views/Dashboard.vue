<template>
  <div class="dashboard">
    <br><br>
    <Query/>
    <br>
    <Chart/>
  </div>
</template>

<script>
// @ is an alias to /src
import Chart from '@/components/Chart.vue';
import Query from '@/components/Query.vue';

export default {
  name: 'Dashboard',
  components: {
    Chart,
    Query,
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
