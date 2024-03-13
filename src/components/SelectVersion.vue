<template>
  <form action="">
    <fieldset>
      <legend>Choisissez le patch</legend>
      <select name="version" id="version" v-model="selectedVersion">
        <option v-for="v in versions" :key="v">{{ v }}</option>
      </select>
    </fieldset>
    <fieldset>
      <legend>Sélectionnez votre set</legend>
      <select name="set" id="set" v-model="selectedSet">
        <option value="TFT11" disabled>TFT set 11</option>
        <option value="TFT10" selected>TFT set 10</option>
        <option value="TFT3">TFT set 3</option>
        <option value="TFTTutorial">TFT Tutorial</option>
      </select>
    </fieldset>
    <button @click="onVersionSelect">Démarrer</button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      versions: [],
      selectedSet: '',
      selectedVersion: ''
    };
  },
  mounted() {
    fetch('https://ddragon.leagueoflegends.com/api/versions.json')
      .then(response => response.json())
      .then(data => {
        this.versions = data;
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des versions :', error);
      });
  },
  methods: {
    onVersionSelect() {
      this.$router.push({ name: 'play', params: { version: this.selectedVersion, set: this.selectedSet } });
    }
  }
});
</script>