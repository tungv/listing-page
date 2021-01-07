<template>
  <div class="imageSlider">
    <template v-if="!fetchingPost && post && post.images && post.images.length">
      <VueSlickCarousel
        :arrows="true"
        :dots="true"
        :class="[
          'imageSliderSlide',
          post && post.images.length > 1 && 'imageSliderSlideMultiple',
        ]"
      >
        <div v-for="(item, id) in post.images" :key="id" class="imageSliderSlideItem">
          <img :src="item" alt="" class="imageSliderSlideItemImg" />
        </div>
      </VueSlickCarousel>
    </template>
    <div
      v-if="fetchingPost"
      class="skeleton-box imageSlider_noImage"
      style="width: 100%; height: 100%"
    ></div>
    <div
      class="imageSlider_noImage"
      v-if="!fetchingPost && (!post || !post.images || !post.images.length)"
    >
      no image
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";

export default {
  name: "ImageSlider",
  components: { VueSlickCarousel },
  props: ["post", "fetchingPost"],
  mounted() {},
};
</script>
<style lang="scss" scoped>
.imageSlider {
  width: 70vw;
  max-width: 70vw;
  background-color: white;
  &Slide {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    &Multiple {
      .slick-dots {
        height: calc(500px - 25px);
        bottom: 0;
      }
    }
    button {
      left: 0;
    }
    &Item {
      height: 100%;
      &Img {
        width: 100%;
        height: 100%;
      }
    }
    &Dots {
      display: flex;
    }
  }
  &_noImage {
    width: 100%;
    height: 100%;
    background-color: $grey;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 400px;
  }
}

.slick-slider {
  ::v-deep .slick-arrow:before {
    opacity: 1;
  }
  ::v-deep .slick-prev {
    left: 0;
  }
  ::v-deep .slick-next {
    right: 0;
  }
  .slick-active button:before {
    color: white;
  }
  .slick-list {
    height: 100% !important;
  }
  .slick-track {
    height: 100%;
  }
}
</style>
