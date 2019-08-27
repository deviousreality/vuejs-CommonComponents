import idMixin from '@/mixins/id';
import formMixin from '@/mixins/form';

export default {
    mixins: [idMixin, formMixin],
    props: {
        // Instruct input to capture from camera
        capture: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            default: undefined
        },
        plain: {
            type: Boolean,
            default: false,
        },
        multiple: {
            type: Boolean,
            default: false
        },
        
    },
    data() {
        return {
            selectedFile: null,
            hasFocus: false
        }
    },
    computed: {
        inputClass() {
            return 'm-form-file';
        },
        selectLabel() {
            // no file choosen
            if(!this.selectedFile || this.selectedFile.length === 0) {
                return this.placeholder;
            }

            // multiple files
            if(this.multiple) {
                if(this.selectedFile.length === 1) {
                    return this.selectedFile[0].name;
                }
                return this.selectedFile.map(file => file.name).join(', ');
            }

            // Single File
            return this.selectedFile.name;
        }
    },

    watch: {
        selectedFile(newVal, oldVal) {
            if(newVal === oldVal) {
                return;
            }
            if(!newVal && this.multiple) {
                this.$emit('input', []);
            } else {
                this.$emit('input', newVal);
            }
        }
    },

    methods: {
      onFileChange(event) {
        // Always emit original event
        this.$emit('change', event);
        this.setFiles(event.target.files || event.dataTransfer.files)
      },

      setFiles(files = []) {
        if (!files) {
            this.selectedFile = null
          } else if (this.multiple) {
            // Convert files to array
            const filesArray = []
            for (let i = 0; i < files.length; i++) {
              filesArray.push(files[i])
            }
            // Return file(s) as array
            this.selectedFile = filesArray
          } else {
            // Return single file object
            this.selectedFile = files[0] || null
          }
            }
    },

}