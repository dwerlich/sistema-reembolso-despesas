import {LIST_EQUIPAMENTS } from "../mutations-types";
import {DELETE_EQUIPAMENTS , GET_EQUIPAMENTS , REGISTER_EQUIPAMENTS } from "../actions-type";
import {
    endLoading,
    Forbidden,
    getUrl,
    showNotify,
    notifyError, opacityByTag,
} from '@/components/composables/functions';
import http from "@/http";
import {setSessionEquipaments} from "@/components/composables/getSessions";
import Swal from "sweetalert2";

export const state = {
    equipaments: {
        total: '', partial: '', status: '', message: {}
    }
};


export const mutations = {
    [LIST_EQUIPAMENTS ](state, equipaments) {
        state.equipaments = equipaments;
        opacityByTag('table', 'td', '1', 'spinnerTable', 'none');
    },
};
export const actions = {

    [GET_EQUIPAMENTS ]({commit}) {
        opacityByTag('table', 'td', '.2', 'spinnerTable', 'block');
        if (!localStorage.getItem('Equipaments')) setSessionEquipaments();
        let obj = JSON.parse(localStorage.getItem('Equipaments'));
        const url = getUrl(obj.paramns);
        const route = 'equipamentos/listar/' + url;
        http.get(route, {
            headers: {'Authorization': ` Bearer ${localStorage.getItem('jwt')} `}
        })
            .then(response => commit(LIST_EQUIPAMENTS , response.data))
            .catch(errors => {
                console.error(errors);
                notifyError('Algo deu errado. Contate o administrador!');
                Forbidden(errors);
                opacityByTag('table', 'td', '1', 'spinnerTable', 'none');
            });
    },

    [REGISTER_EQUIPAMENTS ]({dispatch}, formData) {
        http.post('equipamentos/cadastrar', formData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
            .then(response => {
                showNotify(response);
                dispatch(GET_EQUIPAMENTS );
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

    [DELETE_EQUIPAMENTS ](contexto, id) {
        opacityByTag('table', 'td', '.2', 'spinnerTable', 'block');
        http.delete('equipamentos/excluir/' + id, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
            .then(() => {
                Swal.fire("", "Equipamento excluído com sucesso!", "success");
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

