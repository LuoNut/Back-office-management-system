<script>
import CommonAside from '../components/CommonAside.vue'
import CommonHeader from '../components/CommonHeader.vue'
import CommonTag from '../components/CommonTag.vue'

export default {
  components: {
    CommonAside,
    CommonHeader,
    CommonTag,
  },
  data() {
    return {

    }
  },
}
</script>

<template>
    <el-container style="height: 100%;">
      <el-aside width="auto">
        <CommonAside />
      </el-aside>
      <el-container>
        <el-header>
          <CommonHeader />
        </el-header>
        <CommonTag />
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>

</template>

<style scoped>
.el-header {
  padding: 0;
}

.el-main {
  padding-top: 0px;
}
</style>
