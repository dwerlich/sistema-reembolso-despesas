<script>

import {computed, ref} from 'vue';
import Layout from "@/layouts/main";
import PageHeader from "@/components/page-header";
import {BCol, BRow} from "bootstrap-vue-3";
import TableLists from '@/components/table-lists'
import Pagination from '@/components/pagination'
import {GET_RESOLVED, OPTIONS_USERS} from "@/state/actions-type";
import {
    Forbidden,
    startLoading,
    endLoading, notifyError
} from "@/components/composables/functions";
import http from "@/http";
import store from "@/state/store";

export default {
    page: {
        title: "Solicitações Resolvidas",
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
        const user = JSON.parse(localStorage.getItem('user'))
        store.dispatch('resolvedModule/' + GET_RESOLVED);
        if (user.category === 1) store.dispatch('usersModule/' + OPTIONS_USERS);

        const objs = ref([{
            id: 0,
            value: '',
            category: ''
        }])
        const showDetails = ref(false);

        const resetModal = () => {
            objs.value = [{
                id: 0,
                value: '',
                category: ''
            }];
        }


        const detailsSolicitation = async (id) => {
            showDetails.value = true;
            startLoading('sectionModal', 'save');
            await http.get('solicitacao/dados/' + id, {
                headers: {'Authorization': ` Bearer ${localStorage.getItem('jwt')} `}
            })
                .then(response => {
                    const result = response.data.message;
                    objs.value = [];
                    result.details.forEach((element) => objs.value.push(element));
                    document.getElementById('valueTotalDetail').innerText = result.valueTotal;
                    document.getElementById('userNameDetail').innerText = result.user_name;

                    endLoading('sectionModal', 'save');
                })
                .catch(errors => {
                    endLoading('form', 'save');
                    console.error(errors);
                    notifyError(errors.response.data.message);
                    Forbidden(errors);
                });
        }

        return {
            title: "Solicitações Resolvidas",
            items: null,
            data: JSON.parse(localStorage.getItem('Resolved')),
            pendings: computed(() => store.state.resolvedModule.pending),
            options: computed(() => store.state.categoriesModule.options),
            users: computed(() => store.state.usersModule.users_options),
            resetModal,
            user,
            detailsSolicitation,
            showDetails,
            objs
        }
    }
}

</script>
<!--eslint-disable no-mixed-spaces-and-tabs-->
<template>
    <Layout>
        <PageHeader :title="title"/>

        <TableLists
            session="Resolved"
            ref="childComponentRef"
            col="2"
            :filter="true">

            <template v-slot:form-filter>

                <div class="col-md-2 my-1">
                    <input type="text" class="form-control" id="startFilter"
                           placeholder="Dê dd/mm/AAAA" v-maska="'##/##/####'">
                </div>
                <div class="col-md-2 my-1">
                    <input type="text" class="form-control" id="endFilter"
                           placeholder="Até dd/mm/AAAA" v-maska="'##/##/####'">
                </div>
                <div class="col-md-2 my-1">
                    <select class="form-control form-select" id="statusFilter" name="status">
                        <option value="2,3" selected>Todos status</option>
                        <option value="2">Cancelado</option>
                        <option value="3">Confirmado</option>
                    </select>
                </div>
                <div v-if="user.category == 1" class="col-md-3 my-1">
                    <select class="form-control form-select" id="userFilter" name="user">
                        <option value="">Todos usuários</option>
                        <option v-for="option in users" :key="option.id" :value="option.id">
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
                        <b-badge v-if="line.status === 3" class="fs-12 text-white" variant="success">
                            Confirmado
                        </b-badge>
                        <b-badge v-if="line.status === 2" class="fs-12 text-white" variant="danger">
                            Cancelado
                        </b-badge>
                    </td>
                    <td class="text-center">
                        <i class="bx bx-search text-info fs-14 mx-1 pointer" title="Detalhes"
                           @click="detailsSolicitation(line.id)"></i>
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
                            session="Resolved"
                >
                </Pagination>

            </template>

        </TableLists>

    </Layout>

    <b-modal v-model="showDetails" centered title="Detalhes da Solicitação"
             class="v-modal-custom" scrollable @hidden="resetModal">

        <section id="sectionModal">
            <b-row>
                <b-col xl="12" class="mb-3">
                    <b>Requerente: </b><span id="userNameDetail"></span>
                </b-col>
            </b-row>

            <b-row v-for="(obj, index) in objs" :key="'rowModal' + index">
                <b-col md="6" class="mb-3">
                    <b>Categoria: </b> {{ obj.category_name }}
                </b-col>
                <b-col md="6" class="mb-3">
                    <b>Valor: </b> {{ obj.value }}
                </b-col>
            </b-row>

            <b-row>
                <b-col xl="12" class="mb-3">
                    <b>Valor Total: </b><span id="valueTotalDetail"></span>
                </b-col>
            </b-row>
        </section>


        <template v-slot:footer>
            <b-button type="button" id="closeModalDetail" variant="danger" @click="showDetails = false">Fechar
            </b-button>
        </template>

    </b-modal>

</template>