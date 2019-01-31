<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline align-content-center font-weight-bold">SOURCE</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title class="headline align-content-center">Implementation Of Measuring Similarity
        between Graphs Based on the Levenshtein Distance</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title class="headline align-content-center font-weight-bold">MATCHING</v-toolbar-title>
    </v-toolbar>
    <v-content class="fit">
      <v-container fluid grid-list-md text-xs-center class="pa-0 ma-0 h-100">
        <v-layout row class="fit ma-0">
          <v-flex xs6 class="ma-0 pa-0">
            <SideLeft />
          </v-flex>
          <div class="h-100 btn-match">
            <v-btn fab @click="btnCompare" :loading="btnLoading" color="success">
              <v-icon>compare_arrows</v-icon>
            </v-btn>
          </div>
          <v-flex xs6>
            <SideRight />
          </v-flex>
        </v-layout>
      </v-container>
      <modal name="hello-world" transition="nice-modal-fade" :min-width="200" :min-height="200"
        :delay="100" :draggable="true">
        <div class="example-modal-content">
          asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd
          asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd
          asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd
          asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd
          asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd
          asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd
          asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd
          asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd
          asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd
        </div>
      </modal>
    </v-content>
  </v-app>
</template>
<script>
import Loading from 'vue-loading-overlay';
import {
  mapState,
  mapMutations,
} from 'vuex';
import SideLeft from './components/SideLeft.vue';
import SideRight from './components/SideRight.vue';

export default {
  name: 'App',
  components: {
    Loading,
    SideLeft,
    SideRight,
  },
  data() {
    return {
      isLoading: true,
      fullPage: true,
      btnLoading: false,
    };
  },
  computed: { ...mapState(['sourceGraph', 'sourceNode', 'matchGraph', 'matchNode']) },
  mounted() {
    // this.show()

  },
  methods: {
    btnCompare() {
      // console.log('schesj')
      if (this.sourceGraph === null) {
        // this.$swal("Load Source Graph");
        this.$swal.fire({
          type: 'error',
          title: 'Oops...',
          // text: "Something went wrong!",
          text: 'Load Source Grap',
          footer: '<a href>Something went wrong!</a>',
        });
      } else if (this.matchGraph === null) {
        // this.$swal("Load Matching Graph");
        this.$swal.fire({
          type: 'error',
          title: 'Oops...',
          // text: "Something went wrong!",
          // text: "Load Matching Grap",
          footer: '<a href>Something went wrong!</a>',
        });
      } else {
        this.btnLoading = true;
        this.axios.post('https://graph-distance-api.herokuapp.com/graph-distance/api/v1.0/calculate_graphs_score', {
          sourcegraph: this.sourceGraph,
          sourcenode: this.sourceNode,
          matchgraph: this.matchGraph,
          matchnode: this.matchNode,
        }).then((res) => {
          console.log('MATCH: ', res.data.result);
          console.log('TYPE MATCH: ', typeof res.data);
          //       if (typeof res.data.result === 'number') {
          //         this.$swal.fire({
          //  title: '<strong>Result Stats</strong>',
          //   type: 'success',
          //   html: '<strong>Similarity Score:</strong> ' + res.data.result + '<br/>' +
          //   '<strong>Matching time ratio:</strong> '+ res.data.sedtime + 'ms<br/>'
          //         });
          //       }
          //       if (typeof res.data.result === 'object') {
          this.$swal.fire({
            title: '<strong>Result Statistics</strong>',
            type: 'success',
            html: `Similarity Score: ${res.data.score}<br/>`
        + `SED Matching time ratio: ${res.data.sedtime}<br/>`
        + `GED time ratio: ${res.data.sedtime}<br/>`,
            // '<strong>Source:</strong> '+ res.data.result[0].sourceedge_filtered + '<br/>'+
            // '<strong>Match:</strong> '+ res.data.result[0].matchedge_filtered + '<br/>',
          });
          // }
        });
        this.btnLoading = false;
      }
    },
    show() {
      this.$modal.show('hello-world');
    },
    hide() {
      this.$modal.hide('hello-world');
    },
    doAjax() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 3000);
    },
  },
};

</script>
<style scoped>
  .h-50 {
    height: 50% !important;
  }

  .h-90 {
    height: 90% !important;
  }

  .w-50 {
    width: 50%;
  }

  .h-10 {
    height: 10% !important;
  }

  .h-48 {
    height: 48% !important;
  }

  .h-100 {
    height: 100% !important;
  }

  .w-100 {
    width: 100% !important;
  }

  .fit {
    width: 100% !important;
    height: 100% !important;
  }

  .no-background {
    background: none !important;
  }

  .sourceGraph {
    display: flex;
    flex-direction: column;
  }

  .drop-loader {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
  }

  .drop-loader-spinner {
    display: flex;
    align-items: center;
  }

  .top-source {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .bordered-red {
    border: 1px solid red;
  }

  .bordered-green {
    border: 1px solid green;
  }

  .border-right {
    border-right: 1px solid;
  }

  .border-left {
    border-left: 1px solid;
  }

  .btn-match {
    display: flex;
    justify-content: center;
    align-items: center;
  }

</style>
