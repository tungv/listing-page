<template>
  <div class="postDetail">
    <div class="postDetail_head">
      <div class="postDetail_headAvatar">
        <img
          alt="user-avatar"
          :src="avatar || '~/assets/svg/user.svg'"
          class="postDetail_headAvatar"
        />
      </div>
      <div class="postDetail_headUser">
        <div>{{ displayName }}</div>
        <div>{{ updatedAt }}</div>
      </div>
    </div>
    <div v-if="post && post.content" class="postDetail_content">
      {{ post.content }}
    </div>
    <div v-if="post && post.place && post.place.name" class="postDetail_place">
      <fa icon="envelope" />
      <span class="postDetail_placeName">{{ post.place.name }}</span>
    </div>
    <div
      v-if="post && post.topics && post.topics.length"
      class="postDetail_category"
    >
      <template v-for="category in post.topics">
        <span :key="category.name" class="postDetail_categoryTag">
          {{ category.name }}
        </span>
      </template>
    </div>
    <div v-if="post" class="postDetail_reaction">
      <div v-if="post.likeRef" class="postDetail_reactionLike">
        <fa-icon icon="dollar-sign" style="font-size: 30px" />
        {{ post.likeRef.count || 0 }}
      </div>
      <div v-if="post.commentRef" class="postDetail_reactionComment">
        {{ post.commentRef.count || 0 }}
      </div>
      <div
        class="fb-share-button"
        :data-href="location"
        data-layout="button_count"
      >
        share
      </div>
    </div>
  </div>
</template>

<script>
import { get } from "lodash";

export default {
  props: ["post"],
  data: function () {
    return {
      location: "",
    };
  },
  mounted() {
    if (process.browser) {
      this.location = window.location;
    }
    // this.$fb();
  },
  computed: {
    avatar: function () {
      return get(this.post, "user.avatar", null);
    },
    displayName: function () {
      return get(this.post, "user.displayName", "");
    },
    updatedAt: function () {
      return get(this.post, "updatedAt", "");
    },
  },
  methods: {},
};
</script>

<style lang="scss">
.postDetail {
  width: 60%;
  height: 500px;
  background-color: white;
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
