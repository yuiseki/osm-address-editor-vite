var Z=Object.defineProperty,Q=Object.defineProperties;var ee=Object.getOwnPropertyDescriptors;var H=Object.getOwnPropertySymbols;var te=Object.prototype.hasOwnProperty,oe=Object.prototype.propertyIsEnumerable;var J=(t,e,s)=>e in t?Z(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s,A=(t,e)=>{for(var s in e||(e={}))te.call(e,s)&&J(t,s,e[s]);if(H)for(var s of H(e))oe.call(e,s)&&J(t,s,e[s]);return t},V=(t,e)=>Q(t,ee(e));import{j as U,r,d as v,o as se,p as re,c as ne,b as ae,m as ie,F as j,f as $,t as le,M as de,a as ce,e as pe,S as ue,L as ge,N as fe,G as he,g as me,h as ye,i as be,R as xe,k as ve}from"./vendor.a68821ac.js";const Se=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))d(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&d(c)}).observe(document,{childList:!0,subtree:!0});function s(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerpolicy&&(i.referrerPolicy=a.referrerpolicy),a.crossorigin==="use-credentials"?i.credentials="include":a.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function d(a){if(a.ep)return;a.ep=!0;const i=s(a);fetch(a.href,i)}};Se();const o=U.exports.jsx,u=U.exports.jsxs,C=U.exports.Fragment,W=()=>{const[t,e]=r.exports.useState(!1);r.exports.useEffect(()=>{e(v.exports.isLoggedIn())},[]);const s=r.exports.useCallback(()=>{(async()=>(await v.exports.login({mode:"popup",clientId:"q9sRK4UuNqv3_HLE8E7m2-wUAKS3XJSFWb9apehpAqE",scopes:["read_prefs","write_api","write_notes"],redirectUrl:window.location.href.replace(window.location.hash,"")}),e(v.exports.isLoggedIn()),window.location.reload()))()},[]),d=r.exports.useCallback(()=>{(async()=>(v.exports.logout(),e(!1)))()},[]);return o(C,{children:t?o("button",{style:{height:"44px"},className:"button py-1 px-1 border-transparent border-4 bg-gray-300 text-gray-900 hover:text-gray-500",onClick:d,children:"logout"}):o("button",{style:{height:"44px"},className:"button py-1 px-1 border-transparent border-4 bg-gray-300 text-gray-900 hover:text-gray-500",onClick:s,children:"login"})})},we=()=>{const[t,e]=r.exports.useState(!1),[s,d]=r.exports.useState(void 0);return r.exports.useEffect(()=>{e(v.exports.isLoggedIn())},[]),r.exports.useEffect(()=>{!t||(async()=>{const a=await v.exports.getUser("me");d(a)})()},[t]),o(C,{children:s?o("img",{style:{width:"44px",height:"44px"},src:s.img.href,alt:s.display_name,title:s.display_name}):o("img",{})})},ke=()=>{const[t,e]=r.exports.useState(!1),[s,d]=r.exports.useState(void 0);return r.exports.useEffect(()=>{e(v.exports.isLoggedIn())},[]),r.exports.useEffect(()=>{!t||(async()=>{const a=await v.exports.getUser("me");d(a)})()},[t]),u("div",{style:{zIndex:100,position:"relative",top:0,left:0,height:"44px",display:"flex",flexDirection:"row",backgroundColor:"rgba(0, 255, 255, 0.9)"},children:[u("div",{children:[o("h1",{className:"text-4xl font-bold",style:{display:"inline",margin:"0px"},children:"OSM address editor"}),s?u("span",{style:{marginLeft:"10px"},children:["Hi ",s==null?void 0:s.display_name,", You have"," ",s==null?void 0:s.changesets.count," changesets."]}):o("span",{style:{marginLeft:"10px"},children:"Please logged in as OSM user."})]}),u("div",{style:{display:"flex",flex:1,justifyContent:"end"},children:[o("div",{children:o(we,{})}),o("div",{children:o(W,{})})]})]})},P={type:"FeatureCollection",features:[]},Ce=()=>{const[t,e]=r.exports.useState(!1);return{fetchOverpass:r.exports.useCallback(async(d,a,i)=>{var k,E;if(console.log(i),i<16)return P;let c=300;if(i>17&&(c=200),i>18&&(c=100),i>19&&(c=50),t)return P;e(!0),console.log("overpass: loading...");let y="[out:json]";y+=`[timeout:25];
`,y+='way["building"]',y+=`(around:${c},${d},${a});
`,y+="out meta geom;",console.log(y);const m=await fetch(`https://lz4.overpass-api.de/api/interpreter?data=${encodeURIComponent(y)}`,{});if(m.status!==200)return e(!1),P;const f=await m.json();console.log("overpass json elements: ",f.elements);const g=se(f);console.log("overpass osmtogeojson raw: ",g);for await(const h of g.features){if(!h.properties)continue;h.id=h.properties.id.split("/")[1];const N=(k=f.elements.filter(b=>h.id?typeof h.id=="number"?b.id===h.id:b.id===parseInt(h.id):!1))==null?void 0:k[0];if(N&&(h.properties.tags=N.tags,h.properties.nodes=N.nodes),h.geometry.type==="Polygon"){const b=re(h.geometry.coordinates);var I=ne(b);h.properties.center=I.geometry.coordinates}const w=h.properties.uid;if(w){let b=localStorage.getItem(w+"-icon");if(b===null){const F=await v.exports.getUser(w);((E=F.img)==null?void 0:E.href)?(b=F.img.href,localStorage.setItem(w+"-icon",F.img.href)):localStorage.setItem(w+"-icon","")}h.properties.userIconHref=b||""}}return console.log("overpass osmtogeojson converted: ",g),console.log("overpass: loaded."),e(!1),g},[]),loadingOverpass:t}},K=({feature:t})=>{var s;const e=JSON.parse((s=t.properties)==null?void 0:s.center);return u(C,{children:[u("span",{className:"longitude",children:["Longitude: ",Math.round(e[0]*1e4)/1e4]}),", ",u("span",{className:"latitude",children:["Latitude: ",Math.round(e[1]*1e4)/1e4," "]})]})},B={JPN:{postcodeField:{key:"addr:postcode",displayName:"\u90F5\u4FBF\u756A\u53F7",placeholder:"101-0021"},mainFields:[{key:"addr:province",displayName:"\u90FD\u9053\u5E9C\u770C",placeholder:"\u6771\u4EAC\u90FD"},{key:"addr:city",displayName:"\u5E02\u533A\u753A\u6751",placeholder:"\u5343\u4EE3\u7530\u533A"},{key:"addr:quarter",displayName:"\u5730\u540D",placeholder:"\u5916\u795E\u7530"}],detailFields:[{key:"addr:neighbourhood",displayName:"\u4E01\u76EE",placeholder:"1\u4E01\u76EE"},{key:"addr:block_number",displayName:"\u756A\u5730",placeholder:"17"},{key:"addr:housenumber",displayName:"\u53F7",placeholder:"6",prefix:"-"}]},CHN:{postcodeField:{key:"addr:postcode",displayName:"Postcode",placeholder:""},mainFields:[{key:"addr:province",displayName:"Province/Municipality/AR/SAR",placeholder:""},{key:"addr:city",displayName:"City/Prefecture/League",placeholder:""},{key:"addr:district",displayName:"District/County/Banner",placeholder:""}],detailFields:[{key:"addr:street",displayName:"Street",placeholder:""},{key:"addr:housenumber",displayName:"House number",placeholder:""}]}},Ne=()=>{const[t,e]=r.exports.useState(!1);return{detectCountry:r.exports.useCallback(async(d,a)=>{e(!0);const c=await(await fetch("https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_0_countries.geojson")).json();for(const y of c.features)if(ae([d,a],y.geometry))return console.log("country: ",y.properties),e(!1),y;e(!1)},[]),loadingCountry:t}},T=({feature:t,fieldName:e,label:s,placeholder:d,onChange:a})=>{var m;const[i,c]=r.exports.useState((m=t.properties)==null?void 0:m[e]);r.exports.useEffect(()=>{var f;c((f=t.properties)==null?void 0:f[e])},[t]);const y=r.exports.useCallback(f=>{c(f.currentTarget.value),a&&a(f)},[]);return u("div",{className:"w-full md:w-1/6 py-1 px-2 mb-6 md:mb-0",children:[o("label",{className:"block tracking-wide text-gray-700 text-xs font-bold mb-2",htmlFor:e,children:s||e}),o("input",{className:"appearance-none block w-full leading-tight rounded py-2 px-1 border border-gray-300 bg-gray-100 text-black placeholder-gray-500 placeholder-opacity-50 focus:outline-none focus:bg-white focus:border-gray-500",id:e,name:e,type:"text",placeholder:d,value:i,onChange:y})]})},Fe=({feature:t,fields:e})=>t.properties?(console.log(t.properties),console.log(e),u(C,{children:[e.postcodeField&&o("span",{children:t.properties[e.postcodeField.key]}),e.mainFields&&e.mainFields.map(s=>{var d;return o("span",{children:(d=t.properties)==null?void 0:d[s.key]})}),e.detailFields&&e.detailFields.map(s=>{var d;return o("span",{children:(d=t.properties)==null?void 0:d[s.key]})})]})):null,Ie={source:"https://yuiseki.github.io/osm-address-editor-vite/",created_by:"osm-address-editor-vite",locale:navigator.language,comment:"Update address"},Ee=({feature:t,onCancel:e,onSubmit:s})=>{var L,_,l,p;const{detectCountry:d,loadingCountry:a}=Ne(),i=JSON.parse((L=t.properties)==null?void 0:L.center),[c,y]=r.exports.useState(void 0),[m,f]=r.exports.useState(),[g,I]=r.exports.useState(t),[k,E]=r.exports.useState(!1),[h,N]=r.exports.useState(!1),[w,b]=r.exports.useState(!1);r.exports.useEffect(()=>{E(v.exports.isLoggedIn())},[]),r.exports.useEffect(()=>{(async()=>{var x;const n=await d(i[0],i[1]);if(y(n),((x=n==null?void 0:n.properties)==null?void 0:x.ISO_A3)&&B[n.properties.ISO_A3]){const S=B[n.properties.ISO_A3];f(S)}})()},[t]),r.exports.useEffect(()=>{console.log(g.properties)},[g]);const F=r.exports.useCallback(async()=>{console.info("openReverseGeocoder",[i[0],i[1]]);const n=await ie.openReverseGeocoder([i[0],i[1]]);console.info("openReverseGeocoder",n),I(x=>{const S={properties:A({"addr:province":n.prefecture,"addr:city":n.city},x.properties)};return A(A({},x),S)})},[]),R=r.exports.useCallback(async n=>{var D,q,G;b(!0),n.preventDefault();const x=new FormData(n.currentTarget),S=JSON.parse((D=t.properties)==null?void 0:D.tags);x.forEach((z,Y)=>{typeof z=="string"&&z.length>0&&(S[Y]=z)});const M={type:"way",id:t.id,version:(q=t.properties)==null?void 0:q.version,tags:S,nodes:JSON.parse((G=t.properties)==null?void 0:G.nodes)};console.info(JSON.stringify(M,null,2));const X={create:[],modify:[M],delete:[]};await v.exports.uploadChangeset(Ie,X),b(!1),window.alert(`Successfully updated OpenStreetMap!!!
 Wait a minutes to apply to the map...`),s()},[t]),O=r.exports.useCallback(()=>{N(!0)},[]);return g.properties?u("div",{children:[u("div",{children:["OSM:"," ",o("a",{className:"underline text-blue-600 hover:text-blue-800 visited:text-purple-600",href:"https://www.openstreetmap.org/"+g.properties.id,target:"_blank",children:g.properties.id})," | ",o(K,{feature:g}),m&&u("span",{children:[" | ","Address:"," ",o(Fe,{feature:g,fields:m})]})]}),a?o(j,{icon:$,spin:!0}):o(C,{children:m?u("form",{onSubmit:R,children:[o("div",{className:"flex flex-wrap",children:o(T,{feature:g,fieldName:m.postcodeField.key,label:m.postcodeField.displayName,placeholder:m.postcodeField.placeholder,onChange:O})}),o("div",{className:"flex flex-wrap",children:m.mainFields.map(n=>o(T,{feature:g,fieldName:n.key,label:n.displayName,placeholder:n.placeholder,onChange:O},n.key))}),o("div",{className:"flex flex-wrap",children:m.detailFields.map(n=>o(T,{feature:g,fieldName:n.key,label:n.displayName,placeholder:n.placeholder,onChange:O},n.key))}),o("div",{className:"flex flex-wrap",children:u("div",{className:"w-full py-2 px-2 mb-6 md:mb-0",children:[o("button",{type:"button",onClick:e,className:"button rounded mr-4 py-2 px-3  bg-gray-200 text-red-600 hover:text-red-800",children:"Cancel"}),((_=c==null?void 0:c.properties)==null?void 0:_.ISO_A3)==="JPN"&&o("button",{type:"button",onClick:F,className:"button rounded mr-4 py-2 px-3 bg-green-300 text-gray-800 hover:text-white",children:"Load address from coordinates"}),o("button",{disabled:!k||w||!h,className:"button rounded mr-2 py-2 px-3 bg-blue-300 text-gray-800 disabled:bg-blue-100 disabled:text-gray-400 hover:text-white",children:"Submit to OpenStreetMap!"}),!k&&u(C,{children:[o("span",{className:"mr-2 underline text-red-600",children:"Require logged in before you submit data to OpenStreetMap"}),o(W,{})]})]})})]}):o("div",{className:"flex flex-wrap",children:u("div",{className:"w-full mb-6 md:mb-0",children:[u("div",{className:"py-2",children:[u("p",{children:["Sorry, Address editor in this country"," ",(l=c==null?void 0:c.properties)==null?void 0:l.NAME," (ISO code:",(p=c==null?void 0:c.properties)==null?void 0:p.ISO_A3,") does not support yet."]}),o("p",{children:o("a",{href:"https://github.com/yuiseki/osm-address-editor-vite",target:"_blank",className:"underline text-blue-600 hover:text-blue-800 visited:text-purple-600",children:"Pull requests are welcome!"})})]}),o("button",{type:"button",onClick:e,className:"button rounded mr-4 py-2 px-3  bg-gray-200 text-red-600 hover:text-red-800",children:"Cancel"})]})})})]}):null};function Le(t,e){const[s,d]=r.exports.useState(t);return r.exports.useEffect(()=>{const a=setTimeout(()=>{d(t)},e);return()=>{clearTimeout(a)}},[t,e]),s}const Ae=({feature:t})=>o(C,{children:t.properties&&Object.keys(t.properties).map(e=>{var s;if(e.startsWith("addr"))return u("div",{className:e,children:[o("span",{className:"underline",children:e})," = ",o("span",{children:(s=t.properties)==null?void 0:s[e]})]})})}),Oe=({feature:t,size:e})=>t.properties===null?null:o(C,{children:t.properties.userIconHref.length>0?o("img",{src:t.properties.userIconHref,style:{width:e+"px",height:e+"px"}}):o("span",{dangerouslySetInnerHTML:{__html:le(t.properties.user||"noname",e)}})}),Me=({feature:t})=>{var e;return((e=t.properties)==null?void 0:e.uid)?u("span",{children:["Last edited by: ",t.properties.uid]}):null},_e={version:8,sources:{"raster-tiles":{type:"raster",tiles:["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png","https://b.tile.openstreetmap.org/{z}/{x}/{y}.png","https://c.tile.openstreetmap.org/{z}/{x}/{y}.png"],tileSize:256,attribution:"\xA9 OpenStreetMap contributors"}},layers:[{id:"osm-tiles",type:"raster",source:"raster-tiles",minzoom:0,maxzoom:20}]},je={id:"buildings-layer-fill",type:"fill",source:"buildings-source",paint:{"fill-color":["case",["boolean",["feature-state","select"],!1],"green",["all",["boolean",["has","addr:postcode"],!1],["boolean",["has","addr:province"],!1],["boolean",["has","addr:city"],!1],["boolean",["has","addr:quarter"],!1],["boolean",["has","addr:neighbourhood"],!1],["boolean",["has","addr:block_number"],!1],["boolean",["has","addr:housenumber"],!1]],"blue",["any",["boolean",["has","addr:postcode"],!1],["boolean",["has","addr:province"],!1],["boolean",["has","addr:city"],!1],["boolean",["has","addr:quarter"],!1],["boolean",["has","addr:neighbourhood"],!1],["boolean",["has","addr:block_number"],!1],["boolean",["has","addr:housenumber"],!1]],"yellow","red"],"fill-opacity":["case",["boolean",["feature-state","select"],!1],.8,["boolean",["feature-state","hover"],!1],.8,.4]},filter:["==","$type","Polygon"]};function Re(){const t=r.exports.useRef(null),[e,s]=r.exports.useState(),d=Le(e,1e3),a=r.exports.useRef(null),[i,c]=r.exports.useState({type:"FeatureCollection",features:[]}),[y,m]=r.exports.useState("auto"),[f,g]=r.exports.useState(),[I,k]=r.exports.useState([]),{fetchOverpass:E,loadingOverpass:h}=Ce();r.exports.useEffect(()=>{setTimeout(()=>{var l;console.log(window.location.hash),!!window.location.hash.endsWith("/0/0")&&(console.log("geolocateControlRef trigger"),(l=a.current)==null||l.trigger())},500)},[]);const N=r.exports.useCallback(l=>{const p=l.target.getCenter(),n=l.target.getZoom();s({zoom:n,latitude:p.lat,longitude:p.lng,bearing:0,pitch:0,padding:{top:0,bottom:0,left:0,right:0}})},[]),w=r.exports.useCallback(l=>{s(l.viewState)},[]),b=r.exports.useCallback(l=>{s(l.viewState)},[]);r.exports.useEffect(()=>{(async()=>{if(!d)return;const l=d,p=await E(l.latitude,l.longitude,l.zoom);c(p)})()},[d]);const F=r.exports.useCallback(l=>{var M;m("pointer");const{features:p,point:{x:n,y:x}}=l,S=p&&p[0];S?((M=t.current)==null||M.setFeatureState({source:"buildings-source",id:S.id},{hover:!0}),g({feature:S,x:n,y:x})):g(void 0)},[]),R=r.exports.useCallback(l=>{var p;m("auto"),(p=t.current)==null||p.querySourceFeatures("buildings-source").map(n=>{var x;(x=t.current)==null||x.setFeatureState({source:"buildings-source",id:n.id},{hover:!1})}),g(void 0)},[]),O=r.exports.useCallback(l=>{var n;L();const p=l.features&&l.features[0];!p||((n=t.current)==null||n.setFeatureState({source:"buildings-source",id:p.id},{select:!0}),k([p]))},[]),L=r.exports.useCallback(()=>{var l;(l=t.current)==null||l.querySourceFeatures("buildings-source").map(p=>{var n;(n=t.current)==null||n.setFeatureState({source:"buildings-source",id:p.id},{select:!1})}),k([])},[]),_=r.exports.useMemo(()=>{let l=20;return e&&(l=e.zoom<18?15:e.zoom<19?20:30),i.features.map((p,n)=>p.properties?o(de,{style:{cursor:"pointer"},longitude:p.properties.center[0],latitude:p.properties.center[1],anchor:"center",children:o(Oe,{feature:p,size:l})},`marker-${n}`):null)},[i,e]);return u("div",{children:[o(ke,{}),u("div",{style:{zIndex:1,position:"absolute",top:0,left:0,height:"100vh",width:"100vw",display:"flex",flexDirection:"column"},children:[I.length>0&&o("div",{style:{zIndex:200,position:"absolute",top:"44px",left:0,width:"100vw",backgroundColor:"rgba(255, 255, 255, 0.9)"},children:o("div",{style:{padding:"10px"},children:I.map(l=>o(Ee,{feature:l,onCancel:L,onSubmit:L},l.id))})}),u(ce,V(A({ref:t},e),{onMove:w,onMoveEnd:b,onLoad:N,interactiveLayerIds:["buildings-layer-fill"],onClick:O,onMouseEnter:F,onMouseLeave:R,dragRotate:!1,boxZoom:!1,hash:!0,cursor:y,mapLib:pe,style:{width:"100%",height:"100%"},mapStyle:_e,children:[o(ue,{id:"buildings-source",type:"geojson",data:i,children:o(ge,A({},je))}),o(fe,{position:"top-left",style:{marginTop:"55px"},showCompass:!1}),o(he,{ref:a,position:"top-left",showUserLocation:!0,showAccuracyCircle:!1,trackUserLocation:!1,positionOptions:{enableHighAccuracy:!0},fitBoundsOptions:{zoom:17}}),o("div",{className:"fa-2xl",style:{zIndex:100,display:"flex",position:"absolute",top:"50%",left:"50%",textAlign:"center",verticalAlign:"middle"},children:!e||(e==null?void 0:e.zoom)&&e.zoom<16?o(j,{size:"2x",icon:me}):h?o(j,{size:"2x",icon:$,spin:!0}):o(j,{size:"2x",icon:ye})}),_,f&&u("div",{className:"tooltip",style:{zIndex:10,background:"rgba(255, 255, 255, 0.7)",padding:"5px",width:"250px",position:"absolute",left:f.x+5,top:f.y+5},children:[o(K,{feature:f.feature}),o("br",{}),o(Me,{feature:f.feature}),o(Ae,{feature:f.feature})]})]}))]})]})}window.Buffer=be.Buffer;xe.render(o(ve.StrictMode,{children:o(Re,{})}),document.getElementById("root"));
