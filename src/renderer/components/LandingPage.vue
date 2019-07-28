<template>
    <div class="window">
      <div class="window-content">
        <div class="pane-group">
          <div class="pane pane-sm sidebar">
            <nav class="nav-group">
              <h5 class="nav-group-title">最近的粘贴板</h5>
              <span class="nav-group-item" :class="[activeIndex == index ? 'active' : '']" v-for="(item, index) in clipList" :key="index" @click="handleClick(item, index)">
                <span class="des">
                  {{item.content}}
                </span>
                <button class="btn btn-mini btn-default" @click="handleCopy(index)">copy</button>
                <button class="btn btn-mini btn-negative" @click.stop="handleDel(index)">del</button>
              </span>
            </nav>
          </div>

          <div class="pane main-content">
            <div class="content">
              {{showItem.content}}
            </div>
            <div class="bottom">
              <span class="icon icon-clock"></span> 时间： {{showItem.time}}
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import {clipboard, ipcRenderer, remote} from 'electron'
import { dataStore } from '../../util/clipStore'
const fs = require('fs')
let clipList = []
let {dialog} = remote
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
    handleCopy (index) {
      clipboard.writeText(this.clipList[index].content)
    },
    handleDel (index) {
      dialog.showMessageBox({
        type: 'warning',
        defaultId: 0,
        message: '确认删除？',
        buttons: ['cancel', 'del']
      },
      function (res) {
        console.log(res)
        if (res) dataStore.delTracks(index)
      })
    },
    sendToMain () {
      ipcRenderer.send('')
    }
  },
  mounted () {
    this.clipList = dataStore.getTracks()
    this.showItem = this.clipList[0] || {}
    fs.watch('/Users/zx/Library/Application Support/Electron/config.json', () => {
      this.clipList = dataStore.getTracks()
      this.activeIndex++
    })
  }
}
</script>

<style lang="scss">
  .window .window-content .pane {
    position: relative;
    &.sidebar {
      flex: 0 0 auto;
    }
    &.main-content {
      text-align: center;
    }
    .nav-group-item {
      display: flex;
      .des {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .btn {
        margin-right: 4px;
      }
    }
    .content {
      padding: 40px;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      font-size: 38px;
      overflow-y: scroll;
      word-wrap: break-word;
    }
    .bottom {
      background: #dcdfe1;
      position: absolute;
      bottom: 0;
      width: 100%;
    }
  }
</style>
