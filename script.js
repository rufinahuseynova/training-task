document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  updateSummary();
});

function addProduct() {
  const name = document.getElementById("productName").value;
  const price = document.getElementById("productPrice").value;
  if (name === "" || price === "") {
    alert("Məhsulun adı və qiyməti daxil edilməlidir!");
    return;
  }

  const product = { name, price: parseFloat(price) };
  let products = JSON.parse(localStorage.getItem("products")) || [];
  products.push(product);
  localStorage.setItem("products", JSON.stringify(products));
  document.getElementById("productName").value = "";
  document.getElementById("productPrice").value = "";
  addProductToDOM(product);
  updateSummary();
}

function addProductToDOM(product) {
  const productList = document.getElementById("productList");
  const productElement = document.createElement("div");
  productElement.classList.add("product");
  productElement.innerHTML = `
        ${product.name} (${product.price} AZN)
        <button class="delete-button" onclick="deleteProduct('${product.name}')">Sil</button>
    `;
  productList.appendChild(productElement);
}

function deleteProduct(name) {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  products = products.filter((product) => product.name !== name);
  localStorage.setItem("products", JSON.stringify(products));
  document.getElementById("productList").innerHTML = "";
  loadProducts();
  updateSummary();
}

function loadProducts() {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  products.forEach((product) => {
    addProductToDOM(product);
  });
}

function updateSummary() {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const totalCount = products.length;
  const totalPrice = products.reduce((sum, product) => sum + product.price, 0);
  document.getElementById("totalCount").innerText = totalCount;
  document.getElementById("totalPrice").innerText = totalPrice;
}
