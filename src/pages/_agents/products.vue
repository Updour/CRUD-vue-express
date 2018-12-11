<template>
   <div id="pageTable">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <v-form ref="form" v-model="valid">
            <v-text-field
            v-model ="models.kode_barang"
            prepend-icon="fa-user"
            label= "Kode Barang"
            ></v-text-field>
            <v-text-field
            v-model ="models.nama_barang"
            prepend-icon="fa-user"
            label= "Nama Barang"
            ></v-text-field>
            <v-btn color="success"
              @click="dataInserts" >inserts
            </v-btn>
            <v-btn color="primary" 
              @click="dataEdit(models.id_barang)">Update
            </v-btn>
          </v-form>
        </v-flex>
        <v-flex lg12>
          <v-card class="elevation-14">            
           <v-toolbar card color="grey lighten-3">
               <v-card-title>
             <h3> Data Barang </h3>
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
                <td >
                 {{ props.item.id_barang }}
                </td>
                <td >
                  {{ props.item.kode_barang }}
                  
                </td>
                <td >
                  {{ props.item.nama_barang }}
                </td>
                <td class="justify-center layout px-0">
                  <v-btn fab  small color="primary" dark
                   @click="dataUpdates(props.item.id_barang)"

                   >
                    <v-icon>fa-pencil</v-icon>
                  </v-btn>
                      
                  <v-btn fab dark small color="error"
                  @click="dataDeleted(props.item.id_barang)"
                  >
                    <v-icon dark>fa-trash</v-icon>
                  </v-btn>
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
import isLoadings from '@/components/_tableAgents/dataLoadings'
import axios from 'axios'

export default { 
  components: {
    isLoadings,
  },
 
  mounted () {
   this.dataGets()
  },
  methods: {
    // get data
    dataGets() {
      let url = 'http://aseton.herokuapp.com/api/barang'
      axios.get(url).then(res => 
        this.users = res.data
      )
    },
    // insert data
    dataInserts() {
      let url = 'http://aseton.herokuapp.com/api/barang'
      axios.post(url, {
        kode_barang: this.models.kode_barang,
        nama_barang: this.models.nama_barang
      }).then((res) => {
        console.log(res.data),
        this.dataGets(res.data)
      })
    
    },
   // update data
     dataUpdates(id) {
      let url = 'http://aseton.herokuapp.com/api/barang/' + id
      axios.get(url).then(r=> r.data).then((data) => {
      this.models.id_barang = data.id_barang
      this.models.kode_barang = data.kode_barang
      this.models.nama_barang = data.nama_barang
      console.log('data', data),
      this.dataGets(res.data)
      }).catch(err => 
        console.log('err', err)
      )
     
    },
    dataEdit (id) {
      this.edit = true
      let url = 'http://aseton.herokuapp.com/api/barang/' + id
      axios.put(url, {
        id_barang: this.models.id_barang,
        kode_barang: this.models.kode_barang,
        nama_barang: this.models.nama_barang
      }).then((res) => {
        console.log(res.data),
        this.dataGets(res.data)
      })
     
    },
    // delete data
    dataDeleted(id) {
      let url = 'http://aseton.herokuapp.com/api/barang/' + id
      axios.delete(url).then(res => 
        this.dataGets(res.data)
      )
    }

  },
  data () {
    return {
      models: {
        id_barang : '',
        kode_barang :'',
        nama_barang :''
      },
      users: [],
      success: false,
      edit: false,
      valid: true,
     
      search: '',
     
      // snackbars
       
      //data Tables
      complex: {
        headers: [
        {
          text: 'NO.', 
          sortable: true,
          value: 'id_barang'
        },
        {
          text: 'Kode Barang', 
          sortable: true,
          value: 'kode_barang'
        },
        {
          text: 'Nama Barang', 
          sortable: true,
          value: 'nama_barang'
        },
        {
          text: 'Actions', 
         
        }
        ],
      },
    }
  },
};
</script>