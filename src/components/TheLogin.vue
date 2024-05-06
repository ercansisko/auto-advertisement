<template>
	<div class="d-flex justify-content-center align-items-center">
		<base-card class="w-50 h-50 px-5 mt-5">
			<form
				@submit.prevent="handleSubmit"
				class="mx-5 bg-light my-5 border p-5 rounded-3"
			>
				<h3 class="text-center mt-5 p-0">GİRİŞ</h3>
				<label for="email" class="mt-3">E-mail:</label>
				<input type="text" class="w-100" id="email" v-model="email" />
				<label for="password" class="mt-3">Şifre:</label>
				<input type="text" class="w-100" id="password" v-model="password" />
				<button class="btn btn-success mx-auto d-block mt-4 mb-5">Giriş</button>
			</form>
		</base-card>
	</div>
</template>
<script setup>
/*eslint-disable*/
import { supabase } from "@/utils/supabase";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const email = ref("");
const password = ref("");
const router = useRouter();
const store = useStore();
async function handleSubmit() {
	const { data, error } = await supabase.auth.signInWithPassword({
		email: email.value,
		password: password.value,
	});
	if (error) {
		store.dispatch("cars/setIsAuthAct", false);
		return;
	} else if (data?.user?.aud === "authenticated") {
		store.dispatch("cars/setIsAuthAct", true);
		router.push("/");
	}
}
</script>
<style scoped>
input[type="text"] {
	border: 1px solid rgba(0, 0, 0, 0.295);
	border-radius: 0.3rem;
	padding: 0.5rem;
}
</style>
