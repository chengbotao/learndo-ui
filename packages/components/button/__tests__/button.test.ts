import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import LdButton from "../src/Button.vue";
import type { ButtonProps } from "../src/button.ts";

describe("LdButton", () => {
  // 测试1: 组件能正常渲染
  it("should render correctly", () => {
    const wrapper = mount(LdButton, {
      slots: {
        default: "Test Button",
      },
    });

    // 检查组件是否渲染
    expect(wrapper.exists()).toBe(true);
    // 检查内容是否正确
    expect(wrapper.text()).toContain("Test Button");
  });

  // 测试2: 正确应用typeFace属性
  it("should apply correct typeFace class", () => {
    const types: Array<NonNullable<ButtonProps["typeFace"]>> = [
      "primary",
      "danger",
      "success",
      "info",
      "warning",
    ];
    types.forEach((type) => {
      const wrapper = mount(LdButton, { props: { typeFace: type } });
      expect(wrapper.classes()).toContain(`ld-button-${type}`);
    });
  });

  // 测试3: 正确应用size属性
  it("should apply correct size class", () => {
    const wrapper = mount(LdButton, {
      props: { size: "large" },
    });
    expect(wrapper.classes()).toContain("ld-button-large");

    const smallWrapper = mount(LdButton, {
      props: { size: "small" },
    });
    expect(smallWrapper.classes()).toContain("ld-button-small");

    const defaultWrapper = mount(LdButton);
    expect(defaultWrapper.classes()).not.toContain("ld-button-large");
    expect(defaultWrapper.classes()).not.toContain("ld-button-small");
  });

  // 测试4: 点击事件能正常触发
  it("should emit click event when clicked", async () => {
    const wrapper = mount(LdButton);
    await wrapper.trigger("click");
    // 检查事件是否触发
    expect(wrapper.emitted("click")).toBeTruthy();
    // 检查事件触发次数
    expect(wrapper.emitted("click")?.length).toBe(1);
  });

  // 测试5: 禁用状态下不触发点击事件
  it("should not emit click event when disabled", async () => {
    const wrapper = mount(LdButton, {
      props: { disabled: true },
    });
    await wrapper.trigger("click");
    // 禁用状态下事件不应被触发
    expect(wrapper.emitted("click")).toBeFalsy();
    // 检查禁用样式是否应用
    expect(wrapper.classes()).toContain("disabled");
  });

  // 6. 测试默认插槽内容渲染
  it("should render slot content correctly", () => {
    const slotText = "自定义按钮文本";
    const wrapper = mount(LdButton, { slots: { default: slotText } });
    expect(wrapper.text()).toContain(slotText);
  });

  // 7. 测试 nativeType 属性（自定义 button 类型）
  it("should render correct native type", () => {
    const wrapper = mount(LdButton, { props: { type: "submit" } });
    expect(wrapper.attributes("type")).toBe("submit");
  });
});
