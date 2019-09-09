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
    <!-- 大标题 -->
    <div style="margin-top:60px" class="sub-title">
      <h3>了解我们的产品</h3>
      <div class="divider"></div>
    </div>
    <!-- 所有产品 -->
    <div class="base-container-no-padding" v-for="one in menuList[1].childrens" :key="one.id">
      <!-- 带线标题 -->
      <div class="divider-with-text">
        <span class="divider-inner-text">{{one.name}}</span>
      </div>
      <!-- 卡片 -->
      <div class="flex-start-box">
        <Card class="product-card" v-for="two in one.childrens" :key="two.id" @click.native="gotoPage(one.code,two.code)">
          <div class="box">
            <div class="box-icon" v-if="two.icon">
              <img :src="$api + two.icon" alt />
            </div>
            <div class="box-content">
              <h3 class="card-title">{{two.name}}</h3>
              <p class="card-text">{{two.info}}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
    <!--我们的合作伙伴-->
    <div class="base-container vertical-center-container">
      <div class="sub-title">
        <h3>{{ourPaternal.name}}</h3>
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
      ourPaternal: {}, //我们的合作伙伴
      active: ""
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
    },
    addClass() {
      this.active = "card-title active";
    },
    removeClass() {
      this.active = "card-title";
    }
  },
  mounted: function() {
    this._getContent(this.homeId);
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/common/stylus/variable.styl';

.base-container-no-padding {
  width: 1200px;
  margin: 60px auto;
}

.divider-with-text {
  display: table;
  white-space: nowrap;
  text-align: center;
  background: 0 0;
  font-weight: bold;
  margin: 60px 0;

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

.flex-start-box {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.product-card {
  width: 380px;
  margin: 10px;
  cursor pointer

  .box {
    display: flex;
    align-items: center;
    justify-content: center;

    .box-icon {
      width: 20%;
    }

    .box-content {
      padding-left: 15px;
      width: 80%;
      height: 100%;

      .card-title.active {
        color: $blue-text;
      }
    }
  }

  padding: 0 10px;
}

.our-product {
  width: 26%;
  position: relative;
  padding: 50px 0 20px;
  margin: 30px;

  .left-corner-img {
    position: absolute;
    left: -23px;
    top: -18px;
    width: 50%;
  }

  .left-corner-text {
    color: $white-text;
    left: -33px;
    position: absolute;
    transform: rotate(-45deg);
    top: 30px;
    display: inline-block;
    width: 50%;
  }

  div {
    text-align: center;

    .our-product-list {
      height: 180px;

      li {
        cursor: default;
        padding: 10px 0;
      }
    }

    .to-page-btn {
      width: 50%;

      &:hover {
        background: $blue-text;
        color: $white-text;
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

