// Food data
const foodItems = {
  kashmiri: [
    {
      id: 1,
      name: "Rogan Josh",
      description: "Aromatic lamb curry",
      price: 500,
      image: "./images/rogan josh.jpg",
    },
    {
      id: 2,
      name: "Dum Aloo",
      description: "Spicy potatoes in gravy",
      price: 259,
      image: "./images/dum aloo.jpg",
    },
    {
      id: 3,
      name: "Yakhni",
      description: "Mild, creamy yogurt-based mutton curry with fennel and dry mint",
      price: 459,
      image: "./images/yakhni.jpg"
    },
    {
      id: 4,
      name: "Kahwa",
      description: "Traditional green tea with saffron, almonds, and cardamom",
      price: 199,
      image: "./images/kahwa.jpg"
    },
    {
      id: 5,
      name: "Modur Pulav",
      description: "Sweet saffron rice with dry fruits and nuts",
      price: 349,
      image: "./images/plau.jpg"
    }    
  ],
  indian: [
    {
      id: 6,
      name: "Butter Chicken",
      description: "Creamy tomato chicken",
      price: 630,
      image: "./images/butter chicken.jpg",
    },
    {
      id: 7,
      name: "Paneer Butter Masala",
      description: "Soft paneer dunked in a creamy, silky, super flavorful and delicious curry.",
      price: 180,
      image: "./images/paneer.jpg",
    },
    {
      id: 8,
      name: "Palak Paneer",
      description: "Cottage cheese cubes in a creamy spinach gravy",
      price: 299,
      image: "./images/palak-paneer.jpg"
    },
    {
      id: 9,
      name: "Chole Bhature",
      description: "Spicy chickpea curry with deep-fried bread",
      price: 199,
      image: "./images/chole.jpg"
    },
    {
      id: 10,
      name: "Biryani",
      description: "Flavored rice with marinated meat or vegetables",
      price: 349,
      image: "./images/biryani.jpg"
    }
  ],
  japanese: [
    {
      id:11,
      name: "Sushi Platter",
      description: "Assorted fresh sushi",
      price: 290,
      image: "./images/sushi.jpg",
    },
    {
      id: 12,
      name: "Ramen",
      description: "Rich broth with noodles",
      price: 135,
      image: "./images/ramen.jpg",
    },
    {
      id: 13,
      name: "Okonomiyaki",
      description: "Savory pancake with various toppings and a special sauce",
      price: 399,
      image: "./images/Okonomiyaki.jpg"
    },
    {
      id: 14,
      name: "Tonkatsu",
      description: "Breaded and deep-fried pork cutlet served with sauce",
      price: 449,
      image: "./images/Tonkatsu.jpg"
    }
  ],
  chinese: [
    {
      id: 16,
      name: "Kung Pao Chicken",
      description: "Spicy stir-fried chicken",
      price: 780,
      image: "./images/kung pau chicken.jpg",
    },
    {
      id: 17,
      name: "Mapo Tofu",
      description: "Spicy tofu in sauce",
      price: 210,
      image: "./images/mapo-tofu.jpg",
    },
    {
      id: 18,
      name: "Chow Mein",
      description: "Stir-fried noodles with vegetables and meat",
      price: 249,
      image: "./images/Chow Mein.jpg"
    },
    {
      id: 19,
      name: "Spring Rolls",
      description: "Crispy rolls filled with vegetables or meat",
      price: 199,
      image: "./images/Spring Rolls.jpg"
    },
    {
      id: 20,
      name: "Pizza",
      description: "Crispy rolls filled with vegetables or meat",
      price: 399,
      image: "./images/pizza.jpg"
    },
    {
      id: 21,
      name: "Burger",
      description: "Crispy rolls filled with vegetables or meat",
      price: 159,
      image: "./images/burger1.jpg"
    }
  ],
};

const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");
const cartBtn = document.getElementById("cart-btn");
const cartCount = document.getElementById("cart-count");
const cartModal = document.getElementById("cart-modal");
const closeBtn = document.querySelector(".close");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

let cart = [];

// Render dishes for each cuisine
function renderDishes(cuisine) {
  const tabContent = document.getElementById(cuisine);
  tabContent.innerHTML = foodItems[cuisine].map((item) => `
                <div class="dish">
                    <img src="${item.image}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <p>Rs. ${item.price.toFixed(2)}</p>
                    <button onclick="addToCart(${item.id})">Add to Cart</button>
                </div>
            `
    ).join("");
}

// Add item to cart
function addToCart(id) {
  const item = Object.values(foodItems)
    .flat()
    .find((item) => item.id === id);
  cart.push(item);
  updateCart();
}

function updateCart() {
  cartCount.textContent = cart.length;
  cartItems.innerHTML = cart.map((item, index) => `
                <li>
                    ${item.name} - $${item.price.toFixed(2)}
                    <button onclick="removeFromCart(${index})">Remove</button>
                </li>
            `
    ).join("");
  cartTotal.textContent = cart
    .reduce((total, item) => total + item.price, 0)
    .toFixed(2);
}

// Remove item from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// Handle checkout
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
  } else {
    alert(`Thank you for your order! Total: $${cartTotal.textContent}`);
    cart = [];
    updateCart();
    cartModal.style.display = "none";
  }
}

function updateCart() {
  cartCount.textContent = cart.length;
  cartItems.innerHTML = cart.map((item, index) => `
                <li>
                    ${item.name} - Rs. ${item.price.toFixed(2)}
                    <button onclick="removeFromCart(${index})">Remove</button>
                </li>
            `
    ).join("");
  const subtotal = cart.reduce((total, item) => total + item.price, 0);
  const deliveryFee = 25;
  const total = subtotal + deliveryFee;
  document.getElementById("cart-subtotal").textContent = subtotal.toFixed(2);
  document.getElementById("cart-total").textContent = total.toFixed(2);
}

document
  .getElementById("continue-shopping")
  .addEventListener("click", () => (cartModal.style.display = "none"));

// Search restaurants and dishes
function searchFood() {
  const query = searchInput.value.toLowerCase();
  const allFoodItems = Object.values(foodItems).flat();

  const filteredItems = allFoodItems.filter(
    (item) =>
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
  );

  let results = "";
  filteredItems.forEach((item) => {
    for (let cuisine in foodItems) {
      if (foodItems[cuisine].includes(item)) {
        results += `
                  <div class="dish">
                      <img src="${item.image}" alt="${item.name}">
                      <h3>${item.name}</h3>
                      <p>${item.description}</p>
                      <p>$${item.price.toFixed(2)}</p>
                      <p><em>Cuisine: ${
                        cuisine.charAt(0).toUpperCase() +
                        cuisine.slice(1)
                      }</em></p>
                      <button onclick="addToCart(${
                        item.id
                      })">Add to Cart</button>
                  </div>
              `;
        break;
      }
    }
  });

  document
    .querySelectorAll(".tab-content")
    .forEach((el) => el.classList.remove("active"));
  document.getElementById("kashmiri").innerHTML = results;
  document.getElementById("kashmiri").classList.add("active");
}

// Event listeners
tabBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    const cuisine = this.getAttribute("data-cuisine");
    tabBtns.forEach((b) => b.classList.remove("active"));
    tabContents.forEach((c) => c.classList.remove("active"));
    this.classList.add("active");
    document.getElementById(cuisine).classList.add("active");
    renderDishes(cuisine);
  });
});

cartBtn.addEventListener("click", () => (cartModal.style.display = "block"));
closeBtn.addEventListener("click", () => (cartModal.style.display = "none"));
window.addEventListener("click", (e) => {
  if (e.target === cartModal) cartModal.style.display = "none";
});
checkoutBtn.addEventListener("click", checkout);
searchBtn.addEventListener("click", searchFood);
searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") searchFood();
});

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Thank you for your message! We will get back to you soon.");
  this.reset();
});

// Initialize the page
renderDishes("kashmiri");
