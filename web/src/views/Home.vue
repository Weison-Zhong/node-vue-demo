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
        <div class="py-2" v-for="(news,i) in category.newsList" :key="i">
          <span>[{{news.categoryName}}]</span>
          <span>|</span>
          <span >{{news.title}}</span>
          <span >{{news.date}}</span>
        </div>
      </template>
    </m-list-card>

    <m-card icon="menu" title="英雄列表"> </m-card>
    <m-card icon="menu" title="精彩视频"> </m-card>
    <m-card icon="menu" title="图文攻略s"> </m-card>
    <div>wergdsaf</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: ".pagination-home",
        },
      },
      newsCats: [
        {
          name: "热门",
          newsList: [
            {
              categoryName: "公告",
              title: "xx不停机更新公告",
              date: "06/01 ",
            },
            {
              categoryName: "公告",
              title: "xx不停机更新公告",
              date: "06/01 ",
            },
            {
              categoryName: "公告",
              title: "xx不停机更新公告",
              date: "06/01 ",
            },
            {
              categoryName: "公告",
              title: "xx不停机更新公告",
              date: "06/01 ",
            },
            {
              categoryName: "公告",
              title: "xx不停机更新公告",
              date: "06/01 ",
            },
          ],
        },
        {
          name: "新闻",
          newsList: [
            {
              categoryName: "公告",
              title: "xx不停机更新公告",
              date: "06/01 ",
            },
            {
              categoryName: "公告",
              title: "xx不停机更新公告",
              date: "06/01 ",
            },
            {
              categoryName: "公告",
              title: "xx不停机更新公告",
              date: "06/01 ",
            },
            {
              categoryName: "公告",
              title: "xx不停机更新公告",
              date: "06/01 ",
            },
            {
              categoryName: "公告",
              title: "xx不停机更新公告",
              date: "06/01 ",
            },
          ],
        },
        {
          name: "新闻",
          newsList: [
            {
              categoryName: "公告",
              title: "xx不停机更新公告",
              date: "06/01 ",
            },
            {
              categoryName: "公告",
              title: "xx不停机更新公告",
              date: "06/01 ",
            },
            {
              categoryName: "公告",
              title: "xx不停机更新公告",
              date: "06/01 ",
            },
            {
              categoryName: "公告",
              title: "xx不停机更新公告",
              date: "06/01 ",
            },
            {
              categoryName: "公告",
              title: "xx不停机更新公告",
              date: "06/01 ",
            },
          ],
        },
        {
          name: "新闻",
          newsList: [
            {
              categoryName: "公告",
              title: "xx不停机更新公告",
              date: "06/01 ",
            },
            {
              categoryName: "公告",
              title: "xx不停机更新公告",
              date: "06/01 ",
            },
            {
              categoryName: "公告",
              title: "xx不停机更新公告",
              date: "06/01 ",
            },
            {
              categoryName: "公告",
              title: "xx不停机更新公告",
              date: "06/01 ",
            },
            {
              categoryName: "公告",
              title: "xx不停机更新公告",
              date: "06/01 ",
            },
          ],
        },
        {
          name: "新闻",
          newsList: [
            {
              categoryName: "公告",
              title: "xx不停机更新公告",
              date: "06/01 ",
            },
            {
              categoryName: "公告",
              title: "xx不停机更新公告",
              date: "06/01 ",
            },
            {
              categoryName: "公告",
              title: "xx不停机更新公告",
              date: "06/01 ",
            },
            {
              categoryName: "公告",
              title: "xx不停机更新公告",
              date: "06/01 ",
            },
            {
              categoryName: "公告",
              title: "xx不停机更新公告",
              date: "06/01 ",
            },
          ],
        },
      ],
    };
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