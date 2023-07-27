<script>
export default {
    components: {},
    props: {
        title: {
            type: String,
            default: "",
        },
        items: {
            type: Array,
            default: () => {
                return [];
            },
        },
    },
};
</script>

<template>
    <b-row>
        <b-col cols="12">
            <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 class="mb-sm-0">{{ title }}</h4>

                <div class="page-title-right">
                    <ol class="breadcrumb m-0">
                        <li class="breadcrumb-item" v-for="(item, index) in items" :key="index"
                            :class="{ active: item[0] }">
                            <b-link v-if="!item.href" href="javascript: void(0);">{{ item.text }}</b-link>
                            <router-link  v-else :to="item.href">
                                <b-link>{{ item.text }}</b-link>
                            </router-link>
                        </li>
                    </ol>
                </div>
            </div>
        </b-col>
    </b-row>
</template>
