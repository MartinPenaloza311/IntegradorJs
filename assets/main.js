// Contenedor de productos
const productsContainer = document.querySelector(".products-container");
const showMoreBtn = document.querySelector(".btn-load");
// el contenedor de categorias
const categoriesContainer = document.querySelector(".categories");
const categoriesList = document.querySelectorAll(".category");

const cartBtn = document.querySelector(".cart-label"); 
const cartMenu = document.querySelector(".cart");
const menuBtn = document.querySelector(".menu-label");
const barsMenu = document.querySelector(".navbar-list");
const overlay = document.querySelector(".overlay");
const productsCart = document.querySelector(".cart-container");
const total = document.querySelector(".total");
const successModal = document.querySelector(".add-modal");
const buyBtn = document.querySelector(".btn-buy");
const deleteBtn = document.querySelector(".btn-delete");
const cartBubble = document.querySelector(".cart-bubble");

// funcion para renderizar una lista de productos

const createProductTemplate = (product) => {
    const { id, name,user, bid, userImg, cardImg } = product;
    return `
    
    <div class="product">
    <img src=${cardImg} alt=${name} />
    <div class="product-info">

        <div class="product-top">
            <h3>${name}</h3>
        </div>
        <div class="product-mid">
            </div>
            <span>$${bid}</span>
        </div>


        <div class="product-bot">
            <div class="product-offer">
                <button class="btn-add"
                data-id='${id}'
                data-name='${name}'
                data-bid='${bid}'
                data-img='${cardImg}'>Add</button>
            </div>
        </div>
    </div>
</div>`;
};



// funcion para averiguar si el indice actual renderizado de la lista de productos es igual al limite de productos
const isLastIndexOf = () => {
    return appState.currentProductsIndex === appState.productsLimit -1;
}

// funcion para mostrar mas productos ante el click del usuario en el boton "ver mas"
const showMoreProducts = () => {
    appState.currentProductsIndex += 1;
    let { products, currentProductsIndex } = appState;
    renderProducts(products[currentProductsIndex]);
    if (isLastIndexOf()) {
        showMoreBtn.classList.add("hidden");
    }
};


// funcion que me permite el primer renderizado de mi aplicacion sin necesidad de escuchar un evento
const renderProducts = (productsList) => {
    productsContainer.innerHTML += productsList
        .map(createProductTemplate)
        .join("");
};

// funcion para aplicar el filtro para cuando se clickea el boton de categoria
// si el boton que se apreto NO es un boton de categoria o ya esta activo

const applyFilter = ({ target }) => {
    if(!isInactiveFilterBtn(target)) return;
    changeFilterState(target);
    productsContainer.innerHTML = '';
    if(appState.activeFilter) {
        renderFilteredProducts();
        appState.currentProductsIndex = 0;
        return;
    }
    renderProducts(appState.products[0]);
};

// renderizar los productos filtrados
const renderFilteredProducts = () => {
    const filteredProducts = productsData.filter(
        (product) => product.category === appState.activeFilter
    );
    renderProducts(filteredProducts);
}

// cheuqueo si el boton que se apreto NO es un boton de categoria o ya esta activo
const isInactiveFilterBtn = (element) => {
    return (
        element.classList.contains("category") &&
        !element.classList.contains("active")
    );
};

//cambio el estado del filtro
const changeFilterState = (btn) => {
    appState.activeFilter = btn.dataset.category;
    changeBtnActiveState(appState.activeFilter);
    
}

// funcion para cambiar el estado de los botones de categorias
const changeBtnActiveState = (selectedCategory) => {
    const categories = [...categoriesList];
    categories.forEach((categoryBtn) => {
        if(categoryBtn.dataset.categoy !== selectedCategory){
            categoryBtn.classList.remove ("active");
            return;
        }
        categoryBtn.classList.add("active");
    }) 
};

// funcion para mostrar u ocultar el boton de "ver mas" segun corresponda
const setShowMoreVisibility = () => {
    if (!appState.activeFilter) {
        showMoreBtn.classList.remove("hidden")
        return
    }
    showMoreBtn.classList.add("hidden")
};

// esta funcion tiene que hacer un par de cosas
// togglear el cart y si el menu esta abierto, lo cierra. Finalmente  muestra el overlay si no habia nada abierto y se esta abriendo el carrito.
const toggleCart = () => {
    // aca le digo a cartmenu que cada vez que el user haga click, va a tener la clase open-cart
    cartMenu.classList.toggle("open-cart");

    // chequear si el menu hamburguesa esta abierto, lo cierro y retorno
    if(barsMenu.classList.contains("open-menu")) {
        barsMenu.classList.remove("open-menu");
        return; // si ya habia algo abierto, no se togglea el overlay
    }
    // si esta cerrado, entro a la clase y la cambiamos con un toggle
    overlay.classList.toggle("show-overlay");

};

// funcion para mostrar u ocultar el menu hamburguesa y el overlay, segun corresponda
const toggleMenu = () => {
    barsMenu.classList.toggle("open-menu");
    if (cartMenu.classList.contains("open-cart")) {
        cartMenu.classList.remove("open-cart");
        return; // si ya habia algo abierto, no se togglea el overlay, por eso el return.
    }
    overlay.classList.toggle("show-overlay");
};

// hacemos una funcion para cerrar el menu hamburguesa o el carrito y ocultar el overlay cuando el usuario scrolee
const closeOnScroll = () => {
    if (
        !barsMenu.classList.contains("open-menu") &&
        !cartMenu.classList.contains("open-cart")
    ) {
        return
    };
    barsMenu.classList.remove("open-menu");
    cartMenu.classList.remove("open-cart");
    overlay.classList.remove("show-overlay");
};

// funcion para cerrar el menu hamburguesa y el overlay cuando se hace click en un link
const closeOnClick = (e) => {
    // chequeo que sea un click en el link
    if (!e.target.classList.contains("navbar-link")) {
        return
    };
    // si estoy efectivamente haciendo click en una etiqueta a
    barsMenu.classList.remove("open-menu");
    overlay.classList.remove("show-overlay");  
};

// funcion para cerrar el menu hamburguesao el carrito y ocultar el overlay cuando el usuario hace click en el overlay
const closeOnOverlayClick = () => {
    barsMenu.classList.remove("open-menu");
    overlay.classList.remove("show-overlay"); 
    cartMenu.classList.remove("open-cart"); 
}



// Renderizar el carrito
// nuestro carrito sera un arreglo de objetitos y vamos a aplicarle una logica parecida al todolist

// setear el carrito vacio o lo que este en LS 
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const saveCart = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

// ya tenemos el carrito guardado, ahora hay que armar la logica del renderizado
// hacer una funcion para renderizar los productos del carrito o enviar el mensaje "no hay productos"
const renderCart = () => {
    // capturo el lugar adonde quiero mostrar el carrito 
    if (!cart.length) {
        productsCart.innerHTML = `
        <p class="empty-msg">No hay productos en el carrito</p>
        `;
        return;
    }
    productsCart.innerHTML = cart.map(createCartProductTemplate).join("");
};

// funcion para crear el template de un producto del carrito
const createCartProductTemplate = (cartProduct) => {
    const {id, name, bid, img, quantity } = cartProduct;
    return `
    <div class="cart-item">
        <img src=${img} alt="Nft del carrito" />
        <div class="item-info">
        <h3 class="item-title">${name}</h3>
        <p class="item-bid">Current bid</p>
        <span class="item-price">${bid} ARS</span>
        </div>
        <div class="item-handler">
        <span class="quantity-handler down" data-id=${id}>-</span>
        <span class="item-quantity">${quantity}</span>
        <span class="quantity-handler up" data-id=${id}>+</span>
        </div>
    </div>
    `;
};

// funcion para mostrar el total de la compra 
const showCartTotal = () => {
    //acá voy a necesitar una función auxiliar que me traiga el total del carrito
    total.innerHTML = `${getCartTotal().toFixed(2)} ARS`;
};

// funcion para obtener el total de la compra
const getCartTotal = () => {
    return cart.reduce((acc, cur) => acc + (cur.bid) * cur.quantity, 0)
};


// ahora pasamos a la logica para agregar al carrito 
// funcion para crear un objeto con la info del producto que quiero agregar al carrito o bien agregar una unidad de un producto ya incoroporado en mi carrito
const addProduct = (e) => {
    // primero mi funcion recibe el evento y despues tengo que saber si el click proviene del boton del producto
    if (!e.target.classList.contains("btn-add")) {
        return
    };
    // ahora vamos a la otra logica y aca me voy a guardar el dataset del producto que estoy agregando para luego revisar si existe o no en el carrito (para saber si agrego la card o la cantidad de ese producto)

    // llamo a la funcion para desetructurar lo que necesito utilizar
    const product = createProductData(e.target.dataset);
    // comprobar si el producto ya esta en el carrito
    if (isExistingCartProduct(product)) {
        addUnitToProduct(product);

        // mostrar un feedback 
    showSuccessModal("Se agrego una unidad del producto al carrito")
    }
    else {
        // creamos el producto en el carrito y dar feedback al usuario
        createCartProduct(product);
        showSuccessModal("El producto se ha agregado al carrito")
    }

    updateCartState();
};


// funcion desestructuradora

const createProductData = ( product ) => {
    const {id, name, bid, img} = product;
    return {id, name, bid, img };
};

// funcion que comprueba si el producto ya fue agregado al carrito
const isExistingCartProduct = ( product ) => {
    return cart.find((item) => item.id === product.id);
};  

// funcion para agregar una unidad al producto que ya tengo en el carrito
const addUnitToProduct = ( product ) => {
    cart = cart.map((cartProduct) => 
    cartProduct.id === product.id
    ? {...cartProduct, quantity: cartProduct.quantity + 1}
    : cartProduct
    );
};

// funcion para darle una devolucion al usuario
const showSuccessModal = ( msg ) => {
    successModal.classList.add("active-modal");
    successModal.textContent = msg;
    setTimeout(() => {
        successModal.classList.remove("active-modal")
    }, 1500);
};

// creamos un objeto con la info del producto que queremos agregar
const createCartProduct = ( product ) => {
    cart = [...cart, { ...product, quantity: 1 }];
};

// habilitar o deshabilitar un boton segun corresponda
// La logica la comparten, si el carro esta vacio, lo saco a ambos, si hay algo en el cart los habilita
const disableBtn = (btn) => {
    if (!cart.length) {
        btn.classList.add("disabled");
    } else {
        btn.classList.remove("disabled");
    }
};

// funcion para actualizar la cantidad de productos que el usuario va guardando en el carrito
const renderCartBubble = () => {
    //aca tenemos que mostrar la suma de los quantities, por lo tanto aplico un metodo que se llama reduce
    cartBubble.textContent = cart.reduce((acc, cur) => {
        return acc + cur.quantity;
    });
};

// funcion de actualizacion del carro
const updateCartState = () => {
    // guardar carrito en LS
    saveCart();
    // renderizo el carrito
    renderCart();
    // muestro el total
    showCartTotal();
    // usamos la misma funcion para ambos botones
    disableBtn(buyBtn);
    disableBtn(deleteBtn);

    renderCartBubble( );

};


// funcion inicializadora
const init = () => {
    renderProducts(appState.products[0]);
    showMoreBtn.addEventListener("click", showMoreProducts);
    categoriesContainer.addEventListener("click", applyFilter);
    cartBtn.addEventListener("click", toggleCart);
    menuBtn.addEventListener("click", toggleMenu);
    window.addEventListener("scroll", closeOnScroll);
    barsMenu.addEventListener("click", closeOnClick);
    overlay.addEventListener("click", closeOnOverlayClick);
    document.addEventListener("DOMContentLoaded", renderCart);
    document.addEventListener("DOMContentLoaded", showCartTotal);
    productsContainer.addEventListener("click", addProduct);
    disableBtn(buyBtn);
    disableBtn(deleteBtn);
};
init();