<!--
 * @Description: 
 * @Author: Qing Shi
 * @Date: 2022-09-17 23:36:36
 * @LastEditTime: 2023-02-13 11:02:16
-->
<template>
  </template>
  
  <script>
  
  
  export default {
    name: "home_view",
    data() {
      return {
        msgH: null,
      };
    },
    created() {
        this.$router.replace({ path: '/' })
    },
    computed: {
      initSign() {
        return 1;
      },
      loadingText() {
        return "Loading"
      }
    },
    mounted() {
      this.msgH = 1;
    },
    methods: {
      fetchData() {
      }
    },
    components: {  }
  };
  </script>
  <style scoped>
  
  .boundary {
          /*border-style: dashed;*/
          border-style: solid;
          border-color: #d3dce6;
          border-width: 0.5px;
          border-radius: 3px;
      }
  </style>
  