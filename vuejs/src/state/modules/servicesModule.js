import {LIST_SERVICES} from "../mutations-types";
import {DELETE_SERVICES, GET_SERVICES, REGISTER_SERVICES} from "../actions-type";
import {
    endLoading,
    Forbidden,
    getUrl,
    showNotify,
    notifyError, opacityByTag,
} from '@/components/composables/functions';
import http from "@/http";
import {setSessionServices} from "@/components/composables/getSessions";
import Swal from "sweetalert2";

export const state = {
    services: {
        total: '', partial: '', status: '', message: {}
    }
};


export const mutations = {
    [LIST_SERVICES](state, services) {
        state.services = services;
        opacityByTag('table', 'td', '1', 'spinnerTable', 'none');
    },
};
export const actions = {

    [GET_SERVICES]({commit}) {
        opacityByTag('table', 'td', '.2', 'spinnerTable', 'block');
        if (!localStorage.getItem('Services')) setSessionServices();
        let obj = JSON.parse(localStorage.getItem('Services'));
        const url = getUrl(obj.paramns);
        const route = 'servicos/listar/' + url;
        http.get(route, {
            headers: {'Authorization': ` Bearer ${localStorage.getItem('jwt')} `}
        })
            .then(response => commit(LIST_SERVICES, response.data))
            .catch(errors => {
                console.error(errors);
                notifyError('Algo deu errado. Contate o administrador!');
                Forbidden(errors);
                opacityByTag('table', 'td', '1', 'spinnerTable', 'none');
            });
    },

    [REGISTER_SERVICES]({dispatch}, formData) {
        http.post('servicos/cadastrar', formData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
            .then(response => {
                showNotify(response);
                dispatch(GET_SERVICES);
                endLoading('form', 'save');
                const close = document.getElementById('closeModalRegister');
                close.click();
            })
            .catch(errors => {
                console.error(errors);
                endLoading('form', 'save');
                notifyError(errors.response.data.message);
                Forbidden(errors);
            })
    },

    [DELETE_SERVICES](contexto, id) {
        opacityByTag('table', 'td', '.2', 'spinnerTable', 'block');
        http.delete('servicos/excluir/' + id, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
            .then(() => {
                Swal.fire("", "Serviço excluído com sucesso!", "success");
                setTimeout(function () {
                    document.getElementById('line' + id).style.display = 'none';
                }, 200)
            })
            .catch(errors => {
                console.error(errors);
                notifyError('Algo deu errado. Contate o administrador!');
                Forbidden(errors);
            })
        opacityByTag('table', 'td', '1', 'spinnerTable', 'none');
    },
};

