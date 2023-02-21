<template>
  <footer class="page-footer">
    <div class="container">
      <div class="row">
        <div class="col l6 s12">
          <h5 class="white-text">Footer Content</h5>
          <p class="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
        </div>
        <div class="col l4 offset-l2 s12">
          <h5 class="white-text">Contact us:</h5>
          <ul>
            <li class="author">
              <AuthorLink name="Dudarik" />
              <span>Dudarik</span>
            </li>
            <li class="author">
              <AuthorLink name="KarinaKold" />
              <span>KarinaKold</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-copyright">
      <div class="container">
        <span>© 2023 Copyright Text</span>
        <a class="grey-text text-lighten-4 right" href="https://rs.school/js">
          <img class="course-link__logo" src="https://rs.school/images/rs_school_js.svg" />
        </a>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AuthorLink from './AuthorLink.vue';

export default defineComponent({
  name: 'FooterTemplate',
  components: {
    AuthorLink,
  },
});
</script>

<style scoped lang="scss">
.author {
  display: flex;
  align-self: center;
  span {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    font-size: 18px;
  }
}

.course-link__logo {
  height: 25px;
}
</style>
