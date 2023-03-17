

<template>
  <div class="header-container">
    <div class="l-content">
      <el-button style="margin-right: 20px;" icon="el-icon-menu" size="mini" @click="handleMenu" />
      <!-- 面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in tags" :key="item.name" :to="{ path: `${item.path}` }">
          {{ item.label }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <img class="user" src="../assets/image/user.jpg" alt="">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
import { mapState } from 'vuex'
import LoginVue from '@/views/Login.vue'

export default {
  data() {
    return {

    }
  },
  methods: {
    handleMenu() {
      this.$store.commit('collapseMenu')
    },
    //点击个人中心的下拉菜单
    handleCommand(e) {
      console.log(e);
      if(e === 'logout') {
        //清除token
        Cookie.remove('token')
        //清除路由数据
        Cookie.remove('menu')
        //跳转到登录页
        this.$router.push('/login')

      }
    }
  },
  computed: {
    ...mapState({
      tags: state => state.tab.tabsList,
    }),
  },
  mounted() {
  },

}
</script>

<style lang="less" scoped>
.header-container {
    height: 100%;
    padding: 0 20px;
    background-color: #333;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .l-content{
        display: flex;
        align-items: center;

        /deep/ .el-breadcrumb__item{
                .el-breadcrumb__inner{
                    font-weight: normal;
                    &.is-link {
                        color: #666 ;
                    }
                }
                &:last-child {
                    .el-breadcrumb__inner {
                        color: #fff;
                    }
                }
            }

    }

    .r-content {
        .user {
            height: 40px;
            width: 40px;
            border-radius: 50%;
        }
    }

}
</style>
