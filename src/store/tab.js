export default {
    state: {
        isCollapse:false, //控制侧边栏展开或关闭
        tabsList:[
            {
                path: "/",
                name: "home",
                label: "首页",
                icon: "s-home",
                url: "Home/Home",
            }
        ]
    },
    mutations:{
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        selectMenu(state,value) {
            if(value.name !== 'home') {
                const index = state.tabsList.findIndex(item => item.name === value.name)
                    if (index === -1) {
                        state.tabsList.push(value)
                    }
            }
        },
        closeTab(state,index) {
            state.tabsList.splice(index,1)
        }
    }
}