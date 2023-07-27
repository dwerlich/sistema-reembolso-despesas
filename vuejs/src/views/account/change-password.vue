<script>
import http from "@/http";
import {notifyError, notifySuccess} from "@/components/composables/functions";

export default {
	data() {
		return {
			tokenPassword: localStorage.getItem('tokenPassword'),
			load: false
		};
	},
	methods: {
		validatePassword() {
			// passowrd match
			var password = document.getElementById("password-input"),
				confirm_password = document.getElementById("confirm-password-input");

			//Password validation

			if (password.value != confirm_password.value) {
				confirm_password.setCustomValidity("As senhas não são iguais!");
			} else {
				confirm_password.setCustomValidity("");
			}
		},

		async signinapi() {
			this.load = true;
			const form = document.getElementById('form');
			const formData = new FormData(form);
			const result = await http.post('nova-senha/', formData);
			setTimeout(() => {
				this.load = false;
			}, 200)
			if (result.data.status == 'errors') {
				notifyError(result.data.message);
			} else {
				localStorage.removeItem('tokenPassword');
				notifySuccess(result.data.message);
				setTimeout(() => {
					this.$router.push({
						path: '/login'
					})
				}, 2000)
			}
		}
	},
	mounted() {
		var password = document.getElementById("password-input");
		password.onchange = this.validatePassword;
		document.querySelectorAll("form .auth-pass-inputgroup")
			.forEach(function (item) {
				item.querySelectorAll(".password-addon").forEach(function (subitem) {
					subitem.addEventListener("click", function () {
						var passwordInput = item.querySelector(".password-input");
						if (passwordInput.type === "password") {
							passwordInput.type = "text";
						} else {
							passwordInput.type = "password";
						}
					});
				});
			});


		var myInput = document.getElementById("password-input");
		var letter = document.getElementById("pass-lower");
		var capital = document.getElementById("pass-upper");
		var number = document.getElementById("pass-number");
		var length = document.getElementById("pass-length");

		// When the user starts to type something inside the password field
		myInput.onkeyup = function () {
			// Validate lowercase letters
			var lowerCaseLetters = /[a-z]/g;
			if (myInput.value.match(lowerCaseLetters)) {
				letter.classList.remove("invalid");
				letter.classList.add("valid");
			} else {
				letter.classList.remove("valid");
				letter.classList.add("invalid");
			}

			// Validate capital letters
			var upperCaseLetters = /[A-Z]/g;
			if (myInput.value.match(upperCaseLetters)) {
				capital.classList.remove("invalid");
				capital.classList.add("valid");
			} else {
				capital.classList.remove("valid");
				capital.classList.add("invalid");
			}

			// Validate numbers
			var numbers = /[0-9]/g;
			if (myInput.value.match(numbers)) {
				number.classList.remove("invalid");
				number.classList.add("valid");
			} else {
				number.classList.remove("valid");
				number.classList.add("invalid");
			}

			// Validate length
			if (myInput.value.length >= 8) {
				length.classList.remove("invalid");
				length.classList.add("valid");
			} else {
				length.classList.remove("valid");
				length.classList.add("invalid");
			}
		};
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
								<b-link href="/" class="d-inline-block auth-logo">
									<img src="@/assets/images/logo-light.png" alt="" height="20">
								</b-link>
							</div>
							<p class="mt-3 fs-15 fw-medium">Premium Admin & Dashboard Template</p>
						</div>
					</b-col>
				</b-row>

				<b-row class="justify-content-center">
					<b-col md="8" lg="6" xl="5">
						<b-card no-body class="mt-4">

							<b-card-body class="p-4">
								<div class="text-center mt-2">
									<h5 class="text-primary">Criar Nova Senha</h5>
								</div>

								<div class="p-2">
									<form id="form" @submit.prevent="validatePassword">
										<input type="hidden" name="token" id="tokenPassword" :value="tokenPassword">
										<div class="mb-3">
											<label class="form-label" for="code">Código de Verificação</label>
											<div class="position-relative auth-pass-inputgroup mb-3">
												<input type="text" class="form-control pe-5" name="code"
													   placeholder="0 - 0 - 0 - 0 - 0 - 0"
													   v-maska="'# - # - #- # - # - #'"
													   id="code" required>
											</div>
										</div>

										<div class="mb-3">
											<label class="form-label" for="password-input">Nova Senha</label>
											<div class="position-relative auth-pass-inputgroup">
												<input type="password" class="form-control pe-5 password-input"
													   onpaste="return false" placeholder="Nova Senha" name="password"
													   id="password-input" aria-describedby="passwordInput"
													   pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required>
												<b-button variant="link"
														  class="position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
														  type="button" id="password-addon"><i
													class="ri-eye-fill align-middle"></i>
												</b-button>
											</div>
											<div id="passwordInput" class="form-text">Deve ter pelo menos 8 caracteres.
											</div>
										</div>

										<div class="mb-3">
											<label class="form-label" for="confirm-password">Confirmar
												Senha</label>
											<div class="position-relative auth-pass-inputgroup mb-3">
												<input type="password" class="form-control pe-5 password-input"
													   onpaste="return false" placeholder="Confirmar Senha"
													   pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" name="password2"
													   id="confirm-password" required>
												<b-button variant="link"
														  class="position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
														  type="button" id="confirm-password-input"><i
													class="ri-eye-fill align-middle"></i>
												</b-button>
											</div>
										</div>

										<div id="password-contain" class="p-3 bg-light mb-2 rounded">
											<h5 class="fs-13">A Senha deve conter:</h5>
											<p id="pass-length" class="invalid fs-12 mb-2">Mínimo de <b>8 caracteres</b>
											</p>
											<p id="pass-lower" class="invalid fs-12 mb-2">Letras <b>minúsculas</b> (a-z)
											</p>
											<p id="pass-upper" class="invalid fs-12 mb-2">Pelo menos uma letra <b>Maiúscula</b>
												(A-Z)</p>
											<p id="pass-number" class="invalid fs-12 mb-0">Pelo menos um <b>numero</b>
												(0-9)
											</p>
										</div>

										<div class="mt-4">
											<b-button variant="secondary" class="w-100" @click="signinapi"
													  type="submit">
												<span class="d-flex align-items-center margin-load">
													<span class="flex-grow-1 m-r-10">
													  	Recuperar Senha
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