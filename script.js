let closed = document.querySelector(".closed")
let formSignIn = document.querySelector(".signIn")
let userLog = document.querySelector(".user")

let searchIcon = document.querySelector(".searchIcon")
let searchForm = document.querySelector(".searchForm")

searchIcon.onclick = function(){
searchForm.classList.toggle("active")
}

userLog.onclick = function(){
    formSignIn.classList.toggle("active")
}
closed.onclick = function(){
    formSignIn.classList.remove('active');
    console.log("close")
}



var swiper = new Swiper(".books-home", {
    loop:true,
    centeredSlides: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    breakpoints: {
      0: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });


  var swiper = new Swiper(".featured-books", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 40,
          stretch:0,
          depth: 200,
          modifier: 1,
         
    },
    pagination: {
      el: ".swiper-pagination",
    },
  });
  

  var swiper = new Swiper('.books-arrival', {
    spaceBetween: 10,
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 5500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    500:{
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 3,
    },
  },
    
  });


  var swiper = new Swiper(".review", {
  
    spaceBetween: 10,
    slidesPerGroup: 2,
    loop: true,
    loopFillGroupWithBlank: true,
    breakpoints: {
    0: {
      slidesPerView: 1,
    },
    500:{
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
  
    navigation: {
      nextEl: ".fa-chevron-right",
      prevEl: ".fa-chevron-left",
    },
  });


  var swiper = new Swiper(".our-blog", {
    effect: "cube",
    grabCursor: true,
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
    
    pagination: {
      el: ".swiper-pagination",
    },
  });

  ///working cart
  let iconCart = document.querySelector(".cart-icon")
  let cart = document.querySelector(".cart")
  iconCart.onclick = function(){
    cart.classList.toggle("active")
  }

  if(document.readyState =="loading"){
    document.addEventListener("DOMContentLoaded",ready)
  }
  else{
    ready()
  }

  function ready(){

    //remove item from cart
    let removeItemIcon = document.getElementsByClassName("remove-item")
    for(let i = 0; i<removeItemIcon.length ;i++){
      let button =removeItemIcon[i]
      button.addEventListener("click",removeItemFromCart)
    }
    function removeItemFromCart(event){
    let buttonClicked = event.target;
    buttonClicked.parentElement.remove()
    updateTotal()
    }


    //add product to cart
    let iconAdd = document.getElementsByClassName("add-to-cart")
    for(let i = 0; i<iconAdd.length ; i++){
      let addClicked = iconAdd[i];

      addClicked.addEventListener("click" , function(event){
      let button = event.target;
      let shopProduct = button.parentElement.parentElement
      let image = shopProduct.getElementsByClassName("product-img")[0].src
      let price = shopProduct.getElementsByClassName("product-price")[0].innerText
       console.log(image,price)
      addProductToCart(image,price)
      updateTotal()
      })

      function addProductToCart(image,price){
        let createItem = document.createElement("dive")
        createItem.classList.add("item")
        let contentCart  = document.getElementsByClassName("cart-content")[0]
        /* let titleItem=contentCart.getElementsByClassName("title-item")
       for(let i =0 ; i<titleItem.length ; i++){
          if(titleItem[i].innerText == title){
            alert("this product added")
            return
          } 
        }*/
        let TextContentCart =` <div class="img-item"><img src="${image}" alt=""></div>
        <div class="info">
            <div class="price-item">${price}</div>
          
            <input type="number"  value="1" class="quantity-item">
        </div>
        <i class="fa-solid fa-trash remove-item"></i>`;
        createItem.innerHTML =TextContentCart;
        contentCart.append(createItem)
        createItem.getElementsByClassName("remove-item")[0].addEventListener("click",removeItemFromCart)
        createItem.getElementsByClassName("quantity-item")[0].addEventListener("change",quantityChange)
       
      }
    }


    //quantity change
    let quantityInput = document.getElementsByClassName("quantity-item")
    for(let i=0 ; i<quantityInput.length; i++){
      let input = quantityInput[i]
       input.addEventListener("change",quantityChange)
    }

    function quantityChange(event){
      let inputChange = event.target
      if(isNaN(inputChange.value) || inputChange.value <= 0){
        inputChange.value = 1
      }
      updateTotal()
    }
   

    //update total

    function updateTotal(){
      let cartContent = document.getElementsByClassName("cart-content")[0]
  let item = cartContent.getElementsByClassName("item")
  let total = 0
  for(let i = 0 ; i<item.length ; i++){
    let itemCart=item[i]
    let priceElement = itemCart.getElementsByClassName("price-item")[0]
    let quantityElement = itemCart.getElementsByClassName("quantity-item")[0]
    let price = parseFloat(priceElement.innerText.replace("$"),"")
    let quantity = quantityElement.value
    total = total + price*quantity
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName("total-price")[0].innerText = "$"+ total
  }


  //buy button
  let btnBuy=document.getElementsByClassName("buy-now")[0]
  btnBuy.addEventListener("click", function(){
let cartContent = document.querySelector(".cart-content")
if(cartContent.hasChildNodes()){
  alert("your order is placed")
cartContent.removeChild(cartContent.firstChild)
}
updateTotal()
})


  }
