export default {
    data() {
        return {
            query: '',
            category: 'popular'
        }
    },
    methods: {
        getMovies (category, page) {
            this.category = category;

            this.animateButton();

            const url = `${this.$store.state.moviedbUrl}/movie/${category}?api_key=${this.$store.state.apiKeyV3}&language=en-US&page=${page}`;
            axios.get(url)
            .then((res)=> {
                this.$store.dispatch('movies', res.data.results);
                this.$store.dispatch('currentPage', page);
                this.$store.dispatch('totalPages', res.data.total_pages);
            })
            .catch((err) => console.log(err));
        },
        getLatestMovies (page) {
            this.category = 'latest';

            this.animateButton();

            const url = `${this.$store.state.moviedbUrl}/discover/movie?api_key=${this.$store.state.apiKeyV3}&sort_by=release_date.desc&include_adult=false&include_video=false&release_date.gte=2021-01-30&release_date.lte=2022-01-30&language=en-US&page=${page}`;
            axios.get(url)
            .then(res => {
                res.data.results.sort((a, b) => {
                    if (a.release_date < b.release_date){
                        return 1;
                      }
                      if (a.release_date > b.release_date){
                        return -1;
                      }
                      return 0;
                });
                this.$store.dispatch('movies', res.data.results);
                this.$store.dispatch('currentPage', page);
                this.$store.dispatch('totalPages', res.data.total_pages);
            })
            .catch(err => console.log(err));
        },
        searchMovies () {
            if (this.query) {
                axios.get(`${this.$store.state.moviedbUrl}/search/movie?api_key=${this.$store.state.apiKeyV3}&query=${this.query}&page=1&include_adult=false&language=en-US`)
                .then(res => {
                    this.$store.dispatch('movies', res.data.results);
                    this.$store.dispatch('currentPage', page);
                    this.$store.dispatch('totalPages', res.data.total_pages);
                })
                .catch(err => console.log(err));
            } else {
                if (this.category === "latest") this.getLatestMovies(this.$store.state.currentPage);
                else this.getMovies(this.category, this.$store.state.currentPage);
            }
        },
        animateButton() {
            for (let key in this.$refs) {
                this.$refs[key].classList.remove("selected");
            }

            this.$refs[this.category].classList.add("selected");
        }
    },
    mounted() {
        this.getMovies(this.category);
    }
}