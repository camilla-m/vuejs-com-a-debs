// Data e Vue
let data = {
  palestras: [
    {
      titulo: 'Progressive Web Apps e a evolução da Web',
      autor: 'Loiane Groner',
      checked: true,
    },
    {
      titulo: 'A importância do U de UX',
      autor: 'Nathi Alves',
      checked: true,
    },
    {
      titulo: 'Vestindo a camisa da comunidade',
      autor: 'Felipe de Morais',
      checked: true,
    },
    {
      titulo: 'CSS no JavaScript. Usar ou não usar? Eis a questão!',
      autor: 'Aline Bastos',
      checked: true,
    },
    {
      titulo: 'Construindo um site em 10min com vue.js',
      autor: 'Camilla Martins && Débora Duarte',
      checked: false,
    },
    {
      titulo: 'Desenvolvendo com Angular CLI',
      autor: 'Vanessa Tonini',
      checked: false,
    },
  ],
  cabecalho: 'FrontInPoa && BrazilJs',
  novaPalestra: '',
  novoAutor: '',
  currentRoute: '/',
  contador: 200,
  now: 0,
};


// Methods
let methods = {
  addPalestra() {
    const titulo = this.novaPalestra.trim();
    const autor = this.novoAutor.trim();

    if (titulo) {
      this.palestras.push({
        autor,
        titulo,
        checked: false,
      });

      this.novaPalestra = '';
      this.novoAutor = '';
    }
  },

  changeRoute(route) {
    this.currentRoute = route;
  },
};

// Declarando os componentes
const ItensComp = Vue.extend({
  data: () => data,
  template: `
    <ul>
      <li v-for="palestra in palestras" :class="{ removido: palestra.checked }">
        <div class="checkbox">
          <label>
            <input type="checkbox" v-model="palestra.checked">
            <big>{{ palestra.titulo }}</big> - <small>{{ palestra.autor }}</small>
          </label>
        </div>
      </li>
    </ul>
  `,
});

const AlteraTituloComp = Vue.extend({
  data: () => data,
  template: '<input v-model="cabecalho" class="form-control">',
});

const AddItemComp = Vue.extend({
  data: () => data,
  methods,
  template: `
    <div>
      <input v-model="novaPalestra"
             @keyup.enter="addPalestra"
             class="form-control"
             type="text"
             placeholder="Adicionar título da palestra">
      <input v-model="novoAutor"
             @keyup.enter="addPalestra"
             class="form-control"
             type="text"
             placeholder="Adicionar autor da palestra">
      <span class="input-group-btn">
        <button @click="addPalestra" class="js-add btn btn-primary btn-block">
          Adicionar!
        </button>
      </span>
    </div>
  `,
});

const Cabecalho = Vue.extend({
  data: () => data,
  template: '<h2>{{ cabecalho }}</h2>',
});

const Home =  Vue.extend({
  template: `
    <div class="container">
      <main-menu></main-menu>
      <img src="images/nasc.png" align="center">
      <cabecalho></cabecalho>
      <itens-comp></itens-comp>
      <add-item-comp></add-item-comp>
      <altera-titulo-comp></altera-titulo-comp>
    <div>
  `,
});

const Menu =  Vue.extend({
  data: () => data,
  methods,
  template: `
    <nav>
      <a href="#" @click="changeRoute('/')">Home</a>
      <a href="#" @click="changeRoute('/contador')">Contador</a>
    </nav>
  `,
});

const Contador =  Vue.extend({
  template: `
    <div class="container">
      <main-menu></main-menu>
      <img src="images/nasc.png" align="center">
      <counter></counter>
    </div>
  `,
});

// Registrando componentes
Vue.component('itens-comp', ItensComp);
Vue.component('altera-titulo-comp', AlteraTituloComp);
Vue.component('add-item-comp', AddItemComp);
Vue.component('cabecalho', Cabecalho);
Vue.component('home', Home);
Vue.component('main-menu', Menu);
Vue.component('counter', Contador);

// Criando Rotas
const routes = {
  '/': Home,
  '/contador': Contador,
};

// Instanciando o Vue
new Vue({
  el: '#app',
  data,
  methods,

  computed: {
    ViewComponent() {
      return routes[this.currentRoute];
    },
  },

  render (h) {
    return h(this.ViewComponent);
  },
});

const dateNow = new Date();

Vue.component('counter', {
  template: `
    <div align="center" class="counter">
      <template>
        <span>{{ d }}</span> dias |
        <span>{{ h }}</span> horas |
        <span>{{ m }}</span> minutos |
        <span>{{ s }}</span> segundos
      </template>
    </div>
  `,

  props: {
    day: {
      type: Number,
      default: dateNow.getDay(),
    },

    month: {
      type: Number,
      default: dateNow.getMonth(),
    },

    year: {
      type: Number,
      default: dateNow.getYear(),
    },

    hour: {
      type: Number,
      default: 0,
    },

    minute: {
      type: Number,
      default: 0,
    },

    second: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      date: new Date(2018,08,27,00,00,00,00),
      now: Math.trunc((new Date()).getTime() / 1000),
    };
  },

  mounted() {
    const date = new Date(2017,12,15,00,00,00,00);

    this.date = Math.trunc(date.getTime() / 1000);

    setInterval(() => {
      this.now = Math.trunc(new Date().getTime() / 1000);
    }, 1000);
  },

  computed: {
    s() {
      return (this.date - this.now) % 60;
    },

    m() {
      return Math.trunc((this.date - this.now) / 60) % 60;
    },

    h() {
      return Math.trunc((this.date - this.now) / 60 / 60) % 24;
    },

    d() {
      return Math.trunc((this.date - this.now) / 60 / 60 / 3);
    },
  },
});
