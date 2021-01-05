<template>
  <div class="postDetail">
    <div class="postDetail_wrapperHead" ref="postDetail_wrapperHead">
      <div class="postDetail_head">
        <avatar v-if="post" :src="avatar" avaClass="postDetail_headAvatar"></avatar>
        <div class="postDetail_headUser" v-if="displayName && updatedAt">
          <div>{{ displayName }}</div>
          <div>{{ $moment(updatedAt).format("MMM d") }}</div>
        </div>
      </div>
      <div v-if="post && post.content" class="postDetail_content">
        {{ post.content }}
      </div>
      <div v-if="post && post.place && post.place.name" class="postDetail_place">
        <font-awesome-icon :icon="['fas', 'map-marker-alt']" />
        <span class="postDetail_placeName">{{ post.place.name }}</span>
      </div>
      <div v-if="post && post.topics && post.topics.length" class="postDetail_category">
        <template v-for="category in post.topics">
          <span :key="category.name" class="postDetail_categoryTag">
            {{ category.name }}
          </span>
        </template>
      </div>
      <div v-if="post" class="postDetail_reaction">
        <div v-if="post.likeRef" class="postDetail_reactionLike">
          {{ post.likeRef.count || 0 }}
          <font-awesome-icon :icon="['far', 'comment']" />
          <span v-if="post.commentRef" class="postDetail_reactionComment">
            {{ post.commentRef.count || 0 }}
          </span>
          <font-awesome-icon :icon="['far', 'heart']" />
        </div>
        <!-- <div
          class="fb-share-button"
          data-href="https://developers.facebook.com/docs/plugins/"
          data-layout="button_count"
          data-size="small"
        >
          <a
            target="_blank"
            href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse"
            class="fb-xfbml-parse-ignore"
            >share</a
          >
        </div>
        <ShareNetwork
          network="facebook"
          :url="path"
          title="Say hi to Vite! A brand new, extremely fast development setup for Vue."
          description="This week, I’d like to introduce you to 'Vite', which means 'Fast'. It’s a brand new development setup created by Evan You."
          :quote="quote"
          hashtags="vuejs,vite"
        >
          Share on Facebook
        </ShareNetwork> -->
      </div>
    </div>
    <CommentSection :post="post" :commentSectionOffsetTop="commentSectionOffsetTop" />
  </div>
</template>
<script>
import { get } from "lodash";

export default {
  props: ["post", "fetchingPost", "fetchingComment"],
  data: function () {
    return {
      commentSectionOffsetTop: null,
    };
  },
  mounted() {
    if (process.browser) {
      this.location = window.location;
    }
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
    // this.calculateCSS();
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
    path: function () {
      if (process.browser) {
        // this.path = window.location.href;
        return "https://upbeat-panini-d9f351.netlify.app/?id=5fcb497326c01c0024124bba";
      }
      return "";
    },
    quote: function () {
      return get(this.post, "content", "description content");
    },
  },
  methods: {
    calculateCSS() {
      if (typeof document !== "undefined") {
        if (document.querySelector(".postDetail_wrapperHead")) {
          this.commentSectionOffsetTop = document.querySelector(
            ".postDetail_wrapperHead"
          ).offsetHeight;
        }
      }
    },
  },
};
</script>

<style lang="scss">
.postDetail {
  width: 60%;
  max-height: 100%;
  background-color: white;
  position: relative;
  min-height: $postDetailMinHeight;
  &_wrapperHead {
    padding: 20px;
    position: absolute;
    top: 0;
    overflow-y: scroll;
    width: 100%;
  }
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
    margin-bottom: 10px;
  }
  &_place {
    &Name {
      color: $blue;
    }
    margin-bottom: 10px;
  }
  &_category {
    &Tag {
      color: white;
      background-color: black;
      padding: 4px 8px;
      border-radius: $tagBorderRadius;
      display: inline-block;
      margin-bottom: 10px;
      font-size: 0.75rem;
      &:not(:last-child) {
        margin-right: 4px;
      }
    }
  }
  &_reaction {
    display: flex;
    justify-content: space-between;
    &Like {
    }
    &Comment {
      margin-left: 10px;
    }
  }
}
</style>
