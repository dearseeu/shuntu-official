<template>
  <div style="height:88px;">
    <div class="my-header">
      <div class="bg-container company-msg">
        <div class="base-container header-box">
          <ul class="left-msg">
            <li>
              <Icon type="ios-call" />
              {{msgList.site_mobile}}
            </li>
            <li>
              <Icon type="ios-mail" />
              {{msgList.site_email}}
            </li>
          </ul>
          <div class="right-msg">
            <Icon type="md-pin" />
            {{msgList.site_address}}
          </div>
        </div>
      </div>

      <Menu mode="horizontal" theme="light">
        <div class="base-container">
          <div class="logo">
            <img v-if="msgList.site_logo" :src="$api +msgList.site_logo" alt />
          </div>
          <div class="nav">
            <div class="tab">
              <div v-for="item in menuList.slice(0,menuList.length - 1)" :key="item.id">
                <Dropdown v-if="item.hasChildren && item.childrens.length > 0">
                  <a href="javascript:void(0)" style="padding:0 20px">
                    {{item.name}}
                    <Icon type="ios-arrow-down"></Icon>
                  </a>
                  <DropdownMenu slot="list" v-for="two in item.childrens" :key="two.id">
                    <h3 class="dropdown-title">{{two.name}}</h3>
                    <router-link
                      v-for="three in two.childrens"
                      :key="three.id"
                      :to="'/'+two.code + '/' + three.code"
                    >
                      <DropdownItem>
                        <span>{{three.name}}</span>
                      </DropdownItem>
                    </router-link>
                  </DropdownMenu>
                </Dropdown>
                <router-link class="tab-item" tag="div" v-else :to="{name:item.code}">
                  <span class="tab-link">{{item.name}}</span>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </Menu>

      <div class="header-shadow"></div>
    </div>
  </div>
</template>
<script>
import { Dropdown, DropdownMenu, DropdownItem, Menu, Icon } from "iview";

export default {
  name: "MyHeader",
  components: {
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Menu,
    Icon
  },
  data() {
    return {};
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
  created() {},
  mounted() {}
};
</script>
<style lang="stylus" scoped>
@import '~@/common/stylus/variable.styl';

.my-header {
  position: fixed;
  z-index: 1;
  width: 100%;
  top: 0;
}

.header-shadow {
  height: 10px;
  background: linear-gradient(bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.1));
}

.company-msg {
  overflow: hidden;
  padding: 5px;

  .header-box {
    display: flex;
    justify-content: space-between;
    color: $black-text;

    .right-msg {
      font-size: $font-size-copyright;
      // background: red;
    }

    .left-msg {
      li {
        display: inline-block;
        margin-right: 20px;
        font-size: $font-size-copyright;
      }
    }
  }
}

.base-container {
  padding: 0;
}

.logo {
  width: 190px;
  height: 50px;
  border-radius: 3px;
  float: left;
  position: relative;
}

.nav {
  float: right;
  display: flow-root;
}

.submenu {
  position: absolute;
  top: 20px;
  border: 1px solid red;
}

.tab {
  display: flex;
  cursor: default;

  .tab-item {
    text-align: center;

    .tab-link {
      padding-bottom: 5px;
      color: $black-text;
      padding: 0 20px;
      display: inline-block;
      height: 50px;
      cursor: pointer;
    }

    &.router-link-active {
      .tab-link {
        color: $blue-text;
        border-bottom: 2px solid $blue-text;
      }
    }
  }
}

>>>.ivu-select-dropdown {
  width: 100%;
  padding: 5px 10px;
  margin-right: -5px;
  display: flex;
  justify-content: center;

  .ivu-dropdown-menu {
    text-align: center;
    padding: 0 50px 15px;

    .dropdown-title {
      font-weight: bold;
    }

    .router-link-active {
      color: $blue-text;

      .ivu-dropdown-item {
        color: inherit;
        font-size: 16px;
      }
    }
  }
}
</style>
