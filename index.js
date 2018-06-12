// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 0
let mealId = 0
let customerId = 0
let deliveryId = 0

class Neighborhood {
	constructor(name) {
		this.name = name
		this.id = ++neighborhoodId
		store.neighborhoods.push(this)
	}

	deliveries(){
		return store.deliveries.filter(delivery=>delivery.neighborhood() === this)
	}

	customers() {
		return store.customers.filter(customer=>customer.neighborhood===this)
	}

	meals() {

		return Array.from(new Set(this.deliveries().map(delivery=>delivery.meal())))
	}
}

class Meal {
	constructor(title, price) {
		this.title = title
		this.price = price
		this.id = ++mealId
		store.meals.push(this)
	}
	deliveries() {
		return store.deliveries.filter(delivery=>delivery.meal()===this)
	}
	customers() {
		return this.deliveries().map(delivery=>delivery.customer())
	}

	static byPrice() {
		return store.meals.sort((meal1, meal2)=> meal2.price - meal1.price)
	}
}

class Customer {
	constructor(name, neighborhoodId) {
		this.name = name
		this.neighborhoodId = neighborhoodId
		this.neighborhood = store.neighborhoods.find(neigh=>neigh.id === neighborhoodId)
		this.id = ++customerId
		store.customers.push(this)
	}

	deliveries() {
		return store.deliveries.filter(delivery=>delivery.customer() === this)
	}

	meals() {
		return this.deliveries().map(delivery=>delivery.meal())
	}

	totalSpent() {
		return this.deliveries().reduce((total, delivery)=> {
			return total += delivery.meal().price
		}, 0)
	}

}

class Delivery {
	constructor(mealId, neighborhoodId, customerId) {
		this.id = ++deliveryId
		this.mealId = mealId
		this.neighborhoodId = neighborhoodId
		this.customerId = customerId
		
		store.deliveries.push(this)
	}

	meal() {
		return store.meals.find(meal=>meal.id===this.mealId)
	}

	customer() {
		return store.customers.find(customer=>customer.id===this.customerId)
	}

	neighborhood() {
		return store.neighborhoods.find(neighborhood=>neighborhood.id===this.neighborhoodId)
	}
}