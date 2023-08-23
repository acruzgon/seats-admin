import { defineConfig } from "cypress";

const fs = require("fs-extra");
const path = require("path");

export default defineConfig({
  retries: {
    runMode: 3,
    openMode: 0,
  },
  videoUploadOnPasses: false,  
  viewportWidth: 1600,
  viewportHeight: 1000,
  e2e: {
    baseUrl: "https://prod.foo.redhat.com:1337/beta/ansible/seats-administration",
    setupNodeEvents(on, config) {
    },
  },
});
