// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.carmolandia.to.gov.br/admin/posts/post
// @icon         https://www.google.com/s2/favicons?domain=gov.br
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const urlDados = 'http://goiatins.localhost:8080/admin/php/loadMidias.php';
    var arrDados;

    var formulario = document.getElementsByClassName("we-form")[0];

     fetch(urlDados)
        .then((resp) => resp.json())
        .then(function(data) {
           arrDados = data;

         console.log(arrDados);

         var pagina = document.getElementsByTagName("BODY")[0].innerHTML.toString();
         var encontra = 'redirect';
         //console.log(pagina);
         //console.log(pagina.indexOf(encontra));
         if(pagina.indexOf(encontra)>-1){
             console.log("Notícia enviada!");
             window.open('https://www.carmolandia.to.gov.br/admin/posts/home/-1/-1/all/all/all/1','_parent');
             return;
         }

         preencheForm(arrDados[0]);
         //console.log("Enviando...");
         //formulario.submit();



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

        var editor = document.getElementsByClassName("mce")[0];
        console.log(item.conteudo);
        editor.value= item.conteudo;

        var datapubli = document.getElementsByName("date_at")[0];
        datapubli.value = item.created_at;

        var selcat = document.getElementsByName("category_id")[0];
        //console.log(selcat);
        selcat.value=2;

        var status = document.getElementsByName("status")[0];
        //console.log(selcat);
        status.value='active';


    }

    function anexarImagem(item){

        var imagem = item.imagens[0];

         var inp = document.getElementsByName("cover")[0];
         let url = 'http://goiatins.localhost:8080/admin/php/'+imagem.arquivo;
         toDataURL(url)
             .then(dataUrl => {
             //console.log('Here is Base64 Url', dataUrl)
             var fileData = dataURLtoFile(dataUrl, "imagem-noticia-"+item.id+".jpg");
             //console.log("Here is JavaScript File Object",fileData)
             const dT = new DataTransfer();
             dT.items.add(fileData);
             inp.files = dT.files;
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
