import { LitElement, html, css, query } from "lit-element";

 
const container = document.querySelector('.container');
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const select = document.getElementById('movie');
const seats = document.querySelectorAll('.seat:not(.reserved');
export class CinemaLitElement extends LitElement{

static get properties(){
    return{
        movie_amount:{type:Array},
    }
}

constructor(){
super();
this.movie_amount = [
  {
    id: 10,
    movieName: 'movieBase',
    amount: 10,
    expireDate: '2022-12-02',
    movie_time: 10,
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
    await fetch(`http://localhost:8080/movieamount/getAll`)
      .then(r => r.json())
      .then(async data => {
        this.movie_amount = data;
      }); 

  }

render(){
    return html`
     <div class="movie-list">
    <select id="movie">
         ${this.movie_amount.map(
          post => html`
           <!-- iç html alanı  --> 
          
             <option value= ${post.amount} >${post.movieName}</option>
          
           <!-- iç html alanı  --> 
          `,)}
      </select>
    </div>
    `;
}
}

if(!customElements.get("cinema-lit-element")){
  customElements.define("cinema-lit-element", CinemaLitElement);
}