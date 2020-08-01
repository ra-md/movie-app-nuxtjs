<template>
  <client-only>
    <div class="relative pt-4 md:pt-0">
      <div class="carousel my-4">
        <VueSlickCarousel v-bind="settings">
          <div v-for="trending in trendings" :key="trending.id">
            <div class="trending px-2">
              <SkeletonLoading v-if="data.length === 0" height="h-32 lg:h-56" rounded="rounded-md" />
              <nuxt-link v-else :to="`/${trending.title ? 'movies':'tv-show'}/${slug(trending)}`">
                <div class="bg">
                  <img
                    class="rounded-md"
                    width="500"
                    height="281"
                    :alt="trending.title||trending.name"
                    :src="`https://image.tmdb.org/t/p/w500/${trending.backdrop_path}`"
                  >
                </div>
                <h1 class="title">
                  {{ trending.title||trending.name }}
                </h1>
              </nuxt-link>
            </div>
          </div>
        </VueSlickCarousel>
      </div>
    </div>
  </client-only>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel';
import SkeletonLoading from './SkeletonLoading';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';
import api from '~/api';
import convertToSlug from '~/utils/convertToSlug';

export default {
  name: 'Carousel',
  components: {
    SkeletonLoading,
    VueSlickCarousel
  },
  data() {
    return {
      data: [],
      settings: {
        dots: true,
        centerMode: true,
        infinite: true,
        autoplay: true,
        slidesToShow: 2,
        speed: 500,
        autoplaySpeed: 5000,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              arrows: false,
              slidesToShow: 1
            }
          }
        ]
      }
    };
  },
  computed: {
    trendings() {
      if (this.data.length === 0) {
        return [{}, {}, {}, {}, {}];
      } else {
        return this.data;
      }
    }
  },
  created() {
    api.trending('all', 'week')
    .then((res) => {
      const data = res.data.results.splice(0, 5);

      this.data = data;
    });
  },
  methods: {
    slug(item) {
      return convertToSlug(item);
    }
  }
};
</script>

<style>
  .slick-prev:before, .slick-next:before {
    color: black!important;
  }

  .slick-slide div div {
    outline: none;
  }

  .trending, .bg {
    position: relative;
    cursor: pointer;
  }

  .bg::before {
    @apply rounded-md;
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: rgba(0,0,0,0.6);
    box-shadow: inset 0 0 2em 1em rgba(0,0,0,0.7);
    transition: opacity 0.5s;
    opacity: 0;
  }

  .trending:hover .bg::before {
    backdrop-filter: blur(5px);
    opacity: 1;
  }

  .trending .title {
    opacity: 0;
    transition: opacity 0.5s;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    text-align: center;
  }

  .trending:hover .title {
    opacity: 1;
  }

  @media (max-width: 768px) {
    .trending .title {
      font-size: 16px;
    }
  }
</style>
