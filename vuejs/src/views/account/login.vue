<script>
import appConfig from "../../../app.config";
import {ref, onMounted} from 'vue'
import http from "@/http";
import router from "@/router";
import {notifyError} from "@/components/composables/functions";

export default {
    page: {
        title: "Login",
        meta: [{
            name: "description",
            content: appConfig.description,
        }],
    },
    setup() {
        const email = ref("");
        const password = ref("");
        let submitted = false;
        let tryingToLogIn = false;
        let load = ref(false);

        const signinapi = async () => {
            load.value = true;
            const formData = {
                email: email.value,
                password: password.value
            };
            http.post('login', formData)
                .then(response => {
                    if (response.status === 200) {
                        localStorage.setItem('user', JSON.stringify(response.data.message));
                        localStorage.setItem('jwt', response.data.token);
                        if (document.getElementById('rememberLogin').checked) {
                            localStorage.setItem('loginMonay', JSON.stringify(formData));
                        } else {
                            localStorage.removeItem('loginMonay');
                        }
                        setTimeout(() => {
                            router.push({
                                path: '/'
                            });
                        }, 300)
                    } else {
                        load.value = false;
                        notifyError(response.data.message)
                    }
                }).catch(e => {
                load.value = false;
                notifyError(e.response.data.message)
                console.log(e)
            });
        }

        const tryToLogIn = () => {
            if (email.value === '' || password.value === '') {
                return false;
            }
        }

        onMounted(() => {
            if (localStorage.getItem('loginMonay')) {
                const data = JSON.parse(localStorage.getItem('loginMonay'));
                email.value = data.email;
                password.value = data.password;
                document.getElementById('rememberLogin').checked = true
            }
        })

        return {
            signinapi,
            email,
            tryingToLogIn,
            load,
            submitted,
            password,
            tryToLogIn
        }
    },
};
</script>

<!--eslint-disable no-mixed-spaces-and-tabs-->
<template>
    <div class="auth-page-wrapper pt-5">
        <div class="auth-one-bg-position auth-one-bg" id="auth-particles">
            <div class="bg-overlay"></div>

            <div class="shape">

                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink"
                     viewBox="0 0 1440 120">
                    <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"></path>
                </svg>
            </div>
        </div>

        <div class="auth-page-content">
            <b-container>
                <b-row>
                    <b-col lg="12">
                        <div class="text-center mt-sm-5 mb-4 text-white-50">
                            <div>
                                <router-link to="/" class="d-inline-block auth-logo">
                                    <img src="@/assets/images/logo-light.png" alt="" height="20"/>
                                </router-link>
                            </div>
                            <p class="mt-3 fs-15 fw-medium">
                                Premium Admin & Dashboard Template
                            </p>
                        </div>
                    </b-col>
                </b-row>

                <b-row class="justify-content-center">
                    <b-col md="8" lg="6" xl="5">
                        <b-card no-body class="mt-4">
                            <b-card-body class="p-4">
                                <div class="text-center mt-2">
                                    <h5 class="text-primary">Seja bem Vindo!</h5>
                                    <p class="text-muted">Faça login para continuar.</p>
                                </div>
                                <div class="p-2 mt-4">

                                    <form @submit.prevent="tryToLogIn">
                                        <div class="mb-3">
                                            <label for="email" class="form-label">Email</label>
                                            <input type="email" class="form-control" id="email"
                                                   placeholder="Email de acesso" v-model="email"/>
                                            <div class="invalid-feedback">
                                                <span></span>
                                            </div>
                                        </div>

                                        <div class="mb-3">
                                            <label class="form-label" for="password-input">Senha</label>
                                            <div class="position-relative auth-pass-inputgroup mb-3">
                                                <input type="password" v-model="password" class="form-control pe-5"
                                                       placeholder="Digite a Senha" id="password-input"/>
                                                <b-button variant="link"
                                                          class="position-absolute end-0 top-0 text-decoration-none text-muted"
                                                          type="button" id="password-addon">
                                                    <i class="ri-eye-fill align-middle"></i>
                                                </b-button>
                                            </div>
                                        </div>

                                        <div class="mb-3">
                                            <input class="form-check-input" style="margin-right: 5px" type="checkbox"
                                                   id="rememberLogin">
                                            <label class="form-check-label" for="rememberLogin"> Lembrar de mim</label>
                                        </div>

                                        <div class="mt-4">
                                            <b-button variant="success" class="w-100 btn-load" type="submit"
                                                      @click="signinapi">
												<span class="d-flex align-items-center margin-load">
													<span class="flex-grow-1 m-r-10">
													  	Login
													</span>
													<span :class="{ invisible: !load }"
                                                          class="spinner-border flex-shrink-0" role="status">
													  <span class="visually-hidden"></span>
													</span>
												</span>
                                            </b-button>
                                        </div>
                                    </form>
                                </div>
                            </b-card-body>
                        </b-card>

                    </b-col>
                </b-row>
            </b-container>
        </div>

        <footer class="footer">
            <b-container>
                <b-row>
                    <b-col lg="12">
                        <div class="text-center">
                            <p class="mb-0 text-muted">
                                &copy; {{ new Date().getFullYear() }} TechVison. Feito com o
                                <i class="mdi mdi-heart text-danger"></i>
                            </p>
                        </div>
                    </b-col>
                </b-row>
            </b-container>
        </footer>
    </div>
</template>