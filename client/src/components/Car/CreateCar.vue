<template>
  <div>
    <h1>Create Car</h1>
    <form v-on:submit.prevent="createCar">
      <div>Car Name: <input type="text" v-model="car.car_name"></div>
      <div>Year: <input type="number" v-model="car.year"></div>
      <div>Price: <input type="number" v-model="car.price" step="0.01"></div>
      <div>Manufacturer: <input type="text" v-model="car.manufacturer"></div>
      <div>Engine Type: <input type="text" v-model="car.engine_type"></div>
      <div><button type="submit">Create Car</button></div>
    </form>
  </div>
</template>

<script>
import CarsService from '../../services/CarService';

export default {
  data() {
    return {
      car: {
        car_name: '',
        year: '',
        price: '',
        manufacturer: '',
        engine_type: ''
      }
    };
  },
  methods: {
    async createCar() {
      try {
        await CarsService.post(this.car);
        this.$router.push('/cars');
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style>
/* Add your styling here */
</style>
