let deliveryId = 0;
let neighborhoodId = 0;
let mealId = 0;
let customerId = 0;

let store = {
  neighborhoods: [],
  meals: [],
  customers: [],
  deliveries: [],
};

class Neighborhood {
  constructor(name) {
    this.name = name;
    this.id = ++neighborhoodId;
    store.neighborhoods.push(this);
  }

  deliveries() {
    return store.deliveries.filter(delivery => delivery.neighborhoodId === this.id);
  }

  customers() {
    return store.customers.filter(customer => customer.neighborhoodId === this.id);
  }

  meals() {
    const allNeighborhoodMeals = this.deliveries().map(delivery => delivery.meal());
    return [...new Set(allNeighborhoodMeals)];
  }
}

class Meal {
  constructor(title, price) {
    this.title = title;
    this.price = price;
    this.id = ++mealId;
    store.meals.push(this);
  }

  deliveries() {
    return store.deliveries.filter(delivery => delivery.mealId === this.id);
  }

  customers() {
    return this.deliveries().map(delivery => delivery.customer());
  }

  static byPrice() {
    return store.meals.sort((a, b) => b.price - a.price);
  }
}

class Customer {
  constructor(name, neighborhood) {
    this.name = name;
    this.neighborhoodId = neighborhood;
    this.id = ++customerId;
    store.customers.push(this);
  }

  deliveries() {
    return store.deliveries.filter(delivery => this.id === delivery.customerId);
  }

  meals() {
    return this.deliveries().map(delivery => delivery.meal());
  }

  totalSpent() {
    const mealPrices = this.meals().map(meal => meal.price);
    return mealPrices.reduce((sum, n) => sum + n);
  }
}

class Delivery {
  constructor(meal, neighborhood, customer) {
    this.mealId = meal;
    this.neighborhoodId = neighborhood;
    this.customerId = customer;
    this.id = ++deliveryId;
    store.deliveries.push(this);
  }

  meal() {
    return store.meals.find(meal => meal.id === this.mealId);
  }

  customer() {
    return store.customers.find(customer => customer.id === this.customerId);
  }

  neighborhood() {
    return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId);
  }
}
