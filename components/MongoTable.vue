<template>
  
    <div style="background-color: lightblue;">
    
      <div class="container " style="background-color: lightblue;">
        <br>
        <div class="form-inline" action="#" style="background-color: lightblue;">
          <span class="h1 fw-bold mb-0"
                      style="font-family: 'Press Start 2P'; color: black; font-size: 50px; margin-left: 300px; margin-top: 5px; align-items: center; margin-bottom: 100px;">Student
                      List</span>
        <input type="text" id="FirstName" v-model="item.firstname" placeholder="First Name" class="form-control" style="margin-top: 40px; margin-bottom: 40px;">
        <input type="text" id="LastName" v-model="item.lastname" placeholder="Last Name" class="form-control" style="margin-top: 50px; margin-right: 50px; margin-bottom: 50px;">
        <button @click="addItem" id="AddStudentBtn" class="btn btn-dark"><i class="fas fa-plus" style=" align-items: center; font-family: 'Press Start 2P';  ">Add</i></button>
          </div>
        <br><br>
        <table id="StudTable" class="table table-striped table-bordered table-sm">
          <thead class="thead-light">
            <th>First Name</th>
            <th>Last Name</th>
            <th class="col-2">Edit/Delete</th>
          </thead>
          <tr v-for="item in items" :key="item.firstname">
            <td>
              <input v-if="item.edit" type="text" v-model="item.firstname">
              <span v-else>{{item.firstname}}</span>
            </td>
            <td>
              <input v-if="item.edit" type="text" v-model="item.lastname">
              <span v-else>{{item.lastname}}</span>
            </td>
            <td><button @click="ItemEdit(item)" class="btn btn-info"><i class="far fa-edit">edit</i></button>
              <button @click="removeItem(item)" class="btn btn-danger"><i class="far fa-trash-alt">delete</i></button></td>
          </tr>
        </table>
    </div>
    </div>
      
    </template>
    
    <script>
    let url = "http://localhost:3002/users";
      export default {
        data() {
        return {
          item: {id: 0, firstname: "", lastname: "", edit: false},
          items: [],
          tempData: []
        }
      },
      methods:{
        async addItem() {
          console.log(this.item.id);
          await this.$axios.$post(url + '/insert', this.item)
          .then((res) => {
            console.log(res);
            this.item = {id: 0, firstname: "", lastname: "", edit: false};
          })
          .catch((err) => console.log(err));
          this.GetAllData();
          this.GetCurrentID();
        },
        async removeItem(item){
          await this.$axios.$post(url + '/delete', {id: item.id})
          .then((res) => {
            console.log(res);
            this.GetAllData();
        })
        .catch((err) => console.log(err));
        },
        async GetAllData(){
          this.items = await this.$axios.$get(url)
          .then((res) => {
            console.log(res);
            this.tempData = res;
            console.log(this.items);
          })
          .catch((err) => console.log(err));
  
          this.items = this.tempData;
          this.GetCurrentID();
        },
        async ItemEdit(item) //For Updating
        {
          if(!item.edit)
          {
            item.edit = !item.edit
          }
          else
          {
            item.edit = !item.edit
            console.log(item);
            await this.$axios.$post(url + '/update', item)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => console.log(err));
          }
        },
        GetCurrentID(){
          this.item.id = Math.max.apply(Math, this.items.map(function(o) { return o.id; })) + 1;
        }
      },
      async mounted(){
        await this.GetAllData();
      }
    }
    </script>
    
    <style scoped>
    .form-inline input {
      margin-right:8px;
    }
    body{
      background-color: lightblue;
    }
    </style>
    
    
    
    