<template>
    <div class="body">
      <div class="d-inline-flex m-1">
  
        <RouterLink to="/" class="btn btn-success m-1 p-3 rounded-4"> <i class="fa fa-arrow-left"></i> &nbsp; Student List </RouterLink>

  
      </div>
     
      <div class="content mt-5">
      
  
        
        <h1 class="bg-info p-3 text-center rounded-3 text-white">Member Of Crews</h1>
        <button @click="addOfficer()" class="btn btn-success float-end p-3" style="margin-top: -73px;"><i class="fa fa-person"></i> Add Crew</button>
        <div > 
        
         
         
          

          <div class="input-group mb-2">
              <label for="" class=""><h4 class="mt-3 m-2">Captain:</h4></label>
              <input v-model="newPresInput" type="text" name="" id="" class="form-control p-2 m-3" placeholder="Name" required>
             
            </div>

            <div class="input-group mb-2">
              <label for="" class=""><h4 class="mt-3 m-2">Vice Captain:</h4></label>
              <input v-model="newViceInput" type="text" name="" id="" class="form-control p-2 m-3" placeholder="Name">
              
            </div>

            <div class="input-group mb-2">
              <label for="" class=""><h4 class="mt-3 m-2">Navigator:</h4></label>
              <input v-model="newSecInput" type="text" name="" id="" class="form-control p-2 m-3" placeholder="Name">
              
            </div>

            <div class="input-group mb-2">
              <label for="" class=""><h4 class="mt-3 m-2">Cook:</h4></label>
              <input v-model="newTresInput" type="text" name="" id="" class="form-control p-2 m-3" placeholder="Name">
              
            </div>

            <div class="input-group mb-2">
              <label for="" class=""><h4 class="mt-3 m-2">Sniper:</h4></label>
              <input v-model="newPioInput" type="text" name="" id="" class="form-control p-2 m-3" placeholder="Name">
              
            </div>

            <div class="input-group mb-2">
              <label for="" class=""><h4 class="mt-3 m-2">Helms Man:</h4></label>
              <input v-model="newMuseInput" type="text" name="" id="" class="form-control p-2 m-3" placeholder="Name">
              
            </div>

            <div class="input-group mb-2">
              <label for="" class=""><h4 class="mt-3 m-2">Ship Wright:</h4></label>
              <input v-model="newPrinceInput" type="text" name="" id="" class="form-control p-2 m-3" placeholder="Name">
              
            </div>
        </div>
            <br> <br> <br>
   
   
      <div v-for="officer in officers" :key="officer.officers" class="text-center">
        
        <div class="card-body">
          
          <div class="row d-inline">

            <div class="float-start bg-primary text-white rounded">
             <h1>Pirate Crews</h1>
              <h2 class="d-flex p-1 mb-3 text-black">Captain: <nav class="float-end ms-lg-auto">{{ officer.pres }}</nav>  </h2>
              <h2 class="d-flex p-1 mb-3 text-black">Vice Captain: <nav class="float-end ms-lg-auto">{{ officer.vice }}</nav>  </h2>
              <h2 class="d-flex p-1 mb-3 text-black">Navigator: <nav class="float-end ms-lg-auto">{{ officer.sec }}</nav>  </h2>
              <h2 class="d-flex p-1 mb-3 text-black">Cook: <nav class="float-end ms-lg-auto">{{ officer.tres }}</nav>  </h2>
              <h2 class="d-flex p-1 mb-3 text-black">Sniper: <nav class="float-end ms-lg-auto">{{ officer.pio }}</nav>  </h2>
              <h2 class="d-flex p-1 mb-3 text-black">Helms Man: <nav class="float-end ms-lg-auto">{{ officer.muse }}</nav>  </h2>
              <h2 class="d-flex p-1 mb-3 text-black">Ship Wright: <nav class="float-end ms-lg-auto">{{ officer.prince }}</nav>  </h2>
              
            </div>


           
          </div>
          <div class="buttons float-end">
            <RouterLink :to="{ name: 'editOfficer', params: { id: officer.id }}" class="text-secondary" id="edit"> 
                        <button class="btn btn-success"><i class="fa fa-edit"></i> Edit</button>
                      </RouterLink> 
                        <button class="btn btn-danger m-2 edit-button" data-bs-toggle="modal" data-bs-target="#exampleModal"> <i class="fa fa-remove"></i> Delete Crew</button> 
           
          </div>
         
        </div>
       
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="exampleModalLabel">Delete Crews</h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <h1>Are you sure you want to delete this current Crews?</h1>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-warning" data-bs-dismiss="modal"> <i class="fa fa-cancel"></i> Cancel</button>
                      <button @click="removeOfficer(officer.id)" class="btn btn-danger m-2" data-bs-dismiss="modal"> <i class="fa fa-remove"></i> Yes</button>
                    </div>
                  </div>
                </div>
              </div> 
  
              
      </div>
  
  
      
  
      </div>
   
    </div>
  
  </template>
  <script setup>
  import {ref, onMounted} from 'vue'
  import {db} from '../firebase/index.js'
  import {addDoc, collection, onSnapshot,deleteDoc, doc, updateDoc} from "firebase/firestore";
  import { RouterLink, RouterView } from 'vue-router'
  import { useRouter } from 'vue-router'
  
  
  var showForm = ref(false);
  onMounted(async()=>{
    const q = (collection(db,"crews"));
  
    onSnapshot(q,(querySnapshot)=> {
  
  
      const officersTmp = []
  
  
    querySnapshot.forEach((doc) => {
  
      const officer = {
        id: doc.id,
        pres: doc.data().pres,
        vice: doc.data().vice,
        sec: doc.data().sec,
        tres: doc.data().tres,
        pio: doc.data().pio,
        muse: doc.data().muse,
        prince: doc.data().prince,
        completed: doc.data().completed
      }
  
      officersTmp.push(officer)
    });
    officers.value = officersTmp
    })
  })
  
  const newPresInput = ref('Monke D. Luffy')
  const newViceInput = ref('Roronoa Zoro')
  const newSecInput = ref('Nami Cat bulgar')
  const newTresInput = ref('Vinsmoke Sanji')
  const newPioInput = ref('Soge Kng')
  const newMuseInput = ref('Jimbie')
  const newPrinceInput = ref('Frank Shogun')
  
  const officers = ref([])
  const id = ref(1)
  
  
  
  
  const addOfficer = async () => {
    if (newPresInput.value != '' && newViceInput.value != '' && newSecInput.value != '' && newTresInput.value != '' && newPioInput.value != '' && newMuseInput.value != '' && newPrinceInput.value !=''){
      
      await addDoc(collection(db,"crews"),{
        pres: newPresInput.value,
        vice: newViceInput.value,
        sec: newSecInput.value,
        tres: newTresInput.value,
        pio: newPioInput.value,
        muse: newMuseInput.value,
        prince: newPrinceInput.value,
        completed: false
      })
      showForm = ref(false);
      newPresInput.value = ''  
      newViceInput.value = ''  
      newSecInput.value = ''  
      newTresInput.value = ''  
      newPioInput.value = ''  
      newMuseInput.value = ''  
      newPrinceInput.value = ''  
     
    }
  }
  
  
  
  const removeOfficer = (id) => {
    deleteDoc(doc(db,"crews",id));
  }
  
  
  
  
  </script>
  
  <style>
  .content{
    width: 1000px;
  }
  .body{
    display: inline-block;
    place-items: center;
  }
  .line-through{
    text-decoration: line-through;
  }
  </style> 