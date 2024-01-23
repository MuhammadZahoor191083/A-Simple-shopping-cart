const products = [
    { id: 1, name: 'Product A', price: 20.00 },
    { id: 2, name: 'Product B', price: 15.50 },
    { id: 3, name: 'Product C', price: 30.00 }
  ];

  function renderProducts() {
    const cartBody = document.getElementById('cartBody');
    cartBody.innerHTML = '';

    products.forEach(product => {
      const row = document.createElement('tr');
      row.className = 'product-row';
      row.innerHTML = `
        <td>${product.name}</td>
        <td>$${product.price.toFixed(2)}</td>
        <td><input class="quantity-input" type="number" id="quantity${product.id}" value="0" min="0"></td>
        <td class="total-column">$0.00</td>
      `;

      cartBody.appendChild(row);
    });
  }

  function updateTotalPrice() {
    products.forEach(product => {
      const quantityInput = document.getElementById(`quantity${product.id}`);
      const totalColumn = quantityInput.parentElement.nextElementSibling;

      const quantity = parseInt(quantityInput.value);
      const totalProductPrice = product.price * quantity;

      totalColumn.textContent = `$${totalProductPrice.toFixed(2)}`;
    });
  }

  function calculateTotalPrice() {
    let totalPrice = 0;
    products.forEach(product => {
      const quantity = parseInt(document.getElementById(`quantity${product.id}`).value);
      totalPrice += product.price * quantity;
    });

    return totalPrice.toFixed(2);
  }

  function generateInvoice() {
    updateTotalPrice();

    const cartBody = document.getElementById('cartBody');
    const checkoutButton = document.querySelector('.checkout-button');

    cartBody.innerHTML = '';

    let totalPrice = 0;

    products.forEach(product => {
      const quantity = parseInt(document.getElementById(`quantity${product.id}`).value);
      if (quantity > 0) {
        const totalProductPrice = product.price * quantity;
        totalPrice += totalProductPrice;

        const row = document.createElement('tr');
        row.className = 'product-row';
        row.innerHTML = `
          <td>${product.name}</td>
          <td>$${product.price.toFixed(2)}</td>
          <td>${quantity}</td>
          <td class="total-column">$${totalProductPrice.toFixed(2)}</td>
        `;

        cartBody.appendChild(row);
      }
    });

    const totalColumn = document.createElement('tr');
    totalColumn.innerHTML = `
      <td></td>
      <td></td>
      <td>Total:</td>
      <td class="total-column">$${totalPrice.toFixed(2)}</td>
    `;

    cartBody.appendChild(totalColumn);

    checkoutButton.style.display = 'none';
  }

  renderProducts();