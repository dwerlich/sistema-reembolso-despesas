<script>
import {authMethods} from "@/state/helpers";
import appConfig from "../../../app.config";

import {required, email, helpers} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import Lottie from "@/components/widgets/lottie.vue";

import animationData from "@/components/widgets/rhvddzym.json";
import http from "@/http";
import {notifyError, notifySuccess} from "@/components/composables/functions";

export default {
	components: {lottie: Lottie},
	setup() {
		return {v$: useVuelidate()};
	},
	validations: {
		email: {
			required: helpers.withMessage("E-mail é obrigatório", required),
			email: helpers.withMessage("Insira uma e-mail válido", email),
		},
	},
	page: {
		title: "Recuperar Senha",
		meta: [
			{
				name: "description",
				content: appConfig.description,
			},
		],
	},
	data() {
		return {
			email: "",
			submitted: false,
			error: null,
			tryingToReset: false,
			defaultOptions: {animationData: animationData},
			load: false
		};
	},
	methods: {
		...authMethods,
		// Try to register the user in with the email, fullname
		// and password they provided.
		tryToReset() {
			this.submitted = true;
			// stop here if form is invalid
			this.v$.$touch();

			if (this.v$.$invalid) {
				return;
			}
		},
		async signinapi() {
			this.load = true;
			const result = await http.post('recuperar-senha/', {
					email: this.email,
				});
			setTimeout(() => {
				this.load = false;
			}, 200)
			if (result.status == 'errors') {
				notifyError(result.data.message);
			} else {
				localStorage.setItem('tokenPassword', result.data.token);
				notifySuccess(result.data.message);
				setTimeout(() => {
					this.$router.push({
						path: '/nova-senha'
					})
				}, 2000)
			}
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
									<h5 class="text-primary">Esqueceu a Senha?</h5>
									<p class="text-muted">Redefinir senha com GEind</p>

									<lottie class="avatar-xl" colors="primary:#3cd188,secondary:#687cfe"
											:options="defaultOptions"
											:height="120" :width="120"/>

								</div>

								<div class="p-2">
									<form @submit.prevent="tryToReset">
										<div class="mb-4">
											<label class="form-label">Email</label>
											<input type="email" v-model="email" class="form-control" id="email"
												   placeholder="Digite seu e-mail"/>
											<div v-for="(item, index) in v$.email.$errors" :key="index"
												 class="invalid-feedback">
												<span v-if="item.$message">{{ item.$message }}</span>
											</div>
										</div>

										<div class="text-center mt-4">
											<b-button variant="success" class="w-100" type="submit" @click="signinapi">
												<span class="d-flex align-items-center margin-load">
													<span class="flex-grow-1 m-r-10">
													  	Enviar link de redefinição
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

						<div class="mt-4 text-center">
							<p class="mb-0">
								Eu lembro da minha senha...
								<router-link to="/login" class="fw-semibold text-primary text-decoration-underline">
									Clique aqui
								</router-link>
							</p>
						</div>
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
								&copy; {{ new Date().getFullYear() }} LifeCode. Feito com o
								<i class="mdi mdi-heart text-danger"></i>
							</p>
						</div>
					</b-col>
				</b-row>
			</b-container>
		</footer>
	</div>
</template>
