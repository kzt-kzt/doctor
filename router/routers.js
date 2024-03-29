import Main from '@/components/main'
import parentView from '@/components/parent-view'
/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面不会缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    /* meta: {
      hideInMenu: true,
      notCache: true
    }, */
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          // hideInMenu: true,
          title: '首页',
          // notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/myView/home/home.vue')
      }
    ]
  },
  {
    path: '/manager',
    name: '管理员',
    component: Main,
    meta: {
      hide: true,
      access: ['superAdmin']
    },
    children: [
      {
        path: 'manager',
        name: '管理员管理',
        meta: {
          icon: 'md-person',
          title: '管理员管理'
        },
        component: () => import('@/myView/manager/manager.vue')
      }
    ]
  },

  {
    path: '/notice',
    name: '公告通知',
    component: Main,
    meta: {
      access: ['superAdmin','teacher'],
      icon: 'md-volume-down',
      title: '公告通知'
    },
     children: [
      {
        path: 'notice',
        name: '公告通知列表',
        meta: {
          access: ['superAdmin','teacher'],
          icon: 'ios-microphone',
          title: '公告通知列表',
          hide: true
        },
        component: () => import('@/myView/notice/notice.vue')
      },
      {
        path: 'readNotice',
        name: '公告通知申请处理',
        meta: {
          access: ['superAdmin'],
          icon: 'ios-megaphone-outline',
          title: '公告通知申请处理'
        },
        component: () => import('@/myView/notice/readNotice.vue')
      }
    ]
  },
  {
    path: '/course',
    name: '班级管理',
    component: Main,
    meta: {
      hide: true
      //access: ['teacher']
    },
    children: [
      {
        path: 'course',
        name: '班级管理',
        meta: {
          icon: 'md-easel',
          title: '班级管理'
        },
        component: () => import('@/myView/course/course.vue')
      }
    ]
  },
    {
    path: '/doctor',
    name: '医生管理',
    component: Main,
    meta: {
      hide: true
      //access: ['teacher']
    },
    children: [
       {
        path: 'doctorse',
        name: '医生管理',
        meta: {
          icon: 'md-easel',
          title: '医生管理'
        },
        component: () => import('@/myView/doctor/doctorse.vue')
      }
    ]
  },
  {
    path: '/teacher',
    name: '教师管理',
    component: Main,
    meta: {
      hide: true
      //access: ['teacher']
    },
    children: [
      {
        path: 'teacher',
        name: '教师管理',
        meta: {
          icon: 'md-people',
          title: '教师管理'
        },
        component: () => import('@/myView/teacher/teacher.vue')
      }
    ]
  },
  {
    path: '/student',
    name: '学生管理',
    component: Main,
    meta: {
      icon: 'ios-people',
      title: '学生管理'
    },
     children: [
      {
        path: 'student',
        name: '学生列表',
        meta: {
          //access: ['superAdmin'],
          icon: 'md-contacts',
          title: '学生列表'
        },
        component: () => import('@/myView/student/student.vue')
      },
      {
        path: 'customStudent',
        name: '学生评分',
        meta: {
          icon: 'ios-star-half',
          title: '学生评分'
        },
        component: () => import('@/myView/student/customStudent.vue')
      }
    ]
  },
  {
    path: '/results',
    name: '成绩管理',
    component: Main,
    meta: {
      access: ['teacher','superAdmin','student'],
      title: '成绩管理',
      icon:'ios-card'
    },
    children: [
      {
         path: 'upload-excel',
         name: '导入学生成绩',
         meta: {
           icon: 'md-cloud-upload',
           title: '导入学生成绩EXCEL',
           access: ['teacher','superAdmin'],
           hide: true
         },
         component: () => import('@/myView/results/upload-excel.vue')
      },
      {
        path: 'results',
        name: '成绩编辑',
        meta: {
          icon: 'ios-book-outline',
          access: ['teacher','superAdmin'],
          title: '成绩编辑'
        },
        component: () => import('@/myView/results/results.vue')
      },
      {
        path: 'readResult',
        name: '成绩查询',
        meta: {
          icon: 'ios-clipboard',
          title: '成绩查询'
        },
        component: () => import('@/myView/results/readResult.vue')
      }
    ]
  },
{
    path: '/news',
    name: '消息中心',
    component: Main,
    meta: {
      hide: true
      //access: ['teacher']
    },
    children: [
      {
        path: 'news',
        name: '消息中心',
        meta: {
          icon: 'ios-notifications-outline',
          title: '消息中心'
        },
        component: () => import('@/myView/news/news.vue')
      }
    ]
  },
  {
    path: '/join',
    name: 'join',
    component: Main,
    children: [
      {
        path: 'join_page',
        name: '加入我们',
        meta: {
          icon: '_qq',
          title: '联系我们'
        },
        component: () => import('@/myView/join/join-page.vue')
      }
    ]
  },
  //   path: '',
  //   name: 'doc',
  //   meta: {
  //     title: '文档',
  //     href: 'https://lison16.github.io/iview-admin-doc/#/',
  //     icon: 'ios-book'
  //   }
  // },
 
  // {
  //   path: '/components',
  //   name: 'components',
  //   meta: {
  //     icon: 'logo-buffer',
  //     title: '组件'
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'count_to_page',
  //       name: 'count_to_page',
  //       meta: {
  //         icon: 'md-trending-up',
  //         title: '数字渐变'
  //       },
  //       component: () => import('@/view/components/count-to/count-to.vue')
  //     },
  //     {
  //       path: 'drag_list_page',
  //       name: 'drag_list_page',
  //       meta: {
  //         icon: 'ios-infinite',
  //         title: '拖拽列表'
  //       },
  //       component: () => import('@/view/components/drag-list/drag-list.vue')
  //     },
  //     {
  //       path: 'tables_page',
  //       name: 'tables_page',
  //       meta: {
  //         icon: 'md-grid',
  //         title: '多功能表格'
  //       },
  //       component: () => import('@/view/components/tables/tables.vue')
  //     },
  //     {
  //       path: 'split_pane_page',
  //       name: 'split_pane_page',
  //       meta: {
  //         icon: 'md-pause',
  //         title: '分割窗口'
  //       },
  //       component: () => import('@/view/components/split-pane/split-pane.vue')
  //     },
  //     {
  //       path: 'markdown_page',
  //       name: 'markdown_page',
  //       meta: {
  //         icon: 'logo-markdown',
  //         title: 'Markdown编辑器'
  //       },
  //       component: () => import('@/view/components/markdown/markdown.vue')
  //     },
  //     {
  //       path: 'editor_page',
  //       name: 'editor_page',
  //       meta: {
  //         icon: 'ios-create',
  //         title: '富文本编辑器'
  //       },
  //       component: () => import('@/view/components/editor/editor.vue')
  //     },
  //     {
  //       path: 'icons_page',
  //       name: 'icons_page',
  //       meta: {
  //         icon: '_bear',
  //         title: '自定义图标'
  //       },
  //       component: () => import('@/view/components/icons/icons.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/update',
  //   name: 'update',
  //   meta: {
  //     icon: 'md-cloud-upload',
  //     title: '数据上传'
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'update_table_page',
  //       name: 'update_table_page',
  //       meta: {
  //         icon: 'ios-document',
  //         title: '上传Csv'
  //       },
  //       component: () => import('@/view/update/update-table.vue')
  //     },
  //     {
  //       path: 'update_paste_page',
  //       name: 'update_paste_page',
  //       meta: {
  //         icon: 'md-clipboard',
  //         title: '粘贴表格数据'
  //       },
  //       component: () => import('@/view/update/update-paste.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/excel',
  //   name: 'excel',
  //   meta: {
  //     icon: 'ios-stats',
  //     title: 'EXCEL导入导出'
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'upload-excel',
  //       name: 'upload-excel',
  //       meta: {
  //         icon: 'md-add',
  //         title: '导入EXCEL'
  //       },
  //       component: () => import('@/view/excel/upload-excel.vue')
  //     },
  //     {
  //       path: 'export-excel',
  //       name: 'export-excel',
  //       meta: {
  //         icon: 'md-download',
  //         title: '导出EXCEL'
  //       },
  //       component: () => import('@/view/excel/export-excel.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/tools_methods',
  //   name: 'tools_methods',
  //   meta: {
  //     hide: true
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'tools_methods_page',
  //       name: 'tools_methods_page',
  //       meta: {
  //         icon: 'ios-hammer',
  //         title: '工具方法',
  //         beforeCloseName: 'before_close_normal'
  //       },
  //       component: () => import('@/view/tools-methods/tools-methods.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/i18n',
  //   name: 'i18n',
  //   meta: {
  //     hide: true
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'i18n_page',
  //       name: 'i18n_page',
  //       meta: {
  //         icon: 'md-planet',
  //         title: '国际化'
  //       },
  //       component: () => import('@/view/i18n/i18n-page.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/error_store',
  //   name: 'error_store',
  //   meta: {
  //     hide: true
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'error_store_page',
  //       name: 'error_store_page',
  //       meta: {
  //         icon: 'ios-bug',
  //         title: '错误收集'
  //       },
  //       component: () => import('@/view/error-store/error-store.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/error_logger',
  //   name: 'error_logger',
  //   meta: {
  //     hide: true,
  //     hideInMenu: true
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'error_logger_page',
  //       name: 'error_logger_page',
  //       meta: {
  //         icon: 'ios-bug',
  //         title: '错误收集'
  //       },
  //       component: () => import('@/view/single-page/error-logger.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/directive',
  //   name: 'directive',
  //   meta: {
  //     hide: true
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'directive_page',
  //       name: 'directive_page',
  //       meta: {
  //         icon: 'ios-navigate',
  //         title: '指令'
  //       },
  //       component: () => import('@/view/directive/directive.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/multilevel',
  //   name: 'multilevel',
  //   meta: {
  //     icon: 'md-menu',
  //     title: '多级菜单'
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'level_2_1',
  //       name: 'level_2_1',
  //       meta: {
  //         icon: 'md-funnel',
  //         title: '二级-1'
  //       },
  //       component: () => import('@/view/multilevel/level-2-1.vue')
  //     },
  //     {
  //       path: 'level_2_2',
  //       name: 'level_2_2',
  //       meta: {
  //         access: ['super_admin'],
  //         icon: 'md-funnel',
  //         showAlways: true,
  //         title: '二级-2'
  //       },
  //       component: parentView,
  //       children: [
  //         {
  //           path: 'level_2_2_1',
  //           name: 'level_2_2_1',
  //           meta: {
  //             icon: 'md-funnel',
  //             title: '三级'
  //           },
  //           component: () => import('@/view/multilevel/level-2-2/level-3-1.vue')
  //         }
  //       ]
  //     },
  //     {
  //       path: 'level_2_3',
  //       name: 'level_2_3',
  //       meta: {
  //         icon: 'md-funnel',
  //         title: '二级-3'
  //       },
  //       component: () => import('@/view/multilevel/level-2-3.vue')
  //     }
  //   ]
  // },
  {
    path: '/argu',
    name: 'argu',
    meta: {
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'params/:id',
        name: 'params',
        meta: {
          icon: 'md-flower',
          title: route => `动态路由-${route.params.id}`,
          notCache: true,
          beforeCloseName: 'before_close_normal'
        },
        component: () => import('@/view/argu-page/params.vue')
      },
      {
        path: 'query',
        name: 'query',
        meta: {
          icon: 'md-flower',
          title: route => `带参路由-${route.query.id}`,
          notCache: true
        },
        component: () => import('@/view/argu-page/query.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
