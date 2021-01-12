<template>
  <div>
    <div class="commentSection" v-if="!fetchingPost">
      <template v-if="comments && comments.length">
        <div class="commentSection_head" v-for="comment in comments" :key="comment.id">
          <avatar
            v-if="post"
            :src="comment.user.avatar"
            avaClass="commentSection_headAvatar"
          ></avatar>
          <div class="commentSection_headComment">
            <div class="commentSection_headContent">
              <span class="commentSection_headUserName">{{
                comment.user.displayName
              }}</span>
              <span v-if="comment && comment.content" class="commentSection_content">
                {{ comment.content }}
              </span>
            </div>
            <div
              class="commentSection_headReaction"
              v-if="comment && (comment.updatedAt || comment.likeRef)"
            >
              <font-awesome-icon :icon="['far', 'heart']" />
              <span class="">{{
                (comment && comment.likeRef && comment.likeRef.count) || 0
              }}</span>
              <span v-if="comment && comment.updatedAt" class="commentSection_content">
                {{ $moment(comment.updatedAt).format("MMM d") }}
              </span>
            </div>
            <ViewReply
              v-if="comment && comment.replyRef && comment.replyRef.count"
              :replies="comment.replyRef"
            />
          </div>
        </div>
        <div class="commentSection_loadMore" v-if="!stopFetching && !fetchingComment">
          <font-awesome-icon @click="loadMore" :icon="['fas', 'plus-circle']" />
        </div>
        <div
          v-if="fetchingComment && currentPage !== 0"
          class="skeleton-box commentSection_contentSkeletonMore"
        ></div>
      </template>
    </div>
    <template v-if="renderCommentSkeleton">
      <div class="commentSection commentSectionLoading" id="commentSectionLoading">
        <div class="commentSection_head" v-for="(_, index) in dummyComments" :key="index">
          <div class="skeleton-box commentSection_headAvatarSkeleton"></div>
          <div class="commentSection_headComment commentSection_headCommentLoading">
            <div class="commentSection_headContent">
              <span class="skeleton-box commentSection_contentSkeleton"></span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { get } from "lodash";
import { DEFAULT_ITEM_PER_PAGE } from "@/constants";

export default {
  name: "CommentSection",
  props: ["commentSectionOffsetTop", "post", "fetchingPost"],
  data: function () {
    return {
      comments: [],
      fetchingComment: false,
      count: null,
      currentPage: 0,
      stopFetching: false,
      dummyComments: new Array(3),
      offsetTop: null,
    };
  },
  computed: {
    renderCommentSkeleton: function () {
      return (this.fetchingPost || this.fetchingComment) && this.currentPage === 0;
    },
  },
  methods: {
    calculateCSS() {
      if (this.commentSectionOffsetTop && document.querySelector(".commentSection")) {
        document.querySelector(
          ".commentSection"
        ).style.top = `${this.commentSectionOffsetTop}px`;
        document.querySelector(
          ".commentSection"
        ).style.maxHeight = `calc(100% - ${this.commentSectionOffsetTop}px)`;
      }
    },
    async fetchComments() {
      try {
        this.fetchingComment = true;
        let res = await this.$axios.post(
          `/api/comment/${
            get(this.post, "commentRef.id", null) || this.$route.query.id
          }?page=${this.currentPage + 1}&number=${DEFAULT_ITEM_PER_PAGE}`
        );
        if (res && res.data && res.data.comments) {
          this.comments = [...this.comments, ...res.data.comments];
        }
        console.log(this.comments);
        this.calculateCSS();
        if (this.currentPage === 1) {
          this.count = res.data.count;
        }
        if (this.currentPage * DEFAULT_ITEM_PER_PAGE <= this.count) {
          this.currentPage = this.currentPage + 1;
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.fetchingComment = false;
      }
    },
    loadMore() {
      if (!this.stopFetching) {
        this.fetchComments();
      }
    },
  },
  mounted() {
    this.fetchComments();
  },
  watch: {
    post(newVal, old) {
      if (
        newVal &&
        get(newVal, "commentRef.id", null) &&
        newVal.commentRef !== get(old, "commentRef", null)
      ) {
        this.fetchComments();
      }
    },
    currentPage: function (newVal) {
      if (this.count && newVal * DEFAULT_ITEM_PER_PAGE >= this.count) {
        this.stopFetching = true;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.commentSection {
  display: block;
  @media screen and (max-width: $breakpoint-tablet) {
    display: none;
  }
  padding: 20px;
  overflow-y: scroll;
  width: 100%;
  position: absolute;
  @include scrollBar;
  &Loading {
    position: absolute;
    max-height: calc(100% - 200px);
    top: $loadingSkeletonPostDetailHeight;
  }
  &_head {
    display: flex;
    align-items: flex-start;
    margin-bottom: 10px;
    overflow-x: hidden;
    &Avatar {
      width: $userAvatarCommentSize;
      height: $userAvatarCommentSize;
      border-radius: 50%;
      &Skeleton {
        width: $userAvatarCommentSize;
        height: $userAvatarCommentSize;
        border-radius: 50%;
        flex: none;
      }
    }
    &User {
      display: flex;
      flex-direction: column;
      margin-left: 5px;
      &Name {
        font-weight: bold;
        &Skeleton {
          height: $loadingSkeletonCommentContentItemHeight;
          width: $loadingSkeletonReactionItemWidth;
        }
      }
    }
    &Comment {
      margin-left: 4px;
      &Loading {
        height: $userAvatarCommentSize;
        display: flex;
        align-items: center;
      }
    }
    &Reaction {
      color: $grey-1;
      &Item {
        &Skeleton {
          height: $loadingSkeletonCommentContentItemHeight;
          width: $loadingSkeletonReactionItemWidth;
          content: "";
        }
      }
    }
  }
  &_content {
    @include max-5-lines;
    margin-left: 4px;
    display: inline;
    &Skeleton {
      height: $loadingSkeletonCommentContentItemHeight;
      width: $loadingSkeletonCommentContentItemWidth;
      &More {
        width: 100%;
        margin-top: 10px;
      }
    }
  }
  &_loadMore {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: $loadMoreButtonFontSize;
    color: $grey-1;
  }
}
</style>
