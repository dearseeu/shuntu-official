<template>
  <div>
    <!-- banner -->
    <div class="banner">
      <img v-for="item in bannerList" :src="$api +item.picurl" :key="item.id" alt />
    </div>
    <!-- 高校客户 -->
    <div class="base-container">
      <div class="sub-title">
        <h3>{{costomers.name}}</h3>
        <div class="divider"></div>
      </div>
      <div v-for="item in costomers.contents" :key="item.id">
        <p style="text-align:center">{{item.content}}</p>
        <img :src="$api +item.picurl" alt />
      </div>
    </div>
    <!-- 世界知名大学 -->
    <div class="base-container">
      <Divider />
      <div class="collages-list">
        <h3 class="collages-list-title">{{wordCollages.name}}</h3>
        <ul class="collages-list-ul" v-for="item in wordCollages.contents" :key="item.id">
          <li v-for="v in item.content.split('^')" :key="v.id" class="collages-list-li">{{v}}</li>
        </ul>
      </div>
      <Divider />
      <div class="collages-list">
        <h3 class="collages-list-title">{{countryCollages.name}}</h3>
        <ul class="collages-list-ul" v-for="item in countryCollages.contents" :key="item.id">
          <li class="collages-list-li" v-for="v in item.content.split('^')" :key="v.id">{{v}}</li>
        </ul>
      </div>
      <Divider />
      <div class="collages-list">
        <h3 class="collages-list-title">{{provinceCollages.name}}</h3>
        <ul class="collages-list-ul" v-for="item in provinceCollages.contents" :key="item.id">
          <li class="collages-list-li" v-for="v in item.content.split('^')" :key="v.id">{{v}}</li>
        </ul>
      </div>
      <Divider />
    </div>
  </div>
</template>

<script>
import { getContent, errorMsg } from "@api/getMsg";
import { Divider } from "iview";

export default {
  components: {
    Divider
  },
  data() {
    return {
      bannerList: [],
      costomers: {},
      wordCollages: {},
      countryCollages: {},
      provinceCollages: {},
      ids: JSON.parse(sessionStorage.getItem("ids"))
    };
  },
  methods: {
    _getContent(id) {
      getContent(id)
        .then(res => {
          if (res.statusText == "OK") {
            this.bannerList = res.data[0].contents;
            this.costomers = res.data[1];
            this.wordCollages = res.data[2];
            this.countryCollages = res.data[3];
            this.provinceCollages = res.data[4];
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
    this._getContent(this.ids.customer);
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/common/stylus/variable.styl';

.collages-list {
  .collages-list-title {
    font-size: $font-size-card-title;
    font-weight: bold;
  }

  .collages-list-ul {
    cursor: default;
    padding: 20px 50px;

    .collages-list-li {
      display: inline-block;
      width: 20%;
      padding: 10px;
      color: $black-text;
    }

    & :hover {
      color: $blue-text;
    }
  }
}
</style>

