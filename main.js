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

    const urlDados = 'http://goiatins.localhost:8080/admin/php/escolas/loadEscolas.php?p=educacao';
    var arrDados;

     fetch(urlDados)
        .then((resp) => resp.json())
        .then(function(data) {
           arrDados = data;

         console.log(arrDados);
         arrDados.forEach(function (item,index){
            preencheForm(item);
         });


    })
        .catch(function(error) {
        console.log(error);
    });
    function preencheForm(item){

        var inputs = document.getElementsByTagName("TEXTAREA");

        var titulo = inputs[0];
        //console.log(titulo);
        titulo.value = item.nome;
        var subtitulo = inputs[1];
        //console.log(subtitulo);
        subtitulo.value = item.endereco;

    }

   var inp = document.getElementsByName("cover")[0];


    let url = 'http://goiatins.localhost:8080/admin/assets/images/logos-muns/goiatins/1.png'
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

  toDataURL(url)
  .then(dataUrl => {
     //console.log('Here is Base64 Url', dataUrl)
     var fileData = dataURLtoFile(dataUrl, "imageName.jpg");
     //console.log("Here is JavaScript File Object",fileData)
      const dT = new DataTransfer();
      dT.items.add(fileData);
      inp.files = dT.files;
   })


    var editor = document.getElementsByClassName("mce")[0];
    editor.value="Lorem impsum dolor";

    var datapubli = document.getElementsByName("date_at")[0];
    datapubli.value = "10/01/2021 00:00";

    var selcat = document.getElementsByName("category_id")[0];
    //console.log(selcat);
    selcat.value=2;

    var status = document.getElementsByName("status")[0];
    //console.log(selcat);
    status.value='active';




})();
