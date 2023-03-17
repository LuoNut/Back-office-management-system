import Cookie from "js-cookie"
export default {
  state: {
    isCollapse: false, // 控制侧边栏展开或关闭
    tabsList: [
      {
        path: '/',
        name: 'home',
        label: '首页',
        icon: 's-home',
        url: 'Home/Home',
      },
    ],
    menu:[]
  },
  mutations: {
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse
    },
    selectMenu(state, value) {
      if (value.name !== 'home') {
        const index = state.tabsList.findIndex(item => item.name === value.name)
        if (index === -1)
          state.tabsList.push(value)
      }
    },
    closeTab(state, index) {
      state.tabsList.splice(index, 1)
    },

    //储存menu数据
    setMenu(state,value) {
      state.menu = value
      Cookie.set('menu',JSON.stringify(value))
    },

    //动态注册路由
    addMenu(state, router) {
      console.log(JSON.parse(Cookie.get('menu')));
      if(!Cookie.get("menu")) return 
      const menu = JSON.parse(Cookie.get('menu'))

      let menuArr = []
      menu.forEach(item => {
        if(item.children) {
          let itemChi = item.children.map( chi => {
            chi.component = () => import(`/src/views/${chi.url}`)
            return chi
          })
          menuArr.push(...itemChi)   
        }else {
          item.component = () => import(`/src/views/${item.url}`)
          menuArr.push(item)
        }
      });

      console.log(menuArr);

      menuArr.forEach(item => {
        router.addRoute('Main', item)
      })
      
    }
  },
}
