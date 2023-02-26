import { createStore } from 'vuex';

export default createStore({
  state: {
    isAuth: false,
    user: {
      role: null,
      uid: null,
      email: null,
      username: null,
      phonenumber: null,
    },
  },
  getters: {
    getEmail(state) {
      return state.user.email;
    },
    getName(state) {
      return state.user.username;
    },
    getUserId(state) {
      return state.user.uid;
    },
    getUserRoleId(state) {
      return state.user.role;
    },
  },
  mutations: {},
  actions: {
    setEmail(email) {
      this.state.user.email = email;
    },
    setRole(role) {
      this.state.user.role = role;
    },
    setUserId(uid) {
      console.log(uid);
      this.state.user.uid = uid;
    },
  },
  modules: {
    // post: commentModule,
  },
});
