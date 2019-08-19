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
    <!--带图卡片-->
    <div class="base-container align-center-container">
      <Card class="img-card" v-for="item in productFeatures" :key="item.id">
        <div>
          <div class="img-box">
            <img v-if="item.picurl" :src="$api +item.picurl" />
          </div>
          <h3 class="card-title">{{item.title}}</h3>
          <p class="card-text">{{item.content}}</p>
        </div>
      </Card>
    </div>
    <!--了解我们的产品-->
    <div class="bg-container vertical-center-container">
      <div class="base-container">
        <div class="sub-title">
          <h3 class="card-title">{{productKnow.name}}</h3>
          <div class="divider"></div>
        </div>
        <div class="align-center-container">
          <Card class="our-product" v-for="item in productKnow.contents" :key="item.id">
            <div>
              <h3 class="card-title">{{item.title}}</h3>
              <ul class="our-product-list">
                <li v-for="(v,i) in item.content.split('^')" :key="i">{{v}}</li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
    <!--我们的优势在哪里-->
    <!-- <div class="base-container vertical-center-container">
      <div class="sub-title">
        <h3 class="card-title">我们的优势在哪里</h3>
        <div class="divider"></div>
      </div>
      <div>
        <ul class="our-advantages">
          <li>
            <div class="our-advantages-left-item"></div>
            <div class="our-advantages-right-item">
              <h3 class="card-title">A high quality UI Toolkit</h3>
              <p class="card-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
            </div>
          </li>
          <li>
            <div class="our-advantages-left-item"></div>
            <div class="our-advantages-right-item">
              <h3 class="card-title">A high quality UI Toolkit</h3>
              <p class="card-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
            </div>
          </li>
          <li>
            <div class="our-advantages-left-item"></div>
            <div class="our-advantages-right-item">
              <h3 class="card-title">A high quality UI Toolkit</h3>
              <p class="card-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
            </div>
          </li>
          <li>
            <div class="our-advantages-left-item"></div>
            <div class="our-advantages-right-item">
              <h3 class="card-title">A high quality UI Toolkit</h3>
              <p class="card-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
            </div>
          </li>
          <li>
            <div class="our-advantages-left-item"></div>
            <div class="our-advantages-right-item">
              <h3 class="card-title">A high quality UI Toolkit</h3>
              <p class="card-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
            </div>
          </li>
          <li>
            <div class="our-advantages-left-item"></div>
            <div class="our-advantages-right-item">
              <h3 class="card-title">A high quality UI Toolkit</h3>
              <p class="card-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
            </div>
          </li>
        </ul>
      </div>
    </div>-->
    <!--我们的合作伙伴-->
    <div class="base-container vertical-center-container">
      <div class="sub-title">
        <h3 class="card-title">{{ourPaternal.name}}</h3>
        <div class="divider"></div>
      </div>
      <img
        v-for="(item,index) in ourPaternal.contents"
        :src="$api + item.picurl"
        :key="index"
        alt
      />
    </div>
  </div>
</template>

<script>
import { getContent, errorMsg } from "@api/getMsg";
import { Card, Carousel, CarouselItem } from "iview";

export default {
  data() {
    return {
      bannerList: [], //轮播图
      productFeatures: {}, //产品特点介绍
      productKnow: {}, //了解我们的产品
      ourPaternal: {} //我们的合作伙伴
    };
  },
  props: ["homeId"],
  components: {
    Card,
    Carousel,
    CarouselItem
  },
  methods: {
    _getContent(id) {
      getContent(id)
        .then(res => {
          if (res.statusText == "OK") {
            this.bannerList = res.data[0].contents;
            this.productFeatures = res.data[1].contents;
            this.productKnow = res.data[2];
            this.ourPaternal = res.data[3];
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
    this._getContent(this.homeId);
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/common/stylus/variable.styl';

.img-card {
  width: 23%;

  div {
    text-align: center;

    .img-box {
      width: 70%;
      height: 220px;
      line-height: 220px;
      margin: 0 auto;
    }
  }
}

.our-product {
  width: 20%;

  div {
    text-align: center;

    h3 {
      color: $blue-text;
      margin: 25px 0;
    }

    .our-product-list {
      margin-bottom: 25px;

      li {
        cursor: default;
        margin: 10px 0;
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

