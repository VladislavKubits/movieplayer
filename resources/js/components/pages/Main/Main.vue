<template>
    <div class="main">
        <div class="container-fluid">
            <div class="row">
                <div v-for="movie in $store.state.movies" class="col-6 col-md-4 col-xl-3" :key="movie.id">
                    <div v-if="checkMovie(movie.id)" class="movie selected-movie" :ref="movie.id" 
                    :title="`${movie.original_title} ${movie.release_date ? '('+movie.release_date.split('-')[0]+')' : ''}`"
                    @click="unselectMovie(movie.id)">
                        <p>{{movie.original_title}} {{movie.release_date ? '('+movie.release_date.split('-')[0]+')' : ''}}</p>
                        <img v-if="movie.backdrop_path" :src="`${$store.state.imageAPI.url}/w${$store.state.imageAPI.size}/${movie.backdrop_path}`" :alt="movie.original_title">
                        <img v-else :src="`${$store.state.appUrl}/storage/no-image.jpg`" alt="">
                        <button id="add-to-mylist" class="selected-btn" disabled @click.stop="selectMovie(movie.id)">&#10004;</button>
                    </div>
                    <div v-else class="movie" :ref="movie.id" 
                    :title="`${movie.original_title} ${movie.release_date ? '('+movie.release_date.split('-')[0]+')' : ''}`"
                    @click="unselectMovie(movie.id)">
                        <p>{{movie.original_title}} {{movie.release_date ? '('+movie.release_date.split('-')[0]+')' : ''}}</p>
                        <img v-if="movie.backdrop_path" :src="`${$store.state.imageAPI.url}/w${$store.state.imageAPI.size}/${movie.backdrop_path}`" :alt="movie.original_title">
                        <img v-else :src="`${$store.state.appUrl}/storage/no-image.jpg`" alt="">
                        <button id="add-to-mylist" @click.stop="selectMovie(movie.id)">&#10010;</button>
                    </div>
                </div>
            </div>
        </div>

        <button id="my-list-btn" ref="my_list_btn" @click="toggleMyList()">My List</button>
        <movielist-component hidden ref="my_list" v-model="unselectedMovieId" @change="animateBlock(unselectedMovieId, false)"></movielist-component>
    </div>
</template>

<script src="./main.js"></script>