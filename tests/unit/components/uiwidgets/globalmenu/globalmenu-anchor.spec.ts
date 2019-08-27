import { mount } from '@vue/test-utils';
import GlobalmenuAnchor from '@/components/uiwidgets/globalmenu/globalmenu-anchor.vue';
import nodeData from '../../common/tree-node/tree-node-data';

describe.skip('GlobalmenuAnchor', () => {

    test.skip('Has component initialized', async () => {
        // arrange
        const wrapper = mount(GlobalmenuAnchor, {
            propsData: {
                nodeData: nodeData[0]
            },
        });
        // act

        // assert
        expect(wrapper.is(GlobalmenuAnchor)).toBeTruthy();
        expect(wrapper.is('a')).toBe(true);
        expect((<any>wrapper.vm).hasChildren).toBe(false);
        expect(wrapper.attributes('aria-popup')).toBeUndefined();
        expect(wrapper.attributes('aria-expanded')).toBeUndefined();
        expect(wrapper.attributes('aria-controls')).toBe('node-01-child');
        expect(wrapper.find('.m-menu-link__collapse').exists()).toBe(false);
        wrapper.destroy();
    });

    test.skip('Has component initialized with children', async () => {
        // arrange
        const wrapper = mount(GlobalmenuAnchor, {
            propsData: {
                nodeData: nodeData[1]
            }
        });
        // act

        // assert
        expect(wrapper.is(GlobalmenuAnchor)).toBeTruthy();
        expect(wrapper.is('a')).toBe(true);
        expect(wrapper.find('span').exists()).toBe(true);
        expect((<any>wrapper.vm).hasChildren).toBe(true);
        expect(wrapper.attributes('aria-popup')).toBeDefined();
        expect(wrapper.attributes('aria-expanded')).toBeDefined();
        expect(wrapper.find('.m-menu-link__collapse').exists()).toBe(true);

        wrapper.destroy();
    });

    test.skip('Has component initialized with no children', async () => {
        // arrange
        const wrapper = mount(GlobalmenuAnchor, {
            propsData: {
                nodeData: nodeData[0]
            }
        });
        // act

        // assert
        expect(wrapper.find('.m-menu-link__collapse').exists()).toBe(false);

        wrapper.destroy();
    });

    test.skip('Has expanded is false', async () => {
        // arrange
        const wrapper = mount(GlobalmenuAnchor, {
            propsData: {
                nodeData: nodeData[1],
                isExpanded: false
            }
        });

        // act

        // assert
        expect(wrapper.attributes('aria-popup')).toBeDefined();
        expect(wrapper.attributes('aria-expanded')).toBe('false');
        expect(wrapper.find('.m-menu-link__collapse svg').attributes('class')).toBe('icon icon-menu-arrow-down');

        wrapper.destroy();
    });

    test.skip('Has expanded is true', async () => {
        // arrange
        const wrapper = mount(GlobalmenuAnchor, {
            propsData: {
                nodeData: nodeData[1],
                isExpanded: true
            }
        });

        // act

        // assert
        expect(wrapper.attributes('aria-popup')).toBeDefined();
        expect(wrapper.attributes('aria-expanded')).toBe('true');
        expect(wrapper.find('.m-menu-link__collapse svg').attributes('class')).toBe('icon icon-menu-arrow-up');

        wrapper.destroy();
    });

    test.skip('Has emit click when no children', async () => {
        // arrange
        const wrapper = mount(GlobalmenuAnchor, {
            propsData: {
                nodeData: nodeData[0],
            }
        });
        // act
        wrapper.trigger('click');

        // assert
        expect(wrapper.emitted('click')).toBeDefined();

        wrapper.destroy();
    });

    test.skip('Has emitted click with children', async () => {
        // arrange
        const wrapper = mount(GlobalmenuAnchor, {
            propsData: {
                nodeData: nodeData[1],
            }
        });
        // act
        wrapper.trigger('click');

        // assert
        expect(wrapper.emitted('click')).toBeDefined();

        wrapper.destroy();
    });

    test.skip('Has dispatched beforenavigatehome event', async () => {
        // arrange
        delete window.location;
        (<any>window).location = { reload: jest.fn() };

        const mockBeforeNavigateHomeEvent = jest.fn().mockName('beforenavigatehome');
        const wrapper = mount(GlobalmenuAnchor, {
            propsData: {
                nodeData: nodeData[4],
            }
        });
        wrapper.element.addEventListener('beforenavigatehome', mockBeforeNavigateHomeEvent);
        Object.defineProperty(window.location, 'href', {
            writable: true,
            value: '#'
        });

        // act
        wrapper.trigger('click');

        // assert
        expect(mockBeforeNavigateHomeEvent).toBeCalled();

        wrapper.destroy();
    });

});
