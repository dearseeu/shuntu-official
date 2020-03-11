<template>
  <div>
    <div v-if="$route.name !== 'contactus'" class="footer">
      <div class="base-container footer-box">
        <div class="addr-detail">
          <h3 class="addr-title">{{msgList.site_name}}</h3>
          <ul>
            <li v-if="msgList.site_mobile">
              <Icon class="addr-icon" type="ios-phone-portrait" />
              吴经理：{{msgList.site_mobile}}
            </li>
            <li v-if="msgList.site_tel">
              <Icon class="addr-icon" type="ios-call" />
              电话/传真：{{msgList.site_tel}}
            </li>
            <li>
              <Icon class="addr-icon" type="ios-mail" />
              邮箱：{{msgList.site_email}}
            </li>
            <li>
              <Icon class="addr-icon" type="ios-pin" />
              {{msgList.site_address}}
            </li>
          </ul>
        </div>
        <div class="align-center-container" v-if="menuList.length > 0">
          <div class="product-list" v-for="one in menuList[1].childrens.slice(0,3)" :key="one.id">
            <h3 class="list-title">{{one.name}}</h3>
            <ul class="product-ul">
              <li
                v-for="two in one.childrens"
                :key="two.id"
                @click="gotoPage(one.code,two.code)"
              >{{two.name}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-black vertical-center-container">
      <ul class="footer-menu base-container">
        <!-- <router-link
          tag="li"
          class="footer-menu-item"
          v-for="item in menuList"
          :key="item.id"
          :to="item.code == 'product' ? '/' + item.childrens[0].code + '/' +  item.childrens[0].childrens[0].code : '/' + item.code"
        >{{item.name}}</router-link>-->
        <li class="footer-menu-item" v-for="item in menuList" :key="item.id">
          <a :href="item.url" target="_blank" v-if="item.code == 'friendlinks'">{{item.name}}</a>
          <router-link
            v-else
            :to="item.code == 'product' ? '/' + item.childrens[0].code + '/' +  item.childrens[0].childrens[0].code : '/' + item.code"
          >{{item.name}}</router-link>
        </li>
      </ul>
      <h5 class="footer-copyright">{{msgList.footer_content}} 备案号：<a target="_blank" href="https://www.beian.miit.gov.cn">{{msgList.site_icp}}</a></h5>
    </div>
  </div>
</template>

<script>
import { Icon } from "iview";

export default {
  name: "MyFooter",
  components: {
    Icon
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
    gotoPage(path, name) {
      this.$router.push("/" + path + "/" + name);
    }
  },
  created() {}
};
</script>

<style lang="stylus" scoped>
@import '~@/common/stylus/variable.styl';

.footer {
  color: $footer-text;
  background: $footer-background;

  .footer-box {
    display: flex;
    padding: 50px 0 20px;
    justify-content: center;
    // border-bottom: 1px solid;
  }
}

.addr-title {
  font-size: $font-size-card-title;
  font-weight: bold;
  color: $white-text;

  &:after {
    content: '';
    display: block;
    width: 40px;
    border-top: 1px solid $footer-text;
    margin: 15px 0;
  }
}

.addr-detail {
  color: $footer-text;
  list-style: none;
  padding: 0 30px;
  border-right: 1px solid;

  li {
    padding: 10px 0;
    color: $footer-text;

    .addr-icon {
      color: $footer-text;
      font-size: $font-size-product-name;
      padding-right: 20px;
    }
  }
}

.product-list {
  padding: 0 50px;

  .list-title {
    color: $white-text;
    font-size: 1.25rem;
    font-weight: bold;
  }

  li {
    margin: 15px 0;
    cursor: pointer;
    transition: color 0.3s ease-in-out;

    &:hover {
      color: #fff;
    }
  }
}

.footer-black {
  height: 160px;
  background: $footer-background;
  text-align: center;
  color: $footer-text;
  border-top: 1px solid;

  .footer-menu {
    // color: $gray-text;
    font-size: 100%;

    .footer-menu-item {
      display: inline-block;
      border-left: 1px solid;
      padding: 5px 50px;
      cursor: pointer;

      a {
        transition: color 0.3s ease-in-out;

        &:hover {
          color: #fff;
        }
      }

      &:last-child {
        border-right: 1px solid;
      }
    }
  }

  .footer-copyright {
    color: $black-text;
  }
}

.base-container {
  padding: 20px 0;
}
</style>


