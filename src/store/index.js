import { createStore } from 'vuex';
import containers from '@/store/containers';

const store = createStore({
    modules: {
        containers,
    },
});

export default store;
