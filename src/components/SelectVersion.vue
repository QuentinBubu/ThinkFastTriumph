<template>
  <form action="">
    <select name="version" id="version" v-model="selectedVersion" @change="onVersionSelect">
      <option v-for="v in versions" :key="v">{{ v }}</option>
    </select>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      versions: [],
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
    onVersionSelect(event: Event) {
      const target = event.target as HTMLSelectElement;
      this.selectedVersion = target.value;
      this.$router.push({ name: 'play', params: { version: this.selectedVersion } });
    }
  }
});
</script>