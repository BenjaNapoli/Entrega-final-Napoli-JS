const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector('.container-cart-products');
const productsList = document.querySelectorAll('.btn-add-cart');
const rowProduct = document.querySelector('.row-product');
const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');
const valorTotal = document.querySelector('.total-pagar');
const countProducts = document.querySelector('#contador-productos');

let allProducts = []; //! Array para almacenar todos los productos agregados al carrito

//! Evento para mostrar/ocultar el carrito
btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart');
});

//! Evento para agregar productos al carrito
productsList.forEach(button => {
    button.addEventListener('click', e => {
        const product = e.target.closest('.item'); //! Selecciona el contenedor del producto más cercano

        //! Obtén la información del producto
        const infoProduct = {
            quantity: 1,
            title: product.querySelector('h2').textContent,
            price: product.querySelector('.price').textContent
        };

        //! Verifica si el producto ya existe en el carrito
        const exists = allProducts.some(item => item.title === infoProduct.title);

        if (exists) {
            //! Si el producto ya existe, incrementa la cantidad
            allProducts = allProducts.map(item => {
                if (item.title === infoProduct.title) {
                    item.quantity++;
                }
                return item;
            });
        } else {
            //! Si el producto no existe, agrégalo al array de productos
            allProducts.push(infoProduct);
        }

        showHTML(); //! Actualiza el HTML del carrito
    });
});

//! Evento para eliminar productos del carrito
rowProduct.addEventListener('click', e => {
    if (e.target.classList.contains('icon-close')) {
        const product = e.target.closest('.cart-product');
        const title = product.querySelector('.titulo-producto-carrito').textContent;

        allProducts = allProducts.filter(item => item.title !== title);

        showHTML(); //! Actualiza el HTML del carrito
    }
});

//! Evento para ocultar y mostrar las PCs
const togglePCButton = document.querySelector('#toggle-pc');
togglePCButton.addEventListener('click', () => {
    document.querySelectorAll('.no-display-pc').forEach(element => {
        element.classList.toggle('hidden');
    });
});

//! Evento para ocultar y mostrar los teléfonos
const togglePhoneButton = document.querySelector('#toggle-phone');
togglePhoneButton.addEventListener('click', () => {
    document.querySelectorAll('.no-display-phone').forEach(element => {
        element.classList.toggle('hidden');
    });
});

function updateCart() {
    const cartProducts = document.querySelectorAll('.row-product');
    const btnPay = document.querySelector('.btn-pay');
    const cartEmpty = document.querySelector('.cart-empty');

    //! Verifica si hay productos en el carrito
    const hasProducts = Array.from(cartProducts).some(product => !product.classList.contains('hidden'));

    //! Muostrar u ocultar el botón de pagar y el mensaje de carrito vacío
    btnPay.classList.toggle('hidden', !hasProducts);
    cartEmpty.classList.toggle('hidden', hasProducts);
}

//! Llamamiento a la función para actualizar el estado del carrito
updateCart();

//! Evento click para el botón de pagar

document.addEventListener('DOMContentLoaded', () => {
    function updatePayButtonVisibility() {
        const carrito = document.querySelector('.container-cart-products');
        const btnPay = document.querySelector('.btn-pay');
        const productos = carrito.querySelectorAll('.row-product');

        const tieneProductos = Array.from(productos).some(producto => !producto.classList.contains('hidden'));

        if (tieneProductos) {
            btnPay.classList.remove('hidden');
        } else {
            btnPay.classList.add('hidden');
        }
    }

    updatePayButtonVisibility();

    document.querySelectorAll('.btn-add-cart').forEach(button => {
        button.addEventListener('click', () => {
            const carrito = document.querySelector('.container-cart-products');
            const rowProduct = carrito.querySelector('.row-product.hidden');
            if (rowProduct) {
                rowProduct.classList.remove('hidden');
            }

            updatePayButtonVisibility();
        });
    });

    document.querySelector('.btn-pay').addEventListener('click', () => {
        let QuestionTotal = prompt("Ingrese el total a pagar, por favor")
        // if QuestionTotal> 
    });
});
//! Botón para redirigir de pcs a fonos y al revez
document.addEventListener('DOMContentLoaded', () => {
    // Redirigir al hacer clic en el botón de teléfonos
    const togglePhoneButton = document.querySelector('#toggle-phone');
    if (togglePhoneButton) {
        togglePhoneButton.addEventListener('click', () => {
            window.location.href = 'https://benjanapoli.github.io/Preentrega2-Napoli/';
        });
    }

    // Redirigir al hacer clic en el botón de laptops
    const togglePCButton = document.querySelector('#toggle-pc');
    if (togglePCButton) {
        togglePCButton.addEventListener('click', () => {
            window.location.href = 'https://benjanapoli.github.io/Preentrega2-Napoli/pages/pcs.html';
        });
    }
});

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

    rowProduct.innerHTML = ''; //! Limpia el contenido del carrito

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
};

