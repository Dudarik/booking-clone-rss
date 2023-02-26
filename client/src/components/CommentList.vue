<template>
  <div v-if="comments.length > 0">
    <h3>Comments</h3>
    <transition-group name="user-list">
      <CommentItem
        v-for="comment in comments"
        :comment="comment"
        :key="comment.id"
        @remove="$emit('remove', comment)"
      />
    </transition-group>
  </div>
  <h2 v-else style="color: red">No comments</h2>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CommentItem from './CommentItem.vue';

export default defineComponent({
  name: 'CommentList',
  components: {
    CommentItem,
  },
  props: {
    comments: {
      type: Array,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
.user-list-item {
  display: inline-block;
  margin-right: 10px;
}
.user-list-enter-active,
.user-list-leave-active {
  transition: all 0.4s ease;
}
.user-list-enter-from,
.user-list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}
.user-list-move {
  transition: transform 0.4s ease;
}
</style>
