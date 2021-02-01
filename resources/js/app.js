require('./bootstrap');

import Vue from 'vue';

import router from './router';
import store from './store';

import App from './components/app/App/App.vue';
import Header from './components/app/Header/Header.vue';
import Footer from './components/app/Footer/Footer.vue';

import { Base64 } from 'js-base64';
import Cookies from 'js-cookie';

new Vue({
    el: "#app",
    router,
    store,
    components: {
        "app-component": App,
        "header-component": Header,
        "footer-component": Footer
    },
    created() {
        let 
            ids = Base64.decode(Cookies.get('movies')).split(','),
            selectedMovies = [];

        ids.forEach(id => {
            axios.get(`${this.$store.state.moviedbUrl}/movie/${id}?api_key=${this.$store.state.apiKeyV3}&language=en-US`)
            .then(res => {
                selectedMovies.push(res.data);
            })
            .catch(err => console.log(err));
        });

        this.$store.dispatch('selectedMovies', selectedMovies);
        this.$store.dispatch('selectedMoviesIds', ids);
    }
});