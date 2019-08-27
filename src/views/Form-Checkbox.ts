import FormCheckbox from '../components/controls/form-checkbox/form-checkbox.vue';
import FormCheckboxGroup from '../components/controls/form-checkbox/form-checkbox-group.vue';

export default {
    data() {
        return {
            checkboxDefaultNull: null,
            checkboxDefault: false,
            checkboxDefaultValues: 'no',
            checkboxGroupSelected: ['orange'],
            checkboxGroupOptions: [
                { text: 'Orange', value: 'orange' },
                { text: 'Apple', value: 'apple' },
                { text: 'Pineapple', value: 'pineapple' },
                { text: 'Grape', value: 'grape' }
            ],
            testOptions1: ['one', 'two', 'three'],
            testChecked1: [],
            testState1: true,
        }
    },
    components: {
        formCheckbox: FormCheckbox,
        formCheckboxGroup: FormCheckboxGroup,
    },
    methods: {
    }
}
