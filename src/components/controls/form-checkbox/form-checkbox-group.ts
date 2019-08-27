import idMixin from '@/mixins/id';
import formMixin from '@/mixins/form';
import formOptionsMixin from '@/mixins/form-options';
import formStateMixin from '@/mixins/form-state';

import FormCheckbox from './form-checkbox.vue';

export default {
    mixins: [
        idMixin,
        formMixin,
        formOptionsMixin,
        formStateMixin
    ],
    components: {
        formCheckbox: FormCheckbox
    },
    render(h) {
        const slots = this.$slots;
        const checks = this.formOptions.map((option, idx) => {
            return h('form-checkbox', {
                key: `check-${idx}_opt`,
                props: {
                    disabled: option.disabled,
                    id: this.safeId(`_BV_check_${idx}_opt_`),
                    name: this.name,
                    required: Boolean(this.name && this.required),
                    value: option.value
                }
            },
            [h('span', { domProps: { innerHTML: option.text } })]
            );
        });

        return h('div', {
            class: null,
            attrs: {
                id: this.safeId(),
                role: 'group',
                tabindex: '-1',
                'aria-required': this.required ? 'true' : null,
                'aria-invalid': null,
            }
        },
        [
            slots.first, 
            checks, 
            slots.default]
        );
    },
    data() {
        return {
            localChecked: this.checked || [],
            //flag for children
            isRadioCheckGroup: true
        }
    },
    model: {
        prop: 'checked',
        event: 'input'
    },
    props: {
        checked: {
            type: [String, Number, Object, Array, Boolean],
            default: null
        },
        validated: {
            type: Boolean,
            default: false
        },
        ariaInvalid: {
            type: [Boolean, String],
        },
        stacked: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        checked() {
            this.localChecked = this.checked
        },
        localChecked(newVal) {
            this.$emit('input', newVal);
        }
    },
}