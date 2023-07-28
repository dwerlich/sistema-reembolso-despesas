<script>

import {computed, ref} from 'vue';
import appConfig from "../../../app.config.json";
import Layout from "@/layouts/main";
import PageHeader from "@/components/page-header";
import {BCol, BRow} from "bootstrap-vue-3";
import TableLists from '@/components/table-lists'
import Pagination from '@/components/pagination'
import {GET_CATEGORIES} from "@/state/actions-type";
import {Forbidden, getModalValues, startLoading} from "@/components/composables/functions";
import {DELETE_CATEGORIES} from "@/state/actions-type";
import Swal from "sweetalert2";
import http from "@/http";
import store from "@/state/store";
import ChangeStatus from "@/components/change-status.vue";

export default {
    page: {
        title: "Categorias",
        meta: [{name: "description", content: appConfig.description}],
    },
    components: {
        BCol,
        BRow,
        Layout,
        PageHeader,
        TableLists,
        Pagination,
        ChangeStatus
    },

    setup() {
        store.dispatch('categoriesModule/' + GET_CATEGORIES);

        const resetModal = () => {
            document.getElementById('form').classList.remove('was-validated');
            document.getElementById('form').reset();
            document.getElementById('id').value = 0;
        }

        const childComponentRef = ref(null);

        const getView = async (id) => {
            childComponentRef.value.modalShow();
            startLoading('form', 'save');
            await http.get('categorias/dados/' + id, {
                headers: {'Authorization': ` Bearer ${localStorage.getItem('jwt')} `}
            })
                .then(response => {
                    getModalValues(response.data.message, 'form', 'save');
                })
                .catch(errors => {
                    console.error(errors);
                    Forbidden(errors);
                });
        }

        const confirm = (id) => {
            Swal.fire({
                title: "Você tem certeza?",
                text: "Seus dados serão removidos e não poderão mais ser recuperados.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#34c38f",
                cancelButtonColor: "#f46a6a",
                cancelButtonText: "Cancelar",
                confirmButtonText: "Confirmar",
            }).then((result) => {
                if (result.value) {
                    store.dispatch('categoriesModule/' + DELETE_CATEGORIES, id);
                }
            });
        }

        return {
            title: "Categorias",
            data: JSON.parse(localStorage.getItem('Categories')),
            categories: computed(() => store.state.categoriesModule.categories),
            resetModal,
            getView,
            childComponentRef,
            confirm,
        }
    }
}

</script>
<!--eslint-disable no-mixed-spaces-and-tabs-->
<template>
    <Layout>
        <PageHeader :title="title"/>

        <TableLists
            session="Categories"
            title="Categoria"
            ref="childComponentRef"
            col="2"
            :filter="false"
            @resetModal="resetModal">

            <template v-slot:total>

                <div class="row">
                    <div class="col mt-5">
                        <p>Exibindo de {{ this.categories.start }} a {{ this.categories.partial }} de
                            {{ this.categories.total }} registros</p>
                    </div>
                </div>

            </template>

            <template v-slot:t-head>

                <th>Nome</th>
                <th class="text-center">Status</th>
                <th class="text-center">Ações</th>

            </template>

            <template v-slot:t-body>

                <tbody v-if="this.categories.message.length > 0">
                <tr v-for="line in  this.categories.message" :key="line.id" :id="'line' +  line.id ">
                    <td>{{ line.name }}</td>
                    <ChangeStatus :id="line.id"
                                  :url="data.url"
                                  :variant="line.active == 1 ? 'success' : 'danger'"
                                  :text="line.active == 1 ? 'Ativo' : 'Inativo'">
                    </ChangeStatus>
                    <td class="text-center">
                        <i class="bx bx-pencil text-info fs-14 mx-1 pointer" @click="getView(line.id)"
                           title="Editar"></i>
                        <i class="bx bx-trash text-danger fs-14 mx-1 pointer" title="Excluir"
                           @click="confirm(line.id)"></i>
                    </td>
                    <span class="spinner spinner-border spinner-line flex-shrink-0" :id="'spinnerLine' + line.id"
                          role="status">
                        <span class="visually-hidden"></span>
                    </span>
                </tr>
                </tbody>

                <tbody v-else-if="this.categories.total == 0">
                <tr>
                    <td colspan="5" class="text-center">Nenhum resultado encontrado</td>
                </tr>
                </tbody>

            </template>

            <template v-slot:pagination>

                <Pagination :total="categories.total"
                            :index="this.data.paramns.index"
                            :limit="this.data.paramns.limit"
                            session="Categories"
                >
                </Pagination>

            </template>


            <template v-slot:form-modal>

                <form action="javascript:void(0);" id="form" novalidate>
                    <b-row class="g-3">
                        <b-col lg="12">
                            <label for="name" class="form-label">Nome <span class="text-danger">*</span> </label>
                            <input type="text" class="form-control" id="name" name="name"
                                   placeholder="Nome" required/>
                            <input type="hidden" name="id" id="id" value="0">
                        </b-col>
                    </b-row>
                </form>

            </template>


        </TableLists>

    </Layout>

</template>