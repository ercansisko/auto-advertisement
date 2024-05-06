<template>
	<div class="container px-0">
		<the-nav></the-nav>
		<router-view></router-view>
	</div>
</template>
<script>
import { useStore } from "vuex";
import TheNav from "./components/TheNav.vue";
export default {
	components: { TheNav },
	setup() {
		const store = useStore();
		store.dispatch("cars/fetchFeatures");
		store.dispatch("cars/fetchBrands");
	},
};
</script>
<style>
body {
	margin: 0;
	padding: 0;
	font-size: 12px;
	box-sizing: border-box;
}
body button,
body input {
	font-size: 14px;
}
</style>
