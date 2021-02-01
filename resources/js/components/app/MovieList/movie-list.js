import { Base64 } from 'js-base64';
import Cookies from 'js-cookie';
import md5 from 'md5';

import SharedUrlModel from '../../pop ups/SharedUrlModal/SharedUrlModal.vue';

export default {
    model: {
        prop: 'unselectedMovieId',
        event: 'change'
    },
    props: {
        unselectedMovieId: Number
    },
    components: {
        'shared-url-modal-component': SharedUrlModel
    },
    data() {
        return {
            sharedUrl: '',
            isUrlGenerated: false
        }
    },
    methods: {
        saveMovies() {
            try {
                
                Cookies.set('movies', Base64.encode(this.$store.state.selectedMoviesIds.join(',')));
                alert("The selected movies were saved!");
            } catch(err) {
                alert(err.message);
            }
        },
        unselectMovie(id) {
            let selectedMovies = _.cloneDeep(this.$store.state.selectedMovies);
            let selectedMoviesIds = _.cloneDeep(this.$store.state.selectedMoviesIds);
            selectedMovies = selectedMovies.filter(movie => movie.id != id);
            selectedMoviesIds = selectedMoviesIds.filter(selectedMoviesId => selectedMoviesId != id);
            this.$store.dispatch('selectedMovies', selectedMovies);
            this.$store.dispatch('selectedMoviesIds', selectedMoviesIds);
            this.$emit('change', id);
        },
        randomStringMD5Hash(i) {
            var rnd = '';
            while (rnd.length < i) 
                rnd += Math.random().toString(36).substring(2);
            return md5(rnd.substring(0, i));
        },
        shareMovies() {
            const idsArrayBase64Hash = Base64.encode(this.$store.state.selectedMoviesIds.join(','));

            this.sharedUrl = `${this.$store.state.appUrl}/b/${Base64.encode(`${idsArrayBase64Hash}.${this.randomStringMD5Hash(100)}`)}`;
            this.isUrlGenerated = true;
        }
    },
    mounted() {
        //
    }
};