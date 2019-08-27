import { mount } from '@vue/test-utils';
import TreeNodeAnchor from '@/components/common/tree-node/tree-node-anchor.vue';
import nodeData from './tree-node-data';

describe('TreeNodeAnchor', () => {
    test('Has component initialized', async () => {
        // arrange
        const wrapper = mount(TreeNodeAnchor, {
            propsData: {
                node: nodeData[0]
            },
        });
        // act

        // assert
        expect(wrapper.is(TreeNodeAnchor)).toBeTruthy();
        expect(wrapper.is('a')).toBe(true);
        expect(wrapper.find('span').exists()).toBe(false);
        expect((<any>wrapper.vm).hasChildren).toBe(false);
        expect(wrapper.attributes('aria-popup')).toBeUndefined();
        expect(wrapper.attributes('aria-expanded')).toBeUndefined();
        expect(wrapper.attributes('aria-controls')).toBeUndefined();

        wrapper.destroy();
    });

    test('Has component initialized with children', async () => {
        // arrange
        const wrapper = mount(TreeNodeAnchor, {
            propsData: {
                node: nodeData[1]
            },
        });
        // act

        // assert
        expect(wrapper.is(TreeNodeAnchor)).toBeTruthy();
        expect(wrapper.is('a')).toBe(true);
        expect(wrapper.find('span').exists()).toBe(true);
        expect((<any>wrapper.vm).hasChildren).toBe(true);
        expect(wrapper.attributes('aria-popup')).toBeDefined();
        expect(wrapper.attributes('aria-expanded')).toBeDefined();
        expect(wrapper.attributes('aria-controls')).toBe('node-02-child');

        wrapper.destroy();
    });

    test('has node ID', async () => {
        // arrange
        const wrapper = mount(TreeNodeAnchor, {
            propsData: {
                node: nodeData[0]
            },
        });
        // act

        // assert
        const anchor = wrapper.find('a');
        expect(anchor.attributes('id')).toBe('node-01');

        wrapper.destroy();
    });

    test('has node rel', async () => {
        // arrange
        const wrapper = mount(TreeNodeAnchor, {
            propsData: {
                node: nodeData[0]
            },
        });
        // act

        // assert
        const anchor = wrapper.find('a');
        expect(anchor.attributes('rel')).toBe('link-01');

        wrapper.destroy();
    });

    test('Has expanded is false', async () => {
        // arrange
        const wrapper = mount(TreeNodeAnchor, {
            propsData: {
                node: nodeData[1],
                isExpanded: false
            }
        });
        const span = wrapper.find('span');

        // act

        // assert
        expect(wrapper.attributes('aria-popup')).toBeDefined();
        expect(wrapper.attributes('aria-expanded')).toBe('false');
        expect(span.exists()).toBe(true);
        expect(span.text()).toBe('false');

        wrapper.destroy();
    });

    test('Has expanded is true', async () => {
        // arrange
        const wrapper = mount(TreeNodeAnchor, {
            propsData: {
                node: nodeData[1],
                isExpanded: true
            }
        });
        const span = wrapper.find('span');
        // act

        // assert
        expect(wrapper.attributes('aria-popup')).toBeDefined();
        expect(wrapper.attributes('aria-expanded')).toBe('true');
        expect(span.exists()).toBe(true);
        expect(span.text()).toBe('true');

        wrapper.destroy();
    });

    test('Has emit click when no children', async () => {
        // arrange
        const wrapper = mount(TreeNodeAnchor, {
            propsData: {
                node: nodeData[0],
            }
        });
        // act
        wrapper.trigger('click');

        // assert
        expect(wrapper.emitted('click')).toBeDefined();

        wrapper.destroy();
    });

    test('Has emitted click with children', async () => {
        // arrange
        const wrapper = mount(TreeNodeAnchor, {
            propsData: {
                node: nodeData[1],
            }
        });
        // act
        wrapper.trigger('click');

        // assert
        expect(wrapper.emitted('click')).toBeDefined();

        wrapper.destroy();
    });

    test('Has emitted keydown', async () => {
        // arrange
        const wrapper = mount(TreeNodeAnchor, {
            propsData: {
                node: nodeData[1],
            }
        });
        // act
        wrapper.trigger('keydown');

        // assert
        expect(wrapper.emitted('keydown')).toBeTruthy();
        wrapper.destroy();
    });

    test('Has tabindex -1 is when prop tabindex is -1', async () => {
        // arrange
        const wrapper = mount(TreeNodeAnchor, {
            propsData: {
                node: nodeData[0],
                tabindex: -1
            }
        });
        // act

        // assert
        expect(wrapper.attributes('tabindex')).toBe('-1');
        wrapper.destroy();
    });

    test('Has tabindex 0 is when prop tabindex is 0', async () => {
        // arrange
        const wrapper = mount(TreeNodeAnchor, {
            propsData: {
                node: nodeData[0],
                tabindex: 0
            }
        });
        // act
        // assert
        expect(wrapper.attributes('tabindex')).toBe('0');
        wrapper.destroy();
    });

    test('Emits a native focus event', async () => {
        // arrange
        const wrapper = mount(TreeNodeAnchor, {
            attachToDocument: true,
            propsData: {
                node: nodeData[0],
            },
        });

        // act
        wrapper.trigger('focus');

        // assert
        expect(wrapper.emitted('focus')).toBeDefined();

        wrapper.destroy();
    });

    test('Emits a native blur event', async () => {
        // arrange
        const wrapper = mount(TreeNodeAnchor, {
            propsData: {
                node: nodeData[0],
            },
        });

        // act
        wrapper.trigger('blur');

        // assert
        expect(wrapper.emitted('blur')).toBeDefined();

        wrapper.destroy();

    });

});