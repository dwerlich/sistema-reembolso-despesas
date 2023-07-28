<script>
import http from "@/http";
import {notifyError, notifySuccess} from "@/components/composables/functions";

export default {
    props: ['id', 'url', 'variant', 'text'],
    methods: {
        async changeStatus(id, url) {

            const line = document.getElementById('line' + id);
            const td = line.getElementsByTagName('td');
            for(let i = 0; i < td.length; i++) {
                td[i].style.opacity = '.2';
            }
            document.getElementById('spinnerLine' +id).style.display = 'block';

            await http.get(url + id, {
                headers: {'Authorization': ` Bearer ${localStorage.getItem('jwt')} `}
            })
                .then(response => {
                    notifySuccess(response.data.message);
                    if (document.getElementById('badge' + id).innerText === 'Ativo') {
                        document.getElementById('badge' + id).classList.remove('bg-success');
                        document.getElementById('badge' + id).classList.add('bg-danger');
                        document.getElementById('badge' + id).innerText = 'Inativo';
                    } else {
                        document.getElementById('badge' + id).classList.add('bg-success');
                        document.getElementById('badge' + id).classList.remove('bg-danger');
                        document.getElementById('badge' + id).innerText = 'Ativo';
                    }
                })
                .catch(errors => {
                    console.log(errors)
                    notifyError(errors)
                })
            setTimeout(() => {
                for(let i = 0; i < td.length; i++) {
                    td[i].style.opacity = '1';
                }
                document.getElementById('spinnerLine' +id).style.display = 'none';
            }, 150)
        }
    }

}


</script>

<template>
    <td class="text-center">
        <b-badge class="pointer fs-12" :id="'badge' + id" :variant="variant" @click.prevent="changeStatus(id, url)">
            {{ text }}
        </b-badge>
    </td>

</template>