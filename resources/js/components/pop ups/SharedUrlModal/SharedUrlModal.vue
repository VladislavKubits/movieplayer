<template>
    <div id="shared-url-modal">
        <div>
            <button @click="closeWindow()" id="close-window" ref="close-window">&#10008;</button>
            <p>The link can now be saved!</p>
            <div>
                <input ref="share_url_input" readonly type="text" v-model="sharedUrl">
                <button ref="copy_link_btn" @click="copyLink()">Copy link</button>
            </div>
        </div>
    </div>
</template>

<script src="./shared_url_modal.js"></script>