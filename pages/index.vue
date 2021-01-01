<template>
  <div class="container">
    <div id="fb-root"></div>
    <div class="container_postDetail">
      <ImageSlider :post="post" />
      <PostDetail :post="post" :comments="comments" />
    </div>
    <div class="container_recommendations">
      <Recommendation :post="post" />
    </div>
  </div>
</template>

<script>
import { get } from "lodash";

const DEFAULT_SHARE_THUMBNAIL =
  "https://images.unsplash.com/photo-1608977005169-5a540d8b2458?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0MXx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60";

export default {
  data: function () {
    return {
      post: null,
      id: null,
      comments: [],
    };
  },
  created() {
    if (this.$route.query.id) this.id = this.$route.query.id;
    this.fetchPost(this.$route.query.id);
  },
  mounted() {
    if (get(this.post, "commentRef.id", null)) {
      this.fetchComments(this.post.commentRef.id);
    }
  },
  mounted() {},
  methods: {
    async fetchPost() {
      try {
        let res = await this.$axios.get(`/api/post/${this.id}`);
        this.post = res.data;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchComments(commentRefId) {
      try {
        let res = await this.$axios.post(`/api/comment/${commentRefId}`);
        this.comments = res.data.comments;
        console.log(this.comments);
      } catch (error) {
        console.log(error);
      }
    },
    head() {
      return {
        title: get(this.post, "content", "page title"),
        script: [
          {
            hid: "facebook",
            src:
              "https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v9.0&appId=1177682459073267&autoLogAppEvents=1",
            defer: true,
            async: true,
            nonce: "36uC68Zf",
          },
        ],
      };
    },
  },
  watch: {
    post: {
      handler(newVal, old) {
        if (
          newVal &&
          get(newVal, "commentRef.id", null) &&
          newVal.commentRef !== get(old, "commentRef", null)
        ) {
          this.fetchComments(newVal.commentRef.id);
        }
      },
    },
  },
};
</script>

<style lang="scss">
.container {
  margin: 0 auto;
  min-height: 100vh;
  padding-left: 5%;
  padding-right: 5%;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
.container_postDetail {
  display: flex;
}
</style>
