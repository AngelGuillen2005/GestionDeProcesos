const reviewForm = document.getElementById("reviewForm");
const ratingButtons = document.querySelectorAll("#ratingButtons button");
const ratingInput = document.getElementById("rating");
const reviewMessage = document.getElementById("reviewMessage");
const characterCount = document.getElementById("characterCount");
const reviewsGrid = document.getElementById("reviewsGrid");
const formMessage = document.getElementById("formMessage");

let selectedRating = 0;

function getInitials(name) {
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((word) => word.charAt(0).toUpperCase())
        .join("");
}

function updateRatingButtons(rating) {
    ratingButtons.forEach((button) => {
        const buttonRating = Number(button.dataset.rating);
        button.classList.toggle("selected", buttonRating <= rating);
    });
}

function createReviewCard(review) {
    const article = document.createElement("article");
    article.className = "review-card new-review";

    const reviewTop = document.createElement("div");
    reviewTop.className = "review-top";

    const avatar = document.createElement("div");
    avatar.className = "customer-avatar";
    avatar.textContent = getInitials(review.name);

    const customerInformation = document.createElement("div");

    const customerName = document.createElement("h3");
    customerName.textContent = review.name;

    const customerType = document.createElement("span");
    customerType.textContent = "Nueva reseña";

    customerInformation.append(customerName, customerType);
    reviewTop.append(avatar, customerInformation);

    const stars = document.createElement("p");
    stars.className = "review-stars";
    stars.textContent =
        "★".repeat(review.rating) + "☆".repeat(5 - review.rating);
    stars.setAttribute(
        "aria-label",
        `${review.rating} de 5 estrellas`
    );

    const message = document.createElement("p");
    message.className = "review-text";
    message.textContent = review.message;

    const product = document.createElement("p");
    product.className = "review-product";
    product.textContent = review.product;

    article.append(reviewTop, stars, message, product);

    return article;
}

function loadSavedReviews() {
    const savedReviews =
        JSON.parse(localStorage.getItem("urbanBitesReviews")) || [];

    savedReviews.forEach((review) => {
        reviewsGrid.appendChild(createReviewCard(review));
    });
}

ratingButtons.forEach((button) => {
    button.addEventListener("click", () => {
        selectedRating = Number(button.dataset.rating);
        ratingInput.value = selectedRating;
        updateRatingButtons(selectedRating);
        formMessage.textContent = "";
    });
});

reviewMessage.addEventListener("input", () => {
    characterCount.textContent = reviewMessage.value.length;
});

reviewForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (selectedRating === 0) {
        formMessage.textContent = "Selecciona una calificación.";
        formMessage.style.color = "#c83228";
        return;
    }

    const newReview = {
        name: document.getElementById("customerName").value.trim(),
        product: document.getElementById("productName").value,
        rating: selectedRating,
        message: reviewMessage.value.trim()
    };

    const savedReviews =
        JSON.parse(localStorage.getItem("urbanBitesReviews")) || [];

    savedReviews.push(newReview);

    localStorage.setItem(
        "urbanBitesReviews",
        JSON.stringify(savedReviews)
    );

    reviewsGrid.appendChild(createReviewCard(newReview));

    reviewForm.reset();
    selectedRating = 0;
    ratingInput.value = "0";
    characterCount.textContent = "0";
    updateRatingButtons(0);

    formMessage.textContent = "Tu reseña se publicó correctamente.";
    formMessage.style.color = "#18743a";

    reviewsGrid.lastElementChild.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
});

loadSavedReviews();