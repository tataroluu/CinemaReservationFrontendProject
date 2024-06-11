import { LitElement, html, css, query } from "lit-element";

 
const container = document.querySelector('.container');
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const select = document.getElementById('movie');
const seats = document.querySelectorAll('.seat:not(.reserved');
export class CinemaLitElementSeatStatus extends LitElement{

static get properties(){
    return{
        seat:{type:Array},
    }
}

constructor(){
super();
this.movie_amount = [
  {
    id: 10,
    seatStatus: 'false'
  }
]
}
 
static get styles() {
  return css`
.movie-list{
  margin: 20px 0;
}
       `;
}


async firstUpdated() { 

  await fetch(`http://localhost:8080/seat/getAll`)
  .then(r => r.json())
  .then(async data => {
    this.seat = data;
  }); 

         console.log("this.seat.seatStatus " +this.seat[1].seatStatus);     
 
  for(let i=0; i<this.seat.length; i++){
    console.log(this.seat[i].seatStatus); 
    } 
    
    //container üzerindeki içerikleri aldık
    container.addEventListener('click', function(e){
    
  //container içerisindeki sadece satılacak olan koltukları seçmemize yarayan kısım
  if(e.target.classList.contains('seat') && !e.target.classList.contains('reserved')){
          e.target.classList.toggle('selected')
          calculateTotal();
  }

  //select içerisindeki movie değişimlerini değişiklik olursa tekrar hesapladık
  select.addEventListener('change', function(e){
          calculateTotal();
  })
})


//localStorage kayıt işlemleri 
function saveToLocalStorage(indexs){
  localStorage.setItem('selectedSeats',JSON.stringify(indexs));
  localStorage.setItem('selectedMovieIndex', select.selectedIndex);
}

function getFromLocalStorage() {
const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

if (selectedSeats != null && selectedSeats.length > 0){
  seats.forEach(function(seat,index){
      if(selectedSeats.indexOf(index) > -1){
          seat.classList.add('selected');
      };
  });
}

const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if(selectedMovieIndex != null){
      select.selectedIndex = selectedMovieIndex;
  }

}


//hesaplama işlemleri
function calculateTotal(){
  const selectedSeats =container.querySelectorAll('.seat.selected')
  const selectedSeatsArr = [];
  const seatsArr = [];


//seçtiklerimizi döngü içerisinde arraylere aktardık
  selectedSeats.forEach(function(seat) {
  selectedSeatsArr.push(seat);
});

//seçtiklerimizi döngü içerisinde arraylere aktardık
seats.forEach(function(seat){
  seatsArr.push(seat);
});

//seçilen koltukların indexlerini aldık
let selectedSeatIndexs = selectedSeatsArr.map(function(seat){
  return seatsArr.indexOf(seat);
});

//seçilen koltukların sayısını aldık
let selectedSeatCount =selectedSeats.length     
//seçilen koltukların sayısını aldık   
count.innerText = selectedSeatCount;
//seçilen koltukları filme göre ücretini hesapladık
amount.innerText = selectedSeatCount * select.value;

//localStorage kaydetme fonksiyonu ile kayıt işlemi yaptık
  saveToLocalStorage(selectedSeatIndexs);
     
}
    } 






render(){
    return html`
     
    `;
}
}

if(!customElements.get("cinema-lit-element-seat-status")){
  customElements.define("cinema-lit-element-seat-status", CinemaLitElementSeatStatus);
}