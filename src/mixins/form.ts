import { requestAF, isVisible, matches, select } from "@/utils/dom";

export interface FormModelMixin {
  name: string;
  id: string;
  disabled: boolean;
  required: boolean;
}

const SELECTOR = 'input, textarea, select';

export default {
  props: {
    autofocus: {
      type: Boolean,
      default: false
    },
    name: {
      type: String
    },
    id: {
      type: String
    },
    disabled: {
      type: Boolean
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.handleAutofocus();
  },
  activated() /* test cannot reach */ {
    this.handleAutofocus();
  },
  methods: {
    handleAutofocus(): void {
      this.$nextTick(() => {
        requestAF(() => {
          let el = this.$el
          if (this.autofocus && isVisible(el)) {
            if (!matches(el, SELECTOR)) {
              el = select(SELECTOR, el);
            }
            el && el.focus && el.focus();
          }
        });
      });
    },
  }
}