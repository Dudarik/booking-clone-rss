<template>
  <div class="comment">
    <div>
      <div>{{ comments.commentId }}</div>
      <div><strong>Title:</strong> {{ comments.commentTitle }}</div>
      <div><strong>Description:</strong> {{ comments.commentBody }}</div>
    </div>
    <div class="comment__btn">
      <my-button @click="$emit('remove', comments)">Удалить</my-button>
    </div>
  </div>
</template>

<script lang="ts">
// const props = defineProps<{
//   comments: {
//     type: Object;
//   };
// }>();
export default {
  props: {
    comments: {
      type: Object,
      required: false,
    },
  },
};
</script>

<style scoped>
.comment {
  padding: 15px;
  border: 2px solid teal;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.comment__btn {
  display: flex;
}
</style>
