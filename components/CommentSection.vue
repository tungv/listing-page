<template>
  <div class="commentSection" v-if="comments && comments.length" ref="commentSection">
    <div class="commentSection_head" v-for="comment in comments" :key="comment.id">
      <avatar
        v-if="post"
        :src="comment.user.avatar"
        avaClass="postDetail_headAvatar"
      ></avatar>
      <div class="commentSection_headComment">
        <div class="commentSection_headContent">
          <span class="commentSection_headUserName">{{ comment.user.displayName }}</span>
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
    <div class="commentSection_loadMore">
      <font-awesome-icon @click="loadMore" :icon="['fas', 'plus-circle']" />
    </div>
    <div v-if="count && !stopFetching">plus</div>
  </div>
</template>

<script>
import { get } from "lodash";
import { DEFAULT_ITEM_PER_PAGE } from "@/constants";

export default {
  name: "CommentSection",
  props: ["commentSectionOffsetTop", "post"],
  computed: {},
  data: function () {
    return {
      comments: [],
      fetchingComment: false,
      count: null,
      currentPage: 1,
      stopFetching: false,
    };
  },
  methods: {
    async fetchComments(commentRefId, page) {
      console.log("zzzzzzzzzzzzz");
      console.log("zzzzzzzzzzzzz ", page);
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
      console.log("vvv");
      if (!this.stopFetching) {
        this.fetchComments(this.post.commentRef.id, this.currentPage + 1);
      }
    },
  },
  mounted() {
    if (get(this.post, "commentRef.id", null)) {
      this.fetchComments(this.post.commentRef.id, null);
    }
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
