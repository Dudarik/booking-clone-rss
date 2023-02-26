<template>
  <form @submit.prevent>
    <input v-focus v-model="comment.title" type="text" placeholder="Название" />
    <input v-model="comment.body" type="text" placeholder="Описание" />
    <MyButton style="align-self: flex-end; margin-top: 15px" @click="createComment">Create</MyButton>
  </form>
</template>

<script lang="ts">
import MyButton from './UI/MyButton.vue';

export default {
  components: {
    MyButton,
  },
  data() {
    return {
      comment: {
        id: '',
        username: '',
        title: '',
        body: '',
      },
    };
  },
  methods: {
    createComment() {
      this.comment.id = Date.now().toString();
      this.$emit('create', this.comment);
      this.comment = {
        id: '',
        username: '',
        title: '',
        body: '',
      };
    },
  },
};
</script>

<style scoped lang="scss">
form {
  display: flex;
  flex-direction: column;
}
</style>
