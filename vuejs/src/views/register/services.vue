<script>

import {computed, ref} from 'vue';
import appConfig from "../../../app.config.json";
import Layout from "@/layouts/main";
import PageHeader from "@/components/page-header";
import {BCol, BRow} from "bootstrap-vue-3";
import TableLists from '@/components/table-lists'
import ChangeStatus from "@/components/change-status";
import Pagination from '@/components/pagination'
import {DELETE_SERVICES, GET_ACTIVITIES_ALL, GET_SERVICES} from "@/state/actions-type";
import {Forbidden, formatMoney, getModalValues, startLoading} from "@/components/composables/functions";
import Swal from "sweetalert2";
import http from "@/http";
import store from "@/state/store";

export default {
    page: {
        title: "Serviços",
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
        store.dispatch('servicesModule/' + GET_SERVICES);
        store.dispatch('activitiesModule/' + GET_ACTIVITIES_ALL);

        const resetModal = () => {
            document.getElementById('form').classList.remove('was-validated');
            document.getElementById('form').reset();
            document.getElementById('serviceId').value = 0;
            const form = document.getElementById('form');
            const check = form.getElementsByClassName('form-check-input');
            for (let i=0; i < check.length; i++) {
                check[i].checked = false;
            }
        }

        const childComponentRef = ref(null);

        const getView = async (id) => {
            childComponentRef.value.modalShow();
            startLoading('form', 'save');
            await http.get('servicos/' + id, {
                headers: {'x-auth': ` Bearer ${localStorage.getItem('jwt')} `}
            })
                .then(response => {
                    getModalValues(response.data.message, 'form', 'save');
                    const ac = response.data.message.activities;
                    ac.forEach(element => document.getElementById('activity' + element).checked = true);
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
                    store.dispatch('servicesModule/' + DELETE_SERVICES, id);
                }
            });
        }

        return {
            title: "Serviços",
            items: null,
            data: JSON.parse(localStorage.getItem('Services')),
            services: computed(() => store.state.servicesModule.services),
            activities: computed(() => store.state.activitiesModule.activitiesAll),
            resetModal,
            store,
            getView,
            childComponentRef,
            confirm,
            formatMoney
        }
    }
}

</script>
<!--eslint-disable no-mixed-spaces-and-tabs-->
<template>
    <Layout>
        <PageHeader :title="title"/>

        <TableLists
            session="Services"
            title="Serviço"
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
                        <p>Exibindo de {{ this.services.start }} a {{ this.services.partial }} de
                            {{ this.services.total }} registros</p>
                    </div>
                </div>

            </template>

            <template v-slot:t-head>

                <th>Nome</th>
                <th class="text-center">Valor Fixo</th>
                <th class="text-center">Valor Unitário</th>
                <th class="text-center">Status</th>
                <th class="text-center">Ações</th>

            </template>

            <template v-slot:t-body>

                <tbody v-if="this.services.message.length > 0">
                <tr v-for="line in  this.services.message" :key="line.id" :id="'line' +  line.id "
                    style="position: relative">
                    <td>{{ line.name }}</td>
                    <td class="text-center">{{ line.value }}</td>
                    <td class="text-center">{{ line.valueFixed }}</td>
                    <ChangeStatus :id="line.id"
                                  url="servicos/novo-status/"
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

                <tbody v-else-if="this.services.total === 0">
                <tr>
                    <td colspan="5" class="text-center">Nenhum resultado encontrado</td>
                </tr>
                </tbody>

            </template>

            <template v-slot:pagination>

                <Pagination :total="services.total"
                            :index="this.data.paramns.index"
                            :limit="this.data.paramns.limit"
                            session="Services"
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
                            <input type="hidden" name="serviceId" id="serviceId" value="0">
                        </b-col>
                        <b-col xl="6">
                            <label for="valueFixed">Valor Fixo </label>
                            <input id="valueFixed" name="valueFixed" class="form-control" type="text"
                                   placeholder="Valor Fixo" @keyup="formatMoney('valueFixed')">
                        </b-col>
                    </b-row>
                    <b-row class="g-3 mt-1">
                        <b-col md="6">
                            <label for="value">Valor Unit. <span class="text-danger">*</span> </label>
                            <input id="value" name="value" class="form-control" type="text"
                                   placeholder="Valor Unit." required @keyup="formatMoney('value')">
                        </b-col>
                        <b-col md="6">
                            <label for="unit">Unidade <span class="text-danger">*</span> </label>
                            <select id="unit" name="unit" class="form-control form-select" required>
                                <option value="">Selecionar</option>
                                <option value="1">Documento</option>
                                <option value="2">Vida</option>
                                <option value="3">Cargo</option>
                                <option value="4">Posto</option>
                            </select>
                        </b-col>
                        <b-col md="6">
                            <label for="term">Prazo <span class="text-danger">*</span> </label>
                            <input id="term" name="term" class="form-control" type="number"
                                   placeholder="Prazo" required min="1">
                        </b-col>
                        <b-col md="6">
                            <label for="period">Unidade <span class="text-danger">*</span> </label>
                            <select id="period" name="period" class="form-control form-select" required>
                                <option value="">Selecionar</option>
                                <option value="1">Hora(s)</option>
                                <option value="2">Dia(s)</option>
                                <option value="3">Mês(es)</option>
                            </select>
                        </b-col>
                        <b-col xl="12">
                            <label>Atividades</label>
                        </b-col>
                        <b-col v-if="activities.length > 0" xl="12" class="custom-scrollbar mt-0" style="overflow-y: auto;max-height: 200px">
                            <div v-for="activity in activities" :key="activity.id" class="form-check mb-2">
                                <input class="form-check-input" :value="activity.id" name="activities[]" type="checkbox"
                                       :id="'activity' + activity.id">
                                <label class="form-check-label" :for="'activity' + activity.id">
                                    {{ activity.name }}
                                </label>
                            </div>
                        </b-col>
                        <b-col v-else>
                            <p>Nenhuma atividade cadastrada</p>
                        </b-col>
                    </b-row>
                </form>

            </template>


        </TableLists>

    </Layout>

</template>