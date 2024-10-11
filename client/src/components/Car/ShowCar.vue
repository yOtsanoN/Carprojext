<template>
    <div>
      <h1>Get All Cars</h1>
      <div><button v-on:click="navigateTo('/car/create')">Add New Car</button></div>
      <hr>
      <div v-if="cars.length">
        <div><b>Total Cars:</b> {{ cars.length }}</div>
        <div v-for="car in cars" v-bind:key="car.id">
          <div><b>ID:</b> {{ car.id }}</div>
          <div><b>Car Name:</b> {{ car.car_name }}</div>
          <div><b>Year:</b> {{ car.year }}</div>
          <div><b>Price:</b> {{ car.price }}</div>
          <div><b>Manufacturer:</b> {{ car.manufacturer }}</div>
          <div><b>Engine Type:</b> {{ car.engine_type }}</div>
          <div>
            <button v-on:click="navigateTo('/car/'+car.id)">View Details</button>
            <button v-on:click="navigateTo('/car/edit/'+car.id)">Edit Car</button>
            <button v-on:click="deleteCar(car)">Delete Car</button>
          </div>
          <hr>
        </div>
      </div>
      <div><button v-on:click="logout">Logout</button></div>
    </div>
  </template>
  
  <script>
  import CarService from "@/services/CarService";
  export default {
    data(){
      return {
        cars: []
      }
    },
    async created() {
      try{
        this.cars = (await CarService.index()).data;
      }catch(err){
        console.log(err);
      }
    },
    methods:{
      logout(){
        this.$store.dispatch('setToken',null)
        this.$store.dispatch('setUser',null)
        this.$router.push({
          name: 'login'
        })
      },
      navigateTo(route){
        this.$router.push(route);
      },
      async deleteCar(car){
        let result = confirm("Are you sure you want to delete this car?");
        if(result){
          try{
            await CarService.delete(car);
            this.refreshData();
  
          }catch(err){
            console.log(err);
          }
        }
      },
      async refreshData(){
        try{
          this.cars = (await CarService.index()).data;
        }catch(err){
          console.log(err);
        }
      }
    }
  };
  </script>
  
  <style></style>
  