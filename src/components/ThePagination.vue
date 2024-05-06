<template>
	<base-card class="mt-5 py-4">
		<p class="text-center fw-200">
			Toplam {{ pageCount }} sayfa içerisinde {{ activePage }}. sayfayı
			görmektesiniz.
		</p>
		<div class="d-flex gap-1 justify-content-center align-items-center">
			<button v-if="activePage > 1" @click="prevPage">Önceki</button>
			<button
				:disabled="n === null"
				v-for="n in pageArr"
				@click="setSearchQuery(n)"
				:key="n"
				:class="{ active: activePage === n }"
			>
				{{ n === null ? "..." : n }}
			</button>
			<button v-if="activePage < pageCount" @click="nextPage">Sonraki</button>
		</div>
	</base-card>
</template>
<script setup>
import { computed, defineProps, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const LEFT_RIGHT = 2;
const props = defineProps(["pageCount"]);
const pageCount = computed(() => props.pageCount);
const activePage = computed(() => Number(route.query.pageNum) || 1);
const pageArr = ref();
watch(
	pageCount,
	() => {
		let arr = [];
		if (activePage.value - LEFT_RIGHT < 3) {
			if (pageCount.value > 6) {
				for (let i = 1; i <= 5; i++) {
					arr.push(i);
				}
				arr.push(null);
				for (let i = 5; i <= pageCount.value; i += 5) {
					if (i === 5) continue;
					arr.push(i);
				}
				if (pageCount.value < 10) arr.push(pageCount.value);
			} else {
				for (let i = 1; i <= pageCount.value; i++) {
					arr.push(i);
				}
			}
		} else if (activePage.value + LEFT_RIGHT > pageCount.value - 1) {
			if (pageCount.value > 6) {
				for (let i = pageCount.value; i > pageCount.value - 5; i--)
					arr.unshift(i);
				arr.unshift(null);
				for (let i = pageCount.value - 5; i >= 1; i--) {
					if (i % 5 !== 0) continue;
					arr.unshift(i);
				}
				arr.unshift(1);
			} else {
				for (let i = pageCount.value; i > pageCount.value - 5; i--)
					arr.unshift(i);
			}
		} else {
			for (let i = 1; i < activePage.value - 3; i++) {
				if (i % 5 !== 0 && i !== 1) continue;
				arr.push(i);
			}
			arr.push(null);
			arr.push(activePage.value - 2);
			arr.push(activePage.value - 1);
			arr.push(activePage.value);
			arr.push(activePage.value + 1);
			arr.push(activePage.value + 2);
			if (activePage.value + 3 !== pageCount.value) arr.push(null);
			for (let i = activePage.value + 3; i <= pageCount.value; i++) {
				if (i % 5 !== 0 && i !== pageCount.value) continue;
				arr.push(i);
			}
		}
		pageArr.value = [...arr];
	},
	{ immediate: true }
);

watch(activePage, (a) => {
	let arr = [];
	if (a - LEFT_RIGHT < 3) {
		if (pageCount.value > 6) {
			for (let i = 1; i <= 5; i++) {
				arr.push(i);
			}
			arr.push(null);
			for (let i = 5; i <= pageCount.value; i += 5) {
				if (i === 5) continue;
				arr.push(i);
			}
			if (pageCount.value < 10) arr.push(pageCount.value);
		} else {
			for (let i = 1; i <= pageCount.value; i++) {
				arr.push(i);
			}
		}
	} else if (a + LEFT_RIGHT > pageCount.value - 1) {
		if (pageCount.value > 6) {
			for (let i = pageCount.value; i > pageCount.value - 5; i--)
				arr.unshift(i);
			arr.unshift(null);
			for (let i = pageCount.value - 5; i >= 1; i--) {
				if (i % 5 !== 0) continue;
				arr.unshift(i);
			}
			arr.unshift(1);
		} else {
			for (let i = pageCount.value; i > pageCount.value - 5; i--)
				arr.unshift(i);
		}
	} else {
		for (let i = 1; i < a - 3; i++) {
			if (i % 5 !== 0 && i !== 1) continue;
			arr.push(i);
		}
		arr.push(null);
		arr.push(a - 2);
		arr.push(a - 1);
		arr.push(a);
		arr.push(a + 1);
		arr.push(a + 2);
		if (a + 3 !== pageCount.value) arr.push(null);
		for (let i = a + 3; i <= pageCount.value; i++) {
			if (i % 5 !== 0 && i !== pageCount.value) continue;
			arr.push(i);
		}
	}
	pageArr.value = [...arr];
});
const router = useRouter();

function setSearchQuery(x) {
	router.push({ query: { ...route.query, pageNum: x } });
}
function nextPage() {
	router.push({ query: { ...route.query, pageNum: activePage.value + 1 } });
	console.log(router);
}
function prevPage() {
	router.push({ query: { ...route.query, pageNum: activePage.value - 1 } });
}
</script>
<style scoped>
.fw-200 {
	font-weight: 200;
}
button {
	border: 1px solid rgba(214, 129, 25, 0.701);
	color: rgb(214, 129, 25);
	background-color: white;
	border-radius: 0.2rem;
	padding: 0.4rem 0.6rem;
	line-height: 1;
	min-width: 2rem;
}
button.active {
	background-color: rgb(214, 129, 25) !important;
	color: white !important;
}
button:hover {
	transform: scale(1.1);
	background-color: rgba(214, 129, 25, 0.13);
}
</style>
