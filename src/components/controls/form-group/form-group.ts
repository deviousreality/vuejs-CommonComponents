import { selectAll, isVisible } from '@/utils/dom';
import idMixin from '@/mixins/id';
import formStateMixin from '@/mixins/form-state';

// Selector for finding firt input in the form-group
const SELECTOR = 'input:not(:disabled),textarea:not(:disabled),select:not(:disabled)';

export default {
  mixins: [idMixin, formStateMixin],
  components: {},
  render(h) {
    const $slots = this.$slots;

    // Label / Legend
    let legend = h(false);
    if(this.hasLabel) {
      let children = $slots['label'];
      const legendTag = this.labelFor ? 'label' : 'legend';
      const legendDomProps = children ? {} : { innerHTML: this.label };
      const legendAttrs = { id: this.labelId, for: this.labelFor || null };
      const legendClick = (this.labelFor || this.labelSrOnly) ? {} : { click: this.legendClick };

      // Vertical layout with label
      const legendHtml = h(
        legendTag,
        {
          class: this.labelSrOnly ? [ 'sr-only' ] : this.labelClasses,
          attrs: legendAttrs,
          domProps: legendDomProps,
          on: legendClick
        }, children
      );

      legend = h('div', {class: 'u-ellipsis-2' },
      [
        h('div', { class: 'l-block-middle' }, 
        [
          legendHtml
        ])
      ])
    }

    // Build content layout
    const content = h(
      'div', 
      { 
        ref: 'content',
        class: 'm-input-group',
        attrs: this.labelFor ? {} : { role: 'group', 'aria-labelledby': this.labelId }
      },
      [ $slots['default'] ]
    );

    // Generate main form-group wrapper
    return h(
      this.labelFor ? 'div' : 'fieldset',
      {
        class: this.groupClasses,
        attrs: {
          id: this.safeId(),
          disabled: this.disabled,
          role: 'group', 
          'aria-labelledy': this.labelId,
        }
      },
      [ legend, content ]
    );

  },
  props: {
    label: {
      type: String,
      default: null
    },
    labelFor: {
      type: String,
      default: null
    },
    labelIcon: {
      type: String,
      default: null
    },
    labelSrOnly: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    groupClasses() {
      return ["m-form-group"];
    },
    labelClasses() {
      return ["m-form-label"];
    },
    hasLabel() {
      return this.label || this.$slots["label"];
    },
    labelId() {
      return this.hasLabel ? this.safeId("_TM_label_") : null;
    },
  },

  methods: {
    legendClick(event) {
      const tagName = event.target ? event.target.tagName : '';
      if(/^(input|select|textarea|label)/i.test(tagName)) {
        // if clicked an input inside legend, we just let the default happen
        return;
      }
      // Focus the first non-disabled visible input when the legend element is clicked
      const inputs = selectAll(SELECTOR, this.$refs.content).filter((ele) => isVisible(ele as HTMLElement)) as HTMLElement[];
      if(inputs[0] && inputs[0].focus) {
        inputs[0].focus();
      }
    }
  },

  mounted() {
    this.$nextTick(() => {});
  }
};