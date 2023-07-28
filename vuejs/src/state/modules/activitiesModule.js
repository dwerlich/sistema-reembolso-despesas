import {LIST_ACTIVITIES, LIST_ACTIVITIES_ALL} from "../mutations-types";
import {DELETE_ACTIVITIES, GET_ACTIVITIES, GET_ACTIVITIES_ALL, REGISTER_ACTIVITIES} from "../actions-type";
import {
    endLoading,
    Forbidden,
    getUrl,
    showNotify,
    notifyError, opacityByTag,
} from '@/components/composables/functions';
import http from "@/http";
import {setSessionActivities} from "@/components/composables/getSessions";
import Swal from "sweetalert2";

export const state = {
    activities: {
        total: '', partial: '', status: '', message: {}
    },
    activitiesAll: {}
};


export const mutations = {
    [LIST_ACTIVITIES](state, activities) {
        state.activities = activities;
        opacityByTag('table', 'td', '1', 'spinnerTable', 'none');
    },

    [LIST_ACTIVITIES_ALL](state, activitiesAll) {
        state.activitiesAll = activitiesAll;
    },
};
export const actions = {

    [GET_ACTIVITIES]({commit}) {
        opacityByTag('table', 'td', '.2', 'spinnerTable', 'block');
        if (!localStorage.getItem('Activities')) setSessionActivities();
        let obj = JSON.parse(localStorage.getItem('Activities'));
        const url = getUrl(obj.paramns);
        const route = 'atividades/listar/' + url;
        http.get(route, {
            headers: {'Authorization': ` Bearer ${localStorage.getItem('jwt')} `}
        })
            .then(response => commit(LIST_ACTIVITIES, response.data))
            .catch(errors => {
                console.error(errors);
                notifyError('Algo deu errado. Contate o administrador!');
                Forbidden(errors);
                opacityByTag('table', 'td', '1', 'spinnerTable', 'block');
            });
    },

    [REGISTER_ACTIVITIES]({dispatch}, formData) {
        opacityByTag('table', 'td', '.2', 'spinnerTable', 'block');
        http.post('atividades/cadastrar', formData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
            .then(response => {
                showNotify(response)
                dispatch(GET_ACTIVITIES);
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
        opacityByTag('table', 'td', '1', 'spinnerTable', 'none');
    },

    [DELETE_ACTIVITIES](contexto, id) {
        http.delete('atividades/excluir/' + id, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
            .then(() => {
                Swal.fire("", "Atividade excluída com sucesso!", "success");
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

    [GET_ACTIVITIES_ALL]({commit}) {
        http.get('atividades/por-consultoria/', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
            .then(response => {
                console.log(response.data.message)
                commit(LIST_ACTIVITIES_ALL, response.data.message)
            })
            .catch(errors => {
                console.error(errors);
                notifyError('Algo deu errado. Contate o administrador!');
                Forbidden(errors);
            })
    },
};

