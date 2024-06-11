import { LitElement, html, css, render } from "lit-element";


export class CinemaLitElementShopping extends LitElement {

  static get properties() {
    return {
      sales_movie: { type: Array },
      card_info: { type: Array },
    }
  }

  constructor() {
    super();
    this.sales_movie = [
      {
        movieName: 'movieName',
        customerName: 'customerName',
        seatCount: 10,
        totalPrice: 10,
        saleDate:"24-24",
      }
    ]
    this.card_info = [
      {
        id: 100,
        cardOwnerName: 'owner100',
        cardNumber: 1234567800000100,
        expiration: 9999,
        cvv: 100,
      }
    ]
  }

  _checkOutClickSubmit() { 
    const getSelectedSeatCount = localStorage.getItem('selectedSeatCount');
    const getSelectedMovieName = localStorage.getItem('selectedMovieName');
    const getSeatsArrForLS = JSON.parse(localStorage.getItem('seatsArrForLS'));
    const getAmountInnerText = localStorage.getItem('amountInnerText');

    const ownerNameRR = this.renderRoot.getElementById('owner-name');
    const cardNumberRR = this.renderRoot.getElementById('card-number');
    const expirationRR = this.renderRoot.getElementById('expiration');
    const cvvRR = this.renderRoot.getElementById('cvv');

    let date =new Date();
    let saleTime =date.getHours() +"-"+ date.getMinutes(); 
    const resultTotal = Number(getAmountInnerText) + Number(getAmountInnerText * 0.18)
    for (let index = 0; index < this.card_info.length; index++) {
      if (ownerNameRR.value == this.card_info[index].cardOwnerName && cardNumberRR.value == this.card_info[index].cardNumber && expirationRR.value == this.card_info[index].expiration && cvvRR.value == this.card_info[index].cvv) {
        console.log("checkout if is true")
        //kart bilgileri doğru girilen satışı insert ettik
        const url = 'http://localhost:8080/salesmovie/insert';
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify
            ({
              movieName: getSelectedMovieName,
              customerName: this.card_info[index].cardOwnerName,
              seatCount: resultTotal,
              totalPrice: getAmountInnerText,
              saleDate: saleTime,
            })
        })
          .then(res => res.json())
          .then(data => {
            const dataArr = [];
            dataArr.push(data);
            renderPosts(dataArr);
          })

        for (let index = 0; index < getSelectedSeatCount; index++) {
          //seçilen koltukları reserved olarak işaretledik
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
                seatStatus: 'true',
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
    } 
  }

  async firstUpdated() {
    /* 
        console.log(this.card_info[0].id)
        console.log(this.card_info[0].cardOwnerName)
        console.log(this.card_info[0].cardNumber)
        console.log(this.card_info[0].expiration)
        console.log(this.card_info[0].cvv) */


    const count = this.renderRoot.getElementById('selected-seats');
    const amount = this.renderRoot.getElementById('cost');
    const checkout = this.renderRoot.getElementById('checkout');
    const total = this.renderRoot.getElementById('total');
    const getAmountInnerText = localStorage.getItem('amount');
    const getSelectedSeatCount = localStorage.getItem('selectedSeatCount');
    let resultTotal = Number(getAmountInnerText) + Number(getAmountInnerText * 0.18)

    count.innerText = getSelectedSeatCount;
    amount.innerText = getAmountInnerText;
    checkout.innerText = resultTotal.toFixed(2);
    total.innerText = resultTotal.toFixed(2);

    //seçilen koltukları film adı değiştiğinde tekrar hesapladık göre ücretini hesapladık 
    if (amount.innerText != 0) {
      count.innerText = getSelectedSeatCount;
    }
    await fetch(`http://localhost:8080/cardinfo/getAll`)
      .then(r => r.json())
      .then(async data => {
        this.card_info = data;
      });
  }

  render() {
    return html` 
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
        crossorigin="anonymous"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
        <title>Document</title>
    </head>
    <body> 
    <section class="h-100 h-custom">
    <div class="container h-100 py-5">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col col-md-10"> 
          <div class="card shadow-2-strong mb-5 mb-lg-0" style="border-radius: 16px;">
            <div class="card-body p-4"> 
              <div class="row">
                <div class="col-md-3 col-lg-3 col-xl-3 mb-4 mb-md-0">
                  <form>
                    <div class="d-flex flex-row pb-2">
                      <div class="d-flex align-items-center pe-2">
                        <input class="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel1v"
                          value="" aria-label="..." checked />
                      </div>
                      <div class="rounded border w-100 p-2">
                        <p class="d-flex align-items-center mb-0">
                          <i class="fab fa-cc-mastercard fa-2x text-dark pe-2"></i>Credit
                          Card
                        </p>
                      </div>
                    </div>
                    <div class="d-flex flex-row pb-2">
                      <div class="d-flex align-items-center pe-2">
                        <input class="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel2v"
                          value="" aria-label="..." />
                      </div>
                      <div class="rounded border w-100 p-2">
                        <p class="d-flex align-items-center mb-0">
                          <i class="fab fa-cc-visa fa-2x fa-lg text-dark pe-2"></i>Debit Card
                        </p>
                      </div>
                    </div>
                    <div class="d-flex flex-row">
                      <div class="d-flex align-items-center pe-2">
                        <input class="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel3v"
                          value="" aria-label="..." />
                      </div>
                      <div class="rounded border w-100 p-2">
                        <p class="d-flex align-items-center mb-0">
                          <i class="fab fa-cc-paypal fa-2x fa-lg text-dark pe-2"></i>PayPal
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
                <div class="col-md-3 col-lg-3 col-xl-6">
                  <div class="row">
                    <div class="col-12 col-xl-6">
                      <div class="form-outline mb-4 mb-xl-3">
                        <input type="text" id="owner-name" class="form-control form-control-lg" size="17"
                          placeholder="Owner Name" />
                        <label class="form-label" for="typeName">Name on card</label>
                      </div> 
                      <div class="form-outline mb-4 mb-xl-3">
                        <input type="text" id="expiration" class="form-control form-control-lg" placeholder="MM/YY"
                          size="4" id="exp" minlength="4" maxlength="4" />
                        <label class="form-label" for="typeExp">Expiration</label>
                      </div>
                    </div>
                    <div class="col-12 col-xl-6">
                      <div class="form-outline mb-4 mb-xl-3">
                        <input type="text" id="card-number" class="form-control form-control-lg" siez="17"
                          placeholder="1111 2222 3333 4444" minlength="19" maxlength="19" />
                        <label class="form-label" for="typeText">Card Number</label>
                      </div> 
                      <div class="form-outline mb-4 mb-xl-5">
                        <input type="password" id="cvv" class="form-control form-control-lg"
                          placeholder="&#9679;&#9679;&#9679;" size="1" minlength="3" maxlength="3" />
                        <label class="form-label" for="typeText">Cvv</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-1 col-xl-3">
                  <div class="d-flex justify-content-between" style="font-weight: 500;">
                    <p class="mb-2">Selected Seats</p>
                    <p class="mb-2" id="selected-seats">10</p>
                  </div> 
                  <div class="d-flex justify-content-between" style="font-weight: 500;">
                    <p class="mb-0">Cost</p>
                    <p class="mb-0" id="cost"> 10TL</p>
                  </div> 
                  <hr class="my-4"> 
                  <div class="d-flex justify-content-between mb-4" style="font-weight: 500;">
                    <p class="mb-2">Total (tax included)</p>
                    <p class="mb-2" id="total">100</p> 
                    <span> TL</span> 
                  </div> 
                  <button type="button" @click="${() => this._checkOutClickSubmit()}" class="btn btn-primary btn-block btn-lg">
                    <div class="d-flex justify-content-between">
                      <span>Checkout:</span>
                      <span id="checkout">100</span>
                      <span> TL</span> 
                    </div>
                  </button> 
                </div>
              </div> 
            </div>
          </div> 
        </div>
      </div>
    </div>
  </section> 
    </body>
    </html>   `;
  }
}

if (!customElements.get("cinema-lit-element-shopping")) {
  customElements.define("cinema-lit-element-shopping", CinemaLitElementShopping);
}