<template>
  <div v-if="popularPosts && popularPosts.length" class="recommendation">
    <vue-masonry-wall
      :items="popularPosts"
      :options="MANSONARY_OPTION"
      :ssr="{ columns: 2 }"
      @append="append"
    >
      <template v-slot:default="{ item }">
        <GridItem :item="item" />
      </template>
    </vue-masonry-wall>
  </div>
</template>

<script>
import VueMasonryWall from "vue-masonry-wall";

const DEFAULT_ITEM_PER_PAGE = 10;
const MANSONARY_OPTION = { width: 300, padding: 12 };
function content() {
  const length = Math.random() * 300 + 30;
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
export default {
  name: "Recommendation",
  props: [],
  components: { VueMasonryWall },
  data: function () {
    return {
      popularPosts: [],
      options: MANSONARY_OPTION,
      currentPage: 1,
      stopFetching: false,
      MANSONARY_OPTION,
    };
  },
  created() {
    this.fetchPopularPosts();
  },
  methods: {
    async fetchPopularPosts(page) {
      console.log(page);
      let res = await this.$axios.post(
        `/api/post/popular?page=${
          page ? page : this.currentPage
        }&number=${DEFAULT_ITEM_PER_PAGE}`
      );
      if (this.currentPage === 1) {
        this.popularPosts = res.data;
      } else {
        if (res.data && res.data.length) {
          this.popularPosts = [...this.popularPosts, ...res.data];
        }
      }
      if (!res.data.length) {
        this.stopFetching = true;
      }
    },
    append() {
      if (!this.stopFetching) {
        try {
          this.fetchPopularPosts(this.currentPage + 1);
        } catch (error) {
        } finally {
          this.currentPage = this.currentPage + 1;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.recommendation {
  width: 100%;
  margin-top: 20px;
  &_mansonry {
    &Img {
      width: 100%;
      object-fit: cover;
    }
  }
}
</style>
