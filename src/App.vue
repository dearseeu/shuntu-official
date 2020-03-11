<template>
  <div id="app">
    <my-header :msgList="msgList" :menuList="menuList"></my-header>
    <keep-alive>
      <!-- <router-view :msgList="msgList" :menuList="menuList" :homeId="homeId" v-if="homeId && menuList"></router-view> -->
      <router-view :msgList="msgList" :menuList="menuList" v-if="menuList.length > 0"></router-view>
    </keep-alive>
    <my-footer :msgList="msgList" :menuList="menuList"></my-footer>
    <BackTop></BackTop>
  </div>
</template>

<script>
import MyHeader from "./components/MyHeader/MyHeader";
import MyFooter from "./components/MyFooter/MyFooter";
import { BackTop } from "iview";
import { getMsg, getMenu } from "@api/getMsg";

export default {
  name: "app",
  components: {
    MyHeader,
    MyFooter,
    BackTop
  },
  data() {
    return {
      msgList: {},
      menuList: [],
      homeId: ""
    };
  },
  methods: {
    _getMsg() {
      getMsg().then(res => {
        this.msgList = res.data;
        document.title = this.msgList.site_name
      });
    },
    _getMenu() {
      getMenu().then(res => {
        this.menuList = res.data;
        // this.homeId = res.data[0].id;
        let obj = {};
        this.menuList.forEach(v => {
          if (v.hasChildren && v.childrens.length > 0) {
            v.childrens.forEach(two => {
              if (two.hasChildren && two.childrens.length > 0) {
                two.childrens.forEach(three => {
                  obj[three.code] = three.id;
                });
              }
            });
          } else {
            obj[v.code] = v.id;
          }
        });
        // 存放 菜单id
        sessionStorage.setItem("ids", JSON.stringify(obj));
      });
    }
  },
  created() {
    this._getMsg();
    this._getMenu();
  }
};
</script>

<style lang="stylus">
#app {
  /* font-family: "Avenir", Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  height: 100%
}
</style>
