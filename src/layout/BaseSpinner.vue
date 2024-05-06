<template>
  <div class="spinner">
    <div class="spinner-inner"></div>
  </div>
</template>

<style>
.spinner {
  position: relative;
  width: 64px;
  height: 64px;
}

.spinner-inner {
  position: absolute;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 6px solid #ccc;
  border-top-color: #ff6a00;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
