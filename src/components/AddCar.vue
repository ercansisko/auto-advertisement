<template>
  <div>
    <div v-if="!isLoading">
      <form @submit.prevent="handleSubmit">
        <div class="row">
          <div class="col-12">
            <h4 class="text-center my-5">BİLGİLER</h4>
            <base-card class="main-info">
              <div class="w-75 mx-auto mb-5">
                <form-item layout="vertical">
                  <label for="header">header</label>
                  <input
                    class="w-100"
                    type="text"
                    id="header"
                    v-model="header"
                  />
                </form-item>
                <form-item layout="vertical">
                  <label for="info">info</label>
                  <textarea
                    class="w-100"
                    v-model="info"
                    id="info"
                    rows="5"
                  ></textarea>
                </form-item>
                <form-item layout="vertical">
                  <label for="year">Year</label>
                  <input class="w-50" type="text" id="year" v-model="year" />
                </form-item>
                <form-item layout="vertical">
                  <label for="km">Km</label>
                  <input class="w-50" type="text" id="km" v-model="km" />
                </form-item>
                <form-item layout="vertical">
                  <label for="power">Power</label>
                  <input class="w-50" type="text" id="power" v-model="power" />
                </form-item>
                <form-item layout="vertical">
                  <label for="price">price</label>
                  <input class="w-50" type="text" id="price" v-model="price" />
                </form-item>
                <form-item>
                  <label for="resim">Resim</label>
                  <input
                    type="file"
                    ref="fileInput"
                    accept="image/*"
                    @change="handleFileChange"
                    id="resim"
                    multiple
                  />
                </form-item>
                <div v-if="selectedFiles.length > 0">
                  <img
                    v-for="(file, i) in selectedFiles"
                    :src="file.render"
                    :key="i"
                    height="90px"
                  />
                </div>
              </div>
            </base-card>
          </div>
          <h4 class="text-center my-5">ÖZELLİKLER</h4>
          <div
            class="col-4 mb-3"
            v-for="feature in Object.keys(features)"
            :key="feature"
          >
            <h6 class="text-center text-uppercase">
              {{ feature.split("_")[0] }}
            </h6>
            <base-card style="height: 20rem; overflow-y: auto">
              <form-item layout="vertical">
                <div v-for="option in features[feature]" :key="option?.id">
                  <input
                    type="radio"
                    :name="feature"
                    :value="option.id"
                    v-model="refsObj[feature]"
                    :id="feature + '_' + option.id"
                  /><label :for="feature + '_' + option.id">{{
                    option?.name
                  }}</label>
                </div>
              </form-item>
            </base-card>
          </div>
          <div class="col-4">
            <h6 class="text-center">BRANDS</h6>
            <base-card style="height: 20rem; overflow-y: auto">
              <form-item layout="vertical">
                <div v-for="option in brands" :key="option?.id">
                  <input
                    type="radio"
                    name="brand_id"
                    :value="option.id"
                    v-model="refsObj['brand_id']"
                    :id="'brand_id' + '_' + option.id"
                  /><label :for="'brand_id' + '_' + option.id">{{
                    option?.name
                  }}</label>
                </div>
              </form-item>
            </base-card>
          </div>
          <div v-if="refsObj['brand_id']" class="col-4">
            <h6 class="text-center">MODELS</h6>
            <base-card style="height: 20rem; overflow-y: auto">
              <form-item layout="vertical">
                <div v-for="option in models" :key="option?.id">
                  <input
                    type="radio"
                    name="model_id"
                    :value="option.id"
                    v-model="refsObj['model_id']"
                    :id="'model_id' + '_' + option.id"
                  /><label :for="'model_id' + '_' + option.id">{{
                    option?.name
                  }}</label>
                </div>
              </form-item>
            </base-card>
          </div>
        </div>
        <div class="d-flex justify-content-center mb-5">
          <base-spinner v-if="loading"></base-spinner>
          <button v-else class="btn btn-success">Kaydet</button>
        </div>
      </form>
    </div>
    <div v-else>loading</div>
  </div>
</template>
<script setup>
/*eslint-disable*/
import { supabase } from "@/utils/supabase";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
const store = useStore();
const features = computed(() => {
  return store.getters["cars/getFeatures"];
});
const loading = ref(false);
const brands = computed(() => store.getters["cars/getBrands"]);
const models = computed(() => store.getters["cars/getModels"]);
const refsObj = reactive({});

watch(
  () => refsObj.brand_id,
  (brand_id) => {
    store.dispatch("cars/fetchModels", [brand_id]);
  }
);

const header = ref("");
const info = ref("");
const year = ref("");
const km = ref("");
const power = ref("");
const price = ref("");
const isLoading = computed(() => {
  return store.getters["cars/getIsLoading"];
});
const selectedFiles = ref([]);
const handleFileChange = (event) => {
  for (let i = 0; i < event.target.files.length; i++) {
    // selectedFiles.value.push(event.target.files[i]);
    const reader = new FileReader();
    reader.onload = (e) => {
      selectedFiles.value.push({
        image: event.target.files[i],
        render: e.target.result,
      });
    };
    reader.readAsDataURL(event.target.files[i]);
  }
};
// function handleSubmit() {
// 	console.log(selectedFiles.value);
// }
async function handleSubmit() {
  const formData = new FormData();
  selectedFiles.value.forEach((file) => {
    formData.append("files[]", file.image);
  });

  const images = Array.from(formData.getAll("files[]"));
  console.log(images);
  // if (!header.value) return;
  // if (info.value) return;
  // if (Number(year.value) < 1950 || Number(year.value) > 2024) return;
  // if (Number(km.value) < 0 || Number(km.value) > 2000000) return;
  // if (Number(power.value) > 2000 || Number(power.value) <= 0) return;
  // if (Number(price.value) < 50000 || Number(price.value) > 100000000)
  // 	return;
  const firstImageName = `${Math.random()}-${images[0]?.name}`.replaceAll(
    "/",
    ""
  );
  const firstImagefilePath =
    "https://zxqlqudaxwadebaivden.supabase.co/storage/v1/object/public/car_images/" +
    firstImageName;
  const postObjCar = {
    ...refsObj,
    year: Number(year.value),
    header: header.value,
    info: info.value,
    km: Number(km.value),
    power: Number(power.value),
    price: Number(price.value),
    image: firstImagefilePath,
  };
  loading.value = true;
  const { data: car } = await supabase
    .from("car")
    .insert([postObjCar])
    .select();
  loading.value = false;
  const promises = images.map(async (image, i) => {
    const fileName =
      i === 0
        ? firstImageName
        : `${Math.random()}-${image?.name}`.replaceAll("/", "");
    const filePath =
      "https://zxqlqudaxwadebaivden.supabase.co/storage/v1/object/public/car_images/" +
      fileName;
    await supabase
      .from("store")
      .insert([{ name: filePath, car_id: car[0].id }]);
    await supabase.storage.from("car_images").upload(fileName, image);
  });
  await Promise.all(promises);
}
</script>
<style scoped>
.main-info input[type="text"],
.main-info textarea {
  border: 1px solid rgba(0, 0, 0, 0.185);
  border-radius: 0.3rem;
  padding: 0.5rem;
}
.main-info input[type="text"]:focus,
.main-info textarea:focus {
  outline-color: rgba(0, 0, 0, 0.473);
}
</style>
