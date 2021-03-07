<template>
  <div id="app">
    <div>
      <h2>User: {{ $keycloak.userName }}</h2>
      <button class="btn-red" @click="$keycloak.logoutFn" v-if="$keycloak.authenticated">Logout</button>
      <button class="btn-green" @click="$keycloak.loginFn" v-if="!$keycloak.authenticated">Login</button>
    </div>
    <div class="wrapper">
      <button class="btn" @click="request">Request</button>
      <div class="box">
        <h3 style="color: black">Response</h3>
        <pre>{{ msg }}</pre>
      </div>
    </div>
    <div class="wrapper">
      <div class="box">
        <h3 style="color: black">JWT ID Token</h3>
        {{ $keycloak.idToken }}
      </div>
      <div class="box">
        <h3 style="color: black">ID Token Parsed</h3>
        <pre style="text-align: left">{{ JSON.stringify($keycloak.idTokenParsed, null, 2) }}</pre>
      </div>
    </div>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a href="https://keycloak.org" target="_blank">Keycloak</a>
      </li>
      <li>
        <a href="https://github.com/keycloak/keycloak-quickstarts" target="_blank">Code Repo</a>
      </li>
      <li>
        <a href="https://twitter.com/keycloak" target="_blank">Twitter</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import kcConfig from "./kcConfig";

const API_GW_URL = kcConfig["x-api-gw-url"];

export default Vue.extend({
  name: "App",
  components: {},
  data() {
    return {
      msg: `Click button to send request to API GW (${API_GW_URL})`,
    };
  },
  methods: {
    showResInfo(o: { data: unknown; status: unknown; statusText: unknown }) {
      const { data, status, statusText } = o;
      this.msg = JSON.stringify(
        {
          url: API_GW_URL,
          status,
          statusText,
          data,
        },
        null,
        2
      );
    },
    request() {
      axios
        .get(API_GW_URL)
        .then((res) => {
          this.showResInfo(res);
        })
        .catch((err) => {
          this.showResInfo(err.response);
        });
      this.msg = "Request sent...";
    },
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 30px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: block;
  margin: 0 10px;
  color: #333;
  font-size: 20px;
}

a {
  color: #42b983;
}

.wrapper {
  display: flex;
  margin-top: 10px;
}

.box {
  width: 50%;
  display: block;
  padding: 20px;
  margin: 10 0 10px;
  font-size: 13px;
  line-height: 1.42857143;
  color: #333;
  word-break: break-all;
  word-wrap: break-word;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #d63aff;
  font-weight: bolder;
}

.btn-red {
  color: #fff;
  background-color: #ce1800;
  border-color: #9c0000;
  padding: 6px 10px;
  font-size: 14px;
  line-height: 1.3333333;
}

.btn-green {
  color: #fff;
  background-color: #41ce00;
  border-color: #009c0d;
  padding: 6px 10px;
  font-size: 14px;
  line-height: 1.3333333;
}

.btn {
  color: #fff;
  background-color: #0088ce;
  border-color: #00659c;
  padding: 6px 10px;
  font-size: 14px;
  line-height: 1.3333333;
}
</style>
