"use strict";(self["webpackChunkinnovare"]=self["webpackChunkinnovare"]||[]).push([[187],{9187:function(e,t,a){a.r(t),a.d(t,{default:function(){return ae}});var s=a(6252),l=a(6612);const o=(0,s._)("div",{class:"col-md-4 my-1"},[(0,s._)("input",{type:"text",class:"form-control",id:"nameFilter",placeholder:"Nome"})],-1),r=(0,s._)("div",{class:"col-md-3 my-1"},[(0,s._)("input",{type:"text",class:"form-control",id:"emailFilter",placeholder:"E-mail"})],-1),n=(0,s._)("div",{class:"col-md-3 my-1"},[(0,s._)("select",{class:"form-control form-select",id:"categoryFilter",name:"category"},[(0,s._)("option",{value:""},"Todas Categorias"),(0,s._)("option",{value:"1"},"Gestor"),(0,s._)("option",{value:"2"},"Funcionário")])],-1),i={class:"row"},d={class:"col mt-5"},c=(0,s._)("th",null,"Nome",-1),m=(0,s._)("th",{class:"text-center"},"E-mail",-1),u=(0,s._)("th",{class:"text-center"},"Categoria",-1),p=(0,s._)("th",{class:"text-center"},"Ações",-1),f={key:0},_=["id"],g={class:"text-center"},w={class:"text-center"},h={class:"text-center"},y=["onClick"],v=["onClick"],x=["id"],b=(0,s._)("span",{class:"visually-hidden"},null,-1),k=[b],C={key:1},B=(0,s._)("tr",null,[(0,s._)("td",{colspan:"5",class:"text-center"},"Nenhum resultado encontrado")],-1),E=[B],D={action:"javascript:void(0);",id:"form",novalidate:""},U=(0,s._)("label",{for:"name",class:"form-label"},[(0,s.Uk)("Nome "),(0,s._)("span",{class:"text-danger"},"*")],-1),W=(0,s._)("input",{type:"text",class:"form-control",id:"name",name:"name",placeholder:"Nome",required:""},null,-1),I=(0,s._)("input",{type:"hidden",name:"id",id:"id",value:"0"},null,-1),Z=(0,s._)("label",{for:"email",class:"form-label"},[(0,s.Uk)("E-mail "),(0,s._)("span",{class:"text-danger"},"*")],-1),q=(0,s._)("input",{type:"text",class:"form-control",id:"email",name:"email",required:"",placeholder:"E-mail"},null,-1),z=(0,s._)("label",{for:"birthDate",class:"form-label"},[(0,s.Uk)("Data de Nascimento "),(0,s._)("span",{class:"text-danger"},"*")],-1),F={type:"text",class:"form-control",id:"birthDate",name:"birthDate",required:"",placeholder:"dd/mm/AAAA"},N=(0,s._)("label",{for:"category",class:"form-label"},[(0,s.Uk)("Categoria "),(0,s._)("span",{class:"text-danger"},"*")],-1),S=(0,s._)("select",{class:"form-control form-select",id:"category",name:"category",required:""},[(0,s._)("option",{value:""},"Selecione"),(0,s._)("option",{value:"1"},"Gestor"),(0,s._)("option",{value:"2"},"Funcionário")],-1),A=(0,s._)("label",{for:"password",class:"form-label"},[(0,s.Uk)("Senha "),(0,s._)("span",{class:"text-danger"},"*")],-1),M=(0,s._)("div",{class:"position-relative auth-pass-inputgroup"},[(0,s._)("input",{type:"password",class:"form-control",id:"password",name:"password",placeholder:"Digite a Senha",required:""})],-1);function L(e,t,a,b,B,L){const T=(0,s.up)("PageHeader"),P=(0,s.up)("Pagination"),R=(0,s.up)("b-col"),H=(0,s.up)("b-row"),j=(0,s.up)("TableLists"),G=(0,s.up)("Layout"),V=(0,s.Q2)("maska");return(0,s.wg)(),(0,s.j4)(G,null,{default:(0,s.w5)((()=>[(0,s.Wm)(T,{title:b.title},null,8,["title"]),(0,s.Wm)(j,{session:"Users",title:"Usuário",ref:"childComponentRef",col:"2",filter:!0,onResetModal:b.resetModal},{"form-filter":(0,s.w5)((()=>[o,r,n])),total:(0,s.w5)((()=>[(0,s._)("div",i,[(0,s._)("div",d,[(0,s._)("p",null,"Exibindo de "+(0,l.zw)(this.users.start)+" a "+(0,l.zw)(this.users.partial)+" de "+(0,l.zw)(this.users.total)+" registros",1)])])])),"t-head":(0,s.w5)((()=>[c,m,u,p])),"t-body":(0,s.w5)((()=>[this.users.message.length>0?((0,s.wg)(),(0,s.iD)("tbody",f,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(this.users.message,(e=>((0,s.wg)(),(0,s.iD)("tr",{key:e.id,id:"line"+e.id},[(0,s._)("td",null,(0,l.zw)(e.name),1),(0,s._)("td",g,(0,l.zw)(e.email),1),(0,s._)("td",w,(0,l.zw)(1==e.category?"Gestor":"Funcionario"),1),(0,s._)("td",h,[(0,s._)("i",{class:"bx bx-pencil text-info fs-14 mx-1 pointer",onClick:t=>b.getView(e.id),title:"Editar"},null,8,y),(0,s._)("i",{class:"bx bx-trash text-danger fs-14 mx-1 pointer",title:"Excluir",onClick:t=>b.confirm(e.id)},null,8,v)]),(0,s._)("span",{class:"spinner spinner-border spinner-line flex-shrink-0",id:"spinnerLine"+e.id,role:"status"},k,8,x)],8,_)))),128))])):0===this.users.total?((0,s.wg)(),(0,s.iD)("tbody",C,E)):(0,s.kq)("",!0)])),pagination:(0,s.w5)((()=>[(0,s.Wm)(P,{total:b.users.total,index:this.data.paramns.index,limit:this.data.paramns.limit,session:"Users"},null,8,["total","index","limit"])])),"form-modal":(0,s.w5)((()=>[(0,s._)("form",D,[(0,s.Wm)(H,{class:"g-3"},{default:(0,s.w5)((()=>[(0,s.Wm)(R,{lg:"12"},{default:(0,s.w5)((()=>[U,W,I])),_:1}),(0,s.Wm)(R,{lg:"12"},{default:(0,s.w5)((()=>[Z,q])),_:1}),(0,s.Wm)(R,{md:"6"},{default:(0,s.w5)((()=>[z,(0,s.wy)((0,s._)("input",F,null,512),[[V,"##/##/####"]])])),_:1}),(0,s.Wm)(R,{md:"6"},{default:(0,s.w5)((()=>[N,S])),_:1}),(0,s.Wm)(R,{md:"8",id:"passwordDiv"},{default:(0,s.w5)((()=>[A,M])),_:1})])),_:1})])])),_:1},8,["onResetModal"])])),_:1})}var T=a(2931),P=a(4433),R=a(6441),H=a(9361),j=a(3340),G=a(2980),V=a(4080),J=a(2965),K=a(9946),O=a(6455),Q=a.n(O),Y=a(9028),$=a(9035),X={page:{title:"Usuários",meta:[{name:"description",content:P.W}]},components:{BCol:j.lP,BRow:j.Tp,Layout:R.Z,PageHeader:H.Z,TableLists:G.Z,Pagination:V.Z},setup(){$.Z.dispatch("usersModule/"+J.fo);const e=()=>{document.getElementById("form").classList.remove("was-validated"),document.getElementById("form").reset(),document.getElementById("id").value=0,document.getElementById("passwordDiv").style.display="block",document.getElementById("password").required=!0},t=(0,T.iH)(null),a=async e=>{t.value.modalShow(),(0,K.Av)("form","save"),document.getElementById("password").required=!1,document.getElementById("passwordDiv").style.display="none",await Y.Z.get("usuarios/dados/"+e,{headers:{Authorization:` Bearer ${localStorage.getItem("jwt")} `}}).then((e=>{(0,K.F5)(e.data.message,"form","save")})).catch((e=>{console.error(e),(0,K.rN)(e)}))},l=e=>{Q().fire({title:"Você tem certeza?",text:"Seus dados serão removidos e não poderão mais ser recuperados.",icon:"warning",showCancelButton:!0,confirmButtonColor:"#34c38f",cancelButtonColor:"#f46a6a",cancelButtonText:"Cancelar",confirmButtonText:"Confirmar"}).then((t=>{t.value&&$.Z.dispatch("usersModule/"+J.Wx,e)}))};return{title:"Usuários",items:null,data:JSON.parse(localStorage.getItem("Users")),users:(0,s.Fl)((()=>$.Z.state.usersModule.users)),resetModal:e,getView:a,childComponentRef:t,confirm:l}}},ee=a(3744);const te=(0,ee.Z)(X,[["render",L]]);var ae=te}}]);
//# sourceMappingURL=187.a66449ac.js.map