import { createStore } from 'vuex';

export default createStore({
  state: {
    isMobileDevice: false,
    isSidebarOpen: false,
    currentStep: 0,
    isLoading: false,
    signList: [],
    originalFile: {},
    fileName: null,
  },
  getters: {},
  mutations: {
    SET_MOBILE_DEVICE_VALUE(state, value) {
      state.isMobileDevice = value;
    },
    SET_SIDEBAR_VALUE(state, value) {
      state.isSidebarOpen = value;
    },
    SET_CURRENT_STEP(state, value) {
      state.currentStep = value;
    },
    SET_LOADING_VALUE(state, value) {
      state.isLoading = value;
    },
    SET_SIGN_LIST(state, value) {
      state.signList = value;
    },
    SET_ORIGINAL_FILE(state, file) {
      state.originalFile = file;
    },
    SET_FILE_NAME(state, fileName) {
      state.fileName = fileName;
    },
  },
  actions: {
    checkIsMobileDevice({ commit }) {
      const mobileDevice = [
        'Android',
        'webOS',
        'iPhone',
        'iPad',
        'iPod',
        'BlackBerry',
        'Windows Phone',
      ];
      const isMobileDevice = mobileDevice.some((e) => navigator.userAgent.match(e));
      commit('SET_MOBILE_DEVICE_VALUE', isMobileDevice);
    },
  },
  modules: {},
});
