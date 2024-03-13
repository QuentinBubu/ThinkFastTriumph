<template>
  <div>
    <h2>Sélectionnez les contraintes :</h2>
    <Constraints :version="selectedVersion" :set="selectedSet" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Constraints from '../components/Constraints.vue';

export default defineComponent({
  components: {
    Constraints
  },
  data() {
    return {
      selectedVersion: '',
      selectedSet: ''
    }
  },
  mounted() {
    this.selectedVersion = this.$route.params.version.toString()
    this.selectedSet = this.$route.params.set.toString()
  }
});
</script>
