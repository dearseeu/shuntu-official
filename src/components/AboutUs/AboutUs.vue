<template>
  <div>
    <!-- banner -->
    <div class="banner" v-if="bannerList.picurl">
      <img v-if="bannerList.picurl" :src="$api + bannerList.picurl" alt />
    </div>
    <!-- 关于顺途科技 -->
    <div class="base-container">
      <div class="sub-title">
        <h3>{{aboutST.title}}</h3>
        <div class="divider"></div>
      </div>
      <div>
        <img v-if="aboutST.picurl" :src="$api + aboutST.picurl" alt />
        <p class="stkj-msg" v-if="aboutST.content">
          <span class="stkj-name">{{aboutST.content.slice(0,10)}}</span>
          {{aboutST.content.slice(10)}}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { getContent, errorMsg } from "@api/getMsg";

export default {
  data() {
    return {
      bannerList: {},
      aboutST: {},
      ids: JSON.parse(sessionStorage.getItem("ids"))
    };
  },
  methods: {
    _getContent(id) {
      getContent(id)
        .then(res => {
          if (res.statusText == "OK") {
            this.bannerList = res.data[0].contents[0];
            this.aboutST = res.data[1].contents[0];
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
    this._getContent(this.ids.about);
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/common/stylus/variable.styl';

.stkj-msg {
  padding: 15px;
  line-height: 2;
  text-align: justify;

  .stkj-name {
    color: $blue-text;
  }
}

.our-honor {
  width: 30%;
  margin-bottom: 20px;

  .our-honor-msg {
    color: $blue-text;
  }
}
</style>
