
const isLoadings = () => (
	<template>
	<v-alert :value="true" color="error" icon="fa-refresh fa-pulse fa-3x fa-fw">
		Maaf, Data Tidak Di Temukan <i class="em em-cry"></i>
	</v-alert>
	</template>
	);
export default isLoadings;