import Cookie from 'js-cookie';
export default{
    state:{
        isCollapse:false,//控制菜单的展开
        tabList:[
            {
                path:'/',
                name:'home',
                label:'首页',
                icon:'s-home',
                url:'Home/Home',
            },
 

        ],//面包屑的数据
        // 菜单数据
        menu:[]

    },
    mutations:{
        // 修改菜单展开的方法
        collapseMenu(state){
            state.isCollapse = !state.isCollapse
        },
        // 更新面包屑
        selectMenu(state,val){
            if(val.name !== 'home'){
                const index = state.tabList.findIndex((item) => item.name === val.name)
                if(index === -1){
                    state.tabList.push(val)
                }
            }
        },
        closeTag(state,item){
             state.tabList.splice(state.tabList.findIndex((val)=>{
                val.name === item.name
            }),1)
        },
        setMenu(state,val){
            state.menu=val
            Cookie.set('menu',JSON.stringify(val))
        },
        // 动态注册路由
        addMenu(state,router){
            // 判断缓存中是否有数据
            if(!Cookie.get('menu')){ return}
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            // 组装动态路由的数据
            const menuArray = []
            menu.forEach(item => {
                if(item.children){
                    item.children = item.children.map((item)=>{
                        item.component = ()=> import(`../views/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                }else{
                    item.component = ()=> import(`../views/${item.url}`)
                    menuArray.push(item)
                }            
            })
            // 路由的动态添加
            menuArray.forEach((item)=>{
                router.addRoute('Main',item)
            })
            

        }
    }
}