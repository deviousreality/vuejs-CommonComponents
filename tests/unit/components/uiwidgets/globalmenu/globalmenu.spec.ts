import Vue from 'vue';
import { mount, Wrapper, shallowMount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import Globalmenu from '@/components/uiwidgets/globalmenu/globalmenu.vue';
// import GlobalmenuAnchor from '@/components/uiwidgets/globalmenu/globalmenu-anchor.vue';
import nodeData from '../../common/tree-node/tree-node-data';
import { waitNT } from '../../../utils/utils';
import { GlobalMenuDataModel } from '@/components/uiwidgets/globalmenu/globalmenu';

const $httpMock = {
    get: () => {
        return Promise.resolve({ data: nodeData });
    }
};
const httpRequestMockEmpty = {
    get: () => {
        return Promise.resolve({ data: [] });
    }
};

describe.skip('Globalmenu', () => {

    test('Has component initalized with empty data set', async () => {
        // arrange
        let wrapper = shallowMount(Globalmenu, {
            mocks: {
                $http: httpRequestMockEmpty
            },
            propsData: {
                url: 'localhost'
            }
        });
        await flushPromises();
        // act

        // assert
        expect(wrapper.is(Globalmenu)).toBeTruthy();
        expect(wrapper.find('header').exists()).toBe(true);
        expect(wrapper.vm.$data.nodeData.length).toBe(0);
        wrapper = {} as any;
    });

    test('Has component initalized with dataset', async () => {
        // arrange
        let wrapper = mount(Globalmenu, {
            mocks: {
                $http: $httpMock
            },
            propsData: {
                url: 'localhost'
            }
        });
        await flushPromises();

        // act

        // assert
        expect(wrapper).toBeDefined();
        expect(wrapper.is(Globalmenu)).toBeTruthy();
        expect(wrapper.is('nav')).toBe(true);
        expect(wrapper.vm.$data.nodeData.length).toBeGreaterThan(0);

        expect(wrapper.find('header').exists()).toBe(true);

        wrapper = {} as any;
    });

    test('Has component initalized with empty prop url', async () => {
        // arrange
        let wrapper = mount(Globalmenu, {
            mocks: {
                $http: httpRequestMockEmpty
            },
        });
        await flushPromises();

        // act

        // assert
        expect(wrapper.is(Globalmenu)).toBeTruthy();
        expect(wrapper.vm.$data.nodeData.length).toBe(0);
        expect(wrapper.find('header').exists()).toBe(true);

        wrapper = {} as any;
    });

    test('Has class m-menu--collapsed when prop IsHomePage true', async () => {
        // arrange
        let wrapper = mount(Globalmenu, {
            mocks: {
                $http: $httpMock
            },
            propsData: {
                url: 'localhost',
                isHomePage: true,
            }
        });
        await flushPromises();

        // act
        const nav = wrapper.find('nav');

        // assert
        expect(nav.classes('m-menu--collapsed')).toBe(true);
        wrapper = {} as any;
    });

    test('does not have class m-menu--collapsed when prop IsHomePage false', async () => {
        // arrange
        let wrapper = mount(Globalmenu, {
            mocks: {
                $http: $httpMock
            },
            propsData: {
                url: 'localhost',
                isHomePage: false,
            }
        });
        await flushPromises();

        // act
        const nav = wrapper.find('nav');

        // assert
        expect(nav.classes('m-menu--collapsed')).toBe(false);
        wrapper = {} as any;
    });

    test('does not have class m-menu--collapsed when prop IsHomePage is true and isHiddenViewport is true', async () => {
        // arrange
        let wrapper = mount(Globalmenu, {
            mocks: {
                $http: $httpMock
            },
            propsData: {
                url: 'localhost',
                isHomePage: true,
                isHiddenViewport: true,
            }
        });
        await flushPromises();

        // act
        const nav = wrapper.find('nav');

        // assert
        expect(nav.classes('m-menu--collapsed')).toBe(false);
        wrapper = {} as any;
    });

    test('will toggle class m-menu--is-open when prop isMenuOpen is set true/false after render', async () => {
        // arrange
        let wrapper = mount(Globalmenu, {
            mocks: {
                $http: $httpMock
            },
            propsData: {
                url: 'localhost',
            }
        });
        await flushPromises();
        const nav = wrapper.find('nav');

        // act
        wrapper.setData({
            isMenuOpen: true
        });
        waitNT(wrapper.vm);

        // assert
        expect(nav.classes('m-menu--is-open')).toBe(true);
        wrapper.setData({
            isMenuOpen: false
        });
        waitNT(wrapper.vm);

        expect(nav.classes('m-menu--is-open')).toBe(false);
        wrapper = {} as any;
    });

    test('home anchor has homeIndexUrl when prop is set', async () => {
        // arrange
        const wrapper = mount(Globalmenu, {
            mocks: {
                $http: $httpMock
            },
            propsData: {
                url: 'localhost',
                homeIndexUrl: 'foobar',
            }
        });
        await flushPromises();

        // act

        // assert
        expect(wrapper.find('.m-menu-link--home').attributes('href')).toBe('foobar');

        wrapper.destroy();
    });

    test('has tree-node Id menu-parent when prop ID is empty', async () => {
        // arrange
        let wrapper = mount(Globalmenu, {
            mocks: {
                $http: $httpMock
            },
            propsData: {
                url: 'localhost',
            }
        });
        await flushPromises();

        // act

        // assert
        expect(wrapper.find('#menu-parent').exists()).toBe(true);

        wrapper.destroy();
    });

    test('has tree-node Id foo when prop ID is foo', async () => {
        // arrange
        let wrapper = mount(Globalmenu, {
            mocks: {
                $http: $httpMock
            },
            propsData: {
                url: 'localhost',
                id: 'foo',
            }
        });
        await flushPromises();

        // act

        // assert
        expect(wrapper.find('#foo').exists()).toBe(true);

        wrapper = {} as any;
    });

    test('focus moves to ref:menuButton when keydown.tab on tree-menu', async () => {
        // arrange
        const wrapper = mount(Globalmenu, {
            attachToDocument: true,
            mocks: {
                $http: $httpMock
            },
            propsData: {
                url: 'localhost',
            }
        });
        await flushPromises();

        const nodes = wrapper.findAll('.m-menu > .m-menuitems > .m-menu__item');
        const anchor = nodes.at(0).find('a');

        // act
        anchor.trigger('keydown.tab');
        waitNT(wrapper.vm);

        // assert
        expect(anchor.emitted('keydown')).toBeDefined();
        expect(document.activeElement instanceof HTMLButtonElement).toBe(true);
        expect((<Element>document.activeElement).classList.contains('m-menu-link')).toBe(true);

        wrapper.destroy();
    });

    test('focus moves to ref:menuButton when keydown.escape on tree-menu', async () => {
        // arrange
        const wrapper = mount(Globalmenu, {
            attachToDocument: true,
            mocks: {
                $http: $httpMock
            },
            propsData: {
                url: 'localhost',
            }
        });
        await flushPromises();

        const nodes = wrapper.findAll('.m-menu > .m-menuitems > .m-menu__item');
        const anchor = nodes.at(0).find('a');

        // act
        anchor.trigger('keydown.esc');
        waitNT(wrapper.vm);

        // assert
        expect(anchor.emitted('keydown')).toBeDefined();
        expect(document.activeElement instanceof HTMLButtonElement).toBe(true);
        expect((<Element>document.activeElement).classList.contains('m-menu-link')).toBe(true);

        wrapper.destroy();
    });

    test('menuButton keydown.down opens menu and sends focus to first node', async () => {
        // arrange
        const wrapper = mount(Globalmenu, {
            mocks: {
                $http: $httpMock
            },
            propsData: {
                url: 'localhost',
            }
        });
        await flushPromises();
        const menuButton = wrapper.find({ ref: 'menuButton' });
        const nodes = wrapper.findAll('.m-menu > .m-menuitems > .m-menu__item');
        const anchor = nodes.at(0).find('a');

        // act
        expect(wrapper.classes('m-menu--is-open')).toBe(false);
        menuButton.trigger('keydown.down');
        waitNT(wrapper.vm);

        // assert
        expect(anchor.attributes('tabindex')).toBe('0');
        expect(wrapper.classes('m-menu--is-open')).toBe(true);

        wrapper.destroy();
    });

    test('menuButton keydown.enter opens menu and sends focus to first node', async () => {
        // arrange
        const wrapper = mount(Globalmenu, {
            mocks: {
                $http: $httpMock
            },
            propsData: {
                url: 'localhost',
            }
        });
        await flushPromises();
        const menuButton = wrapper.find({ ref: 'menuButton' });
        const nodes = wrapper.findAll('.m-menu > .m-menuitems > .m-menu__item');
        const anchor = nodes.at(0).find('a');

        // act
        expect(wrapper.classes('m-menu--is-open')).toBe(false);
        menuButton.trigger('keydown.enter');
        waitNT(wrapper.vm);

        // assert
        expect(anchor.attributes('tabindex')).toBe('0');
        expect(wrapper.classes('m-menu--is-open')).toBe(true);

        wrapper.destroy();
    });

    test('menuButton keydown.space opens menu and sends focus to first node', async () => {
        // arrange
        const wrapper = mount(Globalmenu, {
            mocks: {
                $http: $httpMock
            },
            propsData: {
                url: 'localhost',
            }
        });
        await flushPromises();
        const menuButton = wrapper.find({ ref: 'menuButton' });
        const nodes = wrapper.findAll('.m-menu > .m-menuitems > .m-menu__item');
        const anchor = nodes.at(0).find('a');

        // act
        expect(wrapper.classes('m-menu--is-open')).toBe(false);
        menuButton.trigger('keydown.space');
        waitNT(wrapper.vm);

        // assert
        expect(anchor.attributes('tabindex')).toBe('0');
        expect(wrapper.classes('m-menu--is-open')).toBe(true);

        wrapper.destroy();
    });

    test('menuButton keydown.tab cloes menu and returns focus to document', async () => {
        // arrange
        const wrapper = mount(Globalmenu, {
            attachToDocument: true,
            mocks: {
                $http: $httpMock
            },
            propsData: {
                url: 'localhost',
            }
        });
        await flushPromises();
        const menuButton = wrapper.find({ ref: 'menuButton' });

        // act
        wrapper.setData({
            isMenuOpen: true
        });

        expect(wrapper.classes('m-menu--is-open')).toBe(true);
        menuButton.trigger('keydown.tab');
        waitNT(wrapper.vm);

        // assert
        expect((<any>wrapper.vm).$data.isMenuOpen).toBe(false);
        expect((<Element>document.activeElement).tagName).not.toBe('BUTTON');

        wrapper.destroy();
    });

    test('anchor emits navigate URL and navigation occurs', async () => {
        delete window.location;
        (<any>window).location = { href: jest.fn() };
        // arrange
        const mockNavigate = jest.fn().mockName('navigate');
        const wrapper = mount(Globalmenu, {
            attachToDocument: true,
            mocks: {
                $http: $httpMock
            },
            propsData: {
                url: 'localhost',
            }
        });

        Object.defineProperty(window.location, 'href', {
            writable: true,
            value: '#'
        });

        await flushPromises();
        const nodes = wrapper.findAll('.m-menu > .m-menuitems > .m-menu__item');
        const anchor = nodes.at(0).find('a');

        // act
        anchor.trigger('click');

        // assert
        expect(window.location.href).toBe('link-01');

        wrapper.destroy();
    });

    test('li classes displays m-menu__item--is-mobilehidden when nodeData.isHiddenOnMobile', async () => {
        // arrange
        const localData = (<any>nodeData) as GlobalMenuDataModel[];
        localData[1].isHiddenOnMobile = true;
        localData[2].children[0].isHiddenOnMobile = true;
        const localHhttpMock = {
            get: () => {
                return Promise.resolve({ data: localData });
            }
        };

        const wrapper = mount(Globalmenu, {
            mocks: {
                $http: localHhttpMock
            },
            propsData: {
                url: 'localhost',
            }
        });
        await flushPromises();

        window.console.log(wrapper.html());
        const liList = wrapper.findAll('.m-menu__item--is-mobilehidden');

        // assert
        expect(liList.length).toBe(2);

        wrapper.destroy();

    });
});
