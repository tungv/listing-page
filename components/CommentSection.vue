<template>
  <div class="commentSection">
    <div class="commentSection_head">
      <div class="commentSection_headAvatar">
        <img
          alt="user-avatar"
          :src="avatar || '~/assets/svg/user.svg'"
          class="commentSection_headAvatar"
        />
      </div>
      <div class="commentSection_headUser">
        <div>{{ displayName }}</div>
        <div>{{ updatedAt }}</div>
      </div>
    </div>
    <div v-if="post && post.content" class="commentSection_content">
      {{ post.content }}
    </div>
  </div>
</template>

<script>
export default {
  name: "CommentSection",
  props: ["comments"],
};
</script>
<style lang="scss" scoped>
.commentSection {
  padding: 20px;
  &_head {
    display: flex;
    align-items: center;
    font-weight: bold;
    &Avatar {
      width: $userAvatarSize;
      height: $userAvatarSize;
    }
    &User {
      display: flex;
      flex-direction: column;
      margin-left: 5px;
    }
  }
  &_content {
    margin-top: 10px;
    @include max-5-lines;
  }
  &_place {
    &Name {
      color: $blue;
    }
  }
  &_category {
    &Tag {
      color: white;
      background-color: black;
      padding: 4px 8px;
      border-radius: $tagBorderRadius;
      display: inline-block;
      margin-bottom: 4px;
      font-size: 0.75rem;
      &:not(:last-child) {
        margin-right: 4px;
      }
    }
  }
  &_reaction {
    display: flex;
    &Like {
    }
    &Comment {
      margin-left: 10px;
    }
  }
}
</style>
