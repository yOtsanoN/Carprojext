<template>
  <div>
    <h1>Show Car</h1>
    <p>ID: {{ car.id }} </p>
    <p>Car Name: {{ car.car_name }} </p>
    <p>Year: {{ car.year }} </p>
    <p>Price: {{ car.price }}</p>
    <p>Manufacturer: {{ car.manufacturer }}</p>
    <p>Engine Type: {{ car.engine_type }}</p>
    <p>Created At: {{ car.createdAt }}</p>
  </div>
</template>

<script>
import CarsService from "@/services/CarService";

export default {
  data() {
    return {
      car: {}
    };
  },
  async created() {
    try {
      var carId = this.$route.params.carId;
      this.car = (await CarsService.show(carId)).data;
    } catch (err) {
      console.log(err);
    }
  }
};
</script>

<style>
/* Add your styling here */
</style>
