import Vue, { VNode, VNodeData } from 'vue';
import { ItemsMixin } from './mixin-items';
import toString from '@/utils/to-string';
import { arrayIncludes } from '@/utils/array';
import KeyCodes from '@/utils/key-codes';
import { isNull, isUndefined, isFunction, isString } from '@/utils/inspect';
import get from '@/utils/get';

declare global {
    interface VNodeData {
        refInFor: boolean;
    }
 }

export interface TBodyRowMixin extends ItemsMixin, Vue {
    getFormattedValue: (item: any, field: any) => any;
    getTdValues: (item: any, key: any, tdValue: any, defValue: any) => any;
    renderTbodyRow: (item: any[], rowIndex: number) => VNode[];
    renderTbodyRowCell: (field: any, colIndex: number, item: any, rowIndex: number) => VNode;
    rowClick: (event: Event, item: any, index: number) => void;
    rowKeydown: (event: KeyboardEvent, item: any, rowIndex: number) => void;
    rowDblClick: (event: Event, item: any, index: number) => void;
    rowHover: (event: Event, item: any, index: number) => void;
    rowHoverOut: (event: Event, item: any, index: number) => void;
    tdAttrs: (field: any, item: any, colIndex: number) => any;
    safeId: (arg: string) => string;
}

export default {
    methods: {
        getFormattedValue(item: any, field: any): any {
            const key = field.key;
            const formatter = field.formatter;
            const parent = this.$parent as any;
            let value = get(item, key, null);
            if(formatter) {
                if(isFunction(formatter)) { 
                    value = formatter(value, key, item);
                } else if (isString(formatter) && isFunction(parent[formatter])) {
                    value = parent[formatter](value, key, item);
                }
            }
            return isUndefined(value) || isNull(value) ? '' : value;
        },
        getTdValues(item: any, key: any, tdValue: any, defValue: any): any {
            const parent = this.$parent as any;
            if(tdValue) {
                const value = get(item, key, '');
                if(isFunction(tdValue)) {
                    return tdValue(value, key, item);
                } else if(isString(tdValue) && isFunction(parent[tdValue])) {
                    return parent[tdValue](value, key, item);
                }
                return tdValue;
            }
            return defValue;
        },
        renderTbodyRow(item: any[], rowIndex: number): VNode[] {
            const h = this.$createElement;
            const fields = this.computedFields;
            const hasRowClickHandler = this.$listeners['row:click'];

            // we can return more tahn one TR if row details enabled
            const rows: VNode[] = [];
             // For each item data field in row
            const tds = fields.map((field: any, colIndex: number) => {
                return this.renderTbodyRowCell(field, colIndex, item, rowIndex);
            });
            
            // Create a unique :key to help ensure that sub components are re-rendered rather than
            // re-used, which can cause issues. If a primary key is not provided we use the rendered
            // rows index within the tbody.
            // See: https://github.com/bootstrap-vue/bootstrap-vue/issues/2410
            const primaryKey = this.primaryKey as any;
            const rowKey = primaryKey && !isUndefined(item[primaryKey]) && !isNull(item[primaryKey]) ?
                toString(item[primaryKey]) :
                String(rowIndex);


            // If primary key is provided, use it to generate a unique ID on each tbody > tr
            // In the format of '{tableId}__row_{primaryKeyValue}'
            const rowId = primaryKey && !isUndefined(item[primaryKey]) && !isNull(item[primaryKey]) ? 
                this.safeId(`_row_${item[primaryKey]}`) : 
                null;

            const handlers = {} as any;
            if(hasRowClickHandler) {
                handlers['click'] = (event: Event) => {
                    this.rowClick(event, item, rowIndex);
                }
                handlers['keydown'] = (event: KeyboardEvent) => {
                    this.rowKeydown(event, item, rowIndex);
                }
            }
            // Add the item row
            rows.push(h('tr', {
                key: `table-details-${rowKey}__`,
                ref: 'itemRows',
                refInFor: true,
                class: [],
                attrs: {
                    id: rowId,
                    tabindex: hasRowClickHandler ? '0': null,
                    role: 'row',
                    'data-pk': rowId ? String(item[primaryKey]) : null,
                },
                on: {
                    ...handlers,
                    dblclick: (event: Event) => {
                        this.rowDblClick(event, item, rowIndex);
                    },
                    mouseenter: (event: Event) => {
                        this.rowHover(event, item, rowIndex);
                    },
                    mouseleave: (event: Event) => {
                        this.rowHoverOut(event, item, rowIndex);
                    },
                }
            } as VNodeData, tds));
            return rows;
        },
        renderTbodyRowCell(field: any, colIndex: number, item: any, rowIndex: number): VNode {
            const h = this.$createElement;
            const scoped = this.$scopedSlots;
            const formatted = this.getFormattedValue(item, field);
            const data = {
                attrs: this.tdAttrs(field, item, colIndex),
                class: [],
                key: `row-${rowIndex}-cell-${colIndex}-${field.key}`,
            }
            const slotScope = {
                item: item,
                index: rowIndex,
                field: field,
                unformatted: get(item, field.key, ''),
                value: formatted,
            };
            const childNodes = scoped[field.key] ? scoped[field.key](slotScope): toString(formatted);

            return h('td', data, [childNodes]);
        },
        rowClick(event: Event, item: any, index: number): void {
            this.$emit('row:click', item, index, event);
        },
        rowKeydown(event: KeyboardEvent, item: any, rowIndex: number): void {
            const keyCode = event.keyCode;
            const target = event.currentTarget as HTMLElement;
            const trs = this.$refs.itemRows as any[];
            if(!(target && target.tagName === 'TR' && target === document.activeElement)) {
                // Ignore if not the active tr element
                return;
            } else if(target.tabIndex !== 0) {
                // Ignore if not focusable
                return;                
            } else if(trs && trs.length === 0) {
                // Ignore if no rows
                return;
            }
            const index = trs.indexOf(target);
            if(keyCode === KeyCodes.ENTER || keyCode === KeyCodes.SPACE) {
                event.stopPropagation();
                event.preventDefault();
                // We also allow enter/space to trigger a click (when row is focused)
                // We translate to a row-clicked event
                this.rowClick(event, item, rowIndex);
            } else if(arrayIncludes([KeyCodes.UP, KeyCodes.DOWN, KeyCodes.HOME, KeyCodes.END], keyCode)) {
                event.stopPropagation();
                event.preventDefault();
                const shift = event.shiftKey;
                if(keyCode === KeyCodes.HOME || (shift && keyCode === KeyCodes.UP)) {
                    // Focus first row
                    trs[0].focus();
                } else if(keyCode === KeyCodes.END || (shift && keyCode === KeyCodes.DOWN)) {
                    // Focus last row
                    trs[trs.length - 1].focus();
                } else if(keyCode === KeyCodes.UP && index > 0) {
                    // Focus previous row
                    trs[index-1].focus();
                } else if(keyCode === KeyCodes.DOWN && index < trs.length -1) {
                    trs[index + 1].focus();
                }
            }
        },
        rowDblClick(event: Event, item: any, index: number): void {
            this.$emit('row:dblclick', item, index, event);
        },
        rowHover(event: Event, item: any, index: number): void {
            this.$emit('row:hover', item, index, event);
        },
        rowHoverOut(event: Event, item: any, index: number): void {
            this.$emit('row:hoveroff', item, index, event);
        },
        tdAttrs(field: any, item: any, colIndex: number): void {
            let attrs = {
                'aria-colindex': String(colIndex + 1),
                role: 'cell',
            };
            return {...attrs, ...this.getTdValues(item, field.key, field.tdAttr, {}) };
        },
    }
}