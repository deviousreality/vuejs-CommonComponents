import Vue from 'vue';
import Anchor from '@/components/common/anchor/anchor.vue';
import { TreeNodeDataModel } from './tree-node';

export interface TreeNodeAnchorVue extends Vue {
    // props
    readonly isExpanded: boolean;
    readonly node: TreeNodeDataModel;
    readonly tabindex: number;
    // data
    // computed
    ariaControls: string | null;
    ariaExpanded: string | null;
    ariaPopup: string | null;
    hasChildren: boolean;
    // methods
    handleClick: (event: Event) => void;
    //handleFocus: (event: Event) => void;
    handleKey: (event: Event) => void;
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