<template>
  <div
    class="commentSection"
    v-if="commentSectionOffsetTop && comments"
    ref="commentSection"
  >
    <div
      class="commentSection_head"
      v-for="comment in comments"
      :key="comment.id"
    >
      <div class="commentSection_headAvatar">
        <img
          v-if="comment.user.avatar"
          alt="user-avatar"
          :src="comment.user.avatar"
          class="commentSection_headAvatar"
        />
        <!-- <font-awesome-icon :icon="['far', 'user']" /> -->
      </div>
      <div class="commentSection_headComment">
        <span class="commentSection_headUserName">{{
          comment.user.displayName
        }}</span>
        <span v-if="comment && comment.content" class="commentSection_content">
          {{ comment.content }}
        </span>
      </div>
    </div>
    <div
      class="commentSection_head"
      v-for="comment in comments"
      :key="comment.id"
    >
      <div class="commentSection_headAvatar">
        <img
          alt="user-avatar"
          :src="comment.user.avatar || '~/assets/svg/user.svg'"
          class="commentSection_headAvatar"
        />
      </div>
      <div class="commentSection_headComment">
        <div class="commentSection_headContent">
          <span class="commentSection_headUserName">{{
            comment.user.displayName
          }}</span>
          <span
            v-if="comment && comment.content"
            class="commentSection_content"
          >
            {{ comment.content }}
          </span>
        </div>
        <div class="commentSection_headReaction">
          <font-awesome-icon :icon="['far', 'heart']" />
          <span class="commentSection_headUserName">{{
            (comment && comment.likeRef && comment.likeRef.count) || 0
          }}</span>
          <span
            v-if="comment && comment.content"
            class="commentSection_content"
          >
            {{ $moment(comment.updatedAt).format("MMM d") }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommentSection",
  props: ["comments", "commentSectionOffsetTop"],
  computed: {},
};
</script>
<style lang="scss" scoped>
.commentSection {
  padding-top: 20px;
  overflow-y: scroll;
  &_head {
    display: flex;
    align-items: flex-start;
    margin-bottom: 10px;
    &Avatar {
      width: $userAvatarCommentSize;
      height: $userAvatarCommentSize;
      border-radius: 50%;
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
    &Reactions {
    }
  }
  &_content {
    @include max-5-lines;
    margin-left: 4px;
    display: inline;
  }
}
</style>
