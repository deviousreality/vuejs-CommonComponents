import Vue from 'vue';
import MainmenuAnchor from '@/views/Mainmenu-Anchor.vue';
import TreeNode from '@/components/common/tree-node/tree-node.vue';
import { hasWindowSupport } from '@/utils/env';

export default {
    components: {
        treeNode: TreeNode
    },
    props: {
        id: {
            type: String,
            default: 'menu-parent'
        },
        nodeData: {
            type: Array,
        }
    },    
    data() {
        return {
            anchor: MainmenuAnchor,
            currentActive: null,
            liClass: 'm-menu__item',
            ulClass: 'm-menuitems',        
        }
    },
    computed: {
        hasNodeData(): boolean {
            return this.nodeData.length > 0 ? true : false;
        },
    },
    methods: {
        getCurrentTreeNodeByClick(target: Element) {
            let currentNode: Vue | undefined = undefined;
            const availableNodes = this.$children as Vue[];
            for (let i = 0; i < availableNodes.length; i++) {
                if (availableNodes[i].$el.tagName === 'LI') {
                    for (let j = 0; j < availableNodes[i].$children.length; j++)
                    {
                        if (availableNodes[i].$children[j].$el === target) {
                            currentNode = availableNodes[i];
                            break;
                        }
                    }
                }
            }
            return currentNode ;
        },
        handleNodeClick(event: Event): void {
            const targetElement = event.currentTarget as HTMLElement;
            //const getCurrent = this.getCurrentTreeNodeByClick(targetElement);
            //this.toggleMenu(getCurrent);
            this.$nextTick(function() {
                const top = (<HTMLElement>this.$refs.parentnode).getBoundingClientRect().top + targetElement.getBoundingClientRect().top;
                (<HTMLElement>this.$refs.parentnode).scrollTop = top;
            });
        },
        toggleMenu(component: Vue): void {
            if (this.currentActive && this.currentActive !== component && component !== null) {
                this.currentActive.computedHasFocus = false;
                this.currentActive.computedLocalExpanded = false;

                this.currentActive.$children.forEach((childComponent) => {
                    if (childComponent.$el.tagName === 'A') {
                        childComponent.$data.isLocalExpanded = false;
                        childComponent.$data.hasLocalFocus = false;
                    }
                    if (childComponent.$data.isLocalExpanded) {
                        const childAnchor = childComponent.$children.find((comp) => {
                            return comp.$el.tagName === 'A';
                        });
                        if (childAnchor) {
                            childAnchor.$data.isLocalExpanded = false;
                        }
                    }
                });
            }
            this.currentActive = component;
        },
    },
}

