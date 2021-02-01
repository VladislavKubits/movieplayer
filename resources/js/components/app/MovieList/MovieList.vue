<template>
    <div class="movie-list">
        <div v-if="this.$store.state.selectedMovies.length > 0">
            <div v-for="(movie, index) in this.$store.state.selectedMovies" :key="index + 1" class="selected-movie" :ref="movie.id">
                <div>
                    <div>
                        <div id="movie-index">{{index + 1}}</div>
                        <img v-if="movie.backdrop_path" :src="`${$store.state.imageAPI.url}/w${$store.state.imageAPI.size}/${movie.backdrop_path}`" :alt="movie.original_title">
                        <img v-else :src="`${$store.state.appUrl}/storage/no-image.jpg`" alt="">
                        <button id="unselect-movie-btn" @click="unselectMovie(movie.id)">&#10008;</button>
                    </div>
                    <div class="main">
                        <div class="title">{{movie.original_title}} {{movie.release_date ? '('+movie.release_date.split('-')[0]+')' : ''}}</div>
                        <div class="description">{{movie.overview}}</div>
                        <div class="rating">Rating: {{movie.vote_average}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="submit-btns container">
            <div class="row">
                <div class="col">
                    <img @click="saveMovies()" src="images/save.png" alt="">
                    <p @click="saveMovies()">Save</p>
                </div>
                <div class="col">
                    <img @click="shareMovies()" src="images/share.png" alt="">
                    <p @click="shareMovies()">Share</p>
                </div>
            </div>
        </div>
        <shared-url-modal-component v-if="isUrlGenerated" :sharedUrl="sharedUrl" v-model="isUrlGenerated"></shared-url-modal-component>
    </div>
</template>

<script src="./movie-list.js"></script>