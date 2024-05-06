import { supabase } from "@/utils/supabase";

export default {
	async fetchFeatures(context) {
		context.commit("setLoading", true);
		// const { data: category_id } = await supabase.from("category").select("*");
		const { data: cekis_id } = await supabase.from("cekis").select("*");
		const { data: color_id } = await supabase.from("color").select("*");
		const { data: door_id } = await supabase.from("door").select("*");
		const { data: fuel_id } = await supabase.from("fuel").select("*");
		const { data: garanti_id } = await supabase.from("garanti").select("*");
		const { data: gear_id } = await supabase.from("gear").select("*");
		const { data: kasa_id } = await supabase.from("kasa").select("*");
		// const { data: brand_id } = await supabase.from("brand").select("*");
		// const { data: model_id } = await supabase.from("model").select("*");
		context.commit("setLoading", false);
		const payload = {
			// category_id,
			// brand_id,
			// model_id,
			cekis_id,
			color_id,
			door_id,
			fuel_id,
			garanti_id,
			gear_id,
			kasa_id,
		};
		context.commit("setFeatures", payload);
	},
	async fetchCarList(context) {
		context.commit("setLoadingCars", true);
		const { data: carList } = await supabase.from("car").select("*");
		context.commit("setLoadingCars", false);
		context.commit("setCarList", carList);
	},
	async fetchCar(context, payload) {
		context.commit("setLoadingCar", true);
		const { data: car } = await supabase
			.from("car")
			.select("*")
			.eq("id", payload)
			.single();
		context.commit("setLoadingCar", false);
		context.commit("setCar", car);
	},
	async fetchBrands(context) {
		context.commit("setLoadingBrands", true);
		const { data: brands } = await supabase.from("brand").select("*");
		context.commit("setLoadingBrands", false);
		context.commit("setBrands", brands);
	},
	async fetchModels(context, payload) {
		context.commit("setLoadingModels", true);
		const { data: models } = await supabase
			.from("model")
			.select("*")
			.in("brand_id", payload);
		context.commit("setLoadingModels", false);
		context.commit("setModels", models);
	},
	async fetchFilteredCarList(context, payload) {
		context.commit("setLoadingCars", true);
		const { data: carList, count } = await payload;
		context.commit("setTotalCarCount", count);
		context.commit("setLoadingCars", false);
		context.commit("setCarList", carList);
	},
	async fetchCarImages(context, payload) {
		context.commit("setLoadingCarImages", true);
		const { data: carImages } = await supabase
			.from("store")
			.select("*")
			.eq("car_id", payload);
		context.commit("setLoadingCarImages", false);
		context.commit("setCarImages", carImages);
	},
	setIsAuthAct(context, payload) {
		context.commit("setIsAuth", payload);
	},
};
