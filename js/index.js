function onAdd() {

    
let $ul, li, $li, $label, $div, palestra, autor;
 palestra = $('.js-nova-palestra').val();
 autor = $('.js-novo-autor').val();
   
    // valida se “palestra” está vazio
    if (palestra === '') {
          return;
    }
    $ul = $('ul');
     $li = $('<li>').appendTo($ul);
      $div = $('<div>')
          .addClass('checkbox')
           .appendTo($li);
            
      $label = $('<label>').appendTo($div);
      $('<input>')
          .attr('type', 'checkbox')
           .addClass('js-palestra')
           .attr('name', 'list')
           .click(toggleRemovido)
           .appendTo($label);
  
     $('<big>')
            .appendTo($label)
           .append(palestra);
            
       $label.append(" - ");
            
      $('<small>')
            .appendTo($label)
            .append(autor);
            
     $('.js-nova-palestra, .js-novo-autor').val('');
 }

 // Data e Vue
    let data = {
     palestras: [{ titulo: 'Progressive Web Apps e a evolução da Web', autor: 'Loiane Groner', checked: true },
     { titulo: 'A importância do U de UX', autor: 'Nathi Alves', checked: true },
     { titulo: 'Vestindo a camisa da comunidade', autor: 'Felipe de Morais', checked: true },
     { titulo: 'CSS no JavaScript. Usar ou não usar? Eis a questão!', autor: 'Aline Bastos', checked: true },
     { titulo: 'Construindo um site em 10min com vue.js', autor: 'Camilla Martins && Débora Duarte', checked: false },
    { titulo: 'Desenvolvendo com Angular CLI', autor: 'Vanessa Tonini', checked: false },
             ],
     cabecalho: 'FrontInPoa && BrazilJs',
     novapalestra: '',
     novoAutor: '',
    currentRoute: '/',
    contador: 200,
    now: 0,
   };
   
   
//Methods
  let methods = {
     addpalestra: function () {
       console.log('ok');
         var titulo, autor;
         titulo = this.novapalestra.trim();
         autor = this.novoAutor.trim();
         if (titulo) {
           this.palestras.push({
             titulo: titulo,
             autor: autor,
             checked: false
           });
           this.novapalestra = "";
           this.novoAutor = "";
         }
       },
       changeRoute: function (route) {
         console.log('ok');
         this.currentRoute = route;
       },
     
  }
   /**
    * Declarando os componentes
    */
   var ItensComp = Vue.extend({
     data: function () {
       return data;
     },
     template: '<ul>' +
     '           <li v-for="palestra in palestras" :class="{ \'removido\': palestra.checked }">' +
     '             <div class="checkbox">' +
     '              <label>' +
     '                     <input type="checkbox" v-model="palestra.checked"> ' +
     '                     <big>{{ palestra.titulo }}</big> - <small>{{ palestra.autor }}</small>' +
     '              </label>' +
     '             </div>' +
     '           </li>' +
     '         </ul>'
   });
   
   var AlteraTituloComp = Vue.extend({
     data: function () {
       return data;
     },
     template: 
     '<input v-model="cabecalho" class="form-control"/>'
   });
   
   var AddItemComp = Vue.extend({
     data: function () {
       return data;
     },
     methods: methods,
     template:
       '<div>' +
             '<input v-model="novapalestra" @keyup.enter="addpalestra"' +
                    ' placeholder="Adicionar título da palestra" type="text" class="form-control" />'  +
             '<input v-model="novoAutor" @keyup.enter="addpalestra"' +
                    ' placeholder="Adicionar autor da palestra" type="text" class="form-control" />'  +
             '<span class="input-group-btn">' +
             '  <button @click="addpalestra" class="js-add btn btn-primary btn-block"' +
                ' type="button">Adicionar!</button> '  +
             '</span> <br /> ' +
       '<div>'
   });
   
   let Cabecalho = Vue.extend({
     data: function () {
       return data;
     },
     methods: methods,
     template: 
            '<h2>{{ cabecalho }}'
    });
   
   let Home =  Vue.extend({
     data: function () {
       return data;
     },
     methods: methods,
     template:
       '<div class="container">' +
            '<main-menu></main-menu>'+
            '<img src="images/nasc.png" align="center" />' +
            '<cabecalho></cabecalho>'+
            '<itens-comp></itens-comp>'+
            '<add-item-comp></add-item-comp>'+
            '<altera-titulo-comp></altera-titulo-comp>'+
       '<div>'
   });
   
   let Menu =  Vue.extend({
     data: function () {
       return data;
     },
     methods: methods,
     template:
       '<nav>' +
            '<a href="#" @click="changeRoute(\'/\')">Home</a>'+
           '<a href="#" @click="changeRoute(\'/contador\')">Contador</a>'+
       '</nav>' +
       '<img src="images/nasc.png" align="center" />',
   });
   
      let Contador =  Vue.extend({
     data: function () {
       return data;
     },
     methods: methods,
     template:
      '<div class="container">' +
          '<main-menu></main-menu>'+
          '<img src="images/nasc.png" align="center" />' +
          '<counter></counter>'+
       '<div>'
   });
   
   
  
   
   /**
    * Registrando componentes
    */
   Vue.component('itens-comp', ItensComp);
   Vue.component('altera-titulo-comp', AlteraTituloComp);
   Vue.component('add-item-comp', AddItemComp);
   Vue.component('cabecalho', Cabecalho);
   Vue.component('home', Home);
   Vue.component('main-menu', Menu);
    Vue.component('counter', Contador);

   /**
    * Criando Rotas
    */
    
   const routes = {
     '/': Home,
     '/contador': Contador,
   }
    
   /**
    * Instanciando o Vue
    */
new Vue({
     el: '#app',
     data: data,
     methods: methods,
     
    computed: {
      ViewComponent () {
        return routes[this.currentRoute]
       
      }
    },
    render (h) { return h(this.ViewComponent) },
  
      
  });
   
var dateNow = new Date();

            Vue.component('counter', {
                template: '<div align="center" class="counter">'
                + '<template>'
                    + '<span>{{ d }}</span> dias | '
                    + '<span>{{ h }}</span> horas | '
                    + '<span>{{ m }}</span> minutos | '
                    + '<span>{{ s }}</span> segundos'
                + '</template>',

                props : {
                    day : {
                        type: Number,
                        default: dateNow.getDay()
                    },

                    month : {
                        type: Number,
                        default: dateNow.getMonth()
                    },

                    year : {
                        type: Number,
                        default: dateNow.getYear()
                    },

                    hour : {
                        type: Number,
                        default: 0
                    },

                    minute : {
                        type: Number,
                        default: 0
                    },

                    second : {
                        type: Number,
                        default: 0
                    }
                },

                data: function () {
                    return {
                        date: new Date(2018,08,27,00,00,00,00),
                        now: Math.trunc((new Date()).getTime() / 1000)
                    }
                },

                mounted: function () {
                    var self = this;
                    var date = new Date(2017,12,15,00,00,00,00);

                    this.date = Math.trunc(date.getTime() / 1000);

                    window.setInterval(function () {
                        self.now = Math.trunc(new Date().getTime() / 1000);
                    }, 1000);
                },

                computed: {
                    s: function() {
                        return (this.date - this.now) % 60;
                    },

                    m: function() {
                        return Math.trunc((this.date - this.now) / 60) % 60;
                    },

                    h: function() {
                        return Math.trunc((this.date - this.now) / 60 / 60) % 24;
                    },

                    d: function() {
                        return Math.trunc((this.date - this.now) / 60 / 60 / 3);
                    }
                }
            });
