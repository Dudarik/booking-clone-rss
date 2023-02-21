<template>
  <div class="restaurant">
      <img class="restaurant__image" :src="restaurants.image" />
      <span class="restaurant__title">{{ restaurants.title }}</span>
      <div class="restaurant__info">
        <div class="restaurant__info-tables"></div>
      <button class="btn cart-btn product-card__cart-btn" :class="busyTablesClass" @click="tableClick">
        <i v-if="!/*in busyTables*/" class="color-tables"></i>
        <i v-else class="nocolor-tables"></i>
      </button>
      </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  table;
}>();
const { toggleTable } = use(props.table);

const busyTablesClass = computed(() => {
  if (/*in busyTables*/) return 'busy-tables';
  else return '';
});
function tableClick(e: Event) {
  e.preventDefault();
  toggleTable();
}
</script>
