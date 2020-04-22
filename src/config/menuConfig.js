const menuList = [
    {
        title: '首页',
        key: '/home',
        icon: 'home'
    },
    {
        title: '商品',
        key: '/products',
        icon: 'home',
        child:[
            {
                title: '品类管理',
                key: '/category',
                icon: 'home',
            },
            {
                title: '商品管理',
                key: '/product',
                icon: 'home',
            },
        ]
    },
    {
        title: '用户管理',
        key: '/user',
        icon: 'home',
    },
    {
        title: '角色管理',
        key: '/role',
        icon: 'home',
    },
    {
        title: '图形图表',
        key: '/charts',
        icon: 'home',
        child:[
            {
                title: '柱状图',
                key: '/chars/bar',
                icon: 'home',
            },
            {
                title: '折线图',
                key: '/chars/line',
                icon: 'home',
            },
            {
                title: '饼状图',
                key: '/chars/pie',
                icon: 'home',
            }
        ]
    },
];

export default menuList;