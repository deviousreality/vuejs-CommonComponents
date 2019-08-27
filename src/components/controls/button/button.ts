import { mergeData } from 'vue-functional-data-merge';
import pluckProps from "@/utils/pluck-props";
import Anchor from '@/components/common/anchor/anchor.vue';
import {propsFactory as linkPropsFactory} from '@/components/common/anchor/anchor';

const btnPorps = {
    disabled: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        default: 'button'
    },
    tag: {
        type: String,
        default: 'button'
    },
    pressed: {
        // tri-state prop: true, false, or null
        // => on, off, not a toggle
        type: Boolean,
        default: null
    }
}

let linkProps = linkPropsFactory();
delete linkProps.href.default;
delete linkProps.to.default;
const linkPropKeys = Object.keys(linkProps);

const props = Object.assign(linkProps, btnPorps);

//const props = Object.assign(linkProps, null);
export default {
    functional: true,
    props,
    render(h, { props, data, children}: any) {
        const isLink = Boolean(props.href || props.to);
        const isToggle = null;// typeof props.pressed === 'Boolean';
        const isButtonTag = props.tag === 'button';
        const onEvents = {
            click(event: Event) {
                if(props.disabled && event instanceof Event) {
                    event.stopPropagation();
                    event.preventDefault();
                }
            }
        };
        const componentData = {
            staticClass: 'm-button',
            class: [],
            props: isLink ? pluckProps(linkPropKeys, props) : null,
            attrs: {
                type: isButtonTag && !isLink ? props.type : null,
                disabled: isButtonTag && !isLink ? props.disabled : null,
                'aria-pressed': isToggle ? String(props.pressed) : null,
                tabindex: props.disabled && isLink ? 
                    '-1' : 
                    data.attrs ? data.attrs['tabindex'] : null
            },
            on: onEvents
        };

        return h(isLink ? Anchor : props.tag, mergeData(data, componentData), children);
    }
}