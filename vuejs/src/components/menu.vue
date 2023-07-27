<script>
import {
    layoutComputed
} from "@/state/helpers";


export default {

    data() {
        return {
            settings: {
                minScrollbarLength: 60,
            },
        };
    },
    computed: {
        ...layoutComputed,
        layoutType: {
            get() {
                return this.$store ? this.$store.state.layout.layoutType : {} || {};
            },
        },
    },

    watch: {
        $route: {
            handler: "onRoutechange",
            immediate: true,
            deep: true,
        },
    },

    mounted() {
        if (document.querySelectorAll(".navbar-nav .collapse")) {
            let collapses = document.querySelectorAll(".navbar-nav .collapse");

            collapses.forEach((collapse) => {
                // Hide sibling collapses on `show.bs.collapse`
                collapse.addEventListener("show.bs.collapse", (e) => {
                    e.stopPropagation();
                    let closestCollapse = collapse.parentElement.closest(".collapse");
                    if (closestCollapse) {
                        let siblingCollapses =
                            closestCollapse.querySelectorAll(".collapse");
                        siblingCollapses.forEach((siblingCollapse) => {
                            if (siblingCollapse.classList.contains("show")) {
                                siblingCollapse.classList.remove("show");
                                siblingCollapse.parentElement.firstChild.setAttribute("aria-expanded", "false");
                            }
                        });
                    } else {
                        let getSiblings = (elem) => {
                            // Setup siblings array and get the first sibling
                            let siblings = [];
                            let sibling = elem.parentNode.firstChild;
                            // Loop through each sibling and push to the array
                            while (sibling) {
                                if (sibling.nodeType === 1 && sibling !== elem) {
                                    siblings.push(sibling);
                                }
                                sibling = sibling.nextSibling;
                            }
                            return siblings;
                        };
                        let siblings = getSiblings(collapse.parentElement);
                        siblings.forEach((item) => {
                            if (item.childNodes.length > 2) {
                                item.firstElementChild.setAttribute("aria-expanded", "false");
                                item.firstElementChild.classList.remove("active");
                            }
                            let ids = item.querySelectorAll("*[id]");
                            ids.forEach((item1) => {
                                item1.classList.remove("show");
                                item1.parentElement.firstChild.setAttribute("aria-expanded", "false");
                                item1.parentElement.firstChild.classList.remove("active");
                                if (item1.childNodes.length > 2) {
                                    let val = item1.querySelectorAll("ul li a");

                                    val.forEach((subitem) => {
                                        if (subitem.hasAttribute("aria-expanded"))
                                            subitem.setAttribute("aria-expanded", "false");
                                    });
                                }
                            });
                        });
                    }
                });

                // Hide nested collapses on `hide.bs.collapse`
                collapse.addEventListener("hide.bs.collapse", (e) => {
                    e.stopPropagation();
                    let childCollapses = collapse.querySelectorAll(".collapse");
                    childCollapses.forEach((childCollapse) => {
                        let childCollapseInstance = childCollapse;
                        childCollapseInstance.classList.remove("show");
                        childCollapseInstance.parentElement.firstChild.setAttribute("aria-expanded", "false");
                    });
                });
            });
        }
    },

    methods: {
        onRoutechange(ele) {
            this.initActiveMenu(ele.path);
            if (document.getElementsByClassName("mm-active").length > 0) {
                const currentPosition = document.getElementsByClassName("mm-active")[0].offsetTop;
                if (currentPosition > 500)
                    if (this.$refs.isSimplebar)
                        this.$refs.isSimplebar.value.getScrollElement().scrollTop = currentPosition + 300;
            }
        },

        initActiveMenu(ele) {
            setTimeout(() => {
                if (document.querySelector("#navbar-nav")) {
                    let a = document.querySelector("#navbar-nav").querySelector('[href="' + ele + '"]');
                    if (a) {
                        a.classList.add("active");
                        let parentCollapseDiv = a.closest(".collapse.menu-dropdown");
                        if (parentCollapseDiv) {
                            parentCollapseDiv.classList.add("show");
                            parentCollapseDiv.parentElement.children[0].classList.add("active");
                            parentCollapseDiv.parentElement.children[0].setAttribute("aria-expanded", "true");
                            if (parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown")) {
                                parentCollapseDiv.parentElement.closest(".collapse").classList.add("show");
                                if (parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling)
                                    parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling.classList.add("active");
                                const grandparent = parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling.parentElement.closest(".collapse");
                                if (grandparent && grandparent && grandparent.previousElementSibling) {
                                    grandparent.previousElementSibling.classList.add("active");
                                    grandparent.classList.add("show");
                                }
                            }
                        }
                    }
                }
            }, 0);
        },
    },
};
</script>

<template>
    <b-container fluid>
            <ul class="navbar-nav h-100" id="navbar-nav">
                <li class="nav-item">
                    <router-link class="nav-link menu-link" to="/">
                        <i class="mdi mdi-speedometer"></i>
                        <span>Dashboard</span>
                    </router-link>
                </li>

                <li class="nav-item">
                    <b-link class="nav-link menu-link" href="#registerApps" data-bs-toggle="collapse" role="button"
                            aria-expanded="false" aria-controls="registerApps">
                        <i class="mdi mdi-cogs"></i>
                        <span >Cadastro</span>
                    </b-link>
                    <div class="collapse menu-dropdown" id="registerApps">
                        <ul class="nav nav-sm flex-column">
                            <li class="nav-item">
                                <router-link to="/cadastro/usuarios" class="nav-link">
                                    Usuários</router-link>
                            </li>
                        </ul>
                    </div>
                </li>

                <li class="nav-item">
                    <router-link class="nav-link menu-link" to="/">
                        <i class="mdi mdi-target"></i>
                        <span>Horários</span>
                    </router-link>
                </li>
            </ul>
    </b-container>
</template>