import { createStore } from 'vuex';

export default createStore({
  state: {
    isSidebarOpen: false,
    currentStep: 0,
    isLoading: false,
    originalFile: {},
  },
  getters: {},
  mutations: {
    SET_SIDEBAR_VALUE(state, value) {
      state.isSidebarOpen = value;
    },
    SET_CURRENT_STEP(state, value) {
      state.currentStep = value;
    },
    SET_LOADING_VALUE(state, value) {
      state.isLoading = value;
    },
    SET_ORIGINAL_FILE(state, file) {
      state.originalFile = file;
    },
  },
  actions: {},
  modules: {},
});
