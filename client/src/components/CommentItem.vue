<template>
  <div class="comment">
    <div>
      <div>{{ comment.username }}</div>
      <div><strong>Title:</strong> {{ comment.title }}</div>
      <div><strong>Description:</strong> {{ comment.body }}</div>
    </div>
    <div class="comment__btns">
      <my-button @click="$emit('remove', comment)">Delete</my-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'CommentItem',
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
.comment {
  padding: 15px;
  border: 2px solid teal;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.comment__btns {
  display: flex;
}
</style>
