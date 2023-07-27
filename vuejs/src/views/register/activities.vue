<script>

import {computed, ref} from 'vue';
import appConfig from "../../../app.config.json";
import Layout from "@/layouts/main";
import PageHeader from "@/components/page-header";
import {BCol, BRow} from "bootstrap-vue-3";
import TableLists from '@/components/table-lists'
import ChangeStatus from "@/components/change-status";
import Pagination from '@/components/pagination'
import {GET_ACTIVITIES, DELETE_ACTIVITIES} from "@/state/actions-type";
import {Forbidden, getModalValues, opacityByTag, startLoading} from "@/components/composables/functions";
import Swal from "sweetalert2";
import http from "@/http";
import store from "@/state/store";

export default {
    page: {
        title: "Atividades",
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
        store.dispatch('activitiesModule/' + GET_ACTIVITIES);

        const resetModal = () => {
            document.getElementById('form').classList.remove('was-validated');
            document.getElementById('form').reset();
            document.getElementById('activityId').value = 0;
        }

        const childComponentRef = ref(null);

        const getView = async (id) => {
            childComponentRef.value.modalShow();
            startLoading('form', 'save');
            await http.get('atividades/' + id, {
                headers: {'x-auth': ` Bearer ${localStorage.getItem('jwt')} `}
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
                    opacityByTag('table', 'td', '.2', 'spinnerTable', 'block');
                    store.dispatch('activitiesModule/' + DELETE_ACTIVITIES, id);
                }
            });
        }

        return {
            title: "Atividades",
            data: JSON.parse(localStorage.getItem('Activities')),
            activities: computed(() => store.state.activitiesModule.activities),
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
            session="Activities"
            title="Atividade"
            ref="childComponentRef"
            @resetModal="resetModal">

            <template v-slot:form-filter>

                <div class="col-md-3 my-1">
                    <input type="text" class="form-control" id="nameFilter"
                           placeholder="Nome">
                </div>

            </template>

            <template v-slot:total>

                <div class="row">
                    <div class="col mt-5">
                        <p>Exibindo de {{ this.activities.start }} a {{ this.activities.partial }} de
                            {{ this.activities.total }} registros</p>
                    </div>
                </div>

            </template>

            <template v-slot:t-head>

                <th>Nome</th>
                <th class="text-center">Unidade</th>
                <th class="text-center">Tempo Estimado</th>
                <th class="text-center">Status</th>
                <th class="text-center">Ações</th>

            </template>

            <template v-slot:t-body>

                <tbody v-if="this.activities.message.length > 0">
                <tr v-for="line in  this.activities.message" :key="line.id" :id="'line' +  line.id ">
                    <td>{{ line.name }}</td>
                    <td class="text-center">{{ line.unit }}</td>
                    <td class="text-center">{{ line.duration }}</td>
                    <ChangeStatus :id="line.id"
                                  :url="'atividades/novo-status/'"
                                  :text="line.active == 1 ? 'Ativo' : 'Inativo'"
                                  :variant="line.active == 1 ? 'success' : 'danger'"/>

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

                <tbody v-else-if="this.activities.total === 0">
                <tr>
                    <td colspan="5" class="text-center">Nenhum resultado encontrado</td>
                </tr>
                </tbody>

            </template>

            <template v-slot:pagination>

                <Pagination :total="activities.total"
                            :index="this.data.paramns.index"
                            :limit="this.data.paramns.limit"
                            session="Activities"
                >
                </Pagination>

            </template>


            <template v-slot:form-modal>

                <form action="javascript:void(0);" id="form" novalidate>
                    <b-row class="g-3">
                            <b-col xl="12">
                                <label for="name">Nome <span class="text-danger">*</span> </label>
                                <input id="name" name="name" class="form-control" type="text" placeholder="Nome"
                                       required>
                                <input type="hidden" id="activityId" name="activityId" value="0">
                            </b-col>
                            <b-col md="6">
                                <label for="duration">Tempo Estimado <span class="text-danger">*</span> </label>
                                <input id="duration" name="duration" class="form-control" type="text"
                                       placeholder="HH:mm" data-mask="99:99" required>
                            </b-col>
                            <b-col md="6">
                                <label for="unit">Unidade <span class="text-danger">*</span> </label>
                                <select id="unit" name="unit" class="form-select" required>
                                    <option value="">Selecione</option>
                                    <option value="1">Documento</option>
                                    <option value="2">Vida</option>
                                    <option value="3">Cargo</option>
                                    <option value="4">Posto</option>
                                </select>
                            </b-col>
                    </b-row>
                </form>

            </template>


        </TableLists>

    </Layout>

</template>