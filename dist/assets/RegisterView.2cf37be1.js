import{_ as d,r as t,o as m,c as u,a as s,Q as n,b as c,d as p,g as V,e as _}from"./index.163ad0e4.js";const g={name:"RegisterView",setup(){const o=t("user@mail.com"),e=t("password"),r=t("Adam Driver");return{email:o,password:e,name:r,register:async()=>{let i=await p(V(),o.value,e.value);console.log(i)}}}},w={class:"container"},f=_("h4",null,"Register page",-1);function y(o,e,r,a,i,b){return m(),u("div",w,[f,s(n,{modelValue:a.name,"onUpdate:modelValue":e[0]||(e[0]=l=>a.name=l),class:"input",label:"Name",type:"text",outlined:""},null,8,["modelValue"]),s(n,{modelValue:a.email,"onUpdate:modelValue":e[1]||(e[1]=l=>a.email=l),class:"input",label:"E-mail",type:"email",outlined:""},null,8,["modelValue"]),s(n,{modelValue:a.password,"onUpdate:modelValue":e[2]||(e[2]=l=>a.password=l),class:"input",label:"Password",type:"password",outlined:""},null,8,["modelValue"]),s(c,{class:"button",onClick:a.register,color:"primary",label:"Register"},null,8,["onClick"])])}const x=d(g,[["render",y]]);export{x as default};
