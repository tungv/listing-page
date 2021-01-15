<template>
  <div class="container">
    <div id="fb-root"></div>
    <div class="container_postDetail">
      <ImageSlider :post="post" :fetchingPost="fetchingPost" />
      <PostDetail :post="post" :fetchingPost="fetchingPost" />
    </div>
    <div class="container_recommendations">
      <Recommendation :post="post" />
    </div>
  </div>
</template>

<script>
const DEFAULT_SHARE_THUMBNAIL =
  "https://images.unsplash.com/photo-1608977005169-5a540d8b2458?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0MXx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60";

export default {
  async asyncData({ params, error, $axios, $payloadURL, route, ...rest }) {
    if (process.static && process.client && $payloadURL)
      return await $axios.$get($payloadURL(route));

    // if (payload) return { post: payload };
    // console.log("******");
    // console.log(rest);
    // console.log(params);
    // console.log(params.slug);
    // console.log(payload);
    const slug = params.slug; // When calling /abc the slug will be "abc"
    // if (payload) {
    //   return { post: payload, slug };
    // } else {
    //   const res = await axios.get(
    //     `https://urich-server.herokuapp.com/api/web/api/post/${slug}`
    //   );
    //   const post = res.data;
    //   return { post, slug };
    // }
  },
  data: function () {
    return {
      post: null,
      id: null,
      fetchingPost: false,
    };
  },
  created() {},
  mounted() {
    console.log(this.$route.query.id);
    // this.fetchPost(this.$route.query.id);
  },
  methods: {
    async fetchPost(id) {
      try {
        this.fetchingPost = true;
        let res = await this.$axios.get(`/api/post/${id}`);
        this.post = res.data;
      } catch (error) {
        console.log(error);
      } finally {
        this.fetchingPost = false;
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
        meta: [
          {
            hid: "description",
            name: "description",
            content: get(this.post, "content", "page content"),
          },
        ],
      };
    },
  },
  async fetch() {
    // Called also on query changes
    this.fetchPost(this.$route.query.id);
  },
  watch: {
    // "$route.query": "$fetch",
  },
};
</script>

<style lang="scss">
.container {
  margin: 0 auto;
  min-height: 100vh;
  padding-left: 5%;
  padding-right: 5%;
  &_recommendations {
    margin-top: 30px;
  }
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
  flex-direction: column;
}
.container_postDetail {
  @media screen and (min-width: $breakpoint-tablet) {
    flex-direction: row;
  }
}
</style>
