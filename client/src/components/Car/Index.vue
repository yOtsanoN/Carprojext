<template>
  <div class="car-list-container">
    <h1 class="title">Car Inventory</h1>
    <div><button class="add-button" v-on:click="navigateTo('/car/create')">Add New Car</button></div>
    <hr>
    <div v-if="cars.length" class="car-grid">
      <div v-for="car in cars" v-bind:key="car.id" class="car-card">
        <div class="car-image-container" v-if="car.pic">
          <img :src="BASE_URL + car.pic" alt="Car Picture" class="car-image" />
        </div>
        <div class="car-details">
          <div><b>Car Name:</b> {{ car.car_name }}</div>
          <div><b>Year:</b> {{ car.year }}</div>
          <div><b>Price:</b> ${{ car.price }}</div>
          <div><b>Manufacturer:</b> {{ car.manufacturer }}</div>
          <div><b>Engine Type:</b> {{ car.engine_type }}</div>
        </div>
        <div class="car-actions">
          <button class="view-button" v-on:click="navigateTo('/car/'+car.id)">View Details</button>
          <button class="edit-button" v-on:click="navigateTo('/car/edit/'+car.id)">Edit Car</button>
          <button class="delete-button" v-on:click="deleteCar(car)">Delete Car</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import CarService from "@/services/CarService";
export default {
  data(){
    return {
      cars: [],
      BASE_URL: "http://localhost:8081/assets/uploads/"
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

<style scoped>
.car-list-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #f0f4f8;
}

.title {
  text-align: center;
  color: #333333;
  font-weight: bold;
  margin-bottom: 20px;
}

.add-button, .logout-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-bottom: 20px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.add-button:hover, .logout-button:hover {
  background-color: #45A049;
}

.car-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.car-card {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.car-card:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.car-image-container {
  text-align: center;
  margin-bottom: 20px;
}

.car-image {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.car-details {
  margin-bottom: 20px;
}

.car-actions {
  display: flex;
  justify-content: space-between;
}

.view-button, .edit-button, .delete-button {
  background-color: #2196F3;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.view-button:hover {
  background-color: #1976D2;
}

.edit-button {
  background-color: #FFC107;
}

.edit-button:hover {
  background-color: #FFA000;
}

.delete-button {
  background-color: #F44336;
}

.delete-button:hover {
  background-color: #D32F2F;
}
</style>
