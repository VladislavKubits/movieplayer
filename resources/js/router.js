import Vue from 'vue';
import VueRouter from 'vue-router';
import { Base64 } from 'js-base64';

import store from './store';

import Main from './components/pages/Main/Main.vue';

Vue.use(VueRouter);

async function encodeMoviesIds (to, from, next) {
    let path = location.pathname.split('/');

    if (path[1] === 'b') {
        let 
            base64String = Base64.decode(path[2]),
            ids = base64String.split('.')[0],
            selectedMovies = [];

        ids = Base64.decode(ids).split(',');

        ids.forEach(id => {
            axios.get(`${store.state.moviedbUrl}/movie/${id}?api_key=${store.state.apiKeyV3}&language=en-US`)
            .then(res => {
                selectedMovies.push(res.data);
            })
            .catch(err => console.log(err));
        });

        store.dispatch('selectedMovies', selectedMovies);
        store.dispatch('selectedMoviesIds', ids);
        next();
    } else {
        next('/');
    }
};

export default new VueRouter({
    routes: [
        {
            path: '/',
            component: Main,
            name: 'main'
        }, {
            path: '*',
            component: Main,
            beforeEnter: encodeMoviesIds
        }
    ],
    mode: 'history'
});