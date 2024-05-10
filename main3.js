let cart=[]
let add= document.querySelectorAll(".add-btn");

let cartBody=document.querySelector(".cart-body");

let totalSalary=document.querySelector(".total-price")

let parentCart=document.createElement("div");

parentCart.className="parent-add"
document.addEventListener("DOMContentLoaded", function() {
fetch('products2.json')
   .then(response => response.json())
   .then(data => {
       const productsContainers1 = document.getElementsByClassName('products-container-1');
       const productsContainers2 = document.getElementsByClassName('products-container-2');
       const productsContainers3 = document.getElementsByClassName('products-container-3');
    
      
       Array.from(productsContainers1).forEach(container => {
           data.filter(product => [1, 2, 3,4,5].includes(product.id)).forEach(product => {
               const productElement = createProductElement(product);
               container.appendChild(productElement);
           });
       });
   
    
       Array.from(productsContainers2).forEach(container => {
           data.filter(product => [6,7,8,9,10].includes(product.id)).forEach(product => {
               const productElement = createProductElement(product);
               productElement.classList.add('different-class-name-1');
               container.appendChild(productElement);
           });
       });
   
      
       Array.from(productsContainers3).forEach(container => {
           data.filter(product => [11,12,13,14,15].includes(product.id)).forEach(product => {
               const productElement = createProductElement(product);
               productElement.classList.add('different-class-name-2');
               container.appendChild(productElement);
           });
       });
   
     
      
       const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
       addToCartButtons.forEach(button => {
           button.addEventListener('click', addToCartClicked);
       });
   });
   
   function createProductElement(product) {
       const productElement = document.createElement('div');
       productElement.classList.add('product');
       productElement.innerHTML = `
           <img src="${product.image}" alt="${product.name}">
           <h2 class="product-name">${product.name}</h2>
           
           <p class="price">Price: $${product.price}</p>
           <button class="view-details-btn card-btn" data-id="${product.id}">View Details</button> <!-- New button for viewing details -->
           <button class="add-to-cart-btn card-btn" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}">Add to Cart</button>
          
       `;
       
       
       const viewDetailsButton = productElement.querySelector('.view-details-btn');
       viewDetailsButton.addEventListener('click', function() {
          
           localStorage.setItem('selectedProduct', JSON.stringify(product));
          
           window.location.href = ' http://127.0.0.1:5500/product-details.html'; 
       });
       
       return productElement;
   }
   
   
   function addToCartClicked(event) {
       const button = event.target;
       const name = button.dataset.name;
       const price = button.dataset.price;
       const image = button.dataset.image; 
       addToCart(name, price, image);
   }

   function addToCart(name, price, image) {
      
       let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
   
       
       const newItem = { name, price, image };
   
      
       cartItems.push(newItem);
   
       localStorage.setItem('cart', JSON.stringify(cartItems));
       displayCartItems(); 
       console.log('Added to cart:', newItem);
   }

   function displayCartItems() {
       
       let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
   
       
       cartBody.innerHTML = '';
   
     
       let cartItemsContainer = document.createElement('div');
   
     
       cartItemsContainer.style.overflowY = 'auto'; 
   
       cartItems.forEach(item => {
           
           let itemDiv = document.createElement('div');
   
          
           itemDiv.style.display = 'flex';
           itemDiv.style.alignItems = 'center';
           itemDiv.style.marginBottom = '5px';
           itemDiv.style.padding = '5px';
           
           itemDiv.style.border = '1px solid #ccc'; 
           itemDiv.style.borderRadius = '20px';
   
           
           let imgElement = document.createElement('img');
           imgElement.src = item.image;
           imgElement.alt = item.name;
           imgElement.style.width = '60px';
           imgElement.style.height = '60px';
           imgElement.style.marginRight = '10px'; 
           imgElement.style.borderRadius = '20px'; 
          
           itemDiv.appendChild(imgElement);
   
           
           let descriptionSpan = document.createElement('span');
           descriptionSpan.textContent =`${item.name}: $${item.price}`;
           
           itemDiv.appendChild(descriptionSpan);
   
           
           let removeButton = document.createElement('span');
           removeButton.textContent = ' X';
           removeButton.style.color = 'red';
           removeButton.style.marginLeft = '50px';
           removeButton.style.cursor = 'pointer';
           removeButton.addEventListener('click', function() {
              
               removeCartItem(item);
              
               displayCartItems();
           });
          
           itemDiv.appendChild(removeButton);
   
           
           cartItemsContainer.appendChild(itemDiv);
       });
   
       
       let totalPriceDiv = document.createElement('div');
       totalPriceDiv.textContent = `Total: $${calculateTotalPrice(cartItems)}`;
      
       totalPriceDiv.style.fontWeight = 'bold';
       totalPriceDiv.style.marginTop = '10px'; 
      
       cartItemsContainer.appendChild(totalPriceDiv);
   
      
       cartBody.appendChild(cartItemsContainer);
   }
   
   function calculateTotalPrice(cartItems) {
       return cartItems.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);
   }

function removeCartItem(itemToRemove) {
  
   let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
   
   cartItems = cartItems.filter(item => !(item.name === itemToRemove.name && item.price === itemToRemove.price));
   
   localStorage.setItem('cart', JSON.stringify(cartItems));
}
window.onload=displayCartItems;
});

// ----------------------------------
let btnTop = document.querySelector('.top');
window.onscroll = function () {
   if (window.scrollY >= 600) {
    
       btnTop.style.opacity = "1";
   } else {
    
       btnTop.style.opacity = "0";
   }
}