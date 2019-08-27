import Vue, { VNode } from 'vue';
import { hasNormalizedSlot, normalizeSlot } from '../utils/normalize-slot';
import { concat } from '../utils/array';
import { ScopedSlot, VNodeChildrenArrayContents } from 'vue/types/vnode';

export interface NormalizeSlotMixin {
    hasNormalizedSlot: (name: string | number) => boolean;
    normalizeSlot: (name: string | number, scope: { [key: string]: VNode[] }) => string | ScopedSlot | VNodeChildrenArrayContents;
}

export default {
    methods: {
        hasNormalizedSlot(name): boolean {
            // Returns true if the either a $scopedSlot or $slot exists with the specified name
            return hasNormalizedSlot(name, this.$scopedSlots, this.$slots);
        },
        normalizeSlot(name, scope) {
            // Returns an array of rendered vNodes if slot found.
            // Returns undefined if not found.
            const vNodes = normalizeSlot(name, scope, this.$scopedSlots, this.$slots);
            return vNodes ? concat(vNodes) : vNodes;
        },
    }
}