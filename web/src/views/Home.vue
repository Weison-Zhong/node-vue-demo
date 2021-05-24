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
    <m-card icon="menu" title="新闻资讯">
      <div class="nav jc-between">
        <div class="nav-item active">
          <div class="nav-link">热门</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">新闻</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">新闻</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">新闻</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">新闻</div>
        </div>
      </div>
      <div class="pt-3">
        <swiper>
          <swiper-slide v-for="m in 5" :key="m">
            <div class="py-2" v-for="n in 5" :key="n">
              <span>[新闻]</span>
              <span>|</span>
              <span class="fs-xxs">冰雪圆舞曲优化海报方案票选结果公布</span>
              <span class="fs-xxs">06/02</span>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </m-card>
    <m-card icon="menu" title="英雄列表"> </m-card>
     <m-card icon="menu" title="英雄列表"> </m-card>
      <m-card icon="menu" title="英雄列表"> </m-card>
    <div>wergdsaf</div>
    <div>wergdsaf</div>
    <div>wergdsaf</div>
    <div>wergdsaf</div>
    <div>wergdsaf</div>
    <div>wergdsaf</div>
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