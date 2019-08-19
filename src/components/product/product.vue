<template>
  <div>
    <!-- banner -->
    <div class="banner">
      <img v-if="bannerList.picurl" :src="$api +bannerList.picurl" alt />
      <Button size="large" type="default" ghost class="consult-btn" @click="gotoContactUs()">立即咨询</Button>
    </div>
    <!-- 基本状态数据库 -->
    <div class="base-container" v-if="productMsg">
      <div class="sub-title">
        <h3>{{productMsg.title}}</h3>
        <div class="divider"></div>
      </div>
      <div>
        <img v-if="productMsg.picurl" :src="$api +productMsg.picurl" alt />
      </div>
      <Divider />
      <ul class="product-msg" v-if="productMsg.content">
        <li
          v-for="(item,index) in productMsg.content.split('^')"
          :key="index"
          class="card-text"
        >{{item}}</li>
      </ul>
    </div>
    <!-- 产品截图 -->
    <div class="bg-container" v-if="productCut">
      <div class="base-container">
        <div class="sub-title">
          <h3>{{productCut.title}}</h3>
          <div class="divider"></div>
        </div>
        <div>
          <img v-if="productCut.picurl" :src="$api +productCut.picurl" alt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getContent, errorMsg } from "@api/getMsg";
import { Divider, Button } from "iview";

export default {
  components: {
    Divider,
    Button
  },
  data() {
    return {
      bannerList: {},
      productMsg: {},
      productCut: {},
      ids: JSON.parse(sessionStorage.getItem("ids"))
    };
  },
  methods: {
    _getContent(id) {
      getContent(id)
        .then(res => {
          if (res.statusText == "OK") {
            this.bannerList = res.data[0].contents[0];
            this.productMsg = res.data[1].contents[0];
            this.productCut = res.data[2].contents[0];
          } else {
            this.$message.error(errorMsg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    gotoContactUs() {
      this.$router.push("/contactus");
    }
  },
  mounted: function() {
    this._getContent(this.ids[this.$route.name]);
  },
  watch: {
    "$route.name": function(name) {
      this._getContent(this.ids[name]);
    }
  }
};
</script>

<style lang="stylus" scoped>
.consult-btn {
  position: absolute;
  bottom: 25%;
  left: 50%;
  margin-left: -50px;
}

.product-msg {
  text-align: center;

  li {
    background: url('~@/assets/pho_bh.png') 0 20px no-repeat;
    display: inline-block;
    width: 33%;
    line-height: 1.5;
    padding: 20px 33px;
    vertical-align: top;
  }
}
</style>

