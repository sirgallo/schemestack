<template>
  <div>
    <div v-if="block === 'saved'" class="container">
      <b-jumbotron>
        <div class="row">
          <div class="col-sm-10">
            <h4>Current Saved Queries</h4>
            <h6>Select a Query to Run</h6>
            <hr>
            <br>
            <div v-if="queries.length > 0">
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
                      <td>{{query.query_alias}}</td>
                      <td>{{query.query_sql}}</td>
                    </v-tr>
                  </tbody>
                </v-table>
                <ul class="list-unstyled">
                  <li v-for="query in selectedQuery" :key="query.id">
                    <b-button @click="onRun" variant="success" class="mr-3">Run</b-button>
                    <b-button @click="onDelete" variant="warning">Delete?</b-button>
                  </li>
                </ul>
              </b-card>
            </div>
            <div v-else>
              <b-alert show variant="warning">No Queries Saved...Build a Query in Analyze!</b-alert>
            </div>
          </div>
        </div>
      </b-jumbotron>
    </div>
    <div v-else-if="block === 'results'" class="container">
      <div v-if="restab === ''">
        <b-alert show variant="info">Waiting for Results...Please Hold...</b-alert>
        <br>
        <b-button @click="onBack" variant="warning" class="mr-2">Back</b-button>
      </div>
      <div v-else-if="restab !== '' && queryfailure === 'success'">
        <b-card>
          <h4>Results for "{{selectedQuery[0].query_sql}}"</h4>
          <hr>
          <b-button @click="onBack" variant="warning" class="mr-2">Back</b-button>
          <hr>
          <div v-html="restab"></div>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Query',
  data() {
    return {
      block: '',
      queries: [],
      presto: [],
      selectedQuery: [],
      queryfailure: '',
      restab: '',
      user: [],
      userid: '',
    };
  },
  mounted() {
    this.currentHostname = window.location.hostname;
    if (localStorage.user) {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.userid = this.user.id;
      this.reInit();
    }
  },
  methods: {
    reInit() {
      this.selectedQuery = '';
      this.initData();
      this.getQueries();
    },
    initData() {
      this.block = 'saved';
      this.restab = '';
      this.queryfailure = '';
    },
    getQueries() {
      const userid = {
        userid: this.userid,
      };
      const config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };
      const path = `http://${this.currentHostname}:8087/queries`;
      axios.post(path, userid, config)
        .then((res) => {
          this.queries = res.data.queries;
        })
        .catch((err) => {
          throw err;
        });
    },
    onRun(evt) {
      evt.preventDefault();
      this.block = 'results';
      const inst = {
        userid: this.userid,
        prestoid: this.selectedQuery[0].presto_id,
      };
      const configinst = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };
      const pathinst = `http://${this.currentHostname}:8087/prestos/presto`;
      axios.post(pathinst, inst, configinst)
        .then((resinst) => {
          const query = {
            presto: resinst.data.presto[0],
            query: this.selectedQuery[0].query_sql,
          };
          const config = {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          };
          const path = `http://${this.currentHostname}:8086/query`;
          axios.post(path, query, config)
            .then((res) => {
              this.queryfailure = res.data.message;
              this.restab = res.data.table;
            })
            .catch((err) => {
              throw err;
            });
        })
        .catch((err) => {
          throw err;
        });
    },
    onDelete(evt) {
      evt.preventDefault();
      const curquery = {
        queryid: this.selectedQuery[0].id,
      };
      const config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };
      const path = `http://${this.currentHostname}:8087/queries/delete`;
      axios.post(path, curquery, config)
        .then(() => {
          this.reInit();
        })
        .catch((err) => {
          throw err;
        });
    },
    onBack(evt) {
      evt.preventDefault();
      this.reInit();
    },
  },
};
</script>
