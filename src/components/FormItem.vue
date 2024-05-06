<template>
	<div class="form-item" :class="propClass">
		<slot></slot>
	</div>
</template>
<script>
export default {
	props: ["layout"],
	setup(props) {
		return { propClass: props.layout };
	},
};
</script>
<style scoped>
.form-item {
	padding: 0.25rem 0.5rem;
	margin: 1rem 0;
	display: flex;

	gap: 0.5rem;
}
.vertical {
	flex-direction: column;
	align-items: flex-start;
}
.horizontal {
	flex-direction: row;
	justify-content: space-between;
}
</style>
