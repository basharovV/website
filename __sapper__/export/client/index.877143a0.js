import{S as t,i as s,s as e,e as l,t as n,b as o,d as r,g as a,h,l as c,m as f,n as i,B as u,a as p,w as g,f as d,p as m,C as v}from"./client.2d0a8ffd.js";function E(t,s,e){const l=t.slice();return l[1]=s[e],l}function b(t){let s,e,p,g,d=t[1].title+"";return{c(){s=l("li"),e=l("a"),p=n(d),this.h()},l(t){s=o(t,"LI",{});var l=r(s);e=o(l,"A",{rel:!0,href:!0});var n=r(e);p=a(n,d),n.forEach(h),l.forEach(h),this.h()},h(){c(e,"rel","prefetch"),c(e,"href",g="blog/"+t[1].slug)},m(t,l){f(t,s,l),i(s,e),i(e,p)},p(t,s){1&s&&d!==(d=t[1].title+"")&&u(p,d),1&s&&g!==(g="blog/"+t[1].slug)&&c(e,"href",g)},d(t){t&&h(s)}}}function j(t){let s,e,u,j,x,B=t[0],L=[];for(let s=0;s<B.length;s+=1)L[s]=b(E(t,B,s));return{c(){s=p(),e=l("h1"),u=n("Recent posts"),j=p(),x=l("ul");for(let t=0;t<L.length;t+=1)L[t].c();this.h()},l(t){g('[data-svelte="svelte-hfp9t8"]',document.head).forEach(h),s=d(t),e=o(t,"H1",{});var l=r(e);u=a(l,"Recent posts"),l.forEach(h),j=d(t),x=o(t,"UL",{class:!0});var n=r(x);for(let t=0;t<L.length;t+=1)L[t].l(n);n.forEach(h),this.h()},h(){document.title="Blog",c(x,"class","svelte-dfcnm7")},m(t,l){f(t,s,l),f(t,e,l),i(e,u),f(t,j,l),f(t,x,l);for(let t=0;t<L.length;t+=1)L[t].m(x,null)},p(t,[s]){if(1&s){let e;for(B=t[0],e=0;e<B.length;e+=1){const l=E(t,B,e);L[e]?L[e].p(l,s):(L[e]=b(l),L[e].c(),L[e].m(x,null))}for(;e<L.length;e+=1)L[e].d(1);L.length=B.length}},i:m,o:m,d(t){t&&h(s),t&&h(e),t&&h(j),t&&h(x),v(L,t)}}}function x(){return this.fetch("blog.json").then((t=>t.json())).then((t=>({posts:t})))}function B(t,s,e){let{posts:l}=s;return t.$$set=t=>{"posts"in t&&e(0,l=t.posts)},[l]}export default class extends t{constructor(t){super(),s(this,t,B,j,e,{posts:0})}}export{x as preload};
