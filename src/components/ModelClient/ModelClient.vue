<template>
  <div>
    <!-- banner -->
    <div class="banner">
      <img v-if="bannerList" :src="$api + bannerList.picurl" alt />
    </div>
    <!-- 高校客户 -->
    <div class="base-container">
      <div class="sub-title">
        <h3>{{costomers.title}}</h3>
        <div class="divider"></div>
      </div>
      <div v-if="costomers.picurl">
        <!-- <p style="text-align:center">{{item.content}}</p> -->
        <img v-if="costomers.picurl" :src="$api + costomers.picurl" alt />
      </div>
    </div>
  </div>
</template>

<script>
import { getContent, errorMsg } from "@api/getMsg";

export default {
  components: {
  },
  data() {
    return {
      bannerList: [],
      costomers: {},
      // moreCostomers: {},
      ids: JSON.parse(sessionStorage.getItem("ids"))
    };
  },
  methods: {
    _getContent(id) {
      getContent(id)
        .then(res => {
          if (res.statusText == "OK") {
            this.bannerList = res.data[0].contents[0];
            this.costomers = res.data[1].contents[0];
            // this.moreCostomers = res.data[2];
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
    this._getContent(this.ids.customer);
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/common/stylus/variable.styl';

.collages-list {
  .collages-list-title {
    font-size: $font-size-card-title;
    font-weight: bold;
  }

  .collages-list-ul {
    cursor: default;
    padding: 20px 50px;

    .collages-list-li {
      display: inline-block;
      width: 20%;
      padding: 10px;
      color: $black-text;
    }

    & :hover {
      color: $blue-text;
    }
  }
}
</style>

