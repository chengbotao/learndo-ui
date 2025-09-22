# SignaturePad

> 签名组件

## 基本用法

::: demo signaturePad/demos/SignaturePadBasic
:::

## 自定义样式

::: demo signaturePad/demos/SignaturePadCustom
通过 `fillStyle`、`strokeStyle` 和 `lineWidth` 自定义签名板样式
:::

## 签名验证

::: demo signaturePad/demos/SignaturePadValidate
添加签名有效性检查，确保用户已完成签名
:::

## API

### Attributes

| 属性名            | 说明           | 类型                                         | 默认值       |
|----------------|--------------|--------------------------------------------|-----------|
| `fill-style`   | 画布背景色        | `string`                                   | `#f8f9fa` |
| `stroke-style` | 签名线条颜色       | `string`                                   | `#dc3545` |
| `line-width`   | 签名线条宽度       | `number`                                   | 3         |
| `line-style`   | 自定义线条样式的回调函数 | `(ctx: CanvasRenderingContext2D) => void	` | —         |

### DefineExpose

| 方法名                   | 说明            | 返回值       |
|-----------------------|---------------|-----------|
| `hasSignature`        | 判断是否存在有效签名    | `boolean` |
| `getSignatureDataURL` | 获取签名的base64数据 | `string`  |
| `resetSignaturePad`   | 重置签名板         | `void`    |


