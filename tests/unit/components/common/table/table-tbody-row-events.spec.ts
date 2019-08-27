import { shallowMount, Wrapper } from '@vue/test-utils';
import Table from  "@/components/common/table/table.vue";

const testItems: any[] = [{ a: 1, b: 2, c: 3 }, { a: 4, b: 5, c: 6 }, { a: 7, b: 8, c: 9 }];
const testFields: any[] = ['a', 'b', 'c'];

describe('table > tbody events', () => {
    let wrapper: Wrapper<any> | null = null;
    afterEach(() => {
        wrapper = null;
    });

    test('should emit row:click event when a row is clicked', () => {
        // arrange
        wrapper = shallowMount(Table, {
            propsData: {
                items: testItems,
                fields: testFields,                
            },
            listeners: {
                'row:click': jest.fn()
            }
        });

        // act

        // assert
        const rows = wrapper.findAll('tbody > tr');
        expect(rows.length).toBe(3);
        expect(wrapper.emitted('row:click')).not.toBeDefined();
        rows.at(1).trigger('click');
        expect(wrapper.emitted('row:click')).toBeDefined();    
        expect(wrapper.emitted('row:click')[0][0]).toEqual(testItems[1]); // Row item
        expect(wrapper.emitted('row:click')[0][1]).toEqual(1); // Row index
        expect(wrapper.emitted('row:click')[0][2]).toBeInstanceOf(MouseEvent); // Event    
    });


    test('should emit row:dblclick event when row is double clicked', () => {
        // arrange
        wrapper = shallowMount(Table, {
            propsData: {
                items: testItems,
                fields: testFields
            },
        });
        
        // act

        // assert
        const rows = wrapper.findAll('tbody > tr');
        expect(rows.length).toBe(3);
        expect(wrapper.emitted('row:dblclick')).not.toBeDefined();
        rows.at(1).trigger('dblclick');
        expect(wrapper.emitted('row:dblclick')).toBeDefined();
        expect(wrapper.emitted('row:dblclick').length).toBe(1);
        expect(wrapper.emitted('row:dblclick')[0][0]).toEqual(testItems[1]) ;// Row item
        expect(wrapper.emitted('row:dblclick')[0][1]).toEqual(1); // Row index
        expect(wrapper.emitted('row:dblclick')[0][2]).toBeInstanceOf(MouseEvent); // Event
    });

    test('should emit row:hover event when a row is hovered', () => {
        // arrange
        wrapper = shallowMount(Table, {
            propsData: {
                items: testItems,
                fields: testFields
            }
        });

        // act

        // assert

        const rows = wrapper.findAll('tbody > tr');
        expect(rows.length).toBe(3);
        expect(wrapper.emitted('row:hover')).not.toBeDefined();
        rows.at(1).trigger('mouseenter');
        expect(wrapper.emitted('row:hover')).toBeDefined();
        expect(wrapper.emitted('row:hover').length).toBe(1);
        expect(wrapper.emitted('row:hover')[0][0]).toEqual(testItems[1]); // Row item
        expect(wrapper.emitted('row:hover')[0][1]).toEqual(1); // Row index
        expect(wrapper.emitted('row:hover')[0][2]).toBeInstanceOf(MouseEvent); // Event
    });

    test('should emit row:hoveroff event when a row is unhovered', () => {
        // arrange
        wrapper = shallowMount(Table, {
           propsData: {
               items: testItems,
               fields: testFields
           }
        });
        // act

        //assert
        const rows = wrapper.findAll('tbody > tr');
        expect(rows.length).toBe(3);
        expect(wrapper.emitted('row:hoveroff')).not.toBeDefined();
        rows.at(1).trigger('mouseleave');
        expect(wrapper.emitted('row:hoveroff')).toBeDefined();
        expect(wrapper.emitted('row:hoveroff').length).toBe(1);
        expect(wrapper.emitted('row:hoveroff')[0][0]).toEqual(testItems[1]); // Row item
        expect(wrapper.emitted('row:hoveroff')[0][1]).toEqual(1); // Row index
        expect(wrapper.emitted('row:hoveroff')[0][2]).toBeInstanceOf(MouseEvent); // Event

    });

    test('should emit row:click event when a row is focusable and enter pressed', () => {
        // arrange
        wrapper = shallowMount(Table, {
            propsData: {
                items: testItems,
                fields: testFields
            },
            listeners: {
                'row:click': jest.fn()
            }
        });

        // act

        // assert
        const rows = wrapper.findAll('tbody > tr');
        expect(rows.length).toBe(3);
        expect(wrapper.emitted('row:click')).not.toBeDefined();
        
        rows.at(1).element.focus(); // Event only works whenthe tr is focused
        rows.at(1).trigger('keydown.enter');
                        
        expect(wrapper.emitted('row:click')).toBeDefined();
        expect(wrapper.emitted('row:click').length).toBe(1);
        expect(wrapper.emitted('row:click')[0][0]).toEqual(testItems[1]); // Row item
        expect(wrapper.emitted('row:click')[0][1]).toEqual(1); // Row index
        // Note: the KeyboardEvent is passed to the row:click handler
        expect(wrapper.emitted('row:click')[0][2]).toBeInstanceOf(KeyboardEvent); // Event
    });

    // test('should not emit row:click event when clickong on a button or other interactive element', () => {
    //     // arrange
    //     wrapper = shallowMount(, {
    //         propsData: {
    //             // Add extra virtual columns
    //             fields: testFields.concat(['d', 'e']),
    //             // We just use a single row for testing
    //             items: [testItems[0]]
    //         },
    //         slots: {
    //             // In Vue 2.6x, slots get translated into scopedSlots
    //             a: '<button id="a">button</button>',
    //             b: '<input id="b">',
    //             c: '<a href="#" id="c">link</a>',
    //             d: '<div class="dropdown-menu"><div id="d" class="dropdown-item">dropdown</div></div>',
    //             e: '<label for="e">label</label><input id="e">'
    //         },
    //         listeners: {
    //             'row:click': jest.fn()
    //         }
    //     });
    //     // act

    //     // assert
    //     expect(wrapper).toBeDefined()
    //     expect(wrapper.is('table')).toBe(true)
    //         const rows = wrapper.findAll('tbody > tr');
    //     expect(rows.length).toBe(1);
    //     expect(wrapper.emitted('row:click')).not.toBeDefined();

    //     const button = wrapper.find('button[id="a"]');
    //     expect(button.exists()).toBe(true);
    //     button.trigger('click');
    //     expect(wrapper.emitted('row:click')).not.toBeDefined();

    //     const input = wrapper.find('input[id="b"]');
    //     expect(input.exists()).toBe(true);
    //     input.trigger('click');
    //     expect(wrapper.emitted('row:click')).not.toBeDefined();

    //     const link = wrapper.find('a[id="c"]');
    //     expect(link.exists()).toBe(true);
    //     link.trigger('click');
    //     expect(wrapper.emitted('row:click')).not.toBeDefined();

    //     const div = wrapper.find('div[id="d"]');
    //     expect(div.exists()).toBe(true);
    //     div.trigger('click');
    //     expect(wrapper.emitted('row:click')).not.toBeDefined();

    //     const label = wrapper.find('label[for="e"]');
    //     expect(label.exists()).toBe(true);
    //     label.trigger('click');
    //     expect(wrapper.emitted('row:click')).not.toBeDefined();
    // });

    test('keyboard events move focus to appropriate rows', () => {
        // arrange
        wrapper = shallowMount(Table, {
            propsData: {
                fields: testFields,
                items: testItems
            },
            listeners: {
                'row:click': jest.fn()
            }
        });
        // act 

        // assert
        const rows = wrapper.findAll('tbody > tr');
        expect(rows.length).toBe(3);

        expect(document.activeElement).not.toBe(rows.at(0).element);
        expect(document.activeElement).not.toBe(rows.at(1).element);
        expect(document.activeElement).not.toBe(rows.at(2).element);

        rows.at(0).element.focus();
        expect(document.activeElement).toBe(rows.at(0).element);
    
        rows.at(0).trigger('keydown.end');
        expect(document.activeElement).toBe(rows.at(2).element);

        rows.at(2).trigger('keydown.home');
        expect(document.activeElement).toBe(rows.at(0).element);

        rows.at(0).trigger('keydown.down');
        expect(document.activeElement).toBe(rows.at(1).element);

        rows.at(1).trigger('keydown.up');
        expect(document.activeElement).toBe(rows.at(0).element);

        rows.at(0).trigger('keydown.down', { shiftKey: true });
        expect(document.activeElement).toBe(rows.at(2).element);

        rows.at(2).trigger('keydown.up', { shiftKey: true });
        expect(document.activeElement).toBe(rows.at(0).element);

        // Should only move focus if TR was target
        rows.at(0).find('td').trigger('keydown.down');
        expect(document.activeElement).toBe(rows.at(1).element);

    });
});