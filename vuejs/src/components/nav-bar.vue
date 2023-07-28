<script>
import {ref} from 'vue';
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';

/**
 * Nav-bar Component
 */
export default {
	data() {
		let user = localStorage.getItem('user');
		user = JSON.parse(user);
        const img = user._img ? 'http://localhost/geind-fluxo-de-caixa/uploads/' + user._img : 'http://localhost/geind-fluxo-de-caixa/assets/img/user.png'
        const category = user.category ===1 ? 'Gestor' : 'Funcionário';
		return {
			text: null,
			flag: null,
			value: null,
			myVar: 1,
			name: user.name,
            category,
			img
		};
	},

	methods: {
		toggleHamburgerMenu() {
			var windowSize = document.documentElement.clientWidth;
			let layoutType = document.documentElement.getAttribute("data-layout");
			let visiblilityType = document.documentElement.getAttribute("data-sidebar-visibility");

			document.documentElement.setAttribute("data-sidebar-visibility", "show");

			if (windowSize > 767)
				document.querySelector(".hamburger-icon").classList.toggle("open");

			//For collapse vertical menu
			if (visiblilityType === "show" && (layoutType === "vertical" || layoutType === "semibox")) {
				if (windowSize < 1025 && windowSize > 767) {
					document.body.classList.remove("vertical-sidebar-enable");
					document.documentElement.getAttribute("data-sidebar-size") == "sm" ?
						document.documentElement.setAttribute("data-sidebar-size", "") :
						document.documentElement.setAttribute("data-sidebar-size", "sm");
				} else if (windowSize > 1025) {
					document.body.classList.remove("vertical-sidebar-enable");
					document.documentElement.getAttribute("data-sidebar-size") == "lg" ?
						document.documentElement.setAttribute("data-sidebar-size", "sm") :
						document.documentElement.setAttribute("data-sidebar-size", "lg");
				} else if (windowSize <= 767) {
					document.body.classList.add("vertical-sidebar-enable");
					document.documentElement.setAttribute("data-sidebar-size", "lg");
				}
			}
		},
		toggleMenu() {
			this.$parent.toggleMenu();
		},
		toggleDarkMode() {
			if (document.documentElement.getAttribute("data-layout-mode") == "dark") {
				document.documentElement.setAttribute("data-layout-mode", "light");
				document.documentElement.setAttribute("data-sidebar", "light");
				localStorage.setItem('mode', 'light');
			} else {
				document.documentElement.setAttribute("data-layout-mode", "dark");
				document.documentElement.setAttribute("data-sidebar", "dark");
				localStorage.setItem('mode', 'dark');
			}
		},
	},
	mounted() {

		document.addEventListener("scroll", function () {
			var pageTopbar = document.getElementById("page-topbar");
			if (pageTopbar) {
				document.body.scrollTop >= 50 || document.documentElement.scrollTop >= 50 ? pageTopbar.classList.add(
					"topbar-shadow") : pageTopbar.classList.remove("topbar-shadow");
			}
		});
		if (document.getElementById("topnav-hamburger-icon"))
			document
				.getElementById("topnav-hamburger-icon")
				.addEventListener("click", this.toggleHamburgerMenu);
	},

    setup() {

        var currentRoute = ref('');

        onMounted(() => {
            const route = useRoute();
            currentRoute.value = route.path;
        });
    }
};
</script>
<!--eslint-disable no-mixed-spaces-and-tabs-->
<template>
	<header id="page-topbar">
		<div class="layout-width">
			<div class="navbar-header">
				<div class="d-flex">
					<!-- LOGO -->
					<div class="navbar-brand-box horizontal-logo">
						<router-link to="/" class="logo logo-dark">
              <span class="logo-sm">
                <img src="@/assets/images/logo-sm.png" alt="" height="22"/>
              </span>
							<span class="logo-lg">
                <img src="@/assets/images/logo-dark.png" alt="" height="17"/>
              </span>
						</router-link>

						<router-link to="/" class="logo logo-light">
              <span class="logo-sm">
                <img src="@/assets/images/logo-sm.png" alt="" height="22"/>
              </span>
							<span class="logo-lg">
                <img src="@/assets/images/logo-light.png" alt="" height="17"/>
              </span>
						</router-link>
					</div>

					<button type="button" class="
              btn btn-sm
              px-3
              fs-16
              header-item
              vertical-menu-btn
              topnav-hamburger
            " id="topnav-hamburger-icon">
            <span class="hamburger-icon">
              <span></span>
              <span></span>
              <span></span>
            </span>
					</button>
				</div>

				<div class="d-flex align-items-center">

					<div class="ms-1 header-item d-none d-sm-flex">
						<b-button type="button" variant="ghost-secondary"
								  class="btn-icon btn-topbar rounded-circle light-dark-mode"
								  @click="toggleDarkMode">
							<i class="bx bx-moon fs-22"></i>
						</b-button>
					</div>

					<div class="dropdown ms-sm-3 header-item topbar-user">
						<button type="button" class="btn" id="page-header-user-dropdown" data-bs-toggle="dropdown"
								aria-haspopup="true" aria-expanded="false">
							  <span class="d-flex align-items-center">
									<img class="rounded-circle header-profile-user" :src="img"
										 alt="Header Avatar"/>
									<span class="text-start ms-xl-2">
									  <span class=" d-none d-xl-inline-block ms-1 fw-medium user-name-text">{{ name }}</span>
									  <span class="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">{{ category }}</span>
									</span>
							  </span>
						</button>
						<div class="dropdown-menu dropdown-menu-end">
							<h6 class="dropdown-header">Bem vindo {{ name }}!</h6>
							<router-link class="dropdown-item" to="/usuarios/meu-perfil"><i
								class="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
								<span class="align-middle">Meu Perfil</span>
							</router-link>
							<b-link class="dropdown-item" href="/logout"><i
								class="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>
								<span class="align-middle" data-key="t-logout">Sair</span>
							</b-link>
						</div>
					</div>
				</div>
			</div>
		</div>
	</header>
</template>