<template>
  <div class="postDetail">
    <div
      class="postDetail_wrapperHead"
      v-if="!fetchingPost"
      ref="postDetail_wrapperHead"
    >
      <div class="postDetail_head">
        <avatar
          v-if="post"
          :src="avatar"
          avaClass="postDetail_headAvatar"
        ></avatar>
        <div class="postDetail_headUser" v-if="displayName && updatedAt">
          <div>{{ displayName }}</div>
          <div>{{ $moment(updatedAt).format("MMM d") }}</div>
        </div>
      </div>
      <div v-if="post && post.content" class="postDetail_content">
        {{ post.content }}
      </div>
      <div
        v-if="post && post.place && post.place.name"
        class="postDetail_place"
      >
        <font-awesome-icon :icon="['fas', 'map-marker-alt']" />
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
          {{ post.likeRef.count || 0 }}
          <font-awesome-icon :icon="['far', 'comment']" />
          <span v-if="post.commentRef" class="postDetail_reactionComment">
            {{ post.commentRef.count || 0 }}
          </span>
          <font-awesome-icon :icon="['far', 'heart']" />
        </div>
        <ShareNetwork
          network="facebook"
          :url="path"
          :title="post.content || ''"
          :description="post.content || ''"
        >
          <font-awesome-icon :icon="['fas', 'share']" />
        </ShareNetwork>
      </div>
    </div>
    <div
      class="postDetail_wrapperHead"
      v-if="fetchingPost"
      ref="postDetail_wrapperHead"
    >
      <div class="postDetail_head">
        <div class="skeleton-box postDetail_headAvatarSkeleton"></div>
        <div class="postDetail_headUserLoading">
          <div class="skeleton-box postDetail_headUserSkeleton"></div>
          <div class="skeleton-box postDetail_headUserSkeleton"></div>
        </div>
      </div>
      <div class="skeleton-box postDetail_contentLoading"></div>
      <div class="skeleton-box postDetail_placeLoading"></div>
      <div class="postDetail_categoryLoading">
        <template v-for="(_, index) in dummyCategories">
          <span :key="index" class="skeleton-box postDetail_categoryTagLoading">
          </span>
        </template>
      </div>
    </div>
    <CommentSection
      :fetchingPost="fetchingPost"
      :post="post"
      :commentSectionOffsetTop="commentSectionOffsetTop"
    />
  </div>
</template>
<script>
import { get } from "lodash";

export default {
  props: ["post", "fetchingPost"],
  data: function () {
    return {
      commentSectionOffsetTop: null,
      dummyCategories: new Array(3),
    };
  },
  mounted() {
    if (process.browser) {
      this.location = window.location;
    }
    this.calculateCSS();
  },
  updated() {
    this.calculateCSS();
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
        return window.location.href;
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
  width: 100%;
  max-height: 100%;
  background-color: white;
  position: relative;
  margin-top: 20px;
  min-height: $postDetailMinHeightMobile;
  @media screen and (min-width: $breakpoint-tablet) {
    min-height: $postDetailMinHeight;
    margin-top: $containerPadding20;
    width: 60%;
  }
  &_wrapperHead {
    padding: 0;
    @media screen and (min-width: $breakpoint-tablet) {
      padding: 20px;
    }
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
      &Skeleton {
        width: $userAvatarSize;
        height: $userAvatarSize;
        border-radius: 50%;
        flex: none;
      }
    }
    &User {
      display: flex;
      flex-direction: column;
      margin-left: 5px;
      &Loading {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: $userAvatarSize;
        width: 100%;
        .postDetail_headUserSkeleton:first-child {
          margin-bottom: 4px;
        }
        margin-left: 5px;
      }
      &Grey {
        background-color: $grey;
      }
      &Skeleton {
        width: 100%;
        height: $loadingSkeletonUsernameHeight;
      }
    }
  }
  &_content {
    margin-top: 10px;
    @include max-5-lines;
    margin-bottom: 10px;
    &Loading {
      margin-top: 10px;
      width: 100%;
      height: $loadingSkeletonUsernameHeight * 3;
    }
  }
  &_place {
    &Name {
      color: $blue;
    }
    margin-bottom: 10px;
    &Loading {
      width: 100%;
      height: $loadingSkeletonUsernameHeight;
    }
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
      &Loading {
        width: $loadingSkeletonTagWidth;
        height: $loadingSkeletonTagHeight;
        margin-bottom: 10px;
        &:not(:last-child) {
          margin-right: 4px;
        }
        border-radius: $tagBorderRadius;
      }
    }
    &Loading {
      width: auto;
      height: auto;
    }
  }
  &_reaction {
    display: flex;
    justify-content: space-between;
    &Like {
      &Loading {
        height: $loadingSkeletonUsernameHeight;
        width: $loadingSkeletonReactionItemWidth;
      }
    }
    &Comment {
      margin-left: 10px;
      &Loading {
        height: $loadingSkeletonUsernameHeight;
        width: $loadingSkeletonReactionItemWidth;
        margin-left: 10px;
      }
    }
  }
}
</style>
