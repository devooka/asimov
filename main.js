// ==UserScript==
// @name         Backup noticias tocantinia
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.carmolandia.to.gov.br/admin/posts/post
// @icon         https://ooka.com.br/julio/ababab.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var linkform = window.location.href.split("/");
    if(linkform.length > 6){
         console.log("Redirecionando próxima noticia...");
        setTimeout(function(){
            window.open('https://www.tocantinia.to.gov.br/admin/posts/post','_parent');
        },3500);
         return;
    }


    var pagina = document.getElementsByTagName("BODY")[0].innerHTML.toString();
    var encontra = 'redirect';
    // console.log(pagina);
    // console.log(pagina.indexOf(encontra));

    if(pagina.indexOf(encontra)>-1){
        console.log("Notícia enviada! Redirecionando pág da noticia...");
        setTimeout(function(){
            let red = JSON.parse(pagina);
            console.log(red);
            window.open(red.redirect,'_parent');
         },3500);
         return;

    }

    const urlDados = 'http://goiatins.localhost:8080/admin/php/loadMidias.php';
    var arrDados;

    var formulario = document.getElementsByClassName("we-form")[0];

     fetch(urlDados)
        .then((resp) => resp.json())
        .then(function(data) {
           arrDados = data;
         console.log(arrDados);
         if(arrDados.finalizado != null && arrDados.finalizado=='ok'){
             console.log("Todos inseridos, redirecionando todos...");
             setTimeout(function(){
              window.open('https://www.tocantinia.to.gov.br/admin/posts/home/-1/-1/all/all/all/1','_parent');
             },3500);

             return;
         }

         preencheForm(arrDados[0]);


    })
        .catch(function(error) {
        console.log(error);
    });


    function preencheForm(item){

        var inputs = document.getElementsByTagName("TEXTAREA");

        var titulo = inputs[0];
        //console.log(titulo);
        titulo.value = item.titulo;
        var subtitulo = inputs[1];
        //console.log(subtitulo);
        subtitulo.value = "Publicado em "+item.data;

        anexarImagem(item);

        var datapubli = document.getElementsByName("date_at")[0];
        datapubli.value = item.created_at;



        var diveditor = document.getElementsByClassName("text_editor")[0];
        var divlabeleditor = diveditor.parentElement;
        diveditor.remove();

        var txtarea = document.createElement("TEXTAREA");
        txtarea.name = 'content';
        txtarea.rows = '4';
        txtarea.cols = '50';
        divlabeleditor.appendChild(txtarea);

        var editor = document.getElementsByName("content")[0];
        //tinymce.remove("textarea.mce");
        //console.log(item.conteudo);
        editor.value= item.conteudo;

        var selcat = document.getElementsByName("category_id")[0];
        //console.log(selcat);
        selcat.value=2;

        var status = document.getElementsByName("status")[0];
        //console.log(selcat);
        status.value='active';

         console.log("Enviando...");

            setTimeout(function(){
                 if(editor.value=='' || editor.value.length < 5 || editor.value == null){
                     alert("Erro adicionar conteúdo");
                 }else{
                     document.getElementsByClassName("btn btn-info")[0].click();
                 }
            },4500);


    }


    function anexarImagem(item){

        var imagem = item.imagens[0];

         var inp = document.getElementsByName("cover")[0];
         let url = 'http://goiatins.localhost:8080/admin/php/'+encodeURI(imagem.arquivo);
         console.log(url);
         toDataURL(url)
             .then(dataUrl => {
             //console.log('Here is Base64 Url', dataUrl)
             var fileData = dataURLtoFile(dataUrl, "imagem-noticia-"+item.id+".jpg");
             //console.log("Here is JavaScript File Object",fileData)
             const dT = new DataTransfer();
             dT.items.add(fileData);
             inp.files = dT.files

             var imgdom = document.createElement("IMG");
             imgdom.src = URL.createObjectURL(dT.files[0]);
             imgdom.style.width="150px";
             document.getElementsByClassName("app_anexos_add")[0].appendChild(imgdom);
             //console.log(inp.files);
         })

    }

    const toDataURL = url => fetch(url)
      .then(response => response.blob())
      .then(blob => new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(blob)
     }))



  function dataURLtoFile(dataurl, filename) {
     var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
     bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
     while(n--){
     u8arr[n] = bstr.charCodeAt(n);
     }
   return new File([u8arr], filename, {type:mime});
  }



})();
