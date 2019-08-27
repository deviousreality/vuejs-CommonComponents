import FormSelect from "../components/controls/form-select/form-select.vue";

export default {
    data() {
        return {
            inputNull: null,
            input1Option: "1",
            inputMultiple: ['2'],
            options: [
                {value: null, text: 'Please make a selection'},
                {value: '1', text: 'Ground Control'},
                {value: '2', text: 'MajorTom'},
                {value: '3', text: 'Are you there?'},
                {value: '4', text: 'Disabled Box', disabled: true},
                //{value: {'5': 'Diamond Dogs'}, text: 'This option contains an object value' },
            ],
                checkboxGroupSelected: [],
                checkboxGroupOptions: [
                {text: 'Orange', value: 'orange'},
                {text: 'Apple', value: 'apple'},
                {text: 'Pineapple', value: 'pineapple'},
                {text: 'Grape', value: 'grape'}
            ],
        }
    },
    components: {
        formSelect: FormSelect,
    }
}
