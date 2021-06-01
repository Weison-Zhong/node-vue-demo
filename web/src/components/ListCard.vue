<template>
  <m-card :icon="icon" :title="title">
    <div class="nav jc-between">
      <div
        class="nav-item"
        :class="{ active: active === i }"
        v-for="(category, i) in categories"
        :key="i"
        @click="$refs.list.$swiper.slideTo(i)"
      >
        <div class="nav-link">{{ category.name }}</div>
      </div>
    </div>

    <div class="pt-3">
      <!-- 这个ref可以理解为html中的id ref是给vue用的，vue中需要找到这个组件的话就用ref -->
      <swiper
        ref="list" :options="{autoHeight:true}"
        @slide-change="() => (active = $refs.list.$swiper.activeIndex)"
      >
        <swiper-slide v-for="(category, i) in categories" :key="i">
          <slot name="items" :category="category"></slot>
        </swiper-slide>
      </swiper>
    </div>
  </m-card>
</template>

<script>
export default {
  props: {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    categories: { type: Array, required: true },
  },
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style>
</style>