import { LitElement, html, css, render } from "lit-element";

var selectedMovieAmount = "";
var selectedSeatCount = "";

export class CinemaLitElementOpp extends LitElement {

  static get properties() {
    return {
      movie_amount: { type: Array },
      seat: { type: Array },
      sales_movie: { type: Array },
    }
  }

  constructor() {
    super();
    this.movie_amount = [
      {
        id: 10,
        movieName: 'movieBase',
        amount: 10,
        expireDate: '2022-12-02',
        movie_time: 10,
        _canceled: 'false',
      }
    ]
    this.seat = [
      {
        id: 10,
        seatStatus: 'true',
      }
    ]
    this.sales_movie = [
      {
        id: 10,
        movieName: 'movieName',
        customerName: 'customerName',
        seatCount: 10,
        totalPrice: 10,
      }
    ]
  }

  //koltuk seçme ve seçimleri hesaplama işlemleri
  _seatClick(e) {
    const container = this.renderRoot.querySelector('.container');

    //container içerisindeki sadece satılacak olan koltukları seçmemize yarayan kısım
    if (e.target.classList.contains('seat') && !e.target.classList.contains('reserved')) {
      e.target.classList.toggle('selected')
    }

    //seçilen koltukların sayısını aldık  
    const selectedSeats = container.querySelectorAll('.seat.selected');
    selectedSeatCount = selectedSeats.length
    localStorage.setItem('selectedSeatCount', selectedSeatCount);

    //seçilen koltuklar ile film ücretini hesapladık
    let amount = selectedSeatCount * selectedMovieAmount
    localStorage.setItem('amount', amount);

    const seats = document.querySelectorAll('.seat:not(.reserved');
    var selectedSeatsArr = [];

    //seçilen koltukların indexlerini aldık
    var seatsArrForLS = [];
    for (let index = 0; index < selectedSeats.length; index++) {
      seatsArrForLS.push(selectedSeatsArr[index].id)
    } 
    localStorage.setItem('seatsArrForLS', JSON.stringify(seatsArrForLS));
  }



  //mevie list seçim işlemleri
  _movieOnChange(e) {

    localStorage.setItem('selectedMovieName', e.target.text);

    //Movie amount değerini global değişkene atadık
    selectedMovieAmount = e.target.value;
  }

  async firstUpdated() {

    //movie name list
    await fetch(`http://localhost:8080/movieamount/getAll`)
      .then(r => r.json())
      .then(async data => {
        this.movie_amount = data;
      });

    await fetch(`http://localhost:8080/seat/getAll`)
      .then(r => r.json())
      .then(async data => {
        this.seat = data;
        const seatAll = this.renderRoot.querySelectorAll('.seat')
        for (let i = 0; i < this.seat.length; i++) {
          if (this.seat[i].seatStatus == true) {
            seatAll[i].classList.toggle('reserved');
          }
        }
      });
  }

  render() {
    return html` 
    <div class="container" >
        <div class="screen"></div>
        <div class="row">
        <div class="seat" id="1" @click="${this._seatClick}"></div>
        <div class="seat" id="2" @click="${this._seatClick}"></div>
        <div class="seat" id="3" @click="${this._seatClick}"></div>
        <div class="seat" id="4" @click="${this._seatClick}"></div>
        <div class="seat" id="5" @click="${this._seatClick}"></div>
        <div class="seat" id="6" @click="${this._seatClick}"></div>
        <div class="seat" id="7" @click="${this._seatClick}"></div>
        <div class="seat" id="8" @click="${this._seatClick}"></div>
        <div class="seat" id="9" @click="${this._seatClick}"></div>
        <div class="seat" id="10" @click="${this._seatClick}"></div>
        <div class="seat" id="11" @click="${this._seatClick}"></div>
        <div class="seat" id="12" @click="${this._seatClick}"></div>
        </div>
        <div class="row">
        <div class="seat" id="13" @click="${this._seatClick}"></div>
        <div class="seat" id="14" @click="${this._seatClick}"></div>
        <div class="seat" id="15" @click="${this._seatClick}"></div>
        <div class="seat" id="16" @click="${this._seatClick}"></div>
        <div class="seat" id="17" @click="${this._seatClick}"></div>
        <div class="seat" id="18" @click="${this._seatClick}"></div>
        <div class="seat" id="19" @click="${this._seatClick}"></div>
        <div class="seat" id="20" @click="${this._seatClick}"></div>
        <div class="seat" id="21" @click="${this._seatClick}"></div>
        <div class="seat" id="22" @click="${this._seatClick}"></div>
        <div class="seat" id="23" @click="${this._seatClick}"></div>
        <div class="seat" id="24" @click="${this._seatClick}"></div>
        </div>
        <div class="row">
        <div class="seat" id="25" @click="${this._seatClick}"></div>
        <div class="seat" id="26" @click="${this._seatClick}"></div>
        <div class="seat" id="27" @click="${this._seatClick}"></div>
        <div class="seat" id="28" @click="${this._seatClick}"></div>
        <div class="seat" id="29" @click="${this._seatClick}"></div>
        <div class="seat" id="30" @click="${this._seatClick}"></div>
        <div class="seat" id="31" @click="${this._seatClick}"></div>
        <div class="seat" id="32" @click="${this._seatClick}"></div>
        <div class="seat" id="33" @click="${this._seatClick}"></div>
        <div class="seat" id="34" @click="${this._seatClick}"></div>
        <div class="seat" id="35" @click="${this._seatClick}"></div>
        <div class="seat" id="36" @click="${this._seatClick}"></div>
        </div>
        <div class="row">
        <div class="seat" id="37" @click="${this._seatClick}"></div>
        <div class="seat" id="38" @click="${this._seatClick}"></div>
        <div class="seat" id="39" @click="${this._seatClick}"></div>
        <div class="seat" id="40" @click="${this._seatClick}"></div>
        <div class="seat" id="41" @click="${this._seatClick}"></div>
        <div class="seat" id="42" @click="${this._seatClick}"></div>
        <div class="seat" id="43" @click="${this._seatClick}"></div>
        <div class="seat" id="44" @click="${this._seatClick}"></div>
        <div class="seat" id="45" @click="${this._seatClick}"></div>
        <div class="seat" id="46" @click="${this._seatClick}"></div>
        <div class="seat" id="47" @click="${this._seatClick}"></div>
        <div class="seat" id="48" @click="${this._seatClick}"></div>
        </div>
        <div class="row">
        <div class="seat" id="49" @click="${this._seatClick}"></div>
        <div class="seat" id="50" @click="${this._seatClick}"></div>
        <div class="seat" id="51" @click="${this._seatClick}"></div>
        <div class="seat" id="52" @click="${this._seatClick}"></div>
        <div class="seat" id="53" @click="${this._seatClick}"></div>
        <div class="seat" id="54" @click="${this._seatClick}"></div>
        <div class="seat" id="55" @click="${this._seatClick}"></div>
        <div class="seat" id="56" @click="${this._seatClick}"></div>
        <div class="seat" id="57" @click="${this._seatClick}"></div>
        <div class="seat" id="58" @click="${this._seatClick}"></div>
        <div class="seat" id="59" @click="${this._seatClick}"></div>
        <div class="seat" id="60" @click="${this._seatClick}"></div>
        </div> 
    <div class="movie-list">
    <select id="movie">
         ${this.movie_amount.map(
      post => html`
           <!-- iç html alanı  --> 
          
             <option value= "${post.amount}" @click="${this._movieOnChange}">${post.movieName}</option>
          
           <!-- iç html alanı  --> 
          `,)}
      </select>
    </div>
   </div>

<ul class="info">
    <li>
        <div class="seat selected"></div>
        <small>Seçilen</small>
    </li>
    <li>
        <div class="seat"></div>
        <small>Boş</small>
    </li>
    <li>
        <div class="seat reserved"></div>
        <small>Dolu</small>
    </li>
</ul> 
`;
  }

  static get styles() {
    return css`
    body { 
      background-color: #292929;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 1050px;
      margin: 0;
      color: rgb(0, 0, 0);
      background: #3494e6;
      background: -webkit-linear-gradient(to right, #ffd07a, #000000);
      background: linear-gradient(to right, #880000, #ad9f00);
  }
  
  .seat {
      transition-duration: 0.4s;
      background-color: #373737;
      height: 50px;
      width: 50px;
      margin: 8px;
      border-radius: 15px;
  
  }
  
  .seat.selected {
      background-color: rgb(182, 113, 35);
  }
  
  .seat.reserved {
      background-color: rgb(211, 41, 41);
  }
  
  .seat:nth-of-type(3) {
      margin-right: 30px;
  }
  
  .seat:nth-last-of-type(4) {
      margin-right: 30px;
  }
  
  .seat:not(.reserved):hover {
      box-shadow: 0 0 14px 14px rgba(255, 255, 255, 0.26), 14px 14px 14px 14px rgba(0, 0, 0, 0.19);
      cursor: pointer;
      transform: scale(1.4);
  }
  
  .screen {
      transition-duration: 0.7s;
      background-color: rgb(255, 255, 255);
      height: 150px;
      width: 950px;
      margin: 20px 0;
      box-shadow: 0 9px 14px rgba(255, 255, 255, 0.2);
      border-radius:0 0 12px 12px;
      margin-top: 0;
  }
  
  .screen:hover {
      box-shadow: 0 55px 399px 99px rgba(255, 255, 255, 0.722), 0 17px 50px 0 rgba(0, 0, 0, 0.19);
  }
  
  .row {
      display: flex;
      margin-left:50px; 
  }
  
  .movie-list { 
      margin: 20px 0;
  }
  
  select {
      margin: 0 344px;
      background-color: #373737;
      border: 1px solid transparent;
      color: aliceblue;
      text-align: center;
      text-decoration: none;
      height: 40px;
      width: 250px;
      font-size: 25px;
      border-radius: 12px;
  }
  
  ul.info{
  margin-left: 258px;
  margin-right: 272px;
  
  }
  
  .info {
      background-color: rgba(0, 0, 0, 0.2);
      padding: 5px 10px;
      color: #777;
      display: flex;
  }
  
  .info li {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 15px;
  } 
       `;
  }
}

if (!customElements.get("cinema-lit-element-opp")) {
  customElements.define("cinema-lit-element-opp", CinemaLitElementOpp);
}