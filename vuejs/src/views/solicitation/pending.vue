<script>

import {computed, ref} from 'vue';
import appConfig from "../../../app.config.json";
import Layout from "@/layouts/main";
import PageHeader from "@/components/page-header";
import {BCol, BRow} from "bootstrap-vue-3";
import TableLists from '@/components/table-lists'
import Pagination from '@/components/pagination'
import {DELETE_DETAIL, DELETE_SOLICITATIONS, GET_OPTIONS, GET_PENDING} from "@/state/actions-type";
import {
    Forbidden,
    startLoading,
    formatMoney,
    moneyToFloat,
    endLoading, deleteElement, notifyError
} from "@/components/composables/functions";
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
            id: 0,
            value: '',
            category: ''
        }])

        const resetModal = () => {
            document.getElementById('form').classList.remove('was-validated');
            document.getElementById('form').reset();
            document.getElementById('id').value = 0;
            objs.value = [{
                id: 0,
                value: '',
                category: ''
            }];
        }

        const childComponentRef = ref(null);

        const getView = async (id) => {
            childComponentRef.value.modalShow();
            startLoading('form', 'save');
            await http.get('solicitacao/dados/' + id, {
                headers: {'Authorization': ` Bearer ${localStorage.getItem('jwt')} `}
            })
                .then(response => {
                    const result = response.data.message;
                    objs.value = [];
                    result.details.forEach((element) => objs.value.push(element));
                    document.getElementById('valueTotal').value = result.valueTotal;
                    document.getElementById('id').value = result.id;
                    endLoading('form', 'save');
                })
                .catch(errors => {
                    endLoading('form', 'save');
                    console.error(errors);
                    notifyError(errors.response.data.message);
                    Forbidden(errors);
                });
        }

        const deleteLine = async (id) => {
            const result = await deleteElement();
            if (result.value) {
                store.dispatch('pendingModule/' + DELETE_SOLICITATIONS, id);
            }
        }

        const setObjs = () => {
            objs.value = [];

            const inputs = document.getElementsByClassName('value');
            const selects = document.getElementsByClassName('category');

            for (let i = 0; i < inputs.length; i++) {
                const addObj = {
                    id: 0,
                    value: inputs[i].value,
                    category: selects[i].value
                }

                objs.value.push(addObj);
            }
        }

        const addObjs = () => {
            setObjs();
            const newObj = {
                id: 0,
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

        const deleteSolicitation = async (index, id) => {
            let result = false;
            if (id > 0) result = await store.dispatch('pendingModule/' + DELETE_DETAIL, id);

            console.log(result)

            if (result === true) {
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
        }

        const newStatusSolicitation = (id, type) => {

        }

        const detailsSolicitation = (id) => {

        }

        return {
            title: "Solicitações Pendentes",
            items: null,
            data: JSON.parse(localStorage.getItem('Pending')),
            pendings: computed(() => store.state.pendingModule.pending),
            options: computed(() => store.state.categoriesModule.options),
            resetModal,
            getView,
            childComponentRef,
            deleteLine,
            objs,
            addObjs,
            getTotal,
            deleteSolicitation,
            user: JSON.parse(localStorage.getItem('user')),
            newStatusSolicitation,
            detailsSolicitation
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
                           placeholder="Dê dd/mm/AAAA"  v-maska="'##/##/####'">
                </div>
                <div class="col-md-2 my-1">
                    <input type="text" class="form-control" id="endFilter"
                           placeholder="Até dd/mm/AAAA" v-maska="'##/##/####'">
                </div>
                <div class="col-md-3 my-1">
                    <select class="form-control form-select" id="categoryFilter" name="category">
                        <option value="">Todas Categorias</option>
                        <option v-for="option in options" :key="option.id" :value="option.id">
                            {{ option.name }}
                        </option>
                    </select>
                </div>
                <div v-if="user.category == 1" class="col-md-3 my-1">
                    <select class="form-control form-select" id="userFilter" name="user">
                        <option value="">Todos usuários</option>
                        <option v-for="option in options" :key="option.id" :value="option.id">
                            {{ option.name }}
                        </option>
                    </select>
                </div>
            </template>

            <template v-slot:total>

                <div class="row">
                    <div class="col mt-5">
                        <p>Exibindo de {{ this.pendings.start }} a {{ this.pendings.partial }} de
                            {{ this.pendings.total }} registros</p>
                    </div>
                </div>

            </template>

            <template v-slot:t-head>

                <th>Requerente</th>
                <th class="text-center">Valor Total</th>
                <th class="text-center">Data</th>
                <th class="text-center">Status</th>
                <th class="text-center">Ações</th>

            </template>

            <template v-slot:t-body>

                <tbody v-if="this.pendings.message.length > 0">
                <tr v-for="line in  this.pendings.message" :key="line.id" :id="'line' +  line.id ">
                    <td>{{ line.user_name }}</td>
                    <td class="text-center">{{
                            line.value.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
                        }}
                    </td>
                    <td class="text-center">{{ line.date }}</td>
                    <td class="text-center">
                        <b-badge class="fs-12 text-white" variant="warning">
                            Pendente
                        </b-badge>
                    </td>
                    <td class="text-center">
                        <i v-if="user.id == line.user_id" class="bx bx-pencil text-info fs-14 mx-1 pointer" @click="getView(line.id)"
                           title="Editar"></i>
                        <i v-if="user.id == line.user_id" class="bx bx-trash text-danger fs-14 mx-1 pointer" title="Excluir"
                           @click="deleteLine(line.id)"></i>

                        <i v-if="user.category == 1 && user.id != line.user_id" class="bx bx-search text-info fs-14 mx-1 pointer" title="Detalhes"
                           @click="detailsSolicitation(line.id)"></i>
                        <i v-if="user.category == 1" class="bx bx-check-circle text-success fs-14 mx-1 pointer" title="Confirmar"
                           @click="newStatusSolicitation(line.id, 'confirmar')"></i>
                        <i v-if="user.category == 1" class="bx bx-x-circle text-danger fs-14 mx-1 pointer" title="Cancelar"
                           @click="newStatusSolicitation(line.id, 'cancelar')"></i>
                    </td>
                    <span class="spinner spinner-border spinner-line flex-shrink-0" :id="'spinnerLine' + line.id"
                          role="status">
                        <span class="visually-hidden"></span>
                    </span>
                </tr>
                </tbody>

                <tbody v-else-if="this.pendings.total === 0">
                <tr>
                    <td colspan="5" class="text-center">Nenhum resultado encontrado</td>
                </tr>
                </tbody>

            </template>

            <template v-slot:pagination>

                <Pagination :total="pendings.total"
                            :index="this.data.paramns.index"
                            :limit="this.data.paramns.limit"
                            session="Pending"
                >
                </Pagination>

            </template>


            <template v-slot:form-modal>

                <form action="javascript:void(0);" id="form" novalidate>
                    <input type="hidden" id="id" name="id" value="0">
                    <b-row class="mb-3" v-for="(obj, index) in objs" :key="'row' + index">
                        <input type="hidden" :id="'id' + index" name="idDetail[]" :value="obj.id">
                        <b-col md="6">
                            <label for="category" class="form-label">Categoria <span
                                class="text-danger">*</span></label>
                            <select class="form-control form-select category" id="category" name="category[]"
                                    v-model="obj.category" required>
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
                                       @click="deleteSolicitation(index, obj.id)"></i>
                                </span>
                            </label>
                            <input :id="'value' + index" name="value[]" class="form-control value" :value="obj.value"
                                   type="text" placeholder="R$ 0,00" required @keyup="getTotal('value' + index)">
                        </b-col>

                    </b-row>
                    <b-row>
                        <b-col md="7"></b-col>
                        <b-col md="5">
                            <label for="category" class="form-label">Valor Total <span
                                class="text-danger">*</span></label>
                            <input id="valueTotal" name="valueTotal" class="form-control" type="text"
                                   placeholder="R$ 0,00" required readonly>
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