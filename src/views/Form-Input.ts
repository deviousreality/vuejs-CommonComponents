import Vue from 'vue';
import FormInput from "../components/controls/form-input/form-input.vue";

interface Model extends Vue {
    input1: string;
    inputBlank: string
}

export default {
  data() {
    return {
      input1: "Ziggy Stardust",
      inputBlank: ""
    };
  },
  components: {
    formInput: FormInput
  },
  computed: {
    input1State(this: Model): boolean {
      return this.inputBlank.length > 2 ? true : false;
    },

  },

};
