<template>
  <div class="item" :data-index="item.id">
    <NuxtLink :to="{ path: '/?id=' + item.id }">
      <img
        :src="item.images[0]"
        :alt="item.content"
        class="gridItem_mansonryImg"
      />
      <div class="gridItem_head">
        <avatar
          v-if="item.user"
          :src="item.user.avatar"
          avaClass="gridItem_headAvatar"
        ></avatar>
        <div class="gridItem_headUser">
          <div
            class="gridItem_headUserName"
            v-if="item && item.user && item.user.displayName"
          >
            {{ item.user.displayName }}
          </div>
          <div v-if="item && item.user && item.updatedAt">
            {{ $moment(item.updatedAt).format("MMM d") }}
          </div>
        </div>
      </div>
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
  mounted() {
    console.log(this.item);
  },
  computed: {},
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
  &_head {
    display: flex;
    margin-top: 5px;
    &User {
      display: flex;
      flex-direction: column;
      margin-left: 5px;
      &Name {
        font-weight: bold;
      }
    }
    &Avatar {
      width: $userAvatarSize;
      height: $userAvatarSize;
    }
  }
}
</style>
