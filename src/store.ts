import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dbName: 'howcatch',
    characters: [
      {
        id: 1,
        title: 'つかみますおの部長レスキュー',
        designer: 'かわもと',
        stages: [1, 2, 3, 4],
      },
      {
        id: 2,
        title: 'やる気なし子の仲良しミッション',
        designer: 'まきの',
        stages: [5, 6, 7 , 8],
      },
    ],
    savedata: [],
  },
  mutations: {
    saveload(state: any, obj: any) {
      state.savedata.push(obj);
    },
  },
  actions: {

  },
});
