<template>
	<nav>
		<ul>
			<li class="logo-container">
				<router-link to="/">
					<img src="../../public/logo.png" class="logo" alt="" />
				</router-link>
			</li>
			<li class="search-item">
				<input type="text" placeholder="Search" />
				<button class="search-btn"><search-icon></search-icon></button>
			</li>
			<li class="nav-links">
				<router-link to="/"> Home </router-link>
				<router-link to="/"> About Us </router-link>
				<router-link v-if="isAuth" to="/add"> Add </router-link>
				<router-link to="/login"> Login </router-link>
			</li>
		</ul>
	</nav>
</template>
<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const isAuth = computed(() => store.getters["cars/getIsAuth"]);
</script>
<style scoped>
nav {
	background-color: rgba(214, 129, 25, 0.701);
	border: none;
	border-bottom-left-radius: 0.5rem;
	border-bottom-right-radius: 0.5rem;
}

.logo {
	width: 4rem;
}
ul {
	list-style-type: none;
	display: flex;
	justify-content: space-between;
	margin: 0;
	padding: 0 1rem;
	align-items: center;
}
.search-item {
	display: flex;
	gap: 0.25rem;
	min-width: 20rem;
}
.search-item input[type="text"] {
	border: none;
	outline: none;
	border-radius: 0.25rem;
	padding: 0.5rem;
	line-height: 1;
	display: inline-block;
	width: 100%;
}
.search-btn {
	border: none;
	border-radius: 0.25rem;
	background-color: white;
}
.nav-links {
	display: flex;
	gap: 1rem;
}
.nav-links a {
	text-decoration: none;
	color: black;
}
.nav-links a:hover {
	transform: scale(1.1);
}
img:hover {
	transform: scale(1.1);
}
</style>
