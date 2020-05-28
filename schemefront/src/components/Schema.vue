<template>
  <div>
    <div v-if="block === 'prestos'" class="container">
      <b-jumbotron>
        <div class="row">
          <div class="col-sm-10">
            <h4>Instances of Your Data</h4>
            <h6>Select An Instance to Begin</h6>
            <hr>
            <b-button variant="info"
                      v-b-modal.presto-modal>Connect
            </b-button>
            <b-modal ref="PrestoCredsForm"
                    id="presto-modal"
                    title="Connect Using Existing Presto Cluster Credentials"
                    hide-footer>
              <b-form @submit="onSubmit" @reset="onReset" class="w-100">
              <b-form-group id="form-alias-group"
                            label="Enter an Alias for your Source:"
                            label-for="form-alias-input">
                <b-form-input id="form-host-input"
                              type="text"
                              v-model="addPrestoForm.alias"
                              required
                              placeholder="name">
                </b-form-input>
              </b-form-group>
              <br>
              <hr>
              <b-form-group id="form-host-group"
                            label="Host:"
                            label-for="form-host-input">
                <b-form-input id="form-host-input"
                              type="text"
                              v-model="addPrestoForm.host"
                              required
                              placeholder="http://">
                </b-form-input>
              </b-form-group>
              <b-form-group id="form-port-group"
                            label="Port:"
                            label-for="form-port-input">
                <b-form-input id="form-port-input"
                              type="text"
                              v-model="addPrestoForm.port"
                              required
                              placeholder="8080">
                </b-form-input>
              </b-form-group>
              <b-form-group id="form-hostname-group"
                            label="Catalog:"
                            label-for="form-hostname-input">
                <b-form-input id="form-hostname-input"
                              type="text"
                              v-model="addPrestoForm.catalog"
                              required
                              placeholder="tpch">
                </b-form-input>
              </b-form-group>
              <b-form-group id="form-schema-group"
                            label="Schema:"
                            label-for="form-schema-input">
                <b-form-input id="form-schema-input"
                              type="text"
                              v-model="addPrestoForm.schema"
                              required
                              placeholder="sf1">
                </b-form-input>
              </b-form-group>
              <b-form-group id="form-user-group"
                            label="User:"
                            label-for="form-user-input">
                <b-form-input id="form-user-input"
                              type="text"
                              v-model="addPrestoForm.user"
                              required
                              placeholder="root">
                </b-form-input>
              </b-form-group>
              <b-button type="submit" variant="success" class="mr-2">Submit</b-button>
              <b-button type="reset" variant="info">Reset</b-button>
            </b-modal>
            <br><br>
            <div v-if="prestos.length > 0">
              <b-card>
              <v-table class="table table-hover"
                        :data="prestos"
                        selectionMode="single"
                        selectedClass="table-info"
                        @selectionChanged="selectedPresto = $event">
                <thead slot="head">
                  <th scope="col">Alias</th>
                  <th scope="col">Catalog</th>
                  <th scope="col">Schema</th>
                </thead>
                <tbody slot="body" slot-scope="{displayData}">
                  <v-tr v-for="presto in displayData"
                        :key="presto.id"
                        :row="presto">
                    <td>{{presto.alias}}</td>
                    <td>{{presto.catalog}}</td>
                    <td>{{presto.schema}}</td>
                  </v-tr>
                </tbody>
              </v-table>
              <ul class="list-unstyled">
                <li v-for="presto in selectedPresto" :key="presto.id">
                  <b-button @click="onUse" variant="success" class="mr-3">Use</b-button>
                  <b-button @click="onDelete" variant="warning">Delete?</b-button>
                </li>
              </ul>
              </b-card>
            </div>
            <div v-else>
              <b-alert show variant="warning">No Data Instances...Create One!</b-alert>
            </div>
          </div>
        </div>
      </b-jumbotron>
      <!--<b-alert show variant="warning">Query Limit Defaults to 500 For Demo Purposes,
        Full Software Allows a User Set Query Limit
      </b-alert>-->
    </div>
    <div v-if="block ==='query'" class="container">
      <b-jumbotron>
        <h4>Build a Query For
          <strong>{{selectedPresto[0].alias}}</strong></h4>
        <hr>
        <br>
        <label for="selecttables">Select a Table:</label>
        <select v-model="selectedTable"
                class="form-control mbd-select md-form dropdown-primary"
                searchable="Search on Tables"
                id="selecttables">
          <option v-for="(table, index) in tables"
                  :key="index"
                  v-bind:value="{'name':table.name, 'columns':table.columns}">
            {{table.name}}
          </option>
        </select>
        <br>
        <div v-if="selectedTable !== ''">
          <label for="selectcols">Select Columns (One or Many):</label>
          <multiselect v-model="selectedClms"
                      :options="selectedTable.columns"
                      :multiple="true"
                      :close-on-select="false"
                      label="name"
                      track-by="name"
                      id="selectcols"></multiselect>
          <br>
          <div v-if="selectedClms.length > 0">
            <b-card no-body>
              <b-tabs pills card vertical>
                <b-tab title="Function" active>
                  <b-form>
                    <h5>Select a Function (Optional)</h5>
                    <hr>
                    <b-form-group>
                      <label for="selectFun">Functions (One):</label>
                      <b-form-select v-model="selectedFunction.fun"
                                  :options="sqlFunctions"
                                  id="selectFun">
                      </b-form-select>
                    <b-form-group>
                    <div v-if="selectedFunction.fun !== ''">
                      <b-form-group>
                        <label for="selectFunClm">Select Column from
                          <strong>{{selectedTable.name}}</strong> to Perform
                          <strong>{{selectedFunction.fun}}</strong> On (One):</label>
                        <multiselect v-model="selectedFunction.clm"
                                    :options="selectedClms"
                                    :multiple="false"
                                    :close-on-select="true"
                                    label="name"
                                    track-by="name"
                                    id="selectFunClm"></multiselect>
                      </b-form-group>
                    </div>
                  </b-form>
                </b-tab>
                <b-tab title="Join">
                  <b-form>
                    <h5>Build a Join Statement (Optional)</h5>
                    <hr>
                    <b-form-group>
                      <b-form-select v-model="tableJoins.joins"
                                    :options="joinsType">
                      </b-form-select>
                    </b-form-group>
                    <b-form-group>
                      <label for="selectcolOrig">Select Column From
                        <strong>{{selectedTable.name}}</strong> (One):</label>
                      <multiselect v-model="tableJoins.clmorig"
                        :options="selectedTable.columns"
                        :multiple="false"
                        :close-on-select="true"
                        label="name"
                        track-by="name"
                        id="selectcolOrig"></multiselect>
                    </b-form-group>
                    <b-form-group>
                      <label for="entertab">Select a New Table to Join With (One):</label>
                      <select v-model="selectedTableJoins"
                              class="form-control mbd-select md-form dropdown-primary"
                              id="entertab">
                        <option v-for="(table, index) in tables"
                                :key="index"
                                v-bind:value="{'name':table.name, 'columns':table.columns}">
                          {{table.name}}
                        </option>
                      </select>
                    </b-form-group>
                    <div v-if="selectedTableJoins !== ''">
                      <b-form-group>
                        <label for="selectcolsJoins">Select Columns From
                          <strong>{{selectedTableJoins.name}}</strong> (One or Many):
                        </label>
                        <multiselect v-model="tableJoins.slctjoins"
                                    :options="selectedTableJoins.columns"
                                    :multiple="true"
                                    :close-on-select="false"
                                    label="name"
                                    track-by="name"
                                    id="selectcolsJoins"></multiselect>
                      </b-form-group>
                      <b-form-group>
                        <label for="selectcolJoinsOn">Select Column to Join Tables With (One):
                        </label>
                        <multiselect v-model="tableJoins.clmjoins"
                                    :options="selectedTableJoins.columns"
                                    :multiple="false"
                                    :close-on-select="true"
                                    label="name"
                                    track-by="name"
                                    id="selectcolJoinsOn"></multiselect>
                      </b-form-group>
                    </div>
                  </b-form>
                </b-tab>
                <b-tab title="Where">
                  <b-form>
                    <h5>Build (One or Many) Where Statements (Optional)</h5>
                    <hr>
                    <b-form-group>
                      <label for="whrs">Select Column from
                        <strong>{{selectedTable.name}}</strong> (One):</label>
                      <multiselect v-model="where.clm"
                        :options="selectedTable.columns"
                        :multiple="false"
                        :close-on-select="true"
                        label="name"
                        track-by="name"
                        id="whrs"></multiselect>
                    </b-form-group>
                    <b-form-group>
                      <b-form-select v-model="where.compare"
                                    :options="comparison">
                      </b-form-select>
                    </b-form-group>
                    <b-form-group>
                      <b-form-input v-model="where.val"
                                    placeholder="value">
                      </b-form-input>
                    </b-form-group>
                    <b-button @click="onWhere" variant="secondary">Add Where Statement</b-button>
                  </b-form>
                  <div v-if="selectedWhrs.length > 0">
                    <br>
                    <b-card>
                      <h6>Your Current Wheres Are:</h6>
                      <ul class="list-group">
                        <li class="list-group-item" v-for="(whr, indx) in selectedWhrs" :key="indx">
                          {{whr.clm}} {{whr.compare}} {{whr.val}}
                        </li>
                      </ul>
                    </b-card>
                  </div>
                </b-tab>
                <b-tab title="Group">
                  <b-form>
                    <h5>Build a Group By Statement (Optional)</h5>
                    <hr>
                    <b-form-group>
                      <!--<label for="grpby">Select Column from
                        <strong>{{selectedTable.name}}</strong> (One):</label>
                      <multiselect v-model="groupby"
                        :options="selectedClms"
                        :multiple="false"
                        :close-on-select="true"
                        label="name"
                        track-by="name"
                        id="grpby"></multiselect> -->
                        <b-form-select v-model="groupby"
                                      :options="groupTerms"
                                      placeholder="select a grouping expression">
                        </b-form-select>
                    </b-form-group>
                  </b-form>
                </b-tab>
                <b-tab title="Have" disabled>
                  <b-form>
                    <h5>Build a Having Clause (Optional)</h5>
                    <hr>
                  </b-form>
                </b-tab>
                <b-tab title = "Order">
                  <b-form>
                    <h5>Build an Order By Statement (Optional)</h5>
                    <hr>
                    <b-form-group>
                      <div v-if="tableJoins.slctjoins.length > 0">
                        <b-form-group>
                          <b-form-select v-model="orderBy.order"
                                        :options="order"
                                        placeholder="ascend or descend">
                          </b-form-select>
                        </b-form-group>
                        <b-form-group>
                          <label for="selectcolsOrder1">Select Columns From:
                            <strong>{{selectedTable.name}}</strong></label>
                          <multiselect v-model="orderBy.clmtbl1"
                                      :options="selectedClms"
                                      :multiple="true"
                                      :close-on-select="false"
                                      label="name"
                                      track-by="name"
                                      id="selectcolsOrder1">
                          </multiselect>
                        </b-form-group>
                        <b-form-group>
                          <label for="selectcolsOrder2">Select Columns From:
                            <strong>{{tableJoins.tbl}}</strong></label>
                          <multiselect v-model="orderBy.clmtbl2"
                                      :options="tableJoins.slctjoins"
                                      :multiple="true"
                                      :close-on-select="false"
                                      label="name"
                                      track-by="name"
                                      id="selectcolsOrder2">
                          </multiselect>
                        </b-form-group>
                      </div>
                      <div v-else>
                        <b-form-group>
                          <b-form-select v-model="orderBy.order"
                                        :options="order"
                                        placeholder="ascend or descend">
                          </b-form-select>
                        </b-form-group>
                        <b-form-group>
                          <label for="selectcolsOrder">Select Columns From:
                            <strong>{{selectedTable.name}}</strong></label>
                          <multiselect v-model="orderBy.clmtbl1"
                                      :options="selectedClms"
                                      :multiple="true"
                                      :close-on-select="false"
                                      label="name"
                                      track-by="name"
                                      id="selectcolsOrder">
                          </multiselect>
                        </b-form-group>
                      </div>
                    </b-form-group>
                  </b-form>
                </b-tab>
                <b-tab title="Limit">
                  <b-form>
                    <h5>Limit Results, Defaults to 2500 (Optional)</h5>
                    <hr>
                    <b-form-group>
                      <label for="enterlim">Enter Limit:</label>
                      <b-form-input id="enterlim"
                                    v-model="limit"
                                    placeholder="2500">
                      </b-form-input>
                    </b-form-group>
                  </b-form>
                </b-tab>
              </b-tabs>
            </b-card>
            <br>
            <b-button @click="onQuery" variant="success">Query</b-button>
          </div>
        </div>
        <br>
        <b-button @click="onBack" variant="warning">Back</b-button>
      </b-jumbotron>
    </div>
    <div v-if="block === 'results'" class="container">
      <div v-if="restab === ''">
        <b-jumbotron>
          <b-alert show variant="info">Waiting for Results...Please Hold...</b-alert>
          <br>
          <b-button @click="onBack" variant="warning">Back</b-button>
        </b-jumbotron>
      </div>
      <div v-else-if="restab !== '' && queryfailure === 'success'">
        <b-jumbotron>
          <b-card no-body>
            <b-tabs card>
              <b-tab title="Return" active>
                <b-button @click="onBack" variant="warning" class="mr-2">Back</b-button>
              </b-tab>
              <b-tab title="Save Query">
                <b-card>
                  <b-form-group>
                    <label for="queryname">Enter Query Name:</label>
                    <b-form-input id="queryname"
                                  v-model="savedquery.alias"
                                  placeholder="name">
                    <b-form-input>
                  </b-form-group>
                  <b-button @click="onSaveQuery" variant="info">Save Query?</b-button>
                </b-card>
              </b-tab>
              <!--<b-tab title="Chart" disabled>
                <b-card>
                  <b-form-group>
                    <label for="chartname">Enter Chart Name:</label>
                    <b-form-input id="chartname"
                                  v-model="chart.alias"
                                  placeholder="name">
                    </b-form-input>
                  </b-form-group>
                  <b-form-group>
                    <label for="charttypes">Select Chart Type:</label>
                    <b-form-select id="charttypes" v-model="chart.type" :options="chartTypes">
                    </b-form-select>
                  </b-form-group>
                  <b-button @click="onChart" variant="info">Create Chart?</b-button>
                </b-card>
              </b-tab>-->
            </b-tabs>
          </b-card>
        </b-jumbotron>
        <b-card>
          <h4>Results for "{{query}}"</h4>
        </b-card>
        <hr>
        <div v-html="restab"></div>
      </div>
      <div v-else>
          <b-jumbotron>
            <b-alert show
                    variant="danger">Uh-oh...Presto Threw an Error:
                    <strong>"{{queryfailure}}"</strong>
              <br>This was your query: <strong>"{{query}}"</strong>
              <br><strong>...Go Back and Build a New Query</strong>
            </b-alert>
            <br>
            <b-button @click="onBack" variant="warning" class="mr-2">Back</b-button>
          </b-jumbotron>
      </div>
    </div>
    <br>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Schema',
  data() {
    return {
      currentHostname: '',
      prestos: [],
      selectedPresto: [],
      block: '',
      addPrestoForm: {
        alias: '',
        host: '',
        port: 8080,
        catalog: '',
        schema: '',
        user: '',
      },
      message: '',
      showMessage: false,
      tables: [],
      selectedTable: '',
      selectedClms: [],
      restab: '',
      query: '',
      queryfailure: '',
      sqlFunctions: [
        { value: '', text: 'select a function' },
        { value: 'count', text: 'count' },
        { value: 'sum', text: 'sum' },
        { value: 'avg', text: 'avg' },
        { value: 'min', text: 'min' },
        { value: 'max', text: 'max' },
      ],
      selectedFunction: {
        fun: '',
        clm: '',
      },
      selectedFuns: [],
      comparison: [
        { value: '', text: 'select a comparison' },
        { value: '=', text: 'equals' },
        { value: '!=', text: 'does not equal' },
        { value: '<', text: 'less than' },
        { value: '<=', text: 'less than or equal to' },
        { value: '>=', text: 'greater than or equal to' },
        { value: '>', text: 'greater than' },
        // { value: 'like', text: 'like' },
      ],
      joinsType: [
        { value: '', text: 'select a join type' },
        { value: 'inner join', text: 'Inner Join' },
        { value: 'left outer join', text: 'Left Outer' },
        { value: 'right outer join', text: 'Right Outer' },
        { value: 'full outer join', text: 'Full Outer' },
        { value: 'cross join', text: 'Cross' },
      ],
      where: {
        clm: '',
        compare: '',
        val: 0,
      },
      selectedWhrs: [],
      groupTerms: [
        { value: '', text: 'select a grouping expression' },
        { value: 'cube', text: 'cube' },
        { value: 'rollup', text: 'rollup' },
      ],
      groupby: '',
      limit: 2500,
      selectedTableJoins: '',
      tableJoins: {
        slctjoins: [],
        joins: '',
        tbl: '',
        clmorig: '',
        clmjoins: '',
      },
      order: [
        { value: '', text: 'ascend or descend' },
        { value: 'asc', text: 'ascend' },
        { value: 'desc', text: 'descend' },
      ],
      orderBy: {
        clmtbl1: [],
        clmtbl2: [],
        order: '',
      },
      savedquery: {
        p_id: 0,
        alias: '',
        query: '',
      },
      chartTypes: [
        { value: 'line', text: 'line' },
        { value: 'bar', text: 'bar' },
      ],
      chart: {
        p_id: 0,
        alias: '',
        query: '',
        type: '',
      },
    };
  },
  mounted() {
    this.currentHostname = window.location.hostname;
    this.reInit();
  },
  watch: {
    selectedTableJoins(val) {
      this.tableJoins.tbl = val.name;
    },
  },
  methods: {
    reInit() {
      this.block = 'prestos';
      this.selectedPresto = [];
      this.initData();
      this.getPrestos();
    },
    getPrestos() {
      const path = `http://${this.currentHostname}:8087/prestos`;
      axios.get(path)
      // axios.get('http://ec2-18-215-62-102.compute-1.amazonaws.com:8087/prestos')
      // axios.get('http://localhost:8087/prestos')
        .then((res) => {
          this.prestos = res.data.prestos;
        })
        .catch((err) => {
          throw err;
        });
    },
    addPresto(request, config) {
      const path = `http://${this.currentHostname}:8087/prestos/create`;
      axios.post(path, request, config)
      // axios.post('http://ec2-18-215-62-102.compute-1.amazonaws.com:8087/prestos/create', request, config)
      // axios.post('http://localhost:8087/prestos/create', request, config)
        .then(() => {
          this.getPrestos();
          this.message = 'Successfully added new Schema';
          this.showMessage = true;
        })
        .catch((err) => {
          throw err;
        });
    },
    initPrestoForm() {
      this.addPrestoForm.alias = '';
      this.addPrestoForm.host = '';
      this.addPrestoForm.port = 8080;
      this.addPrestoForm.catalog = '';
      this.addPrestoForm.schema = '';
      this.addPrestoForm.user = '';
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.$bvModal.hide('presto-modal');

      const presto = {
        alias: this.addPrestoForm.alias,
        hostname: this.addPrestoForm.host,
        port: this.addPrestoForm.port,
        catalog: this.addPrestoForm.catalog,
        schema: this.addPrestoForm.schema,
        user: this.addPrestoForm.user,
      };

      const config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };
      this.addPresto(presto, config);
      this.initPrestoForm();
    },
    onReset(evt) {
      evt.preventDefault();
      this.$bvModal.hide('presto-modal');
      this.initPrestoForm();
    },
    onUse(evt) {
      evt.preventDefault();

      const schema = {
        catalog: this.selectedPresto[0].catalog,
        schema: this.selectedPresto[0].schema,
      };

      const config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };
      this.getSchema(schema, config);
      this.block = 'query';
    },
    getSchema(schema, config) {
      const path = `http://${this.currentHostname}:8087/schemas/schema`;
      axios.post(path, schema, config)
        .then((res) => {
          this.tables = res.data.tables;
        })
        .catch((err) => {
          throw err;
        });
    },
    onBack(evt) {
      evt.preventDefault();
      if (this.block === 'results') {
        this.block = 'query';
        this.initData();
      } else {
        this.block = 'prestos';
        this.reInit();
      }
    },
    onWhere(evt) {
      evt.preventDefault();
      const curwhere = {
        clm: this.where.clm.name,
        compare: this.where.compare,
        val: this.where.val,
      };
      this.selectedWhrs.push(curwhere);
      this.where.clm = '';
      this.where.compare = '';
      this.where.val = 0;
    },
    onQuery(evt) {
      evt.preventDefault();

      const query = {
        presto: this.selectedPresto[0],
        table: this.selectedTable.name,
        columns: this.selectedClms,
        func: this.selectedFunction,
        wheres: this.selectedWhrs,
        joins: this.tableJoins,
        group: this.groupby,
        order: this.orderBy,
        limit: this.limit,
      };

      const config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };

      this.getResult(query, config);
      this.block = 'results';
    },
    getResult(query, config) {
      const path = `http://${this.currentHostname}:8086/query`;
      axios.post(path, query, config)
        .then((res) => {
          this.queryfailure = res.data.message;
          this.restab = res.data.table;
          this.query = res.data.query;
        })
        .catch((err) => {
          throw err;
        });
    },
    onSaveQuery(evt) {
      evt.preventDefault();
      this.savedquery.p_id = this.selectedPresto[0].id;
      this.savedquery.query = this.query;
      const config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };
      const path = `http://${this.currentHostname}:8087/queries/create`;
      axios.post(path, this.savedquery, config)
        .then(() => {
          this.savedquery.p_id = 0;
          this.savedquery.query = '';
          this.savedquery.alias = '';
        })
        .catch((err) => {
          throw err;
        });
    },
    onChart(evt) {
      evt.preventDefault();
      this.chart.p_id = this.selectedPresto[0].id;
      this.chart.query = this.query;

      const config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };
      const path = `http://${this.currentHostname}:8087/charts/create`;
      axios.post(path, this.chart, config)
        .then(() => {
          this.chart.p_id = 0;
          this.chart.query = '';
          this.chart.alias = '';
          this.chart.type = '';
        })
        .catch((err) => {
          throw err;
        });
    },
    onDelete(evt) {
      evt.preventDefault();

      const prestoid = {
        prestoid: this.selectedPresto[0].id,
        catalog: this.selectedPresto[0].catalog,
        schema: this.selectedPresto[0].schema,
      };

      const config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };

      this.postDelete(prestoid, config);
    },
    postDelete(prestoid, config) {
      const path = `http://${this.currentHostname}:8087/prestos/delete`;
      axios.post(path, prestoid, config)
        .then(() => {
          this.reInit();
        })
        .catch((err) => {
          throw err;
        });
    },
    initData() {
      this.groupby = '';
      this.selectedFunction.fun = '';
      this.selectedFunction.clm = '';
      this.selectedTable = '';
      this.selectedClms = [];
      this.results = [];
      this.restab = '';
      this.query = '';
      this.where.clm = '';
      this.where.compare = '';
      this.where.val = 0;
      this.selectedTableJoins = '';
      this.tableJoins.slctjoins = [];
      this.tableJoins.joins = '';
      this.tableJoins.tbl = '';
      this.tableJoins.clmorig = '';
      this.tableJoins.clmjoins = '';
      this.selectedWhrs = [];
      this.orderBy.clmtbl1 = [];
      this.orderBy.clmtbl2 = [];
      this.orderBy.order = '';
      this.queryfailure = '';
      this.limit = 2500;
    },
  },
};
</script>
