<template>
  <div v-if="popularPosts && popularPosts.length" class="recommendation">
    <vue-masonry-wall
      :items="popularPosts"
      :options="{ width: 300, padding: 12 }"
      :ssr="{ columns: 2 }"
    >
      <template v-slot:default="{ item }">
        <div class="item">
          <NuxtLink :to="'/?id=' + item.id">
            <img
              :src="item.images[0]"
              :alt="item.content"
              class="recommendation_mansonryImg"
            />
          </NuxtLink>
        </div>
      </template>
    </vue-masonry-wall>
  </div>
</template>

<script>
import VueMasonryWall from "vue-masonry-wall";
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
      options: {
        width: 300,
        padding: {
          2: 8,
          default: 12,
        },
      },
      items: [
        { title: "Item 0", content: "Content" },
        { title: "Item 1", content: "Content" },
      ],
    };
  },
  created() {
    this.fetPopularPosts();
  },
  methods: {
    async fetPopularPosts() {
      let res = await this.$axios.post("/post/popular");
      this.popularPosts = res.data;
      console.log("***********");
      console.log(res.data);
    },
    append() {
      for (let i = 0; i < 20; i++) {
        this.items.push({
          title: `Item ${this.items.length}`,
          content: "Content",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.recommendation {
  width: 100%;
  &_mansonry {
    &Img {
      width: 100%;
      object-fit: cover;
    }
  }
}
</style>
