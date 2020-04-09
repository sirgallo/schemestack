<template>
  <div class="analyze">
    <br><br>
    <Schema/>
  </div>
</template>

<script>
// @ is an alias to /src
import Schema from '@/components/Schema.vue';

export default {
  name: 'Analyze',
  components: {
    Schema,
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
