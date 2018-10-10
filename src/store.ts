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
      let db, objStore: any;
      
      openReq.onupgradeneeded = (event: any) => {
        db = event.target.result;
        objStore = db.createObjectStore('SaveData', {keyPath: 'stageId'});
      }
      
      openReq.onsuccess = (event: any) => {
        db = event.target.result;
        var tx = db.transaction('SaveData', 'readwrite')
        objStore = tx.objectStore('SaveData')
        const results: any = [];

        // 不足データの追加、データの取得
        state.characters.forEach((v: {stages: any, callback: any}) => {
          v.stages.forEach((v: {stage: any}) => {
            let stage = objStore.get(v);
            stage.onsuccess = (event: any) => {
              if (!stage.result) {
                objStore.put({stageId: v, status: 0});
                
                stage = objStore.get(v);
                stage.onsuccess = (event: any) => {
                  results.push(stage.result);
                }
              } else {
                results.push(stage.result);
              }
            }
          });
        });

        state.savedata = results;
      }
    },
    setCharacterCurrentId(state: any, num: number) {
      state.characterCurrentId = num;
    },
  },
  actions: {

  },
});
