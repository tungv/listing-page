<template>
  <div class="commentRepliesSection" v-if="comments" ref="commentRepliesSection">
    <div class="commentRepliesSection_head" v-for="comment in comments" :key="comment.id">
      <div class="commentRepliesSection_headAvatar">
        <img
          alt="user-avatar"
          :src="comment.user.avatar || '~/assets/svg/user.svg'"
          class="commentRepliesSection_headAvatar"
        />
      </div>
      <div class="commentRepliesSection_headComment">
        <div class="commentRepliesSection_headContent">
          <span class="commentRepliesSection_headUserName">{{
            comment.user.displayName
          }}</span>
          <HighlightUsername
            :text="comment.content"
            v-if="comment && comment.content"
            class="commentRepliesSection_content"
          />
        </div>
        <div
          class="commentRepliesSection_headReaction"
          v-if="comment && (comment.updatedAt || comment.likeRef)"
        >
          <font-awesome-icon :icon="['far', 'heart']" />
          <span class="">{{
            (comment && comment.likeRef && comment.likeRef.count) || 0
          }}</span>
          <span v-if="comment && comment.updatedAt" class="commentRepliesSection_content">
            {{ $moment(comment.updatedAt).format("MMM d") }}
          </span>
        </div>
        <ViewReply
          v-if="comment && comment.replyRef && comment.replyRef.count"
          :replies="comment.replyRef"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommentRepliesSection",
  props: ["comments", "commentRepliesSectionOffsetTop"],
  computed: {},
};
</script>
<style lang="scss" scoped>
.commentRepliesSection {
  padding: 20px 20px 0 0;
  overflow-y: scroll;
  width: 100%;
  @include scrollBar;
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
    &Reaction {
      color: $grey-1;
    }
  }
  &_content {
    @include max-5-lines;
    margin-left: 4px;
    display: inline;
  }
}
</style>
