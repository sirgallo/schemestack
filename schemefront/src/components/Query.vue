<template>
  <div>
    <div v-if="prestos.length > 0">
              <b-card>
              <v-table class="table table-hover"
                        :data="queries"
                        selectionMode="single"
                        selectedClass="table-info"
                        @selectionChanged="selectedQuery = $event">
                <thead slot="head">
                  <th scope="col">Alias</th>
                  <th scope="col">Query</th>
                </thead>
                <tbody slot="body" slot-scope="{displayData}">
                  <v-tr v-for="query in displayData"
                        :key="query.id"
                        :row="query">
                    <td>{{query.alias}}</td>
                    <td>{{query.query}}</td>
                  </v-tr>
                </tbody>
              </v-table>
              <ul class="list-unstyled">
                <li v-for="query in selectedQuery" :key="query.id">
                  <b-button @click="onRun" variant="success">Run</b-button>
                  <b-button @click="onDelete" variant="warning">Delete?</b-button>
                </li>
              </ul>
              </b-card>
            </div>
  </div>
</template>

<script>
export default {
  name: 'Query',
  data() {
    return {
      queries: [],
      selectedQuery: '',
    };
  },
};
</script>
