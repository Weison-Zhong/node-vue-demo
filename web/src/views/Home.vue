<template>
  <div>
    <swiper :options="swiperOptions">
      <swiper-slide>
        <img
          src="@/assets/images/46e09e030b0f4439e6d2ee98f9bd2849.jpeg"
          alt=""
          class="w-100"
        />
      </swiper-slide>
      <swiper-slide>
        <img
          src="@/assets/images/83e82bb6ff4ed4f9803580d5b4af72f0.jpeg"
          alt=""
          class="w-100"
        />
      </swiper-slide>
      <swiper-slide>
        <img
          src="@/assets/images/e30ed1855c94e61cfb3079fd5da499af.jpeg"
          alt=""
          class="w-100"
        />
      </swiper-slide>
      <div
        class="swiper-pagination pagination-home text-right"
        slot="pagination"
      ></div>
    </swiper>
    <!-- end of swiper -->
    <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark-1">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3" v-for="n in 10" :key="n">
          <i class="sprite sprite-news"></i>
          <div>爆料站</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>
    <!-- end of navicons -->
    <m-list-card icon="menu" title="新闻资讯" :categories="newsCats">
      <template #items="{ category }">
        <router-link
          tag="div"
          :to="`/articles/${news._id}`"
          class="py-2 fs-lg d-flex"
          v-for="(news, i) in category.newsList"
          :key="i"
        >
          <span class="text-info">[{{ news.categoryName }}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{
            news.title
          }}</span>
          <span class="text-grey-1 fs-sm">{{ news.createdAt | date }}</span>
        </router-link>
      </template>
    </m-list-card>

    <m-list-card icon="hero" title="英雄列表" :categories="heroCats">
      <template #items="{ category }">
        <div class="d-flex flex-wrap" style="margin: 0 -0.25rem">
          <router-link
            tag="div"
            :to="`heroes/${hero._id}`"
            class="p-2 text-center"
            style="width: 20%"
            v-for="(hero, i) in category.heroList"
            :key="i"
          >
            <img :src="hero.avatar" class="w-100" alt="" />
            <div>{{ hero.name }}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>

    <m-card icon="menu" title="精彩视频"> </m-card>
    <m-card icon="menu" title="图文攻略s"> </m-card>
    <div>wergdsaf</div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: ".pagination-home",
        },
      },
      //newsCats里面首先是一个数组，里面包含了多个分类，每一个分类里面有一个newsList表示多篇新闻
      //所以主体应该是分类，关联新闻去把他调出来。
      newsCats: [],
      heroCats: [],
    };
  },
  filters: {
    date(val) {
      return dayjs(val).format("MM/DD");
    },
  },
  methods: {
    async fetchNewsCats() {
      const res = await this.$http.get("news/list");
      this.newsCats = res.data;
    },
    async fetchHeroCats() {
      const res = await this.$http.get("heroes/list");
      this.heroCats = res.data;
    },
  },
  created() {
    this.fetchNewsCats();
    this.fetchHeroCats();
  },
};
</script>

<style lang="scss">
@import "../assets/scss/variables";
.pagination-home {
  .swiper-pagination-bullet {
    background-color: #fff;
    &.swiper-pagination-bullet-active {
      background-color: map-get($colors, "info");
    }
  }
}
.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border-right: none;
    }
  }
}
</style>