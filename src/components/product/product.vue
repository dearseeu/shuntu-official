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
          <div class="product-box" v-if="productMsg">
            <div class="sub-title">
              <h3>{{productMsg.title}}</h3>
              <div class="divider"></div>
            </div>
            <div class="product-msg">
              <img v-if="productMsg.picurl" :src="$api +productMsg.picurl" alt />
            </div>
          </div>
          <!-- 产品截图 -->
          <div class="product-box" v-if="productCut">
            <div>
              <div class="sub-title">
                <h3>{{productCut.title}}</h3>
                <div class="divider"></div>
              </div>
              <div class="product-msg">
                <img v-if="productCut.picurl" :src="$api +productCut.picurl" alt />
              </div>
            </div>
          </div>
          <!-- 如果有第四项 -->
          <div class="bg-container product-box" v-if="productMore">
            <div>
              <div v-if="productMore.title" class="sub-title">
                <h3>{{productMore.title}}</h3>
                <div class="divider"></div>
              </div>
              <div class="product-msg">
                <img v-if="productMore.picurl" :src="$api +productMore.picurl" alt />
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
      productMore: {},
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
            this.bannerList = {},this.productMsg = {},this.productCut = {},this.productMore = {};
            this.bannerList = res.data[0].contents[0];
            this.productMsg = res.data[1].contents[0];
            this.productCut = res.data[2].contents[0];
            if(res.data.length == 4){
              this.productMore = res.data[3].contents[0];
            }
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

.product-box{
  padding 50px 0
}

.product-msg {
  // text-align: center;
  display flex;
  justify-content center;
  img{
    width auto;
  }
//   li {
//     background: url('~@/assets/pho_bh.png') 0 20px no-repeat;
//     display: inline-block;
//     width: 33%;
//     line-height: 1.5;
//     padding: 20px 33px;
//     vertical-align: top;
//   }
}

>>>.ivu-tabs-nav-scroll {
  display: flex;
  justify-content: center;
}
</style>

