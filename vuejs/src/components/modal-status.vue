<script>
import store from "@/state/store";
import {computed, ref, onMounted} from 'vue';
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import '@ckeditor/ckeditor5-link/build/translations/pt-br';
import {startLoading} from "@/components/composables/functions";

export default {
    props: ['title'],
    components: {
        ckeditor: CKEditor.component
    },
    setup(props) {

        const showModalStatus = ref(false);
        const description = ref('');
        const newStatus = ref('');
        const leadId = ref(0);

        const modalShow = (id) => {
            leadId.value = id;
            showModalStatus.value = true;
        }

        const updateStatus = () => {
            startLoading('formStatus', 'saveStatus');
            document.getElementById('formStatus').classList.add('was-validated')
            const formData = {
                leadId: leadId.value,
                description: description.value,
                status: newStatus.value,
            };
            // if (formData.description === '' || formData.leadId == '0' || formData.status === '') {
            //     notifyError('Preencha todos os campos!');
            //     endLoading('formStatus', 'saveStatus');
            //     return;
            // }
            if (props.title === 'Adicionar Histórico') {
                store.dispatch('leadsModule/REGISTER_ACTIVITY', formData);
            } else {
                store.dispatch('leadsModule/UPDATE_STATUS', formData);
            }
        }

        const resetModal = () => {
            showModalStatus.value = false;
            description.value = '';
            newStatus.value = '';
            leadId.value = 0;
        }

        const editorConfig = {
            pasteFromPasteText: true,
            additionalFilters: 'plainText',
            toolbar: ['heading', '|', 'bold', 'italic', '|', 'undo', 'redo'],
        }

        onMounted(() => {
            if (store.state.leadStatusModule.statusBySector.name === 'Carregando dados') store.dispatch('leadStatusModule/LIST_STATUS_BY_SECTOR');
        })

        return {
            showModalStatus,
            logs: computed(() => store.state.leadsModule.logs),
            modalShow,
            updateStatus,
            status: computed(() => store.state.leadStatusModule.statusBySector),
            resetModal,
            editor: ClassicEditor,
            description,
            editorConfig,
            newStatus
        }
    }
}

</script>

<template>
    <b-modal v-model="showModalStatus" centered size="md" :title="this.title" class="v-modal-custom"
             scrollable id="modalLogs" @hidden="resetModal">
        <form action="javascript:void(0);" id="formStatus" novalidate>
            <b-row class="g-3">
                <b-col xl="12">
                    <label for="newStatus">Status</label>
                    <select id="newStatus" v-model="newStatus" name="status" class="form-select" required>
                        <option value="">Selecionar status</option>
                        <option v-for="s in status" :key="s.id" :value="s.id">{{ s.name }}</option>
                    </select>
                </b-col>
                <b-col xl="12">
                    <label for="descriptionStatus">Descrição</label>
                    <div class="ckeditor-classic">
                        <ckeditor v-model="description" :editor="editor" :config="editorConfig"></ckeditor>
                    </div>
                </b-col>
            </b-row>
        </form>
        <template v-slot:footer>
            <b-button type="button" id="closeModalStatus" variant="danger" @click="showModalStatus = false">Cancelar
            </b-button>
            <b-button type="submit" id="saveStatus" variant="primary" @click="updateStatus">Salvar</b-button>
        </template>
    </b-modal>
</template>