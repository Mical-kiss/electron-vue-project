<template>
  <section>
    <h1>这是一个测试页面</h1>

    <button @click="openNewWindow">点点点</button>
  </section>
</template>

<script>
import {remote} from 'electron'
const { dialog } = remote
export default {
  name: 'test-page',
  methods: {
    openNewWindow () {
      console.log(222)
      dialog.showOpenDialog({
        title: '文件选择'
      }, (filesList) => {
        console.log(filesList)
      })
    }
  },
  mounted () {
    document.cookie = 'a=1'
    document.cookie = 'b=2'
  }
}
</script>

<style lang="scss">
section {
  color: #28354c;
}
</style>
