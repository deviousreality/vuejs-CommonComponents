import idMixin from '@/mixins/id';
import formMixin from '@/mixins/form';
import formOptionsMixin from '@/mixins/form-options';

import FormSelectButton from './form-select-buttonbox.vue';
import FormCheckbox from '../form-checkbox/form-checkbox.vue';
import FormRadio from '../form-radio/form-radio.vue';

export default {
    mixins: [
        idMixin,
        formMixin,
        formOptionsMixin,
    ],
    components: {
        formCheckbox: FormCheckbox,
        formRadio: FormRadio,
        formSelectButton: FormSelectButton
    },
    render(h) {
        const slots = this.$slots;
        const button = h('form-select-button', {
            props: {
                options: this.formOptions,
                checked: this.localChecked
            },
            on: {
                click: this.toggle
            }
        });
        
        const listComponent = this.isIcons ? 'form-radio' : 'form-checkbox';
        const listItems = this.formOptions.map((option, idx) => {
            const checkbox = h(listComponent, {
                key: `check-${idx}_opt`,
                props: {
                    disabled: option.disabled,
                    id: this.safeId(`_BV_check_${idx}_opt_`),
                    required: Boolean(this.name && this.required),
                    value: option.value
                }
            },
            [h('span', { domProps: { innerHTML: option.text } })]
            );
            return h('li', { domProps: {role: 'option'} }, [checkbox]);
        });
        const container = h('div', {
            class: this.isOpen ? null : 'u-hide'
        }, [
            h('ul', {} , [listItems])
        ]);

        return h('div', {
            class: ['ms-parent'],
            attrs: {
                id: this.safeId(),
                role: 'group',
                tabindex: '-1',
                'aria-required': this.required ? 'true' : null,
                'aria-invalid': null,
            }
        },
        [
            button,
            slots.first, 
            container, 
            slots.default
        ]
        );
    },
    data() {
        return {
            localChecked: this.checked || [],
            //flag for children
            isRadioCheckGroup: true,
            isOpen: false,
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
        isIcons: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        toggle(newVal) {
            this.isOpen = newVal;
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