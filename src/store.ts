import Vue from 'vue';
import Vuex from 'vuex';
import Dexie from "dexie";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dbName: 'howcatch',
    version: '1.0.1',
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
        stages: [5, 6, 7, 8],
      },
    ],
    characterCurrentId: 0,
    savedata: [
      {
        stage_id: 1,
        status: 0,
        clear_time: 0
      },
      {
        stage_id: 2,
        status: 0,
        clear_time: 0
      },
      {
        stage_id: 3,
        status: 0,
        clear_time: 0
      },
      {
        stage_id: 4,
        status: 0,
        clear_time: 0
      },
      {
        stage_id: 5,
        status: 0,
        clear_time: 0
      },
      {
        stage_id: 6,
        status: 0,
        clear_time: 0
      },
      {
        stage_id: 7,
        status: 0,
        clear_time: 0
      },
      {
        stage_id: 8,
        status: 0,
        clear_time: 0
      }
    ],
    updateNotice: false,
  },
  mutations: {
    saveload(state: any) {
      // Indexed database
      state.db = new Dexie(state.dbName);

      state.db.version(2).stores({
        savedata: "++id, &stage_id, status, clear_time"
      })

      state.characters.forEach((v: any) => {
        v.stages.forEach((val: any) => {
          state.db.savedata.put({
            stage_id: val,
            status: 0,
            clear_time: 0
          });
        });
      });

      state.db.savedata.toArray()
        .then((datas: any) => {
          state.savedata = datas;
        });

    },
    setCharacterCurrentId(state: any, num: number) {
      state.characterCurrentId = num;
    },
  },
  actions: {

  },
});
