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
        stages: [5, 6, 7, 8],
      },
    ],
    characterCurrentId: 0,
    savedata: [],
  },
  mutations: {
    saveload(state: any) {
      // Indexed database
      const dbName = state.dbName;
      const openReq = indexedDB.open(dbName);
      let db;
      let objStore: any;

      openReq.onupgradeneeded = (event: any) => {
        db = event.target.result;
        objStore = db.createObjectStore('SaveData', {keyPath: 'stageId'});
      };

      openReq.onsuccess = (event: any) => {
        db = event.target.result;
        const tx = db.transaction('SaveData', 'readwrite');
        objStore = tx.objectStore('SaveData');
        const results: any = [];

        // 不足データの追加、データの取得
        state.characters.forEach((v: {stages: any, callback: any}) => {
          v.stages.forEach((val: {stage: any}) => {
            let stage = objStore.get(val);
            stage.onsuccess = () => {
              if (!stage.result) {
                objStore.put({stageId: val, status: 0});

                stage = objStore.get(val);
                stage.onsuccess = () => {
                  results.push(stage.result);
                };
              } else {
                results.push(stage.result);
              }
            };
          });
        });
        state.savedata = results;
      };
    },
    setCharacterCurrentId(state: any, num: number) {
      state.characterCurrentId = num;
    },
  },
  actions: {

  },
});
