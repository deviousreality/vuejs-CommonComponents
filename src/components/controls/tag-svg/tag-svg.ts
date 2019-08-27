export default {
    props: {
        name: {
            type: String,
            default: 'icon-splash-close',
        }
    },
    computed: {
        computeClass() {
            return [
                'icon',
                this.name
            ]
        }
    }
}
