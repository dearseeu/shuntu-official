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
          <!-- tab名称 -->
          <div>
            <h3 class="page-name">{{item.name}}</h3>
            <div class="page-icon">
              <img src="~@/assets/x.png" alt />
            </div>
          </div>
          <!-- 第一部分 产品基础架构 -->
          <div class="base-container" v-if="productMsg.name">
            <div class="sub-title">
              <h3>{{productMsg.name}}</h3>
              <div class="divider"></div>
            </div>
            <!-- 情况一 卡片式 -->
            <div class="flex-start" v-if="activeTabName == 'jbztsjk' || activeTabName == 'gjb'">
              <Card class="database-card" v-for="one in productMsg.contents" :key="one.id">
                <div class="card">
                  <div class="card-img">
                    <img :src="$api + one.picurl" />
                  </div>
                  <h3 class="card-title">{{one.title}}</h3>
                  <ul class="card-list">
                    <li
                      class="card-item"
                      v-for="(two,index) in one.content.split('^')"
                      :key="index"
                    >{{two}}</li>
                  </ul>
                </div>
              </Card>
            </div>
            <!-- 情况二 树直 标题 + 列表 -->
            <div
              class="align-center-container page-content"
              v-if="activeTabName == 'zdycj' || activeTabName == 'xkjs' || activeTabName == 'sfzyrz' || activeTabName == 'yjsdsj'"
            >
              <div class="content-left">
                <img :src="$api + productMsg.icon" alt />
              </div>
              <div class="content-right">
                <div v-for="one in productMsg.contents" :key="one.id">
                  <h3 class="card-title">{{one.title}}</h3>
                  <h4 class="card-info" v-if="one.info">{{one.info}}</h4>
                  <ul class="right-list">
                    <li
                      class="right-list-item"
                      v-for="(two,index) in one.content.split('^')"
                      :key="index"
                    >{{two}}</li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- 情况三 带序号 -->
            <div
              class="align-center-container page-content"
              v-if="activeTabName == 'zypg' || activeTabName == 'yxpg' || activeTabName == 'bksdsj'"
            >
              <div class="content-left">
                <img :src="$api + productMsg.icon" alt />
              </div>
              <div class="content-right align-center-container">
                <div class="right-box" v-for="(one,index) in productMsg.contents" :key="one.id">
                  <h3 class="underline">0{{index+1}}</h3>
                  <h3 class="card-title">{{one.title}}</h3>
                  <ul class="right-list">
                    <li
                      class="right-list-item"
                      v-for="(two,index) in one.content.split('^')"
                      :key="index"
                    >{{two}}</li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- 情况四 主观评价 客观评价 -->
            <div class="align-center-container page-content" v-if="activeTabName == 'jxpj'">
              <div class="content-left">
                <img :src="$api + productMsg.icon" alt />
              </div>
              <div style="width:50%;" class="align-center-container">
                <div style="width:50%;">
                  <h3 class="card-info">{{productMsg.contents[0].info}}</h3>
                  <h3 class="card-title">{{productMsg.contents[0].title}}</h3>
                  <ul class="right-list">
                    <li
                      class="right-list-item"
                      v-for="(one,index) in productMsg.contents[0].content.split('^')"
                      :key="index"
                    >{{one}}</li>
                  </ul>
                </div>
                <div style="width:50%;padding-left:25px">
                  <h3 class="card-info">客观评价</h3>
                  <div v-for="one in productMsg.contents.slice(1)" :key="one.id">
                    <h3 class="card-title">{{one.title}}</h3>
                    <ul class="right-list">
                      <li
                        class="right-list-item"
                        v-for="(two,index) in one.content.split('^')"
                        :key="index"
                      >{{two}}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <!-- 情况五 教师画像 -->
            <div class="page-content" v-if="activeTabName == 'jshx'">
              <div class="align-center-container page-content">
                <div class="content-left">
                  <img :src="$api + productMsg.icon" alt />
                </div>
                <div class="content-right">
                  <p class="teacher-draw-text">{{productMsg.info}}</p>
                </div>
              </div>
              <div class="align-center-container" style="margin-top:60px">
                <div style="width:20%">
                  <h3 class="underline">教师结构</h3>
                  <div v-for="one in productMsg.contents.slice(0,3)" :key="one.id">
                    <h3 class="card-title">{{one.title}}</h3>
                    <ul v-if="one.content" class="right-list">
                      <li class="right-list-item">{{one.content}}</li>
                    </ul>
                  </div>
                </div>
                <div style="width:20%">
                  <h3 class="underline">教师活跃度</h3>
                  <div v-for="one in productMsg.contents.slice(3,6)" :key="one.id">
                    <h3 class="card-title">{{one.title}}</h3>
                    <ul v-if="one.content" class="right-list">
                      <li class="right-list-item">{{one.content}}</li>
                    </ul>
                  </div>
                </div>
                <div style="width:20%">
                  <h3 class="underline">教学与评价</h3>
                  <div v-for="one in productMsg.contents.slice(6,8)" :key="one.id">
                    <h3 class="card-title">{{one.title}}</h3>
                    <ul v-if="one.content" class="right-list">
                      <li class="right-list-item">{{one.content}}</li>
                    </ul>
                  </div>
                </div>
                <div style="width:20%">
                  <h3 class="underline">个人发展</h3>
                  <div v-for="one in productMsg.contents.slice(8)" :key="one.id">
                    <h3 class="card-title">{{one.title}}</h3>
                    <ul v-if="one.content" class="right-list">
                      <li class="right-list-item">{{one.content}}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 第二部分 产品优势 -->
          <div class="bg-container">
            <div class="base-container">
              <div class="sub-title">
                <h3>{{productAd.name}}</h3>
                <div class="divider"></div>
              </div>
              <!-- 情况一 教师画像 -->
              <div v-if="activeTabName == 'jshx'">
                <ul class="product-ad">
                  <li class="ad-tcher" v-for="one in productAd.contents" :key="one.id">
                    <h3 class="underline">{{one.title}}</h3>
                    <p class="card-text">{{one.info}}</p>
                  </li>
                </ul>
              </div>
              <!-- 情况二 卡片式 -->
              <div v-else>
                <ul class="flex-start product-ad">
                  <li class="ad-item" v-for="one in productAd.contents" :key="one.id">
                    <h3 class="card-title">{{one.title}}</h3>
                    <p class="card-text">{{one.content}}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- 第三部分 产品截图 -->
          <div v-if="productCut.title">
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
import { Tabs, TabPane, Card } from "iview";

export default {
  components: {
    Tabs,
    TabPane,
    Card
  },
  data() {
    return {
      bannerList: {},
      productMsg: {},
      productAd: {},
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
            (this.bannerList = {}),
              (this.productMsg = {}),
              (this.productCut = {}),
              (this.productMore = {});
            this.bannerList = res.data[0].contents[0];
            if (res.data[1].code.indexOf("subtool") !== -1) {
              this.productMsg = res.data[1];
              this.productAd = res.data[2];
              if (res.data.length == 4) {
                this.productCut = res.data[3].contents[0];
              }
            } else {
              this.productAd = res.data[1];
              this.productCut = res.data[2].contents[0];
            }
          } else {
            this.$message.error(errorMsg);
          }
        })
        .catch(error => {
          console.log(error);
        });
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
      } else if (name == "bigdata") {
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
@import '~@/common/stylus/variable.styl';

.page-name {
  text-align: center;
  color: $blue-text;
  font-size: $font-size-product-name;
  margin: 90px 0 45px;
  font-size: $font-size-page-title;
  font-weight: bold;
}

.page-icon {
  width: 75px;
  height: 75px;
  margin: 0 auto;
}

.card-info {
  font-size: $font-size-product-name;
  color: $blue-text;
  margin: 12px 0;
}

.page-content {
  align-items: center;

  .content-left {
    width: 450px;
  }

  .content-right {
    width: 550px;

    .right-box {
      width: 30%;
      margin: 0 0 20px;
    }

    .teacher-draw-text {
      background: url('~@/assets/4.png') no-repeat;
      height: 140px;
      line-height: 2;
      padding: 20px;
    }
  }

  .right-list {
    .right-list-item {
      // margin: 17px 0;
      line-height: 2;

      &:before {
        content: '';
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: $blue-text;
        margin-right: 10px;
      }
    }
  }
}

.underline {
  font-size: $font-size-product-name;
  color: $blue-text;
  font-weight: bold;

  &:after {
    content: '';
    display: block;
    width: 40px;
    border-top: 1px solid $black-text;
    margin: 15px 0;
  }
}

.database-card {
  width: 31%;
  height: 300px;
  margin: 0 20px 20px 0;

  .card {
    text-align: center;

    .card-img {
      // text-align center
      width: 80px;
      margin: 0 auto;
      // height 80px
    }
  }
}

.card-list {
  .card-item {
    // margin: 10px 0;
    line-height: 2;
  }
}

.flex-start {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.product-ad {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;

  .ad-item {
    width: 31%;
    min-height: 200px;
    padding: 15px;
    margin: 0 20px 20px 0;
    background: $white-text;

    .card-title {
      background: url('~@/assets/2.png') no-repeat 0 center;
      padding-left: 30px;
    }

    .card-text {
      padding: 10px 30px;
    }
  }

  .ad-tcher {
    width: 45%;
    background: url('~@/assets/5.png') no-repeat right 10px;
    margin: 20px 30px;
  }
}

>>>.ivu-tabs-nav-scroll {
  display: flex;
  justify-content: center;
}
</style>

