<template>
	<form-item layout="vertical">
		<div
			class="d-flex fw-600 justify-content-between align-items-center w-100 clickable-filter"
			@click="handleToggleFilter"
		>
			<span>{{ props.featureName.split("_")?.[0] || props.featureName }}</span>
			<span>{{ isOpenFilter === true ? "-" : "+" }}</span>
		</div>
		<transition>
			<div
				class="w-100 checkContainer"
				:class="props.featureName === 'model_id' ? 'h-10' : ''"
				v-if="isOpenFilter"
			>
				<div v-if="props.filterText" class="row gx-0 gy-2">
					<label for="min" class="col-6">Başlangıç</label>
					<input type="text" v-model="model[0]" id="min" class="col-6" />
					<label for="max" class="col-6">Bitiş</label>
					<input type="text" v-model="model[1]" id="max" class="col-6" />
				</div>
				<div v-else>
					<div
						v-if="
							props.featureName === 'model_id' && props.feature.length === 0
						"
					>
						Lütfen marka seçiniz...
					</div>
					<template v-else>
						<div v-for="item in props.feature" :key="item.id">
							<input
								type="checkbox"
								:value="item.id"
								:id="props.featureName + '_' + item.id"
								v-model="model"
							/>
							<label
								v-if="props.featureName === 'model_id'"
								:for="props.featureName + '_' + item.id"
								class="check-label"
								>{{ item.name }}/{{
									brands.find((b) => b.id === item.brand_id)?.name
								}}</label
							>
							<label
								v-else
								:for="featureName + '_' + item.id"
								class="check-label"
								>{{ item.name }}</label
							>
						</div>
					</template>
				</div>
			</div>
		</transition>
	</form-item>
</template>
<script setup>
/*eslint-disable*/
import { ref, defineProps, defineModel, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const props = defineProps(["feature", "featureName", "filterText"]);
const model = defineModel();
const store = useStore();
const route = useRoute();
const query = computed(() => route.query);
const isOpenFilter = ref(false);
function handleToggleFilter() {
	isOpenFilter.value = !isOpenFilter.value;
}
const brands = computed(() => store.getters["cars/getBrands"]);
onMounted(() => {
	Object.keys(query.value).forEach((k) => {
		if (k === props.featureName.split("_")[0]) {
			const arr = query.value[k].split("-");
			model.value = [...arr];
		}
	});
});
</script>
<style scoped>
.v-enter-from {
	max-height: 0 !important;
	overflow: hidden !important;
}
.v-enter-active {
	overflow: hidden !important;
	max-height: 10rem;
	transition: max-height 0.5s ease;
}
.v-leave-to {
	overflow: hidden !important;
	max-height: 0 !important;
}
.v-leave-active {
	overflow: hidden !important;
	max-height: 10rem;
	transition: max-height 0.5s ease;
}
input[type="checkbox"] {
	display: none;
}
.fw-600 {
	font-weight: 600;
}
.clickable-filter:hover {
	cursor: pointer;
}
.h-10 {
	height: 10rem;
}
.checkContainer {
	max-height: 10rem;
	overflow-y: auto;
}
.check-label {
	display: inline-block;
	padding: 0.25rem 0.5rem;
	border: 1px solid #ccc;
	border-radius: 0.25rem;
	cursor: pointer;
	margin: 0.25rem 0;
	background-color: #f5f5f5;
	transition: background-color 0.5s;
	width: 100%;
}

input[type="checkbox"]:checked + .check-label {
	background-color: rgba(214, 129, 25, 0.701);
	color: white;
	border-color: rgba(214, 129, 25, 0.701);
}
</style>
