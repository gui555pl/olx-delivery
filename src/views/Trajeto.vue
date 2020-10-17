<template lang='pug'>
    div
        v-card(style="" flat)
            v-col(cols="12" style="")
                v-row(style="justify:space-around;")
                    v-col
                        h4 Destino 
                    v-col 
                        h4(style="text-align:end; ") Horário de ida
                v-row
                    v-col(cols='6')
                        vue-google-autocomplete#map(style=""
                            placeholder="Informe um endereço...",
                            v-on:placechanged="IDA"
                        ) 
                    input#appt(type='time' name='appt' min='09:00' max='18:00' v-model="horarioIda" style="margin-left:5%;text-align:end;" required='')

            v-col(cols="12")
                v-row(style="justify:space-around;")
                    v-col
                        h4 Origem 
                    v-col 
                        h4(style="text-align:end; ") Horário de volta
                v-row
                    v-col(cols='6')
                        vue-google-autocomplete#map2(style=""
                        placeholder="Informe um endereço...",
                        v-on:placechanged="VOLTA"
                        ) 
                    input#appt(type='time' name='appt' min='09:00' max='18:00' v-model="horarioVolta" style="margin-left:5%; text-align:end;" required='')
        v-row#confirm-section(justify="center" align="end" style="margin-top:10%;" no-gutters)
            v-col(cols='8' )
                v-btn(color='#ffa500' dark large block depressed rounded style='text-transform: none !important ' @click="programar()") Programar</template>

<script>
import BaseLayoutVue from "../components/BaseLayout.vue";
import firebase from "firebase";
import VueGoogleAutocomplete from "vue-google-autocomplete";
export default {
  fiery: true,
  data() {
    return {
      texto: "Programe um trajeto diário",
      icone: "mdi-map-search",
      field1: "",
      address: "",
      ida: "",
      volta: "",
      horarioIda:"",
      horarioVolta:"",
      users: this.$fiery(firebase.firestore().collection("users")),
      userLogged: this.$fiery(firebase.firestore().collection("users").where("email","==",this.$store.getters.user.email))
    };
  },
  components: {
    BaseLayoutVue: BaseLayoutVue,
    VueGoogleAutocomplete,
  },
  computed: {},
  created(){
    console.log(this.$store.getters.user.email)
  },
  methods: {
    IDA(addressData, placeResultData, id) {
      this.ida = addressData;
      console.log(this.ida);
    },
    VOLTA(addressData2, placeResultData, id) {
      this.volta = addressData2;
      console.log(this.volta);
    },
    programar(){
        let id = this.userLogged[0][".uid"].split("/")[4];
        console.log('id',id);
        this.$fires.users.doc(id).update({
            enderecoIda:{
                paisIda: this.ida.country || "Não disponível",
                idaLatitude: this.ida.latitude || "Não disponível",
                idaLocality: this.ida.locality  || "Não disponível",
                idaLongitude: this.ida.longitude || "Não disponível"},

            enderecoVolta:{
                paisVolta: this.volta.country || "Não disponível",
                voltaLatitude: this.volta.latitude || "Não disponível",
                voltaLocality: this.volta.locality || "Não disponível",
                voltaLongitude: this.volta.longitude || "Não disponível",
            },
            horarioIda: this.horarioIda,
            horarioVolta:this.horarioVolta
        })

    }
  },
};
</script>

<style>
</style>