import { createStore } from 'vuex';

export default createStore({
  state: {
    isSidebarOpen: false,
  },
  getters: {},
  mutations: {
    SET_SIDEBAR_VALUE(state, value) {
      state.isSidebarOpen = value;
    },
  },
  actions: {},
  modules: {},
});
