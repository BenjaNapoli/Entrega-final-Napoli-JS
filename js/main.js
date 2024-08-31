const saveCartToLocalStorage = () => {
    localStorage.setItem('cart', JSON.stringify(allProducts));
};

const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector('.container-cart-products');
const productsList = document.querySelectorAll('.btn-add-cart');
const rowProduct = document.querySelector('.row-product');
const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');
const valorTotal = document.querySelector('.total-pagar');
const countProducts = document.querySelector('#contador-productos');
const btnPay = document.querySelector('.btn-pay');

let allProducts = [];

// Evento para mostrar/ocultar el carrito
btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart');
});

// Evento para agregar productos al carrito
productsList.forEach(button => {
    button.addEventListener('click', e => {
        const product = e.target.closest('.item');

        const infoProduct = {
            quantity: 1,
            title: product.querySelector('h2').textContent,
            price: product.querySelector('.price').textContent
        };

        const exists = allProducts.some(item => item.title === infoProduct.title);

        if (exists) {
            allProducts = allProducts.map(item =>
                item.title === infoProduct.title
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        } else {
            allProducts.push(infoProduct);
        }

        showHTML();
        saveCartToLocalStorage();
        updatePayButtonVisibility();
    });
});

// Evento para eliminar productos del carrito
document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.querySelector('.container-cart-products');

    if (cartContainer) {
        cartContainer.addEventListener('click', e => {
            if (e.target.classList.contains('icon-close')) {
                const product = e.target.closest('.cart-product');

                if (product) {
                    const titleElement = product.querySelector('.titulo-producto-carrito');

                    if (titleElement) {
                        const title = titleElement.textContent;

                        allProducts = allProducts.filter(item => item.title !== title);
                        showHTML();
                        saveCartToLocalStorage();
                        updatePayButtonVisibility();
                    }
                }
            }
        });
    }

    // Carga el carrito desde localStorage al iniciar
    const loadedCart = localStorage.getItem('cart');
    if (loadedCart) {
        allProducts = JSON.parse(loadedCart);
        showHTML();
        updatePayButtonVisibility();
    }

    // Evento click para el botón de pagar
    document.querySelector('.btn-pay').addEventListener('click', async () => {
        try {
            const response = await fetch('http://localhost:3000/api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(allProducts)
            });
    
            if (response.ok) {
                Swal.fire({
                    title: "¡Gracias!",
                    text: "¡Su compra ha sido exitosa!",
                    icon: "success"
                }).then(() => {
                    allProducts = [];
                    showHTML();
                    updatePayButtonVisibility();
                    saveCartToLocalStorage();
                });
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Hubo un problema con su compra",
                    icon: "error"
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Hubo un problema con su compra",
                icon: "error"
            });
        }
    });
    

// Función para actualizar la visibilidad del botón de pagar
function updatePayButtonVisibility() {
    const hasProducts = allProducts.length > 0;
    if (btnPay) {
        btnPay.classList.toggle('hidden', !hasProducts);
    }
}

// Función para actualizar el HTML del carrito
const showHTML = () => {
    if (allProducts.length === 0) {
        cartEmpty.classList.remove('hidden');
        rowProduct.classList.add('hidden');
        cartTotal.classList.add('hidden');
    } else {
        cartEmpty.classList.add('hidden');
        rowProduct.classList.remove('hidden');
        cartTotal.classList.remove('hidden');
    }

    rowProduct.innerHTML = ''; // Limpia el contenido del carrito

    let total = 0;
    let totalOfProducts = 0;

    allProducts.forEach(product => {
        const containerProduct = document.createElement('div');
        containerProduct.classList.add('cart-product');

        containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">${product.price}</span>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="icon-close"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        `;

        rowProduct.append(containerProduct);

        total += product.quantity * parseFloat(product.price.replace('$', ''));
        totalOfProducts += product.quantity;
    });

    valorTotal.textContent = `$${total}`;
    countProducts.textContent = totalOfProducts;
}});
