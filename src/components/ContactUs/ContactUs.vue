<template>
  <div>
    <!-- contact us -->
    <div class="contact-us" v-if="bannerList">
      <img :src="$api +bannerList.picurl" v-if="bannerList.picurl" alt />
    </div>
    <!-- map -->
    <div class="base-container">
      <div id="amap"></div>
      <div>
        <ul class="addr-detail">
          <li>电话：{{msgList.site_tel}}</li>
          <li>邮箱：{{msgList.site_email}}</li>
          <li>地址：{{msgList.site_address}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getContent, errorMsg } from "@api/getMsg";

export default {
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
        center: [104.022862,30.624652],
        zoom: 17
      });
      var marker = new AMap.Marker({
        position: new AMap.LngLat(104.022862,30.624652),
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
#amap {
  width: 100%;
  height: 300px;
  border-radius: 5px;
}

.addr-detail {
  margin-top: 15px;
  background: #F6F7F9;
  height: 50px;
  line-height: 50px;
  display: flex;
  justify-content: space-around;
  list-style: none;
  border-radius: 5px;
}
</style>

