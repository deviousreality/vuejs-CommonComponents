import Vue from 'vue';
import { isArray, isNull, isUndefined } from '@/utils/inspect';
import normalizeFields from './normalize-fields';

export interface ItemsMixin extends Vue {
    items: () => void | any[];
    fields: any[] | object;
    primaryKey: string;
    localItems: any[];
    computedFields: any[];
}

export default {
    props: {
        items: {
            type: [Array, Function],
            default() {
                return [];
            }
        },
        fields: {
            type: [Object, Array],
            default: null
        },
        primaryKey: {
            // Primary key for record.
            // If provided the value in each row must be unique!!!
            type: String,
            default: null
        },
    },
    data() {
        return {
            localItems: isArray(this.items) ? this.items.slice() : []
        };
    },
    computed: {
        computedFields() {
            return normalizeFields(this.fields, this.localItems);
        },
    },
    watch: {
        items(newItems: any[]) {
            if(isArray(newItems)) {
                this.localItems = newItems.slice();
            } else if(isUndefined(newItems) || isNull(newItems)) {
                this.localItems = [];
            }
        }
    }
}