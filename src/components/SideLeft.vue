<template>
  <v-card flat color="h-100 no-background">
    <v-card flat class="h-48 ma-0 pa-0">
      <div class="fit top-source">
        <div v-show="!showSourceGraphLayout">Upload Source Graph Below</div>
        <div v-show="showSourceGraphLayout" class="fit top-source">
          <div class="w-50 h-100 border-right">
            <v-layout row class="fit">
              <v-flex xs12>
                <v-card flat class="fit">
                  <v-list two-line>
                    <template>
                      <v-list-tile avatar ripple @click>
                        <v-list-tile-content>
                          <v-list-tile-title>{{ 'Nodes' }}</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                          <v-list-tile-action-text>{{ nodes }}</v-list-tile-action-text>
                        </v-list-tile-action>
                      </v-list-tile>
                      <v-divider></v-divider>
                    </template>
                    <template>
                      <v-list-tile avatar ripple @click>
                        <v-list-tile-content>
                          <v-list-tile-title>{{ 'Edges' }}</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                          <v-list-tile-action-text>{{ sourceGraphDetails.edges.length }}</v-list-tile-action-text>
                        </v-list-tile-action>
                      </v-list-tile>
                      <v-divider></v-divider>
                    </template>
                    <template>
                      <v-list-tile avatar ripple @click>
                        <v-list-tile-content>
                          <v-list-tile-title>{{ 'Vertices' }}</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                          <v-list-tile-action-text>{{ sourceGraphDetails.vertices.length }}</v-list-tile-action-text>
                        </v-list-tile-action>
                      </v-list-tile>
                      <v-divider></v-divider>
                    </template>
                    <template>
                      <v-list-tile avatar ripple @click>
                        <v-list-tile-content>
                          <v-list-tile-title>{{ 'Isolated' }}</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                          <v-list-tile-action-text>{{ sourceGraphDetails.isolated.length }}</v-list-tile-action-text>
                        </v-list-tile-action>
                      </v-list-tile>
                      <v-divider></v-divider>
                    </template>
                    <template>
                      <v-list-tile avatar ripple @click>
                        <v-list-tile-content>
                          <v-list-tile-title>{{ 'Density' }}</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                          <v-list-tile-action-text>{{ sourceGraphDetails.density }}</v-list-tile-action-text>
                        </v-list-tile-action>
                      </v-list-tile>
                    </template>
                  </v-list>
                </v-card>
              </v-flex>
            </v-layout>
          </div>
          <div class="w-50 h-100 border-left">
            <v-layout row class="fit">
              <v-flex xs12>
                <v-card flat class="fit">
                  <v-list two-line>
                    <template>
                      <v-list-tile avatar ripple @click>
                        <v-list-tile-content>
                          <v-list-tile-title>{{ 'Diameter' }}</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                          <v-list-tile-action-text>{{ sourceGraphDetails.diameter }}</v-list-tile-action-text>
                        </v-list-tile-action>
                      </v-list-tile>
                      <v-divider></v-divider>
                    </template>
                    <template>
                      <v-list-tile avatar ripple @click>
                        <v-list-tile-content>
                          <v-list-tile-title>{{ 'Degree Sequence' }}</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                          <v-list-tile-action-text>{{ sourceGraphDetails.degree_sequence }}</v-list-tile-action-text>
                        </v-list-tile-action>
                      </v-list-tile>
                      <v-divider></v-divider>
                    </template>
                    <template>
                      <v-list-tile avatar ripple @click>
                        <v-list-tile-content>
                          <v-list-tile-title>{{ 'Max Degree' }}</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                          <v-list-tile-action-text>{{ sourceGraphDetails.max_degree }}</v-list-tile-action-text>
                        </v-list-tile-action>
                      </v-list-tile>
                      <v-divider></v-divider>
                    </template>
                    <template>
                      <v-list-tile avatar ripple @click>
                        <v-list-tile-content>
                          <v-list-tile-title>{{ 'Min Degree' }}</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                          <v-list-tile-action-text>{{ sourceGraphDetails.min_degree }}</v-list-tile-action-text>
                        </v-list-tile-action>
                      </v-list-tile>
                    </template>
                  </v-list>
                </v-card>
              </v-flex>
            </v-layout>
          </div>
        </div>
      </div>
    </v-card>
    <v-card color="h-50 ma-0">
      <div class="fit" ref="paperBox">
        <div v-show="showSourceGraphLayout" class="fit sourceGraph drop-loader">
          <div id="paper" class="h-90 fit w-100 paperBox"></div>
        </div>
        <div v-show="!showSourceGraphLayout" class="fit drop-loader">
          <loading
            class="drop-loader-spinner"
            :active.sync="isLoadingSource"
            :can-cancel="true"
            :on-cancel="onCancel"
            :is-full-page="fullPage"
          ></loading>
          <vue-dropzone
            v-show="!isLoadingSource"
            ref="myVueDropzone"
            @vdropzone-file-added="vfileAddedSource"
            @vdropzone-complete="afterCompleteSource"
            id="dropzoneSource"
            :options="dropzoneOptions"
            :useCustomSlot="true"
            class="fit"
          ></vue-dropzone>
        </div>
      </div>
    </v-card>
  </v-card>
</template>
<script>
import Papa from 'papaparse';
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
import Loading from 'vue-loading-overlay';
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'App',
  components: {
    vueDropzone: vue2Dropzone,
    Loading,
  },
  data() {
    return {
      showSourceGraphLayout: false,
      redrawSource: null,
      fullPage: false,
      isLoadingSource: false,
      sourceObj: {},
      dropZoneSource: true,
      nodes: [],
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        maxFilesize: 2,
        addRemoveLinks: true,
        maxFiles: 1,
        headers: {
          'My-Awesome-Header': 'header value',
        },
        useCustomSlot: 'asdews',
      },
      sourceGraphDetails: {
        graph: '',
        edges: '',
        vertices: '',
        isolated: '',
        density: '',
        diameter: '',
        degree_sequence: '',
        max_degree: '',
        min_degree: '',
      },
    };
  },
  computed: {
    ...mapState(['sourceGraph']),
  },
  methods: {
    ...mapMutations(['mutateSourceGraph', 'mutateSourceNode']),
    vfileAddedSource(file) {},
    afterCompleteSource(file) {
      const spj = JSON.parse(file.xhr.response).files.file;
      console.log({
        spj,
      });
      const graph = Papa.parse(spj);
      console.log('CSV: ', graph);
      // alert("CSV: ", graph)
      const Dracula = require('graphdracula');
      const Graph = Dracula.Graph;
      const Renderer = Dracula.Renderer.Raphael;
      const Layout = Dracula.Layout.Spring;
      const graphSource = new Graph();
      graph.data.forEach((element, index) => {
        this.nodes.push(element[0]);
        this.sourceObj[element[0]] = element.slice(1);
        if (element.length === 1) {
          graphSource.addEdge(element[0], element[0]);
        }
        element.splice(1).forEach((ev, idx) => {
          graphSource.addEdge(element[0], ev);
        });
      });

      this.axios
        .post(
          'https://graph-distance-api.herokuapp.com/graph-distance/api/v1.0/graph',
          { sourceobj: this.sourceObj, nodes: this.nodes },
        )
        .then((res) => {
          console.log('success: ', res);
          this.sourceGraphDetails.graph = res.data.graph;
          this.sourceGraphDetails.edges = res.data.edges;
          this.sourceGraphDetails.vertices = res.data.vertices;
          this.sourceGraphDetails.isolated = res.data.isolated;
          this.sourceGraphDetails.density = res.data.density;
          this.sourceGraphDetails.diameter = res.data.diameter;
          this.sourceGraphDetails.degree_sequence = res.data.degree_sequence;
          this.sourceGraphDetails.max_degree = res.data.max_degree;
          this.sourceGraphDetails.min_degree = res.data.min_degree;

          this.mutateSourceGraph(this.sourceObj);
          this.mutateSourceNode(this.nodes);

          this.$swal({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            type: 'success',
            title: 'Source Graph',
            text: 'Source Graph loaded!',
          });
        });
      this.doAjax();
      const layout = new Layout(graphSource);
      const renderer = new Renderer(
        '#paper',
        graphSource,
        this.$refs.paperBox.clientWidth,
        this.$refs.paperBox.clientHeight,
      );
      renderer.draw();
      this.redrawSource = function () {
        layout.layout();
        renderer.draw();
      };
    },
    btnRedrawSource(action) {
      action();
    },
    doAjax() {
      this.isLoadingSource = true;
      this.dropZoneSource = false;
      // simulate AJAX
      setTimeout(() => {
        this.isLoadingSource = false;
        this.showSourceGraphLayout = true;
        this.dropZoneSource = false;
      }, 3000);
    },
    onCancel() {
      console.log('User cancelled the loader.');
    },
  },
  mounted() {
    // console.log(this)
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
</style>
