const eventBus = new Vue();
Vue.config.devtools = true;

Vue.component("details-com", {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: `
        <ul>
            <li v-for="detail in details">{{ detail }}</li>
        </ul>
    `
});


Vue.component("product-review", {
    template: `
        <form class="review-form" @submit.prevent="onSubmit">
            <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                    <li v-for="error in errors">{{error}}</li>
                </ul>
            </p>
            <p>
                <label for="name">Name:</label>
                <input id="name" v-model="name">
            </p>
            <p>
                <label for="review">Review:</label>
                <textarea id="review" v-model="review"></textarea>
            </p>
            <p>
                <label for="rating">Rating:</label>
                <select id="rating" v-model.number="rating">
                    <option value="5">5</option>
                    <option value="4">4</option>
                    <option value="3">3</option>
                    <option value="2">2</option>
                    <option value="1">1</option>
                </select>
            </p>
            <p>
                <input type="submit" value="Submit">
            </p>
        </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            this.errors = [];

            if (this.name && this.review && this.rating) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                };

                eventBus.$emit("review-submitted", productReview);

                this.name = null;
                this.review = null;
                this.rating = null;
                this.errors = [];
            } else {
                if (!this.name) this.errors.push("Name required!");
                if (!this.review) this.errors.push("Review required!");
                if (!this.rating) this.errors.push("Rating required!");
            }
        }
    }
});

Vue.component("product-tabs", {
    props: {
        reviews: {
            type: Array,
            required: true
        }
    },
    template: `
        <div>
            <span
                class="tab"
                :class="{ activeTab: selectedTab === tab }"
                v-for="(tab, index) in tabs"
                :key="index"
                @click="selectedTab = tab"
            >{{ tab }}</span>
            <div v-show="selectedTab === 'Reviews'">
                <h2>Reviews</h2>
                <p v-if="!reviews.length">There are no reviews yet</p>
                <ul>
                    <li v-for="review in reviews">
                        <p>{{ review.name }}</p>
                        <p>Rating: {{ review.rating }}</p>
                        <p>{{ review.review }}</p>
                    </li>
                </ul>
            </div>
            <product-review v-show="selectedTab === 'Make a Review'"></product-review>
        </div>
    `,
    data() {
        return {
            tabs: ["Reviews", "Make a Review"],
            selectedTab: "Reviews"
        }
    },
});

Vue.component("product", {
    props: {
        premium: {
            type: Boolean,
            required: true,
        }
    },
    template: `
        <div class="product">
            <div class="product-image">
                <img :src="image">
            </div>
            <div class="product-info">
                <h1>{{ title }}</h1>
                <p v-if="inventory > 10">In Stock</p>
                <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out</p>
                <p v-else style="text-decoration: line-through">Out of Stock</p>
                <p v-if="onSale">On Sale</p>
                <p>Shipping: {{ shipping }}</p>
                <details-com :details="details"></details-com>  
                <div
                        v-for="(variant, index) in variants"
                        :key="variant.variantId"
                        class="color-box"
                        :style="{ backgroundColor: variant.variantColor }"
                        @mouseover="updateProduct(index)"
                ></div>
                <button :class="{ disabledButton: !inStock }" @click="addToCart" :disabled="!inStock">Add to Cart</button>
                <button @click="removeFromCart" >Remove from Cart</button>
            </div>
            <product-tabs :reviews="reviews"></product-tabs>
          
        </div>
    `,
    data() {
        return {
            brand: "Vue Mastery",
            product: "Socks",
            selectedVariant: 0,
            inventory: 5,
            onSale: false,
            details: ["80% cotton", "20% polyester", "Gender-neutral"],
            variants: [{
                variantId: 2023,
                variantColor: "green",
                variantImage: "./assets/vmSocks-green-onWhite.jpg",
                variantQuantity: 1,
            }, {
                variantId: 2024,
                variantColor: "blue",
                variantImage: "./assets/vmSocks-blue-onWhite.jpg",
                variantQuantity: 5,
            }],
            reviews: []
        }
    },
    methods: {
        addToCart () {
            this.$emit("add-to-cart", this.variants[this.selectedVariant].variantId);
        },
        removeFromCart () {
            this.$emit("remove-from-cart", this.variants[this.selectedVariant].variantId);
        },
        updateProduct (index) {
            this.selectedVariant = index;
        }
    },

    computed: {
        title () {
            return this.brand + " " + this.product;
        },
        image () {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock () {
            return this.variants[this.selectedVariant].variantQuantity;
        },
        shipping () {
            if (this.premium) {
                return "Free";
            } else {
                return 2.99;
            }
        },
        inCart () {
            return this.variants[this.selectedVariant].variantQuantity;
        }
    },
    mounted() {
        eventBus.$on("review-submitted", productReview => {
            this.reviews.push(productReview);
        })
    }
});

const app = new Vue({
    el: "#app",
    data: {
        premium: true,
        cart: []

    },
    methods: {
        addToCart (id) {
            this.cart.push(id);
        },
        removeFromCart (id) {
            this.cart = this.cart.filter(idInCart => idInCart !== id);
        },
    }
});