<template>
    <form>
      <fieldset>
        <legend>Champions</legend>
        <input type="checkbox" id="random-champ" name="random-champ">
        <label for="random-champ">Vous devez jouer un champion aléatoire</label>
        <br>
        <input type="checkbox" id="lvl-champ" name="lvl-champ">
        <label for="lvl-champ">Ce champion doit être d'un certain nombre d'étoile</label>
        <br>
        <fieldset>
          <legend>Probabilités</legend>
          <div v-for="(probs, num) in probabilities" :key="num">
          <label>{{ num }}:</label>
          <input type="number" v-model="probabilities[num][0]">
          <input type="number" v-model="probabilities[num][1]">
          <input type="number" v-model="probabilities[num][2]">
        </div>
        </fieldset>
      </fieldset>
  
      <button @click="getRandom" type="button">Voir mon sort</button>
    </form>
  </template>
  
<script lang="ts">
  import { cp } from 'fs';
import { defineComponent, toRaw } from 'vue';
  
  export default defineComponent({
    props: {
      version: String,
      set: String
    },
    data() {
      return {
        champions: {},
        inputNumber: 1,
        probabilities: {
          1: [0.1, 0.2, 0.7],
          2: [0.2, 0.4, 0.4],
          3: [0.3, 0.4, 0.3],
          4: [0.4, 0.3, 0.3],
          5: [0.5, 0.3, 0.2]
        },
        result: 0
      }
    },
    methods: {
      getRandom() {
        fetch(`https://ddragon.leagueoflegends.com/cdn/${this.version}/data/en_US/tft-champion.json`)
          .then(res => res.json())
          .then(champs => champs.data)
          .then((champs) => {
            Object.keys(champs).filter((champ: any) => {
              if (champ.startsWith(this.set)) {
                Object.assign(this.champions, {
                  [champ]: {
                    id: champs[champ].id,
                    name: champs[champ].name,
                    tier: champs[champ].tier,
                    image: champs[champ].image
                  }
                })
              }
            })
          })
          .then(() => {
            let selected = this.selectChamp()
            console.log(selected)
            console.log(this.generateRandomNumber(selected.tier))
          })
      },
      selectChamp() {
        const K = Object.keys(this.champions)
        return toRaw(this.champions)[K[Math.floor(Math.random() * K.length)]]
      },
      generateRandomNumber(number:number) {
        const randValue = Math.random();
        if (randValue < this.probabilities[number][0])
          return 1;
        else if (randValue < this.probabilities[number][0] + this.probabilities[number][1])
          return 2;
        return 3;
      }
    }
  });
</script>
