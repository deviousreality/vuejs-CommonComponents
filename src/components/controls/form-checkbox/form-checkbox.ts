import idMixin from '@/mixins/id';
import formMixin from '@/mixins/form';
import formRadioCheckMixin from '@/mixins/form-radio-check';
import looseEqual from '@/utils/loose-equal';
import { isArray } from '@/utils/array';

const looseIndexOf = (arr, val) => {
    // Assumes that the first argument is an array
    for (let i = 0; i < arr.length; i++) {
        if (looseEqual(arr[i], val)) {
            return i
        }
    }
    return -1
}


export default {
    mixins: [
        idMixin,
        formMixin,
        formRadioCheckMixin, // Includes shared render function
    ],
    inject: {
        inGroup: {
            from: 'checkGroup',
            default: false
        }
    },
    props: {
        checked: {
            // v-model
            type: [String, Number, Object, Array, Boolean],
            default: null
        },
        indeterminate: {
            // Not applicable in multi-check mode
            type: Boolean,
            default: false
        },
        uncheckedValue: {
            // type: [Object, Boolean],
            // Not applicable in multi-check mode
            default: false
        },
        value: {
            // [Object, Boolean],
            default: true
        },
    },
    computed: {
        isChecked(): boolean {
            const checked = this.computedLocalChecked;
            const value = this.value;
            if (isArray(checked)) {
                return looseIndexOf(checked, value) > -1;
            } else {
                return looseEqual(checked, value);
            }
        },
        isCheck(): boolean {
            return true;
        },
        isRadio(): boolean {
            return false;
        },
    },
    watch: {
        computedLocalChecked(newVal): void {
            this.$emit('input', newVal);
            if (this.$refs && this.$refs.input) {
                this.$emit('update:indeterminate', this.$refs.input.indeterminate);
            }
        },
        indeterminate(newVal): void {
            this.setIndeterminate(newVal);
        }
    },
    mounted() {
        // set the initial indeterminate state
        this.setIndeterminate(this.indeterminate);
    },
    methods: {
        handleChange({ target: { checked, indeterminate } }): void {
            window.console.log('form-checkbox: handleChange');
            window.console.log(`BEFORE: checked ${checked} | localChecked ${this.localChecked} | computedLocalChecked ${this.computedLocalChecked}`);
            window.console.log(`isChecked ${this.isChecked}`);

            let localChecked = this.computedLocalChecked;
            const value = this.value;
            const isArr = isArray(localChecked);
            const uncheckedValue = isArr ? null : this.uncheckedValue;

            // Update computedLocalChecked
            if (isArr) {
                const idx = looseIndexOf(localChecked, value);
                if (checked && idx < 0) {
                    // Add value to array
                    localChecked = localChecked.concat(value);
                } else if (!checked && idx > -1) {
                    // Remove value from array
                    localChecked = localChecked.slice(0, idx).concat(localChecked.slice(idx + 1));
                }
            } else {
                localChecked = checked ? value : uncheckedValue;
            }
            this.computedLocalChecked = localChecked;
            // Change is only emitted on user interaction
            this.$emit('change', checked ? value : uncheckedValue)
            // if this is a child of form-checkbox-group, we emit a change event
            if (this.isGroup) {
                this.inGroup.$emit('change', localChecked)
            }
            this.$emit('update:indeterminate', indeterminate);
            window.console.log(`AFTER: checked ${checked} | localChecked ${this.localChecked} | computedLocalChecked ${this.computedLocalChecked}`);
            window.console.log(`isChecked ${this.isChecked}`);

        },
        setIndeterminate(state): void {
            // Indeterminate only supported in single checkbox mode
            if (isArray(this.computedLocalChecked)) {
                state = false;
            }

            if (this.$refs && this.$refs.input) {
                this.$refs.input.indeterminate = state;
                // Emitupdate event to prop
                this.$emit('update:indeterminate', state);
            }
        }
    },
};