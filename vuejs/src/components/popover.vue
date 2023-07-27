<script>
import store from "@/state/store";
import {computed, onMounted, ref} from 'vue';

export default {
    props: [
        'name', 'background', 'id'
    ],
    setup(props) {
        const arrStatus = computed(() => store.state.leadStatusModule.statusBySector);
        const arr = ref({});


        onMounted(() => {
            setTimeout(() => {
                arr.value = arrStatus.value.filter((element) => element.name != props.name);
            }, 200)
        })

        const updateStatus = (status) => {
            const formData = {
                id: props.id,
                status
            }
            store.dispatch('leadsModule/UPDATE_STATUS', formData);
        }

        return {
            arr,
            updateStatus
        }
    }
}

</script>

<template>
    <b-button :style="{backgroundColor: this.background, borderColor: this.background }"
              :id="'popover' + this.id">
        {{ this.name }}
    </b-button>
    <b-popover :target="'popover' + this.id" triggers="focus" html placement="top">
        <template #title>Clique na opção e altere o Status</template>
        <a v-for="item in arr" :key="item.id" :style="{backgroundColor: item.color}"
           class="btn btn-sm m-1 text-white-75" @click="updateStatus(item.id)">{{ item.name }}</a>
    </b-popover>
</template>