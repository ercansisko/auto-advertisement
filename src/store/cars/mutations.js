export default {
	setFeatures(state, payload) {
		state.features = { ...payload };
	},
	setBrands(state, payload) {
		state.brands = [...payload];
	},
	setModels(state, payload) {
		state.models = [...payload];
	},
	setLoading(state, payload) {
		state.isLoading = payload;
	},
	setCarList(state, payload) {
		state.carList = [...payload];
	},
	setCar(state, payload) {
		state.car = { ...payload };
	},
	setCarImages(state, payload) {
		state.carImages = [...payload];
	},
	setLoadingCars(state, payload) {
		state.isLoadingCars = payload;
	},
	setLoadingCar(state, payload) {
		state.isLoadingCar = payload;
	},
	setLoadingBrands(state, payload) {
		state.isLoadingBrands = payload;
	},
	setLoadingModels(state, payload) {
		state.isLoadingModels = payload;
	},
	setLoadingCarImages(state, payload) {
		state.isLoadingCarImages = payload;
	},
	setTotalCarCount(state, payload) {
		state.totalCarCount = payload;
	},
	setIsAuth(state, payload) {
		state.isAuth = payload;
	},
};
