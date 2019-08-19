<template>
  <div id="app">
    <my-header :msgList="msgList" :menuList="menuList"></my-header>
    <router-view :msgList="msgList" :homeId="homeId" v-if="homeId"></router-view>
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
      homeId: "",
    };
  },
  methods: {
    _getMsg() {
      getMsg().then(res => {
        this.msgList = res.data;
      });
    },
    _getMenu() {
      getMenu().then(res => {
        this.menuList = res.data;
        this.homeId = res.data[0].id;
        let obj = {};
        this.menuList.forEach(v => {
          if (v.code == "product") {
            let arr = [];
            v.childrens.forEach(two => {
              if (two.childrens) {
                two.childrens.forEach(three => {
                  obj[three.code] = three.id;
                });
              }
            });
          } else {
            obj[v.code] = v.id;
          }
        });
        sessionStorage.setItem("ids", JSON.stringify(obj));
      });
    },
    getProductId(e) {
      // console.log(e);
      this.productId = e;
    }
  },
  created() {
    this._getMsg();
    this._getMenu();
  }
};
</script>

<style>
#app {
  /* font-family: "Avenir", Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
</style>
