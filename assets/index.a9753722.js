var J=Object.defineProperty,K=Object.defineProperties;var W=Object.getOwnPropertyDescriptors;var A=Object.getOwnPropertySymbols;var X=Object.prototype.hasOwnProperty,Y=Object.prototype.propertyIsEnumerable;var j=(o,s,t)=>s in o?J(o,s,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[s]=t,C=(o,s)=>{for(var t in s||(s={}))X.call(s,t)&&j(o,t,s[t]);if(A)for(var t of A(s))Y.call(s,t)&&j(o,t,s[t]);return o},O=(o,s)=>K(o,W(s));import{j as L,r,d as y,o as Z,p as Q,c as ee,M as te,t as oe,a as se,m as re,F as R,f as ne,b as ae,S as le,L as ie,G as ce,R as de,e as pe}from"./vendor.f13fab3e.js";const ue=function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const g of i.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&a(g)}).observe(document,{childList:!0,subtree:!0});function t(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerpolicy&&(i.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?i.credentials="include":n.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(n){if(n.ep)return;n.ep=!0;const i=t(n);fetch(n.href,i)}};ue();const e=L.exports.jsx,c=L.exports.jsxs,v=L.exports.Fragment,_=()=>{const[o,s]=r.exports.useState(!1);r.exports.useEffect(()=>{s(y.exports.isLoggedIn())},[]);const t=r.exports.useCallback(()=>{(async()=>(await y.exports.login({mode:"popup",clientId:"q9sRK4UuNqv3_HLE8E7m2-wUAKS3XJSFWb9apehpAqE",scopes:["read_prefs","write_api","write_notes"],redirectUrl:window.location.href.replace(window.location.hash,"")}),s(y.exports.isLoggedIn()),window.location.reload()))()},[]),a=r.exports.useCallback(()=>{(async()=>(y.exports.logout(),s(!1)))()},[]);return e(v,{children:o?e("button",{style:{height:"44px"},className:"button py-1 px-1 border-transparent border-4 bg-gray-300 text-gray-900 hover:text-gray-500",onClick:a,children:"logout"}):e("button",{style:{height:"44px"},className:"button py-1 px-1 border-transparent border-4 bg-gray-300 text-gray-900 hover:text-gray-500",onClick:t,children:"login"})})},ge=()=>{const[o,s]=r.exports.useState(!1),[t,a]=r.exports.useState(void 0);return r.exports.useEffect(()=>{s(y.exports.isLoggedIn())},[]),r.exports.useEffect(()=>{!o||(async()=>{const n=await y.exports.getUser("me");a(n)})()},[o]),e(v,{children:t?e("img",{style:{width:"44px",height:"44px"},src:t.img.href,alt:t.display_name,title:t.display_name}):e("img",{})})},he=()=>{const[o,s]=r.exports.useState(!1),[t,a]=r.exports.useState(void 0);return r.exports.useEffect(()=>{s(y.exports.isLoggedIn())},[]),r.exports.useEffect(()=>{!o||(async()=>{const n=await y.exports.getUser("me");a(n)})()},[o]),c("div",{style:{zIndex:100,position:"relative",top:0,left:0,height:"44px",display:"flex",flexDirection:"row",backgroundColor:"rgba(0, 255, 255, 0.9)"},children:[c("div",{children:[e("h1",{className:"text-4xl font-bold",style:{display:"inline",margin:"0px"},children:"OSM address editor"}),t?c("span",{style:{marginLeft:"10px"},children:["Hi ",t==null?void 0:t.display_name,", You have"," ",t==null?void 0:t.changesets.count," changesets."]}):e("span",{style:{marginLeft:"10px"},children:"Please logged in as OSM user."})]}),c("div",{style:{display:"flex",flex:1,justifyContent:"end"},children:[e("div",{children:e(ge,{})}),e("div",{children:e(_,{})})]})]})},fe=()=>({fetchOverpass:r.exports.useCallback(async(s,t)=>{var f;console.log("overpass: loading...");let a="[out:json]";a+=`[timeout:25];
`,a+='way["building"]',a+=`(around:${300},${s},${t});
`,a+="out meta geom;",console.log(a);const i=await(await fetch(`https://lz4.overpass-api.de/api/interpreter?data=${encodeURIComponent(a)}`,{})).json();console.log(i),console.log("overpass: ",i.elements.length);const g=Z(i);console.log("overpass geojson raw: ",g);for await(const u of g.features){if(!u.properties)continue;if(u.id=u.properties.id.split("/")[1],u.geometry.type==="Polygon"){const x=Q(u.geometry.coordinates);var p=ee(x);u.properties.center=p.geometry.coordinates}const m=u.properties.uid;if(m){let x=localStorage.getItem(m+"-icon");if(x===null){const b=await y.exports.getUser(m);((f=b.img)==null?void 0:f.href)?(x=b.img.href,localStorage.setItem(m+"-icon",b.img.href)):localStorage.setItem(m+"-icon","")}u.properties.userIconHref=x||""}}return console.log("overpass geojson converted: ",g),console.log("overpass: loaded."),g},[])}),k={key:"addr:postcode",displayName:"\u90F5\u4FBF\u756A\u53F7",placeholder:"101-0021"},D=[{key:"addr:province",displayName:"\u90FD\u9053\u5E9C\u770C",placeholder:"\u6771\u4EAC\u90FD"},{key:"addr:city",displayName:"\u5E02\u533A\u753A\u6751",placeholder:"\u5343\u4EE3\u7530\u533A"},{key:"addr:quarter",displayName:"\u5730\u540D",placeholder:"\u5916\u795E\u7530"}],H=[{key:"addr:neighbourhood",displayName:"\u4E01\u76EE",placeholder:"1\u4E01\u76EE"},{key:"addr:block_number",displayName:"\u756A\u5730",placeholder:"17"},{key:"addr:housenumber",displayName:"\u53F7",placeholder:"6",prefix:"-"}],I=({feature:o,fieldName:s,label:t,placeholder:a})=>{var p;const[n,i]=r.exports.useState((p=o.properties)==null?void 0:p[s]),g=r.exports.useCallback(f=>{i(f.currentTarget.value)},[]);return c("div",{className:"w-full md:w-1/6 py-1 px-2 mb-6 md:mb-0",children:[e("label",{className:"block tracking-wide text-gray-700 text-xs font-bold mb-2",htmlFor:s,children:t||s}),e("input",{className:"appearance-none block w-full leading-tight rounded py-2 px-1 border border-gray-300 bg-gray-100 text-black placeholder-gray-500 placeholder-opacity-50 focus:outline-none focus:bg-white focus:border-gray-500",id:s,name:s,type:"text",placeholder:a,value:n,onChange:g})]})},U=({feature:o})=>{var t;const s=JSON.parse((t=o.properties)==null?void 0:t.center);return c(v,{children:[c("span",{className:"longitude",children:["Longitude: ",Math.round(s[0]*1e4)/1e4]}),", ",c("span",{className:"latitude",children:["Latitude: ",Math.round(s[1]*1e4)/1e4," "]})]})},q=({feature:o})=>{var s;return c(v,{children:[e("span",{className:"addr:postcode",children:(s=o.properties)==null?void 0:s[k.key]})," ",D.map(t=>{var a;return e("span",{className:t.key,children:(a=o.properties)==null?void 0:a[t.key]})})," ",H.map(t=>{var a,n;return c("span",{className:t.key,children:[(a=t.prefix)!=null?a:t.prefix,(n=o.properties)==null?void 0:n[t.key]]})})]})},me=({feature:o,onCancel:s})=>{const[t,a]=r.exports.useState(!1),[n,i]=r.exports.useState(!1);r.exports.useEffect(()=>{i(y.exports.isLoggedIn())},[]);const g=r.exports.useCallback(p=>{a(!0),p.preventDefault();const f=new FormData(p.currentTarget),u={};f.forEach((m,x)=>u[x]=m),console.info(JSON.stringify(u,null,2)),a(!1)},[]);return e("div",{children:o.properties&&c(v,{children:[c("div",{children:["OSM:"," ",e("a",{className:"underline text-blue-600 hover:text-blue-800 visited:text-purple-600",href:"https://www.openstreetmap.org/"+o.properties.id,target:"_blank",children:o.properties.id})," | ",e(U,{feature:o})," | ",c("span",{children:["Address:"," ",e("span",{className:"underline",children:e(q,{feature:o})})]})]}),c("form",{onSubmit:g,children:[c("div",{className:"flex flex-wrap",children:[e(I,{feature:o,fieldName:k.key,label:k.displayName,placeholder:k.placeholder}),D.map(p=>e(I,{feature:o,fieldName:p.key,label:p.displayName,placeholder:p.placeholder}))]}),e("div",{className:"flex flex-wrap",children:H.map(p=>e(I,{feature:o,fieldName:p.key,label:p.displayName,placeholder:p.placeholder}))}),e("div",{className:"flex flex-wrap",children:c("div",{className:"w-full py-2 px-2 mb-6 md:mb-0",children:[e("button",{onClick:s,type:"button",className:"button rounded mr-4 py-2 px-3  bg-gray-200 text-red-600 hover:text-red-800",children:"Cancel"}),e("button",{type:"button",className:"button rounded mr-4 py-2 px-3 bg-green-300 text-gray-800 hover:text-white",children:"Load address from coordinates (work in progress...)"}),e("button",{disabled:!n||t,className:"button rounded mr-2 py-2 px-3 bg-blue-300 text-gray-800 disabled:bg-blue-100 disabled:text-gray-400 hover:text-white",children:"Submit to OpenStreetMap (work in progress...)"}),!n&&c(v,{children:[e("span",{className:"mr-2 underline text-red-600",children:"Require logged in before you submit data to OpenStreetMap"}),e(_,{})]})]})})]})]})})},xe={id:"buildings-layer-fill",type:"fill",source:"buildings-source",paint:{"fill-color":["case",["boolean",["feature-state","select"],!1],"green",["boolean",["has","addr:province"],!1],"blue","pink"],"fill-opacity":["case",["boolean",["feature-state","select"],!1],.8,["boolean",["feature-state","hover"],!1],.8,.4]},filter:["==","$type","Polygon"]};function ye(){const o=r.exports.useRef(null),[s,t]=r.exports.useState({}),a=r.exports.useRef(null),[n,i]=r.exports.useState({type:"FeatureCollection",features:[]}),[g,p]=r.exports.useState("auto"),[f,u]=r.exports.useState(),[m,x]=r.exports.useState([]),[b,w]=r.exports.useState(),{fetchOverpass:F}=fe();r.exports.useEffect(()=>{setTimeout(()=>{var l;console.log(window.location.hash),window.location.hash.endsWith("/0/0")&&(console.log("geolocateControlRef trigger"),(l=a.current)==null||l.trigger())},500)},[]);const z=r.exports.useCallback(async l=>{const d=l.target.getCenter();w(!0);const h=await F(d.lat,d.lng);i(h),w(!1)},[]),T=r.exports.useCallback(l=>{t(l.viewState)},[]),G=r.exports.useCallback(async l=>{t(l.viewState);const d=l.viewState;if(!b){w(!0);const h=await F(d.latitude,d.longitude);i(h),w(!1)}},[]),P=r.exports.useCallback(l=>{var M;p("pointer");const{features:d,point:{x:h,y:S}}=l,N=d&&d[0];N?((M=o.current)==null||M.setFeatureState({source:"buildings-source",id:N.id},{hover:!0}),u({feature:N,x:h,y:S})):u(void 0)},[]),$=r.exports.useCallback(l=>{var d;p("auto"),(d=o.current)==null||d.querySourceFeatures("buildings-source").map(h=>{var S;(S=o.current)==null||S.setFeatureState({source:"buildings-source",id:h.id},{hover:!1})}),u(void 0)},[]),B=r.exports.useCallback(l=>{var h;E();const d=l.features&&l.features[0];!d||((h=o.current)==null||h.setFeatureState({source:"buildings-source",id:d.id},{select:!0}),x([d]))},[]),E=r.exports.useCallback(()=>{var l;(l=o.current)==null||l.querySourceFeatures("buildings-source").map(d=>{var h;(h=o.current)==null||h.setFeatureState({source:"buildings-source",id:d.id},{select:!1})}),x([])},[]),V=r.exports.useMemo(()=>n.features.map((l,d)=>l.properties?e(te,{style:{cursor:"pointer"},longitude:l.properties.center[0],latitude:l.properties.center[1],anchor:"center",children:l.properties.userIconHref.length>0?e("img",{src:l.properties.userIconHref,style:{width:"30px",height:"30px"}}):e("span",{dangerouslySetInnerHTML:{__html:oe(l.properties.user||"noname",30)}})},`marker-${d}`):null),[n]);return c("div",{children:[e(he,{}),c("div",{style:{zIndex:1,position:"absolute",top:0,left:0,height:"100vh",width:"100vw",display:"flex",flexDirection:"column"},children:[m.length>0&&e("div",{style:{zIndex:200,position:"absolute",top:"44px",left:0,height:"250px",width:"100vw",backgroundColor:"rgba(255, 255, 255, 0.9)"},children:e("div",{style:{padding:"10px"},children:m.map(l=>e(me,{feature:l,onCancel:E},l.id))})}),c(se,O(C({ref:o},s),{onMove:T,onMoveEnd:G,onLoad:z,interactiveLayerIds:["buildings-layer-fill"],onClick:B,onMouseEnter:P,onMouseLeave:$,dragRotate:!1,boxZoom:!1,hash:!0,cursor:g,mapLib:re,style:{width:"100%",height:"100%"},mapStyle:"https://raw.githubusercontent.com/geoloniamaps/basic/gh-pages/style.json",children:[e("div",{className:"fa-2xl",style:{zIndex:100,display:"flex",position:"absolute",top:"50%",left:"50%",textAlign:"center",verticalAlign:"middle"},children:b?e(R,{size:"2x",spin:!0,icon:ne}):e(R,{size:"2x",icon:ae})}),e(le,{id:"buildings-source",type:"geojson",data:n,children:e(ie,C({},xe))}),V,f&&c("div",{className:"tooltip",style:{zIndex:10,background:"rgba(255, 255, 255, 0.7)",padding:"5px",width:"250px",position:"absolute",left:f.x+5,top:f.y+5},children:[e(U,{feature:f.feature}),e("br",{}),e(q,{feature:f.feature})]}),e(ce,{ref:a,position:"top-left",style:{marginTop:"55px"},showUserLocation:!0,showAccuracyCircle:!1,trackUserLocation:!1,positionOptions:{enableHighAccuracy:!0},fitBoundsOptions:{zoom:17}})]}))]})]})}de.render(e(pe.StrictMode,{children:e(ye,{})}),document.getElementById("root"));
