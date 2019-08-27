import Vue from 'vue';
import { mount, Wrapper } from '@vue/test-utils';
import TreeNode from '@/components/common/tree-node/tree-node.vue';
import { TreeNodeVue, TreeNodeDataModel } from '@/components/common/tree-node/tree-node';

import nodeData from './tree-node-data';
import { CreateElement } from 'vue';

describe('TreeNode', () => {
    test('Has component initalized', async () => {
        // arrange
        const wrapper = mount(TreeNode, {
            propsData: {
                nodeData: nodeData
            }
        });
        const liNodes = wrapper.findAll('ul > li');

        // act

        // assert
        expect(wrapper).toBeDefined();
        expect(wrapper.is(TreeNode)).toBeTruthy();
        expect(liNodes.length).toBe(17);

        // test first two nodes
        expect(liNodes.at(0).find('a').exists()).toBe(true);
        expect(liNodes.at(0).find('ul').exists()).toBe(false);
        expect(liNodes.at(0).find('a').attributes('aria-controls')).toBeUndefined();
        expect(liNodes.at(0).find('a').attributes('aria-expanded')).toBeUndefined();
        expect(liNodes.at(0).find('a').attributes('aria-popup')).toBeUndefined();
        expect(liNodes.at(0).find('a').attributes('tabindex')).toBe('-1');

        expect(liNodes.at(1).find('a').exists()).toBe(true);
        expect(liNodes.at(1).find('ul').exists()).toBe(true);
        expect(liNodes.at(1).find('a').attributes('aria-controls')).toBe('node-02-child');
        expect(liNodes.at(1).find('a').attributes('aria-expanded')).toBeDefined();
        expect(liNodes.at(1).find('a').attributes('aria-popup')).toBeDefined();
        expect(liNodes.at(1).find('a').attributes('tabindex')).toBe('-1');

        wrapper.destroy();
    });

    test('does not have UL class', async () => {
        const ulClass = '';

        // arrange
        const wrapper = mount(TreeNode, {
            propsData: {
                nodeData: nodeData,
                cssClassUl: ulClass,
            }
        });
        // act
        const ulList = wrapper.findAll('ul').filter((w) => !w.classes(ulClass));

        // assert
        expect(ulList.length).toBe(0);

        wrapper.destroy();
    });

    test('does have UL class', async () => {
        const ulClass = 'ulTest';

        // arrange
        const wrapper = mount(TreeNode, {
            propsData: {
                nodeData: nodeData,
                cssClassUl: ulClass,
            }
        });
        // act
        const ulList = wrapper.findAll('ul').filter((w) => w.classes(ulClass));

        // assert
        expect(ulList.length).toBe(5);

        wrapper.destroy();
    });

    test('does not have LI class', async () => {
        const liClass = '';

        // arrange
        const wrapper = mount(TreeNode, {
            propsData: {
                nodeData: nodeData,
                cssClassLi: liClass,
            }
        });
        // act
        const liList = wrapper.findAll('ul').filter((w) => !w.classes(liClass));

        // assert
        expect(liList.length).toBe(0);

        wrapper.destroy();
    });

    test('does have LI class', async () => {
        const liClass = 'liClass';

        // arrange
        const wrapper = mount(TreeNode, {
            propsData: {
                nodeData: nodeData,
                cssClassLi: liClass,
            }
        });
        // act
        const liList = wrapper.findAll('ul').filter((w: Wrapper<Vue>) => w.classes(liClass));

        // assert
        expect(liList.length).toBe(0);

        wrapper.destroy();
    });

    test('has conditional LI class', async () => {
        // arrange
        function liClassConditional(node: TreeNodeDataModel): any {
            return ['starman', node.id];
        }

        const wrapper = mount(TreeNode, {
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

    test('child node UL contains ID node-id-child', async () => {
        // arrange
        const wrapper = mount(TreeNode, {
            propsData: {
                nodeData: nodeData
            }
        });
        const ul1 = wrapper.find('#node-03-child');
        const ul2 = wrapper.find('#node-032-child');

        // act

        // assert
        expect(ul1.exists()).toBe(true);
        expect(ul1.attributes('aria-labeledby')).toBe('node-03')
        expect(ul2.exists()).toBe(true);
        expect(ul2.attributes('aria-labeledby')).toBe('node-032')

        wrapper.destroy();
    });

    test.skip('wrapper emits "node-select" and anchor emits "click" when mouseClicked and children are found', async () => {
        // arrange        
        const wrapper = mount(TreeNode, {
            propsData: {
                nodeData: nodeData
            }
        });
        const anchor = wrapper.find('#node-02');

        // act
        anchor.trigger('click');

        // assert
        expect(anchor.emitted('click')).toBeDefined();
        expect(wrapper.emitted('node-select')).toBeDefined();
        expect(wrapper.emitted('node-select')[0][1]).toEqual([1]);

        wrapper.destroy();
    });

    test.skip('wrapper emits "node-select" when mouseclick nested children', async () => {
        // arrange        
        const wrapper = mount(TreeNode, {
            propsData: {
                nodeData: nodeData
            }
        });
        const anchor = wrapper.find('#node-032');

        // act
        anchor.trigger('click');

        // assert
        expect(wrapper.emitted('node-select')).toBeDefined();
        expect(wrapper.emitted('node-select')[0][1]).toEqual([2, 1]);

        wrapper.destroy();
    });

    test.skip('emits "node-focus 0" nested node on focus', async () => {
        // arrange
        const wrapper = mount(TreeNode, {
            propsData: {
                nodeData: nodeData
            },
        });
        const anchor = wrapper.find('#node-03');

        // act
        anchor.trigger('focus');

        // assert
        expect(anchor.emitted('focus')).toBeDefined();
        expect(wrapper.emitted('node-focus')).toBeDefined();
        expect(wrapper.emitted('node-focus')[0][1]).toEqual([2]);

        wrapper.destroy();
    });

    test.skip('emits "node-blur -1" nested node on blur', async () => {
        // arrange
        const wrapper = mount(TreeNode, {
            propsData: {
                nodeData: nodeData
            },
        });
        const anchor = wrapper.find('#node-03');

        // act
        anchor.trigger('blur');

        // assert
        expect(wrapper.emitted('node-blur')).toBeDefined();
        expect(wrapper.emitted('node-blur')[0][1]).toEqual([2]);

        wrapper.destroy();
    });

    test.skip('emits "node-focus 0" nested node on focus nested children', async () => {
        // arrange        
        const wrapper = mount(TreeNode, {
            propsData: {
                nodeData: nodeData
            }
        });
        const anchor = wrapper.find('#node-032');

        // act
        anchor.trigger('focus');

        // assert
        expect(anchor.emitted('focus')).toBeDefined();

        expect(wrapper.emitted('node-focus')).toBeDefined();
        expect(wrapper.emitted('node-focus')[0][1]).toEqual([2, 1]);

        wrapper.destroy();
    });

    test.skip('emits "node-blur -1" nested node on blur nested children', async () => {
        // arrange        
        const wrapper = mount(TreeNode, {
            propsData: {
                nodeData: nodeData
            }
        });
        const anchor = wrapper.find('#node-032');

        // act
        anchor.trigger('blur');

        // assert
        expect(anchor.emitted('blur')).toBeDefined();

        expect(wrapper.emitted('node-blur')).toBeDefined();
        expect(wrapper.emitted('node-blur')[0][1]).toEqual([2, 1]);

        wrapper.destroy();
    });

    test.skip('emits "node-collapse" on keydown.left', async () => {
        // arrange
        const wrapper = mount(TreeNode, {
            propsData: {
                nodeData: nodeData
            }
        });
        const anchor1 = wrapper.find('#node-01');

        // act
        anchor1.trigger('keydown.left');

        // assert
        expect(anchor1.emitted()).toBeDefined();
        expect(wrapper.emitted('node-collapse')).toBeDefined();
        expect(wrapper.emitted('node-collapse')[0][1]).toEqual([0]);

        wrapper.destroy();
    });

    test.skip('emits "node-collapse" on nested node on keydown.left', async () => {
        // arrange
        const wrapper = mount(TreeNode, {
            propsData: {
                nodeData: nodeData
            },
        });
        const anchor1 = wrapper.find('#node-0321');
        const anchor2 = wrapper.find('#node-032');
        const anchor3 = wrapper.find('#node-03');

        // act
        anchor1.trigger('keydown.left');

        // assert
        expect(anchor1.emitted('keydown')).toBeDefined();
        expect(wrapper.emitted('node-collapse')).toBeDefined();
        expect(wrapper.emitted('node-collapse')[0][1]).toEqual([2, 1, 0]);

        anchor2.trigger('keydown.left');

        expect(anchor2.emitted('keydown')).toBeDefined();
        expect(wrapper.emitted('node-collapse')).toBeDefined();
        expect(wrapper.emitted('node-collapse')[1][1]).toEqual([2, 1]);

        anchor3.trigger('keydown.left');

        expect(anchor3.emitted('keydown')).toBeDefined();
        expect(wrapper.emitted('node-collapse')).toBeDefined();
        expect(wrapper.emitted('node-collapse')[2][1]).toEqual([2]);

        wrapper.destroy();
    });

    test.skip('emits "node-expand" on nested node on keydown.right', async () => {
        // arrange
        const wrapper = mount(TreeNode, {
            propsData: {
                nodeData: nodeData
            },
        });
        const anchor1 = wrapper.find('#node-03');
        const anchor2 = wrapper.find('#node-032');
        const anchor3 = wrapper.find('#node-0321');

        // act
        anchor1.trigger('keydown.right');

        // assert
        expect(anchor1.emitted('keydown')).toBeDefined();
        expect(wrapper.emitted('node-expand')).toBeDefined();
        expect(wrapper.emitted('node-expand')[0][1]).toEqual([2]);

        anchor2.trigger('keydown.right');

        expect(anchor2.emitted('keydown')).toBeDefined();
        expect(wrapper.emitted('node-expand')).toBeDefined();
        expect(wrapper.emitted('node-expand')[1][1]).toEqual([2, 1]);

        anchor3.trigger('keydown.right');

        expect(anchor3.emitted('keydown')).toBeDefined();
        expect(wrapper.emitted('node-expand')).toBeDefined();
        expect(wrapper.emitted('node-expand')[2][1]).toEqual([2, 1, 0]);

        wrapper.destroy();
    });

    test.skip('emits "node-movedown" on keydown.down', async () => {
        // arrange
        const wrapper = mount(TreeNode, {
            propsData: {
                nodeData: nodeData
            },
        });
        const anchor1 = wrapper.find('#node-01');
        const anchor2 = wrapper.find('#node-02');
        const anchor3 = wrapper.find('#node-03');

        // act
        anchor1.trigger('keydown.down');

        // assert
        expect(anchor1.emitted('keydown')).toBeDefined();
        expect(wrapper.emitted('node-movedown')).toBeDefined();
        expect(wrapper.emitted('node-movedown')[0][1]).toEqual([0]);

        anchor2.trigger('keydown.down');

        expect(anchor2.emitted('keydown')).toBeDefined();
        expect(wrapper.emitted('node-movedown')).toBeDefined();
        expect(wrapper.emitted('node-movedown')[1][1]).toEqual([1]);

        anchor3.trigger('keydown.down');

        expect(anchor3.emitted('keydown')).toBeDefined();
        expect(wrapper.emitted('node-movedown')).toBeDefined();
        expect(wrapper.emitted('node-movedown')[2][1]).toEqual([2]);

        wrapper.destroy();
    });

    test.skip('emits "node-movedown" on nested node on keydown.down', async () => {
        // arrange
        const wrapper = mount(TreeNode, {
            propsData: {
                nodeData: nodeData
            },
        });
        const anchor1 = wrapper.find('#node-021');
        const anchor2 = wrapper.find('#node-022');
        const anchor3 = wrapper.find('#node-023');

        // act
        anchor1.trigger('keydown.down');

        // assert
        expect(anchor1.emitted('keydown')).toBeDefined();
        expect(wrapper.emitted('node-movedown')).toBeDefined();
        expect(wrapper.emitted('node-movedown')[0][1]).toEqual([1, 0]);

        anchor2.trigger('keydown.down');

        expect(anchor2.emitted('keydown')).toBeDefined();
        expect(wrapper.emitted('node-movedown')).toBeDefined();
        expect(wrapper.emitted('node-movedown')[1][1]).toEqual([1, 1]);

        anchor3.trigger('keydown.down');

        expect(anchor3.emitted('keydown')).toBeDefined();
        expect(wrapper.emitted('node-movedown')).toBeDefined();
        expect(wrapper.emitted('node-movedown')[2][1]).toEqual([1, 2]);

        wrapper.destroy();
    });

    test.skip('emits "node-moveup" on keydown.down', async () => {
        // arrange
        const wrapper = mount(TreeNode, {
            propsData: {
                nodeData: nodeData
            },
        });
        const anchor1 = wrapper.find('#node-03');
        const anchor2 = wrapper.find('#node-02');
        const anchor3 = wrapper.find('#node-01');

        // act
        anchor1.trigger('keydown.up');

        // assert
        expect(anchor1.emitted('keydown')).toBeDefined();
        expect(wrapper.emitted('node-moveup')).toBeDefined();
        expect(wrapper.emitted('node-moveup')[0][1]).toEqual([2]);

        anchor2.trigger('keydown.up');

        expect(anchor2.emitted('keydown')).toBeDefined();
        expect(wrapper.emitted('node-moveup')).toBeDefined();
        expect(wrapper.emitted('node-moveup')[1][1]).toEqual([1]);

        anchor3.trigger('keydown.up');

        expect(anchor3.emitted('keydown')).toBeDefined();
        expect(wrapper.emitted('node-moveup')).toBeDefined();
        expect(wrapper.emitted('node-moveup')[2][1]).toEqual([0]);

        wrapper.destroy();
    });

    test.skip('emits "node-moveup" on nested node on keydown.down', async () => {
        // arrange
        const wrapper = mount(TreeNode, {
            propsData: {
                nodeData: nodeData
            },
        });
        const anchor1 = wrapper.find('#node-023');
        const anchor2 = wrapper.find('#node-022');
        const anchor3 = wrapper.find('#node-021');

        // act
        anchor1.trigger('keydown.up');

        // assert
        expect(anchor1.emitted('keydown')).toBeDefined();
        expect(wrapper.emitted('node-moveup')).toBeDefined();
        expect(wrapper.emitted('node-moveup')[0][1]).toEqual([1, 2]);

        anchor2.trigger('keydown.up');

        expect(anchor2.emitted('keydown')).toBeDefined();
        expect(wrapper.emitted('node-moveup')).toBeDefined();
        expect(wrapper.emitted('node-moveup')[1][1]).toEqual([1, 1]);

        anchor3.trigger('keydown.up');

        expect(anchor3.emitted('keydown')).toBeDefined();
        expect(wrapper.emitted('node-moveup')).toBeDefined();
        expect(wrapper.emitted('node-moveup')[2][1]).toEqual([1, 0]);

        wrapper.destroy();
    });

    test.skip('anchor tabindex is -1 when data tabindex is -1', async () => {
        // arrange
        const localNodeData = { // [0]
            icon: "icon-01",
            id: "node-01",
            title: "Menu Link 01",
            url: "link-01",
            children: [],
            tabindex: -1,
        }
        const wrapper = mount(TreeNode, {
            propsData: {
                nodeData: [localNodeData]
            }
        });

        // act

        // assert
        expect(wrapper.find('#node-01').attributes('tabindex')).toBe('-1');
    });

    test.skip('anchor tabindex is 0 when data tabindex is 0', async () => {
        // arrange
        const localNodeData = { // [0]
            icon: "icon-01",
            id: "node-01",
            title: "Menu Link 01",
            url: "link-01",
            children: [],
            tabindex: 0,
        }
        const wrapper = mount(TreeNode, {
            propsData: {
                nodeData: [localNodeData]
            }
        });

        // act

        // assert
        expect(wrapper.find('#node-01').attributes('tabindex')).toBe('0');
    });

    test.skip('anchor tabindex is 0 when data tabindex is changed to 0', async () => {
        // arrange
        const localNodeData = { // [0]
            icon: "icon-01",
            id: "node-01",
            title: "Menu Link 01",
            url: "link-01",
            children: [],
            tabindex: -1,
        }
        const wrapper = mount(TreeNode, {
            attachToDocument: true,
            propsData: {
                nodeData: [localNodeData]
            }
        });

        // act
        localNodeData.tabindex = 0;
        wrapper.setProps({
            nodeData: [localNodeData]
        });

        // assert
        expect(wrapper.find('#node-01').attributes('tabindex')).toBe('0');
    });

    test.skip('inject new anchor', async () => {
        // arrange
        const injectHtml = {
            render(this: TreeNodeVue, h: CreateElement) {
                return h('div', {
                    class: 'starman'
                });
            }
        }
        const wrapper = mount(TreeNode, {
            attachToDocument: true,
            propsData: {
                nodeData: nodeData
            },
            provide: {
                anchor: injectHtml
            }
        });

        // act

        // assert
        expect(wrapper.findAll('div.starman').length).toBeGreaterThan(0);

        wrapper.destroy();
    });

    test.skip('node is expanded', async () => {
        // arrange
        const localNodedata = { // [1]
            icon: "icon-02",
            id: "node-02",
            title: "Menu Link 02",
            url: "link-02",
            isExpanded: false,
            children: [
                {
                    icon: "icon-021",
                    id: "node-021",
                    title: "Menu Link 021",
                    url: "link-021",
                    children: [],
                    isExpanded: false,
                },
                {
                    icon: "icon-022",
                    id: "node-022",
                    title: "Menu Link 022",
                    url: "link-022",
                    children: [],
                    isExpanded: false,
                },
                {
                    icon: "icon-023",
                    id: "node-023",
                    title: "Menu Link 032",
                    url: "link-023",
                    children: [],
                    isExpanded: false,
                },
            ],
        };

        const wrapper = mount(TreeNode, {
            attachToDocument: true,
            propsData: {
                nodeData: [localNodedata]
            },
        });

        // act
        expect(wrapper.find('#node-02-child').isVisible()).toBe(false);
        localNodedata.isExpanded = true;
        wrapper.setProps({
            nodeData: [localNodedata]
        });

        // assert
        expect(wrapper.find('#node-02-child').isVisible()).toBe(true);

        wrapper.destroy();
    });

    test.skip('node is collapsed', async () => {
        // arrange
        const localNodedata = { // [1]
            icon: "icon-02",
            id: "node-02",
            title: "Menu Link 02",
            url: "link-02",
            isExpanded: true,
            children: [
                {
                    icon: "icon-021",
                    id: "node-021",
                    title: "Menu Link 021",
                    url: "link-021",
                    children: [],
                    isExpanded: false,
                },
                {
                    icon: "icon-022",
                    id: "node-022",
                    title: "Menu Link 022",
                    url: "link-022",
                    children: [],
                    isExpanded: false,
                },
                {
                    icon: "icon-023",
                    id: "node-023",
                    title: "Menu Link 032",
                    url: "link-023",
                    children: [],
                    isExpanded: false,
                },
            ],
        };

        const wrapper = mount(TreeNode, {
            attachToDocument: true,
            propsData: {
                nodeData: [localNodedata]
            },
        });

        // act
        expect(wrapper.find('#node-02-child').isVisible()).toBe(true);
        localNodedata.isExpanded = false;
        wrapper.setProps({
            nodeData: [localNodedata]
        });
        // waitNT(wrapper.vm);
        // assert
        expect(wrapper.find('#node-02-child').isVisible()).toBe(false);

        wrapper.destroy();
    });

});
