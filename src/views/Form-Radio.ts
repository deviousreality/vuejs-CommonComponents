import FormRadioGroup from "@/components/controls/form-radio/form-radio-group.vue";
import FormRadio from "@/components/controls/form-radio/form-radio.vue";

export default {
    data() {
        return {
            radioGroupSelected: 'first',
            radioGroupOptions: [
                { text: 'Toggle this custom radio', value: 'first' },
                { text: 'Or toggle this other custom radio', value: 'second' },
                { text: 'This one is Disabled', value: 'third', disabled: true },
                { text: 'This is the 4th radio', value: { fourth: 4 } }
            ],
            ariaInvalid: '',
        }
    },
    components: {
        formRadioGroup: FormRadioGroup,
        formRadio: FormRadio
    }
}
