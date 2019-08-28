<template>
  <div>
    <div
      v-if="$route.name !== 'contactus'"
      class="footer-bg vertical-center-container"
      :style="{backgroundImage:'url(' + $api + msgList.footer_img+')'}"
    >
      <h3>教育事业数据统计分析平台</h3>
      <div>
        <Button size="large" class="btn-l" @click="toContactUs()">立即咨询</Button>
        <!-- <Button size="large" ghost>了解更多</Button> -->
      </div>
    </div>
    <div class="footer-black vertical-center-container">
      <ul class="footer-menu base-container">
        <router-link
          tag="li"
          class="footer-menu-item"
          v-for="item in menuList"
          :key="item.id"
          :to="item.code == 'product' ? '/' + item.childrens[0].code + '/' +  item.childrens[0].childrens[0].code : '/' + item.code"
        >{{item.name}}</router-link>
      </ul>
      <h5 class="footer-copyright">{{msgList.footer_content}} {{msgList.site_icp}} 顺途科技 版权所有</h5>
    </div>
  </div>
</template>

<script>
import { Button } from "iview";

export default {
  name: "MyFooter",
  components: {
    Button
  },
  data() {
    return {
      showBtn: true
    };
  },
  props: {
    msgList: {
      type: Object
    },
    menuList: {
      type: Array
    }
  },
  methods: {
    toContactUs() {
      this.$router.push("/contactus");
    }
  },
  created() {}
};
</script>

<style lang="stylus" scoped>
@import '~@/common/stylus/variable.styl';

.footer-bg {
  height: 400px;

  h3 {
    margin-bottom: 40px;
    color: $white-text;
    font-size: $font-size-title;
    text-align: center;
    font-weight: bold;
  }

  div {
    text-align: center;
  }
}

.btn-l {
  color: $blue-text;
  margin-right: 10px;
}

.footer-black {
  height: 160px;
  background: #000;
  text-align: center;

  .footer-menu {
    color: $gray-text;
    font-size: 100%;

    .footer-menu-item {
      display: inline-block;
      border-left: 1px solid $gray-text;
      padding: 5px 50px;
      cursor: pointer;
    }

    :last-child {
      border-right: 1px solid $gray-text;
    }
  }

  .footer-copyright {
    color: $black-text;
    font-size: $font-size-copyright;
  }
}

.base-container {
  padding: 20px 0;
}
</style>


