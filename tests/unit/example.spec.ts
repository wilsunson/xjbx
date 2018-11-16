import { shallowMount, mount } from '@vue/test-utils';
import HelloWorld from '@/components/HelloWorld.vue';
import axios from 'axios/index';

// describe('HelloWorld.vue', () => {
//   it('renders props.msg when passed', () => {
//     const msg = 'new message';
//     const wrapper = shallowMount(HelloWorld, {
//       propsData: { msg }
//     });
//     expect(wrapper.props().msg).toContain(msg);
//   });
//   it('get the html', () => {
//     const wrapper = shallowMount(HelloWorld);
//     expect(wrapper.html()).toBe('<div class=\"hello\"><h1></h1> <h1></h1> <button>3</button></div>');
//   });
//   it('get method expect becalled', () => {
//     const warpper = shallowMount(HelloWorld);
//     const mockFn = jest.fn();
//     warpper.setMethods({
//       getuserInfo: mockFn
//     });
//     warpper.find('button').trigger('click');
//     expect(mockFn).toBeCalled();
//     expect(mockFn).toHaveBeenCalledTimes(1);
//     warpper.vm.$nextTick(()=>{
//       expect(warpper.vm.$data.info).toBe('admin')
//     })
//   });
//   it('get method expect return admin',async ()=>{
//     //jest.mock('dependency-path',implementationFunction)
//     expect.assertions(1);
//     const wrapper = mount(HelloWorld);
//     await (wrapper.vm as any).getuserInfo();
//     expect(wrapper.vm.$data.info).toBe('admin')
//   })
// });

describe('get test', () => {
 
 
  const wrapper = shallowMount(HelloWorld);
  // beforeEach(() => {
  //   jest.clearAllMocks();
  // });
  // afterEach(() => {
  //   wrapper.destroy();
  // });
  // it('getMethods should be used', async () => {
  //   const mockFn = jest.fn();
  //   wrapper.setMethods({ getuserInfo: mockFn });
  //   wrapper.find('button').trigger('click');
  //   expect(mockFn).toBeCalled();
  //   // const result=await (wrapper.vm as any).getuserInfo();
  //   // expect(result).toBe('admin')
  // });
  it('asixo.get Fn should be used', () => {
    jest.mock('axios/index');
    const getdata = {
      data: {
        username: 'admin'
      }
    };
    jest.mock('axios', () => ({
      get: jest.fn(() => {
        return Promise.resolve(getdata);
      })
    }));
    // axios.get.mockResolvedValue(getdata);
    // axios.get.mockImplementation(() => {
    //   Promise.resolve({
    //     data: {
    //       username: 'admin'
    //     }
    //   });
    // });
    const URL =
      'https://www.easy-mock.com/mock/5bc5456f49027948642034b2/baseurl/userinfo';
    wrapper.find('button').trigger('click');
    expect(axios.get).toBeCalledWith(URL);
  });
});
// describe('anthor test in mock',()=>{

// })
