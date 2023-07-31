<script>
import Layout from "../../../layouts/main.vue";


export default {
    components: {
        Layout,

    }
}
</script>

<template>
    <Layout>
        <b-row>
            <b-col>
                <div class="h-100">
                    <b-card>
                        <b-card-boby>
                            <p>Olá, meu nome é Diego Werlich, tenho 33 anos e sou Desenvolvedor Fullstack. Este é um
                                sistema de desafio técnico com cadastro de usuários, categorias e solicitações de
                                reembolso. O frontend foi desenvolvido com Vue.Js 3, backend com Laravel 10 e o Banco
                                de dados utilizado foi MySQL.</p>
                            <p>Você pode acessar o sistema em produção no meu servidor clicando
                                <a target="_blank" href="https://innovare.techvision.dev/" class="text-primary">aqui</a>.</p>
                        </b-card-boby>
                    </b-card>
                </div>
            </b-col>
        </b-row>
    </Layout>
</template>