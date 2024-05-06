<template>
  <div class="ps-0 pe-3">
    <div v-if="loading || loadingBrands">loading</div>
    <base-card v-else>
      <form @submit.prevent="handleSubmit">
        <h6 class="text-center">FİLTRELE</h6>
        <filter-item
          :feature="brand_id"
          featureName="brand_id"
          v-model="brandsRef"
        >
        </filter-item>
        <filter-item
          :feature="model_id"
          featureName="model_id"
          v-model="modelsRef"
        >
        </filter-item>
        <filter-item
          v-for="feature in Object.keys(features)"
          :key="feature"
          :feature="features[feature]"
          :featureName="feature"
          v-model="refsObj[feature].value"
        ></filter-item>
        <filter-item v-model="yearRef" featureName="year" :filter-text="true">
        </filter-item>
        <filter-item v-model="priceRef" featureName="price" :filter-text="true">
        </filter-item>
        <filter-item v-model="powerRef" featureName="power" :filter-text="true">
        </filter-item>
        <filter-item v-model="kmRef" featureName="km" :filter-text="true">
        </filter-item>
        <button class="btn btn-success w-100 d-block">filtrele</button>
      </form>
    </base-card>
  </div>
</template>
<script setup>
/*eslint-disable*/
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
const store = useStore();
const router = useRouter();
const features = computed(() => store.getters["cars/getFeatures"]);
const loading = computed(() => store.getters["cars/getIsLoading"]);
const loadingBrands = computed(() => store.getters["cars/getIsLoadingBrands"]);
const brand_id = computed(() => store.getters["cars/getBrands"]);
const brandsRef = ref([]);
const model_id = computed(() => store.getters["cars/getModels"]);
const modelsRef = ref([]);
watch(brandsRef, (x) => {
  store.dispatch("cars/fetchModels", x);
});
const refsObj = computed(() =>
  Object.keys(store.getters["cars/getFeatures"]).reduce((acc, cur) => {
    acc[cur] = ref([]);
    return acc;
  }, {})
);
const yearRef = ref([]);
const priceRef = ref([]);
const powerRef = ref([]);
const kmRef = ref([]);
function handleSubmit() {
  const postObj = {};
  Object.keys(refsObj.value).forEach((k) => {
    const key = k.split("_")[0];
    const value = refsObj.value[k].value.join("-");
    if (refsObj.value[k].value.length > 0) postObj[key] = value;
  });
  if (yearRef.value[0]) postObj["year_min"] = yearRef.value[0];
  if (yearRef.value[1]) postObj["year_max"] = yearRef.value[1];
  if (priceRef.value[0]) postObj["price_min"] = priceRef.value[0];
  if (priceRef.value[1]) postObj["price_max"] = priceRef.value[1];
  if (powerRef.value[0]) postObj["power_min"] = powerRef.value[0];
  if (powerRef.value[1]) postObj["power_max"] = powerRef.value[1];
  if (kmRef.value[0]) postObj["km_min"] = kmRef.value[0];
  if (kmRef.value[1]) postObj["km_max"] = kmRef.value[1];
  if (modelsRef.value.length > 0) postObj["model"] = modelsRef.value.join("-");
  if (brandsRef.value.length > 0) postObj["brand"] = brandsRef.value.join("-");
  router.push({ query: { ...postObj, pageNum: 1 } });
  // let query = supabase
  // 	.from("car")
  // 	.select("*", { count: "exact" })
  // 	.range(
  // 		(activePage.value - 1) * PAGE_SIZE,
  // 		activePage.value * PAGE_SIZE - 1
  // 	);
  // Object.keys(postObj).forEach((k) => {
  // 	if (postObj[k].length > 0) query = query.in(k, postObj[k]);
  // });
  // store.dispatch("cars/fetchFilteredCarList", query);
}
</script>
<style scoped>
select {
  width: 100%;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.219);
  border-radius: 0.25rem;
  padding: 0.25rem;
}
label {
  font-weight: 600;
}
</style>
