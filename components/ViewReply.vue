<template>
  <div class="viewReply">
    <div class="viewReply_text" @click="handleToggle">
      View {{ replies.count }}
      {{ replies.count > 1 ? "replies" : "reply" }}
    </div>
    <div v-if="expand">
      <CommentRepliesSection :comments="allReplies" name="replies" />
    </div>
  </div>
</template>

<script>
export default {
  name: "viewReply",
  props: ["replies"],
  computed: {},
  created() {
    this.fetchReplies();
  },
  data: function () {
    return {
      allReplies: null,
      expand: false,
    };
  },
  methods: {
    handleToggle() {
      this.expand = !this.expand;
    },
    async fetchReplies() {
      if (this.replies.count > 0 && this.replies && this.replies.id) {
        let res = await this.$axios.post(`/api/comment/reply/${this.replies.id}`);
        this.allReplies = res.data.replies;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.viewReply {
  &_replies {
    top: 0;
  }
}
</style>
