<template>
  <section class="vh-600" style="height: 100vh;background-image: url('/image/samplebgimage.gif')">
    <div class="container py-5 h-200">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col col-xl-10">
          <div class="card" style="border-radius: 1rem;">
            <div class="row g-0">

              <div class="col-md-6 col-lg-7 d-flex align-items-center">
                <div class="card-body p-4 p-lg-5 text-black">
                  <div class="d-flex align-items-center mb-3 pb-1">
                    <i class="fas fa-cubes fa-2x me-3" style="color: #ff6219;"></i>
                    <span class="h1 fw-bold mb-0"
                      style="font-family: 'Press Start 2P'; color: black; font-size: 50px; margin-left: 300px; margin-top: 5px; align-items: center;">Student
                      List</span>
                  </div>
                  <div class="col-md-6 col-lg-4 d-none d-md-block">
                    <img src="/image/cutie.gif" alt="pic1" class="img-fluid"
                      style="border-radius: 1rem 1rem 0 1rem; margin-left: -30px; margin-top: -200px; size: contain; " />
                  </div>
                  <div>
                    <b-table id="StudTable" name="StudentTable" striped hover :items="students" :fields="fields">
                      <template v-slot:cell()="{ value, item, field: { key }}">
                        <template v-if="!item.edit">{{ value }}</template>
                        <b-form-input v-else v-model="item[key]" />
                      </template>
                      <template v-slot:cell(buttons)="{ item }" style="color:black; font-family: Space Mono; margin-left: 100px; font-size: 20px; text-align:center ;">
                        <div class="row">
                          <div class="col">
                            <button @click="removeStudent(item)" style="font-family: 'Press Start 2P'">X</button>
                            <b-button @click="editStudent(item)" v-b-modal.mymodal style="font-family: 'Press Start 2P'; margin-top:-10px; margin-left: 10px;">E</b-button>
                          </div>
                        </div>                    
                      </template>
                    </b-table>
                    <form @submit.prevent="addStudent">
                      <input v-model="student.LastName" placeholder="Lastname" style="margin-left: 20px; font-family: 'Space Mono';">
                      <input v-model="student.FirstName" placeholder="Firstname" style="margin-left:5px; margin-right: 45px; margin-top: 20px; font-family: 'Space Mono';">
                      <input v-model="student.Course" placeholder="Course" style="margin-left: -40px; font-family: 'Space Mono';">

                      <button
                        style="margin-left: 300px; margin-top: 20px; margin-bottom: 20px; font-family: 'Press Start 2P' ">ADD
                        STUDENT</button>                     
                      <div>
<!-- 
                        <b-modal hide-footer id="mymodal" ref="modal"
                          title="Update Student Information">
                          <form ref="form" @submit.stop.prevent="handleSubmit">
                            <b-form-group label="First Name" label-for="name-input"
                              invalid-feedback="Information is required" :state="nameState">
                              <b-form-input id="name-input" v-model="fname" :state="nameState" required></b-form-input>
                            </b-form-group>
                            <b-form-group label="Last Name" label-for="name-input"
                              invalid-feedback="Information is required" :state="nameState">
                              <b-form-input id="name-input" v-model="lname" :state="nameState" required></b-form-input>
                            </b-form-group>
                            <b-form-group label="Course" label-for="name-input"
                              invalid-feedback="Information is required" :state="nameState">
                              <b-form-input id="name-input" v-model="course" :state="nameState" required></b-form-input>
                            </b-form-group>
                            <button @click="editStudent(item)"  style="background-color:gray; font-family: 'Press Start 2P'; color: white">Update</button>>
                          </form>
                        </b-modal>
                        -->
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>
<style>
section {
  background-image: url("/image/background.gif");
}
</style>
<script>
let id = 0;
const url = "http://localhost:3002/students";
export default {
  data() {
    return {
      newStudent: '',
      fields: ['id', 'LastName', 'FirstName', 'Course', 'buttons'],
      students: [],
      student: {id: 0, FirstName: "", LastName: "", Course: "", edit: false},
      tempStud: []
    }
  },
  methods: {
    
    async addStudent() {
      console.log(this.student.id);
      await this.$axios.$post(url + '/insert', this.student)
        .then((res) => {
          console.log(res);
          this.student = {id: 0, FirstName: "", LastName: "", Course: "", edit: false};
          this.GetAllData();
        })
        .catch((err) => console.log(err));
    },
    async removeStudent(item) {
      await this.$axios.$post(url + '/delete', {id:item.id})
      .then((res) => {
        console.log(res);
        this.GetAllStudents();
      })
      .catch((err) => console.log(err));

      //this.students = this.students.filter((t) => t !== item);
    },
    async editStudent(item)
    {
      if(!item.edit)
      {
          item.edit = !item.edit
      }else
      {
          item.edit = !item.edit 
          await this.$axios.$post(url + '/update', item)
          .then((res) => {
            console.log(res);
            this.GetAllStudents();
          })
          .catch((err) => console.log(err));
      }
    },
    GetCurrentID(){
      this.student.id = Math.max.apply(Math, this.students.map(function(o) { return o.id; })) + 1;
      console.log(this.student.id);
    },
    async GetAllStudents(){
      console.log("Get All Student");
      this.students = await this.$axios.$get(url)
      .then((res) => {
        console.log(res); 
        this.tempStud = res;
        console.log(this.students);
      })
      .catch((err) => console.log(err));
      this.students = this.tempStud;
      this.GetCurrentID();
    }
  },
  async mounted(){
    await this.GetAllStudents();
  }
}
</script>
 
    
