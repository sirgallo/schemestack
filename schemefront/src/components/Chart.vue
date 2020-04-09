<template>
  <div>
    <!--<p>{{chart}}</p>-->
    <!--
    <div class="container">
      <b-jumbotron>
        <div>
          <canvas id="chartId"></canvas>
          <v-table class="table table-hover"
                        :data="charts"
                        selectionMode="single"
                        selectedClass="table-info"
                        @selectionChanged="chart = $event">
                <thead slot="head">
                  <th scope="col">Host</th>
                  <th scope="col">Port</th>
                  <th scope="col">Catalog</th>
                  <th scope="col">Schema</th>
                </thead>
                <tbody slot="body" slot-scope="{displayData}">
                  <v-tr v-for="presto in displayData"
                        :key="presto.id"
                        :row="presto">
                    <td>{{presto.host}}</td>
                    <td>{{presto.port}}</td>
                    <td>{{presto.catalog}}</td>
                    <td>{{presto.schema}}</td>
                  </v-tr>
                </tbody>
              </v-table>
        </div>
      </b-jumbotron>
    </div> -->
    <div class="container">
      <b-jumbotron>
        <p><strong>Current work in Progress...come back shortly</strong></p>
      </b-jumbotron>
    </div>
  </div>
</template>

<script>

// import Chart from 'chart.js';

export default {
  name: 'Chart',
  /*
  data() {
    return {
      charts: [],
      chart: {
        chartAlias: '',
        chartId: '',
        chartData: {
          type: '',
          data: [],
          options: {},
        },
      },
    };
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      // this.chart.chartId = 'chartId';
    },
    /*
    renderChart(chart) {
      // const ctx = document.getElementById(chart.chartId);
      const myChart = new Chart(ctx, {
        type: chart.chartData.type,
        data: chart.chartData.data,
        options: chart.chartData.options,
      });

    },

  },
  */
};
</script>
