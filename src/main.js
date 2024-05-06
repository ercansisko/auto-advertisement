/*eslint-disable*/
import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.css";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.js";
import HomeView from "./components/HomeView.vue";
import { createRouter, createWebHistory } from "vue-router";
import SearchIcon from "./icons/SearchIcon.vue";
import DetailView from "./components/DetailView.vue";
import TheItems from "./components/TheItems.vue";
import MainFilter from "./components/MainFilter.vue";
import BaseCard from "./layout/BaseCard.vue";
import FormItem from "./components/FormItem.vue";
import FilterItem from "./components/FilterItem.vue";
import AddCar from "./components/AddCar.vue";
import { store } from "./store";
import BaseSpinner from "./layout/BaseSpinner.vue";
import ThePagination from "./components/ThePagination.vue";
import TheLogin from "./components/TheLogin.vue";
import LoginIcon from "./icons/LoginIcon.vue";
const app = createApp(App);
const routes = [
	{ path: "/", component: HomeView, name: "home" },
	{ path: "/detail/:id", component: DetailView, name: "detail" },
	{ path: "/add", component: AddCar, name: "add" },
	{ path: "/login", component: TheLogin, name: "login" },
];
const router = createRouter({ history: createWebHistory(), routes });
router.beforeEach((to, from) => {
	const isAuth = store.getters["cars/getIsAuth"];
	console.log(isAuth);
	if (!isAuth && to.name === "add") return { name: "login" };
});
app.use(router);
app.use(store);
app.use(bootstrap);
app.component("base-card", BaseCard);
app.component("search-icon", SearchIcon);
app.component("the-items", TheItems);
app.component("main-filter", MainFilter);
app.component("form-item", FormItem);
app.component("filter-item", FilterItem);
app.component("base-spinner", BaseSpinner);
app.component("the-pagination", ThePagination);
app.component("login-icon", LoginIcon);
app.mount("#app");
