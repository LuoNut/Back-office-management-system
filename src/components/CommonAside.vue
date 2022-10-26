<template>
    <div>
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff"
            active-text-color="#ffd04b" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
            <h3>{{isCollapse ? '后台' : '后台管理系统'}}</h3>
            <el-menu-item @click="clickMenu(item)" v-for="item in nochildren" :key="item.naem" :index="item.name">
                <i :class="`el-icon-${item.icon}`"></i>
                <span slot="title">{{item.label}}</span>
            </el-menu-item>
            <el-submenu v-for="item in haschildren" :key="item.label" :index="item.label">
                <template slot="title">
                    <i :class="`el-icon-${item.icon}`"></i>
                    <span slot="title">{{item.label}}</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item @click="clickMenu(subitem)" v-for="subitem in item.children" :key="subitem.name" :index="subitem.name">
                        {{subitem.label}}</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>



<script>
export default {
    data() {
        return {
            menuDate: [
                {
                    path: "/",
                    name: "home",
                    label: "首页",
                    icon: "s-home",
                    url: "Home/Home",
                },
                {
                    path: "/mall",
                    name: "mall",
                    label: "商品管理",
                    icon: "video-play",
                    url: "MallManage/MallManage",
                },
                {
                    path: "user",
                    name: "user",
                    label: "用户管理",
                    icon: "user",
                    url: "userManage/userManage",
                },
                {
                    label: "其他",
                    icon: "location",
                    children: [
                        {
                            path: "/page1",
                            name: "page1",
                            label: "页面1",
                            icon: "setting",
                            url: "Other/PageOne"
                        },
                        {
                            path: "/page2",
                            naem: "page2",
                            label: "页面2",
                            icon: "setting",
                            url: "Other/PageTwo",
                        }
                    ]
                }
            ]
        };
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },

        //点击菜单
        clickMenu(item) {
            if (this.$route.path !== item.path && !(this.$route.path === '/home' && item.path === '/' )) {
                this.$router.push(item.path)

                //面包屑
                this.$store.commit('selectMenu',item)
                
            }
        }
    },
    computed: {
        nochildren() {
            return this.menuDate.filter(item => !item.children)
        },
        haschildren() {
            return this.menuDate.filter(item => item.children)
        },
        isCollapse() {
            return this.$store.state.tab.isCollapse
        }

    },
    mounted() {
    }
}
</script>

<style lang="less" scoped>
.el-menu {
    height: 100vh;
    border: 0   ;
    h3{
        color: #fff;
        text-align: center;
        line-height: 48px;
        font-size: 16px;
        font-weight: 400;
    }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
</style>