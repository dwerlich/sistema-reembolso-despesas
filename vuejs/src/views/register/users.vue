<script>

import {computed, ref} from 'vue';
import appConfig from "../../../app.config.json";
import Layout from "@/layouts/main";
import PageHeader from "@/components/page-header";
import {BCol, BRow} from "bootstrap-vue-3";
import TableLists from '@/components/table-lists'
import Pagination from '@/components/pagination'
import {GET_USERS} from "@/state/actions-type";
import {Forbidden, getModalValues, startLoading} from "@/components/composables/functions";
import {DELETE_USERS} from "@/state/actions-type";
import Swal from "sweetalert2";
import http from "@/http";
import store from "@/state/store";

export default {
    page: {
        title: "Usuários",
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
        store.dispatch('usersModule/' + GET_USERS);

        const resetModal = () => {
            document.getElementById('form').classList.remove('was-validated');
            document.getElementById('form').reset();
            document.getElementById('id').value = 0;
            document.getElementById('passwordDiv').style.display = 'block';
            document.getElementById('password').required = true;
        }

        const childComponentRef = ref(null);

        const getView = async (id) => {
            childComponentRef.value.modalShow();
            startLoading('form', 'save');
            document.getElementById('password').required = false;
            document.getElementById('passwordDiv').style.display = 'none';
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
                    store.dispatch('usersModule/' + DELETE_USERS, id);
                }
            });
        }

        return {
            title: "Usuários",
            items: null,
            data: JSON.parse(localStorage.getItem('Users')),
            users: computed(() => store.state.usersModule.users),
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
            session="Users"
            title="Usuário"
            ref="childComponentRef"
            col="2"
            :filter="true"
            @resetModal="resetModal">

            <template v-slot:form-filter>

                <div class="col-md-4 my-1">
                    <input type="text" class="form-control" id="nameFilter"
                           placeholder="Nome">
                </div>
                <div class="col-md-3 my-1">
                    <input type="text" class="form-control" id="emailFilter"
                           placeholder="E-mail">
                </div>
                <div class="col-md-3 my-1">
                    <select  class="form-control form-select" id="categoryFilter" name="category">
                        <option value="">Todas Categorias</option>
                        <option value="1">Gestor</option>
                        <option value="2">Funcionário</option>
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
                            session="Users"
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
                        <b-col lg="12">
                            <label for="email" class="form-label">E-mail <span class="text-danger">*</span></label>
                            <input type="text" class="form-control" id="email" name="email" required
                                   placeholder="E-mail"/>
                        </b-col>
                        <b-col md="6">
                            <label for="birthDate" class="form-label">Data de Nascimento <span
                                class="text-danger">*</span></label>
                            <input type="text" class="form-control" id="birthDate" name="birthDate" required
                                   placeholder="dd/mm/AAAA" v-maska="'##/##/####'"/>
                        </b-col>
                        <b-col md="6">
                            <label for="category" class="form-label">Categoria <span
                                class="text-danger">*</span></label>
                            <select  class="form-control form-select" id="category" name="category" required>
                                <option value="">Selecione</option>
                                <option value="1">Gestor</option>
                                <option value="2">Funcionário</option>
                            </select>
                        </b-col>
                        <b-col md="8" id="passwordDiv">
                            <label for="password" class="form-label">Senha <span class="text-danger">*</span></label>
                            <div class="position-relative auth-pass-inputgroup">
                                <input type="password" class="form-control" id="password" name="password"
                                       placeholder="Digite a Senha" required/>
                            </div>
                        </b-col>
                    </b-row>
                </form>

            </template>


        </TableLists>

    </Layout>

</template>