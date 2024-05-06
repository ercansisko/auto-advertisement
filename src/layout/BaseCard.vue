<template>
	<div class="base-card">
		<slot></slot>
	</div>
</template>
<style scoped>
.base-card {
	padding: 1rem;
	border: 1px solid rgba(182, 166, 166, 0.178);
	border-radius: 0.5rem;
	box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.119);
}
</style>
