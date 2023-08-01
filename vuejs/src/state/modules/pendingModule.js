import {LIST_PENDING, NEW_VALUES_PENDING} from "../mutations-types";
import {
    DELETE_DETAIL,
    DELETE_SOLICITATIONS,
    GET_PENDING,
    NEW_STATUS_SOLICITATIONS,
    REGISTER_PENDING
} from "../actions-type";
import {
    endLoading,
    Forbidden,
    getUrl,
    showNotify,
    opacityByTag,
} from '@/components/composables/functions';
import http from "@/http";
import {setSessionPending} from "@/components/composables/getSessions";
import Swal from "sweetalert2";

export const state = {
    pending: {
        total: '', partial: '', status: '', message: {}
    },
};


export const mutations = {
    [LIST_PENDING](state, pending) {
        state.pending = pending;
        opacityByTag('table', 'td', '1', 'spinnerTable', 'none');
    },

    [NEW_VALUES_PENDING](state) {
        const total = --state.pending.total;
        let message = state.pending.message;
        let partial = state.pending.partial;
        let start = state.pending.start;
        if (total < partial) --partial;
        if (total === 0) {
            partial = 0;
            start = 0;
            message = {};
        }

        state.pending = {
            total: total,
            partial: partial,
            start: start,
            message: message
        }
    },
};
export const actions = {

    [GET_PENDING]({commit}) {
        opacityByTag('table', 'td', '.2', 'spinnerTable', 'block');
        if (!localStorage.getItem('Pending')) setSessionPending();
        let obj = JSON.parse(localStorage.getItem('Pending'));
        const url = getUrl(obj.paramns);
        const route = 'solicitacao/listar/' + url;
        http.get(route, {
            headers: {'Authorization': ` Bearer ${localStorage.getItem('jwt')} `}
        })
            .then(response => commit(LIST_PENDING, response.data))
            .catch(errors => {
                console.error(errors);
                
                Forbidden(errors);
                opacityByTag('table', 'td', '1', 'spinnerTable', 'none');
            });
    },

    [REGISTER_PENDING]({dispatch}, formData) {
        http.post('solicitacao/cadastrar', formData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
            .then(response => {
                showNotify(response)
                dispatch(GET_PENDING);
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

    async [DELETE_SOLICITATIONS]({commit}, id) {
        opacityByTag('table', 'td', '.2', 'spinnerTable', 'block');
        await http.delete('solicitacao/excluir/' + id, {
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
                commit(NEW_VALUES_PENDING);
            })
            .catch(errors => {
                console.error(errors);
                
                Forbidden(errors);
                opacityByTag('table', 'td', '1', 'spinnerTable', 'none');
            })
    },

    async [DELETE_DETAIL](contexto, id) {
        return  http.delete('solicitacao/excluir-detalhe/' + id, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
            .then(() => {
                return true;
            })
            .catch(errors => {
                console.error(errors);
                
                Forbidden(errors);
                opacityByTag('table', 'td', '1', 'spinnerTable', 'none');
            })
    },

    [NEW_STATUS_SOLICITATIONS]({commit}, data) {
        opacityByTag('table', 'td', '.2', 'spinnerTable', 'block');
        http.get(`solicitacao/${data.type}/${data.id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
            .then(() => {
                Swal.fire("", "Status alterado com sucesso!", "success");
                opacityByTag('table', 'td', '1', 'spinnerTable', 'none');
                setTimeout(function () {
                    document.getElementById('line' + data.id).style.display = 'none';
                }, 200);
                commit(NEW_VALUES_PENDING);
            })
            .catch(errors => {
                console.error(errors);
                
                Forbidden(errors);
                opacityByTag('table', 'td', '1', 'spinnerTable', 'none');
            })
    },
};

