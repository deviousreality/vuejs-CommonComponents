import TreeMenu from '@/components/common/tree-node/tree-menu.vue';
import TreeNode from '@/components/common/tree-node/tree-node.vue';
import TreeNodeData from '../../tests/unit/components/common/tree-node/tree-node-data';
import treeNodeAnchor from '@/components/common/tree-node/tree-node-anchor';
import Globalmenu from '@/components/uiwidgets/globalmenu/globalmenu.vue';

import { TreeNodeDataModel } from '@/components/common/tree-node/tree-node';


const injectHtml = {
    render(h) {
        return h('div', {
            class: 'starman'
        });
    }
}

export default {
    components: {
        treeNodeAnchor: treeNodeAnchor,
        treeNode: TreeNode,
        treeMenu: TreeMenu,
        globalmenu: Globalmenu
    },
    // provide() {
    //     return {
    //         anchor: injectHtml
    //     }
    // },
    data() {
        return {
            treeNodeData: TreeNodeData,
            liClass: 'foo',
        };
    },
    methods: {
        liClassConditional: function (node: TreeNodeDataModel) {
            return `bar-${node.id}`;
        }
    }
}