<template>
  <HeaderTemplate />
  <main></main>
  <FooterTemplate />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HeaderTemplate from '@/components/HeaderTemplate.vue';
import FooterTemplate from '@/components/FooterTemplate.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    HeaderTemplate,
    FooterTemplate,
  },
});
</script>
