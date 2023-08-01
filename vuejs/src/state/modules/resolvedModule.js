import {LIST_RESOLVED} from "../mutations-types";
import {GET_RESOLVED,} from "../actions-type";
import {Forbidden, getUrl, notifyError, opacityByTag,} from '@/components/composables/functions';
import http from "@/http";
import {setSessionResolved} from "@/components/composables/getSessions";

export const state = {
    pending: {
        total: '', partial: '', status: '', message: {}
    },
};


export const mutations = {
    [LIST_RESOLVED](state, pending) {
        state.pending = pending;
        opacityByTag('table', 'td', '1', 'spinnerTable', 'none');
    },
};
export const actions = {

    [GET_RESOLVED]({commit}) {
        opacityByTag('table', 'td', '.2', 'spinnerTable', 'block');
        if (!localStorage.getItem('Resolved')) setSessionResolved();
        let obj = JSON.parse(localStorage.getItem('Resolved'));
        const url = getUrl(obj.paramns);
        const route = 'solicitacao/listar/' + url;
        http.get(route, {
            headers: {'Authorization': ` Bearer ${localStorage.getItem('jwt')} `}
        })
            .then(response => commit(LIST_RESOLVED, response.data))
            .catch(errors => {
                console.error(errors);
                
                Forbidden(errors);
                opacityByTag('table', 'td', '1', 'spinnerTable', 'none');
            });
    },
};

