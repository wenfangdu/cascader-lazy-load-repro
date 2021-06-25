import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const cascader = ref([])
    let id = 0

    return () => (
      <ElCascader
        vModel={cascader.value}
        props={{
          lazy: true,
          // 👇 triggers on every re-render, should be checked by content, e.g. using lodash's isEqual
          lazyLoad(node, resolve) {
            const { level } = node
            setTimeout(() => {
              const nodes = Array.from({ length: level + 1 }).map(() => ({
                value: ++id,
                label: `选项${id}`,
                leaf: level >= 2,
              }))
              // 通过调用resolve将子节点数据返回，通知组件数据加载完成
              resolve(nodes)
            }, 300)
          },
        }}
      />
    )
  },
})
