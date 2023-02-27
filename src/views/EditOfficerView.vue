<style>
.container{
    justify-content: center;
    display: grid;
}
.content{
    width: 1000px;
}
</style>
<template>
    <div class="container">
        <div class="content">
            <div class="card mt-5">
                <div class="card-header bg-secondary shadow-lg">
                    <h1 class="text-white">Edit Crew</h1>
                </div>

                <div class="card-body">
                    <div>
                      
                    <div class="input-group mb-2 shadow-lg">
                        <label for="" class=""><h4 class="mt-3 m-2">Captain:</h4></label>
                        <input v-model="newPresInput" type="text" name="" id="" class="form-control p-2 m-3" placeholder="Name" required>
                        
                        </div>

                        <div class="input-group mb-2 shadow-lg">
                        <label for="" class=""><h4 class="mt-3 m-2">Vice Captain:</h4></label>
                        <input v-model="newViceInput" type="text" name="" id="" class="form-control p-2 m-3" placeholder="Name">
                        
                        </div>

                        <div class="input-group mb-2 shadow-lg">
                        <label for="" class=""><h4 class="mt-3 m-2">Navigator:</h4></label>
                        <input v-model="newSecInput" type="text" name="" id="" class="form-control p-2 m-3" placeholder="Name">
                        
                        </div>

                        <div class="input-group mb-2 shadow-lg">
                        <label for="" class=""><h4 class="mt-3 m-2">Cook:</h4></label>
                        <input v-model="newTresInput" type="text" name="" id="" class="form-control p-2 m-3" placeholder="Name">
                        
                        </div>

                        <div class="input-group mb-2 shadow-lg">
                        <label for="" class=""><h4 class="mt-3 m-2">Sniper:</h4></label>
                        <input v-model="newPioInput" type="text" name="" id="" class="form-control p-2 m-3" placeholder="Name">
                        
                        </div>

                        <div class="input-group mb-2 shadow-lg">
                        <label for="" class=""><h4 class="mt-3 m-2">Helms Man:</h4></label>
                        <input v-model="newMuseInput" type="text" name="" id="" class="form-control p-2 m-3" placeholder="Name">
                        
                        </div>

                        <div class="input-group mb-2 shadow-lg">
                        <label for="" class=""><h4 class="mt-3 m-2">Ship Wright:</h4></label>
                        <input v-model="newPrinceInput" type="text" name="" id="" class="form-control p-2 m-3" placeholder="Name">
                        
                        </div>
                        

          </div>
                </div>
                <div class="card-footer">
                    <button @click="back" class="btn btn-secondary me-2"> <i class="fa fa-arrow-left"></i> Back</button>
                    <button type="button" class="btn btn-primary" @click="updateOffice()"> <i class="fa fa-save"></i> Save changes</button>

                </div>
            </div>
        </div>
       
    </div>
</template>




<script setup>
import { ref, onMounted, watch } from 'vue'
import { db } from '../firebase/index.js'
import { doc, getDoc, updateDoc, deleteDoc  } from 'firebase/firestore'
import { RouterLink, RouterView } from 'vue-router'
import { useRouter } from 'vue-router'
const router = useRouter()
const getOfficerID = defineProps(['id'])
onMounted(async()=>{
    let officerID = getOfficerID.id
    let docRef = doc(db, "crews", officerID)
    let docSnap = await getDoc(docRef)
    newPresInput.value = docSnap.data().pres
    newViceInput.value = docSnap.data().vice
    newSecInput.value = docSnap.data().sec
    newTresInput.value = docSnap.data().tres
    newPioInput.value = docSnap.data().pio
    newMuseInput.value = docSnap.data().muse
    newPrinceInput.value = docSnap.data().prince
})
const newPresInput = ref('')
const newViceInput = ref('')
const newSecInput = ref('')
const newTresInput = ref('')
const newPioInput = ref('')
const newMuseInput = ref('')
const newPrinceInput = ref('')
const officerID = getOfficerID.id
const updateOffice = () => {
    
    updateDoc(doc(db, 'crews', officerID), {
        pres: newPresInput.value,
        vice: newViceInput.value,
        sec: newSecInput.value,
        tres: newTresInput.value,
        pio: newPioInput.value,
        muse: newPresInput.value,
        prince: newPrinceInput.value,
    })
    router.go(-1)
}
const back = () => {
    router.go(-1)
}
</script>