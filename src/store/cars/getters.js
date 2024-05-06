export default {
	getFeatures(state) {
		return state.features;
	},
	getBrands(state) {
		return state.brands;
	},
	getTotalCarCount(state) {
		return state.totalCarCount;
	},
	getModels(state) {
		return state.models;
	},
	getIsLoading(state) {
		return state.isLoading;
	},
	getCarList(state) {
		return state.carList;
	},
	getCar(state) {
		return state.car;
	},
	getCarImages(state) {
		return state.carImages;
	},
	getIsLoadingCars(state) {
		return state.isLoadingCars;
	},
	getIsLoadingCar(state) {
		return state.isLoadingCar;
	},
	getIsLoadingBrands(state) {
		return state.isLoadingBrands;
	},
	getIsLoadingModels(state) {
		return state.isLoadingModels;
	},
	getIsLoadingCarImages(state) {
		return state.isLoadingCarImages;
	},
	getIsAuth(state) {
		return state.isAuth;
	},
};
