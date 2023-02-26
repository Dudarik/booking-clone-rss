<template>
  <div>
    <div class="app__btns">
      <MyButton @click="showDialog">Create</MyButton>
    </div>
    <MyDialog v-model:show="dialogVisible">
      <CommentForm @create="createComment" />
    </MyDialog>
    <CommentList :comments="sortedComments" @remove="removeComment" v-if="!isCommentsLoading" />
    <div v-else>Loading...</div>
    <!-- <div v-intersection="loadMoreComments" class="observer"></div> -->
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import CommentForm from '@/components/CommentForm.vue';
import CommentList from '@/components/CommentList.vue';
import MyButton from './UI/MyButton.vue';
import MyDialog from './UI/MyDialog.vue';

export default {
  components: {
    MyButton,
    MyDialog,
    CommentList,
    CommentForm,
  },
  data() {
    return {
      comments: [],
      dialogVisible: false,
      isCommentsLoading: false,
      selectedSort: '',
      page: 1,
      limit: 10,
      totalPages: 0,
    };
  },
  methods: {
    createComment(comment) {
      this.comments.push(comment);
      this.dialogVisible = false;
    },
    removeComment(comment) {
      this.comments = this.comments.filter((p) => p.id !== comment.id);
    },
    showDialog() {
      this.dialogVisible = true;
    },
    async fetchComments() {
      try {
        this.isCommentsLoading = true;
        const response = await axios.get('http://194.58.109.204:3000/api/comments/2', {
          params: {
            _page: this.page,
            _limit: this.limit,
          },
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.comments = response.data.data;
      } catch (e) {
        alert('Ошибка');
      } finally {
        this.isCommentsLoading = false;
      }
    },
    // async loadMoreComments() {
    //   try {
    //     this.page += 1;
    //     const response = await axios.get('http://194.58.109.204:3000/api/comments/2', {
    //       params: {
    //         _page: this.page,
    //         _limit: this.limit
    //       }
    //     });
    //     this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
    //     this.comments = [...this.comments, ...response.data.data];
    //   } catch (e) {
    //     alert('Ошибка')
    //   }
    // }
  },
  mounted() {
    this.fetchComments();
  },
  computed: {
    sortedComments() {
      return [...this.comments].sort((comment1, comment2) =>
        comment1[this.selectedSort]?.localeCompare(comment2[this.selectedSort])
      );
    },
  },
};
</script>

<style scoped lang="scss">
.app__btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}
.page__wrapper {
  display: flex;
  margin-top: 15px;
}
.page {
  border: 1px solid black;
  padding: 10px;
}
.current-page {
  border: 2px solid teal;
}

.observer {
  height: 30px;
  background: green;
}
</style>
