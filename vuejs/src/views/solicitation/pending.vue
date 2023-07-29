<script>

import {computed, ref} from 'vue';
import appConfig from "../../../app.config.json";
import Layout from "@/layouts/main";
import PageHeader from "@/components/page-header";
import {BCol, BRow} from "bootstrap-vue-3";
import TableLists from '@/components/table-lists'
import Pagination from '@/components/pagination'
import {DELETE_SOLICITATIONS, GET_OPTIONS, GET_PENDING} from "@/state/actions-type";
import {Forbidden, getModalValues, startLoading, formatMoney, moneyToFloat} from "@/components/composables/functions";
import Swal from "sweetalert2";
import http from "@/http";
import store from "@/state/store";

export default {
    page: {
        title: "Solicitações Pendentes",
        meta: [{name: "description", content: appConfig.description}],
    },
    components: {
        BCol,
        BRow,
        Layout,
        PageHeader,
        TableLists,
        Pagination,
    },

    setup() {
        store.dispatch('pendingModule/' + GET_PENDING);
        store.dispatch('categoriesModule/' + GET_OPTIONS);

        const objs = ref([{
            value: '',
            category: ''
        }])

        const resetModal = () => {
            document.getElementById('form').classList.remove('was-validated');
            document.getElementById('form').reset();
            document.getElementById('id').value = 0;
        }

        const childComponentRef = ref(null);

        const getView = async (id) => {
            childComponentRef.value.modalShow();
            startLoading('form', 'save');
            await http.get('usuarios/dados/' + id, {
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
                    store.dispatch('pendingModule/' + DELETE_SOLICITATIONS, id);
                }
            });
        }

        const setObjs = () => {
            objs.value = [];

            const inputs = document.getElementsByClassName('value');
            const selects = document.getElementsByClassName('category');

            for (let i = 0; i < inputs.length; i++) {
                const addObj = {
                    value: inputs[i].value,
                    category: selects[i].value
                }

                objs.value.push(addObj);
            }
        }

        const addObjs = () => {
            setObjs();
            const newObj = {
                value: '',
                category: ''
            };

            objs.value.push(newObj);
        }

        const getTotal = (id) => {
            if (id) formatMoney(id);
            let total = 0;
            const inputs = document.getElementsByClassName('value');

            for (let i = 0; i < inputs.length; i++) {
                const float = moneyToFloat(inputs[i].value);
                if (float) total += float;
            }
            document.getElementById('valueTotal').value = total.toFixed(2);
            console.log(total * 100)
            formatMoney('valueTotal');
        }

        const deleteSolicitation = (index) => {
            setObjs();
            const elementToRemove = document.getElementById('row' + index);
            if (elementToRemove) {
                elementToRemove.parentNode.removeChild(elementToRemove);
            }
            objs.value = objs.value.filter((element, newIndex) => index !== newIndex);

            let total = 0;
            objs.value.forEach((element) => {
                const float = moneyToFloat(element.value);
                if (float) total += float;
            })

            document.getElementById('valueTotal').value = total.toFixed(2);
            formatMoney('valueTotal');
        }

        return {
            title: "Solicitações Pendentes",
            items: null,
            data: JSON.parse(localStorage.getItem('Pending')),
            users: computed(() => store.state.pendingModule.pending),
            options: computed(() => store.state.categoriesModule.options),
            resetModal,
            getView,
            childComponentRef,
            confirm,
            objs,
            addObjs,
            getTotal,
            deleteSolicitation
        }
    }
}

</script>
<!--eslint-disable no-mixed-spaces-and-tabs-->
<template>
    <Layout>
        <PageHeader :title="title"/>

        <TableLists
            session="Pending"
            title="Solicitação"
            ref="childComponentRef"
            col="2"
            :filter="true"
            @resetModal="resetModal">

            <template v-slot:form-filter>

                <div class="col-md-2 my-1">
                    <input type="text" class="form-control" id="startFilter"
                           placeholder="Dê dd/mm/AAAA">
                </div>
                <div class="col-md-2 my-1">
                    <input type="text" class="form-control" id="endFilter"
                           placeholder="Até dd/mm/AAAA">
                </div>
                <div class="col-md-2 my-1">
                    <select class="form-control form-select" id="categoryFilter" name="category">
                        <option value="">Todas Categorias</option>
                        <option v-for="option in options" :key="option.id" :value="option.id">
                            {{ option.name }}
                        </option>
                    </select>
                </div>
            </template>

            <template v-slot:total>

                <div class="row">
                    <div class="col mt-5">
                        <p>Exibindo de {{ this.users.start }} a {{ this.users.partial }} de
                            {{ this.users.total }} registros</p>
                    </div>
                </div>

            </template>

            <template v-slot:t-head>

                <th>Nome</th>
                <th class="text-center">E-mail</th>
                <th class="text-center">Categoria</th>
                <th class="text-center">Ações</th>

            </template>

            <template v-slot:t-body>

                <tbody v-if="this.users.message.length > 0">
                <tr v-for="line in  this.users.message" :key="line.id" :id="'line' +  line.id ">
                    <td>{{ line.name }}</td>
                    <td class="text-center">{{ line.email }}</td>
                    <td class="text-center">{{ line.category == 1 ? 'Gestor' : 'Funcionario' }}</td>
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

                <tbody v-else-if="this.users.total === 0">
                <tr>
                    <td colspan="5" class="text-center">Nenhum resultado encontrado</td>
                </tr>
                </tbody>

            </template>

            <template v-slot:pagination>

                <Pagination :total="users.total"
                            :index="this.data.paramns.index"
                            :limit="this.data.paramns.limit"
                            session="Pending"
                >
                </Pagination>

            </template>


            <template v-slot:form-modal>

                <form action="javascript:void(0);" id="form" novalidate>
                    <b-row class="mb-3" v-for="(obj, index) in objs" :key="'row' + index">
                        <input type="hidden" id="id" name="id" value="0">
                        <b-col md="6">
                            <label for="category" class="form-label">Categoria <span
                                class="text-danger">*</span></label>
                            <select class="form-control form-select category" id="category" name="category[]" required>
                                <option value="">Selecione</option>
                                <option v-for="option in options" :key="option.id" :value="option.id">
                                    {{ option.name }}
                                </option>
                            </select>
                        </b-col>
                        <b-col md="6">
                            <label for="category" class="form-label w-100">Valor
                                <span class="text-danger">
                                    <span>*</span>
                                    <i class="bx bx-trash fs-14 pointer text-end" style="float: right" title="Excluir"
                                        @click="deleteSolicitation(index)"></i>
                                </span>
                            </label>
                            <input :id="'value' + index" name="value[]" class="form-control value" :value="obj.value" type="text"
                                   placeholder="R$ 0,00" required @keyup="getTotal('value' + index)">
                        </b-col>

                    </b-row>
                    <b-row>
                        <b-col md="7"></b-col>
                        <b-col md="5">
                            <label for="category" class="form-label">Valor Total <span
                                class="text-danger">*</span></label>
                            <input id="valueTotal" name="valueTotal" class="form-control" type="text"
                                   placeholder="R$ 0,00"  required readonly>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col xl="12" class="text-center mt-4 fs-24">
                            <i class=" bx bx-plus-circle pointer" @click="addObjs()"></i>
                        </b-col>
                    </b-row>
                </form>

            </template>


        </TableLists>

    </Layout>

</template>