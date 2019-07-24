# Fiber
  fiber reconciler 在 React v16 版本中使用，替代了 stack reconciler（15.x 以前版本)。 

  statck reconciler：父组件里调子组件，可以类比为函数的递归。在设置 setState 后， react 会立即 reconcilation 过程，从父节点开始遍历，找出不同。将所有 Virtual DOM 遍历完成后，reconciler 才会把当前需要修改 DOM 内容，传递给 rerender，进行渲染。对于庞大的树来说，reconcilation 过程中花费时间很长，这期间，主线程是被 js 占用的，因此任何交互、布局、渲染都会停止，这就是卡顿原因。

  scheduling（调度）是 fiber reconcilation 的一个过程，
  
  特点：
  - 并不是所有的state更新都需要立即显示出来，比如屏幕之外的部分的更新
  - 调整任务优先级，优先级高的任务，可以打断优先级低的任务。比如用户输入的响应优先级要比通过请求填充内容的响应优先级更高。
  - 当主线程重新分配给低优先级的操作时，并不会从上次工作的状态开始，而是从新开始。


**任务优先级：**

```js
module.exports = {
  NoWork: 0, // No work is pending.
  SynchronousPriority: 1, // For controlled text inputs. Synchronous side-effects.
  AnimationPriority: 2, // Needs to complete before the next frame.
  HighPriority: 3, // Interaction that needs to complete pretty soon to feel responsive.
  LowPriority: 4, // Data fetching, or result from updating stores.
  OffscreenPriority: 5, // Won't be visible but do the work in case it becomes visible.
};
```

# 生命周期
  // todo

# PureComponent
  // todo

# Context
  // todo

# Hook
  // todo
