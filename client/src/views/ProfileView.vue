<template>
  <HeaderTemplate />
  <h3>Profile</h3>
  <FooterTemplate />
</template>

<script lang="ts">
import service from '../api';
import HeaderTemplate from '@/components/HeaderTemplate.vue';
import FooterTemplate from '@/components/FooterTemplate.vue';

export default {
  name: 'AuthView',
  components: {
    HeaderTemplate,
    FooterTemplate,
  },
};
</script>

<style scoped lang="scss">
:root.dark-theme {
  background-color: black;
  color: white;
}
</style>
