function onAdd() {

    
let $ul, li, $li, $label, $div, livro, autor;
 livro = $('.js-novo-livro').val();
 autor = $('.js-novo-autor').val();
   
    // valida se “livro” está vazio
    if (livro === '') {
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
           .addClass('js-livro')
           .attr('name', 'list')
           .click(toggleRemovido)
           .appendTo($label);
  
     $('<big>')
            .appendTo($label)
           .append(livro);
            
       $label.append(" - ");
            
      $('<small>')
            .appendTo($label)
            .append(autor);
            
     $('.js-novo-livro, .js-novo-autor').val('');
 }

 // Data e Vue
    let data = {
     livros: [{ titulo: 'Orange is The New Black', autor: 'Piper Kerman', checked: true },
             { titulo: 'A Origem das Espécies', autor: 'Charles Darwin', checked: false }],
     cabecalho: 'Livros Preferidos',
     novoLivro: '',
     novoAutor: '',
    currentRoute: '/',
    contador: 200,
    now: 0,
   };
   
   
//Methods
  let methods = {
     addLivro: function () {
       console.log('ok');
         var titulo, autor;
         titulo = this.novoLivro.trim();
         autor = this.novoAutor.trim();
         if (titulo) {
           this.livros.push({
             titulo: titulo,
             autor: autor,
             checked: false
           });
           this.novoLivro = "";
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
     '           <li v-for="livro in livros" :class="{ \'removido\': livro.checked }">' +
     '             <div class="checkbox">' +
     '              <label>' +
     '                     <input type="checkbox" v-model="livro.checked"> ' +
     '                     <big>{{ livro.titulo }}</big> - <small>{{ livro.autor }}</small>' +
     '              </label>' +
     '             </div>' +
     '           </li>' +
     '         </ul>'
   });
   
   var AlteraTituloComp = Vue.extend({
     data: function () {
       return data;
     },
     template: '<input v-model="cabecalho"/>'
   });
   
   var AddItemComp = Vue.extend({
     data: function () {
       return data;
     },
     methods: methods,
     template:
       '<div>' +
             '<input v-model="novoLivro" @keyup.enter="addLivro"' +
                    ' placeholder="Adicionar título do livro" type="text" class="form-control" />'  +
             '<input v-model="novoAutor" @keyup.enter="addLivro"' +
                    ' placeholder="Adicionar autor do livro" type="text" class="form-control" /> <br/>'  +
             '<span class="input-group-btn">' +
             '  <button @click="addLivro" class="js-add btn btn-primary btn-block"' +
                ' type="button">Adicionar!</button>'  +
             '</span>' +
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
       '<nav>'
   });
   
      let Contador =  Vue.extend({
     data: function () {
       return data;
     },
     methods: methods,
     template:
      '<div class="container">' +
          '<main-menu></main-menu>'+
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
    Vue.component('contador', Contador);

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
                template: '<div>'
                + '<template v-if="date > now">'
                    + '<div><span>{{ d }}</span><br>dias</div> : '
                    + '<div><span>{{ h }}</span><br>horas</div> : '
                    + '<div><span>{{ m }}</span><br>minutos</div> : '
                    + '<div><span>{{ s }}</span><br>segundos</div>'
                + '</template>'
                + '<p class="counter-closed" v-else>Que pena, essa promoção acabou :(</p>',

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
                        date: 1535217814000,
                        now: Math.trunc((new Date()).getTime() / 1000)
                    }
                },

                mounted: function () {
                    var self = this;
                    var date = new Date(this.year, this.month-1, this.day, this.hour, this.minute, this.second);

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
                        return Math.trunc((this.date - this.now) / 60 / 60 / 24);
                    }
                }
            });
