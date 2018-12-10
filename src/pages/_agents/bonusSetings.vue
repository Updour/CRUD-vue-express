<template>
   <div id="pageTable">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <v-form ref="form" v-model="valid">
            <v-text-field
            v-model ="models.agenid"
            prepend-icon="fa-user"
            label= "ID Agen"
            ></v-text-field>
            <v-text-field
            v-model ="models.name"
            prepend-icon="fa-user"
            label= "Name User"
            ></v-text-field>
            <v-text-field
            v-model ="models.nohp"
            prepend-icon="fa-user"
            label= "No. Handphone User"
            ></v-text-field>
            <v-text-field
            v-model ="models.pin"
            prepend-icon="fa-user"
            label= "Pin User"
            ></v-text-field>
            <v-text-field
            v-model ="models.address"
            prepend-icon="fa-user"
            label= "Address User"
            ></v-text-field>
            <v-text-field
            v-model ="models.hrg_khs"
            prepend-icon="fa-user"
            label= "Harga Khusus"
            ></v-text-field>
            <v-btn color="success" 
            @click="dataInserts">inserts</v-btn>
            <v-btn color="success" @click="dataEdit(models._id)">Update</v-btn>
          </v-form>
        </v-flex>
        <v-flex lg12>
          <v-card class="elevation-14">            
           <v-toolbar card color="grey lighten-3">
               <v-card-title>
             <h3> Data Tiket </h3>
            </v-card-title>
            </v-toolbar>
              <v-card-title>
                <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
                ></v-text-field>
              </v-card-title>
              <v-data-table
              :headers="complex.headers"
              :items="users"
              :search="search"
              class="elevation-1"
              >
              <template slot="items" slot-scope="props">   
                <td class="text-md-left">
                 {{ props.item.agenid }}
                </td>
                <td class="text-md-left">
                  {{ props.item.name }}
                  
                </td>
                <td class="text-md-left">
                  {{ props.item.nohp }}
                </td>
                <td class="text-md-left">
                  {{ props.item.pin }}
                </td>
                <td class="text-md-left">
                  {{ props.item.address }}
                  
                </td>
                <td class="text-md-left">
                  {{ props.item.hrg_khs }}
                </td>
                <td class="text-md-left">
                  <v-btn color="success" @click="dataUpdates(props.item._id)"> edit</v-btn>
                </td>
                <td class="text-md-left">
                  <v-btn color="error" @click="dataDeleted(props.item._id)">delete</v-btn>
               </td>
              </template>
              <template slot="no-data">
               <isLoadings></isLoadings>
             </template>
            </v-data-table> 
          </v-card>
        </v-flex> 
      </v-layout>
    </v-container>
  </div> 
</template>

<script>
import { mapState, mapActions } from 'vuex'
import isLoadings from '@/components/_tableAgents/dataLoadings'
import axios from 'axios'

export default { 
  components: {
    isLoadings,
  },
  created() {
  },
  mounted () {
   this.dataGets()
  },
  computed: {

  },
  methods: {
    // get data
    dataGets() {
      let url = 'http://localhost:5000/user'
      axios.get(url).then(res => 
        this.users = res.data,
        // console.log(this.users)
      )
    },
    // insert data
    dataInserts() {
      let url = 'http://localhost:5000/user'
      axios.post(url, {
        agenid: this.models.agenid,
        name: this.models.name,
        nohp: this.models.nohp,
        pin: this.models.pin,
        address: this.models.address,
        hrg_khs: this.models.hrg_khs
      }).then((res) => {
        this.dataGets(res.data)
        console.log(res.data)
      })
        
        // console.log(res)
     
    },
   // update data
     dataUpdates(id) {
      let url = 'http://localhost:5000/user/' + id
      axios.get(url).then(r=> r.data).then((data) => {
        this.models._id = data.user._id
      this.models.agenid = data.user.agenid
      this.models.name = data.user.name
      this.models.nohp = data.user.nohp
      this.models.pin = data.user.pin
      this.models.address = data.user.address
      this.models.hrg_khs = data.user.hrg_khs
      console.log('data', data.user)
      }).catch(err => 
        console.log('err', err)
      )
     
    },
    dataEdit (id) {
      let url = 'http://localhost:5000/user/' + id
      axios.put(url, {
        agenid: this.models.agenid,
        name: this.models.name,
        nohp: this.models.nohp,
        pin: this.models.pin,
        address: this.models.address,
        hrg_khs: this.models.hrg_khs
      }).then((res) => {
        this.dataGets(res.data)
        console.log(res.data)
      })
     
    },

    // delete data
    dataDeleted(id) {
      let url = 'http://localhost:5000/user/' + id
      axios.delete(url).then(res => 
        // console.log(res.data),
        this.dataGets(res.data)
      )
    }

  },
  data () {
    return {
      models: {
        _id : '',
        agenid :'',
        name :'',
        nohp :'',
        pin :'',
        address :'',
        hrg_khs :''
      },
      users: [],
      success: false,
      edit: false,
      valid: true,
      loading : false,
      dialog : false,
      search: '',
      name: '',
      rulesNominals: [
      v => !!v || 'Pastikan anda mengisi data dengan benar!',
      ],
      // snackbars
       
      //data Tables
      complex: {
        headers: [
        {
          text: 'agenid', 
          sortable: true,
          value: 'agenid'
        },
        {
          text: 'name', 
          sortable: true,
          value: 'name'
        },
        {
          text: 'Jnohp', 
          sortable: true,
          value: 'nohp'
        },
        {
          text: 'pin', 
          sortable: true,
          value: 'pin'
        },
        {
          text: 'address', 
          sortable: true,
          value: 'address'
        },
        {
          text: 'hrg_khs', 
          sortable: true,
          value: 'hrg_khs'
        },
        {
          text: 'Aksi'
        }
        ],
      },
    }
  },
};
</script>