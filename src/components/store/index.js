import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        viewList: []
    },
    mutations: {
        addView(state, view) {
            state.viewList.push(view);
        }
    },
    actions: {

    }
});

export default store;