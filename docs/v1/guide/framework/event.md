# 事件

## 阻止冒泡

由于小程序本身没有阻止事件冒泡的方式，而是采用不同的方法属性来声明阻止冒泡（如 微信小程序的 catchtap），所以 Rsmax 自己实现了 stopPropagation 方法。


用法如下：

```jsx
function Page() {
  function handleFooClick(event) {
    event.stopPropagation();
  }

  function handleBarClick() {
    ...
  }

  return (
    <View onClick={handleBarClick}>
        bar
      <View onClick={handleFooClick}>
        foo
      </View>
    </View>
  )
}
```

当你点击 foo 标签时，将会触发 `handleFooClick` 回调，但不会执行 `handleBarClick`。
