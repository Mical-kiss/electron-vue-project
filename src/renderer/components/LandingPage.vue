<template>
    <div class="window">
      <div class="window-content">
        <div class="pane-group">
          <div class="pane pane-sm sidebar">
            <nav class="nav-group">
              <h5 class="nav-group-title">最近的粘贴板</h5>
              <span class="nav-group-item" :class="[activeIndex == index ? 'active' : '']" v-for="(item, index) in clipList" :key="index" @click="handleClick(item, index)">
                  {{item.content}}
              </span>
            </nav>
          </div>

          <div class="pane main-content">
            <div class="content">
              {{showItem.content}}
            </div>
            <span class="icon icon-clock"></span> 时间： {{showItem.time}}
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import {clipboard, ipcRenderer} from 'electron'
import { dataStore } from '../../util/clipStore'
const fs = require('fs')
let clipList = []
export default {
  data () {
    return {
      clipList,
      showItem: {},
      activeIndex: 0
    }
  },
  methods: {
    showRecentClip () {
      console.log(clipboard.readText('selection'))
    },
    handleClick (item, index) {
      this.showItem = item
      this.activeIndex = index
    },
    sendToMain () {
      ipcRenderer.send('')
    }
  },
  mounted () {
    this.clipList = dataStore.getTracks()
    this.showItem = this.clipList[0] || {}
    fs.watch('/Users/zx/Library/Application Support/Electron/config.json', () => {
      console.log(this.clipList = dataStore.getTracks())
    })
  }
}
</script>

<style lang="scss">
  .window .window-content .pane {
    &.sidebar {
      flex: 0 0 auto;
    }
    &.main-content {
      text-align: center;
    }
    .content {
      padding: 40px;
      font-size: 36px;
    }
  }
</style>
