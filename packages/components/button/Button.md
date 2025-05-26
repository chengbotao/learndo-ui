# Button

> 按钮组件

## 基本用法

::: demo button/demos/TypeFace
通过 `type-face` 属性提供多种外观类型，用于设置不同状态的颜色。
:::

## 禁用状态

::: demo button/demos/IsDisabled
使用 `disabled` 属性来定义按钮是否被禁用
:::

## 调整尺寸

::: demo button/demos/TypeSize
使用 `size` 属性额外配置尺寸，可使用 `large`和`small`两种值
:::

## API

### Attributes

> 支持原生 [`Button`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/button) 属性

| 属性名       | 说明     | 类型                                                          | 默认值 |
|-----------|--------|-------------------------------------------------------------|-----|
| size      | 按钮尺寸大小 | `'large' \| 'small'`                                        | —   |
| type-face | 按钮外观类型 | `'primary' \| 'success' \| 'info' \| 'warning' \| 'danger'` | —   |

### Events

| 事件名     | 参数类型         | 说明   |
|---------|--------------|------|
| `click` | `MouseEvent` | 点击事件 |

### Slots

| 插槽名       | 说明      |
|-----------|---------|
| `default` | 自定义默认内容 |
