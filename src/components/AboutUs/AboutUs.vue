<template>
  <div>
    <!-- banner -->
    <div class="banner" v-if="bannerList.picurl">
      <img v-if="bannerList.picurl" :src="$api + bannerList.picurl" alt />
    </div>
    <!-- 关于顺途科技 -->
    <div class="base-container">
      <div class="sub-title">
        <h3>{{aboutST.title}}</h3>
        <div class="divider"></div>
      </div>
      <div v-if="aboutST.content">
        <img :src="$api + aboutST.picurl" alt />
        <p class="stkj-msg" v-for="(item,index) in aboutST.content.split('^')" :key="index">
          <span class="stkj-name">{{item.slice(0,13)}}</span>
          {{item.slice(13)}}
        </p>
      </div>
    </div>
    <!-- 公司理念 -->
    <div class="base-container">
      <div class="sub-title">
        <h3>{{companyFaith.name}}</h3>
        <div class="divider"></div>
      </div>
      <div>
        <ul class="company-faith align-center-container">
          <li class="company-faith-item" v-for="item in companyFaith.contents" :key="item.id">
            <img :src="$api + item.picurl" alt />
            <h3>{{item.title}}</h3>
            <ul v-if="item.content">
              <li class="company-faith-text" v-for="(v,k) in item.content.split('^')" :key="k">{{v}}</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <!-- 我们的优势 核心能力-->
    <div class="base-container">
      <div class="sub-title">
        <h3>{{mainAdvantage.name}}</h3>
        <div class="divider"></div>
      </div>
      <h3 v-if="mainAdvantage.contents" class="ability-title">{{mainAdvantage.contents[0].title}}：</h3>
      <div class="main-advantage align-center-container">
        <div class="main-advantage-left">
          <ul v-if="mainAdvantage.contents">
            <li
              v-for="(item,index) in mainAdvantage.contents[0].content.split('^')"
              :key="index"
            >{{item}}</li>
          </ul>
        </div>
        <div v-if="mainAdvantage.contents" class="main-advantage-right">
          <img :src="$api + mainAdvantage.contents[0].picurl" alt />
        </div>
      </div>
    </div>
    <!-- 其他能力 -->
    <div class="base-container">
      <ul class="align-center-container">
        <li class="other-advantage" v-for="item in otherAdvantage.contents" :key="item.id">
          <h3 class="ability-title">{{item.title}}：</h3>
          <h3 class="ability-msg">{{item.info}}</h3>
          <p class="ability-des">{{item.content}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getContent, errorMsg } from "@api/getMsg";

export default {
  data() {
    return {
      bannerList: {},
      aboutST: {},
      companyFaith: {},
      mainAdvantage: {},
      otherAdvantage: {},
      ids: JSON.parse(sessionStorage.getItem("ids"))
    };
  },
  methods: {
    _getContent(id) {
      getContent(id)
        .then(res => {
          if (res.statusText == "OK") {
            this.bannerList = res.data[0].contents[0];
            this.aboutST = res.data[1].contents[0];
            this.companyFaith = res.data[2];
            this.mainAdvantage = res.data[3];
            this.otherAdvantage = res.data[4];
          } else {
            this.$message.error(errorMsg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted: function() {
    this._getContent(this.ids.about);
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/common/stylus/variable.styl';

.stkj-msg {
  padding: 15px;
  line-height: 2;
  text-align: justify;

  .stkj-name {
    color: $blue-text;
  }
}

.company-faith-item {
  width: 20%;
  text-align: center;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  border-color: #eee;
  padding-bottom: 25px;

  h3 {
    font-size: $font-size-card-title;
    margin: 15px 0;
  }

  .company-faith-text {
    padding: 5px;
    color: $black-text;
  }
}

.ability-title {
  font-size: $font-size-card-title;
  font-weight: bold;

  &:after {
    content: '';
    display: block;
    width: 40px;
    border-top: 1px solid $blue-text;
    margin: 15px 0;
  }
}

.main-advantage {
  .main-advantage-left, .main-advantage-right {
    width: 50%;
    padding: 0 10px;
  }

  .main-advantage-left {
    color: $blue-text;

    ul li {
      width: 50%;
      padding: 25px 20px;
      display: inline-block;
      vertical-align: top;
    }
  }
}

.other-advantage {
  width: 20%;

  .ability-msg {
    color: $blue-text;
    padding: 10px 0;
  }

  .ability-des {
    padding: 10px 0;
    line-height: 1.5;
    color: $black-text;
  }
}
</style>
