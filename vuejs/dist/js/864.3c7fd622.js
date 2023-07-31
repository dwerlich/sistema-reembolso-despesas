"use strict";(self["webpackChunkinnovare"]=self["webpackChunkinnovare"]||[]).push([[864],{9361:function(t,e,s){s.d(e,{Z:function(){return h}});var i=s(6252),l=s(6612);const a={class:"page-title-box d-sm-flex align-items-center justify-content-between"},o={class:"mb-sm-0"},r={class:"page-title-right"},n={class:"breadcrumb m-0"};function d(t,e,s,d,c,u){const m=(0,i.up)("b-link"),h=(0,i.up)("router-link"),p=(0,i.up)("b-col"),g=(0,i.up)("b-row");return(0,i.wg)(),(0,i.j4)(g,null,{default:(0,i.w5)((()=>[(0,i.Wm)(p,{cols:"12"},{default:(0,i.w5)((()=>[(0,i._)("div",a,[(0,i._)("h4",o,(0,l.zw)(s.title),1),(0,i._)("div",r,[(0,i._)("ol",n,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(s.items,((t,e)=>((0,i.wg)(),(0,i.iD)("li",{class:(0,l.C_)(["breadcrumb-item",{active:t[0]}]),key:e},[t.href?((0,i.wg)(),(0,i.j4)(h,{key:1,to:t.href},{default:(0,i.w5)((()=>[(0,i.Wm)(m,null,{default:(0,i.w5)((()=>[(0,i.Uk)((0,l.zw)(t.text),1)])),_:2},1024)])),_:2},1032,["to"])):((0,i.wg)(),(0,i.j4)(m,{key:0,href:"javascript: void(0);"},{default:(0,i.w5)((()=>[(0,i.Uk)((0,l.zw)(t.text),1)])),_:2},1024))],2)))),128))])])])])),_:1})])),_:1})}var c={components:{},props:{title:{type:String,default:""},items:{type:Array,default:()=>[]}}},u=s(3744);const m=(0,u.Z)(c,[["render",d]]);var h=m},4080:function(t,e,s){s.d(e,{Z:function(){return f}});var i=s(6252),l=s(6612);const a={class:"pagination justify-content-end pagination-primary",id:"paginationUsers",style:{top:"auto"}},o=(0,i._)("a",{class:"page-link"},"Anterior",-1),r=[o],n=["onClick"],d={class:"page-link"},c=(0,i._)("a",{class:"page-link"},"Próximo",-1),u=[c];function m(t,e,s,o,c,m){return(0,i.wg)(),(0,i.iD)("ul",a,[(0,i._)("li",{class:(0,l.C_)(["page-item pointer",0===this.pagIndex?"disabled":""]),onClick:e[0]||(e[0]=(...t)=>m.subtractValue&&m.subtractValue(...t))},r,2),((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(this.pages,(t=>((0,i.wg)(),(0,i.iD)("li",{class:(0,l.C_)([t==this.current?"active":"","page-item pointer"]),key:t,onClick:e=>m.setValue(t-1)},[(0,i._)("a",d,(0,l.zw)(t),1)],10,n)))),128)),(0,i._)("li",{class:(0,l.C_)(["page-item pointer",this.current===this.totalPages||1==this.current&&0==this.totalPages?"disabled":""]),onClick:e[1]||(e[1]=(...t)=>m.addValue&&m.addValue(...t))},u,2)])}s(7658);var h={props:["total","session","limit","index"],data(){const t=JSON.parse(localStorage.getItem(this.session));return{get:t.module+"GET_"+this.session.toUpperCase(),pagIndex:this.index}},methods:{async addValue(){if(this.current<this.totalPages){let t=JSON.parse(localStorage.getItem(this.session));t.paramns.index++,localStorage.setItem(this.session,JSON.stringify(t)),await this.$store.dispatch(this.get),this.scrooll(),++this.pagIndex}},async subtractValue(){if(this.current>1){let t=JSON.parse(localStorage.getItem(this.session));t.paramns.index--,localStorage.setItem(this.session,JSON.stringify(t)),await this.$store.dispatch(this.get),this.scrooll(),--this.pagIndex}},async setValue(t){if("..."!==t){let e=JSON.parse(localStorage.getItem(this.session));e.paramns.index=t,localStorage.setItem(this.session,JSON.stringify(e)),await this.$store.dispatch(this.get),this.scrooll(),this.pagIndex=t}},scrooll(){const t=document.getElementById("limitFilter"),e=t.offsetHeight;window.scrollTo(0,e+250)}},computed:{current(){return this.pagIndex?this.pagIndex+1:1},totalPages(){return Math.ceil(this.total/this.limit)},pages(){const t=Math.ceil(this.total/this.limit);if(t<=1)return[1];let e=[];if(t<5)for(let s=1;s<=t;s++)e.push(s);else{if(this.current>3&&e.push("..."),this.current<3)for(let t=1;t<=5;t++)e.push(t);else if(this.current>=3&&this.current<t-1)for(let t=this.current-2;t<=this.current+2;t++)e.push(t);else if(this.current>=t-1)for(let s=t-4;s<=t;s++)e.push(s);this.current<t-2&&e.push("...")}return e}}},p=s(3744);const g=(0,p.Z)(h,[["render",m]]);var f=g},2980:function(t,e,s){s.d(e,{Z:function(){return $}});var i=s(6252),l=s(8061),a=s(6612);const o={class:"row"},r=(0,i._)("b",null,[(0,i._)("i",{class:"mdi mdi-plus"})],-1),n={key:1,class:"col text-end"},d={class:"row align-items-center mt-4"},c=(0,i._)("div",{class:"col-auto"},[(0,i._)("span",null,"Exibir ")],-1),u={class:"col-auto"},m=(0,i._)("option",{value:"25"},"25",-1),h=(0,i._)("option",{value:"50"},"50",-1),p=(0,i._)("option",{value:"100"},"100",-1),g=(0,i._)("option",{value:"250"},"250",-1),f=[m,h,p,g],b=(0,i._)("div",{class:"col-auto"},[(0,i._)("span",null," registros")],-1),_={class:"live-preview"},w={class:"table-responsive-xl"},v={id:"formLeadsCheck"},y={class:"table table-striped align-middle mb-0",id:"table",style:{position:"relative"}},k=(0,i._)("span",{class:"spinner spinner-border flex-shrink-0",id:"spinnerTable",role:"status"},[(0,i._)("span",{class:"visually-hidden"})],-1),I={class:"row"},x={class:"col text-center mt-2"},S=(0,i._)("span",{class:"visually-hidden"},"Loading...",-1),C=[S],M={class:"row text-end mt-3"},O={"aria-label":"..."};function T(t,e,s,m,h,p){const g=(0,i.up)("b-button"),S=(0,i.up)("b-col"),T=(0,i.up)("b-card-header"),W=(0,i.up)("b-card-body"),E=(0,i.up)("b-card"),J=(0,i.up)("b-modal");return(0,i.wg)(),(0,i.iD)(i.HY,null,[(0,i.Wm)(E,{"no-body":""},{default:(0,i.w5)((()=>[(0,i.Wm)(T,null,{default:(0,i.w5)((()=>[(0,i._)("form",{id:"filter",onSubmit:e[3]||(e[3]=(0,l.iM)(((...t)=>p.filterTable&&p.filterTable(...t)),["prevent"]))},[(0,i._)("div",o,[s.title?((0,i.wg)(),(0,i.j4)(S,{key:0,md:this.col||"2",class:"d-flex my-1"},{default:(0,i.w5)((()=>[(0,i.Wm)(g,{variant:"primary",onClick:e[0]||(e[0]=t=>h.showModal=!h.showModal),style:{width:"150px","white-space":"nowrap"},class:"m-r-10"},{default:(0,i.w5)((()=>[r,(0,i.Uk)(" "+(0,a.zw)(this.title),1)])),_:1})])),_:1},8,["md"])):(0,i.kq)("",!0),(0,i.WI)(t.$slots,"form-filter"),!0===this.filter?((0,i.wg)(),(0,i.iD)("div",n,[(0,i._)("button",{class:"btn btn-secondary mx-1 my-1",type:"reset",onClick:e[1]||(e[1]=(...t)=>p.resetTable&&p.resetTable(...t))}," Limpar "),(0,i._)("a",{class:"btn btn-primary mx-1 my-1 text-white",onClick:e[2]||(e[2]=(...t)=>p.filterTable&&p.filterTable(...t))},"Buscar")])):(0,i.kq)("",!0)])],32)])),_:3}),(0,i.Wm)(W,null,{default:(0,i.w5)((()=>[(0,i._)("div",d,[c,(0,i._)("div",u,[(0,i._)("select",{class:"form-control form-select",id:"limitFilter",onChange:e[4]||(e[4]=(...t)=>p.getLimit&&p.getLimit(...t))},f,32)]),b]),(0,i.WI)(t.$slots,"total"),(0,i._)("div",_,[(0,i._)("div",w,[(0,i._)("form",v,[(0,i._)("table",y,[(0,i._)("thead",null,[(0,i._)("tr",null,[(0,i.WI)(t.$slots,"t-head")])]),(0,i.WI)(t.$slots,"t-body"),k])])]),(0,i._)("div",I,[(0,i._)("div",x,[(0,i._)("div",{class:(0,a.C_)([{invisible:!h.loadTable},"spinner-border text-primary avatar-sm"]),role:"status",style:{position:"absolute",display:"block",right:"50%"}},C,2)])]),(0,i._)("div",M,[(0,i._)("nav",O,[(0,i.WI)(t.$slots,"pagination")])])])])),_:3})])),_:3}),(0,i.Wm)(J,{modelValue:h.showModal,"onUpdate:modelValue":e[6]||(e[6]=t=>h.showModal=t),centered:"",size:this.size||"md",title:"Cadastrar "+this.title,class:"v-modal-custom",scrollable:"",onHidden:p.resetModal,id:"modalRegister"},{footer:(0,i.w5)((()=>[(0,i.Wm)(g,{type:"button",id:"closeModalRegister",variant:"danger",onClick:e[5]||(e[5]=t=>h.showModal=!1)},{default:(0,i.w5)((()=>[(0,i.Uk)("Cancelar ")])),_:1}),(0,i.Wm)(g,{type:"submit",variant:"primary",id:"save",onClick:p.validation},{default:(0,i.w5)((()=>[(0,i.Uk)("Salvar")])),_:1},8,["onClick"])])),default:(0,i.w5)((()=>[(0,i.WI)(t.$slots,"form-modal")])),_:3},8,["modelValue","size","title","onHidden"])],64)}var W=s(9946),E={props:["session","title","size","col","filter"],emits:["resetModal"],data(){const t=JSON.parse(localStorage.getItem(this.session));let e=t.module+"REGISTER_"+this.session.toUpperCase(),s=t.module+"GET_"+this.session.toUpperCase();return{loadTable:!1,total:1,showModal:!1,register:e,get:s}},methods:{submitForm(){try{const t=document.getElementById("form"),e=new FormData(t);this.$store.dispatch(this.register,e)}catch(t){console.log(t)}},modalShow(){this.showModal=!0},validation(){(0,W.Av)("form","save"),(0,W.hY)("form")?this.submitForm():(0,W.E9)("form","save")},getLimit(){let t=JSON.parse(localStorage.getItem(this.session));t.paramns.index=0,t.paramns.limit=document.getElementById("limitFilter").value,localStorage.setItem(this.session,JSON.stringify(t)),this.$store.dispatch(this.get)},resetModal(){document.getElementById("spinner").style.display="none",this.$emit("resetModal"),this.load=!1,this.showModal=!1},getFilter(){const t=JSON.parse(localStorage.getItem(this.session)),e=Object.keys(t.paramns),s=["index","sector","toView","limit","order","seq"];for(let i=0;i<e.length;i++)if(s.indexOf(e[i])<0){const s=document.getElementById(e[i]+"Filter");s&&(s.value=t.paramns[e[i]])}},resetTable(){document.getElementById("filter").reset(),this.filterTable()},filterTable(){let t=JSON.parse(localStorage.getItem(this.session));const e=Object.keys(t.paramns);for(let s=0;s<e.length;s++)document.getElementById(e[s]+"Filter")&&(t.paramns[e[s]]=document.getElementById(e[s]+"Filter").value);t.paramns.index=0,localStorage.setItem(this.session,JSON.stringify(t)),this.$store.dispatch(this.get)}},mounted(){this.getFilter()}},J=s(3744);const N=(0,J.Z)(E,[["render",T]]);var $=N}}]);
//# sourceMappingURL=864.3c7fd622.js.map