(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{40:function(e,t,a){e.exports=a(69)},49:function(e,t,a){},69:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),o=a(20),i=a.n(o),r=a(7),l=a(16),c=a(15),_={isStart:!1};var m=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:_,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SERVER_IS_START":return Object(c.a)({},e,{isStart:t.value})||e;default:return e}},u={isConnect:!1,identifiant:null,role:null};var d=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:u,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SAVE_USER":return Object(c.a)({},e,{isConnect:!0,identifiant:t.value.identifiant,role:t.value.role})||e;default:return e}},v=Object(l.b)({server:m,user:d}),p=Object(l.c)(v),h=(a(49),a(2)),f=a(3),g=a(4),E=a(5),b=a(14),S=a(9),y=function(e){Object(E.a)(a,e);var t=Object(g.a)(a);function a(e){var n;return Object(h.a)(this,a),(n=t.call(this,e)).state={},n}return Object(f.a)(a,[{key:"render",value:function(){var e;return e=3===this.props.userRole?s.a.createElement("div",{className:"home__links"},s.a.createElement(S.b,{className:"home__links__link",to:"/music"},s.a.createElement("span",null,"Musiques")),s.a.createElement(S.b,{className:"home__links__link",to:"/music"},s.a.createElement("span",null,"Todo Galerie")),s.a.createElement(S.b,{className:"home__links__link",to:"/admin"},s.a.createElement("span",null,"Administration"))):2===this.props.userRole?s.a.createElement("div",{className:"home__links"},s.a.createElement(S.b,{className:"home__links__link",to:"/music"},s.a.createElement("span",null,"Musiques")),s.a.createElement(S.b,{className:"home__links__link",to:"/music"},s.a.createElement("span",null,"Todo Galerie"))):"",s.a.createElement("div",{className:"home"},s.a.createElement("div",{className:"home__links"},s.a.createElement(S.b,{className:"home__links__link",to:"/video"},s.a.createElement("span",null,"Vid\xe9os")),e))}}]),a}(n.Component),N=Object(r.b)((function(e){return{userRole:e.user.role}}),(function(e){return{dispatch:function(t){e(t)}}}))(y),k=a(8),w=a(6),O=a.n(w),C="https://sith-api.hopto.org/api/",x=null,I=function(e){Object(E.a)(a,e);var t=Object(g.a)(a);function a(e){var n;return Object(h.a)(this,a),(n=t.call(this,e)).activeRandomSong=function(){n.state.randomSong?n.setState({randomSong:!1}):n.setState({randomSong:!0,reloadSong:!1,reloadAlbum:!1})},n.activeReloadSong=function(){n.state.reloadSong?n.setState({reloadSong:!1}):n.setState({reloadSong:!0,reloadAlbum:!1,randomSong:!1})},n.activeReloadAlbum=function(){n.state.reloadAlbum?n.setState({reloadAlbum:!1}):n.setState({reloadAlbum:!0,reloadSong:!1,randomSong:!1})},n.playNextSong=function(){if(n.state.reloadSong)x.currentTime=0,x.play();else if(n.state.randomSong){var e=Math.floor(n.state.listOfSongs.length-1),t=Math.floor(Math.random()*(e-0))+0;n.getStream(n.state.listOfSongs[t])}else{var a=n.state.listOfSongs.indexOf(n.state.songTitle),s=n.state.listOfSongs[a+1];a+1<=n.state.listOfSongs.length-1?n.getStream(s):n.state.reloadAlbum&&n.getStream(n.state.listOfSongs[0])}},n.getAllFolders=function(){O.a.get(C+"music/folder").then((function(e){console.log(e),n.setState({listOfFolders:e.data})})).catch((function(e){}))},n.getAllSongs=function(){O.a.get(C+"get-all-songs/").then((function(e){console.log(e),n.setState({listOfSongs:e.data.repertorySongs,repertoryImg:e.data.repertoryImg})})).catch((function(e){}))},n.changePlayerState=function(){"paused"===n.state.playerStatus?(x.play(),n.setState({playerStatus:"playing"})):(x.pause(),n.setState({playerStatus:"paused"}))},n.fastBackward=function(){var e=n.state.listOfSongs.indexOf(n.state.songTitle),t=n.state.listOfSongs[e-1];e-1>=0&&n.getStream(t)},n.fastForward=function(){var e=n.state.listOfSongs.indexOf(n.state.songTitle),t=n.state.listOfSongs[e+1];e+1<=n.state.listOfSongs.length-1?n.getStream(t):n.getStream(n.state.listOfSongs[0])},n.state={listOfSongs:[],playerStatus:"stopped",songIsCharged:!1,currentTime:"0:00",duration:"0:00",songTitle:"",source:null,showMusicFolder:!0,listOfFolders:[],openFolder:null,reloadAlbum:!1,reloadSong:!1,randomSong:!1,isFirstSongOfAlbulm:!1},n}return Object(f.a)(a,[{key:"componentDidMount",value:function(){this.getAllFolders(),this.getAlbumImg()}},{key:"componentDidUpdate",value:function(e,t){var a=this;this.state.songIsCharged&&(x.onended=function(){a.playNextSong()})}},{key:"getAlbumImg",value:function(){var e=this;O.a.get(C+"img/",{responseType:"arraybuffer"}).then((function(t){var a=btoa(new Uint8Array(t.data).reduce((function(e,t){return e+String.fromCharCode(t)}),""));e.setState({source:"data:;base64,"+a})}))}},{key:"getStream",value:function(e){var t=this;this.state.songIsCharged&&x.pause(),this.setState({songIsCharged:!0,songTitle:e,playerStatus:"playing"}),(x=new Audio(C+"play/"+this.state.openFolder+"/"+e)).play(),x.ontimeupdate=function(){t.getCurrentTime()}}},{key:"openFolder",value:function(e){var t=this;O.a.get(C+"get-folder-songs/"+e).then((function(a){console.log(a.data),t.setState({listOfSongs:a.data.repertorySongs,repertoryImg:a.data.repertoryImg,showMusicFolder:!1,openFolder:e})})).catch((function(e){}))}},{key:"backward",value:function(){x.currentTime=x.currentTime-10}},{key:"forward",value:function(){x.currentTime=x.currentTime+10}},{key:"getTime",value:function(e){if(!isNaN(e))return Math.floor(e/60)+":"+("0"+Math.floor(e%60)).slice(-2)}},{key:"getCurrentTime",value:function(){if(!0===this.state.songIsCharged){var e=Math.floor(x.currentTime/60)+":"+("0"+Math.floor(x.currentTime%60)).slice(-2);this.setState({currentTime:e}),0===this.state.listOfSongs.indexOf(this.state.songTitle)?this.setState({isFirstSongOfAlbulm:!0}):this.setState({isFirstSongOfAlbulm:!1})}}},{key:"getDuration",value:function(){if(!0===this.state.songIsCharged){var e=Math.floor(x.duration/60)+":"+("0"+Math.floor(x.duration%60)).slice(-2);return isNaN(x.duration)?"":e}}},{key:"render",value:function(){var e=this,t=this.state.openFolder,a=this.state.songTitle,n=this.state.currentTime,o=this.getDuration(),i=this.state.listOfFolders.map((function(t,a){return s.a.createElement("div",{className:"music__folder__folder-title",key:a,onClick:function(){return e.openFolder(t)}},s.a.createElement("span",null,t))})),r=this.state.listOfSongs.map((function(t,a){return s.a.createElement("div",{className:"music__list__song-title",key:a,onClick:function(){return e.getStream(t)}},s.a.createElement("span",null,t))}));return s.a.createElement("div",{className:"music"},this.state.showMusicFolder?s.a.createElement("div",{className:"music__folder"},i):s.a.createElement("div",{className:"music__list"},r),s.a.createElement("div",{className:"music__player"},s.a.createElement("div",{className:"music__player__song-information"},s.a.createElement("div",{className:"music__player__song-information__content"},s.a.createElement("span",{className:"music__player__song-information__content__song-title"},a),s.a.createElement("span",{className:"music__player__song-information__content__album-title"},t))),s.a.createElement("div",{className:"music__player__timer"},"playing"===this.state.playerStatus||"paused"===this.state.playerStatus?s.a.createElement("div",{className:"music__player__timer__currentime"},s.a.createElement("span",null,n," / ",o)):s.a.createElement("div",{className:"music__player__timer__currentime"},s.a.createElement("span",null,"0:00 / 0:00")),s.a.createElement("div",{className:"music__player__timer__song-options"},s.a.createElement("button",{className:"music__player__timer__song-options__reload-button "+(this.state.randomSong?"isCheck":""),onClick:this.activeRandomSong},s.a.createElement(k.a,{icon:"random"})),s.a.createElement("button",{className:"music__player__timer__song-options__reload-button "+(this.state.reloadSong?"isCheck":""),onClick:this.activeReloadSong},s.a.createElement(k.a,{icon:"retweet"}),s.a.createElement("span",{className:"music__player__timer__song-options__reload-button__reload-song-span"},"1")),s.a.createElement("button",{className:"music__player__timer__song-options__reload-button "+(this.state.reloadAlbum?"isCheck":""),onClick:this.activeReloadAlbum},s.a.createElement(k.a,{icon:"retweet"}),s.a.createElement("span",{className:"music__player__timer__song-options__reload-button__reload-song-span"},"all")),s.a.createElement("button",{className:"music__player__timer__song-options__cast-button ",onClick:function(){return e.setState({showMusicFolder:!0})}},s.a.createElement(k.a,{icon:["fab","chromecast"]})))),s.a.createElement("div",{className:"music__player__control"},s.a.createElement("div",{className:"music__player__control__buttons"},this.state.isFirstSongOfAlbulm?s.a.createElement("button",{disabled:!0,className:"music__player__control__buttons__button music__player__control__button__back isDisabled",onClick:this.fastBackward},s.a.createElement(k.a,{icon:"fast-backward"})):s.a.createElement("button",{className:"music__player__control__buttons__button music__player__control__button__back",onClick:this.fastBackward},s.a.createElement(k.a,{icon:"fast-backward"})),s.a.createElement("button",{className:"music__player__control__buttons__button music__player__control__button__back",onClick:this.backward},s.a.createElement(k.a,{icon:"backward"})),"stopped"===this.state.playerStatus||"paused"===this.state.playerStatus?s.a.createElement("button",{className:"music__player__control__buttons__button",onClick:this.changePlayerState},s.a.createElement(k.a,{icon:"play",size:"1x"})):s.a.createElement("button",{className:"music__player__control__buttons__button",onClick:this.changePlayerState},s.a.createElement(k.a,{icon:"pause",size:"1x"})),s.a.createElement("button",{className:"music__player__control__buttons__button music__player__control__button__next",onClick:this.forward},s.a.createElement(k.a,{icon:"forward"})),s.a.createElement("button",{className:"music__player__control__buttons__button music__player__control__button__next",onClick:this.fastForward},s.a.createElement(k.a,{icon:"fast-forward"}))))))}}]),a}(n.Component),j=Object(r.b)((function(e){return{}}),(function(e){return{dispatch:function(t){e(t)}}}))(I),M=a(39),T=function(e){Object(E.a)(a,e);var t=Object(g.a)(a);function a(e){var n;return Object(h.a)(this,a),(n=t.call(this,e)).getVideos=function(){n.setState({loadVideosSpinner:!0}),O.a.get("https://sith-api.hopto.org/api/all-films").then((function(e){var t=n.state.listOfVideos,a=n.state.titleOfVideos,s=[];e.data.map((function(e,o){console.log(e);var i=e;t.push(i),s={key:e.title.toLowerCase(),value:e.title},a.push(s),n.setState({listOfVideos:t,titleOfVideos:a,loadVideosSpinner:!1})}))})).catch((function(e){n.setState({loadVideosSpinner:!1})}))},n.handleSearchFilmChange=function(e){var t=e.target.value;if(n.setState({searchFilm:t}),t.length>0){var a=new M.a(n.state.listOfVideos,{includeScore:!0,keys:["title"]}).search(t);n.setState({searchVideoResults:a,searchActive:!0})}else n.setState({searchActive:!1})},n.deleteSearch=function(){n.setState({searchVideoResults:[],searchActive:!1,searchFilm:""})},n.state={listOfVideos:[],searchInlistOfVideos:[],titleOfVideos:[],searchVideoResults:[],searchActive:!1,loadVideosSpinner:!1},n}return Object(f.a)(a,[{key:"componentDidMount",value:function(){this.getVideos()}},{key:"componentDidUpdate",value:function(){}},{key:"render",value:function(){var e=this.state.listOfVideos.map((function(e,t){return s.a.createElement(S.b,{className:"video__content__video-info",to:"/video-detail/"+e.title,key:t},s.a.createElement("img",{src:e.poster_path,alt:"film-poster",className:"video__content__video-info__img"}),s.a.createElement("div",{className:"video__content__video-info__text"},s.a.createElement("span",{className:"video__content__video-info__text__title"},e.title),s.a.createElement("p",{className:"video__content__video-info__text__overview"},e.overview.substr(0,250)),s.a.createElement("span",{className:"video__content__video-info__text__vote"},"Note Tmdb: ",e.vote_average," / 10")))})),t=this.state.searchVideoResults.map((function(e,t){return s.a.createElement(S.b,{className:"video__content__video-info",to:"/video-detail/"+e.item.title,key:t},s.a.createElement("img",{src:e.item.poster_path,alt:"film-poster",className:"video__content__video-info__img"}),s.a.createElement("div",{className:"video__content__video-info__text"},s.a.createElement("span",{className:"video__content__video-info__text__title"},e.item.title),s.a.createElement("p",{className:"video__content__video-info__text__overview"},e.item.overview.substr(0,250)),s.a.createElement("span",{className:"video__content__video-info__text__vote"},"Note Tmdb: ",e.item.vote_average," / 10")))}));return s.a.createElement("div",{className:"video"},this.state.loadVideosSpinner?s.a.createElement("div",{className:"video__loader"},s.a.createElement(k.a,{icon:"spinner",spin:!0,size:"2x"})):s.a.createElement("div",{className:"video__content"},this.state.searchActive?s.a.createElement("div",{className:"video__content__display"},t):s.a.createElement("div",{className:"video__content__display"},e)),s.a.createElement("div",{className:"video__searchbar"},s.a.createElement("div",{className:"video__searchbar__opacity"}),s.a.createElement("div",{className:"video__searchbar__content"},s.a.createElement("input",{type:"text",id:"InputId",value:this.state.searchFilm,onChange:this.handleSearchFilmChange,placeholder:"Rechercher"}),s.a.createElement("button",{className:"video__searchbar__content__delete",onClick:this.deleteSearch},s.a.createElement(k.a,{icon:"times-circle",size:"1x"})))))}}]),a}(n.Component),F=Object(r.b)((function(e){return{}}),(function(e){return{dispatch:function(t){e(t)}}}))(T),R=function(e){Object(E.a)(a,e);var t=Object(g.a)(a);function a(e){var n;return Object(h.a)(this,a),(n=t.call(this,e)).getVideoInfo=function(e){O.a.get("https://sith-api.hopto.org/api/one-film/"+e).then((function(e){var t={title:e.data.title,overview:e.data.overview,poster_path:e.data.poster_path,vote_average:e.data.vote_average,media_name:e.data.media_name,release_date:e.data.release_date};n.setState({selectVideo:t}),console.log(n.state.selectVideo)})).catch((function(e){}))},n.state={selectVideo:null,videoIsPlay:!1},n}return Object(f.a)(a,[{key:"componentDidMount",value:function(){var e=this.props.location.pathname.split("/")[2];this.getVideoInfo(e)}},{key:"componentDidUpdate",value:function(){console.log(this.state.selectVideo)}},{key:"render",value:function(){var e=this,t=this.state.selectVideo;return s.a.createElement("div",{className:"video-detail"},t&&s.a.createElement("div",{className:"video-detail__content"},s.a.createElement("img",{src:t.poster_path,alt:"film-poster",className:"video-detail__content__img"}),s.a.createElement("div",{className:"video-detail__content__text"},s.a.createElement("h2",{className:"video-detail__content__text__title"},t.title),s.a.createElement("p",{className:"video-detail__content__text__overview"},t.overview),s.a.createElement("span",{className:"video-detail__content__text__vote"},"Note Tmdb: ",t.vote_average," / 10"),s.a.createElement("span",{className:"video-detail__content__text__vote"},"Sortie: ",t.release_date," / 10")),s.a.createElement("div",{className:"video-detail__player"},!this.state.videoIsPlay&&s.a.createElement("button",{onClick:function(){return e.setState({videoIsPlay:!0})}},"Regarder"),this.state.videoIsPlay&&s.a.createElement("iframe",{title:"video-player",allowFullScreen:"alloFullScreen",height:"315",src:"https://sith-api.hopto.org/api/video/"+t.media_name,width:"100%","content-type":"video/mkv"}))))}}]),a}(n.Component),D=Object(b.f)(Object(r.b)((function(e){return{}}),(function(e){return{dispatch:function(t){e(t)}}}))(R)),V=function(e){Object(E.a)(a,e);var t=Object(g.a)(a);function a(e){var n;return Object(h.a)(this,a),(n=t.call(this,e)).getServerStatus=function(){setTimeout((function(){O.a.get("https://sith-api.hopto.org/api/start").then((function(e){n.props.dispatch({type:"SERVER_IS_START",value:!0}),n.getServerStatus()})).catch((function(e){n.props.dispatch({type:"SERVER_IS_START",value:!1}),n.getServerStatus()}))}),3e3)},n.state={ServerIsDown:!1},n}return Object(f.a)(a,[{key:"componentDidMount",value:function(){this.getServerStatus()}},{key:"componentDidUpdate",value:function(){console.log("navigation")}},{key:"render",value:function(){return s.a.createElement("div",{className:"server-down"},s.a.createElement("div",{className:"server-down__content"},s.a.createElement("h2",{className:"server-down__content__title"},"Le serveur est actuellement en maintenance"),s.a.createElement("p",{className:"server-down__content__message"},"Veuillez contacter l'administrateur du site ou r\xe9essayer plus tard")))}}]),a}(n.Component),A=Object(r.b)((function(e){return{}}),(function(e){return{dispatch:function(t){e(t)}}}))(V),U=function(e){Object(E.a)(a,e);var t=Object(g.a)(a);function a(e){var n;return Object(h.a)(this,a),(n=t.call(this,e)).handleIdChange=function(e){var t=e.target.value;n.setState({id:t})},n.handlePasswordChange=function(e){var t=e.target.value;n.setState({password:t})},n.handleSubmit=function(e){e.preventDefault(),n.setState({startSpinner:!0}),O.a.post("https://sith-api.hopto.org/api/login",{identifiant:n.state.id,password:n.state.password}).then((function(e){console.log(e);var t={type:"SAVE_USER",value:e.data};n.props.dispatch(t),n.setState({startSpinner:!1})})).catch((function(e){console.log(e),n.setState({connexionError:!0,startSpinner:!1})}))},n.state={id:"",password:"",validId:null,validPassword:null,connexionError:!1,passwordHidden:!0,startSpinner:!1},n}return Object(f.a)(a,[{key:"componentDidMount",value:function(){}},{key:"componentDidUpdate",value:function(){}},{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:"connexion"},s.a.createElement("div",{className:"connexion__content"},s.a.createElement("h2",{className:"connexion__content__title"},"Connexion requise pour acc\xe9der \xe0 nos diff\xe9rents services"),s.a.createElement("form",{className:"connexion__content__form"},s.a.createElement("div",{className:"connexion__content__form__formgroup__id"},s.a.createElement("label",{htmlFor:"exampleInputId"}," Identifiant"),s.a.createElement("input",{type:"text",id:"InputId",value:this.state.id,onChange:this.handleIdChange})),s.a.createElement("div",{className:"connexion__content__form__formgroup__password"},s.a.createElement("label",{htmlFor:"exampleInputPassword1"},"Mot de Passe"),s.a.createElement("div",{className:"connexion__content__form__formgroup__password__content"},s.a.createElement("input",{type:this.state.passwordHidden?"password":"text",className:"",value:this.state.password,onChange:this.handlePasswordChange}),this.state.passwordHidden?s.a.createElement("span",{className:"connexion__content__form__formgroup__password__content__toggle",onClick:function(){return e.setState({passwordHidden:!1})}},s.a.createElement(k.a,{icon:"eye",size:"1x"})):s.a.createElement("span",{className:"connexion__content__form__formgroup__password__content__toggle",onClick:function(){return e.setState({passwordHidden:!0})}},s.a.createElement(k.a,{icon:"eye-slash",size:"1x"})))),s.a.createElement("div",{className:"connexion__content__form__submit"},s.a.createElement("button",{className:"connexion__content__form__submit__button",onClick:this.handleSubmit},this.state.startSpinner?s.a.createElement(k.a,{icon:"spinner",spin:!0,size:"1x"}):s.a.createElement("span",null,"Connexion"))),s.a.createElement("div",{className:"connexion__content__form__error"},this.state.connexionError&&s.a.createElement("p",null,"Identifiants invalides, veuillez r\xe9essayer"))),s.a.createElement("p",{className:"connexion__content__message"},"Si vous avez perdu votre identifiant ou votre mot de passe. Contacter l'administrateur, aucun mot de passe ou identifiant ne sera envoy\xe9 par courriel")))}}]),a}(n.Component),P=Object(r.b)((function(e){return{}}),(function(e){return{dispatch:function(t){e(t)}}}))(U),z=function(e){Object(E.a)(a,e);var t=Object(g.a)(a);function a(e){var n;return Object(h.a)(this,a),(n=t.call(this,e)).state={selectPage:0},n}return Object(f.a)(a,[{key:"componentDidMount",value:function(){}},{key:"componentDidUpdate",value:function(){}},{key:"render",value:function(){return s.a.createElement("div",{className:"admin"},s.a.createElement(S.b,{className:"admin__link",to:"/admin/users"},s.a.createElement("span",null,"Gestion Utilisateurs")),s.a.createElement(S.b,{className:"admin__link",to:"/admin/videos"},s.a.createElement("span",null,"Gestion Vid\xe9os")))}}]),a}(n.Component),B=Object(r.b)((function(e){return console.log(e),{}}),(function(e){return{dispatch:function(t){e(t)}}}))(z),H="https://sith-api.hopto.org/api/",q=function(e){Object(E.a)(a,e);var t=Object(g.a)(a);function a(e){var n;return Object(h.a)(this,a),(n=t.call(this,e)).refresh=function(e){O.a.get(H+"check-films").then((function(e){console.log(e),n.getMedia()})).catch((function(e){console.log(e)}))},n.getMedia=function(){n.setState({medias:[]}),O.a.get(H+"admin-all-films").then((function(e){e.data.map((function(t,a){var s={media_name:t.media_name,verified_by_admin:t.verified_by_admin},o=n.state.medias;return o.push(s),n.setState({medias:o,selectedMedia:e.data[0].media_name}),!0}))})).catch((function(e){console.log(e)}))},n.selectedMedia=function(e){n.setState({selectedMedia:e.target.value,filmTitle:e.target.value})},n.handleFilmTitleChange=function(e){var t=e.target.value;n.setState({filmTitle:t})},n.searchOnTmdb=function(e){e.preventDefault(),n.setState({searchResults:[],showResults:!0,statusMessage:!1});var t="https://api.themoviedb.org/3/search/movie?api_key=9c9ae8a3d0afe9b28787537f6455c4f0&language=fr&query="+n.state.filmTitle;O.a.get(t).then((function(e){e.data.results.map((function(e,t){var a={index:t,title:e.title,overview:e.overview,poster_path:"https://image.tmdb.org/t/p/w300"+e.poster_path,vote_average:e.vote_average,release_date:e.release_date},s=n.state.searchResults;return s.push(a),n.setState({searchResults:s,searchStatusMessageError:!1}),!0}))})).catch((function(e){console.log(e),n.setState({searchStatusMessageError:!0})}))},n.selectedFilm=function(e){console.log(e.overview),n.setState({searchResults:[],selectedFilm:e,showResults:!1})},n.validSelectedFilm=function(e){var t=n.state.selectedFilm,a=n.state.selectedMedia;e.preventDefault(),console.log(a),O.a.post(H+"add-film",{film:t,media_name:a}).then((function(e){n.setState({statusMessage:"Film enregistr\xe9",statusMessageColor:"green"})})).catch((function(e){n.setState({statusMessage:"Une erreur est arriv\xe9e",statusMessageColor:"red"})})),n.getMedia()},n.state={filmTitle:"",searchResults:[],selectedFilm:void 0,showResults:!0,medias:[],selectedMedia:void 0,statusMessage:!1,statusMessageColor:void 0,searchStatusMessageError:!1},n}return Object(f.a)(a,[{key:"componentDidMount",value:function(){this.getMedia()}},{key:"componentDidUpdate",value:function(){}},{key:"render",value:function(){var e=this,t=this.state.searchResults.map((function(t,a){return"https://image.tmdb.org/t/p/w300null"!==t.poster_path&&s.a.createElement("div",{className:"video__content__video-info",onClick:function(){return e.selectedFilm(t)},key:a},s.a.createElement("img",{src:t.poster_path,alt:"film-poster",className:"video__content__video-info__img"}),s.a.createElement("div",{className:"video__content__video-info__text"},s.a.createElement("span",{className:"video__content__video-info__text__title"},t.title),s.a.createElement("p",{className:"video__content__video-info__text__overview"},t.overview.substr(0,250)),s.a.createElement("span",{className:"video__content__video-info__text__vote"},"Note Tmdb: ",t.vote_average," / 10")))})),a=this.state.medias.map((function(e,t){return e.verified_by_admin?s.a.createElement("option",{style:{color:"green"},value:e.media_name,key:t},e.media_name):s.a.createElement("option",{style:{color:"red"},value:e.media_name,key:t},e.media_name)}));return s.a.createElement("div",{className:"admin-video"},s.a.createElement("div",{className:"admin-video__content"},s.a.createElement("button",{onClick:this.refresh},"Actualiser"),s.a.createElement("h2",{className:"admin-video__content__title"},"Ajouter un film"),s.a.createElement("form",{className:"admin-video__content__form"},s.a.createElement("div",{className:"connexion__content__form__formgroup__id"},s.a.createElement("label",{htmlFor:"exampleInputId"}," Choisir le m\xe9dia"),s.a.createElement("select",{name:"medias",style:{width:"100%",height:"2em"},onChange:this.selectedMedia,value:this.state.selectedMedia},a)),s.a.createElement("div",{className:"admin-video__content__form__input-search"},s.a.createElement("input",{type:"text",className:"admin-video__content__form__input-search__input",id:"InputId",value:this.state.filmTitle,placeholder:"Nom du film",onChange:this.handleFilmTitleChange})),s.a.createElement("div",{className:"admin-video__content__form__submit"},s.a.createElement("button",{className:"admin-video__content__form__submit__button",onClick:this.searchOnTmdb},"Rechercher"))),this.state.showResults?s.a.createElement("div",{className:"admin-video__content__search-results"},t,this.state.searchStatusMessageError&&s.a.createElement("p",{style:{color:"red"}},"Aucun r\xe9sultat pour cette recherche")):s.a.createElement("div",{className:"admin-video__content__selected-film"},this.state.selectedFilm&&s.a.createElement("div",null,s.a.createElement("div",{className:"video__content__video-info",onClick:function(){return e.selectedFilm(e.state.selectedFilm)}},s.a.createElement("img",{src:this.state.selectedFilm.poster_path,alt:"film-poster",className:"video__content__video-info__img"}),s.a.createElement("div",{className:"video__content__video-info__text"},s.a.createElement("span",{className:"video__content__video-info__text__title"},this.state.selectedFilm.title),s.a.createElement("p",{className:"video__content__video-info__text__overview"},this.state.selectedFilm.overview.substr(0,250)),s.a.createElement("span",{className:"video__content__video-info__text__vote"},"Note Tmdb: ",this.state.selectedFilm.vote_average," / 10"))),s.a.createElement("div",{className:"admin-video__content__selected-film__player"},s.a.createElement("iframe",{title:"video-player",allowFullScreen:"alloFullScreen",height:"315",src:H+"video/"+this.state.selectedMedia,width:"100%","content-type":"video/mkv"})),s.a.createElement("div",{className:"admin-video__content__form__submit"},s.a.createElement("button",{className:"admin-video__content__form__submit__button",onClick:this.validSelectedFilm},"Valider ce film")),s.a.createElement("div",{className:"admin-video__content__message-status"},this.state.statusMessage&&s.a.createElement("p",{style:{color:this.state.statusMessageColor}},this.state.statusMessage))))))}}]),a}(n.Component),G=Object(r.b)((function(e){return console.log(e),{}}),(function(e){return{dispatch:function(t){e(t)}}}))(q),J="https://sith-api.hopto.org/api/",L=function(e){Object(E.a)(a,e);var t=Object(g.a)(a);function a(e){var n;return Object(h.a)(this,a),(n=t.call(this,e)).handleIdChange=function(e){var t=e.target.value;n.setState({id:t})},n.handlePasswordChange=function(e){var t=e.target.value;n.setState({password:t})},n.handleRoleChange=function(e){var t=e.target.value;n.setState({role:t})},n.handleSubmit=function(e){e.preventDefault(),console.log(n.state.id+"  "+n.state.password+"  "+n.state.role),O.a.post(J+"register",{identifiant:n.state.id,password:n.state.password,role:n.state.role}).then((function(e){console.log(e),n.getUsers()})).catch((function(e){console.log(e),n.setState({connexionError:!0})}))},n.getUsers=function(){O.a.get(J+"get-all-users").then((function(e){console.log(e),n.setState({users:e.data})})).catch((function(e){}))},n.selectUserToDelete=function(e){n.setState({selectUserToDelete:e.target.value})},n.handleSubmitDeleteUser=function(e){e.preventDefault(),O.a.delete(J+"delete/"+n.state.selectUserToDelete).then((function(e){console.log(e),n.setState({userDeleteMessage:e.data,userDeleteColor:"green"}),n.getUsers()})).catch((function(e){console.log(e),n.setState({userDeleteMessage:"Une erreur est arriv\xe9e",userDeleteColor:"red"})}))},n.state={id:"",password:"",role:1,validId:null,validPassword:null,connexionError:!1,users:[],selectUserToDelete:void 0,userDeleteMessage:!1,userDeleteColor:void 0},n}return Object(f.a)(a,[{key:"componentDidMount",value:function(){this.getUsers()}},{key:"componentDidUpdate",value:function(){}},{key:"render",value:function(){var e=this.state.users.map((function(e,t){return s.a.createElement("option",{value:e.name,key:t},e.name)}));return s.a.createElement("div",{className:"connexion"},s.a.createElement("div",{className:"connexion__content"},s.a.createElement("h2",{className:"connexion__content__title"},"Ajouter utilisateur"),s.a.createElement("form",{className:"connexion__content__form"},s.a.createElement("div",{className:"connexion__content__form__formgroup__id"},s.a.createElement("label",{htmlFor:"exampleInputId"}," Identifiant"),s.a.createElement("input",{type:"text",className:"",id:"InputId",value:this.state.id,onChange:this.handleIdChange})),s.a.createElement("div",{className:"connexion__content__form__formgroup__password"},s.a.createElement("label",{htmlFor:"exampleInputPassword1"},"Mot de Passe"),s.a.createElement("input",{type:"text",className:"",id:"InputPassword",value:this.state.password,onChange:this.handlePasswordChange})),s.a.createElement("div",{className:"connexion__content__form__formgroup__password"},s.a.createElement("label",{htmlFor:"exampleInputPassword1"},"Role"),s.a.createElement("input",{type:"number",className:"",id:"InputPassword",value:this.state.role,onChange:this.handleRoleChange})),s.a.createElement("div",{className:"connexion__content__form__submit"},s.a.createElement("button",{className:"btn btn-primary",onClick:this.handleSubmit},"Valider")),s.a.createElement("div",{className:"connexion__content__form__error"},this.state.connexionError&&s.a.createElement("p",null,"Identifiants invalides, veuillez r\xe9essayer")))),s.a.createElement("hr",null),s.a.createElement("div",{className:"connexion__content"},s.a.createElement("h2",{className:"connexion__content__title"},"Supprimer utilisateur"),s.a.createElement("form",{className:"connexion__content__form"},s.a.createElement("div",{className:"connexion__content__form__formgroup__id"},s.a.createElement("label",{htmlFor:"exampleInputId"}," Identifiant"),s.a.createElement("select",{name:"users",style:{width:"100%",height:"2em"},onChange:this.selectUserToDelete,value:this.state.selectUserToDelete},e)),s.a.createElement("div",{className:"connexion__content__form__submit"},s.a.createElement("button",{className:"btn btn-primary",onClick:this.handleSubmitDeleteUser},"Valider")),s.a.createElement("div",{className:"connexion__content__form__error"},this.state.userDeleteMessage&&s.a.createElement("p",{style:{color:this.state.userDeleteColor}},this.state.userDeleteMessage)))))}}]),a}(n.Component),W=Object(r.b)((function(e){return console.log(e),{}}),(function(e){return{dispatch:function(t){e(t)}}}))(L),$=function(e){Object(E.a)(a,e);var t=Object(g.a)(a);function a(e){var n;return Object(h.a)(this,a),(n=t.call(this,e)).getServerStatus=function(){O.a.get("https://sith-api.hopto.org/api/start").then((function(e){n.props.dispatch({type:"SERVER_IS_START",value:!0})})).catch((function(e){n.props.dispatch({type:"SERVER_IS_START",value:!1})}))},n.state={},n}return Object(f.a)(a,[{key:"componentDidMount",value:function(){this.getServerStatus()}},{key:"componentDidUpdate",value:function(){}},{key:"render",value:function(){var e;return e=this.props.serverIsDown?this.props.isConnect?s.a.createElement(b.c,null,s.a.createElement(b.a,{path:"/admin/videos"},s.a.createElement(G,null)),s.a.createElement(b.a,{path:"/admin/users"},s.a.createElement(W,null)),s.a.createElement(b.a,{path:"/admin"},s.a.createElement(B,null)),s.a.createElement(b.a,{path:"/video-detail",component:Z},s.a.createElement(D,null)),s.a.createElement(b.a,{path:"/video"},s.a.createElement(F,null)),s.a.createElement(b.a,{path:"/music"},s.a.createElement(j,null)),s.a.createElement(b.a,{path:"/"},s.a.createElement(N,null))):s.a.createElement(P,null):s.a.createElement(A,null),s.a.createElement("div",{className:"navigation"},s.a.createElement(S.a,null,s.a.createElement("div",{className:"navigation__header"},s.a.createElement(S.b,{className:"navigation__header__title",to:"/"},s.a.createElement("h1",null,"SITH"),s.a.createElement("span",null,"By Jellfedora"))),e))}}]),a}(n.Component),K=Object(r.b)((function(e){return{serverIsDown:e.server.isStart,isConnect:e.user.isConnect,userRole:e.user.role}}),(function(e){return{dispatch:function(t){e(t)}}}))($),Q=a(19),X=a(10),Y=a(38);Q.b.add(X.i,X.m,X.f,X.e,X.h,X.b,X.k,X.j,X.g,X.a,Y.a,X.c,X.d,X.l,X.n);var Z=function(){return s.a.createElement(r.a,{store:p},s.a.createElement(K,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(s.a.createElement(s.a.StrictMode,null,s.a.createElement(Z,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[40,1,2]]]);
//# sourceMappingURL=main.9587bfc7.chunk.js.map