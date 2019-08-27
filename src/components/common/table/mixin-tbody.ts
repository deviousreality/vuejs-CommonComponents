import Vue, { VNode } from 'vue';
import tbodyRowMixin from './mixin-tbody-row';

export interface TBodyMixin extends Vue {
    renderTbody: () => VNode;
}

export default {
    mixins: [
        tbodyRowMixin
    ], 
    methods: {
        renderTbody(): VNode {
            const h = this.$createElement;
            const items = this.computedItems;

            // prepare the tbody rows
            const rows: VNode[] = [];
            for(let i = 0; i < items.length; i++) {
                rows.push(this.renderTbodyRow(items[i], i));
            }

            const tbody = h('tbody', {
                    attrs: { role: 'rowgroup'},
                    class: [],
                }, 
                rows as any
            );

            return tbody;
        }
    }
};