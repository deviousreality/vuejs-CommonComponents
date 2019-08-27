import Anchor from '@/components/common/anchor/anchor.vue';

export default {
    components: {
        anchor: Anchor
    },
    props: {
        isExpanded: {
            type: Boolean,
            default: false
        },
        hasFocus: {
            type: Boolean,
            default: false
        },
        node: {
            type: Object
        },
    },
    data() {
        return {
            isLocalExpanded: this.isExpanded,
            hasLocalFocus: this.hasFocus
        }
    },
    computed: {
        anchorClass: function (): string[] {
            return [
                'm-menu-link',
                (this.hasChildren ? ' m-menu-link--expander' : ''),
                (this.computedIsExpanded ? 'm-menu-link--open' : ''),
            ];
        },
        anchorHasAriaPopup: function (): boolean {
            return this.hasChildren;
        },
        anchorIsAriaExpanded: function (): string | null {
            return this.hasChildren ? String(this.computedIsExpanded) : null;
        },
        ariaControlsId: function (): string {
            return `${(this.node).id}-child`;
        },
        computedIsExpanded: {
            get: function (): boolean {
                return this.isLocalExpanded;
            },
            set: function (val): void {
                this.isLocalExpanded = val;
            }
        },
        computedHasFocus: {
            get: function (): boolean {
                return this.hasLocalFocus;
            },
            set: function (val): void {
                this.hasLocalFocus = val;
            }
        },
        expandStateIcon: function (): string {
            return this.computedIsExpanded ? 'icon-menu-arrow-up' : 'icon-menu-arrow-down';
        },
        hasChildren: function (): boolean {
            return (this.node.hasOwnProperty('children') && (this.node).children.length > 0);
        },
        tabIndex: function ():string {
            return this.computedHasFocus ? '0' : '-1';
        },
    },
    methods: {
        handleClick: function (event: Event): void {
            if (this.hasChildren) {
                //this.computedIsExpanded = !this.computedIsExpanded;
                this.$emit('click', event);
            } else {
                const url = (this.node).url;
                const target = (this.node).target;
                // if (target) {
                //     window.open(url, (this.node).target);
                // } else {
                //     window.location.href = url;
                // }
            }
        },
        handleFocus: function (event: Event): void {
            if (event.target) {
                if (event.type === 'focus') {
                    this.computedHasFocus = true;
                    this.$emit('focus', event);
                } else if (event.type === 'blur') {
                    this.$emit('blur', event);
                    this.computedHasFocus = false;
                }
            }
        },
        handleKey: function (event: Event): void {
            this.$emit('keydown', event);
        }
    }

}