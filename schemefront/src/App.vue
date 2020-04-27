<template>
  <div id="app">
    <b-navbar toggleable="sm" type="light" variant="light">
      <b-navbar-brand>
        <img src="./assets/visiblelogo-circle.png"
          class="d-inline-block"
          height="45"
          width="45"
          alt="Logo">
      </b-navbar-brand>
      <b-navbar-brand>Sight</b-navbar-brand>
      <b-navbar-toggle target="tools">
        <template vslot:default="{ expanded }">
          <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
          <b-icon v-else icon="chevron-bar-down"></b-icon>
        </template>
      </b-navbar-toggle>
      <b-collapse id="tools" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/">Analyze</b-nav-item>
          <b-nav-item to="/dashboard">Reflect</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view/>
  </div>
</template>
