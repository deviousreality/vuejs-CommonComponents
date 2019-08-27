export default {
    data() {
        return {
            isOpen: false
        }
    },
    props: {
        options: {
            type: [Array, Object],
            default() {
                return [];
            }
        },
        checked: {
            type: [String, Number, Object, Array, Boolean],
            default: null
        },
    },
    computed: {
        multipleButtonText() {
            const delimiter = ', ';
            if(this.checked) {
                return this.options
                    .filter((elm) => {
                        return this.checked.includes(elm.value);
                    }, this)
                    .map((elm) => {
                        return elm.text;
                    }).join(delimiter);
                }
                return '';
            }
        },
        methods: {
            toggle() {
                this.isOpen = !this.isOpen;
                this.$emit('click', this.isOpen);
            }
        }
    }