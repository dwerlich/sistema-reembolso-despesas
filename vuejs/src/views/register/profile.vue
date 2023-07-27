<script>
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import axios from 'axios';
import Layout from "../../layouts/main.vue";
import appConfig from "../../../app.config.json";

export default {
	page: {
		title: "Setting",
		meta: [{
			name: "description",
			content: appConfig.description
		}],
	},
	data() {
		return {
			title: "Setting",
			items: [{
				text: "Velzon",
				href: "/",
			},
				{
					text: "Setting",
					active: true,
				},
			],
			value: ['javascript'],
			date: null,
			user: JSON.parse(localStorage.getItem('user'))
		};
	},
	components: {
		Layout,
		Multiselect,
		flatPickr
	},
	methods: {
		changepass() {
			var data = {
				password: document.getElementById('oldpasswordInput').value,
				new_password: document.getElementById('newpasswordInput').value,
				confirm_password: document.getElementById('confirmpasswordInput').value
			};
			axios.patch('https://api-node.themesbrand.website/updatepassword', data).then((data) => {
				console.log(data);
			}).catch((e) => {
				console.log(e);
			});
		},
		updatedata() {
			var userid = localStorage.getItem('userid');
			var data = {
				first_name: document.getElementById('firstnameInput').value,
				last_name: document.getElementById('lastnameInput').value,
				phone: document.getElementById('phonenumberInput').value,
				email: document.getElementById('emailInput').value,
				joining_date: document.getElementById('dateinput').value,
				skills: document.getElementById('skillsinput').value,
				designation: document.getElementById('designationInput').value,
				website: document.getElementById('websiteInput1').value,
				city: document.getElementById('cityInput').value,
				country: document.getElementById('countryInput').value,
				zipcode: document.getElementById('zipcodeInput').value,
				Description: document.getElementById('exampleFormControlTextarea').value,
			};
			axios.patch('https://api-node.themesbrand.website/user/' + userid, data).then((data) => {
				console.log(data);
			}).catch((e) => {
				console.log(e);
			});
		}
	},
};
</script>
<!--eslint-disable no-mixed-spaces-and-tabs-->
<template>
	<Layout>
		<div class="position-relative mx-n4 mt-n4">
			<div class="profile-wid-bg profile-setting-img">
				<img src="@/assets/images/profile-bg.jpg" class="profile-wid-img" alt=""/>
				<div class="overlay-content">
					<div class="text-end p-3">
						<div class="p-0 ms-auto rounded-circle profile-photo-edit">
							<input id="profile-foreground-img-file-input" type="file"
								   class="profile-foreground-img-file-input"/>
							<label for="profile-foreground-img-file-input" class="profile-photo-edit btn btn-light">
								<i class="ri-image-edit-line align-bottom me-1"></i> Change
								Cover
							</label>
						</div>
					</div>
				</div>
			</div>
		</div>

		<b-row>
			<b-col xxl="3">
				<b-card no-body class="mt-n5">
					<b-card-body class="p-4">
						<div class="text-center">
							<div class="
                  profile-user
                  position-relative
                  d-inline-block
                  mx-auto
                  mb-4
                ">
								<img :src="'http://localhost/geind-fluxo-de-caixa/uploads/' + user._img" class="
                    rounded-circle
                    avatar-xl
                    img-thumbnail
                    user-profile-image
                  " alt="user-profile-image"/>
								<div class="avatar-xs p-0 rounded-circle profile-photo-edit">
									<input id="profile-img-file-input" type="file" class="profile-img-file-input"/>
									<label for="profile-img-file-input" class="profile-photo-edit avatar-xs">
                    <span class="avatar-title rounded-circle bg-light text-body">
                      <i class="ri-camera-fill"></i>
                    </span>
									</label>
								</div>
							</div>
							<h5 class="fs-16 mb-1">{{ user._name }}</h5>
							<p class="text-muted mb-0">{{ user._typeStr }}</p>
						</div>
					</b-card-body>
				</b-card>
			</b-col>
			<b-col xxl="9">
				<b-card no-body class="mt-xxl-n5">
					<b-card-header>
						<ul class="nav nav-tabs-custom rounded card-header-tabs border-bottom-0" role="tablist">
							<li class="nav-item">
								<b-link class="nav-link active" data-bs-toggle="tab" href="#personalDetails" role="tab">
									<i class="fas fa-home"></i>
									Dados Pessoais
								</b-link>
							</li>
							<li class="nav-item">
								<b-link class="nav-link" data-bs-toggle="tab" href="#changePassword" role="tab">
									<i class="far fa-user"></i>
									Alterar Senha
								</b-link>
							</li>
						</ul>
					</b-card-header>
					<b-card-body class="p-4">
						<div class="tab-content">
							<div class="tab-pane active" id="personalDetails" role="tabpanel">
								<form action="javascript:void(0);">
									<b-row>
										<b-col lg="6">
											<div class="mb-3">
												<label for="firstnameInput" class="form-label">First Name</label>
												<input type="text" class="form-control" id="firstnameInput"
													   placeholder="Enter your firstname"
													   value="Dave"/>
											</div>
										</b-col>
										<b-col lg="6">
											<div class="mb-3">
												<label for="lastnameInput" class="form-label">Last Name</label>
												<input type="text" class="form-control" id="lastnameInput"
													   placeholder="Enter your lastname"
													   value="Adame"/>
											</div>
										</b-col>
										<b-col lg="6">
											<div class="mb-3">
												<label for="phonenumberInput" class="form-label">Phone Number</label>
												<input type="text" class="form-control" id="phonenumberInput"
													   placeholder="Enter your phone number" value="+(1) 987 6543"/>
											</div>
										</b-col>
										<b-col lg="6">
											<div class="mb-3">
												<label for="emailInput" class="form-label">Email Address</label>
												<input type="email" class="form-control" id="emailInput"
													   placeholder="Enter your email"
													   value="daveadame@velzon.com"/>
											</div>
										</b-col>
										<b-col lg="12">
											<div class="mb-3">
												<label for="JoiningdatInput" class="form-label">Joining Date</label>

												<flat-pickr v-model="date" id="dateinput"
															class="form-control"></flat-pickr>

											</div>
										</b-col>
										<b-col lg="12">
											<div class="mb-3">
												<label for="skillsInput" class="form-label">Skills</label>
												<Multiselect v-model="value" id="skillsinput" mode="tags"
															 :close-on-select="false"
															 :searchable="true" :create-option="true" :options="[
                            { value: 'illustrator', label: 'Illustrator' },
                            { value: 'photoshop', label: 'Photoshop' },
                            { value: 'css', label: 'CSS' },
                            { value: 'html', label: 'HTML' },
                            { value: 'javascript', label: 'Javascript' },
                            { value: 'python', label: 'Python' },
                            { value: 'php', label: 'PHP' },
                          ]"/>
											</div>
										</b-col>
										<b-col lg="6">
											<div class="mb-3">
												<label for="designationInput" class="form-label">Designation</label>
												<input type="text" class="form-control" id="designationInput"
													   placeholder="Designation"
													   value="Lead Designer / Developer"/>
											</div>
										</b-col>
										<b-col lg="6">
											<div class="mb-3">
												<label for="websiteInput1" class="form-label">Website</label>
												<input type="text" class="form-control" id="websiteInput1"
													   placeholder="www.example.com"
													   value="www.velzon.com"/>
											</div>
										</b-col>
										<b-col lg="4">
											<div class="mb-3">
												<label for="cityInput" class="form-label">City</label>
												<input type="text" class="form-control" id="cityInput"
													   placeholder="City" value="California"/>
											</div>
										</b-col>
										<b-col lg="4">
											<div class="mb-3">
												<label for="countryInput" class="form-label">Country</label>
												<input type="text" class="form-control" id="countryInput"
													   placeholder="Country"
													   value="United States"/>
											</div>
										</b-col>
										<b-col lg="4">
											<div class="mb-3">
												<label for="zipcodeInput" class="form-label">Zip Code</label>
												<input type="text" class="form-control" minlength="5" maxlength="6"
													   id="zipcodeInput"
													   placeholder="Enter zipcode" value="90011"/>
											</div>
										</b-col>
										<b-col lg="12">
											<div class="mb-3 pb-2">
												<label for="exampleFormControlTextarea"
													   class="form-label">Description</label>
												<textarea class="form-control" id="exampleFormControlTextarea"
														  placeholder="Enter your description" rows="3">
Hi I'm Anna Adame,It will be as simple as Occidental; in fact, it will be Occidental. To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is European languages are members of the same family.</textarea>
											</div>
										</b-col>
										<b-col lg="12">
											<div class="hstack gap-2 justify-content-end">
												<b-button type="submit" variant="secondary" @click="updatedata">
													Updates
												</b-button>
												<b-button type="button" variant="soft-danger">
													Cancel
												</b-button>
											</div>
										</b-col>
									</b-row>
								</form>
							</div>
							<div class="tab-pane" id="changePassword" role="tabpanel">
								<form action="javascript:void(0);">
									<b-row class="g-2">
										<b-col lg="4">
											<div>
												<label for="oldpasswordInput" class="form-label">Old Password*</label>
												<input type="password" class="form-control" id="oldpasswordInput"
													   placeholder="Enter current password"/>
											</div>
										</b-col>
										<b-col lg="4">
											<div>
												<label for="newpasswordInput" class="form-label">New Password*</label>
												<input type="password" class="form-control" id="newpasswordInput"
													   placeholder="Enter new password"/>
											</div>
										</b-col>
										<b-col lg="4">
											<div>
												<label for="confirmpasswordInput" class="form-label">Confirm
													Password*</label>
												<input type="password" class="form-control" id="confirmpasswordInput"
													   placeholder="Confirm password"/>
											</div>
										</b-col>
										<b-col lg="12">
											<div class="mb-3">
												<router-link to="/recuperar-senha" class="link-primary text-decoration-underline">
													Esqueceu a senha?
												</router-link>
											</div>
										</b-col>
										<b-col lg="12">
											<div class="text-end">
												<b-button type="submit" variant="secondary" @click="changepass">
													Change Password
												</b-button>
											</div>
										</b-col>
									</b-row>
								</form>
								<div class="mt-4 mb-3 border-bottom pb-2">
									<div class="float-end">
										<b-link href="javascript:void(0);" class="link-primary">All Logout</b-link>
									</div>
									<h5 class="card-title">Login History</h5>
								</div>
								<div class="d-flex align-items-center mb-3">
									<div class="flex-shrink-0 avatar-sm">
										<div class="avatar-title bg-light text-primary rounded-3 fs-18">
											<i class="ri-smartphone-line"></i>
										</div>
									</div>
									<div class="flex-grow-1 ms-3">
										<h6>iPhone 12 Pro</h6>
										<p class="text-muted mb-0">
											Los Angeles, United States - March 16 at 2:47PM
										</p>
									</div>
									<div>
										<b-link href="javascript:void(0);">Logout</b-link>
									</div>
								</div>
								<div class="d-flex align-items-center mb-3">
									<div class="flex-shrink-0 avatar-sm">
										<div class="avatar-title bg-light text-primary rounded-3 fs-18">
											<i class="ri-tablet-line"></i>
										</div>
									</div>
									<div class="flex-grow-1 ms-3">
										<h6>Apple iPad Pro</h6>
										<p class="text-muted mb-0">
											Washington, United States - November 06 at 10:43AM
										</p>
									</div>
									<div>
										<b-link href="javascript:void(0);">Logout</b-link>
									</div>
								</div>
								<div class="d-flex align-items-center mb-3">
									<div class="flex-shrink-0 avatar-sm">
										<div class="avatar-title bg-light text-primary rounded-3 fs-18">
											<i class="ri-smartphone-line"></i>
										</div>
									</div>
									<div class="flex-grow-1 ms-3">
										<h6>Galaxy S21 Ultra 5G</h6>
										<p class="text-muted mb-0">
											Conneticut, United States - June 12 at 3:24PM
										</p>
									</div>
									<div>
										<b-link href="javascript:void(0);">Logout</b-link>
									</div>
								</div>
								<div class="d-flex align-items-center">
									<div class="flex-shrink-0 avatar-sm">
										<div class="avatar-title bg-light text-primary rounded-3 fs-18">
											<i class="ri-macbook-line"></i>
										</div>
									</div>
									<div class="flex-grow-1 ms-3">
										<h6>Dell Inspiron 14</h6>
										<p class="text-muted mb-0">
											Phoenix, United States - July 26 at 8:10AM
										</p>
									</div>
									<div>
										<b-link href="javascript:void(0);">Logout</b-link>
									</div>
								</div>
							</div>
						</div>
					</b-card-body>
				</b-card>
			</b-col>
		</b-row>
	</Layout>
</template>