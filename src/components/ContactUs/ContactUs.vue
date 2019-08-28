<template>
  <div>
    <!-- contact us -->
    <div class="contact-us" v-if="bannerList">
      <img :src="$api +bannerList.picurl" v-if="bannerList.picurl" alt />
    </div>
    <!-- map -->
    <div style="position:relative">
      <div id="amap"></div>
      <div class="addr-detail">
        <h3 class="addr-title">{{msgList.site_name}}</h3>
        <ul>
          <li>
            <Icon class="addr-icon" type="ios-phone-portrait" />
            吴经理：{{msgList.site_mobile}}
          </li>
          <li>
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
    </div>
  </div>
</template>

<script>
import { getContent, errorMsg } from "@api/getMsg";
import { Icon } from "iview";

export default {
  components: {
    Icon
  },
  data: function() {
    return {
      bannerList: {},
      ids: JSON.parse(sessionStorage.getItem("ids"))
    };
  },
  props: ["msgList"],
  methods: {
    renderMap: function() {
      var map = new AMap.Map("amap", {
        resizeEnable: true,
        center: [104.023962, 30.624791],
        zoom: 18
      });
      var marker = new AMap.Marker({
        position: new AMap.LngLat(104.022862, 30.624652),
        title: "成都顺途科技"
      });
      map.add(marker);
    },
    _getContent(id) {
      getContent(id)
        .then(res => {
          if (res.statusText == "OK") {
            this.bannerList = res.data[0].contents[0];
          } else {
            this.$message.error(errorMsg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    this.renderMap();
    this._getContent(this.ids.contactus);
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/common/stylus/variable.styl';

#amap {
  width: 100%;
  height: 400px;
}

.addr-title {
  font-size: $font-size-card-title;
  font-weight: bold;
  color: $blue-text;

  &:after {
    content: '';
    display: block;
    width: 40px;
    border-top: 1px solid $black-text;
    margin: 15px 0;
  }
}

.addr-detail {
  background: $white-text;
  list-style: none;
  border-radius: 5px;
  position: absolute;
  top: 50%;
  right: 30%;
  transform: translate(70%, -50%);
  padding: 30px;

  li {
    padding: 10px 0;
    color: $black-text;

    .addr-icon {
      color: $blue-text;
      font-size: $font-size-product-name;
      font-weight: bold;
      padding-right: 20px;
    }
  }
}
</style>

