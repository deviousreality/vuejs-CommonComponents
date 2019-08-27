import Vue from 'vue';
import TreeNodeAnchor from './tree-node-anchor.vue';
import { keyCodeToKey } from '@/utils/keyInputHelper';

export interface TreeNodeDataModel {
    icon: string;
    id: string;
    isExpanded?: boolean;
    landingPageType: number;
    tabindex?: number;
    target: string;
    title: string;
    url: string;
    children: TreeNodeDataModel[];
}

export interface TreeNodeVue extends Vue {
    // props
    readonly cssClassLi: any;
    readonly cssClassLiCondition: (node: TreeNodeDataModel) => any;
    readonly cssClassUl: any;
    readonly index: number;
    readonly nodeData: TreeNodeDataModel[];
    readonly tabindex: number;
    // data
    hasLocalFocus: boolean;
    isLocalExpanded: boolean;
    // computed
    // methods
    anchorBlur: (event: Event, index: number) => void;
    anchorClick: (event: MouseEvent, index: number) => void;
    anchorFocus: (event: Event, index: number) => void;
    anchorKeydown: (event: KeyboardEvent, index: number) => void;
    hasChildren: (node: TreeNodeDataModel) => boolean;
    nodeLiClass: (node: TreeNodeDataModel) => any;
    nodeBlur: (event: Event, indices: [number], index: number) => void;
    nodeCollapse: (event: Event, indices: [number], index: number) => void;
    nodeExpand: (event: Event, indices: [number], index: number) => void;
    nodeFocus: (event: Event, indices: [number], index: number) => void;
    nodeMovedown: (event: Event, indices: [number], index: number) => void;
    nodeMoveup: (event: Event, indices: [number], index: number) => void;
    nodeSelect: (event: Event, indices: [number], index: number) => void;
}

export default {
    name: 'node',
    inject: {
        currentAnchor: {
            from: 'anchor',
            default: TreeNodeAnchor
        }
    },
    props: {
        cssClassLi: {},
        cssClassLiCondition: {
            type: Function,
            default(node: TreeNodeDataModel) {
                return;
            }
        },
        cssClassUl: {},
        index: {
            type: Number,
            default: 0,
        },
        nodeData: {
            type: Array
        },
    },
    methods: {
        anchorBlur(this: TreeNodeVue, event: Event, index: number): void {
            this.$emit('node-blur', event, [index]);
        },
        anchorClick(this: TreeNodeVue, event: Event, index: number): void {
            this.$emit('node-select', event, [index]);
        },
        anchorFocus(this: TreeNodeVue, event: Event, index: number): void {
            this.$emit('node-focus', event, [index]);
        },
        anchorKeydown(this: TreeNodeVue, event: KeyboardEvent, index: number): void {
            const keyCode = keyCodeToKey(event);
            const keyCodeMethods = {
                ArrowDown: () => this.$emit('node-movedown', event, [index]),
                ArrowUp: () => this.$emit('node-moveup', event, [index]),
                ArrowLeft: () => this.$emit('node-collapse', event, [index]),
                ArrowRight: () => this.$emit('node-expand', event, [index]),
            };
            const handler = keyCodeMethods[keyCode];
            if (handler) {
                handler.call(this);
                event.preventDefault();
            }
            this.$emit('keydown', event);
        },
        hasChildren(this: TreeNodeVue, node: TreeNodeDataModel): boolean {
            return Boolean(node.hasOwnProperty('children') && node.children.length > 0);
        },
        nodeLiClass(this: TreeNodeVue, node: TreeNodeDataModel) {
            return [
                this.cssClassLi,
                this.cssClassLiCondition(node)
            ];
        },
        nodeBlur(this: TreeNodeVue, event: Event, indices: [number], index: number): void {
            this.$emit('node-blur', event, [index, ...indices]);
        },
        nodeCollapse(this: TreeNodeVue, event: Event, indices: [number], index: number): void {
            this.$emit('node-collapse', event, [index, ...indices]);
        },
        nodeExpand(this: TreeNodeVue, event: Event, indices: [number], index: number): void {
            this.$emit('node-expand', event, [index, ...indices]);
        },
        nodeFocus(this: TreeNodeVue, event: Event, indices: [number], index: number): void {
            this.$emit('node-focus', event, [index, ...indices]);
        },
        nodeMovedown(this: TreeNodeVue, event: Event, indices: [number], index: number): void {
            this.$emit('node-movedown', event, [index, ...indices]);
        },
        nodeMoveup(this: TreeNodeVue, event: Event, indices: [number], index: number): void {
            this.$emit('node-moveup', event, [index, ...indices]);
        },
        nodeSelect(this: TreeNodeVue, event: Event, indices: [number], index: number): void {
            this.$emit('node-select', event, [index, ...indices]);
        },
        ulIdAttr(this: TreeNodeVue, node: TreeNodeDataModel): string {
            return `${node.id}-child`;
        },
        ulAriaLabeledby(this: TreeNodeVue, node: TreeNodeDataModel): string {
            return `${node.id}`;
        },
    },
}

