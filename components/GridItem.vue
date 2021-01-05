<template>
  <div class="item" :data-index="item.id">
    <NuxtLink :to="{ path: '/?id=' + item.id }">
      <img :src="item.images[0]" :alt="item.content" class="gridItem_mansonryImg" />
    </NuxtLink>
  </div>
</template>

<script>
export default {
  name: "GridItem",
  props: ["item"],
  data: function () {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.gridItem {
  &_mansonryImg {
    width: 100%;
    object-fit: cover;
  }
}
</style>
