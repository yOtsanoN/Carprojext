import Api from '@/services/Api'

export default {
    index() {
        return Api().get('cars'); // Get all cars
    },
    show(carId) {
        return Api().get('car/' + carId); // Get a car by ID
    },
    post(car) {
        return Api().post('car', car); // Create a new car
    },
    put(car) {
        return Api().put(`car/${car.id}`, car); 
    },
    delete(car) {
        return Api().delete('car/' + car.id); // Delete a car
    },
}
