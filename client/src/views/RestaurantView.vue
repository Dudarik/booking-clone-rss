<template>
  <HeaderTemplate />
  <main>
    <div>
      <input type="text" class="datepicker" />
      <input type="text" class="timepicker" />
    </div>
    <CommentsView />
  </main>
  <FooterTemplate />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HeaderTemplate from '@/components/HeaderTemplate.vue';
import FooterTemplate from '@/components/FooterTemplate.vue';
import CommentsView from '@/components/CommentsView.vue';

export default defineComponent({
  name: 'RestaurantView',
  components: {
    HeaderTemplate,
    FooterTemplate,
    CommentsView,
  },
});
</script>
