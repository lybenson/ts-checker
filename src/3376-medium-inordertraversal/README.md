# InorderTraversal

实现二叉树中序遍历的类型版本

例如：

```ts
const tree1 = {
  val: 1,
  left: null,
  right: {
    val: 2,
    left: {
      val: 3,
      left: null,
      right: null
    },
    right: null
  }
} as const

type A = InorderTraversal<typeof tree1> // [1, 3, 2]
```

## Solution

```ts
type InorderTraversal<T extends TreeNode | null> = T extends TreeNode
  ? [...InorderTraversal<T['left']>, T['val'], ...InorderTraversal<T['right']>]
  : []
```

二叉树的中序遍历顺序是先左子树, 根节点, 右子树

在 `InorderTraversal` 类型定义中先通过 `extends` 确定泛型类型是 `TreeNode` 以确保后面可以访问其属性。

再递归传入子树构造结果类型
