import Vue, { VNode } from 'vue';
import { ItemsMixin } from './mixin-items';
import { NormalizeSlotMixin } from '@/mixins/normalize-slot';
import KeyCodes from '@/utils/key-codes';

export interface THeadMixin extends ItemsMixin, NormalizeSlotMixin, Vue {
    theadClass: string | any[] | object;
    theadTrClass: string | any[] | object;
    fieldClasses: (field: any) => any[];
    headClasses: () => string[] | null;
    headClick: (evt: Event, field: any) => void;
    renderThead: () => VNode;
}

export default {
    props: {
        theadClass: {
            type: [String, Array, Object],
            default: null,
        },
        theadTrClass: {
            type: [String, Array, Object],
            default: null,
        },
    },
    computed: {
        headClasses() {
            return null;
        },
    },   
    methods: {
        fieldClasses(field: any): any[] {
            return [
                field.class ? field.class : '',
                field.thClass ? field.thClass: '',
            ];
        },

        headClick(event: Event, field: any): void {
            event.stopPropagation();
            event.preventDefault();
            this.$emit('head:click', field.key, field, event);
        },

        renderThead(): VNode {
            const h = this.$createElement;
            const fields = this.computedFields || [];

            const makeCells = (field: any, colIndex: number) => {
                let ariaLabel = null;
                if(!field.label.trim() && !field.headerTitle) {
                    ariaLabel = field.key;
                }
                const hasHeadClickListener = this.$listeners['head:click'];
                const handlers = {} as any;
                if(hasHeadClickListener) {
                    handlers.click = (event: Event) => {
                        this.headClick(event, field);
                    },
                    handlers.keydown = (event: KeyboardEvent) => {
                        const keyCode = event.keyCode;
                        if (keyCode === KeyCodes.ENTER || keyCode === KeyCodes.SPACE) {
                            this.headClick(event, field);
                        }
                    };
                }

                const data: any = {
                    key: field.key,
                    class: [ this.fieldClasses(field) ],
                    attrs: {
                        'aria-colindex': String(colIndex + 1),
                        'aria-label': ariaLabel,
                        role: 'columnheader',
                        scope: 'col',
                        // We only add a tabindex of 0 if there is a head-click listener
                        tabindex: hasHeadClickListener ? '0' : null,
                    },
                    on: handlers,
                };
                
                const fieldScope = { label: field.label, column: field.key, field: field };
                const slot = this.normalizeSlot(`HEAD_${field.key}`, fieldScope) as VNode[];
                if(!slot) {
                    data.domProps = { innerHTML: field.label };
                }
                return h('th', data, slot );
            };

            // Generate the array of TH cells
            const cells = fields.map(makeCells).filter((th: any) => th);

            // Generate the row(s)
            const trs: VNode[] = [];
            trs.push(h('tr', { class: [ this.theadTrClass ], attrs: {role: 'row'} }, cells));

            return h('thead', {
                key: 'thead',
                class: this.headClasses,
                attrs: { role: 'rowgroup' }
            }, trs);
        }
    }
};