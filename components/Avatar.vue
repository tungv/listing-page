<template>
  <div class="avatar" :class="avaClass" ref="avatar">
    <img v-if="src" alt="user-avatar" :src="src" />
    <span v-else><font-awesome-icon :icon="['far', 'user']" /></span>
  </div>
</template>

<script>
export default {
  name: "avatar",
  props: ["src", "avaClass", "size"],
  computed: {},
};
</script>
<style lang="scss" scoped>
.avatar {
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }
  span {
    border: 1px solid black;
    border-radius: 50%;
    flex: none;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
