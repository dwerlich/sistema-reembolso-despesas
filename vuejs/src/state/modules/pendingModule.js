import {LIST_PENDING, LIST_RESOLVED} from "../mutations-types";
import {DELETE_SOLICITATIONS, GET_PENDING, REGISTER_PENDING} from "../actions-type";
import {
    endLoading,
    Forbidden,
    getUrl,
    showNotify,
    notifyError, opacityByTag,
} from '@/components/composables/functions';
import http from "@/http";
import {setSessionPending} from "@/components/composables/getSessions";
import Swal from "sweetalert2";

export const state = {
    pending: {
        total: '', partial: '', status: '', message: {}
    },
    resolved: {
        total: '', partial: '', status: '', message: {}
    },
};


export const mutations = {
    [LIST_PENDING](state, pending) {
        state.pending = pending;
        opacityByTag('table', 'td', '1', 'spinnerTable', 'none');
    },

    [LIST_RESOLVED](state, resolved) {
        state.resolved = resolved;
        opacityByTag('table', 'td', '1', 'spinnerTable', 'none');
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
                notifyError('Algo deu errado. Contate o administrador!');
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
                notifyError('Algo deu errado. Contate o administrador!');
                Forbidden(errors);
            })
    },

    async [DELETE_SOLICITATIONS](contexto, id) {
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
                }, 200)
            })
            .catch(errors => {
                console.error(errors);
                notifyError('Algo deu errado. Contate o administrador!');
                Forbidden(errors);
                opacityByTag('table', 'td', '1', 'spinnerTable', 'none');
            })
    },
};

