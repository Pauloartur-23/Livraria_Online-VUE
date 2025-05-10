<script setup>
import { useCartStore } from '../stores/store'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import ChainOfIron2 from '../components/img-books/Chain_of_Iron_Volume_2.png'
import ChainOfThorns from '../components/img-books/Chain_of_Thorns.png'
import CityOfFallenAngels from '../components/img-books/City_of_Fallen_Angels.png'
import NonaTheNinth from '../components/img-books/Nona_the_Ninth.png'
import HarlemShuffle from '../components/img-books/Harlem_Shuffle.png'
import TwoOldWomen from '../components/img-books/Two_Old_Women.png'
import CarrieSoto from '../components/img-books/Carrie_Soto_Is_Back.png'
import BookLovers from '../components/img-books/Book_Lovers.png'
import FirstSectionBook from '../components/img-home.vue/first-section-book.png'

const router = useRouter()
const cartStore = useCartStore()
const favorite = ref([])

const livros = [
  {
    img: ChainOfIron2,
    titulo: 'Chain of Iron: Volume 2',
    autor: 'Cassandra Clare',
    preco: 'R$23.24',
    id: '1',
  },
  {
    img: ChainOfThorns,
    titulo: 'Chain of Thorns',
    autor: 'Cassandra Clare',
    preco: 'R$23.24',
    id: '2',
  },
  {
    img: CityOfFallenAngels,
    titulo: 'City of Fallen Angels',
    autor: 'Cassandra Clare',
    preco: 'R$13.94',
    id: '3',
  },
  {
    img: NonaTheNinth,
    titulo: 'Nona the Ninth',
    autor: 'Cassandra Clare',
    preco: 'R$16.84',
    id: '4',
  },
  {
    img: HarlemShuffle,
    titulo: 'Harlem Shuffle',
    autor: 'Cassandra Clare',
    preco: 'R$26.92',
    id: '5',
  },
  {
    img: TwoOldWomen,
    titulo: 'Two Old Women',
    autor: 'Velma Wallis',
    preco: 'R$13.95',
    id: '6',
  },
  {
    img: CarrieSoto,
    titulo: 'Carrie Soto Is Back',
    autor: 'Taylor Jenkins Reid',
    preco: 'R$26.04',
    id: '7',
  },
  {
    img: BookLovers,
    titulo: 'Book Lovers',
    autor: 'Emily Henry',
    preco: 'R$15.81',
    id: '8',
  }
]

const addToCart = (livro) => {
  cartStore.addItem(livro)
  router.push('/carrinho')
}

const toggleFavorite = (livroId) => {
  if (favorite.value.includes(livroId)) {
    favorite.value = favorite.value.filter(id => id !== livroId)
  } else {
    favorite.value.push(livroId)
  }
}
const isFavorite = (livroId) => favorite.value.includes(livroId)
</script>

<template>
  <main id="home">
    <section id="offer">
      <div id="offer-text">
        <button id="autor-button">Autor de Abril</button>
        <h1>Eric-Emanuel Schmitt </h1>
        <p>Eric-Emmanuel Schmitt has been awarded more than 20 literary prizes and distinctions, and in 2001 he received the title of Chevalier des Arts et des Lettres. His books have been translated into over 40 languages.</p>
        <button id="acessar-button">Acessar página do livro</button>
      </div>
      <div>
        <img :src="FirstSectionBook" alt="">
      </div>
    </section>
    <section id="benefict">
      <a href="#">
        <div>
          <span class="mdi mdi-truck" style="color: #382C2C;"></span>
          <h3><a href="#">Frete grátis para SC</a></h3>
        </div>
      </a>
      <a href="#">
        <div>
          <span class="mdi mdi-star" style="color: #382C2C;"></span>
          <h3><a href="#">Livros recomendados</a></h3>
        </div>
      </a>
      <a href="#">
        <div id="last-benefict">
          <span class="mdi mdi-book-open-page-variant" style="color: #382C2C;"></span>
          <h3><a href="#">Mais vendidos</a></h3>
        </div>
     </a>
    </section>
    <section id="releases">
      <h2>Lançamentos</h2>
      <ul>
        <li v-for="livro in livros" :key="livro.id">
          <img :src="livro.img" alt="Livro">
          <h4>{{ livro.titulo }}</h4>
          <p>{{ livro.autor }}</p>
          <div id="space-div">
            <p>{{ livro.preco }}</p>
            <span 
            class="mdi mdi-heart"
            :style="{ color: isFavorite(livro.id) ? 'red' : '#27ae60' }"
             @click="toggleFavorite(livro.id)"
            ></span>
          </div>
          <button @click="addToCart(livro)">
            <span class="mdi mdi-cart" style="color: white;"></span>
            Comprar
          </button>
        </li>
      </ul>
    </section>
  </main>
</template>

<style scoped>
/*======================
          MAIN #HOME
  ======================*/
  main#home{
    display: block;
    background-color: white;
  }
  /*======================
      SECTION #OFFER
  ======================*/
  main #offer {
    display: flex;
    justify-content: space-between;
    padding: 2vw 15vw;
  
  }
  main #offer #offer-text {
    padding-top: 8vw;
  }
  main #offer #offer-text #autor-button{
    background-color: white;
    border: 2px #27AE60 solid;
    border-radius: 2px;
    color: #27AE60;
    padding: 0.5vw 1vw 0.5vw 1vw;
    margin-bottom: 1vw;
    transition: all ease-in-out .5s;
  }
  main #offer #offer-text #autor-button:hover{
    border: 2px #1d8046 solid;
    color: #1d8046;
  }

  main #offer #offer-text h1{
    font-weight: bold;
    color: #382C2C;
    font-size: 2.5rem;
    margin-bottom: 1vw;
  }
  main #offer #offer-text p{
    color: #4D4C4C;
    padding-right: 15vw;
    margin-bottom: 2vw;
  }
  main #offer #offer-text #acessar-button{
    background-color: #27AE60;
    color: white;
    padding: 1vw 2vw 1vw 2vw;
    border: none;
    border-radius: 2px;
    font-size: 1.1rem;
    transition: all ease-in-out .5s;
  }
  main #offer #offer-text #acessar-button:hover{
    background-color: #1d8046;
    color: white;
  }
  /*======================
     SECTION #BENEFICT
  ======================*/
  main #benefict {
    display: flex;
    justify-content: space-between;
    padding: 2vw 10vw;
    border-bottom: 2px #27AE60 solid;
    border-top: 2px #27AE60 solid;
  }
  main #benefict div{
    padding-right: 7vw ;
    display: flex;
    border-right: 1px #937DC2 solid;
  }
  main #benefict #last-benefict {
    padding-right: 0;
    border-right: none;
  }
  main #benefict div span {
    font-size: 50px;
  }
  main #benefict div h3{
    font-size: 1.5rem;
    margin-top: 1vw;
    padding-left: 1vw;
    font-weight: bold;
    transition: all ease-in-out .5s;
  }
  main #benefict div h3 a:hover{
    text-decoration: underline;
  } 
  main #benefict a{
    color: #382C2C;
    text-decoration: none;
    font-weight: bold;
  }
  /*======================
     SECTION #RELEASES
  ======================*/
  main #releases {
    padding: 5vw 13.5vw 5vw 15vw;
  }
  main #releases h2{
    font-size: 2rem;
    color: #231F2D;
    margin-left: 2vw;
    font-weight: bold;
    margin-bottom: 2vw;
  }
  main #releases ul{
    display: flex;
    flex-wrap: wrap;
  }
  main #releases ul li {
    margin-right: 1.5vw;
    margin-bottom: 5vw;
  }
  main #releases ul li h4{
    font-size: 1.3rem;
    color: #382C2C;
    font-weight: bold;
  }
  main #releases ul li p{
    color: #4F4C57;
  }
  
  main #releases ul li #space-div{
    display: flex;
    justify-content: space-between;
    margin-bottom: 1vw;
  }
  main #releases ul li #space-div p {
    font-weight: bold;
    color: #382C2C;
  }
  main #releases ul li #space-div span{
    margin-right: 0.5vw;
    font-size: 1.5rem;
    cursor: pointer;
    transition: 0.4s ease-in-out;
  }
  
  main #releases button {
    padding: 1vw 0;
    background-color: #27AE60;
    color: white;
    border: none;
    border-radius: 2px;
    width: 100%;
    font-size: 1.1rem;
    transition: all ease-in-out .5s;
  }
  main #releases button:hover{
    background-color: #1d8046;
  }
</style> 