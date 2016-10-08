<template>
  <div id="app">
    <vue-header></vue-header>
    <!-- <div class="space"></div> -->
    <router-view keep-alive transition='slide'></router-view>
    <go-top :bottom='".3rem"' :right='"0"' :screen-num='1.7'></go-top>
    <sidebar v-show='showSidebar' 
             transition='sidebar'
             >
    </sidebar> 
    <mask v-show='showSidebar' transition='fade'></mask>
  </div>
</template>

<script>
import Vue from 'vue'
import store from './vuex/store.js'

import VueHeader from './components/header'
import Topics from './components/topics'
import GoTop from './components/gotop'
import Sidebar from './components/sidebar'
import Mask from './components/mask'

export default {
  components: {
    VueHeader,Topics,GoTop,Sidebar,Mask
  },
  vuex:{
      getters:{
        showSidebar:function(state){
          return state.showSidebar
        }
      }
  },
  store:store
}
</script>

<style lang='scss'>
    *{
      font-family: 'Microsoft YaHei';
    }
    body{
      background-color: #e2e2e2;
    }
    #app{
      max-width: 640px;
      margin: 0 auto;
      text-align: center;
      position: relative;
      /*div[id]:nth-child(2){
        position:absolute;
        top:.7rem;
      }*/
    }
    /*.space{
      height: 0.7rem;
    }*/

    .sidebar-transition {
      transition: all .4s ease;
      overflow: hidden;
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }

    /* .expand-enter 定义进入的开始状态 */
    /* .expand-leave 定义离开的结束状态 */
    .sidebar-enter, .sidebar-leave {
      transform: translate3d(-200px, 0, 0);
      opacity: 0;

    }
    .slide-transition {
      transition: all .5s ease;
      overflow: hidden;
      /*transform: translate3d(0, 0, 0);*/
      opacity: 1;
    }

    /* .expand-enter 定义进入的开始状态 */
    /* .expand-leave 定义离开的结束状态 */
    .slide-enter, .slide-leave {
      transform: translate3d(-200px, 0, 0);
      opacity: 0;
    }
    .fade-transition {
      transition: all .5s ease;
      opacity: 0.5;
      transform: translate3d(0, 0, 0);
    }

    /* .expand-enter 定义进入的开始状态 */
    /* .expand-leave 定义离开的结束状态 */
    .fade-enter, .fade-leave {
      opacity: 0;
      transform: translate3d(0, 0, 0);
    }
</style>
