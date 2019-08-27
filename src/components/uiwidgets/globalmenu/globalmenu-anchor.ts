import Anchor from '@/components/common/anchor/anchor.vue';
import { TreeNodeAnchorVue } from '@/components/common/tree-node/tree-node-anchor';

export interface GlobalmenuAnchorVue extends TreeNodeAnchorVue {
    // computed
    anchorClass: any;
    expandStateIcon: string;
}

export default {
    components: {
        anchor: Anchor,
    },
    props: {
        isExpanded: {
            type: Boolean,
            default: false
        },
        node: {
            type: Object
        },
        tabindex: {
            type: Number,
            default: -1,
        }
    },
    computed: {
        ariaControls: function (this: TreeNodeAnchorVue): string | null {
            return this.hasChildren ? `${this.node.id}-child` : null;
        },
        ariaExpanded: function (this: TreeNodeAnchorVue): string | null {
            return this.hasChildren ? `${this.isExpanded}` : null;
        },
        ariaPopup: function (this: TreeNodeAnchorVue): string | null {
            return this.hasChildren ? 'true' : null;
        },
        hasChildren: function (this: TreeNodeAnchorVue): boolean {
            return this.node.children.length > 0;
        },
    },
    watch: {
        tabindex(this: TreeNodeAnchorVue, tabindex: number): void {
            if (tabindex === 0) {
                (<HTMLElement>this.$refs.anchor).focus();
            }
        }
    },
    methods: {
        handleClick: function (this: TreeNodeAnchorVue, event: Event): void {
            this.$emit('click', event, this.node);
        },
        handleFocus: function (event: Event): void {
            if (event.target) {
                if (event.type === 'focus') {
                    this.$emit('focus', event);
                } else if (event.type === 'blur') {
                    this.$emit('blur', event);
                }
            }
        },
        handleKey: function (this: TreeNodeAnchorVue, event: Event): void {
            this.$emit('keydown', event);
        }
    }
}