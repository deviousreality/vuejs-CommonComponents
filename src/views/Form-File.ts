import FormFile from "../components/controls/form-file/form-file.vue";

export default {
  components: {
    formFile: FormFile
  },
  data() {
    return {
      file: null,
      fileMultiple: null,
      filePlain: null
    };
  }
};
