(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{338:function(t,e,n){var content=n(343);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(30).default)("78b7c120",content,!0,{sourceMap:!1})},342:function(t,e,n){"use strict";n(338)},343:function(t,e,n){var r=n(29)(!1);r.push([t.i,".intro[data-v-f4971d5e]{padding-top:80px;padding-bottom:30px}.page-text--title[data-v-f4971d5e]{font-style:normal;font-weight:500;font-size:40px;line-height:150%}.page-text--text[data-v-f4971d5e]{font-weight:400;font-size:20px;line-height:30px}.section-divider[data-v-f4971d5e]{margin-bottom:30px}",""]),t.exports=r},349:function(t,e,n){"use strict";n.r(e);n(16),n(15),n(18),n(27),n(17),n(28);var r=n(3),o=n(80);function c(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function l(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var f={name:"Projects",data:function(){return{projectTags:["[ Сайты ]","[ Соц. сети ]"],noteTags:["[ Дизайн ]","[ Маркетинг ]"],selectedProjectTags:[],selectedNoteTags:[]}},computed:l(l(l(l({},Object(o.d)("pages",{yearList:function(t){return t.yearList},tags:function(t){return t.tags},items:function(t){return t.items}})),Object(o.d)("notes",{notes:function(t){return t.items}})),Object(o.c)("pages",["getYear","getLimit","getOffset","getStep"])),{},{year:{get:function(){return this.getYear},set:function(t){this.setYear(t)}},limit:{get:function(){return this.getLimit},set:function(t){this.setLimit(t)}},offset:{get:function(){return this.getOffset},set:function(t){this.setOffset(t)}},step:function(){return this.getStep}}),watch:{year:function(t){this.setYear(t)},selectedProjectTags:{handler:function(t){this.setTags(t)},deep:!0},selectedNoteTags:{handler:function(t){this.$store.dispatch("notes/setTags",t)},deep:!0}},mounted:function(){this.init(),this.$store.dispatch("notes/init")},methods:l(l(l({},Object(o.b)("pages",["init","setYear","setTags","setLimit","setOffset","updateItems"])),Object(o.b)("notes",["init3"])),{},{loadMore:function(){this.offset+=this.step}})},d=(n(342),n(33)),v=n(66),m=n.n(v),x=n(331),y=n(336),h=n(332),component=Object(d.a)(f,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",{staticClass:"pa-0",attrs:{tag:"main",fluid:""}},[n("v-container",{staticClass:"pa-0",attrs:{tag:"section"}},[n("v-row",{staticClass:"mx-md-n3 mx-0"},[n("v-col",{attrs:{cols:"12"}},[n("div",{staticClass:"page-text intro"},[n("h1",{staticClass:"page-text--title"},[t._v("\n            Метод работы\n          ")]),t._v(" "),n("p",{staticClass:"page-text--text"},[t._v("\n            Предпочитаю командную игру. Не боюсь ошибок — исправить их легко, а нового без них не создать. Дохну от рутины. Продукт должен работать, а кнопки после покрасим. Придерживаюсь понятия “Клиент не может быть прав, он не специалист. Но у него вся нужная информация”.\n          ")])])]),t._v(" "),n("v-col",{staticClass:"py-0 d-flex justify-end justify-sm-start",attrs:{cols:"12"}},[n("Button",{attrs:{title:"[ Написать ]",href:"mailto:fivych@mail.ru"}})],1),t._v(" "),n("v-col",{staticClass:"py-0 section-wrapper",attrs:{cols:"12"}},[n("div",{staticClass:"d-flex flex-row align-center flex-wrap"},[n("h2",{staticClass:"page-text--title d-flex"},[t._v("\n            Проекты\n          ")]),t._v(" "),n("TagList",{attrs:{tags:t.projectTags},model:{value:t.selectedProjectTags,callback:function(e){t.selectedProjectTags=e},expression:"selectedProjectTags"}}),t._v(" "),n("YearSort",{staticClass:"pb-3",attrs:{"year-list":t.yearList,right:""},model:{value:t.year,callback:function(e){t.year=e},expression:"year"}})],1)]),t._v(" "),t._l(t.items,(function(t,e){return n("v-col",{key:e,staticClass:"col-md-6 col-lg-4 py-0 justify-sm-center",attrs:{cols:"12"}},[n("CardProject",{attrs:{project:t}})],1)})),t._v(" "),n("v-col",{staticClass:"d-flex flex-row justify-end align-baseline flex-wrap",attrs:{cols:"12"}},[t.$vuetify.breakpoint.mdAndUp?n("TagList",{attrs:{tags:t.projectTags},model:{value:t.selectedProjectTags,callback:function(e){t.selectedProjectTags=e},expression:"selectedProjectTags"}}):t._e(),t._v(" "),n("Button",{staticClass:"pl-5",attrs:{title:t.$vuetify.breakpoint.smAndDown?"[ Проекты ]":"[ Все проекты ]"},on:{click:function(e){return t.loadMore()}}})],1)],2)],1),t._v(" "),t.$vuetify.breakpoint.mdAndUp?n("v-container",{staticClass:"section-divider py-0",attrs:{fluid:"",tag:"div"}}):t._e(),t._v(" "),n("v-container",{staticClass:"pa-0",attrs:{tag:"section"}},[n("v-row",{staticClass:"mx-md-n3 mx-0"},[t.notes?n("v-col",{staticClass:"py-0 pb-5 section-wrapper",attrs:{cols:"12"}},[n("div",{staticClass:"d-flex flex-row align-center flex-wrap"},[n("h2",{staticClass:"page-text--title d-flex"},[t._v("\n            Проекты\n          ")]),t._v(" "),n("TagList",{attrs:{tags:t.noteTags},model:{value:t.selectedNoteTags,callback:function(e){t.selectedNoteTags=e},expression:"selectedNoteTags"}})],1)]):t._e(),t._v(" "),t._l(3,(function(e,r){return n("v-col",{key:r,staticClass:"col-lg-6 col-xl-4 py-0 px-0 px-md-3 justify-sm-center",attrs:{cols:"12"}},[t.notes[r]?n("CardNotes",{attrs:{note:t.notes[r]}}):t._e()],1)})),t._v(" "),n("v-col",{staticClass:"d-flex flex-row justify-end align-baseline flex-wrap",attrs:{cols:"12"}},[n("Button",{staticClass:"pl-5",attrs:{title:t.$vuetify.breakpoint.smAndDown?"[ Заметки ]":"[ Все заметки ]",to:"/notes"}})],1)],2)],1)],1)}),[],!1,null,"f4971d5e",null);e.default=component.exports;m()(component,{Button:n(161).default,TagList:n(163).default,YearSort:n(164).default,CardProject:n(162).default,CardNotes:n(160).default}),m()(component,{VCol:x.a,VContainer:y.a,VRow:h.a})}}]);