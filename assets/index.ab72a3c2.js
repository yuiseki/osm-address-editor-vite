var R=Object.defineProperty,z=Object.defineProperties;var F=Object.getOwnPropertyDescriptors;var S=Object.getOwnPropertySymbols;var N=Object.prototype.hasOwnProperty,$=Object.prototype.propertyIsEnumerable;var I=(n,t,e)=>t in n?R(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e,w=(n,t)=>{for(var e in t||(t={}))N.call(t,e)&&I(n,e,t[e]);if(S)for(var e of S(t))$.call(t,e)&&I(n,e,t[e]);return n},L=(n,t)=>z(n,F(t));import{j,r as o,d as g,o as G,p as q,c as P,M as B,t as J,F as C,f as K,a as D,b as T,m as W,S as X,L as k,G as V,R as Y,e as Q}from"./vendor.0d3144ab.js";const Z=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const l of r)if(l.type==="childList")for(const p of l.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&a(p)}).observe(document,{childList:!0,subtree:!0});function e(r){const l={};return r.integrity&&(l.integrity=r.integrity),r.referrerpolicy&&(l.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?l.credentials="include":r.crossorigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function a(r){if(r.ep)return;r.ep=!0;const l=e(r);fetch(r.href,l)}};Z();const s=j.exports.jsx,h=j.exports.jsxs,ee=()=>{const[n,t]=o.exports.useState(!1);o.exports.useEffect(()=>{t(g.exports.isLoggedIn())},[]);const e=o.exports.useCallback(()=>{(async()=>(await g.exports.login({mode:"popup",clientId:"q9sRK4UuNqv3_HLE8E7m2-wUAKS3XJSFWb9apehpAqE",scopes:["read_prefs","write_api","write_notes"],redirectUrl:window.location.href.replace(window.location.hash,"")}),t(g.exports.isLoggedIn()),window.location.reload()))()},[]),a=o.exports.useCallback(()=>{(async()=>(g.exports.logout(),t(!1)))()},[]);return s("div",{children:n?s("button",{onClick:a,children:"logout"}):s("button",{onClick:e,children:"login"})})};const te=()=>{const[n,t]=o.exports.useState(!1),[e,a]=o.exports.useState(void 0);return o.exports.useEffect(()=>{t(g.exports.isLoggedIn())},[]),o.exports.useEffect(()=>{!n||(async()=>{const r=await g.exports.getUser("me");a(r)})()},[n]),s("div",{children:e?s("img",{src:e.img.href,alt:e.display_name,title:e.display_name}):s("img",{})})},oe=()=>{const[n,t]=o.exports.useState(!1),[e,a]=o.exports.useState(void 0);return o.exports.useEffect(()=>{t(g.exports.isLoggedIn())},[]),o.exports.useEffect(()=>{!n||(async()=>{const r=await g.exports.getUser("me");a(r)})()},[n]),h("div",{style:{zIndex:100,position:"relative",display:"flex",flexDirection:"row",backgroundColor:"rgba(0, 255, 255, 0.8)"},children:[h("div",{children:[s("h1",{style:{display:"inline",margin:"0px"},children:"OSM address editor"}),e?h("span",{style:{marginLeft:"10px"},children:["Hi ",e==null?void 0:e.display_name,", You have"," ",e==null?void 0:e.changesets.count," changesets."]}):s("span",{style:{marginLeft:"10px"},children:"Please logged in as OSM user."})]}),h("div",{style:{display:"flex",flex:1,justifyContent:"end"},children:[s(te,{}),s(ee,{})]})]})},se=()=>({fetchOverpass:o.exports.useCallback(async(t,e)=>{var y;console.log("overpass: loading...");let a="[out:json]";a+=`[timeout:25];
`,a+='way["building"="yes"]',a+=`(around:${300},${t},${e});
`,a+="out meta geom;",console.log(a);const l=await(await fetch(`https://lz4.overpass-api.de/api/interpreter?data=${encodeURIComponent(a)}`,{})).json();console.log(l),console.log("overpass: ",l.elements.length);const p=G(l);console.log("overpass geojson raw: ",p);for await(const d of p.features){if(d.properties||(d.properties={}),d.geometry.type==="Polygon"){const f=q(d.geometry.coordinates);var m=P(f);d.properties.center=m.geometry.coordinates}const u=d.properties.uid;if(u){let f=localStorage.getItem(u+"-icon");if(f===null){const x=await g.exports.getUser(u);((y=x.img)==null?void 0:y.href)?(f=x.img.href,localStorage.setItem(u+"-icon",x.img.href)):localStorage.setItem(u+"-icon","")}d.properties.userIconHref=f||""}}return console.log("overpass geojson converted: ",p),console.log("overpass: loaded."),p},[])}),re={id:"buildings-layer-fill",type:"fill",source:"buildings-source",paint:{"fill-color":"pink","fill-opacity":.4},filter:["==","$type","Polygon"]},ne={id:"buildings-layer-icon",type:"symbol",source:"buildings-source",layout:{"icon-image":["coalesce",["image",["get","userIconHref"]],["image","fallbackImage"]]}};function ie(){const[n,t]=o.exports.useState({}),e=o.exports.useRef(null),[a,r]=o.exports.useState({type:"FeatureCollection",features:[]}),[l,p]=o.exports.useState("auto"),[m,y]=o.exports.useState(),[d,u]=o.exports.useState(),{fetchOverpass:f}=se();o.exports.useEffect(()=>{setTimeout(()=>{var i;console.log(window.location.hash),window.location.hash.endsWith("/0/0")&&(console.log("geolocateControlRef trigger"),(i=e.current)==null||i.trigger())},500)},[]);const x=o.exports.useCallback(async i=>{if(!d){const c=i.target.getCenter();u(!0);const v=await f(c.lat,c.lng);r(v),u(!1)}},[]),M=o.exports.useCallback(i=>{t(i.viewState)},[]),O=o.exports.useCallback(async i=>{t(i.viewState);const c=i.viewState;if(!d){u(!0);const v=await f(c.latitude,c.longitude);r(v),u(!1)}},[]),E=o.exports.useCallback(i=>{p("pointer");const{features:c,point:{x:v,y:A}}=i,b=c&&c[0];y(b?{feature:b,x:v,y:A}:void 0)},[]),H=o.exports.useCallback(()=>{p("auto"),y(void 0)},[]),U=o.exports.useCallback(i=>{const c=i.features&&i.features[0];window.alert(JSON.stringify(c,null,2))},[]),_=o.exports.useMemo(()=>a.features.map((i,c)=>i.properties?s(B,{longitude:i.properties.center[0],latitude:i.properties.center[1],anchor:"bottom",children:i.properties.userIconHref.length>0?s("img",{src:i.properties.userIconHref,style:{width:"30px",height:"30px"}}):s("span",{dangerouslySetInnerHTML:{__html:J(i.properties.user||"noname",30)}})},`marker-${c}`):null),[a]);return h("div",{children:[s(oe,{}),h("div",{style:{zIndex:1,position:"absolute",top:0,left:0,height:"100vh",width:"100vw"},children:[s("div",{className:"fa-2xl",style:{zIndex:100,display:"flex",position:"absolute",top:"50%",left:"50%",textAlign:"center",verticalAlign:"middle"},children:d?s(C,{size:"2x",spin:!0,icon:K}):s(C,{size:"2x",icon:D})}),h(T,L(w({},n),{onMove:M,onMoveEnd:O,onLoad:x,interactiveLayerIds:["buildings-layer-fill"],onClick:U,onMouseEnter:E,onMouseLeave:H,cursor:l,mapLib:W,hash:!0,style:{width:"100%",height:"100%"},mapStyle:"https://raw.githubusercontent.com/geoloniamaps/basic/gh-pages/style.json",children:[h(X,{id:"buildings-source",type:"geojson",data:a,children:[s(k,w({},re)),s(k,w({},ne))]}),_,m&&s("div",{className:"tooltip",style:{zIndex:10,background:"rgba(255, 255, 255, 0.7)",padding:"5px",width:"250px",position:"absolute",left:m.x+5,top:m.y+5},children:s("pre",{children:JSON.stringify(m.feature.properties,null,2)})}),s(V,{ref:e,showUserLocation:!0,showAccuracyCircle:!1,trackUserLocation:!0,positionOptions:{enableHighAccuracy:!0},fitBoundsOptions:{zoom:17},position:"bottom-right"})]}))]})]})}Y.render(s(Q.StrictMode,{children:s(ie,{})}),document.getElementById("root"));
