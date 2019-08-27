import { CreateElement, VNode } from 'vue';
import { mergeData } from 'vue-functional-data-merge';
import { from as arrayFrom } from '@/utils/array';

export interface AnchorProps {
    href?: string;
    rel?: string;
    target?: string;
    disabled?: string;
    routerTag?: string;
    to?: string;
}

export function propsFactory() {
    return {
        href: {
            type: String,
            default: null
        },
        rel: {
            type: String,
            default: null
        },
        target: {
            type: String,
            default: '_self'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        routerTag: {
            type: String,
            default: 'a'
        },
        to: {
            type: [String, Object],
            default: null
        }
    }
}

function computeTag(props, parent) {
    return Boolean(parent.$router) && props.to && !props.disabled ? 'router-link' : 'a';
}

function computeRel({ target, rel }) {
    if (target === '_blank' && rel === null) {
        return 'noopener';
    }
    return rel || null;
}

function computeHref({ disabled, href, to }, tag) {
    // We've already checked the parent.$router in computeTag,
    // so router-link means live router.
    // When deferring to Vue Router's router-link,
    // don't use the href attr at all.
    // Must return undefined for router-link to populate href.
    if (tag === 'router-link') return void 0;
    // If href explicitly provided
    if (href) return href;
    // Reconstruct href when `to` used, but no router
    if (to) {
        // Fallback to `to` prop (if `to` is a string)
        if (typeof to === 'string') return to;
        // Fallback to `to.path` prop (if `to` is an object)
        if (typeof to === 'object' && typeof to.path === 'string') {
            return to.path;
        }
    }
    // If nothing is provided use '#'
    return '#';
}

function clickHandlerFactory({ tag, href, disabled, suppliedHandler, parent }) {
    const isRouterLink = tag === 'router-link';

    return function onClick(event) {
        if (disabled && event instanceof Event) {
            // stop event from bubbling up
            event.stopPropagation();
            // kill the event loop attached to this specific EventTarget
            event.stopImmediatePropagation();
        } else {
            parent.$root.$emit('clicked::link', event);
            if (isRouterLink && event.target.__vue__) {
                event.target.__vue__.$emit('click', event);
            }
            if (typeof suppliedHandler === 'function') {
                suppliedHandler(...arrayFrom(arguments));
            }
        }

        if ((!isRouterLink && href === '#') || disabled) {
            event.preventDefault();
        }
    }
}

export default {
    functional: true,
    props: propsFactory(),
    render(h: CreateElement, { props, data, parent, children }): VNode {
        const tag = computeTag(props, parent);
        const rel = computeRel(props);
        const href = computeHref(props, tag);
        const eventType = tag === 'router-link' ? 'nativeOn' : 'on'
        const suppliedHandler = (data[eventType] || {}).click
        const handlers = { click: clickHandlerFactory({ tag, href, disabled: props.disabled, suppliedHandler, parent }) };

        const componentData = mergeData(data, {
            class: [],
            attrs: {
                rel,
                href,
                target: props.target,
                tabindex: props.disabled ? '-1' : (data.attrs ? data.attrs.tabindex : null),
                'aria-disabled': (tag === 'a' && props.disabled) ? 'true' : null
            },
            props: Object.assign(props, {
                tag: props.routerTag
            })
        }) as any;

        // If href prop exists on router-link (even undefined or null) it fails working on SSR
        if (!componentData.attrs.href) {
            delete componentData.attrs.href;
        }

        // We want to overwrite any click handler since our callback
        // will invoke the supplied handler if !props.disabled
        componentData[eventType] = Object.assign(componentData[eventType] || {}, handlers);

        return h(tag, componentData, children);
    }
}
