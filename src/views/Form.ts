import AForm from '../components/common/form/form.vue';
import FormGroup from '../components/controls/form-group/form-group.vue';
import FormInput from '../components/controls/form-input/form-input.vue';

export default {
    data() {
        return {
            form: {
                input1: ''
            }
        }
    },
    components: {
        aform: AForm,
        formGroup: FormGroup,
        formInput: FormInput
    }
}
