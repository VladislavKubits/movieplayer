import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        appUrl: location.origin,
        moviedbUrl: 'https://api.themoviedb.org/3',
        apiKeyV3: '2725aa99f8eb3eb018e009ed49975b55',
        
        movies: [],
        selectedMovies: [],
        selectedMoviesIds: [],
        currentPage: 1,
        totalPages: 1,

        imageAPI: {
            url: 'https://image.tmdb.org/t/p',
            size: 500
        }
    },
    mutations: {
        movies(state, val) {
            state.movies = val;
        },
        selectedMovies(state, val) {
            state.selectedMovies = val;
        },
        selectedMoviesIds(state, val) {
            state.selectedMoviesIds = val;
        },
        addSelectedMoviesId(state, val) {
            state.selectedMoviesIds.push(val);
        },
        currentPage(state, val) {
            state.currentPage = val;
        },
        totalPages(state, val) {
            state.totalPages = val;
        }
    },
    actions: {
        movies(context, val) {
            context.commit('movies', val);
        },
        selectedMovies(context, val) {
            context.commit('selectedMovies', val);
        },
        selectedMoviesIds(context, val) {
            context.commit('selectedMoviesIds', val);
        },
        addSelectedMoviesId(context, val) {
            context.commit('addSelectedMoviesId', val);
        },
        currentPage(context, val) {
            context.commit('currentPage', val);
        },
        totalPages(context, val) {
            context.commit('totalPages', val);
        }
    }
});