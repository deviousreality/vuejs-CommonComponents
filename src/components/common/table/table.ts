/**
 * Test Data
 * [  
         {  
            "ID":"1",
            "Title":"Sample template",
            "Description":"",
            "IsVisible":"0"
         }
      ]
 * 
 * Define the data structure
 * fields: [
 *      {
 *          key: 'age',
 *          label: 'Age',
 *          sortable: true,
 *      }    
 * ],
 * items: [
        { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
        { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
        { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
        { age: 38, first_name: 'Jami', last_name: 'Carney' }
    ]
 */
import Vue from 'vue';
import idMixin, { IdMixin } from "@/mixins/id";
import normalizeSlotMixin from '@/mixins/normalize-slot';
import itemMixin, { ItemsMixin } from './mixin-items';
import theadMixin, { THeadMixin } from './mixin-thead';
import tbodyMixin, { TBodyMixin } from './mixin-tbody';

export interface TableModel extends IdMixin, ItemsMixin, THeadMixin, TBodyMixin, Vue {
    hasHover: boolean;
    isStriped: boolean;
    computedItems: any[];
    tableAttrs: object;
    tableClasses: any[];
}

export default {
  mixins: [
    idMixin,
    normalizeSlotMixin,
    itemMixin,
    theadMixin,
    tbodyMixin,
  ],
  // Don't place ATTRS on root element automatically, as table could be wrapped in responsive div
  inheritAttrs: false,
  props: {
    hasHover: {
      type: Boolean
    },
    isStriped: {
      type: Boolean
    },
  },
  data() {
    return {};
  },
  computed: {
    computedItems() {
      return this.localItems || [];
    },
    tableClasses() {
      return [
        'm-table',
        this.hasHover ? 'm-table--hover': '',
        this.isStriped ? 'm-table--striped' : '',
      ];
    },
    tableAttrs() {
       // Preserve user supplied aria-describedby, if provided in $attrs
      const ariaDescribedBy = [(this.$attrs || {})['aria-describedby']].filter(Boolean).join(' ') || null;
      const items = this.computedItems;
      const fields = this.computedFields;
      return {
        // Merge in user supplied $attrs if any
        ...this.$attrs,
        // Now we can override any $attrs
        id: this.safeId(),
        role: 'table',
        'aria-colcount': String(fields.length),
        'aria-describedby': ariaDescribedBy,
      };
    },
  },
  methods: {

  },
  render(h) {

    // Build the thead
    const thead = this.renderThead();

    // Build the tbody
    const tbody = this.renderTbody();

    const table = h("table", {
            attrs: this.tableAttrs,
            class: this.tableClasses
        },
        [thead, tbody]
    );

    return table;
  },

};