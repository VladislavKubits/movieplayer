export default {
    model: {
        prop: 'isUrlGenerated',
        event: 'close'
    },
    props: {
        sharedUrl: String,
        isUrlGenerated: Boolean
    },
    methods: {
        closeWindow() {
            this.$emit('close', false);
        },
        selectText(element) {
            let range;
            if (document.selection) {
                // IE
                range = document.body.createTextRange();
                range.moveToElementText(element);
                range.select();
            } else if (window.getSelection) {
                range = document.createRange();
                range.selectNode(element);
                window.getSelection().removeAllRanges();
                window.getSelection().addRange(range);
            }
        },
        copyLink() {
            this.$refs.copy_link_btn.classList.add("selected");
            this.$refs.copy_link_btn.disabled = true;

            this.selectText(this.$refs.share_url_input);
            document.execCommand('copy');
            setTimeout(()=>{
                this.$refs.copy_link_btn.classList.remove("selected");
                this.$refs.copy_link_btn.disabled = false;
        }, 300);
        }
    },
    mounted() {
        //
    }
};