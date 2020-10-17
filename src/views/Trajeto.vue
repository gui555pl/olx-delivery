<template lang='pug'>
    div
        BaseLayoutVue(:text="texto", :icon="icone")
        v-card(style="margin-top:20%;" flat)
            v-col(cols="12" style="margin-top:10%; ")
                v-row(style="justify:space-around;")
                    v-col
                        h4 Informe o destino 
                    v-col 
                        h4(style="text-align:end; ") Horário de ida
                v-row
                    vue-google-autocomplete#map(style="margin-left:10px;"
                        placeholder="Informe um endereço...",
                        v-on:placechanged="IDA"
                    ) 
                    input#appt(type='time' name='appt' min='09:00' max='18:00' v-model="horarioIda" style="margin-left:15%;text-align:end;" required='')

            v-col(cols="12")
                v-row(style="justify:space-around;")
                    v-col
                        h4 Informe a origem 
                    v-col 
                        h4(style="text-align:end; ") Horário de volta
                v-row
                    vue-google-autocomplete#map2(style="margin-left:10px;"
                    placeholder="Informe um endereço...",
                    v-on:placechanged="VOLTA"
                    ) 
                    input#appt(type='time' name='appt' min='09:00' max='18:00' v-model="horarioVolta" style="margin-left:15%; text-align:end;" required='')
        v-row#confirm-section(justify="center" style="margin-top:40%;")
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
      endereço: this.$fiery(firebase.firestore().collection("endereço").doc(this.$route.params.id))
    };
  },
  components: {
    BaseLayoutVue: BaseLayoutVue,
    VueGoogleAutocomplete,
  },
  computed: {},
  methods: {
    IDA(addressData, placeResultData, id) {
      this.ida = addressData;
      console.log(this.ida);
    },
    VOLTA(addressData2, placeResultData, id) {
      this.volta = addressData2;
      console.log(this.volta);
    },
    adicionarEndereço(){
        this.$fires.endereço.add({
            endereçoIda: this.ida,
            horarioIda: this.horarioIda,
            endereçoVolta:this.volta,
            horarioVolta:this.horarioVolta
        })

    }
  },
};
</script>

<style>
</style>