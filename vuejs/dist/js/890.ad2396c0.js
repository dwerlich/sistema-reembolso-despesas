"use strict";(self["webpackChunkgeind"]=self["webpackChunkgeind"]||[]).push([[890],{6890:function(t,e,i){i.r(e),i.d(e,{default:function(){return Q}});var a=i(6252),n=i(6612);const l=(0,a._)("div",{class:"col-md-3 my-1"},[(0,a._)("input",{type:"text",class:"form-control",id:"nameFilter",placeholder:"Nome"})],-1),s={class:"row"},o={class:"col mt-5"},d=(0,a._)("th",null,"Nome",-1),r=(0,a._)("th",{class:"text-center"},"Unidade",-1),c=(0,a._)("th",{class:"text-center"},"Tempo Estimado",-1),u=(0,a._)("th",{class:"text-center"},"Status",-1),m=(0,a._)("th",{class:"text-center"},"Ações",-1),p={key:0},v=["id"],f={class:"text-center"},_={class:"text-center"},h={class:"text-center"},g=["onClick"],w=["onClick"],x=["id"],b=(0,a._)("span",{class:"visually-hidden"},null,-1),y=[b],k={key:1},C=(0,a._)("tr",null,[(0,a._)("td",{colspan:"5",class:"text-center"},"Nenhum resultado encontrado")],-1),B=[C],Z={action:"javascript:void(0);",id:"form",novalidate:""},A=(0,a._)("label",{for:"name"},[(0,a.Uk)("Nome "),(0,a._)("span",{class:"text-danger"},"*")],-1),I=(0,a._)("input",{id:"name",name:"name",class:"form-control",type:"text",placeholder:"Nome",required:""},null,-1),S=(0,a._)("input",{type:"hidden",id:"activityId",name:"activityId",value:"0"},null,-1),W=(0,a._)("label",{for:"duration"},[(0,a.Uk)("Tempo Estimado "),(0,a._)("span",{class:"text-danger"},"*")],-1),E=(0,a._)("input",{id:"duration",name:"duration",class:"form-control",type:"text",placeholder:"HH:mm","data-mask":"99:99",required:""},null,-1),M=(0,a._)("label",{for:"unit"},[(0,a.Uk)("Unidade "),(0,a._)("span",{class:"text-danger"},"*")],-1),T=(0,a._)("select",{id:"unit",name:"unit",class:"form-select",required:""},[(0,a._)("option",{value:""},"Selecione"),(0,a._)("option",{value:"1"},"Documento"),(0,a._)("option",{value:"2"},"Vida"),(0,a._)("option",{value:"3"},"Cargo"),(0,a._)("option",{value:"4"},"Posto")],-1);function z(t,e,i,b,C,z){const N=(0,a.up)("PageHeader"),H=(0,a.up)("ChangeStatus"),L=(0,a.up)("Pagination"),P=(0,a.up)("b-col"),D=(0,a.up)("b-row"),R=(0,a.up)("TableLists"),U=(0,a.up)("Layout");return(0,a.wg)(),(0,a.j4)(U,null,{default:(0,a.w5)((()=>[(0,a.Wm)(N,{title:b.title},null,8,["title"]),(0,a.Wm)(R,{session:"Activities",title:"Atividade",ref:"childComponentRef",onResetModal:b.resetModal},{"form-filter":(0,a.w5)((()=>[l])),total:(0,a.w5)((()=>[(0,a._)("div",s,[(0,a._)("div",o,[(0,a._)("p",null,"Exibindo de "+(0,n.zw)(this.activities.start)+" a "+(0,n.zw)(this.activities.partial)+" de "+(0,n.zw)(this.activities.total)+" registros",1)])])])),"t-head":(0,a.w5)((()=>[d,r,c,u,m])),"t-body":(0,a.w5)((()=>[this.activities.message.length>0?((0,a.wg)(),(0,a.iD)("tbody",p,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(this.activities.message,(t=>((0,a.wg)(),(0,a.iD)("tr",{key:t.id,id:"line"+t.id},[(0,a._)("td",null,(0,n.zw)(t.name),1),(0,a._)("td",f,(0,n.zw)(t.unit),1),(0,a._)("td",_,(0,n.zw)(t.duration),1),(0,a.Wm)(H,{id:t.id,url:"atividades/novo-status/",text:1==t.active?"Ativo":"Inativo",variant:1==t.active?"success":"danger"},null,8,["id","text","variant"]),(0,a._)("td",h,[(0,a._)("i",{class:"bx bx-pencil text-info fs-14 mx-1 pointer",onClick:e=>b.getView(t.id),title:"Editar"},null,8,g),(0,a._)("i",{class:"bx bx-trash text-danger fs-14 mx-1 pointer",title:"Excluir",onClick:e=>b.confirm(t.id)},null,8,w)]),(0,a._)("span",{class:"spinner spinner-border spinner-line flex-shrink-0",id:"spinnerLine"+t.id,role:"status"},y,8,x)],8,v)))),128))])):0===this.activities.total?((0,a.wg)(),(0,a.iD)("tbody",k,B)):(0,a.kq)("",!0)])),pagination:(0,a.w5)((()=>[(0,a.Wm)(L,{total:b.activities.total,index:this.data.paramns.index,limit:this.data.paramns.limit,session:"Activities"},null,8,["total","index","limit"])])),"form-modal":(0,a.w5)((()=>[(0,a._)("form",Z,[(0,a.Wm)(D,{class:"g-3"},{default:(0,a.w5)((()=>[(0,a.Wm)(P,{xl:"12"},{default:(0,a.w5)((()=>[A,I,S])),_:1}),(0,a.Wm)(P,{md:"6"},{default:(0,a.w5)((()=>[W,E])),_:1}),(0,a.Wm)(P,{md:"6"},{default:(0,a.w5)((()=>[M,T])),_:1})])),_:1})])])),_:1},8,["onResetModal"])])),_:1})}var N=i(2931),H=i(4433),L=i(4888),P=i(9361),D=i(3340),R=i(513),U=i(8776),q=i(4080),V=i(2965),j=i(9946),F=i(6455),J=i.n(F),K=i(9028),O=i(9035),Y={page:{title:"Atividades",meta:[{name:"description",content:H.W}]},components:{BCol:D.lP,BRow:D.Tp,Layout:L.Z,PageHeader:P.Z,TableLists:R.Z,Pagination:q.Z,ChangeStatus:U.Z},setup(){O.Z.dispatch("activitiesModule/"+V.Bu);const t=()=>{document.getElementById("form").classList.remove("was-validated"),document.getElementById("form").reset(),document.getElementById("activityId").value=0},e=(0,N.iH)(null),i=async t=>{e.value.modalShow(),(0,j.Av)("form","save"),await K.Z.get("atividades/"+t,{headers:{"x-auth":` Bearer ${localStorage.getItem("jwt")} `}}).then((t=>{(0,j.F5)(t.data.message,"form","save")})).catch((t=>{console.error(t),(0,j.rN)(t)}))},n=t=>{J().fire({title:"Você tem certeza?",text:"Seus dados serão removidos e não poderão mais ser recuperados.",icon:"warning",showCancelButton:!0,confirmButtonColor:"#34c38f",cancelButtonColor:"#f46a6a",cancelButtonText:"Cancelar",confirmButtonText:"Confirmar"}).then((e=>{e.value&&((0,j.hM)("table","td",".2","spinnerTable","block"),O.Z.dispatch("activitiesModule/"+V.l3,t))}))};return{title:"Atividades",data:JSON.parse(localStorage.getItem("Activities")),activities:(0,a.Fl)((()=>O.Z.state.activitiesModule.activities)),resetModal:t,getView:i,childComponentRef:e,confirm:n}}},$=i(3744);const G=(0,$.Z)(Y,[["render",z]]);var Q=G}}]);
//# sourceMappingURL=890.ad2396c0.js.map