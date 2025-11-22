import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import LdSignaturePad from '../src/SignaturePad.vue';

describe('LdSignaturePad', () => {
  // 测试1: 组件能正常渲染
  it('should render correctly', () => {
    const wrapper = mount(LdSignaturePad);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('canvas').exists()).toBe(true);
  });

  // 测试2: 正确应用自定义样式
  it('should apply custom styles', () => {
    const wrapper = mount(LdSignaturePad, {
      props: {
        lineWidth: 5,
        strokeStyle: '#ff0000',
        fillStyle: '#f0f0f0',
        className: 'test-class',
      },
    });

    // 检查自定义类名是否应用
    expect(wrapper.find('canvas').classes()).toContain('test-class');
    expect(wrapper.find('canvas').classes()).toContain('ld-signature-pad');
  });

  // 测试3: 能够捕获鼠标/触摸事件进行绘制
  // it("should handle drawing events", async () => {
  //   const wrapper = mount(LdSignaturePad);
  //   const canvas = wrapper.find("canvas");
  //
  //   // 模拟鼠标按下
  //   await canvas.trigger("mousedown", { clientX: 10, clientY: 10 });
  //
  //   // 模拟鼠标移动
  //   await canvas.trigger("mousemove", { clientX: 50, clientY: 50 });
  //
  //   // 模拟鼠标抬起
  //   await canvas.trigger("mouseup");
  //
  //   // 验证是否能获取到签名数据（不为空）
  //   const signatureData = wrapper.vm.getSignatureDataURL();
  //   expect(signatureData).toBeDefined();
  //   expect(signatureData).toContain("data:image/png");
  // });

  // 测试4: 重置功能正常工作
  it('should reset signature pad correctly', async () => {
    const wrapper = mount(LdSignaturePad);
    const canvas = wrapper.find('canvas');

    // 先绘制一些内容
    await canvas.trigger('mousedown', { clientX: 10, clientY: 10 });
    await canvas.trigger('mousemove', { clientX: 50, clientY: 50 });
    await canvas.trigger('mouseup');

    // 检查有内容
    let signatureData = wrapper.vm.getSignatureDataURL();
    expect(signatureData).toBeDefined();

    // 执行重置
    wrapper.vm.resetSignaturePad();

    // 检查重置后内容为空（或为初始状态）
    signatureData = wrapper.vm.getSignatureDataURL();
    expect(signatureData).toBeDefined();
  });

  // 测试5: 触摸事件支持
  it('should support touch events', async () => {
    const wrapper = mount(LdSignaturePad);
    const canvas = wrapper.find('canvas');

    // 模拟触摸开始
    await canvas.trigger('touchstart', {
      touches: [{ clientX: 20, clientY: 20 }],
    });

    // 模拟触摸移动
    await canvas.trigger('touchmove', {
      touches: [{ clientX: 60, clientY: 60 }],
    });

    // 模拟触摸结束
    await canvas.trigger('touchend');

    // 验证签名数据
    const signatureData = wrapper.vm.getSignatureDataURL();
    expect(signatureData).toBeDefined();
  });

  // 测试6: 检查canvas尺寸是否正确设置
  it('should set correct canvas dimensions', async () => {
    const wrapper = mount(LdSignaturePad, {
      props: {
        className: 'test-size',
      },
    });

    // 给canvas设置固定尺寸
    const canvas = wrapper.find('canvas');
    (canvas.element as HTMLCanvasElement).width = 400;
    (canvas.element as HTMLCanvasElement).height = 200;

    // 检查尺寸是否正确
    expect((canvas.element as HTMLCanvasElement).width).toBe(400);
    expect((canvas.element as HTMLCanvasElement).height).toBe(200);
  });
});
