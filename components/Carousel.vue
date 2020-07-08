<template>
  <div class="relative">
    <div class="carousel my-4">
      <h1 v-if="trendings.length === 0">Loading...</h1>
      <VueSlickCarousel v-else v-bind="settings">
        <div v-for="trending in trendings" :key="trending.id">
          <div class="trending px-2">
            <div class="bg">
              <img class="rounded-md" :src="`https://image.tmdb.org/t/p/w500/${trending.backdrop_path}`">
            </div>
            <h1 class="title">
              {{ trending.title||trending.name }}
            </h1>
          </div>
        </div>
      </VueSlickCarousel>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';
import api from '~/api';

export default {
  components: {
    VueSlickCarousel
  },
  data() {
    return {
      trendings: [],
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
  mounted() {
    api.trending('all', 'week')
    .then((res) => {
      const data = res.data.results.splice(0, 5);

      this.trendings = data;
    });
  }
};
</script>

<style>
  .slick-prev:before, .slick-next:before {
    color: black;
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
    transition: background-color 0.5s;
  }

  .trending:hover .bg::before {
    background-color: rgba(0,0,0,0.6);
  }

  .trending .title {
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    text-align: center;
  }

  .trending:hover .title {
    display: inline-block;
  }

  @media (max-width: 768px) {
    .trending .title {
      font-size: 16px;
    }
  }
</style>
