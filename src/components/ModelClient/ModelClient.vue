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
        <img :src="$api + costomers.picurl" alt />
      </div>
    </div>
    <!-- 更多客户 -->
    <div class="base-container">
      <div class="sub-title">
        <h3>{{moreCostomers.name}}</h3>
        <div class="divider"></div>
        <p style="text-align:center">{{moreCostomers.info}}</p>
      </div>
      <!-- 教育厅 -->
      <div v-if="moreCostomers.contents[0].picurl">
        <img :src="$api + moreCostomers.contents[0].picurl" alt />
      </div>
      <!-- 大学 -->
      <div>
        <Divider />
        <div class="collages-list">
          <h3 class="collages-list-title">{{moreCostomers.contents[1].title}}</h3>
          <ul class="collages-list-ul" v-if="moreCostomers.contents[1].content">
            <li
              v-for="v in moreCostomers.contents[1].content.split('^')"
              :key="v.id"
              class="collages-list-li"
            >{{v}}</li>
          </ul>
        </div>
        <Divider />
        <div class="collages-list">
          <h3 class="collages-list-title">{{moreCostomers.contents[2].title}}</h3>
          <ul class="collages-list-ul" v-if="moreCostomers.contents[2].content">
            <li
              class="collages-list-li"
              v-for="v in moreCostomers.contents[2].content.split('^')"
              :key="v.id"
            >{{v}}</li>
          </ul>
        </div>
        <Divider />
        <div class="collages-list">
          <h3 class="collages-list-title">{{moreCostomers.contents[3].title}}</h3>
          <ul class="collages-list-ul" v-if="moreCostomers.contents[3].content">
            <li
              class="collages-list-li"
              v-for="v in moreCostomers.contents[3].content.split('^')"
              :key="v.id"
            >{{v}}</li>
          </ul>
        </div>
        <Divider />
      </div>
    </div>
  </div>
</template>

<script>
import { getContent, errorMsg } from "@api/getMsg";
import { Divider } from "iview";

export default {
  components: {
    Divider
  },
  data() {
    return {
      bannerList: [],
      costomers: {},
      moreCostomers: {},
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
            this.moreCostomers = res.data[2];
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

