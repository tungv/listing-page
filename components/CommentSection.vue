<template>
  <div class="commentSection" v-if="commentSectionOffsetTop && comments" ref="commentSection">
    <div class="commentSection_head" v-for="(comment) in comments" :key="comment.id">
      <div class="commentSection_headAvatar">
        <img
          alt="user-avatar"
          :src="comment.user.avatar || '~/assets/svg/user.svg'"
          class="commentSection_headAvatar"
        />
      </div>
      <div class="commentSection_headComment">
        <span class="commentSection_headUserName">{{ comment.user.displayName }}</span>
        <span v-if="comment && comment.content" class="commentSection_content">
          {{ comment.content }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommentSection",
  props: ["comments", "commentSectionOffsetTop"],
  watch: {
    commentSectionOffsetTop: function (newVal, oldVal) {
      if (newVal && newVal !== oldVal) {
        if (this.$refs['commentSection']) {
          const postDetailContainerHeight = document.querySelector(".postDetail").offsetHeight;
          const commentSectionHeight = postDetailContainerHeight - commentSectionOffsetTop
          this.$refs['commentSection'].style.height = `${commentSectionHeight}px)`
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.commentSection {
  padding-top: 20px;
  &_head {
    display: flex;
    align-items: flex-start;
    margin-bottom: 5px;
    &Avatar {
      width: $userAvatarCommentSize;
      height: $userAvatarCommentSize;
    }
    &User {
      display: flex;
      flex-direction: column;
      margin-left: 5px;
      &Name {
        font-weight: bold;
      }
    }
    &Comment {
      margin-left: 4px;
    }
  }
  &_content {
    @include max-5-lines;
    margin-left: 4px;
    display: inline;
  }
}
</style>
