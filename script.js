let btn = document.querySelector(".btn");
let orderDetail = document.querySelector(".orderDetail");
let paySuccess = document.querySelector(".paySuccess");
let orderedList = document.querySelector(".orderlist");

// Onclick Function

btn.addEventListener("click", async () => {
  document.querySelector(".container").classList.add("hide");
  document.querySelector(".process-page").classList.remove("hide");
  console.log("Placing your order.......");

  document.querySelector(".orderDetail").classList.remove("hide");
  let order = await take_order();
  console.log("Processing your order.......");
  document.querySelector(".orderProcessing").classList.remove("hide");

  let orderStatus = await orderPrep();
  if (orderStatus.order_status) {
    console.log("Processing your payment......");
    document.querySelector(".orderProcessing").classList.remove("hide");
    paySuccess.innerHTML = `Processing your payment...`;
    let paymentStatus = await payOrder();
    if (paymentStatus.paid) {
      thankFun();
      document.querySelector(".orderProcessing").classList.add("hide");
    }
  }
});

//   --------------------------------------------------------------------------------------------------

// Function 1: getMenu()

fetch("https://free-food-menus-api-production.up.railway.app/burgers")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    let menu = "";
    data.map((item) => {
      menu += `<div class="card-group">
            <div class="card border-primary text-secondary bg-transparent mt-5 " style="width: 18rem;">
                <img src=${item.img} class="card-img-top" alt="${item.name}" />
                <div class="card-body">
                  <h5 class="card-title">
                    Item Name: <span>>${item.name}</span>
                  </h5>
                  <p class="card-text">${item.country}</p>
                  <p class="card-text">Rs. ${item.price}</p>
                </div>
                <div class="card-footer bg-transparent">
                  <div class="d-grid gap-2">
                  <p class="card-rating">Ratings: ${item.rate}</p>
                  </div>
                </div>
            </div>
        </div>`;
    });
    document.querySelector(".showMenu").innerHTML = menu;
  });

//   ----------------------------------------------------------------------------------------------

// Function 2: takeOrder()

function take_order() {
  fetch("https://free-food-menus-api-production.up.railway.app/burgers")
    .then((response) => response.json())
    .then((data) => {
      //   console.log(data);
      let burgers = data;
      let randomOrder = [];
      for (let i = 0; i < 3; i++) {
        let random = Math.floor(Math.random() * burgers.length);
        randomOrder.push(burgers[random]);
        orderedList.innerHTML += `<li>${burgers[random].dsc}</li>`;
      }
      let order = {
        burgers: randomOrder,
      };

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(order);
        }, 2500);
      });
    });
}

// ----------------------------------------------------------------------------------------------

// Function 3: orderPrep()

function orderPrep() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let orderStatus = true;
      let paidStatus = false;
      let order = {
        order_status: orderStatus,
        paid: paidStatus,
      };
      document.querySelector(".orderbillPayment").innerHTML = `Please pay your bill`;
      resolve(order);
    }, 1500);
  });
}

// ---------------------------------------------------------------------------------------------------

// Function 4: payOrder()
function payOrder() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let orderStatus = true;
      let paidStatus = true;
      let order = {
        order_status: orderStatus,
        paid: paidStatus,
      };
      document.querySelector(".orderbillPayment").classList.add("hide");
      document.querySelector(".paystat").innerHTML = `<h3>Transaction Successful <br/> Thankyou for ordering.</h3>`;
      resolve(order);
    }, 1000);
  });
}

// ---------------------------------------------------------------------------------------------------------

// Function 5: Display a thank you message once the payment is received

function thankFun() {
  alert("Thanks for orderering");
}
