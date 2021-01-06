<template>
  <div>
    <template
      class="commentSection"
      v-if="!fetchingComment && !fetchingPost && comments && comments.length"
      ref="commentSection"
    >
      <div
        class="commentSection_head"
        v-for="comment in comments"
        :key="comment.id"
      >
        <avatar
          v-if="post"
          :src="comment.user.avatar"
          avaClass="postDetail_headAvatar"
        ></avatar>
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
          <div
            class="commentSection_headReaction"
            v-if="comment && (comment.updatedAt || comment.likeRef)"
          >
            <font-awesome-icon :icon="['far', 'heart']" />
            <span class="">{{
              (comment && comment.likeRef && comment.likeRef.count) || 0
            }}</span>
            <span
              v-if="comment && comment.updatedAt"
              class="commentSection_content"
            >
              {{ $moment(comment.updatedAt).format("MMM d") }}
            </span>
          </div>
          <ViewReply
            v-if="comment && comment.replyRef && comment.replyRef.count"
            :replies="comment.replyRef"
          />
        </div>
      </div>
      <div class="commentSection_loadMore">
        <font-awesome-icon @click="loadMore" :icon="['fas', 'plus-circle']" />
      </div>
      <div v-if="count && !stopFetching">plus</div>
    </template>
    <template v-if="fetchingComment || fetchingPost">
      <div
        class="commentSection commentSectionLoading"
        id="commentSectionLoading"
      >
        <div
          class="commentSection_head"
          v-for="(_, index) in dummyComments"
          :key="index"
        >
          <div class="skeleton-box commentSection_headAvatarSkeleton"></div>
          <div
            class="commentSection_headComment commentSection_headCommentLoading"
          >
            <div class="commentSection_headContent">
              <span
                class="skeleton-box commentSection_headUserNameSkeleton"
              ></span>
              <span class="skeleton-box commentSection_contentSkeleton"></span>
            </div>
            <div class="commentSection_headReaction">
              <span class="commentSection_headReactionItemSkeleton"></span>
              <span class="commentSection_headReactionItemSkeleton"></span>
              <span class="commentSection_headReactionItemSkeleton"></span>
            </div>
            <ViewReply
              v-if="comment && comment.replyRef && comment.replyRef.count"
              :replies="comment.replyRef"
            />
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
  computed: {},
  data: function () {
    return {
      comments: [],
      fetchingComment: false,
      count: null,
      currentPage: 1,
      stopFetching: false,
      dummyComments: new Array(5),
    };
  },
  methods: {
    async fetchComments(commentRefId, page) {
      try {
        this.fetchingComment = true;
        console.log(this.currentPage);
        let res = await this.$axios.post(
          `/api/comment/${commentRefId}?page=${1}&number=${DEFAULT_ITEM_PER_PAGE}`
        );
        this.comments = res.data.comments;
        console.log(res.data);
        if (this.currentPage === 1) {
          this.count = res.data.count;
        }
        if (this.currentPage * DEFAULT_ITEM_PER_PAGE <= this.count) {
          this.currentPage = this.currentPage + 1;
        } else {
          this.stopFetching = true;
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.fetchingComment = false;
      }
    },
    loadMore() {
      if (!this.stopFetching) {
        this.fetchComments(this.post.commentRef.id, this.currentPage + 1);
      }
    },
  },
  mounted() {
    if (get(this.post, "commentRef.id", null)) {
      this.fetchComments(this.post.commentRef.id, null);
    }
    console.log("aaaaaaaaaaaaaa");
    // if (
    //   document.querySelector("#commentSectionLoading") &&
    //   this.commentSectionOffsetTop
    // ) {
    //   document.querySelector(
    //     "#commentSectionLoading"
    //   ).style.top = `${this.commentSection}px`;
    // }
  },
  created() {},
  watch: {
    post: {
      handler(newVal, old) {
        if (
          newVal &&
          get(newVal, "commentRef.id", null) &&
          newVal.commentRef !== get(old, "commentRef", null)
        ) {
          this.fetchComments(newVal.commentRef.id, this.currentPage);
        }
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.commentSection {
  padding: 20px;
  overflow-y: scroll;
  width: 100%;
  position: absolute;
  max-height: calc(100% - 200px);
  top: 200px;
  @include scrollBar;
  &Loading {
    top: $loadingSkeletonPostDetailHeight;
  }
  &_head {
    display: flex;
    align-items: flex-start;
    margin-bottom: 10px;
    &Avatar {
      width: $userAvatarCommentSize;
      height: $userAvatarCommentSize;
      border-radius: 50%;
      &Skeleton {
        width: $userAvatarCommentSize;
        height: $userAvatarCommentSize;
        border-radius: 50%;
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
