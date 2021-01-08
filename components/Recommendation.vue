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
import { uniqBy } from "lodash";

const DEFAULT_ITEM_PER_PAGE = 10;
const MANSONARY_OPTION = { width: 300, padding: 12 };
function content() {
  const length = Math.random() * 300 + 30;
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
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
      currentPage: null,
      stopFetching: false,
      MANSONARY_OPTION,
      startFetching: true,
    };
  },
  created() {
    this.fetchPopularPosts();
  },
  methods: {
    async fetchPopularPosts(page) {
      try {
        let res = await this.$axios.post(
          `/api/post/popular?page=${
            this.currentPage + 1
          }&number=${DEFAULT_ITEM_PER_PAGE}`
        );
        if (this.currentPage === 1) {
          this.popularPosts = res.data;
        } else {
          if (res && res.data && res.data.length) {
            this.popularPosts = uniqBy(
              [...this.popularPosts, ...res.data],
              "id"
            );
          }
        }
        this.currentPage += 1;
        if (!res.data.length) {
          this.stopFetching = true;
        }
      } catch (error) {
      } finally {
      }
    },
    async append() {
      if (!this.stopFetching && this.startFetching) {
        try {
          console.log(this.currentPage);
          await this.fetchPopularPosts();
        } catch (error) {
        } finally {
        }
      }
    },
    watch: {
      currentPage: function (newVal, oldVal) {
        if (newVal === oldVal) {
          this.startFetching = false;
        } else {
          this.startFetching = true;
        }
      },
    },
    beforeDestroy() {
      this.currentPage = 0;
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
