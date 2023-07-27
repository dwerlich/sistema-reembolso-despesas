<script>

import {computed, ref} from 'vue';
import appConfig from "../../../app.config.json";
import Layout from "@/layouts/main";
import PageHeader from "@/components/page-header";
import {BCol, BRow} from "bootstrap-vue-3";
import TableLists from '@/components/table-lists'
import ChangeStatus from "@/components/change-status";
import Pagination from '@/components/pagination'
import {GET_EQUIPAMENTS} from "@/state/actions-type";
import {endLoading, Forbidden, startLoading} from "@/components/composables/functions";
import {DELETE_EQUIPAMENTS} from "@/state/actions-type";
import Swal from "sweetalert2";
import http from "@/http";
import store from "@/state/store";

export default {
    page: {
        title: "Equipamentos",
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
        store.dispatch('equipamentsModule/' + GET_EQUIPAMENTS);

        const resetModal = () => {
            document.getElementById('form').classList.remove('was-validated');
            document.getElementById('form').reset();
            document.getElementById('equipamentId').value = 0;
        }

        const childComponentRef = ref(null);

        const getView = async (id) => {
            childComponentRef.value.modalShow();
            startLoading('form', 'save');
            await http.get('equipamentos/' + id, {
                headers: {'x-auth': ` Bearer ${localStorage.getItem('jwt')} `}
            })
                .then(response => {
                    const data = response.data.message;
                    const keys = Object.keys(data);

                    for (let i = 0; i < keys.length; i++) {
                        const input = document.getElementById(keys[i]);
                        if (input && data[keys[i]] != '' && keys[i] !== 'doc') input.value = data[keys[i]];
                    }
                    endLoading('form', 'save');
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
                    store.dispatch('equipamentsModule/' + DELETE_EQUIPAMENTS, id);
                }
            });
        }

        return {
            title: "Equipamentos",
            items: null,
            data: JSON.parse(localStorage.getItem('Equipaments')),
            equipaments: computed(() => store.state.equipamentsModule.equipaments),
            columns: 6,
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
            session="Equipaments"
            title="Equipamento"
            ref="childComponentRef"
            @resetModal="resetModal">

            <template v-slot:form-filter>

                <div class="col-md-3 my-1">
                    <input type="text" class="form-control" id="nameFilter"
                           placeholder="Equipamento">
                </div>

            </template>

            <template v-slot:total>

                <div class="row">
                    <div class="col mt-5">
                        <p>Exibindo de {{ this.equipaments.start }} a {{ this.equipaments.partial }} de
                            {{ this.equipaments.total }} registros</p>
                    </div>
                </div>

            </template>

            <template v-slot:t-head>

                <th>Equipamento</th>
                <th class="text-center">Anexo</th>
                <th class="text-center">Status</th>
                <th class="text-center">Ações</th>

            </template>

            <template v-slot:t-body>

                <tbody v-if="this.equipaments.message.length > 0">
                <tr v-for="line in  this.equipaments.message" :key="line.id" :id="'line' +  line.id ">
                    <td>{{ line.name }}</td>
                    <td class="text-center">
                        <a target="_blank" :href="'http://localhost/geind-fluxo-de-caixa/uploads/' + line.doc">
                            <b-badge class="pointer fs-12" :id="'badge' + id" variant="info">
                                Anexo
                            </b-badge>
                        </a>
                    </td>
                    <ChangeStatus :id="line.id"
                                  :url="'equipamentos/novo-status/'"
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

                <tbody v-else-if="this.equipaments.total === 0">
                <tr>
                    <td :colspan="columns" class="text-center">Nenhum resultado encontrado</td>
                </tr>
                </tbody>

            </template>

            <template v-slot:pagination>

                <Pagination :total="equipaments.total"
                            :index="this.data.paramns.index"
                            :limit="this.data.paramns.limit"
                            session="Equipaments"
                >
                </Pagination>

            </template>


            <template v-slot:form-modal>

                <form action="javascript:void(0);" id="form" novalidate>
                    <input type="hidden" name="equipamentId" id="equipamentId" value="0">
                    <b-row class="g-3">
                        <b-col xl="12">
                            <label for="name">Equipamento <span class="text-danger">*</span></label>
                            <input id="name" name="name" placeholder="Equipamento" type="text" class="form-control"
                                   required>
                        </b-col>
                        <b-col md="6">
                            <label for="brand">Marca <span class="text-danger">*</span></label>
                            <input id="brand" name="brand" placeholder="Marca" type="text" class="form-control"
                                   required>
                        </b-col>
                        <b-col md="6">
                            <label for="model">Modelo <span class="text-danger">*</span></label>
                            <input id="model" name="model" placeholder="Modelo" type="text" class="form-control"
                                   required>
                        </b-col>
                        <b-col md="6">
                            <label for="serial">Serial <span class="text-danger">*</span></label>
                            <input id="serial" name="serial" placeholder="Serial" type="text" class="form-control"
                                   required>
                        </b-col>
                        <b-col md="6">
                            <label for="date">Data de Calibração <span class="text-danger">*</span></label>
                            <input id="date" name="date" placeholder="dd/mm/AAAA" type="text"
                                   class="form-control" required data-mask="99/99/9999">
                        </b-col>
                        <b-col md="6">
                            <label for="validity">Duração da Calibração <span class="text-danger">*</span></label>
                            <select id="validity" name="validity" class="form-control form-select" required>
                                <option value="">Selecione</option>
                                <option value="1">1 Ano</option>
                                <option value="2">2 Anos</option>
                                <option value="3">3 Anos</option>
                            </select>
                        </b-col>
                        <b-col md="6">
                            <label for="certificate">Nº Certificado de Calibração <span
                                class="text-danger">*</span></label>
                            <input id="certificate" name="certificate" placeholder="Certificado de Calibração"
                                   type="text"
                                   class="form-control" required>
                        </b-col>
                        <b-col md="8" id="inputDiv">
                            <label>Anexar Documento</label>
                            <input class="upload-file-selector" id="doc" type="file" name="doc">
                        </b-col>
                        <b-col md="8" id="documentDiv">
                            <a target="_blank" id="link"><i class="fa fa-file-pdf-o fa-2x pointer"></i></a>
                            <i class="fa fa-trash text-danger m-l-20" title="Excluir Documento"
                               onclick="showInput()"></i>
                        </b-col>
                    </b-row>
                </form>

            </template>


        </TableLists>

    </Layout>

</template>