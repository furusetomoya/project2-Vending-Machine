class Animal {
  constructor(name, price, imgUrl) {
    this.name = name;
    this.price = price;
    this.imgUrl = imgUrl;
  }
}

const animalBox = [
  new Animal("Tiger", 100, "https://cdn.pixabay.com/photo/2015/12/18/13/46/tiger-1098607__340.jpg"),
  new Animal("Elephant", 200, "https://cdn.pixabay.com/photo/2016/11/14/04/45/elephant-1822636__480.jpg"),
  new Animal("Parrot", 30, "https://cdn.pixabay.com/photo/2018/09/22/17/05/parrot-3695678__340.jpg"),
  new Animal("Lemurs", 15, "https://cdn.pixabay.com/photo/2015/10/28/15/05/lemurs-1010643__340.jpg"),
  new Animal("Ibis", 75, "https://cdn.pixabay.com/photo/2018/11/11/16/51/ibis-3809147__340.jpg"),
  new Animal("Panda", 90, "https://cdn.pixabay.com/photo/2019/08/21/16/03/panda-4421395__340.jpg"),
  new Animal("Zebra", 120, "https://cdn.pixabay.com/photo/2020/10/13/10/20/zebra-5651454__480.jpg"),
  new Animal("Rabbit", 25, "https://cdn.pixabay.com/photo/2018/06/28/00/11/mara-mammal-3502921__340.jpg"),
  new Animal("Giraffe", 150, "https://cdn.pixabay.com/photo/2019/07/27/06/21/giraffe-4366005__340.jpg"),
  new Animal("Raccoon", 45, "https://cdn.pixabay.com/photo/2018/07/14/17/46/raccoon-3538081__340.jpg"),
  new Animal("Frog", 5, "https://cdn.pixabay.com/photo/2016/04/17/16/37/frog-1335022__340.jpg")
];

const mainContainer = document.getElementById("mainContainer");
let vendingBox = document.createElement("div");
vendingBox.classList.add("bg-primary", "d-flex", "p-5", "wrapper");
vendingBox.setAttribute("data-index", "0");
let leftItem = document.createElement("div");
leftItem.classList.add("col-7", "overflow-hiddens", "d-flex", "p-5");
let main = document.createElement("div");
main.classList.add("d-flex", "justify-content-center", "full-width");
let extra = document.createElement("div");
extra.classList.add("d-flex", "justify-content-center");
let imgBox = document.createElement("div");
imgBox.classList.add("img", "full-width", "col-10");
imgBox.style.backgroundImage = "url(" + animalBox[0].imgUrl + ")";
let extraBox = document.createElement("div");
extraBox.classList.add("img", "full-width", "col-10");
main.append(imgBox);
extra.append(extraBox);
leftItem.append(main);
leftItem.append(extra);

let rightItem = document.createElement("div");
rightItem.classList.add("col-5");
let detail = document.createElement("div");
let title = document.createElement("p");
title.innerHTML = "Name : " + animalBox[0].name;
let price = document.createElement("p");
price.innerHTML = "Price : " + animalBox[0].price + "$";
detail.append(title);
detail.append(price);
rightItem.append(detail);

let buttons = document.createElement("div");
buttons.classList.add("row");
for (let i = 0; i < animalBox.length; i++) {
  let button = document.createElement("button");
  button.innerHTML = String(i + 1);
  button.classList.add("col-2", "text-center", "px-2", "m-2", "text-secondary", "bg-white", "btn", "btn-light");
  buttons.append(button);
}
rightItem.append(buttons);

vendingBox.append(leftItem);
vendingBox.append(rightItem);

mainContainer.append(vendingBox);

function slideJump(nextIndex) {
  let index = parseInt(vendingBox.getAttribute("data-index"));
  let currentAnimal = animalBox[index];

  vendingBox.setAttribute("data-index", String(nextIndex));
  let nextAnimal = animalBox[nextIndex];

  let costR = nextIndex >= index ? nextIndex - index : (animalBox.length - 1 - index) + index;
  let costL = nextIndex > index ? index + (animalBox.length - nextIndex) : index - nextIndex ;
  let animationType = costR <= costL ? "right" : "left";

  animation(currentAnimal, nextAnimal, animationType);
}

function animation(currentAnimal, nextAnimal, animationType) {
  imgBox.style.backgroundImage = "url(" + nextAnimal.imgUrl + ")";
  extraBox.style.backgroundImage = "url(" + currentAnimal.imgUrl + ")";

  main.classList.add("expand-animation");
  extra.classList.add("deplete-animation");

  title.innerHTML = "";
  title.innerHTML = "Name : " + nextAnimal.name;
  price.innerHTML = "";
  price.innerHTML = "Price : " + nextAnimal.price + "$";

  if (animationType === "right") {
    leftItem.innerHTML = "";
    leftItem.append(extra);
    leftItem.append(main);
  } else {
    leftItem.innerHTML = "";
    leftItem.append(main);
    leftItem.append(extra);
  }
}

let allButtons = document.querySelectorAll(".btn");
console.log(allButtons[0]);
console.log(allButtons[1]);
for (let i = 0; i < allButtons.length; i++) {
  allButtons[i].addEventListener("click", function() {
    slideJump(Number(allButtons[i].innerHTML) - 1);
  });
}
