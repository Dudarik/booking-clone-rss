<template>
  <a class="a github-link" :href="githubInfo.html_url">
    <img class="github-link__img" :src="`${githubInfo.avatar_url}&size=50`" />
  </a>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { defineProps } from 'vue';

const props = defineProps<{
  name: string;
}>();

type GithubInfo = {
  avatar_url: string;
  html_url: string;
};

const githubInfo: Ref<GithubInfo> = ref({ avatar_url: '', html_url: '' });
fetch(`https://api.github.com/users/${props.name}`)
  .then((response) => response.json())
  .then((json: GithubInfo) => (githubInfo.value = json));
</script>

<style lang="scss" scoped>
.github-link {
  display: inline;
  // justify-content: center;
  // align-items: center;
  padding: 5px;
  margin-left: 10px;
  &__img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  &:hover {
    .github-link__img {
      scale: 1.2;
    }
  }
}
</style>
