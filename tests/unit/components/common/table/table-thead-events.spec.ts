import { shallowMount, Wrapper } from '@vue/test-utils';
import Table from  "@/components/common/table/table.vue";

const testItems = [{ a: 1, b: 2, c: 3 }];
const testFields = [{ key: 'a', label: 'A' }, { key: 'b', label: 'B' }, { key: 'c', label: 'C' }];

describe('table > thead events', () => {
    let wrapper: Wrapper<any> | null = null;
    afterEach(() => {
        wrapper = null;
    });

    test('head should not emit head:click event when listeners have not been applied', () => {
        // arrange
        wrapper = shallowMount(Table, {
            propsData: {
                items: testItems,
                fields: testFields,
            },
            listeners: {},
        });

        // act

        // assert
        const rows = wrapper.findAll('thead > tr');
        expect(rows.length).toBe(1);
        const ths = wrapper.findAll('thead > tr >th');
        expect(ths.length).toBe(testFields.length);
        expect(wrapper.emitted('head:click')).not.toBeDefined();
        ths.at(0).trigger('click');
        expect(wrapper.emitted('head:click')).not.toBeDefined();
        ths.at(1).trigger('click');
        expect(wrapper.emitted('head:click')).not.toBeDefined();
        ths.at(2).trigger('click');
        expect(wrapper.emitted('head:click')).not.toBeDefined();        
    });

    test('head should emit head:click event when head cell is clicked', () => {
        // arrange
        wrapper = shallowMount(Table, {
            propsData: {
                items: testItems,
                fields: testFields,
            },
            listeners: {
                'head:click': jest.fn(),
            },
        });

        // act

        // assert 
        const rows = wrapper.findAll('thead > tr');
        expect(rows.length).toBe(1);
        const ths = wrapper.findAll('thead > tr >th');
        expect(ths.length).toBe(testFields.length);
        ths.at(0).trigger('click');
        expect(wrapper.emitted('head:click')).toBeDefined();
        expect(wrapper.emitted('head:click').length).toBe(1);
        expect(wrapper.emitted('head:click')[0][0]).toEqual(testFields[0].key);
        expect(wrapper.emitted('head:click')[0][1]).toEqual(testFields[0]) // Field definition
        expect(wrapper.emitted('head:click')[0][2]).toBeInstanceOf(MouseEvent) // Event
    });

    test('should not emit head:click event when clicking on a button or other interactive element', () => {
        // arrange
        wrapper = shallowMount(Table, {
            propsData: {
                fields: testFields,
                items: testItems
            },
            listeners: {
                'head:click': jest.fn()
            },
            slots: {
                HEAD_a: '<button id="a">button</button>',
                HEAD_b: '<input id="b">',
                HEAD_c: '<a href="#" id="c">link</a>'
            }
        });

        // act

        // assert
        const ths = wrapper.findAll('thead > tr > th');
        expect(ths.length).toBe(testFields.length);
        expect(wrapper.emitted('head:click')).not.toBeDefined();

        const button = wrapper.find('button[id="a"]');
        expect(button.exists()).toBe(true);
        button.trigger('click');
        expect(wrapper.emitted('head:click')).toBeDefined();

        const input = wrapper.find('input[id="b"]');
        expect(input.exists()).toBe(true);
        expect(wrapper.emitted('head:click')).toBeDefined();

        const link = wrapper.find('a[id="c"]');
        expect(link.exists()).toBe(true);
        expect(wrapper.emitted('head:click')).toBeDefined();
    });
});
