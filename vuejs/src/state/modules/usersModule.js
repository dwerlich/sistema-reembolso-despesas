import {LIST_USERS, LIST_USERS_OPTIONS, NEW_VALUES_USERS} from "../mutations-types";
import {DELETE_USERS, GET_USERS, OPTIONS_USERS, REGISTER_USERS} from "../actions-type";
import {endLoading, Forbidden, getUrl, showNotify, opacityByTag} from '@/components/composables/functions';
import http from "@/http";
import {setSessionUsers} from "@/components/composables/getSessions";
import Swal from "sweetalert2";

export const state = {
    users: {
        total: '', partial: '', status: '', message: {}
    },

    users_options: {
        total: '', partial: '', status: '', message: {}
    },
};


export const mutations = {
    [LIST_USERS](state, users) {
        state.users = users;
        opacityByTag('table', 'td', '1', 'spinnerTable', 'none');
    },

    [NEW_VALUES_USERS](state) {
        const total = --state.users.total;
        let message = state.users.message;
        let partial = state.users.partial;
        let start = state.users.start;
        if (total < partial) --partial;
        if (total === 0) {
            partial = 0;
            start = 0;
            message = {};
        }

        state.users = {
            total: total,
            partial: partial,
            start: start,
            message: message
        }
    },

    [LIST_USERS_OPTIONS](state, users_options) {
        state.users_options = users_options;
    },
};
export const actions = {

    [GET_USERS]({commit}) {
        opacityByTag('table', 'td', '.2', 'spinnerTable', 'block');
        if (!localStorage.getItem('Users')) setSessionUsers();
        let obj = JSON.parse(localStorage.getItem('Users'));
        const url = getUrl(obj.paramns);
        const route = 'usuarios/listar/' + url;
        http.get(route, {
            headers: {'Authorization': ` Bearer ${localStorage.getItem('jwt')} `}
        })
            .then(response => commit(LIST_USERS, response.data))
            .catch(errors => {
                console.error(errors);
                Forbidden(errors);
                opacityByTag('table', 'td', '1', 'spinnerTable', 'none');
            });
    },

    [REGISTER_USERS]({dispatch}, formData) {
        http.post('usuarios/cadastrar', formData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
            .then(response => {
                showNotify(response)
                dispatch(GET_USERS);
                endLoading('form', 'save');
                const close = document.getElementById('closeModalRegister');
                close.click();
            })
            .catch(errors => {
                console.error(errors);
                endLoading('form', 'save');
                Forbidden(errors);
            })
    },

    async [DELETE_USERS]({commit}, id) {
        opacityByTag('table', 'td', '.2', 'spinnerTable', 'block');
        await http.delete('usuarios/excluir/' + id, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
            .then(() => {
                Swal.fire("", "Usuário excluído com sucesso!", "success");
                opacityByTag('table', 'td', '1', 'spinnerTable', 'none');
                setTimeout(function () {
                    document.getElementById('line' + id).style.display = 'none';
                }, 200);
                commit(NEW_VALUES_USERS);
            })
            .catch(errors => {
                console.error(errors);
                Forbidden(errors);
                opacityByTag('table', 'td', '1', 'spinnerTable', 'none');
            })
    },

    [OPTIONS_USERS]({commit}) {
        const route = 'usuarios/listar/?active=1&name=&email=&category=&limit=1000&index=0';
        http.get(route, {
            headers: {'Authorization': ` Bearer ${localStorage.getItem('jwt')} `}
        })
            .then(response => commit(LIST_USERS_OPTIONS, response.data.message))
            .catch(errors => {
                console.error(errors);
                Forbidden(errors);
                opacityByTag('table', 'td', '1', 'spinnerTable', 'none');
            });
    },
};

