import { mount, Wrapper } from '@vue/test-utils';
import TreeMenu from '@/components/common/tree-node/tree-menu.vue';
import nodeData from './tree-node-data';
import Vue, { CreateElement } from 'vue';
import { TreeNodeVue, TreeNodeDataModel } from '@/components/common/tree-node/tree-node';

describe('TreeMenu', () => {
    test('Has component initalized', async () => {
        // arrange
        const wrapper = mount(TreeMenu, {
            propsData: {
                nodeData: nodeData
            }
        });
        const rootUl = wrapper.find('ul');
        const liNodes = wrapper.findAll('ul > li ');

        // act

        // assert
        expect(wrapper).toBeDefined();
        expect(wrapper.is(TreeMenu)).toBeTruthy();
        expect(liNodes.length).toBe(17);

        expect(rootUl.attributes('role')).toBe('menu');
        expect(rootUl.attributes('tabindex')).toBe('-1');

        // test first two nodes
        expect(liNodes.at(0).find('a').exists()).toBe(true);
        expect(liNodes.at(0).find('ul').exists()).toBe(false);
        expect(liNodes.at(0).find('a').attributes('aria-controls')).toBeUndefined();
        expect(liNodes.at(0).find('a').attributes('aria-expanded')).toBeUndefined();
        expect(liNodes.at(0).find('a').attributes('aria-popup')).toBeUndefined();
        expect(liNodes.at(0).find('a').attributes('tabindex')).toBe('-1');

        expect(liNodes.at(1).find('a').exists()).toBe(true);
        expect(liNodes.at(1).find('ul').exists()).toBe(true);
        expect(liNodes.at(1).find('ul').attributes('role')).toBe('menu');
        expect(liNodes.at(1).find('ul').attributes('aria-labeledby')).toBe('node-02');
        expect(liNodes.at(1).find('ul').attributes('id')).toBe('node-02-child');

        expect(liNodes.at(1).find('a').attributes('aria-controls')).toBe('node-02-child');
        expect(liNodes.at(1).find('a').attributes('aria-expanded')).toBeDefined();
        expect(liNodes.at(1).find('a').attributes('aria-popup')).toBeDefined();
        expect(liNodes.at(1).find('a').attributes('tabindex')).toBe('-1');

        wrapper.destroy();
    });

    test('Has valid class nesting empty', async () => {
        const ulClass = '';
        const liClass = '';

        // arrange
        const wrapper = mount(TreeMenu, {
            propsData: {
                nodeData: nodeData,
                cssClassLi: liClass,
                cssClassUl: ulClass,
            }
        });
        // act
        const ulList = wrapper.findAll('ul').filter((w) => !w.classes(ulClass));
        const liList = wrapper.findAll('li').filter((w) => !w.classes(liClass));

        // assert
        expect(ulList.length).toBe(0);
        expect(liList.length).toBe(0);

        wrapper.destroy();
    });

    test('Has valid class nesting value', async () => {
        const ulClass = 'ulTest';
        const liClass = 'liTest';

        // arrange
        const wrapper = mount(TreeMenu, {
            propsData: {
                nodeData: nodeData,
                cssClassLi: liClass,
                cssClassUl: ulClass,
            }
        });

        // act
        const ulList = wrapper.findAll('ul').filter((w) => !w.classes(ulClass));
        const liList = wrapper.findAll('li').filter((w) => !w.classes(liClass));

        // assert
        expect(ulList.length).toBe(0);
        expect(liList.length).toBe(0);

        wrapper.destroy();
    });

    test('Has CssClassLi', async () => {
        // arrange
        const css = 'ziggyClass';
        const wrapper = mount(TreeMenu, {
            propsData: {
                nodeData: nodeData,
                cssClassLi: css
            }
        });
        // act
        const liList = wrapper.findAll('li');

        // assert
        expect(liList.at(0).classes(css)).toBe(true);
        expect(liList.at(1).classes(css)).toBe(true);
        expect(liList.at(2).classes(css)).toBe(true);
        expect(liList.at(3).classes(css)).toBe(true);

        wrapper.destroy();
    });

    test('has conditional LI class', async () => {
        // arrange
        function liClassConditional(node: TreeNodeDataModel): any {
            return ['starman', node.id];
        }

        const wrapper = mount(TreeMenu, {
            propsData: {
                nodeData: nodeData,
                cssClassLiCondition: liClassConditional,
            }
        });

        // act
        const liList = wrapper.findAll('li.starman').filter((w: Wrapper<Vue>) => !w.classes(<string>w.attributes('id')));

        // assert
        expect(liList.length).toBe(0);

        wrapper.destroy();
    });

    test('Has CssClassUl', async () => {
        // arrange
        const css = 'ziggyClass';
        const wrapper = mount(TreeMenu, {
            propsData: {
                nodeData: nodeData,
                cssClassUl: css
            }
        });
        // act
        const ulList = wrapper.findAll('ul');
        // assert
        expect(ulList.at(0).classes(css)).toBe(true);
        expect(ulList.at(1).classes(css)).toBe(true);
        expect(ulList.at(2).classes(css)).toBe(true);

        wrapper.destroy();
    });

    test('anchor emits "click" when mouseClicked and updates browser URL', async () => {
        // arrange
        delete window.location;
        Object.defineProperty(window, 'location', {
            value: {
                href: nodeData[0].url
            }
        });

        const wrapper = mount(TreeMenu, {
            propsData: {
                nodeData: nodeData
            }
        });
        const anchor = wrapper.find('#node-01');

        // act
        anchor.trigger('click');

        // assert
        expect(anchor.emitted('click')).toBeDefined();
        expect(window.location.href).toBe(nodeData[0].url);
        wrapper.destroy();
    });

    test('wrapper does not emit no children found when opening node', async () => {
        // arrange        
        const wrapper = mount(TreeMenu, {
            propsData: {
                nodeData: nodeData
            }
        });
        const anchor = wrapper.find('#node-02');
        const childAnchor = wrapper.find('#node-021');
        const ul = wrapper.find('#node-02-child');

        // act
        anchor.trigger('click');

        // assert
        expect(ul.isVisible()).toBe(true);
        expect(anchor.emitted('click')).toBeDefined();
        expect(anchor.attributes('aria-expanded')).toBe('true');

        expect(childAnchor.attributes('tabindex')).toBe('0');

        wrapper.destroy();
    });

    test('anchor clicks opening node two deep in same root', async () => {
        // arrange        
        const wrapper = mount(TreeMenu, {
            propsData: {
                nodeData: nodeData
            },
        });
        const anchor = wrapper.find('#node-03');
        const ul = wrapper.find('#node-03-child');

        const childAnchor = wrapper.find('#node-032');
        const childUl = wrapper.find('#node-032-child');

        const openedAnchor = wrapper.find('#node-0321');

        // act
        anchor.trigger('click');
        childAnchor.trigger('click');

        // assert
        expect(ul.isVisible()).toBe(true);

        expect(childUl.isVisible()).toBe(true);
        expect(childAnchor.emitted('click')).toBeDefined();
        expect(childAnchor.attributes('aria-expanded')).toBe('true');
        expect(childAnchor.attributes('tabindex')).toBe('-1');
        expect(childAnchor.attributes('aria-expanded')).toBe('true');

        expect(openedAnchor.attributes('tabindex')).toBe('0');

        wrapper.destroy();
    });

    test('anchor clicks toggle open and close node', async () => {
        // arrange        
        const wrapper = mount(TreeMenu, {
            propsData: {
                nodeData: nodeData
            }
        });
        const anchor = wrapper.find('#node-02');
        const childAnchor = wrapper.find('#node-021');
        const ul = wrapper.find('#node-02-child');

        // act
        expect(ul.isVisible()).toBe(false);
        anchor.trigger('click');

        // assert
        expect(ul.isVisible()).toBe(true);
        expect(anchor.emitted('click')).toBeDefined();
        expect(anchor.attributes('aria-expanded')).toBe('true');

        expect(childAnchor.attributes('tabindex')).toBe('0');

        anchor.trigger('click');

        expect(ul.isVisible()).toBe(false);
        expect(anchor.emitted('click')).toBeDefined();
        expect(anchor.attributes('aria-expanded')).toBe('false');
        expect(anchor.attributes('tabindex')).toBe('0');

        expect(childAnchor.attributes('tabindex')).toBe('-1');

        wrapper.destroy();
    });

    test('previous node collapses when clicking on sibling node', async () => {
        // arrange
        const wrapper = mount(TreeMenu, {
            propsData: {
                nodeData: nodeData
            }
        });
        const anchor = wrapper.find('#node-03');
        const ul = wrapper.find('#node-03-child');

        const childAnchor = wrapper.find('#node-032');
        const childUl = wrapper.find('#node-032-child');

        const newAnchor = wrapper.find('#node-02');
        const newUl = wrapper.find('#node-02-child');
        const newChildAnchor = wrapper.find('#node-021');

        // act
        anchor.trigger('click');
        childAnchor.trigger('click');

        newAnchor.trigger('click');

        // assert
        expect(newUl.isVisible()).toBe(true);
        expect(ul.isVisible()).toBe(false);
        expect(childUl.isVisible()).toBe(false);

        expect(anchor.attributes('tabindex')).toBe('-1');
        expect(anchor.attributes('aria-expanded')).toBe('false');
        expect(childAnchor.attributes('tabindex')).toBe('-1');
        expect(childAnchor.attributes('aria-expanded')).toBe('false');
        expect(newAnchor.attributes('tabindex')).toBe('-1');
        expect(newAnchor.attributes('aria-expanded')).toBe('true');
        expect(newChildAnchor.attributes('tabindex')).toBe('0');

        wrapper.destroy();
    });

    test('anchor tabindex 0" when receives focus', async () => {
        // arrange
        const wrapper = mount(TreeMenu, {
            attachToDocument: true,
            propsData: {
                nodeData: nodeData
            }
        });
        const anchor = wrapper.find('#node-01');

        // act
        anchor.trigger('focus');

        // assert
        expect(anchor.emitted('focus')).toBeDefined();
        expect(anchor.attributes('tabindex')).toBe('0');

        wrapper.destroy();
    });

    test('anchor tabindex -1" when receives blur', async () => {
        // arrange
        const wrapper = mount(TreeMenu, {
            attachToDocument: true,
            propsData: {
                nodeData: nodeData
            }
        });
        const anchor = wrapper.find('#node-01');

        // act
        anchor.trigger('focus');
        anchor.trigger('blur');

        // assert
        expect(anchor.emitted('blur')).toBeDefined();
        expect(anchor.attributes('tabindex')).toBe('-1');

        wrapper.destroy();
    });

    test('nested anchor tabindex 0" when receives focus', async () => {
        // arrange
        const wrapper = mount(TreeMenu, {
            attachToDocument: true,
            propsData: {
                nodeData: nodeData
            }
        });
        const anchor = wrapper.find('#node-021');

        // act
        anchor.trigger('focus');

        // assert
        expect(anchor.attributes('tabindex')).toBe('0');

        wrapper.destroy();
    });

    test('nested anchor tabindex -1" when receives blur', async () => {
        // arrange
        const wrapper = mount(TreeMenu, {
            attachToDocument: true,
            propsData: {
                nodeData: nodeData
            }
        });
        const anchor = wrapper.find('#node-021');

        // act
        anchor.trigger('focus');

        // assert
        expect(anchor.attributes('tabindex')).toBe('0');
        anchor.trigger('blur');
        expect(anchor.attributes('tabindex')).toBe('-1');

        wrapper.destroy();
    });

    test('anchor changes focus to new anchor blurs original', async () => {
        // arrange
        const wrapper = mount(TreeMenu, {
            attachToDocument: true,
            propsData: {
                nodeData: nodeData
            }
        });
        const anchor = wrapper.find('#node-01');
        const anchor2 = wrapper.find('#node-02');

        // act
        anchor.trigger('focus');

        // assert
        expect(anchor.attributes('tabindex')).toBe('0');
        expect(anchor2.attributes('tabindex')).toBe('-1');

        anchor2.trigger('focus');

        expect(anchor.attributes('tabindex')).toBe('-1');
        expect(anchor2.attributes('tabindex')).toBe('0');

        wrapper.destroy();
    });

    test('anchor changes focus to new anchor blurs original from different nodes', async () => {
        // arrange
        const wrapper = mount(TreeMenu, {
            attachToDocument: true,
            propsData: {
                nodeData: nodeData
            }
        });
        const anchor = wrapper.find('#node-031');
        const anchor2 = wrapper.find('#node-021');

        // act
        anchor.trigger('focus');

        // assert
        expect(anchor.attributes('tabindex')).toBe('0');
        expect(anchor2.attributes('tabindex')).toBe('-1');

        anchor2.trigger('focus');

        expect(anchor.attributes('tabindex')).toBe('-1');
        expect(anchor2.attributes('tabindex')).toBe('0');

        wrapper.destroy();

    });

    test('focus moves down a node anchor on keydown.down', async () => {
        // arrange
        const wrapper = mount(TreeMenu, {
            attachToDocument: true,
            propsData: {
                nodeData: nodeData
            }
        });
        const anchor = wrapper.find('#node-021');
        const anchor2 = wrapper.find('#node-022');
        const anchor3 = wrapper.find('#node-023');

        // act
        anchor.trigger('focus');

        // assert
        expect(anchor.attributes('tabindex')).toBe('0');
        expect(anchor2.attributes('tabindex')).toBe('-1');
        expect(anchor2.attributes('tabindex')).toBe('-1');

        anchor.trigger('keydown.down');

        expect(anchor.attributes('tabindex')).toBe('-1');
        expect(anchor2.attributes('tabindex')).toBe('0');
        expect(anchor3.attributes('tabindex')).toBe('-1');

        anchor2.trigger('keydown.down');

        expect(anchor.attributes('tabindex')).toBe('-1');
        expect(anchor2.attributes('tabindex')).toBe('-1');
        expect(anchor3.attributes('tabindex')).toBe('0');

        anchor3.trigger('keydown.down');

        expect(anchor.attributes('tabindex')).toBe('-1');
        expect(anchor2.attributes('tabindex')).toBe('-1');
        expect(anchor3.attributes('tabindex')).toBe('0');

        wrapper.destroy();
    });

    test('focus moves down a node anchor on keydown.up', async () => {
        // arrange
        const wrapper = mount(TreeMenu, {
            attachToDocument: true,
            propsData: {
                nodeData: nodeData
            }
        });
        const anchor = wrapper.find('#node-023');
        const anchor2 = wrapper.find('#node-022');
        const anchor3 = wrapper.find('#node-021');

        // act
        anchor.trigger('focus');

        // assert
        expect(anchor.attributes('tabindex')).toBe('0');
        expect(anchor2.attributes('tabindex')).toBe('-1');
        expect(anchor2.attributes('tabindex')).toBe('-1');

        anchor.trigger('keydown.up');

        expect(anchor.attributes('tabindex')).toBe('-1');
        expect(anchor2.attributes('tabindex')).toBe('0');
        expect(anchor3.attributes('tabindex')).toBe('-1');

        anchor2.trigger('keydown.up');

        expect(anchor.attributes('tabindex')).toBe('-1');
        expect(anchor2.attributes('tabindex')).toBe('-1');
        expect(anchor3.attributes('tabindex')).toBe('0');

        anchor3.trigger('keydown.up');

        expect(anchor.attributes('tabindex')).toBe('-1');
        expect(anchor2.attributes('tabindex')).toBe('-1');
        expect(anchor3.attributes('tabindex')).toBe('0');

        wrapper.destroy();
    });

    test('anchor expands node on keydown.right', async () => {
        // arrange
        const wrapper = mount(TreeMenu, {
            attachToDocument: true,
            propsData: {
                nodeData: nodeData
            }
        });
        const anchor = wrapper.find('#node-03');
        const ul = wrapper.find('#node-03-child');
        const anchorResult = wrapper.find('#node-031');
        const anchor2 = wrapper.find('#node-032');
        const ul2 = wrapper.find('#node-032-child');
        const anchor3 = wrapper.find('#node-0321');

        // act
        anchor.trigger('keydown.right');

        // assert
        expect(anchor.attributes('tabindex')).toBe('-1');
        expect(ul.isVisible()).toBe(true);
        expect(anchorResult.attributes('tabindex')).toBe('0');

        anchor2.trigger('keydown.right');

        expect(anchor.attributes('tabindex')).toBe('-1');
        expect(anchorResult.attributes('tabindex')).toBe('-1');
        expect(ul.isVisible()).toBe(true);
        expect(ul2.isVisible()).toBe(true);
        expect(anchor3.attributes('tabindex')).toBe('0');

        // retain current state
        anchor2.trigger('keydown.right');

        expect(anchor.attributes('tabindex')).toBe('-1');
        expect(anchorResult.attributes('tabindex')).toBe('-1');
        expect(ul.isVisible()).toBe(true);
        expect(ul2.isVisible()).toBe(true);
        expect(anchor3.attributes('tabindex')).toBe('0');

        wrapper.destroy();
    });

    test('anchor collapses node on keydown.left', async () => {
        // arrange
        const wrapper = mount(TreeMenu, {
            attachToDocument: true,
            propsData: {
                nodeData: nodeData
            }
        });
        const anchor = wrapper.find('#node-03');
        const ul = wrapper.find('#node-03-child');
        const anchor2 = wrapper.find('#node-032');
        const ul2 = wrapper.find('#node-032-child');
        const anchor3 = wrapper.find('#node-0321');

        const rootAnchor = wrapper.find('#node-01');
        const rootAnchor2 = wrapper.find('#node-02');

        // act
        anchor.trigger('keydown.right');
        anchor2.trigger('keydown.right');
        anchor3.trigger('keydown.left');
        // assert

        expect(anchor3.attributes('tabindex')).toBe('-1');
        expect(ul2.isVisible()).toBe(false);
        expect(ul.isVisible()).toBe(true);
        expect(anchor2.attributes('tabindex')).toBe('0');

        anchor2.trigger('keydown.left');

        expect(anchor2.attributes('tabindex')).toBe('-1');
        expect(ul2.isVisible()).toBe(false);
        expect(ul.isVisible()).toBe(false);
        expect(anchor.attributes('tabindex')).toBe('0');

        anchor.trigger('keydown.left');

        expect(anchor.attributes('tabindex')).toBe('-1');
        expect(ul.isVisible()).toBe(false);
        expect(rootAnchor.attributes('tabindex')).toBe('0');

        rootAnchor2.trigger('keydown.left');

        expect(anchor.attributes('tabindex')).toBe('-1');
        expect(anchor2.attributes('tabindex')).toBe('-1');
        expect(ul.isVisible()).toBe(false);
        expect(rootAnchor.attributes('tabindex')).toBe('0');

        wrapper.destroy();
    });

    test('keydown emits value when any key is clicked', async () => {
        // arrange
        const wrapper = mount(TreeMenu, {
            propsData: {
                nodeData: nodeData
            }
        });
        const anchor = wrapper.find('#node-01');

        // act
        anchor.trigger('keydown.space');

        // assert
        expect(anchor.emitted('keydown')).toBeDefined();

        wrapper.destroy();
    });

    test('provide new anchor', async () => {
        // arrange
        const injectHtml = {
            render(this: TreeNodeVue, h: CreateElement) {
                return h('div', {
                    class: 'starman'
                });
            }
        }
        const wrapper = mount(TreeMenu, {
            propsData: {
                nodeData: nodeData
            },
            provide: {
                anchor: injectHtml
            }
        });

        // act

        // assert
        expect(wrapper.findAll('.starman').length).toBeGreaterThan(0);

        wrapper.destroy();
    });

});
