<template>
  <base-spinner
    class="mx-auto"
    v-if="imagesIsLoading || carIsLoading"
  ></base-spinner>
  <div class="mx-0" v-else>
    <carousel
      class="m-0 p-0 mx-auto bg-dark"
      :items-to-show="1"
      :wrapAround="true"
    >
      <slide v-for="image in images" :key="image.id">
        <img class="main-img" :src="image?.name" :alt="image?.name" />
      </slide>

      <template #addons>
        <navigation />
      </template>
    </carousel>
    <div class="row gx-0 mt-3">
      <main-filter class="col-3"></main-filter>
      <base-card class="detail-info col-9 row mx-0">
        <div class="col-7 pt-5">
          <h4>{{ car.header }}</h4>
          <p>{{ car.info }}</p>
        </div>
        <div class="col-5 pt-5">
          <div class="mb-3">
            <div class="mb-3">
              <span class="fw-bold" style="width: 7rem; display: inline-block">
                price :</span
              >
              <span>{{ car["price"] }}</span>
            </div>
            <span class="fw-bold" style="width: 7rem; display: inline-block">
              year :</span
            >
            <span>{{ car["year"] }}</span>
          </div>
          <div class="mb-3">
            <span class="fw-bold" style="width: 7rem; display: inline-block">
              km :</span
            >
            <span>{{ car["km"] }}</span>
          </div>
          <div class="mb-3">
            <span class="fw-bold" style="width: 7rem; display: inline-block">
              power :</span
            >
            <span>{{ car["power"] }}</span>
          </div>
          <div
            class="mb-3"
            v-for="feature in Object.keys(features)"
            :key="feature"
          >
            <span class="fw-bold" style="width: 7rem; display: inline-block"
              >{{ feature.split("_")[0] }}:</span
            >
            <span>{{
              features[feature].find((x) => x.id === car[feature])?.name
            }}</span>
          </div>
        </div>
      </base-card>
    </div>
  </div>
</template>
<script setup>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Navigation } from "vue3-carousel";
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const route = useRoute();

const id = route.params.id;
store.dispatch("cars/fetchCar", id);
const car = computed(() => store.getters["cars/getCar"]);
const carIsLoading = computed(() => store.getters["cars/getIsLoadingCar"]);
const imagesIsLoading = computed(
  () => store.getters["cars/getIsLoadingCarImages"]
);
const features = computed(() => store.getters["cars/getFeatures"]);

store.dispatch("cars/fetchCarImages", id);
const images = computed(() => store.getters["cars/getCarImages"]);
</script>

<style scoped>
.img-container {
  z-index: -1;
}
.carousel__prev {
  color: rgb(255, 255, 255) !important;
  background-color: red !important;
}
.main-img {
  width: 100%;
  aspect-ratio: 21/9;
  object-fit: contain;
}
</style>
