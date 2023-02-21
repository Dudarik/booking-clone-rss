<template>
  <form @submit.prevent>
    <h4>Create comment</h4>
    <my-input v-focus v-model="comments.commentTitle" type="text" placeholder="Title" />
    <my-input v-model="comments.commentBody" type="text" placeholder="Description" />
    <my-button style="align-self: flex-end; margin-top: 15px" @click="createPost">Create</my-button>
  </form>
</template>

<script lang="ts">
export default {
  data() {
    return {
      post: {
        commentTitle: '',
        commentBody: '',
      },
    };
  },
  methods: {
    createPost() {
      this.comments.commentId = Date.now();
      this.$emit('create', this.comments);
      this.post = {
        commentTitle: '',
        commentBody: '',
      };
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
</style>
