<template>
  <div id="app">
    <b-navbar toggleable="sm" type="light" variant="light">
      <b-navbar-brand>Scheme</b-navbar-brand>
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
          <b-button @click="onSignout"
                    variant="link"
                    class="text-decoration-none">Sign Out</b-button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      user: '',
    };
  },
  mounted() {
    this.currentHostname = window.location.hostname;
    if (localStorage.user) {
      this.user = localStorage.getItem('user');
    }
  },
  methods: {
    onSignout(evt) {
      evt.preventDefault();
      localStorage.removeItem('user');
      localStorage.removeItem('jwt');
      this.$router.push('/login');
    },
  },
};
</script>
