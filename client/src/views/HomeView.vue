<template>
  <HeaderTemplate />
  <main>
    <kinesis-container class="container">
      <kinesis-element class="parallax-bg">
        <div class="parallax-bg" :strength="50" type="depth"></div>
      </kinesis-element>
    </kinesis-container>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, et rerum cupiditate consectetur aliquid
      repellendus mollitia est. Amet, nemo fugiat?
    </p>
  </main>
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

<style scoped lang="scss">
.container {
  position: relative;
  text-align: center;
  height: 447px;
  background: rgb(255, 246, 246);
  background-size: cover;
  background-position: center;
  .parallax-bg {
    position: absolute;
    height: 447px;
    width: 573px;
    background-image: url('../assets/macaroon.svg');
    background-repeat: no-repeat;
  }
}
</style>
