
import { mergeData } from 'vue-functional-data-merge';

export const props = {
    id: {
        type: String,
        default: null
    },
    inline: {
        type: Boolean,
        default: false
    },
    novalidate: {
        type: Boolean,
        default: false
    },
    validated: {
        type: Boolean,
        default: false
    }
};

export default {
    functional: true,
    props: props,
    render(h, { props, data, children }: any) {
        return h('form', 
            mergeData(data, {
                class: {
                    'form-inline': props.inline,
                    'form-is-validated': props.validated
                },
                attrs: {
                    id: props.id,
                    novalidate: props.novalidate
                }
            }),
            children
        );
    }
}