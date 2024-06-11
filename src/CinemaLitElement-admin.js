import { LitElement, html, css, render } from "lit-element";


export class CinemaLitElementAdmin extends LitElement {

  static get properties() {
    return {
      movie_amount: { type: Array },
      sales_movie: { type: Array },
      canceled_sales_movie: { type: Array },
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
      }
    ]

    this.sales_movie = [
      {
        id: 10,
        movieName: 'movieName',
        customerName: 'customerName',
        seatCount: 10,
        totalPrice: 10,
        saleDate:"24-24",
      }
    ]
    this.canceled_sales_movie = [
      {
        id: 10,
        movieName: 'movieName',
        customerName: 'customerName',
        seatCount: 10,
        totalPrice: 10,
        _canceled: 'false',
      }
    ]
  }

  //insert movie amount data
  _insertMA() {
    const inputIdValue = this.renderRoot.querySelector('#input-ma-id');
    const inputMovieNameValue = this.renderRoot.querySelector('#input-ma-movie-name');
    const inputAmountValue = this.renderRoot.querySelector('#input-ma-amount');
    const inputExpireDateValue = this.renderRoot.querySelector('#input-ma-expire-date');
    const inputMovieTimeValue = this.renderRoot.querySelector('#input-ma-movie-time');

    const url = 'http://localhost:8080/movieamount/insertMovieData';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify
        ({
          id: inputIdValue.value,
          movieName: inputMovieNameValue.value,
          amount: inputAmountValue.value,
          expireDate: inputExpireDateValue.value,
          movie_time: inputMovieTimeValue.value,
        })
    })
      .then(res => res.json())
      .then(data => {
        const dataArr = [];
        dataArr.push(data);
        renderPosts(dataArr);
      })
  }

  //remove movie amount data
  _removeMA(Entity) {
    const url = "http://localhost:8080/movieamount/deleteById/" + Entity.id;
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((res) => res.json())
      .then(() => window.location.reload(true))
  }

  //equal in form all movie amount
  _updateEqualMA(Entity) {
    const inputIdValue = this.renderRoot.querySelector('#input-ma-id');
    const inputMovieNameValue = this.renderRoot.querySelector('#input-ma-movie-name');
    const inputAmountValue = this.renderRoot.querySelector('#input-ma-amount');
    const inputExpireDateValue = this.renderRoot.querySelector('#input-ma-expire-date');
    const inputMovieTimeValue = this.renderRoot.querySelector('#input-ma-movie-time');

    // Fill inputs  
    inputIdValue.value = Entity.id;
    inputMovieNameValue.value = Entity.movieName;
    inputAmountValue.value = Entity.amount;
    inputExpireDateValue.value = Entity.expireDate;
    inputMovieTimeValue.value = Entity.movie_time;
  }

  //update movie amount data
  _updateMA() {
    const inputIdValue = this.renderRoot.querySelector('#input-ma-id');
    const inputMovieNameValue = this.renderRoot.querySelector('#input-ma-movie-name');
    const inputAmountValue = this.renderRoot.querySelector('#input-ma-amount');
    const inputExpireDateValue = this.renderRoot.querySelector('#input-ma-expire-date');
    const inputMovieTimeValue = this.renderRoot.querySelector('#input-ma-movie-time');

    let id = inputIdValue.value
    const urlupdate = 'http://localhost:8080/movieamount/updateMovieData';
    fetch(`${urlupdate}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify
        ({
          id: inputIdValue.value,
          movieName: inputMovieNameValue.value,
          amount: inputAmountValue.value,
          expireDate: inputExpireDateValue.value,
          movie_time: inputMovieTimeValue.value,
        })
    })
      .then(res => res.json())
      .then(data => {
        const dataArr = [];
        dataArr.push(data);
        renderPosts(dataArr);
      })
  }

  //canceled sales movie data (cancel order)
  _canceledSM(Entity) {
    const getSeatsArrForLS = JSON.parse(localStorage.getItem('seatsArrForLS'));

    //cancel edilen tekil satışı canceled alanına taşıdık
    const url = "http://localhost:8080/salesmovie/cancelById/" + Entity.id;
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((res) => res.json())
      .then(() => window.location.reload(true))

    //iptal edilen koltukları satışa açtık
    for (let index = 0; index < getSelectedSeatCount; index++) {
      let id = getSeatsArrForLS[index]
      const urlupdate = 'http://localhost:8080/seat/updateSeat';
      fetch(`${urlupdate}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify
          ({
            id: getSeatsArrForLS[index],
            seatStatus: 'false',
          })
      })
        .then(res => res.json())
        .then(data => {
          const dataArr = [];
          dataArr.push(data);
          renderPosts(dataArr);
        })
    }
  }

  //canceled all sales movie data (cancel all order)
  _cancelAllMovieSM() {
    //cancel edilen tüm satışları canceled alanına taşıdık 
    const url = "http://localhost:8080/salesmovie/changedAllCanceled";
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((res) => res.json())
      .then(() => window.location.reload(true))

    //tüm koltukları satışa açtık 
    for (let index = 1; index < 61; index++) {
      let id = index
      const urlupdate = 'http://localhost:8080/seat/updateSeat';
      fetch(`${urlupdate}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify
          ({
            id: index,
            seatStatus: 'false',
          })
      })
        .then(res => res.json())
        .then(data => {
          const dataArr = [];
          dataArr.push(data);
          renderPosts(dataArr);
        })
    }
  }

  //delete all canceled movie order data
  _deleteAllCanceledMovieDataSM() {
    //satışı iptal edilen kullanıcı kayıtlarını sıfırladık
    const url = "http://localhost:8080/salesmovie/deletedAllCanceled/";
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((res) => res.json())
      .then(() => window.location.reload(true))
  }

  async firstUpdated() {
    console.log( this.movie_amount[0].expireDate < today); 
    console.log( this.movie_amount[0].expireDate  ); 

    //movie name list
    await fetch(`http://localhost:8080/movieamount/getAll`)
      .then(r => r.json())
      .then(async data => {
        this.movie_amount = data;
      });

    //expire date süresi geçen filmleri sildik
    let d = new Date();
    let today = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();

    for (let index = 0; index < this.movie_amount.length; index++) {
      if (this.movie_amount[index].expireDate < today) {
        const url = "http://localhost:8080/movieamount/deleteById/" + this.movie_amount[index].id;
        fetch(url, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
        })
          .then((res) => res.json())
          .then(() => window.location.reload(true))
      }
    }
  
    await fetch(`http://localhost:8080/salesmovie/getAllCanceled`)
      .then(r => r.json())
      .then(async data => {
        this.sales_movie = data;
      });

    await fetch(`http://localhost:8080/salesmovie/getAll`)
      .then(r => r.json())
      .then(async data => {
        this.canceled_sales_movie = data;
      });

      let timeCalc = d.getHours() + ":" + d.getMinutes() ;
      console.log(this.sales_movie[0])
      for (let index = 0; index < this.sales_movie.length; index++) {
        if (this.movie_amount[index].expireDate < timeCalc) {
          const url = "http://localhost:8080/movieamount/deleteById/" + this.movie_amount[index].id;
          fetch(url, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
          })
            .then((res) => res.json())
            .then(() => window.location.reload(true))
        }
      }
  }

  render() {
    return html`
    <!DOCTYPE html>
    <html lang="en"> 
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
        crossorigin="anonymous"></script>
      <title>Sinema Bilet: Admin Panel</title>
    </head>
    
    <body>
   
    <!--movie amount alanıdır-->
    <div class="container-fluid">  
    
    <h3 class="text-uppercase col text-center mt-5 ">Movie Amount Data Record</h3>
    <hr class="mb-4"> 
      <div class="tablearea col-md-12">
        <table class="table table-dark table-hover">
          <thead>
            <tr>
               <th scope="col">ID</th>
              <th scope="col">MOVIE NAME</th>
              <th scope="col">AMOUNT</th>
              <th scope="col">EXPIRE DATE</th>
              <th scope="col">MOVIE TIME</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody> 
 ${this.movie_amount.map(
      record =>
        html` 
              <tr>
                <td>${record.id}</td>
                <td>${record.movieName}</td>
                <td>${record.amount}</td>
                <td>${record.expireDate}</td>
                <td>${record.movie_time} (min) </td>
                <td>
                  <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" @click="${() => this._removeMA(record)}" class="btn btn-danger">DELETE</button>
                    <button type="button" @click="${() => this._updateEqualMA(record)}" class="btn btn-primary">UPDATE EQ</button>
                  </div>
                </td>
              </tr>  
        `,)} 
        <tr>
         <td><input type="input" class="form-control" id="input-ma-id" placeholder="ID"></td>
         <td><input type="input" class="form-control" id="input-ma-movie-name" placeholder="MOVIE NAME"></td>
        <td><input type="input" class="form-control" id="input-ma-amount" placeholder="AMOUNT"></td>
        <td><input type="input" class="form-control" id="input-ma-expire-date" placeholder="EXPIRE-DATE"></td>
        <td><input type="input" class="form-control" id="input-ma-movie-time" placeholder="MOVIE TIME"></td>
        <td>
          <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" @click="${() => this._insertMA()}" class="btn btn-success">INSERT</button>
            <button type="button" @click="${() => this._updateMA()}" class="btn btn-primary">UPDATE DONE</button>
          </div>
        </td>
      </tr>
        </tbody>
        </table>
      </div> 

      <!--movie amount alanıdır-->
      <h3 class="text-uppercase col text-center mt-5 ">movie customer data record</h3>
      <hr class="mb-4"> 
      <!--cancel movie alanıdır-->
        <div class="tablearea col-md-12">
          <table class="table table-dark table-hover">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">MOVIE NAME</th>
                <th scope="col">CUSTOMER NAME</th>
                <th scope="col">SEAT COUNT</th>
                <th scope="col">TOTAL PRICE</th>
                <th scope="col">SALE DATE</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
            ${this.sales_movie.map(
          record =>
            html` 
                          <tr>
                            <td>${record.id}</td>
                            <td>${record.movieName}</td>
                            <td>${record.customerName}</td>
                            <td>${record.seatCount}</td>
                            <td>${record.totalPrice}</td>
                            <td>${record.saleDate}</td>
                            <td>
                              <div class="btn-group" role="group" aria-label="Basic example">
                                <button type="button" @click="${() => this._canceledSM(record)}" class="btn btn-danger">DELETE</button>
                              </div>
                            </td>
                          </tr>  
                    `,)}
            </tbody>
          </table>
        </div>
        <!--sales movie alanıdır-->
        

        <div class="cancelfilm col text-center mt-3">
        <a href="#" @click="${() => this._cancelAllMovieSM()}" class="btn btn-primary" role="button" data-bs-toggle="button">CANCEL FILM</a>
       <h3 class="text-uppercase col text-center mt-5 ">Canceled movie customer data record </h3>
               <hr class="mb-4"> 
               </div> 


        <!--cancel movie alanıdır-->
        <div class="tablearea mb-5 col-md-12">
          <table class="table table-dark table-hover">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">MOVIE NAME</th>
                <th scope="col">CUSTOMER NAME</th>
                <th scope="col">SEAT COUNT</th>
                <th scope="col">REFUNDED AMOUNT</th>
                <th scope="col">SALE DATE</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
            ${this.canceled_sales_movie.map(
              record =>
                html` 
                          <tr>
                            <td>${record.id}</td> 
                            <td>${record.movieName}</td>
                            <td>${record.customerName}</td>
                            <td>${record.seatCount}</td>
                            <td>${record.totalPrice}</td>
                            <td>${record.saleDate}</td>
                            <td> 
                            </td>
                          </tr>  
                    `,)}   
            </tbody>
          </table>
          <div class="cancelfilm col text-center mt-3">
          <a href="#" @click="${() => this._deleteAllCanceledMovieDataSM()}" class="btn btn-primary" role="button" data-bs-toggle="button">DELETE ALL DATA</a>
                  <hr class="mb-4"> 
                 </div>  
        </div>
        <!--cancel movie alanıdır-->
      </div> 
    </body>
    </html>
       `;
  }

  static get styles() {
    return css`
 
    body {
      background-color: #232323;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
      color: rgb(250, 250, 250);
  } 

  .button {
      box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      transition-duration: 0.4s;
      background-color: #373737;
      border: 0;
      color: white;
      padding: 6px 14px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px; 
  }
  
  .button:hover {
      box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);
      background-color: #dc2a2af5;
      /* Green */
      color: rgb(255, 255, 255);
  }
       `;
  }
}

if (!customElements.get("cinema-lit-element-admin")) {
  customElements.define("cinema-lit-element-admin", CinemaLitElementAdmin);
}