import { shallowMount, Wrapper } from '@vue/test-utils';
import Table from '@/components/common/table/table.vue';

const testItems = [{ a: 1, b: 2, c: 3 }, { a: 5, b: 5, c: 6 }, { a: 7, b: 8, c: 9 }];

describe('table > primary key', () => {
    let wrapper: Wrapper<any> | null = null;
    afterEach(() => {
        wrapper = null;
    });

    test('default should not have ids on table rows', () => {
        // arrange
        wrapper = shallowMount(Table, {
            propsData: {
                items: testItems,
                id: 'test'
            }
        });

        // act

        // assert
        const trs = wrapper.find('tbody').findAll('tr');
        expect(trs.length).toBe(testItems.length);
        expect(trs.at(0).attributes('id')).not.toBeDefined();
        expect(trs.at(1).attributes('id')).not.toBeDefined();
        expect(trs.at(2).attributes('id')).not.toBeDefined();
    });

    test('should have ids on table rows when primary key is set to field', () => {
        // arrange
        wrapper = shallowMount(Table, {
            propsData: {
                items: testItems,
                id: 'foo',
                primaryKey: 'a'
            }
        });

        // act

        // assert
        const trs = wrapper.find('tbody').findAll('tr');
        expect(trs.length).toBe(testItems.length);
        expect(trs.at(0).attributes('id')).toBeDefined();
        expect(trs.at(0).attributes('id')).toBe(`foo__row_${testItems[0].a}`);
        expect(trs.at(1).attributes('id')).toBeDefined();
        expect(trs.at(1).attributes('id')).toBe(`foo__row_${testItems[1].a}`);
        expect(trs.at(2).attributes('id')).toBeDefined();
        expect(trs.at(2).attributes('id')).toBe(`foo__row_${testItems[2].a}`);    
    });

    test('should not have ids on table rows when primary key is ist to nonexistent field', () => {
        // arrange
        wrapper = shallowMount(Table, {
            propsData: {
                items: testItems,
                id: 'foo', 
                primaryKey: 'ZZZ'
            }
        });
        // act

        // assert
        const trs = wrapper.find('tbody').findAll('tr');
        expect(trs.length).toBe(testItems.length);
        expect(trs.at(0).attributes('id')).not.toBeDefined();
        expect(trs.at(1).attributes('id')).not.toBeDefined();
        expect(trs.at(2).attributes('id')).not.toBeDefined();
    });
});