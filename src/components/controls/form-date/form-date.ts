import DatePicker from "vuejs-datepicker";

export default {
  components: {
    datePicker: DatePicker
  },
  methods: {
    onInput(event) {
      this.$emit('input', event);
    }
  }
};
