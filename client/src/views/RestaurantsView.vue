<template>
  <HeaderTemplate />
  <main>
    <div class="section-div d-flex mt-1 mb-2" id="hotels-view">
      <div class="hot-list-container">
        <RestsList class="mt-1" :restaurants="restaurants" @loaded="this.isLoadedList = true" />
      </div>
    </div>
  </main>
  <FooterTemplate />
</template>

<script lang="ts">
import service from '@/api';
import { defineComponent } from 'vue';
import HeaderTemplate from '@/components/HeaderTemplate.vue';
import FooterTemplate from '@/components/FooterTemplate.vue';
// import RestsList from '@/components/RestsList.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    HeaderTemplate,
    FooterTemplate,
    // RestsList,
  },
  computed: {
    // restaurantsLength() {
    //   return this.restaurants.length;
    // },
  },
  mounted() {
    this.getRestaurants();
  },
  data() {
    return {
      restaurants: [],
    };
  },
  methods: {
    async getRestaurants() {
      // let res = await service.getRestaurants(rid, title, address);
      // this.restaurants = res.data;
    },
  },
});
</script>
