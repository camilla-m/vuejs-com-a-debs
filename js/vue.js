  new Vue({ 
     el: '#app', 
     data: data,
     methods: { 
       addPalestra: function () { 
         var titulo = this.novaPalestra.trim(); 
         var autor = this.novoAutor.trim(); 
         data.cabecalho = 'Front in Poa && BrazilJS';
         if (titulo && autor) { 
           this.palestras.push({ 
             titulo: titulo, 
             autor: autor, 
             checked: false 
           }); 
           this.novaPalestra = ''; 
           this.novoAutor = ''; 
         } 
       }
     }
   });

   var data = { 
    novaPalestra: ['Construindo em Vue'], 
    novoAutor: ['Camilla & Débora'],
    cabecalho = 'Front in Poa && BrazilJS'
  };