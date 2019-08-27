import idMiixin from "@/mixins/id";
import formMixin from "@/mixins/form";

export default {
    mixins: [idMiixin, formMixin],
    render(h) {
        return h('textarea', {
            ref: 'input',
            class: this.inputClass,
            style: this.inputStyle,
            attrs: {
                id: this.safeId(),
                name: this.name,
                disabled: this.disabled,
                required: this.required,
                autocomplete: this.autocomplete || null,
                readonly: this.readonly || this.plaintext,
                rows: this.rows,
                placeholder: this.placeholder,
                wrap: this.wrap || null,
                'aria-required': this.required ? 'true' : null,
                'aria-invalid': this.computedAriaInvalid
            },
            domProps: { value: this.value },
            directives: [
                {
                    name: 'model',
                    rawName: 'v-model',
                    value: this.localValue,
                    expression: 'localValue'
                }
            ],
            on: {
                input: (event) => {
                    this.localValue = event.target.value;
                }
            }
        });
    },
    data() {
        return {
            localValue: this.value
        }
    },

    props: {
        value: {
            type: String,
            default: ''
        },
        ariaInvalid: { 
            type: [Boolean, String],
            default: false
        },
        readonly: {
            type: Boolean,
            default: false
        },
        plaintext: {
            type: Boolean,
            default: false
        },
        autocomplete: { 
            type: String,
            default: null
        },
        placeholder: {
            type: String,
            default: null
        },
        rows: {
            type: [Number, String],
            default: null
        },
        maxRows: {
            type: [Number, String],
            default: null
        },
        wrap: {
            // 'soft', 'hard', or, 'off'. Browser default is 'soft'
            type: String,
            default: 'soft'
        },
        noResize: {
            type: Boolean,
            default: false
        }
    },
    
    computed: {
        computedAriaInvalid() {
            if (!this.ariaInvalid || this.ariaInvalid === 'false') {
                // this.ariaInvalid is null or false or 'false'
                return this.computedState === false ? 'true' : null;
            }
            if (this.ariaInvalid === true) {
                // User wants explicit aria-invalid=true
                return 'true';
            }
            // Most likely a string value (which could be 'true')
            return this.ariaInvalid;
        },
        
        inputClass() {
            return [
                'm-form-textarea',
                    this.plaintext ? 'm-form-textarea--plaintext' : null
            ];
        },
        inputStyle() {
            return {
                width: this.plaintext ? '100%': null,
                resize: this.noResize ? 'none' : null
            }
        }
    },

    watch: {
        value (newVal, oldVal) {
            // Update our localValue
            if (newVal !== oldVal) {
                this.localValue = newVal
            }
        },
        localValue (newVal, oldVal) {
            // update Parent value
            if (newVal !== oldVal) {
                this.$emit('input', newVal)
            }
        }
    },

    methods: {
        focus() {
            if(!this.disabled) {
                this.$el.focus();
            }
        }
    }
}