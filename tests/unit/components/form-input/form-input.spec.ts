import Input from '@/components/controls/form-input/form-input.vue';
import { mount } from '@vue/test-utils';

describe.skip('form-input', async () => {
  it('emits an input event', async () => {
    //arrange
    const wrapper = mount(Input);

    //act
    const input = wrapper.find('input');
    (input.element as HTMLInputElement).value = 'test';
    input.trigger('input');

    //assert
    expect(wrapper.emitted().input[0]).toEqual(['test']);
  })

  it('emits a native focus event', async () => {
    //arrange
    const spy = jest.fn();
    const wrapper = mount(Input, {
      listeners: {
        focus: spy
      }
    });

    //act
    const input = wrapper.find('input');
    input.trigger('focus');

    //assert
    expect(wrapper.emitted()).toMatchObject({});
    expect(spy).toHaveBeenCalled();
  });

  it('emits a native blur event', async () => {
    const spy = jest.fn();
    const wrapper = mount(Input, {
      listeners: {
        blur: spy
      }
    });
    const input = wrapper.find('input');
    input.trigger('blur');

    expect(wrapper.emitted()).toMatchObject({});
    expect(spy).toHaveBeenCalled();
  })

  it('apply transform function', async () => {
    const wrapper = mount(Input, {
      propsData: {
        formatter(value: string) {
          return value.toLowerCase()
        }
      }
    });
    const input = wrapper.find('input');
    (input.element as HTMLInputElement).value = 'TEST';
    input.trigger('input');

    expect(wrapper.emitted().input[0]).toEqual(['test']);
  })

  it('lazy apply transform function', async () => {
    const wrapper = mount(Input, {
      propsData: {
        formatter(value: string) {
          return value.toLowerCase()
        },
        lazyFormatter: true
      }
    })
    const input = wrapper.find('input');
    (input.element as HTMLInputElement).value = 'TEST'
    input.trigger('input')
    expect(wrapper.emitted().input[0]).not.toEqual(['test'])

    input.trigger('change')
    expect(wrapper.emitted().change[0]).toEqual(['test'])
  })
});