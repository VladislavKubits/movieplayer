import MovieList from '../../app/MovieList/MovieList.vue';

export default {
    data() {
        return {
            selectedMovies: [],
            isMyListOpen: false,
            unselectedMovieId: null
        }
    },
    components: {
        "movielist-component": MovieList
    },
    methods: {
        toggleMyList () {
            if (this.isMyListOpen) {
                this.$refs.my_list_btn.classList.remove("selected");
                this.$refs.my_list.$el.hidden = true;
            } else {
                this.$refs.my_list_btn.classList.add("selected");
                this.$refs.my_list.$el.hidden = false;
            }
            this.isMyListOpen = !this.isMyListOpen;
        },
        selectMovie(id) {
            this.animateBlock(id);
            let movies = _.cloneDeep(this.$store.state.movies);
            let movie = movies.find(movie => movie.id == id);
            let selectedMovies = _.cloneDeep(this.$store.state.selectedMovies);
            selectedMovies.push(movie);
            this.$store.dispatch('selectedMovies', selectedMovies);
            this.$store.dispatch('addSelectedMoviesId', id);
        },
        unselectMovie(id) {
            if (this.$refs[id][0].children[2].disabled) {
                this.animateBlock(id, false);
                let selectedMovies = _.cloneDeep(this.$store.state.selectedMovies);
                let selectedMoviesIds = _.cloneDeep(this.$store.state.selectedMoviesIds);
                selectedMovies = selectedMovies.filter(movie => movie.id != id);
                selectedMoviesIds = selectedMoviesIds.filter(selectedMoviesId => selectedMoviesId != id);
                this.$store.dispatch('selectedMovies', selectedMovies);
                this.$store.dispatch('selectedMoviesIds', selectedMoviesIds);
            }
        },
        animateBlock(id, select = true) {
            if (this.unselectedMovieId) this.unselectedMovieId = null;
            try {
                let button = this.$refs[id][0].children[2];
                button.disabled = select;

                if (select) {
                    this.$refs[id][0].classList.add('selected-movie');

                    button.classList.add('selected-btn');
                    button.innerHTML = '&#10004;';
                } else {
                    this.$refs[id][0].classList.remove('selected-movie');

                    button.classList.remove('selected-btn');
                    button.innerHTML = '&#10010;';
                }
            } catch(err) {
                console.log('The movie is not on page!');
            }
        },
        checkMovie(id) {
            return this.$store.state.selectedMoviesIds.some(selectedMoviesId => Number(selectedMoviesId) === Number(id));
        }
    }
}