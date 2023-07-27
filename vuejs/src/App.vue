<template>
	<router-view>

	</router-view>
    <notifications position="bottom center" style="bottom: 30px"/>
    <div class="row">
        <div class="col-12 text-center mt-3">
			<span class="spinner spinner-border spinner-card flex-shrink-0" id="spinner" role="status"
                  style="height: 5rem; width: 5rem; display: none">
				<span class="visually-hidden"></span>
			</span>
        </div>
    </div>
</template>
<script>

export default {
	name: 'App',
}
</script>
