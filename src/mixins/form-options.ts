/** 
 * Form options mixin
 */
import Vue from 'vue';
import { keys, isObject } from "@/utils/object";
import { isArray } from '@/utils/array';

export interface FormOptionsMixin extends Vue {
    disabledField: string;
    options: [] | {};
    textField: string;
    valueField: string;
}

export default {
    props: {
        options: {
            type: [Array, Object],
            default() {
                return [];
            }
        },
        valueField: {
            type: String,
            default: 'value'
        },
        textField: {
            type: String,
            default: 'text'
        },
        disabledField: {
            type: String,
            default: 'disabled'
        }
    },
    computed: {
        formOptions: function(this: FormOptionsMixin) {
            let options = this.options;
            const valueField = this.valueField;
            const textField = this.textField;
            const disabledField = this.disabledField;

            if(isArray(options)) {
                // Normalize flat-ish arrays to Array of Objects
                return options.map((option: any) => {
                    if(isObject(option)) {
                        return {
                            value: option[valueField],
                            text: String(option[textField]),
                            disabled: option[disabledField] || false
                        };
                    }
                    return {
                        value: option,
                        text: String(option),
                        disabled: false
                    };
                });
            } else {
                // options is Object
                // Normalize Objects to Array of Objects
                return keys(options).map((key) => {
                    let option = options[key] || {} as any;
                    if(isObject(option)) {
                        const value = option[valueField];
                        const text = option[textField];
                        return {
                            value: typeof value === 'undefined' ? key : value,
                            text: typeof text === 'undefined' ? key: String(text),
                            disabled: option[disabledField] || false
                        };
                    }
                    return {
                        value: key,
                        text: String(option),
                        disabled: false
                    };
                });
            }
        }
    }
};