<template>
  <header>
    <div class="navbar-fixed">
      <nav>
        <div class="nav-wrapper">
          <a href="/" class="brand-logo">
            <h1>{{ $t('titles.logo') }}</h1>
          </a>
          <ul class="right hide-on-med-and-down">
            <li>
              <div class="card">
                <input @change="toggleTheme" id="checkbox" type="checkbox" class="switch-checkbox" />
                <label for="checkbox" class="switch-label">
                  <span>{{ userTheme }}</span>
                  <span></span>
                  <div
                    class="switch-toggle"
                    :class="{
                      'switch-toggle-checked': userTheme === 'dark-theme',
                    }"
                  ></div>
                </label>
              </div>
            </li>
            <li>
              <button @click="switchLang">{{ locale }}</button>
            </li>
            <li>
              <a href="/restaurants">{{ $t('titles.restPage') }}</a>
            </li>
            <li>
              <router-link v-if="getUserId && this.$route.name !== 'profile'" class="link" :to="{ name: 'profile' }"
                >Profile</router-link
              >
              <!-- <router-link
                class="link"
                :to="{ name: 'add_new_property' }"
                v-if="getUserId && this.$route.name !== 'add_new_property'"
                >List your property</router-link
              > -->
              <router-link v-if="!getUserId" class="link-signin" :to="{ name: 'auth' }">Sign In</router-link>
              <a class="link-signin" v-if="getUserId" @click="logOut()">Sign Out</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import service from '../api';

export default defineComponent({
  name: 'HeaderTemplate',
  computed: {
    ...mapGetters(['getUserId']),
  },
  methods: {
    redirectToAuth() {
      this.$router.push({ name: 'auth' });
    },
    redirectHome() {
      this.$router.push({ name: 'home' });
    },
    async logOut() {
      const res = await service.logOut(localStorage.getItem('rtoken'));
      console.log(res);
      localStorage.clear();
      await this.$router.push({ name: 'home' });
      location.reload();
    },
  },
});
</script>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const userTheme = ref('light-theme');
const setTheme = (theme: string) => {
  localStorage.setItem('user-theme', theme);
  userTheme.value = theme;
  document.documentElement.className = theme;
};
const toggleTheme = () => {
  const activeTheme = localStorage.getItem('user-theme');
  if (activeTheme === 'light-theme') {
    setTheme('dark-theme');
  } else {
    setTheme('light-theme');
  }
};
const getMediaPreference = () => {
  const hasDarkPreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (hasDarkPreference) {
    return 'dark-theme';
  } else {
    return 'light-theme';
  }
};
onMounted(() => {
  const currentTheme = localStorage.getItem('user-theme');
  if (currentTheme !== null) {
    setTheme(currentTheme);
  } else {
    const initUserTheme = getMediaPreference();
    setTheme(initUserTheme);
  }
});

const { t, locale } = useI18n({ useScope: 'global' });
const switchLang = () => {
  locale.value === 'en' ? (locale.value = 'ru') : (locale.value = 'en');
  localStorage.setItem('lang', locale.value as string);
};
</script>

<style scoped lang="scss">
// :root.dark-theme {

// }

h1 {
  margin-top: -10px;
}
.card {
  display: inline;
}
</style>
