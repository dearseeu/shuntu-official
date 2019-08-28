<template>
  <div>
    <!--轮播图-->
    <div class="banner">
      <Carousel autoplay :autoplay-speed="5000" loop arrow="always">
        <CarouselItem v-for="item in bannerList" :key="item.id">
          <div class="index-carousel">
            <img v-if="item.picurl" :src="$api +item.picurl" alt />
          </div>
        </CarouselItem>
      </Carousel>
    </div>
    <!--产品列表-->
    <div class="base-container" v-for="one in menuList[1].childrens" :key="one.id">
      <div class="divider-with-text">
        <span class="divider-inner-text">{{one.name}}</span>
      </div>
      <div class="align-center-container">
        <Card v-for="two in one.childrens" :key="two.id" class="our-product">
          <div>
            <h3 class="card-title">{{two.name}}</h3>
            <img class="left-corner-img" src="~@/assets/pho_bq_01.png" alt />
            <span class="left-corner-text">{{one.name}}</span>
            <ul class="our-product-list">
              <li v-for="(three,index) in two.info.split('^')" :key="index">{{three}}</li>
            </ul>
            <Button type="primary" ghost @click="gotoPage(one.code,two.code)">查看</Button>
          </div>
        </Card>
      </div>
    </div>
    <!--我们的合作伙伴-->
    <div class="base-container vertical-center-container">
      <div class="sub-title">
        <h3 class="card-title">{{ourPaternal.name}}</h3>
        <div class="divider"></div>
      </div>
      <img v-if="ourPaternal.contents" :src="$api + ourPaternal.contents[0].picurl" alt />
    </div>
  </div>
</template>

<script>
import { getContent, errorMsg } from "@api/getMsg";
import { Card, Carousel, CarouselItem, Button } from "iview";

export default {
  data() {
    return {
      bannerList: [], //轮播图
      ourPaternal: {} //我们的合作伙伴
    };
  },
  props: ["homeId", "menuList"],
  components: {
    Card,
    Carousel,
    CarouselItem,
    Button
  },
  methods: {
    _getContent(id) {
      getContent(id)
        .then(res => {
          if (res.statusText == "OK") {
            this.bannerList = res.data[0].contents;
            this.ourPaternal = res.data[1];
          } else {
            this.$message.error(errorMsg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    gotoPage(path, name) {
      this.$router.push("/" + path + "/" + name);
    }
  },
  mounted: function() {
    this._getContent(this.homeId);
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/common/stylus/variable.styl';

.divider-with-text {
  display: table;
  white-space: nowrap;
  text-align: center;
  background: 0 0;
  font-weight: bold;
  margin: 16px 0;

  .divider-inner-text {
    display: inline-block;
    padding: 0 24px;
    font-size: $font-size-product-name;
  }

  &:before, &:after {
    content: '';
    display: table-cell;
    position: relative;
    top: 50%;
    width: 50%;
    border-top: 1px solid $black-text;
    transform: translateY(50%);
  }
}

.our-product {
  width: 30%;
  position: relative;
  padding-top: 50px;
  margin: 50px 0;

  .left-corner-img {
    position: absolute;
    left: -28px;
    top: -22px;
    width: 50%;
  }

  .left-corner-text {
    color: $white-text;
    left: 11px;
    position: absolute;
    transform: rotate(-45deg);
    top: 35px;
    font-size: 20px;
  }

  div {
    text-align: center;

    .our-product-list {
      margin-bottom: 25px;

      li {
        cursor: default;
        padding: 10px 0;
      }
    }
  }
}

.our-advantages {
  margin: 0 auto;

  li {
    display: inline-block;
    overflow: hidden;
    padding: 10px;
    width: 33%;
    text-align: center;

    .our-advantages-left-item {
      float: left;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: $blue-text;
    }

    .our-advantages-right-item {
      overflow: hidden;
      padding: 0 10px;
    }
  }
}
</style>

