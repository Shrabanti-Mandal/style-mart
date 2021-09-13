const loadProducts = () => {
  const url = 'https://fakestoreapi.com/products';
  fetch(url)
 .then((response) => response.json())
.then((data) => showProducts(data));
    
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    
    const div = document.createElement("div");
    div.classList.add("product");

    div.innerHTML = `

    <div class="single-product card m-4" style="    background-color: rgba(240, 197, 203, 0.219)">
    <div>
    <img class="product-image card-body" src=${product.image}></img>
      </div>
      <h5 class="card-title">${product?.title.slice(0,25)}</h5>
      <p  class="card-text">Category: ${product.category}</p>
      <p  class="card-text"><i class="fas fa-user-check text-info"></i> ${product.rating.count}  &nbsp   <i class="fas fa-star text-warning"></i> ${product.rating.rate}</p>
     

      <h4>Price:  <span class="text-success">$${product.price}</span></h4>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-warning text-white w-50 mx-auto">add to cart</button>
      <br>
      <button onclick="loadDetails('${product.id}')" id="details-btn" class="btn btn-secondary text-white w-50 mx-auto">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

const loadDetails=details=>{
 const url = `https://fakestoreapi.com/products/${products.id}`;
 fetch(url)
 .then(res=>res.json())
 .then(data=>console.log(data))
}

let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
 
  const converted = parseFloat(element);
  
  return converted;
 
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);

};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);

};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
   
  document.getElementById("total").innerText =Math.round( parseFloat(grandTotal)*100)/100;
};
