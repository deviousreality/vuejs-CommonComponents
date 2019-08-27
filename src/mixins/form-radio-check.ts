import Vue from 'vue';
import NormalizeSlotMixin from '@/mixins/normalize-slot';

/** 
 * Form radio and checkbox mixin
 */
export interface FormRadioCheckboxMixin extends Vue {
    computedLocalChecked: (args?: any) => void;
    localChecked: boolean;
    value: any;
    checked: any;
    isGroup: boolean;
    getName: string | null;
    isDisabled: boolean;
    isRequired: boolean;
    disabled: boolean;
    required: boolean;
    isStacked: Boolean;
    stacked: Boolean;
    name: string;

    form: string;
    inGroup: any;
}

export default {
    mixins: [NormalizeSlotMixin],
    model: {
        prop: 'checked',
        event: 'input'
    },
    props: {
        ariaLabel: {
            // Placed on the input if present.
            type: String,
            default: null
        },
        ariaLabelledby: {
            // Placed on the input if present.
            type: String,
            default: null
        },
        checked: {
            // This is the v-model
            // type: Object,
            // default: undefined
        },
        stacked: {
            type: Boolean,
            default: false
        },
        value: {
            // Value when checked
            // type: Object,
            // default: undefined
        },
    },
    data(this: FormRadioCheckboxMixin): any {
        return {
            localChecked: (this.isGroup ? this.inGroup.checked : this.checked),
        };
    },
    computed: {
        computedLocalChecked: {
            get: function (this: FormRadioCheckboxMixin) {
                return this.isGroup ? this.inGroup.localChecked : this.localChecked;
            },
            set: function (this: FormRadioCheckboxMixin, val: boolean) {
                window.console.log(`computedLocalChecked:set ${val}`);
                if (this.isGroup) {
                    this.inGroup.localChecked = val;
                } else {
                    this.localChecked = val;
                }
            }
        },
        getForm(this: FormRadioCheckboxMixin): string | null {
            return (this.isGroup ? this.inGroup.form : this.form) || null;
        },
        getName: function (this: FormRadioCheckboxMixin): string | null {
            return (this.isGroup ? this.inGroup.groupName : this.name) || null;
        },
        isGroup: function (this: FormRadioCheckboxMixin): boolean {
            return Boolean(this.inGroup);
        },
        isDisabled: function (this: FormRadioCheckboxMixin): boolean {
            // Child can be disabled while parent isn't, but is always disabled if group is
            return this.isGroup ? this.inGroup.disabled || this.disabled : this.disabled;
        },
        isRequired: function (this: FormRadioCheckboxMixin): boolean {
            // Required only works when a name is provided for the input(s)
            // Child can only be required when parent is
            // Groups will always have a name (either user supplied or auto generated)
            return Boolean(this.getName && (this.isGroup ? this.inGroup.required : this.required))
        },
        isStacked: function (this: FormRadioCheckboxMixin): boolean {
            return this.isGroup ? this.inGroup.stacked : this.stacked;
        }
    },
    watch: {
        checked(newVal): void {
            window.console.log(`FormRadioCheckboxMixin: watched ${newVal}`);
            this.computedLocalChecked = newVal;
        }
    },
    methods: {

    },
    render(h) {
        const defaultSlot = this.normalizeSlot('default');

        const input = h('input', {
            ref: 'input',
            key: 'input',
            on: {
                change: this.handleChange,
            },
            directives: [
                {
                    name: 'model',
                    rawName: 'v-model',
                    value: this.computedLocalChecked,
                    expression: 'computedLocalChecked'
                }
            ],
            attrs: {
                autocomplete: 'off',
                disabled: this.isDisabled,
                form: this.getForm,
                id: this.safeId(),
                name: this.getName,
                required: this.isRequired,
                type: this.isRadio ? 'radio' : 'checkbox',
                'aria-required': this.isRequired || null,
                'aria-label': this.ariaLabel || null,
                'aria-labelledby': this.ariaLabelledby || null,
            },
            domProps: {
                checked: this.isChecked,
                value: this.value,
            },
        });
        const inputWrapper = h('span', { class: 'm-form-check__input' }, [input]);

        const label = h(
            'label',
            {
                class: 'm-form-label',
                attrs: {
                    for: this.safeId(),
                },
            },
            defaultSlot
        );
        const labelWrapper = h('span', { class: 'm-form-check__label' }, [label]);

        return h(
            'div',
            {
                class: [
                    'm-form-check',
                    this.isStacked ? null : 'm-form-check--inline'
                ]
            },
            [
                inputWrapper,
                labelWrapper
            ]
        );
    }
};