<template>
    <div class="window">
      <!-- .toolbar-header sits at the top of your app -->
      <!-- <header class="toolbar toolbar-header">
        <h1 class="title">Photon</h1>
      </header> -->
      <!-- Your app's content goes inside .window-content -->
      <div class="window-content">
        <div class="pane-group">
          <div class="pane pane-sm sidebar">
            <nav class="nav-group">
              <h5 class="nav-group-title">最近的粘贴板</h5>
              <span class="nav-group-item">
                <span class="icon icon-home"></span>
                connors
              </span>
              <span class="nav-group-item active" @click="showRecentClip">
                <span class="icon icon-light-up"></span>
                Photon
              </span>
            </nav>
          </div>

          <div class="pane">
            <table class="table-striped">
              <thead>
                <tr>
                  <th>内容</th>
                  <th>时间</th>
                  <th>类型</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>bars.scss</td>
                  <td>2019-10-20 22:22:22</td>
                  <td>文字</td>
                  <td><button class="btn btn-negative">delete</button></td>
                </tr>
                <tr>
                  <td>base.scss</td>
                  <td>Document</td>
                  <td>Oct 13, 2015</td>
                  <td>connors</td>
                </tr>
                <tr>
                  <td>button-groups.scss</td>
                  <td>Document</td>
                  <td>Oct 13, 2015</td>
                  <td>connors</td>
                </tr>
                <tr>
                  <td>buttons.scss</td>
                  <td>Document</td>
                  <td>Oct 13, 2015</td>
                  <td>connors</td>
                </tr>
                <tr>
                  <td>docs.scss</td>
                  <td>Document</td>
                  <td>Oct 13, 2015</td>
                  <td>connors</td>
                </tr>
                <tr>
                  <td>forms.scss</td>
                  <td>Document</td>
                  <td>Oct 13, 2015</td>
                  <td>connors</td>
                </tr>
                <tr>
                  <td>grid.scss</td>
                  <td>Document</td>
                  <td>Oct 13, 2015</td>
                  <td>connors</td>
                </tr>
                <tr>
                  <td>icons.scss</td>
                  <td>Document</td>
                  <td>Oct 13, 2015</td>
                  <td>connors</td>
                </tr>
                <tr>
                  <td>images.scss</td>
                  <td>Document</td>
                  <td>Oct 13, 2015</td>
                  <td>connors</td>
                </tr>
                <tr>
                  <td>lists.scss</td>
                  <td>Document</td>
                  <td>Oct 13, 2015</td>
                  <td>connors</td>
                </tr>
                <tr>
                  <td>mixins.scss</td>
                  <td>Document</td>
                  <td>Oct 13, 2015</td>
                  <td>connors</td>
                </tr>
                <tr>
                  <td>navs.scss</td>
                  <td>Document</td>
                  <td>Oct 13, 2015</td>
                  <td>connors</td>
                </tr>
                <tr>
                  <td>normalize.scss</td>
                  <td>Document</td>
                  <td>Oct 13, 2015</td>
                  <td>connors</td>
                </tr>
                <tr>
                  <td>photon.scss</td>
                  <td>Document</td>
                  <td>Oct 13, 2015</td>
                  <td>connors</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import {clipboard, Tray} from 'electron'
export default {
  data () {
    return {}
  },
  methods: {
    showRecentClip () {
      console.log(234)
      console.log(clipboard.readText('selection'))
      console.log(new Tray(clipboard.readImage()))
    }
  }
}
</script>

<style lang="scss">
  // @import '../../assets/css/photon.min.css';
</style>
