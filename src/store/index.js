import { createStore } from "vuex";
import carsModule from "./cars/index";
export const store = createStore({
	state() {
		return { init: "initial" };
	},
	modules: { cars: carsModule },
});
