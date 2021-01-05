<template>
  <div class="highlightUsername">
    <div v-html="highlightUsername"></div>
  </div>
</template>

<script>
export default {
  name: "highlightUsername",
  props: ["text"],
  computed: {
    highlightUsername: function () {
      let endIndex;
      let val = this.text;
      const startIndex = val.indexOf("#&&@");
      if (startIndex >= 0) {
        endIndex = val.indexOf("&&#");
        const res = "<p>" + val.replace("#&&@", "<b>").replace("&&#", "</b>") + "</p>";
        return res;
      }
      return val;
    },
  },
};
</script>
<style lang="scss" scoped>
.highlightUsername {
}
</style>
