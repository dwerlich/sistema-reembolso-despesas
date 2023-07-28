import {LIST_USERS} from "../mutations-types";
import {DELETE_USERS, GET_USERS, REGISTER_USERS} from "../actions-type";
import {
    endLoading,
    Forbidden,
    getUrl,
    showNotify,
    notifyError, opacityByTag,
} from '@/components/composables/functions';
import http from "@/http";
import {setSessionUsers} from "@/components/composables/getSessions";
import Swal from "sweetalert2";

export const state = {
    users: {
        total: '', partial: '', status: '', message: {}
    },
    admins: {},
    consultants: {}
};


export const mutations = {
    [LIST_USERS](state, users) {
        state.users = users;
        opacityByTag('table', 'td', '1', 'spinnerTable', 'none');
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
                notifyError('Algo deu errado. Contate o administrador!');
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
                notifyError('Algo deu errado. Contate o administrador!');
                Forbidden(errors);
            })
    },

    async [DELETE_USERS](contexto, id) {
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

