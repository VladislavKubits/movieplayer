<template>
    <div class="header">
        <div class="container-fluid">
            <div class="row" id="search">
                <div class="col-12">
                    <input type="search" placeholder="search" v-model="query" @input="searchMovies()">
                </div>
            </div>
            <div class="row" id="categories">
                <div class="col">
                    <button id="popular" ref="popular" @click="getMovies('popular', 1)">Popular</button>
                </div>
                <div class="col">
                    <button id="latest" ref="latest" @click="getLatestMovies(1)">Latest</button>
                </div>
                <div class="col">
                    <button id="top-rated" ref="top_rated" @click="getMovies('top_rated', 1)">Top Rated</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./header.js"></script>