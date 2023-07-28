/* eslint-disable */
<script>
import {endLoading, startLoading, ValidateForm} from "@/components/composables/functions";

export default {
    props: [
        'session', 'title', 'size', 'col', 'filter'
    ],
    emits: ['resetModal'],
    data() {
        const data = JSON.parse(localStorage.getItem(this.session));
        let register = data.module + 'REGISTER_' + this.session.toUpperCase();
        let get = data.module + 'GET_' + this.session.toUpperCase();
        return {
            loadTable: false,
            total: 1,
            showModal: false,
            register,
            get
        };
    },

    methods: {
        modalShow() {
            this.showModal = true;
        },

        validation() {
            startLoading('form', 'save');
            if (!ValidateForm('form')) {
                endLoading('form', 'save');
                return;
            }

            this.submitForm()
        },

        submitForm() {
            try {
                const form = document.getElementById('form');
                const formData = new FormData(form);
                this.$store.dispatch(this.register, formData)
            } catch (e) {
                console.log(e)
            }
        },

        getLimit() {
            let obj = JSON.parse(localStorage.getItem(this.session));
            obj.paramns.index = 0;
            obj.paramns.limit = document.getElementById('limitFilter').value;
            localStorage.setItem(this.session, JSON.stringify(obj));

            this.$store.dispatch(this.get)
        },

        resetModal() {
            document.getElementById('spinner').style.display = 'none';
            this.$emit('resetModal');
            this.load = false;
            this.showModal = false;
        },

        getFilter() {
            const obj = JSON.parse(localStorage.getItem(this.session))
            const keys = Object.keys(obj.paramns);
            const arr = ['index', 'sector', 'toView', 'limit', 'order', 'seq']
            for (let i = 0; i < keys.length; i++) {
                if (arr.indexOf(keys[i]) < 0) {
                    const input = document.getElementById(keys[i] + 'Filter');
                    if (input) input.value = obj.paramns[keys[i]];
                }
            }
        },

        filterTable() {
            // Pegando a localStorage
            let obj = JSON.parse(localStorage.getItem(this.session));
            // Pegando o array das chaves das variáveis da url
            const keys = Object.keys(obj.paramns);

            // Selecionando apenas os valores do formulário, os demais permanecem iguais
            const arr = ['index', 'sector', 'toView', 'limit', 'order', 'seq']
            for (let i = 0; i < keys.length; i++) {
                if (arr.indexOf(keys[i]) < 0) {
                    obj.paramns[keys[i]] = document.getElementById(keys[i] + 'Filter').value;
                }
            }

            // Zerando o index
            obj.paramns.index = 0;

            // Salvando a localStorage
            localStorage.setItem(this.session, JSON.stringify(obj));

            this.$store.dispatch(this.get)
        },
        resetTable() {
            document.getElementById('filter').reset();
            this.filterTable();
        }

    },

    mounted() {
        this.getFilter();
    },

};

</script>
<!--eslint-disable no-mixed-spaces-and-tabs-->
<template>
    <b-card no-body>
        <b-card-header>
            <form id="filter" @submit.prevent="filterTable">
                <div class="row">
                    <b-col :md="this.col || '2'" v-if="title" class="d-flex my-1">
                        <b-button variant="primary" @click="showModal = !showModal"
                                  style="width: 150px;white-space: nowrap"
                                  class="m-r-10">
                            <b><i class="mdi mdi-plus"></i></b> {{ this.title }}
                        </b-button>
                    </b-col>

                    <slot name="form-filter"></slot>
                    <div v-if="this.filter === true" class="col text-end">
                        <button class="btn btn-secondary mx-1 my-1" type="reset" @click="resetTable">
                            Limpar
                        </button>
                        <a class="btn btn-primary mx-1 my-1 text-white" @click="filterTable">Buscar</a>
                    </div>
                </div>
            </form>
        </b-card-header>

        <b-card-body>
            <div class="row align-items-center mt-4">
                <div class="col-auto">
                    <span>Exibir </span>
                </div>
                <div class="col-auto">
                    <select class="form-control form-select" id="limitFilter"
                            @change="getLimit">
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="250">250</option>
                    </select>
                </div>
                <div class="col-auto">
                    <span> registros</span>
                </div>
            </div>

            <slot name="total"></slot>

            <div class="live-preview">
                <div class="table-responsive-xl">
                    <form id="formLeadsCheck">
                        <table class="table table-striped align-middle mb-0" id="table" style="position: relative">
                            <thead>
                            <tr>

                                <slot name="t-head"></slot>

                            </tr>
                            </thead>

                            <slot name="t-body"></slot>
                            <span class="spinner spinner-border flex-shrink-0" id="spinnerTable" role="status">
				                <span class="visually-hidden"></span>
			                </span>
                        </table>
                    </form>
                </div>
                <div class="row">
                    <div class="col text-center mt-2">
                        <div :class="{ invisible: !loadTable }"
                             class="spinner-border text-primary avatar-sm"
                             role="status"
                             style="
							 	position: absolute;
							 	display: block;
							 	right: 50%">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>

                <div class="row text-end mt-3">
                    <nav aria-label="...">

                        <slot name="pagination"></slot>

                    </nav>
                </div>
            </div>
        </b-card-body>
    </b-card>

    <b-modal v-model="showModal" centered :size="this.size || 'md'" :title="'Cadastrar' + this.title "
             class="v-modal-custom" scrollable @hidden="resetModal" id="modalRegister">

        <slot name="form-modal"></slot>


        <template v-slot:footer>
            <b-button type="button" id="closeModalRegister" variant="danger" @click="showModal = false">Cancelar
            </b-button>
            <b-button type="submit" variant="primary" id="save" @click="validation">Salvar</b-button>
        </template>

    </b-modal>
</template>