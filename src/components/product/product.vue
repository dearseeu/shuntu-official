<template>
  <div>
    <!-- banner -->
    <div class="banner">
      <img v-if="bannerList.picurl" :src="$api +bannerList.picurl" alt />
      <!-- <Button size="large" type="default" ghost class="consult-btn" @click="gotoContactUs()">立即咨询</Button> -->
    </div>
    <!-- tab标签 -->
    <div style="margin-top:20px">
      <Tabs :value="activeTabName" @on-click="tabClick">
        <TabPane
          v-for="item in tabList.childrens"
          :key="item.id"
          :label="item.name"
          :name="item.code"
        >
          <!-- 基本状态数据库 -->
          <div class="base-container" v-if="productMsg">
            <div class="sub-title">
              <h3>{{productMsg.title}}</h3>
              <div class="divider"></div>
            </div>
            <div>
              <img v-if="productMsg.picurl" :src="$api +productMsg.picurl" alt />
            </div>
            <Divider />
            <ul class="product-msg" v-if="productMsg.content">
              <li
                v-for="(item,index) in productMsg.content.split('^')"
                :key="index"
                class="card-text"
              >{{item}}</li>
            </ul>
          </div>
          <!-- 产品截图 -->
          <div class="bg-container" v-if="productCut">
            <div class="base-container">
              <div class="sub-title">
                <h3>{{productCut.title}}</h3>
                <div class="divider"></div>
              </div>
              <div>
                <img v-if="productCut.picurl" :src="$api +productCut.picurl" alt />
              </div>
            </div>
          </div>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
import { getContent, errorMsg } from "@api/getMsg";
import { Divider, Button, Tabs, TabPane } from "iview";

export default {
  components: {
    Divider,
    Button,
    Tabs,
    TabPane
  },
  data() {
    return {
      bannerList: {},
      productMsg: {},
      productCut: {},
      ids: JSON.parse(sessionStorage.getItem("ids")),
      tabList: [],
      activeTabName: this.$route.name
    };
  },
  props: ["menuList"],
  methods: {
    _getContent(id) {
      getContent(id)
        .then(res => {
          if (res.statusText == "OK") {
            this.bannerList = res.data[0].contents[0];
            this.productMsg = res.data[1].contents[0];
            this.productCut = res.data[2].contents[0];
          } else {
            this.$message.error(errorMsg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    gotoContactUs() {
      this.$router.push("/contactus");
    },
    // 生成tabs
    setTabs(name, tabName) {
      let start = name.indexOf(".") + 1;
      let end = name.lastIndexOf("/");
      name = name.slice(start, end);
      if (name == "fill") {
        this.tabList = this.menuList[1].childrens[0];
      } else if (name == "evaluation") {
        this.tabList = this.menuList[1].childrens[1];
      } else if ((name = "bigdata")) {
        this.tabList = this.menuList[1].childrens[2];
      }
      this.activeTabName = tabName;
    },
    // tab点击
    tabClick(name) {
      this.activeTabName = name;
      this._getContent(this.ids[name]);
    }
  },
  mounted: function() {
    this._getContent(this.ids[this.$route.name]);
    this.setTabs(this.$route.path, this.$route.name);
  },
  watch: {
    $route: function(route) {
      this._getContent(this.ids[route.name]);
      this.setTabs(route.path, route.name);
    }
  }
};
</script>

<style lang="stylus" scoped>
.consult-btn {
  position: absolute;
  bottom: 25%;
  left: 50%;
  margin-left: -50px;
}

.product-msg {
  text-align: center;

  li {
    background: url('~@/assets/pho_bh.png') 0 20px no-repeat;
    display: inline-block;
    width: 33%;
    line-height: 1.5;
    padding: 20px 33px;
    vertical-align: top;
  }
}

>>>.ivu-tabs-nav-scroll {
  display: flex;
  justify-content: center;
}
</style>

