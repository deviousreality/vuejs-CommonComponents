/** base synstax 
 * <form-input 
 *  id="id1"
 *  name="name1" 
 *  placeholder="This is a text" 
 *  type="text"
 *  v-model="input1"></form-input>
 */
const TYPES = [
  'text',
  'password',
  'email',
  'number',
  'url',
  'tel',
  'search',
  'range',
  'color',
  'date',
  'time',
  'datetime',
  'datetime-local',
  'month',
  'week'
];

import idMixin from '@/mixins/id';
import formMixin from '@/mixins/form';
import stateMixin from '@/mixins/form-state';

export default {
  mixins: [idMixin, formMixin, stateMixin],
  render(h) {
      const self = this;
      return h('input', {
          ref: 'input',
          class: self.computedClass,
          attrs: {
              id: this.safeId(),
              name: this.name,
              disabled: this.disabled,
              required: this.required,
              readonly: this.readonly || (this.plaintext && this.readonly === null),
              type: this.localType,
              placeholder: this.placeholder,
              autocomplete: this.autocomplete || null,
              'aria-required': this.required ? 'true' : null,
              'aria-invalid': this.computedAriaInvalid,
              value: this.value,
          },
          on: {
              ...this.$listeners,
              input: this.onInput,
              change: this.onChange
          }
      })
  },
  props: {
      value: {
          default: null
      },
      type: {
          type: String,
          default: 'text',
          validator: type => TYPES.indexOf(type) !== -1
      },
      ariaInvalid: {
          type: [Boolean, String],
          default: false
      },
      readonly: {
          type: Boolean,
          default: null
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
      formatter: {
          type: Function
      },
      lazyFormatter: {
          type: Boolean,
          default: false
      }
  },

  computed: {
      localType() {
          return TYPES.indexOf(this.type) !== -1 ? this.type : 'text';
      },
      computedClass() {
          return [
              'm-form-input',
              this.stateClass
          ];
      },
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
      }
  },
  mounted() {
      if (this.value) {
          const fValue = this.format(this.value, null);
          this.setValue(fValue);
      }
  },
  watch: {
      value(newVal) {
          if (this.lazyFormatter) {
              this.setValue(newVal);
          } else {
              const fValue = this.format(newVal, null);
              this.setValue(fValue);
          }
      }
  },

  methods: {
      format(value, e) {
          if (this.formatter) {
              return this.formatter(value, e);
          }
          return value;
      },
      setValue(value) {
          this.$emit('input', value);
          // When formatter removes last typed character, value of text input should update to formatted value
          this.$refs.input.value = value;
      },
      onInput(event) {
          const value = event.target.value;

          if (this.lazyFormatter) {
              this.setValue(value);
          } else {
              const fValue = this.format(value, event);
              this.setValue(fValue);
          }
      },
      onChange(event) {
          const fValue = this.format(event.target.value, event);
          this.setValue(fValue);
          this.$emit('change', fValue);
      }
  }
};