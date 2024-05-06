import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

export default {
	namespaced: true,
	state() {
		return {
			features: {},
			brands: [],
			models: [],
			isLoading: false,
			carList: [],
			carImages: [],
			car: {},
			totalCarCount: null,
			isLoadingCars: false,
			isLoadingCar: false,
			isLoadingBrands: false,
			isLoadingModels: false,
			isLoadingCarImages: false,
			isAuth: false,
		};
	},
	getters,
	mutations,
	actions,
};
