import {LIST_CATEGORIES, NEW_VALUES_CATEGORIES} from "../mutations-types";
import {DELETE_CATEGORIES, GET_CATEGORIES, REGISTER_CATEGORIES} from "../actions-type";
import {
    endLoading,
    Forbidden,
    getUrl,
    showNotify,
    notifyError, opacityByTag,
} from '@/components/composables/functions';
import http from "@/http";
import {setSessionCategories} from "@/components/composables/getSessions";
import Swal from "sweetalert2";

export const state = {
    categories: {
        total: '', partial: '', status: '', message: {}
    },
};


export const mutations = {
    [LIST_CATEGORIES](state, categories) {
        state.categories = categories;
        opacityByTag('table', 'td', '1', 'spinnerTable', 'none');
    },

    [NEW_VALUES_CATEGORIES](state) {
        const total = --state.categories.total;
        let message = state.categories.message;
        let partial = state.categories.partial;
        let start = state.categories.start;
        if (total < partial) --partial;
        if (total === 0) {
            partial = 0;
            start = 0;
            message = {};
        }

        state.categories = {
            total: total,
            partial: partial,
            start: start,
            message: message
        }
    }
};
export const actions = {

    [GET_CATEGORIES]({commit}) {
        opacityByTag('table', 'td', '.2', 'spinnerTable', 'block');
        if (!localStorage.getItem('Categories')) setSessionCategories();
        let obj = JSON.parse(localStorage.getItem('Categories'));
        const url = getUrl(obj.paramns);
        const route = 'categorias/listar/' + url;
        http.get(route, {
            headers: {'Authorization': ` Bearer ${localStorage.getItem('jwt')} `}
        })
            .then(response => commit(LIST_CATEGORIES, response.data))
            .catch(errors => {
                console.error(errors);
                notifyError('Algo deu errado. Contate o administrador!');
                Forbidden(errors);
                opacityByTag('table', 'td', '1', 'spinnerTable', 'none');
            });
    },

    [REGISTER_CATEGORIES]({dispatch}, formData) {
        http.post('categorias/cadastrar', formData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
            .then(response => {
                showNotify(response)
                dispatch(GET_CATEGORIES);
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

    async [DELETE_CATEGORIES]({commit}, id) {
        opacityByTag('table', 'td', '.2', 'spinnerTable', 'block');
        await http.delete('categorias/excluir/' + id, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
            .then(() => {
                Swal.fire("", "Categoria excluído com sucesso!", "success");
                opacityByTag('table', 'td', '1', 'spinnerTable', 'none');
                setTimeout(function () {
                    document.getElementById('line' + id).style.display = 'none';
                }, 200);
                commit(NEW_VALUES_CATEGORIES);
            })
            .catch(errors => {
                console.error(errors);
                notifyError('Algo deu errado. Contate o administrador!');
                Forbidden(errors);
                opacityByTag('table', 'td', '1', 'spinnerTable', 'none');
            })
    },
};

