<template>
	<div class="col-9 px-0 main-area">
		<div :style="{ minHeight: PAGE_SIZE * 8.7 + 3 + 'rem' }">
			<base-spinner v-if="isLoading" class="mx-auto"></base-spinner>
			<base-card v-else>
				<div class="d-flex justify-content-end mb-5 me-5">
					<select v-model="selectedOrder">
						<option value="price-asc">Price Ascending</option>
						<option value="price-desc">Price Descending</option>
						<option value="year-asc">Year Ascending</option>
						<option value="year-desc">Year Descending</option>
					</select>
				</div>
				<div class="row mb-3">
					<div class="col-2 text-start fw-bold">resim</div>
					<div class="col-2 text-start fw-bold">başlık</div>
					<div class="col-2 text-start fw-bold">km</div>
					<div class="col-2 text-start fw-bold">yıl</div>
					<div class="col-2 text-start fw-bold">güç</div>
					<div class="col-2 text-start fw-bold">fiyat</div>
				</div>
				<div v-for="car in carList" :key="car.id">
					<router-link
						:to="'/detail/' + car.id"
						class="d-flex align-items-center border-bottom py-1 row"
					>
						<div class="img-container col-2">
							<img :src="car.image" class="rounded-1" alt="car.id" />
						</div>
						<div class="col-2">
							{{ car.header }}
						</div>
						<div class="col-2">{{ car.km }}</div>
						<div class="col-2">{{ car.year }}</div>
						<div class="col-2">{{ car.power }}</div>
						<div class="col-2">{{ car.price }}</div>
					</router-link>
				</div>
			</base-card>
		</div>
		<the-pagination :page-count="totalPageCount"></the-pagination>
	</div>
</template>
<script setup>
/* eslint-disable */
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import { supabase } from "@/utils/supabase";
import { useRoute, useRouter } from "vue-router";
import { PAGE_SIZE } from "../utils/helpers";
const store = useStore();
const route = useRoute();
const router = useRouter();
const selectedOrder = ref("price-desc");
watch(
	selectedOrder,
	(s) => {
		router.push({ query: { ...route.query, orderBy: s } });
	},
	{ immediate: true }
);
const pageNum = computed(() => route.query.pageNum || 1);
const filtersObj = computed(() => route.query);
let payload = supabase.from("car").select("*", { count: "exact" });
watch(
	[pageNum, filtersObj],
	([p, f]) => {
		payload = supabase.from("car").select("*", { count: "exact" });
		Object.keys(f).forEach((k) => {
			if (k === "pageNum") return;
			else if (k === "orderBy") {
				const [column, order] = f[k].split("-");
				const ascending = order === "asc";
				payload = payload.order(column, { ascending });
			} else if (k === "year_max") payload = payload.lte("year", Number(f[k]));
			else if (k === "year_min") payload = payload.gte("year", Number(f[k]));
			else if (k === "price_max") payload = payload.lte("price", Number(f[k]));
			else if (k === "price_min") payload = payload.gte("price", Number(f[k]));
			else if (k === "power_max") payload = payload.lte("power", Number(f[k]));
			else if (k === "power_min") payload = payload.gte("power", Number(f[k]));
			else if (k === "km_max") payload = payload.lte("km", Number(f[k]));
			else if (k === "km_min") payload = payload.gte("km", Number(f[k]));
			else payload = payload.in(`${k}_id`, f[k].split("-"));
		});

		console.log(f, payload);
		store.dispatch(
			"cars/fetchFilteredCarList",
			payload.range((p - 1) * PAGE_SIZE, p * PAGE_SIZE - 1)
		);
	},
	{ immediate: true }
);
const totalCarCount = computed(() => store.getters["cars/getTotalCarCount"]);
const totalPageCount = computed(() =>
	Math.ceil(totalCarCount.value / PAGE_SIZE)
);

// store.dispatch(
// 	//INITIAL FETCH
// 	"cars/fetchFilteredCarList",
// 	pageNum.value
// 		? payload.range(
// 				(pageNum.value - 1) * PAGE_SIZE,
// 				pageNum.value * PAGE_SIZE - 1
// 		  )
// 		: payload.range(0, PAGE_SIZE - 1)
// );
const carList = computed(() => store.getters["cars/getCarList"]);
const isLoading = computed(
	() =>
		store.getters["cars/getIsLoadingCars"] || store.getters["cars/getIsLoading"]
);
</script>
<style scoped>
a {
	display: block;
	text-decoration: none;
	color: black;
}
a:hover div {
	transform: scale(1.03);
}
a:hover {
	background-color: rgba(214, 129, 25, 0.048);
}

.img-container img {
	width: 100%;
	max-height: 100%;
	aspect-ratio: 4/3;
	object-fit: cover;
}
select {
	border: 1px solid rgba(0, 0, 0, 0.145);
	padding: 0.3rem 0.5rem;
	border-radius: 0.35rem;
}
</style>
