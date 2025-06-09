import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Button from "../src/Button.vue";

describe("Button.vue", () => {
  it("create", () => {
    const wrapper = mount(Button, { props: { typeFace: "primary" } });

    expect(wrapper.classes()).toContain("ld-button-primary");
  });
  it("nativeType", () => {
    const wrapper = mount(Button, { props: { type: "submit" } });

    expect(wrapper.attributes("type")).toBe("submit");
  });

  it("size", () => {
    const wrapper = mount(Button, { props: { size: "large" } });

    expect(wrapper.classes()).toContain("ld-button-large");
  });

  it("handle click", async () => {
    const wrapper = mount(Button, {
      slots: {
        default: "按钮",
      },
    });

    await wrapper.trigger("click");
    expect(wrapper.emitted()).toBeDefined();
  });

  it("disabled", async () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true,
      },
      slots: {
        default: "按钮",
      },
    });

    expect(wrapper.classes()).toContain("disabled");
    await wrapper.trigger("click");
    expect(wrapper.emitted("click")).toBeUndefined();
  });
});
