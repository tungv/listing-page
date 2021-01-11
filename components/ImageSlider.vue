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
        <div
          v-for="(item, id) in post.images"
          :key="id"
          class="imageSliderSlideItem"
        >
          <img :src="item" alt="" class="imageSliderSlideItemImg" />
        </div>
      </VueSlickCarousel>
    </template>
    <div v-if="fetchingPost" class="skeleton-box imageSlider_noImage"></div>
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
  width: 100%;
  max-width: 100%;
  @media screen and (min-width: $breakpoint-tablet) {
    width: $imageCarouselWidth;
    max-width: $imageCarouselWidth;
  }
  background-color: white;
  padding-top: $containerPadding20;
  &Slide {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    &Multiple {
      .slick-dots {
        height: calc(#{$postDetailMinHeight} - #{$sliderDotsHeight});
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
    width: $imageCarouselWidth;
    height: 100%;
    background-color: $grey;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 400px;
  }
}

.slick-slider {
  width: 100%;
  max-width: 100%;
  @media screen and (min-width: $breakpoint-tablet) {
    width: $imageCarouselWidth;
    max-width: $imageCarouselWidth;
  }
  ::v-deep .slick-arrow:before {
    opacity: 1;
  }
  ::v-deep .slick-prev {
    left: 0;
    opacity: 1;
  }
  ::v-deep .slick-next {
    right: 0;
  }
  .slick-active button:before {
    color: white;
  }
  .slick-list {
    height: 100% !important;
    width: 100% !important;
    display: flex;
    align-items: center;
  }
  .slick-track {
    height: 100% !important;
    width: 100% !important;
    display: flex !important;
    align-items: center !important;
  }
  .slick-slide,
  .slick-active,
  .slick-current {
    width: 100%;
    max-width: 100%;
    @media screen and (min-width: $breakpoint-tablet) {
      width: $imageCarouselWidth;
      max-width: $imageCarouselWidth;
    }
  }
  .slick-dots {
    bottom: 2% !important;
  }
}
</style>
