let newPizzaList = JSON.parse(localStorage.getItem("newPizzaList"))
  ? JSON.parse(localStorage.getItem("newPizzaList"))
  : [];
let productsArr = JSON.parse(localStorage.getItem("productsArr"))
  ? JSON.parse(localStorage.getItem("productsArr"))
  : [];
const btnBasket = document.querySelector(".header-basket-link");
let countNumber = document.querySelector(".header-basket-count");
const addNamePizza = document.getElementById("addTitle");
const compositionContainer = document.querySelector(".create-composition");
const infoContainer = document.querySelector(".create-info");
const imgCreate = document.getElementById("addImage");
const imgView = document.getElementById("imgView");
const btnCreate = document.getElementById("btnCreate");
const addToCart = document.getElementById("btnAddToCart");
const alert = document.querySelector(".create-alert");
const pizzaModel = {
  img: "",
  name: "",
  composition: [],
  price: 0,
  caloricity: 0
};

btnBasket.addEventListener("click", function() {
  window.open("cart.html", "_self");
});

//счетчик на корзине
function cartCount() {
  let count = 0;
  productsArr.map(product => {
    count += product.count;
  });
  if (count == 0) {
    countNumber.innerText = "";
  } else {
    countNumber.innerText = count;
  }
}
cartCount();

class createPizzaModel {
  constructor({ img, name, composition, price, caloricity }) {
    this.id = newPizzaList.length + 1;
    this.img =
      img ||
      "data:image/jpeg;base64,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";
    this.name = "";
    this.composition = [];
    this.price = price;
    this.caloricity = caloricity;
    this.isNew = true;
    this.getName(name);
    this.getConpositionName(composition);
  }
  getName(name) {
    name = name.toLowerCase().split("");
    name[0] = name[0].toUpperCase();
    this.name = name.join("");
  }
  getConpositionName(composition) {
    this.composition = compositionList
      .filter(el => {
        return composition.includes(el.id);
      })
      .map(el => el.name);
  }
}

const renderInfo = (caloricity, price) => {
  infoContainer.innerHTML = `
              <h1>Price: ${price || 0}  $ </h1>
              <p>Caloricity: ${caloricity || 0} pts. </p>`;
};
renderInfo();

compositionList.forEach(item => {
  const labelElem = document.createElement("label");
  labelElem.innerText = item.name;
  labelElem.htmlFor = "composition" + item.id;
  const compositionElem = document.createElement("input");
  compositionElem.id = "composition" + item.id;
  compositionElem.type = "checkbox";
  compositionElem.addEventListener("change", function() {
    labelElem.classList.toggle("create-label-color");
    let composition = pizzaModel.composition;
    if (this.checked) {
      composition.push(item.id);
    } else {
      pizzaModel.composition = composition.filter(compId => compId != item.id);
    }
    // общая сумма и каллорийность
    pizzaModel.price = pizzaModel.composition.length ? 100 : 0;
    pizzaModel.caloricity = pizzaModel.composition.length ? 1000 : 0;

    pizzaModel.composition.forEach(composeId => {
      pizzaModel.price += compositionList.find(el => el.id === composeId).price;
    });
    pizzaModel.composition.forEach(composeId => {
      pizzaModel.caloricity += compositionList.find(
        el => el.id === composeId
      ).caloricity;
    });
    renderInfo(pizzaModel.caloricity, pizzaModel.price);
  });
  compositionContainer.append(labelElem);
  compositionContainer.append(compositionElem);
});

addNamePizza.addEventListener("input", e => {
  pizzaModel.name = e.target.value;
});

imgCreate.addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;
  const fileReader = new FileReader();
  const aFunction = async () => {
    fileReader.onloadend = () => {
      imgView.src = fileReader.result;
      pizzaModel.img = fileReader.result;
    };
  };
  aFunction().then(fileReader.readAsDataURL(file));
});

btnCreate.addEventListener("click", function() {
  if (!pizzaModel.name.length) {
    pizzaModel.name = `Безымянная ${newPizzaList.length + 1}`;
  }
  if (pizzaModel.composition.length) {
    let pizza = new createPizzaModel(pizzaModel);
    newPizzaList.unshift(pizza);
    localStorage.setItem("newPizzaList", JSON.stringify(newPizzaList));
    window.open("index.html", "_self");
  } else {
    alert.classList.toggle("active");
  }
});

addToCart.addEventListener("click", function() {
  if (!pizzaModel.name.length) {
    pizzaModel.name = `Безымянная ${newPizzaList.length +
      1 +
      pizzaModel.price}`;
  }
  if (pizzaModel.composition.length) {
    let pizza = new createPizzaModel(pizzaModel);
    newPizzaList.unshift(pizza);
    localStorage.setItem("newPizzaList", JSON.stringify(newPizzaList));
    productsArr.push({ id: pizza.id, count: 1 });
    localStorage.setItem("productsArr", JSON.stringify(productsArr));
    window.open("cart.html", "_self");
  } else {
    alert.classList.toggle("active");
  }
});
