
// Function to get the current cart items from cookies
function getShoppingCart() {
    const cartJson = getCookie('shopping-card')
    return cartJson ? JSON.parse(cartJson) : {};
}

function refreshCartTotal(shoppingCard) {
    let countTotal = 0;
    let cardItems = shoppingCard.items;

    for (let ref in cardItems) {
        if (cardItems.hasOwnProperty(ref)) {
            countTotal += parseInt(cardItems[ref].quantity)
        }
    }

    shoppingCard.total = countTotal

    if (shoppingCard.total == 0) {
        removeCookie('shopping-card')
    } else {
        setCookie('shopping-card', JSON.stringify(shoppingCard), 30)
    }
}


function addToShoppingCart(button = null) {
    let shoppingCard = getShoppingCart();
    let productRef = button.dataset.target

    if (!shoppingCard?.items) {
        shoppingCard.items = {}
    }

    if (!(shoppingCard.items).hasOwnProperty(productRef)) {
        shoppingCard.items[productRef] = {}
    }

    let newQuantity = parseInt(button.dataset.quantity);
    let currentItemQuantity = shoppingCard.items[productRef]?.quantity ? shoppingCard.items[productRef]?.quantity : 0
    let currentTotalQuantity = shoppingCard?.total ? shoppingCard.total : 0


    shoppingCard.total = parseInt(currentTotalQuantity) + newQuantity

    shoppingCard.items[productRef] = {
        "ref": button.dataset.target,
        "quantity": parseInt(currentItemQuantity) + parseInt(newQuantity)
    }

    if (!setCookie('shopping-card', JSON.stringify(shoppingCard), 30)) {
        globalToastify("Un problème est survenu lors de l'ajout de l'article", "error")
        return
    }

    globalToastify("✔️ 🛒 " + newQuantity + " produit(s) ajouté(s) au panier", "success");
    refreshCartItemIndication(button.dataset.target)
}


function removeFromShoppingCart(data) {
    try {
        let shoppingCard = getShoppingCart();
        delete shoppingCard.items[data.ref];
        refreshCartTotal(shoppingCard)
        if (!setCookie('shopping-card', JSON.stringify(shoppingCard), 30)) {
            globalToastify("⚠️ Un problème est survenu, veuillez réessayer plus tard", "error");
        }
        globalToastify("✔️ 🗑️ produit retiré", "success");
        setTimeout(() => {
            location.href = jsRoute('app-shopping-cart');
        }, 700);
    } catch (error) {
        globalToastify("⚠️ Un problème est survenu, veuillez réessayer plus tard", "error");
    }
}


function updateQuantityFromShoppingCart(data) {
    let shoppingCard = getShoppingCart()
    shoppingCard.items[data.ref].quantity = data.quantity
    refreshCartTotal(shoppingCard)

    if (!setCookie('shopping-card', JSON.stringify(shoppingCard), 30)) {
        globalToastify("Un problème est survenu lors de l'ajout de l'article", "error")
        return
    }
    myFullLoader('on')
    globalToastify("✔️ 🛒 Panier mis à jour", "success");
    refreshCartItemIndication()

    setTimeout(() => {
        window.location.href = window.location.href;
    }, 500);
}


function refreshCartItemIndication(itemRef = null) {
    let shoppingCard = getShoppingCart()
    let shoppingCartItemTotalIndicators = document.querySelectorAll("span.cart-total-count")

    if (shoppingCartItemTotalIndicators != null) {
        shoppingCartItemTotalIndicators.forEach(CartItemTotalIndicator => {
            CartItemTotalIndicator.textContent = shoppingCard.total > 0 ? shoppingCard.total : ''
            let parentBlocCardItemCounter = CartItemTotalIndicator.closest(".cart-counter-bloc")
            // if cart is not empty, but indicator is not active, we active it
            if (parseInt(shoppingCard.total) > 0 && !parentBlocCardItemCounter.classList.contains("app-shopping-cart-not-empty")) {
                parentBlocCardItemCounter.classList.add("app-shopping-cart-not-empty")
            }
            // if cart is empty, but indicator is  active, we desactive it
            if (parseInt(shoppingCard.total) <= 0 && parentBlocCardItemCounter.classList.contains("app-shopping-cart-not-empty")) {
                parentBlocCardItemCounter.classList.remove("app-shopping-cart-not-empty")
            }
        })
    }

    // target iteù total in cart 
    if (itemRef != null) {
        let targetItemTotalIndicators = document.querySelectorAll("span.cart-total-item[data-target='" + itemRef + "']")
        if (!targetItemTotalIndicators) {
            return
        }
        targetItemTotalIndicators.forEach(targetItemTotalIndicator => {
            targetItemTotalIndicator.textContent = shoppingCard.items[itemRef].quantity
        })
    }
}