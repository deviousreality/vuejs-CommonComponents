import idMixin from "@/mixins/id";
import formOptionsMixin from "@/mixins/form-options";
import formMixin from "@/mixins/form";
import formStateMixin from "@/mixins/form-state";
import FormRadio from "./form-radio.vue";

export default {
    mixins: [
        idMixin,
        formMixin,
        formStateMixin,
        formOptionsMixin,
    ],
    components: {
        formRadio: FormRadio
    },
    render(h) {
        const slots = this.$slots;
        const radios = this.formOptions.map((option, idx) => {
            return h('form-radio', {
                key: `radio_${idx}_opt`,
                props: {
                    id: this.safeId(`_BV_radio_${idx}_opt_`),
                    name: this.name,
                    value: option.value,
                    required: Boolean(this.name && this.required),
                    disabled: option.disabled
                }
            },
                [h('span', { domProps: { innerHTML: option.text } })]
            )
        });

        return h('div', {
            class: [],
            attrs: {
                id: this.safeId(),
                role: 'radiogroup',
                tabindex: '-1',
                'aria-requierd': this.required ? 'true' : null,
                'aria-invalid': this.computedAriaInvalid,
            }
        },
            [
                slots.first,
                radios,
                slots.default
            ]);
    },
    data() {
        return {
            localChecked: this.checked,
            // Flag for children
            isRadioCheckGroup: true,
        }
    },
    model: {
        prop: 'checked',
        event: 'input'
    },
    props: {
        checked: {
            type: [String, Object, Number, Boolean],
            default: null
        },
        ariaInvalid: {
            type: [Boolean, String],
            default: false
        },
    },
    computed: {
        computedAriaInvalid() {
            const ariaInvalid = this.ariaInvalid;
            if (ariaInvalid === true || ariaInvalid === 'true' || ariaInvalid === '') {
                return true;
            }
            return this.computedState === false ? 'true' : null;
        }
    },
    watch: {
        checked() {
            this.localChecked = this.checked;
        },
        localChecked(newVal) {
            this.$emit('input', newVal);
        }
    },
}