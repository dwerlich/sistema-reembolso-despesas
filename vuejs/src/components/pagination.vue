<script>

export default {
	props: ['total', 'session', 'limit', 'index'],
	data() {
		const data = JSON.parse(localStorage.getItem(this.session));
		return {
			get: data.module + 'GET_' + this.session.toUpperCase(),
			pagIndex: this.index
		}
	},
	methods: {
		async addValue() {
			if (this.current < this.totalPages) {
				let obj = JSON.parse(localStorage.getItem(this.session));
				obj.paramns.index++;
				localStorage.setItem(this.session, JSON.stringify(obj));
				await this.$store.dispatch(this.get);
				this.scrooll();
				++this.pagIndex;
			}
		},
		async subtractValue() {
			if (this.current > 1) {
				let obj = JSON.parse(localStorage.getItem(this.session));
				obj.paramns.index--;
				localStorage.setItem(this.session, JSON.stringify(obj));
				await this.$store.dispatch(this.get);
				this.scrooll();
				--this.pagIndex;
			}
		},
		async setValue(value) {
			if (value !== '...') {
				let obj = JSON.parse(localStorage.getItem(this.session));
				obj.paramns.index = value;
				localStorage.setItem(this.session, JSON.stringify(obj));
				await this.$store.dispatch(this.get);
				this.scrooll();
				this.pagIndex = value;
			}
		},
		scrooll() {
			const elemento = document.getElementById('limitFilter');
			const altura = elemento.offsetHeight;
			window.scrollTo(0, altura + 250);
		}
	},
	computed: {
		current() {
			return this.pagIndex ? this.pagIndex + 1 : 1
		},
		totalPages() {
			return Math.ceil(this.total / this.limit);
		},
		pages() {
			const totalPages = Math.ceil(this.total / this.limit);

			if (totalPages <= 1) return [1];

			let arr = [];
			if (totalPages < 5) {
				for (let i = 1; i <= totalPages; i++) {
					arr.push(i)
				}
			} else {
				if (this.current > 3) {
					arr.push('...');
				}

				if (this.current < 3) {
					for (let i = 1; i <= 5; i++) {
						arr.push(i)
					}
				} else if (this.current >= 3 && this.current < totalPages - 1) {
					for (let i = this.current - 2; i <= this.current + 2; i++) {
						arr.push(i)
					}
				} else if (this.current >= totalPages - 1) {
					for (let i = totalPages - 4; i <= totalPages; i++) {
						arr.push(i)
					}
				}


				if (this.current < totalPages - 2) {
					arr.push('...');
				}
			}

			return arr;
		}
	}
}

</script>
<!--eslint-disable no-mixed-spaces-and-tabs-->
<template>
	<ul class="pagination justify-content-end pagination-primary"
		id="paginationUsers" style="top: auto">

		<li class="page-item pointer " :class="this.pagIndex === 0 ? 'disabled' : ''" @click="subtractValue">
			<a class="page-link">Anterior</a>
		</li>
		<li v-for="page in this.pages"
			:class="page == this.current ? 'active' : ''"
			:key="page"
			@click="setValue(page - 1)"
			class="page-item pointer">
			<a class="page-link">{{ page }}</a>
		</li>
		<li class="page-item pointer"
            :class="this.current === this.totalPages || (this.current == 1 && this.totalPages == 0 ) ? 'disabled' : ''" @click="addValue">
			<a class="page-link">Próximo</a>
		</li>
	</ul>


</template>