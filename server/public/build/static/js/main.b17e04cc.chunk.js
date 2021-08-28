(this["webpackJsonpreact-ts-one"]=this["webpackJsonpreact-ts-one"]||[]).push([[0],{160:function(e,t,n){},161:function(e,t,n){},162:function(e,t,n){},250:function(e,t,n){},280:function(e,t,n){},281:function(e,t,n){},282:function(e,t,n){},286:function(e,t,n){"use strict";n.r(t);var c=n(0),s=n(22),a=n.n(s),r=(n(160),n(161),n(148)),i=n(15),o=n(59),l=n(289),u=n(290),j=n(151),d=n(291),h=n(292),f=n(293),b=n(155),m=(n(162),n(101)),O=n.n(m),x=n(152),p=function(e){x.b.warning(e)},g={GET:function(e,t){return function(e,t){var n=t.params||{},c=t.timeout||1e3;return new Promise((function(t,s){O.a.get(e,{params:n,timeout:c}).then((function(e){var n=e.data,c=n.code,a=n.data,r=n.msg;0===c?t(a):(s(r),p(r))})).catch((function(e){var t=e.toString();p(t),s(t)}))}))}(e,t)},POST:function(e,t){return function(e,t){var n=t.data||{},c=t.timeout||6e4;return new Promise((function(t,s){O.a.post(e,n,{timeout:c}).then((function(e){var n=e.data,c=n.code,a=n.data,r=n.msg;0===c?t(a):(s(r),p(r))})).catch((function(e){var t=e.toString();p(t),s(t)}))}))}(e,t)}},v=n(6),N=function(e){var t=Object(c.useRef)(null);return Object(v.jsx)("div",{className:"login-container",children:Object(v.jsxs)("div",{className:"login-content padding-large",children:[Object(v.jsx)("h3",{children:"\u7528\u6237\u767b\u5f55"}),Object(v.jsxs)("div",{children:[Object(v.jsxs)(l.a,{ref:t,name:"basic",labelCol:{span:8},wrapperCol:{span:16},initialValues:{remember:!0},onFinish:function(t){console.log("Success:",t),g.GET("/chat/login",{params:Object(o.a)({},t)}).then((function(t){localStorage.setItem("userInfo",JSON.stringify(t)),e.history.push("/chat")}))},onFinishFailed:function(e){console.log("Failed:",e)},children:[Object(v.jsx)(l.a.Item,{label:"name",name:"name",rules:[{required:!0,message:"Please input your username!"}],children:Object(v.jsx)(u.a,{placeholder:"\u7528\u6237\u540d",prefix:Object(v.jsx)(d.a,{})})}),Object(v.jsx)(l.a.Item,{label:"Password",name:"password",rules:[{required:!0,message:"Please input your password!"}],children:Object(v.jsx)(u.a.Password,{prefix:Object(v.jsx)(h.a,{}),placeholder:"\u5bc6\u7801",iconRender:function(e){return e?Object(v.jsx)(f.a,{}):Object(v.jsx)(b.a,{})}})}),Object(v.jsxs)(l.a.Item,{wrapperCol:{offset:8,span:16},children:[Object(v.jsx)(j.a,{type:"primary",htmlType:"submit",children:"\u786e\u5b9a"}),Object(v.jsx)(j.a,{htmlType:"button",onClick:function(){console.log(e),t.current.resetFields()},children:"Reset"})]})]}),Object(v.jsxs)("p",{className:"ta-right",children:["\u6ca1\u6709\u8d26\u53f7\uff0c",Object(v.jsx)("a",{href:"/register",children:"\u6ce8\u518c"})]})]})]})})},y=n(105),w=n(44),S=(n(250),n(147)),E=n.n(S),F=(n(280),function(e){var t=Object(c.useState)(""),n=Object(w.a)(t,2),s=n[0],a=n[1],r=e.onEnter,i=e.chatList,o=e.user,l=Object(c.useRef)(null);Object(c.useEffect)((function(){var e=l.current;e.scrollTop=e.scrollHeight-e.offsetHeight}),[i]);return Object(v.jsxs)("div",{className:"flex-1 flex chat-window fd-column",children:[Object(v.jsxs)("div",{className:"flex-1  chat-list",children:[Object(v.jsx)("div",{className:"chat-header",children:o.name}),Object(v.jsx)("div",{className:"chat-body custom-scrollbar",ref:l,children:Object(v.jsx)("ul",{children:i.length>0&&i.map((function(e,t){return Object(v.jsxs)("li",{children:["self"===e.source&&Object(v.jsxs)("div",{className:"self",children:[Object(v.jsx)("span",{className:"chat-item",children:e.message}),Object(v.jsx)("strong",{className:"head-portrait",children:e.name})]}),"he"===e.source&&Object(v.jsxs)("div",{className:"he",children:[Object(v.jsx)("strong",{className:"head-portrait",children:e.name}),Object(v.jsx)("span",{className:"chat-item",children:e.message})]})]},t+"")}))})})]}),Object(v.jsx)("div",{className:"chat-input-box padding-default",children:Object(v.jsx)(u.a.TextArea,{placeholder:"\u6309Enter\u952e\u53d1\u9001",value:s,onChange:function(e){return a(e.target.value)},onPressEnter:function(e){e.preventDefault();var t=e.target.value;r(t),a("")}})})]})}),I=(n(281),function(e){var t=e.userInfo;return Object(v.jsx)(v.Fragment,{children:Object(v.jsx)("div",{className:"user-self",children:Object(v.jsx)("h1",{className:"user-name",children:t.name})})})}),C=n(5),P=n.n(C),T=(n(282),function(e){var t=e.chattingFriend,n=e.friendsList,s=e.toggleFriend,a=Object(c.useState)(n),r=Object(w.a)(a,2),i=r[0],o=r[1];Object(c.useEffect)((function(){o(n)}),[n]);return Object(v.jsxs)("div",{className:"friends-box",children:[Object(v.jsx)("div",{className:"friend-search flex ai-center",children:Object(v.jsx)(u.a,{placeholder:"\u641c\u7d22",allowClear:!0,size:"small",onChange:function(e){var t=e.target.value;if(t){var c=n.filter((function(e){return e.name.indexOf(t)>-1}));o(c)}else o(n)}})}),Object(v.jsx)("div",{className:"friends-list",children:Object(v.jsx)("ul",{children:i.length>0&&i.map((function(e){var n=t&&t.id===e.id;return Object(v.jsx)("li",{className:P()({active:n}),onClick:function(){return s(e)},children:e.name},e.id)}))})})]})}),k="ws://".concat("localhost:2021"),q={},J=null,L={},R=function(e){var t=localStorage.getItem("userInfo");t?q=JSON.parse(t):e.history.push("/login");var n=Object(c.useState)([]),s=Object(w.a)(n,2),a=s[0],r=s[1],i=Object(c.useState)(),l=Object(w.a)(i,2),u=l[0],j=l[1],d=Object(c.useState)([]),h=Object(w.a)(d,2),f=h[0],b=h[1];Object(c.useEffect)((function(){q&&(m(q),J=E()(k,{query:{name:"other"},auth:Object(o.a)({},q)})),J.on("connect",(function(){console.log("\u8fde\u63a5\u6210\u529f")})),J.on("msg",(function(e){var t=e.type,n=e.from,c=e.to,s="";"group"===t&&(s=c.id),"personal"===t&&(s=n.id),L[s].push(Object(o.a)({source:"he",message:e.message},e.from)),b(Object(y.a)(L[s]))}))}),[]);var m=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};g.GET("/chat/queryAllUser",{params:e}).then((function(e){r(e),e.forEach((function(e){L[e.id]=[]})),e[0]&&O(e[0])}))},O=function(e){j(e),b(L[e.id])};return Object(v.jsx)("div",{className:"chat-container",children:Object(v.jsxs)("div",{className:"chat-content flex",children:[Object(v.jsx)(I,{userInfo:q}),Object(v.jsx)(T,{friendsList:a,chattingFriend:u,toggleFriend:O}),u&&Object(v.jsx)(F,{chatList:f,user:u,onEnter:function(e){var t=u.type;J.emit("msg",{type:t,to:u,message:e});var n=Object(o.a)({source:"self",message:e},q);f.push(n),b(Object(y.a)(f))}})]})})},A=function(){return Object(v.jsx)(r.a,{children:Object(v.jsxs)(i.d,{children:[Object(v.jsx)(i.b,{path:"/login",component:N}),Object(v.jsx)(i.b,{path:"/chat",component:R}),Object(v.jsx)(i.a,{from:"/",exact:!0,to:"/chat"})]})})};var G=function(){return Object(v.jsx)("div",{className:"App",children:Object(v.jsx)(A,{})})};a.a.render(Object(v.jsx)(G,{}),document.getElementById("root"))}},[[286,1,2]]]);
//# sourceMappingURL=main.b17e04cc.chunk.js.map