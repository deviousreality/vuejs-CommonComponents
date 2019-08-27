import { shallowMount, Wrapper } from '@vue/test-utils';
import Table from  "@/components/common/table/table.vue";

const testItems = [{ a: 1, b: 2, c: 3 }, { a: 4, b: 5, c: 6 }];
const testFields = ['a', 'b', 'c'];

describe('table', () => {
    let wrapper: Wrapper<any> | null = null;
    afterEach(() => {
        wrapper = null;
    });

    test('HasComponentInitalized', () => {
        // arrange
        wrapper = shallowMount(Table, {
            propsData: {
                items: []
            }
        });
        // act

        // assert
        expect(wrapper).toBeDefined();
        expect(wrapper.is('Table')).toBeTruthy();        
        expect(wrapper.find('table').exists()).toBe(true);
        expect(wrapper.find('thead').exists()).toBe(true);
        expect(wrapper.find('tbody').exists()).toBe(true);
        expect(wrapper.find('tr').exists()).toBe(true);
    });

    test('TableShouldCreateInitialRows', () => {
        // arrange
        wrapper = shallowMount(Table, {
            propsData: {
                items: testItems,
                fields: testFields,
            }
        });
        //act

        //assert
        expect(wrapper.findAll('th').length).toBe(3);
        expect(wrapper.findAll('td').length).toBe(6);
    });

    test('TableShouldChangeWhenItemArrayChanges', () => {
        // arrange
        const items1 = [{ a: 1, b: 2 }, { a: 3, b: 4 }];
        const items2 = [{ a: 3, b: 4 }];
        wrapper = shallowMount(Table, {
            propsData: {
                items: items1,
                fields: ['a', 'b']
            }
        });

        // act


        // assert
        expect(wrapper.findAll('tbody > tr').length).toBe(2);
        wrapper.setProps({
            items: items2
        });
        expect(wrapper.findAll('tbody > tr').length).toBe(1);
    });

    test('TableHassClass-m-table--hover when hasHover=true', () => {
        // arrange
        wrapper = shallowMount(Table, {
            propsData: {
                items: testItems,
                fields: testFields,
                hasHover: true
            }
        });
        // act

        // assert
        expect(wrapper.classes()).toContain('m-table--hover');
        expect(wrapper.classes()).toContain('m-table');
        expect(wrapper.classes().length).toBe(2);    
    });

    test('TableHasClass-m-table--striped when isStriped=true', () => {
        // arrange
        wrapper = shallowMount(Table, {
            propsData: {
                items: testItems,
                fields: testFields,
                isStriped: true
            }
        });
        // act

        // assert
        expect(wrapper.classes()).toContain('m-table--striped');
        expect(wrapper.classes()).toContain('m-table');
        expect(wrapper.classes().length).toBe(2);
    });
});