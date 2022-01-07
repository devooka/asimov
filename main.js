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

    console.log("Tropa da Ooka 171!");
    var inputs = document.getElementsByTagName("TEXTAREA");

    var titulo = inputs[0];
    //console.log(titulo);
    titulo.value = "Lorem impsum dolor";
    var subtitulo = inputs[1];
    console.log(subtitulo);
    subtitulo.value = "Lorem impsum dolor";

   // var form = document.getElementsByClassName("we-form")[0];
  //   var fd = new FormData(form);

  //   fd.set("cover", new Blob(['imagem-cover']), 'https://www.carmolandia.to.gov.br/storage/hellobars-covers/2022/01/hello-id-35-t-1641466853.jpg');

  //   for(let pair of fd.entries()) {
  //       console.log(pair[0], pair[1]);
  //   }

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
     console.log('Here is Base64 Url', dataUrl)
     var fileData = dataURLtoFile(dataUrl, "imageName.jpg");
     console.log("Here is JavaScript File Object",fileData)
      const dT = new DataTransfer();
      dT.items.add(fileData);
      inp.files = dT.files;
   })








})();
