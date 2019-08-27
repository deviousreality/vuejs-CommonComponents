import idMixin from "@/mixins/id";
import formMixin from "@/mixins/form"
import formOptionsMixin from "@/mixins/form-options"

import FormSelectExtended from './form-select-extended.vue';

export default {
    components: {
        formSelectExtended: FormSelectExtended,
    },
    mixins: [
        idMixin,
        formMixin,
        formOptionsMixin

    ],

    render(h) {
        const $slots = this.$slots;
        const options = this.formOptions.map((option, index) => {
            return h('option', {
                key: `option_${index}_opt`,
                attrs: {
                    disabled: Boolean(option.disabled),
                },
                domProps: {
                    innerHTML: option.text,
                    value: option.value
                }
            });
        });
        const select = h('select', {
            ref: 'input',
            class: [this.multiple || this.icons ? 'u-hide' : null],
            attrs: {
                id: this.safeId(),
                name: this.name,
                required: this.required,
                size: this.computedSelectSize,
                multiple: this.multiple || null,
                'aria-required': this.required ? 'true' : null,
                'aria-invalid': this.computedAriaInvalid
            },
            directives: [
                {
                    name: 'model',
                    value: this.localValue,
                    expression: 'localValue'
                }
            ],
            on: {
                change: (event) => {
                    const target = event.target;
                    const selectedVal = Array.from(target.options)
                        .filter((o) => (o as HTMLOptionElement).selected)
                        .map((o) => ('_value' in (o as any) ? (o as any)._value : (o as HTMLOptionElement).value));

                    this.localValue = target.multiple ? selectedVal : selectedVal[0];
                    this.$emit('change', this.localValue);
                }
            }
        },
            [$slots.first, options, $slots.default]
        );

        let multipleContainer = null;
        if (this.multiple) {
            multipleContainer = h('form-select-extended', {
                props: {
                    name: this.name,
                    checked: this.localValue,
                    options: this.formOptions
                },
                on: {
                    input: (newVal) => {
                        this.localValue = newVal;
                    }
                }
            });
        } else if (this.icons) {
            multipleContainer = h('form-select-extended', {
                props: {
                    name: this.name,
                    checked: this.localValue,
                    options: this.formOptions,
                    isIcons: true
                },
                on: {
                    input: (newVal) => {
                        this.localValue = newVal;
                    }
                }
            });
        }

        return h('div', {
            class: [this.inputClass]
        },
            [select, multipleContainer]
        );
    },

    data() {
        return {
            localValue: this.value
        }
    },

    props: {
        value: {},
        multiple: {
            type: Boolean,
            default: false
        },
        icons: {
            type: Boolean,
            default: false,
        },
        selectSize: {
            // Browsers default size to 0, which shows 4 rows in most browsers in multiple mode
            // Size of 1 can bork out firefox
            type: Number,
            default: 0
        },
        ariaInvalid: {
            type: [Boolean, String],
            default: false
        }
    },

    computed: {
        computedSelectSize() {
            // Custom selects with a size of zero causes the arrows to be hidden,
            // so dont render the size attribute in this case
            return !this.plain && this.selectSize === 0 ? null : this.selectSize;
        },
        inputClass() {
            return [
                'm-form-select'
            ];
        },
        computedAriaInvalid() {
            if (this.ariaInvalid === true || this.ariaInvalid === 'true') {
                return 'true';
            }
            return this.stateClass === 'is-invalid' ? 'true' : null;
        },

    },

    watch: {
        value(newVal) {
            this.localValue = newVal;
        },
        localValue() {
            this.$emit('input', this.localValue);
        }
    },
}