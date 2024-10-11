<template>
  <div>
    <h1>Edit Car</h1>
    <form v-on:submit.prevent="editCar">
      <p>
        Car Name:
        <input type="text" v-model="car.car_name" />
      </p>
      <p>
        Year:
        <input type="number" v-model="car.year" />
      </p>
      <p>
        Price:
        <input type="number" step="0.01" v-model="car.price" />
      </p>
      <p>
        Manufacturer:
        <input type="text" v-model="car.manufacturer" />
      </p>
      <p>
        Engine Type:
        <input type="text" v-model="car.engine_type" />
      </p>

      <transition name="fade">
        <div class="thumbnail-pic" v-if="car.pic != 'null'">
          <img :src="BASE_URL + car.pic" alt="thumbnail" />
        </div>
      </transition>

      <form enctype="multipart/form-data" novalidate>
        <div class="dropbox">
          <input
            type="file"
            multiple
            :name="uploadFieldName"
            :disabled="isSaving"
            @change="filesChange($event.target.name, $event.target.files)"
            accept="image/*"
            class="input-file"
          />
          <p v-if="isInitial">Drag your file(s) here to begin<br />or click to browse</p>
          <p v-if="isSaving">Uploading {{ fileCount }} files...</p>
          <p v-if="isSuccess">Upload Successful.</p>
        </div>
      </form>

      <div>
        <transition-group tag="ul" class="pictures">
          <li v-for="picture in pictures" v-bind:key="picture.id">
            <img
              style="margin-bottom: 5px"
              :src="BASE_URL + picture.name"
              alt="picture image"
            />
            <br />
            <button v-on:click.prevent="useThumbnail(picture.name)">Thumbnail</button>
            <button v-on:click.prevent="delFile(picture)">Delete</button>
          </li>
        </transition-group>
        <div class="clearfix"></div>
      </div>

      <p>
        <button type="submit">Update Car</button>
        <button v-on:click="navigateTo('/cars')">Back</button>
      </p>
    </form>
  </div>
</template>

<script>
import CarsService from "@/services/CarService";  // Import Car service
import UploadService from "@/services/UploadService";  // Upload service for images

const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;

export default {
  data() {
    return {
      BASE_URL: "http://localhost:8081/assets/uploads/",
      error: null,
      currentStatus: null,
      uploadFieldName: "carPhoto",
      uploadedFileNames: [],
      pictures: [],
      pictureIndex: 0,
      car: {
        car_name: "",
        year: null,
        price: null,
        manufacturer: "",
        engine_type: "",
        pic: "null",
      },
    };
  },
  methods: {
    async delFile(picture) {
      let result = confirm("Want to delete?");
      if (result) {
        let dataJSON = { filename: picture.name };
        await UploadService.delete(dataJSON);
        this.pictures = this.pictures.filter((pic) => pic.id !== picture.id);
      }
    },
    async editCar() {
      this.car.pictures = JSON.stringify(this.pictures);  // Convert pictures to JSON
      console.log("Editing car: ", this.car);
      try {
        await CarsService.put(this.car);  // Call the Car service to update data
        this.$router.push({ name: "cars" });  // Navigate after success
      } catch (err) {
        console.error("Error updating car:", err);
      }
    },
    filesChange(fieldName, fileList) {
      const formData = new FormData();
      if (!fileList.length) return;
      Array.from(fileList).forEach((file) => {
        formData.append(fieldName, file, file.name);
        this.uploadedFileNames.push(file.name);
      });
      this.save(formData);
    },
    async save(formData) {
      try {
        this.currentStatus = STATUS_SAVING;
        await UploadService.upload(formData);
        this.currentStatus = STATUS_SUCCESS;
        this.uploadedFileNames.forEach((filename) => {
          if (!this.pictures.some((pic) => pic.name === filename)) {
            this.pictureIndex++;
            this.pictures.push({ id: this.pictureIndex, name: filename });
          }
        });
        this.clearUploadResult();
      } catch (error) {
        console.error(error);
        this.currentStatus = STATUS_FAILED;
      }
    },
    clearUploadResult() {
      setTimeout(() => this.reset(), 5000);
    },
    reset() {
      this.currentStatus = STATUS_INITIAL;
      this.uploadedFileNames = [];
    },
    useThumbnail(filename) {
      this.car.pic = filename;  // Set the chosen image as the thumbnail
    },
    navigateTo(route) {
      this.$router.push(route);
    },
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
  },
  created() {
    this.currentStatus = STATUS_INITIAL;
    // Load car data to edit here
    this.loadCarData();
  },
  methods: {
    async loadCarData() {
      const carId = this.$route.params.carId; // Get the car ID from the route params
      try {
        const response = await CarsService.show(carId); // Fetch car data
        this.car = response.data; // Set car data
        this.pictures = JSON.parse(this.car.pictures); // Load pictures
        this.pictureIndex = this.pictures.length; // Set picture index
      } catch (error) {
        console.error("Error loading car data:", error);
      }
    },
  },
};
</script>

<style scoped>
.dropbox {
  outline: 2px dashed grey; /* the dash box */
  outline-offset: -10px;
  background: lemonchiffon;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px; /* minimum height */
  position: relative;
  cursor: pointer;
}
.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: khaki; /* when mouse over to the drop zone, change color 
*/
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}
ul.pictures {
  list-style: none;
  padding: 0;
  margin: 0;
  float: left;
  padding-top: 10px;
  padding-bottom: 10px;
}
ul.pictures li {
  float: left;
}
ul.pictures li img {
  max-width: 180px;
  margin-right: 20px;
}
.clearfix {
  clear: both;
}
/* thumbnail */
.thumbnail-pic img {
  width: 200px;
}
</style>
