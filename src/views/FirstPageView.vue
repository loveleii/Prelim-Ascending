<template>
  <div class="body">
    <div class="d-inline-flex m-1">


      <RouterLink to="/second" class="btn btn-success m-1 p-3 rounded-4" >Pirate Crews &nbsp; <i class=" fa fa-arrow-right"></i> </RouterLink>

    </div>
   
    <div class="content mt-5">
    

      
      <h1 class="bg-info p-3 text-center rounded-3 text-white">List of Student</h1>
   
      <div class="input-group mb-5 shadow-lg">
      <input v-model="newNameInput" type="text" name="" id="" class="form-control p-2" placeholder="Enter Name">

   
      <select v-model="newYearInput" name="" id="" class="form-select">
        <option value="BSIT - 1">BSIT - 1</option>
        <option value="BSIT - 2">BSIT - 2</option>
        <option value="BSIT - 3">BSIT - 3</option>
        <option value="BSIT - 4">BSIT - 4</option>
      </select>


      <select v-model="newAttendanceInput" name="" id="" class="form-select" typeof="text">
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        
      </select>

      <button @click="addAttendance()" class="btn btn-success m-2 rounded-2"><i class="fa fa-person"></i> Add</button>
    </div>
 
 
    <div v-for="attendance in attendances" :key="attendance.attendances" class="text-center">
      <div class="card-body">
        <div class="row">
          <table class="table table-bordered mt-5">
            <thead>
              <tr class="bg-info text-white">
                <th>
                 Full Name
                </th>
                <th>
                 Year
                </th>
                <th>
                 Gender
                </th>
                <th>
                 Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {{ attendance.name }}
                </td>
                <td>
                  {{ attendance.year }} 
                </td>
                <td>
                  {{ attendance.attendance }} 
                </td>
                <td>
                 
                 

                    <button @click="editButton(attendance.id)" data-bs-toggle="modal" data-bs-target="#editModal" class="btn btn-success"> <i class="fa fa-edit"></i> Edit</button>
                    <button class="btn btn-danger m-2 edit-button" data-bs-toggle="modal" data-bs-target="#exampleModal"> <i class="fa fa-remove"></i> Delete</button> 
          


                </td>
              </tr>
            </tbody>
            
          </table>
         
        </div>
        
      </div>
     
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Delete Student</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <h1>Are you sure you want to delete this student?</h1>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-warning" data-bs-dismiss="modal"> <i class="fa fa-cancel"></i> Cancel</button>
                    <button @click="removeAttendance(attendance.id)" class="btn btn-danger m-2" data-bs-dismiss="modal"> <i class="fa fa-remove"></i> Yes</button>
                  </div>
                </div>
              </div>
            </div> 


            <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="editModalLabel">Delete Student</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <form>
                        <div class="mb-3">
                        <label for="name" class="col-form-label">Name: </label>
                        <input v-model="editNameInput" type="text" name="" id="" class="form-control p-2" placeholder="name">
                        </div>


                        <div class="mb-3">
                        <label for="year" class="col-form-label">Year: </label>
                        <select v-model="editYearInput" name="" id="year" class="form-select">
                        <option value="BSIT - 1">BSIT - 1</option>
                        <option value="BSIT - 2">BSIT - 2</option>
                        <option value="BSIT - 3">BSIT - 3</option>
                        <option value="BSIT - 4">BSIT - 4</option>
                        </select>
                        </div>

                        <div class="mb-3">
                        <label for="attendance" class="col-form-label">Gender: </label>
                        <select v-model="editAttendanceInput" name="" id="attendance" class="form-select" typeof="text">
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        
                        </select>
                    </div>
                  
                    </form>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-warning" data-bs-dismiss="modal"> <i class="fa fa-cancel"></i> Cancel</button>
                    <button @click="update()" class="btn btn-primary m-2" data-bs-dismiss="modal"> <i class="fa fa-edit"></i> Save Changes</button>
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
import {addDoc, collection, onSnapshot,deleteDoc, doc, updateDoc, getDoc, query, orderBy} from "firebase/firestore";
import { RouterLink, RouterView } from 'vue-router'
import { useRouter } from 'vue-router'

const q = (collection(db, "student"));
const queryStudent = (query(q, orderBy('name', 'asc')))

onMounted(async()=>{
 
  onSnapshot(queryStudent,(snapshot)=> {
    const attendancesTmp = []
  snapshot.forEach((doc) => {
    const attendance = {
      id: doc.id,
      name: doc.data().name,
      year: doc.data().year,
      attendance: doc.data().attendance,
      completed: doc.data().completed
    }
    attendancesTmp.push(attendance)
  });
  attendances.value = attendancesTmp
  })
})
const editNameInput = ref('')
const editYearInput = ref('BSIT - 1')
const editAttendanceInput = ref('Present')
const attendanceID = getAttendanceID.id
var getId = ''
const editButton = async (id) => {
  getId = id
  const docRef = doc(db, "student", id)
  const docSnap = await getDoc(docRef)
  editNameInput.value = docSnap.data().name
  editYearInput.value = docSnap.data().year
  editAttendanceInput.value = docSnap.data().attendance
}
const update = () => {
  const id = getId
  console.log(id)
    updateDoc(doc(db, 'student', id), {
        name: editNameInput.value,
        year: editYearInput.value,
        attendance: editAttendanceInput.value
    })
}
const getAttendanceID = defineProps(['id'])
onMounted(async()=>{
    let attendanceID = getAttendanceID.id
    let docRef = doc(db, "student", attendanceID)
    let docSnap = await getDoc(docRef)
    editNameInput.value = docSnap.data().name
    editYearInput.value = docSnap.data().year
    editAttendanceInput.value = docSnap.data().attendance
})
const updateAttend = () => {
    
    updateDoc(doc(db, 'student', attendanceID), {
        name: newNameInput.value,
        year: newYearInput.value,
        attendance: newAttendanceInput.value,    
    })
    router.go(-1)
}
const newNameInput = ref('')
const newYearInput = ref('BSIT - 1')
const newAttendanceInput = ref('Present')
const attendances = ref([])
const id = ref(1)
const addAttendance = async () => {
  if (newNameInput.value != '' && newYearInput.value != '' && newAttendanceInput.value != ''){
    await addDoc(collection(db, "student"),{
      name:newNameInput.value,
      year: newYearInput.value,
      attendance: newAttendanceInput.value,
      Date: Date.now(),
      completed: false
    })
    newNameInput.value = ''  
    newYearInput.value = 'BSIT - 1'  
    newAttendanceInput.value = 'Present'
  }
}
const removeAttendance = (id) => {
  deleteDoc(doc(db, "student",id));
}
</script>

<style>
.content{
  width: 1200px;
}
.body{
  display: inline-block;
  place-items: center;
  
}
.line-through{
  text-decoration: line-through;
}
</style> 