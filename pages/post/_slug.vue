<template>
  <div class="container">
    <div id="fb-root"></div>
    {{ slug }}
    <div class="container_postDetail">
      <ImageSlider :post="payload" :fetchingPost="fetchingPost" />
      <PostDetail :post="payload" :fetchingPost="fetchingPost" />
    </div>
    <!-- <div class="container_recommendations">
      <Recommendation :post="post" />
    </div> -->
  </div>
</template>

<script>
export default {
  async asyncData({ params, error, payload }) {
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
      fetchingPost: false,
      post: null,
    };
  },
  created() {
    if (this.slug && !this.post) {
      this.fetchPost();
    }
  },
  mounted() {},
  methods: {
    async fetchPost() {
      try {
        this.fetchingPost = true;
        let res = await this.$axios.get(`/api/post/${this.slug}`);
        this.post = res.data;
      } catch (error) {
        console.log(error);
      } finally {
        this.fetchingPost = false;
      }
    },
    head() {
      return {
        // title: get(this.post, "content", "page title"),
        // script: [
        //   {
        //     hid: "facebook",
        //     src:
        //       "https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v9.0&appId=1177682459073267&autoLogAppEvents=1",
        //     defer: true,
        //     async: true,
        //     nonce: "36uC68Zf",
        //   },
        // ],
        // meta: [
        //   { charset: "utf-8" },
        //   { name: "viewport", content: "width=device-width, initial-scale=1" },
        //   {
        //     hid: "description",
        //     name: "description",
        //     content: get(this.post, "content", "page content"),
        //   },
        //   {
        //     hid: "url",
        //     property: "url",
        //     content:
        //       "https://upbeat-panini-d9f351.netlify.app/?id=5fcdc7cc652113083a8e54da",
        //   },
        //   {
        //     hid: "image",
        //     name: "image",
        //     content: "https://unsplash.com/photos/RaRARO4gQcU",
        //   },
        // ],
        title: "ooooooooooooooooo",
        meta: [
          {
            hid: "og-title",
            property: "og:title",
            content: "yeyeyeyeyeyeyeye",
          },
        ],
      };
    },
  },
  async fetch() {
    // Called also on query changes
    this.fetchPost();
  },
  watch: {
    "$route.query": "$fetch",
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
  flex-direction: column;
}
.container_postDetail {
  // flex-direction: column;
  .commentSection {
    display: none;
  }
  .postDetail {
  }
  @media screen and (min-width: $breakpoint-tablet) {
    flex-direction: row;
  }
}
</style>
