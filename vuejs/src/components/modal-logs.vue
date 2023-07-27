<script>
import store from "@/state/store";
import Pagination from '@/components/pagination'
import {computed, ref} from 'vue';
import {startLoading} from "@/components/composables/functions";
import {setSessionLogs} from "@/components/composables/getSessions";

export default {
    components: {
        Pagination
    },
    setup() {
        if (!localStorage.getItem('Logs')) setSessionLogs();
        let showModalLogs = ref(false);
        let session = ref({
            module: 'leadsModule/',
            paramns: {
                index: 0,
                limit: 25,
            }
        });

        const modalShow = (newValue) => {
            session.value = newValue;
            showModalLogs.value = true;
            startLoading('form', 'save');
        }

        const showDetails = (id) => {
            const icon = document.getElementById('icon' + id);
            const section = document.getElementById('section' + id);

            if (icon.classList.value === 'ri-eye-fill') {
                section.style.display = 'block';
                icon.classList.add('ri-eye-off-fill');
                icon.classList.remove('ri-eye-fill');
            } else {
                section.style.display = 'none';
                icon.classList.add('ri-eye-fill');
                icon.classList.remove('ri-eye-off-fill');
            }
        }

        return {
            showModalLogs,
            logs: computed(() => store.state.leadsModule.logs),
            modalShow,
            session,
            showDetails
        }
    }
}

</script>

<template>
    <b-modal v-model="showModalLogs" centered hide-footer size="xl" title="Logs do Lead" class="v-modal-custom"
             scrollable id="modalLogs">
        <table class="table table-striped align-middle mb-3" id="table">
            <thead>
            <tr>
                <th>Responsável</th>
                <th class="text-center">Data</th>
                <th class="text-center">Ação</th>
                <th class="text-center">Descrição</th>
            </tr>
            </thead>
            <tbody v-if="logs.total > 0">
            <tr v-for="log in logs.message" :key="log.id">
                <td>{{ log.responsible }}</td>
                <td class="text-center">{{ log.created }}</td>
                <td class="text-center">{{ log.type }}</td>
                <td class="text-center">
                    <span @click="showDetails(log.id)" class="pointer link-primary">Detalhes <i class="ri-eye-fill"
                                                                                   :id="'icon' + log.id"></i></span>
                    <section style="display: none" :id="'section' + log.id" v-html="log.description"></section>
                </td>
            </tr>
            </tbody>
            <tbody v-else>
            <tr>
                <td colspan="4" class="text-center">Nenhum resultado encontrado</td>
            </tr>
            </tbody>

        </table>

        <Pagination :total="logs.total"
                    :index="session.paramns.index"
                    :limit="session.paramns.limit"
                    session="Logs"
        >
        </Pagination>

    </b-modal>
</template>