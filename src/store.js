import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sourceGraph: null,
    sourceNode: null,
    matchGraph: null,
    matchNode: null,

  },
  mutations: {
    mutateSourceGraph(state, payload) {
      state.sourceGraph = payload;
    },
    mutateSourceNode(state, payload) {
      state.sourceNode = payload;
    },
    mutateMatchGraph(state, payload) {
      state.matchGraph = payload;
    },
    mutateMatchNode(state, payload) {
      state.matchNode = payload;
    },

  },
  actions: {

  },
});
