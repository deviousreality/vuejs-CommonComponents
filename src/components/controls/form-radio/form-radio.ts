/** base synstax  
 * <form-radio
 *  id="id1"
 *  name="name1"
 *  type="radio"
 *  v-model="input1"></form-radio>
*/

import idMixin from "@/mixins/id";
import formMixin from "@/mixins/form";
import formRadioCheckMixin from "@/mixins/form-radio-check";
import looseEqual from '@/utils/loose-equal';

export default {
    mixins: [
        idMixin, 
        formRadioCheckMixin, 
        formMixin
    ],
    render(h) {
        const input =  h('input', {
            ref: 'radio',
            //class: 'sr-only',
            directives: [
                {
                    name: 'model',
                    value: this.computedLocalChecked,
                    expression: 'computedLocalChecked'
                }
            ],
            attrs: {
                id: this.safeId(),
                type: 'radio',
                name: this.getName,
                required: this.getName && this.isRequired,
                disabled: this.isDisabled,
                autocomplete: 'off'
            },
            domProps: {
                value: this.value,
                checked: looseEqual(this.computedLocalChecked, this.value)
            },
            on: {
                change: this.emitChange,
                click: () => {                    
                    this.computedLocalChecked = this.value;
                }
            }

        });
        const inputWrapper = h('span', { class: 'm-form-check__input' }, [input]);

        const label = h('label', { 
            class: 'm-form-label', 
            attrs: { 
                for: this.safeId() 
            }
        },
        [this.$slots.default]
        );
        const labelWrapper = h('span', {class: 'm-form-check__label'}, [label]);

        return h('div', { 
            class: [
                    'm-form-check',
                    this.isStacked ? null : 'm-form-check--inline'
                    ]
        }, 
        [
            inputWrapper, 
            labelWrapper
        ]);
    },
    watch: {
        checked(newVal) {
            this.computedLocalChecked = newVal
        },
        computedLocalChecked() {
            this.$emit('input', this.computedLocalChecked);
        }
    },
    computed: {
        isChecked () {
            return looseEqual(this.value, this.computedLocalChecked);
        },
    },
    methods: {
        emitChange({target: {checked}}) {
            // change is only emitted on user interaction
            this.$emit('change', checked ? this.value : null);
            // if this is a child of form-radio-group, we emit a change event on it as well
            if(this.isChild) {
                this.$parent.$emit('change', this.computedLocalChecked);
            }
        }
    }
}