<script>
export default {
    props: ['idProps']
}

</script>

<template>
    <div class="row">
        <div class="col-12 text-center mt-3">
            <span class="spinner spinner-border spinner-card flex-shrink-0" :id="this.idProps" role="status"
                  style="height: 5rem; width: 5rem; position: absolute">
                <span class="visually-hidden"></span>
            </span>
        </div>
    </div>
</template>