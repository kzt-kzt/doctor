import axios from '@/libs/api.request'
import qs from 'qs'

export const getTableData = () => {
  return axios.request({
    url: 'get_table_data',
    method: 'get'
  })
}

//注册
export const regist =(formData)=> {
  console.log(JSON.stringify(formData))
  const data = qs.stringify({
    name:formData.name,
    phone:formData.phone,
    username:formData.username,
    password:formData.password,
    confirmPwd:formData.confirmPwd,
    identityId:formData.identity,
    subjectId:formData.subjectId
  })
   //console.log(data)
  return axios.request({
    url: '/regist.zhtml',
//    emulateJSON:true,
    data,
    method: 'post'
  })
}
// 首页统计
export const statisticAllData = () => {
  const data = qs.stringify({})
  return axios.request({
    url: '/statistic/statisticAll',
    data,
    method: 'post'
  })
}
export const statisticAllNotice = () => {
  const data = qs.stringify({})
  return axios.request({
    url: '/statistic/statisticAllNotice',
    data,
    method: 'post'
  })
}
// 删除方法
export const commentDel = (url, ids) => {
  const data = qs.stringify({
    ids
  },{arrayFormat: 'brackets' })
  console.log(data)
  return axios.request({
    url:url,
    data,
    method: 'post'
  })
}

// 删除方法
export const commentDel1 = (url, ids,customDelText) => {
  const data = qs.stringify({
    ids,
    customDelText
  },{ indices: false })
  return axios.request({
    url:url,
    data,
    method: 'post'
  })
}

// 删除方法
export const commentDels = (url, ids,states) => {
  //alert(states)
  const data = qs.stringify({
    ids,
    states
  },{ indices: false })
  console.log('666666'+JSON.stringify(data))
  return axios.request({
    url:url,
    data,
    method: 'post'
  })
}
// 管理员列表
export const ManagerTableData = (pageSize, currentPage,searchText) => {
  const data = qs.stringify({
    pageSize,
    currentPage,
    name:searchText
  })
  return axios.request({
    url: '/manager/openManagerTable',
    data,
    method: 'post'
  })
}

export const removeCurrentPic = (formData) => {
  const data = qs.stringify({
    id : formData.id,
    headPic:formData.headPic
  })
  console.log(JSON.stringify(data))
  return axios.request({
    url: '/current/removeCurrentPic',
    data,
    method: 'post'
  })
}


// 教师列表
export const teacherTableData = (pageSize, currentPage,startTime,endTime,searchText) => {
  const data = qs.stringify({
    orderByClause:'createTime DESC',
    pageSize,
    currentPage,
    startTime,
    endTime,
    name:searchText,
    phone:searchText
  })
  return axios.request({
    url: '/teacher/openTeacherTable',
    data,
    method: 'post'
  })
}
//新增教师
export const addTeacher = (formData,targetKeys) => {
  console.log(JSON.stringify(targetKeys))
  const data = qs.stringify({
    name:formData.name,
    phone:formData.phone,
    password:formData.password,
    confirmPwd:formData.confirmPwd,
    subjectId:formData.subjectId,
    coursesIds:targetKeys
  },{ indices: false })
  return axios.request({
    url: '/teacher/addTeacher',
    data,
    method: 'post'
  })
}
//编辑教师
export const updateTeacher = (formData,targetKeys) => {
    console.log(JSON.stringify(targetKeys))
    const data = qs.stringify({
    id:formData.id,
    name:formData.name,
    phone:formData.phone,
    username: formData.username,
    password: formData.password,
    subjectId:formData.subjectId,
    coursesIds:targetKeys
  },{ indices: false })
    console.log(JSON.stringify(data))
  return axios.request({
    url: '/teacher/updateTeacher',
    data,
    method: 'post'
  })
}

//***************************************************************************************************************
//获取全部部门
export const getAllDoctor = (pageNum,pageSize) => {
   // console.log(JSON.stringify(formData))
    const data = qs.stringify({
 		 pageNum,
 		 pageSize
  })
  return axios.request({
    url: '/doctor/searchDepartment',
    data,
    method: 'post'
  })
}
//医生列表
export const doctorTableData = (pageNum,pageSize) => {
//	console.log(JSON.stringify(formData))
  const data = qs.stringify({
  	pageNum,
  	pageSize
  })
  return axios.request({
    url: '/doctor/getAllDoctor',
    data,
    method: 'post'
  })
}
//新增医生
export const addDoctor = (doctorDto) => {
  const data = qs.stringify({
    name:doctorDto.name,
    phone:doctorDto.phone,
    department:doctorDto.department,
    remark:doctorDto.remark
  })
    console.log(data)
  return axios.request({
    url: '/doctor/addDoctor',
    data,
    method: 'post'
  })
}
//编辑医生
export const updateDoctor = (doctorDto) => {
   /* console.log(JSON.stringify(targetKeys))*/
    const data = qs.stringify({
    id:doctorDto.id,
    name:doctorDto.name,
    phone:doctorDto.phone,
    department:doctorDto.department,
    remark:doctorDto.remark
  },{ indices: false })
 console.log(data)
  return axios.request({
    url: '/doctor/updateDoctor',
    data,
    method: 'post'
  })
}
// 模糊查询医生姓名
export const getDoctorName = (name,pageNum,pageSize) => {
  const data = qs.stringify({
  	pageNum,
    pageSize,
  	name
  })
  return axios.request({
    url: '/doctor/searchDoctorByName',
    data,
    method: 'post'
  })
}

//***********************************************************************************************************************
//获取全部课程
export const getAllClass = () => {
   // console.log(JSON.stringify(formData))
    const data = qs.stringify({
  
  })
  return axios.request({
    url: '/teacher/getAllClass',
    // data,
    method: 'post'
  })
}
//获取全部管理员名称
export const getManagerName = (query) => {
  var name = query;
   const data = qs.stringify({
      name
    })
  return axios.request({
    url: '/manager/getManagerName',
    data,
    method: 'post'
  })
}

// 学生列表
export const studentTableData = (pageSize, currentPage,startTime,endTime,searchText) => {
  const data = qs.stringify({
    orderByClause:'createtime DESC',
    pageSize,
    currentPage,
    startTime,
    endTime,
    name:searchText,
    phone:searchText
  })
  console.log(data);
  return axios.request({
    url: '/student/openStudentTable',
    data,
    method: 'post'
  })
}

//获取全部班级
export const getAllCourse = () => {
   // console.log(JSON.stringify(formData))
    const data = qs.stringify({
  
  })
  return axios.request({
    url: '/course/getAllCourse',
    // data,
    method: 'post'
  })
}

//获取全部班级
export const getAllTeacher = () => {
   // console.log(JSON.stringify(formData))
    const data = qs.stringify({
  
  })
  return axios.request({
    url: '/teacher/getAllTeacher',
    // data,
    method: 'post'
  })
}

// 当前登录人编辑
export const updateCurrent = (formData) => {
   //console.log('777'+JSON.stringify(formData));
  const data = qs.stringify({
    id:formData.userId,
    name:formData.name,
    phone:formData.phone,
//    oldpassword:formData.oldpassword,
//    password:formData.password,
//    confirmPwd:formData.confirmPwd,
    access:formData.access
  },{ indices: false })
  // console.log('666666'+JSON.stringify(data));
  return axios.request({
    url: '/current/updateCurrent',
    data,
    method: 'post'
  })
}

// 当前登录人编辑密码
export const updateCurrent1 = (formData) => {
   //console.log('777'+JSON.stringify(formData));
  const data = qs.stringify({
    id:formData.userId,
    oldPassword:formData.oldPassword,
    password:formData.newPassword,
    confirmPwd:formData.confirmPwd,
    access:formData.access
  },{ indices: false })
   //console.log('666666'+JSON.stringify(data));
  return axios.request({
    url: '/current/updateCurrent1',
    data,
    method: 'post'
  })
}

//新增学生
export const addStudent = (formData) => {
  //console.log(JSON.stringify(formData))
  const data = qs.stringify({
    name:formData.name,
    phone:formData.phone,
    password:formData.password,
    confirmPwd:formData.confirmPwd,
    courseId:formData.courseId
  })
  return axios.request({
    url: '/student/addStudent',
    data,
    method: 'post'
  })
}

//编辑教师
export const updateStudent = (formData) => {
   /* console.log(JSON.stringify(targetKeys))*/
    const data = qs.stringify({
    id:formData.id,
    name:formData.name,
    phone:formData.phone,
    courseId:formData.courseId
  },{ indices: false })
    console.log(JSON.stringify(data))
  return axios.request({
    url: '/student/updateStudent',
    data,
    method: 'post'
  })
}

//学生评分
export const customStudent = (formData,customText) => {
    const data = qs.stringify({
    studentId:formData.id,
    customNum:formData.customNum,
    customText
  })
    //console.log(JSON.stringify(data))
  return axios.request({
    url: '/student/customStudent',
    data,
    method: 'post'
  })
}

// 评分列表
export const customTableData = (pageSize, currentPage,searchText) => {
  const data = qs.stringify({
    pageSize,
    currentPage,
    name:searchText
  })
  return axios.request({
    url: '/student/openCustomTable',
    data,
    method: 'post'
  })
}

// 评分详情
export const recordTableData = (userId,tableCurrentPage) => {
  var studentId = userId;
  var currentPage = tableCurrentPage;
  const data = qs.stringify({
    studentId,
    pageSize:5,
    currentPage
    //name:searchText
  })
  return axios.request({
    url: '/student/recordTableData',
    data,
    method: 'post'
  })
}

// 成绩列表
export const resultsTableData = (pageSize, currentPage,startTime,endTime,searchText,examTimes,examStatus,states) => {
  console.log(JSON.stringify(states))
  var state = states
  const data = qs.stringify({
    orderByClause:'examTime DESC',
    examTimes,
    examStatus,
    pageSize,
    currentPage,
    startTime,
    endTime,
    state,
    name:searchText
  })
  console.log(JSON.stringify(data))
  return axios.request({
    url: '/results/openResultsTable',
    data,
    method: 'post'
  })
}

// 查询全部考试时间
export const selectExamTime = (state) => {
  //console.log('777'+JSON.stringify(state))
  const data = qs.stringify({
    state
  })
  return axios.request({
    url: '/results/selectExamTime',
    data,
    method: 'post'
  })
}
// 模糊查询学生姓名
export const serchStudentByName = (query) => {
  var studentName = query;
  //console.log(JSON.stringify(studentName))
  const data = qs.stringify({
   studentName
  })
  return axios.request({
    url: '/student/serchStudentByName',
    data,
    method: 'post'
  })
}

//新增成绩
export const addResult = (formData,strTime) => {
 // console.log(JSON.stringify(formData))
 var endTime = strTime;
  const data = qs.stringify({
    studentId:formData.studentId,
    chinese:formData.chinese,
    math:formData.math,
    english:formData.english,
    political:formData.political,
    history:formData.history,
    geographic:formData.geographic,
    examStatus:formData.examStatus,
    //examTime:formData.examTime,
    endTime
  })
  console.log(JSON.stringify(data))
  return axios.request({
    url: '/results/addResult',
    data,
    method: 'post'
  })
}

//编辑成绩
export const updateResult = (formData) => {
    const data = qs.stringify({
    id:formData.id,
    chinese:formData.chinese,
    math:formData.math,
    english:formData.english,
    political:formData.political,
    history:formData.history,
    geographic:formData.geographic
  })
    console.log(JSON.stringify(data))
  return axios.request({
    url: '/results/updateResult',
    data,
    method: 'post'
  })
}

export const savaResults = (url, resultsDto) => {
  let data = qs.stringify({
    resultsDto
  },{ indices: false })
  return axios.request({
    url:url,
    data,
    method: 'post'
  })
}
// 公告列表
export const NoticeTableData = (pageSize, currentPage,startTime,endTime,searchText,state) => {
  const data = qs.stringify({
    orderByClause:'createtime DESC',
    pageSize,
    currentPage,
    startTime,
    endTime,
    name:searchText,
    state
  })
  console.log('666666'+JSON.stringify(data))
  return axios.request({
    url: '/notice/openNoticeTable',
    data,
    method: 'post'
  })
}
//保存公告
export const addNotice = (formData,targetKeys) => {
  //console.log(JSON.stringify(targetKeys))
  const data = qs.stringify({
    notice:formData.notice,
    state:formData.state,
    rose:formData.rose,
    managerIds:targetKeys
  },{ indices: false })
  return axios.request({
    url: '/notice/addNotice',
    data,
    method: 'post'
  })
}

// 模糊查询学生姓名
export const getStudentName = () => {
  //var studentName = query;
  //console.log(JSON.stringify(studentName))
  const data = qs.stringify({
  })
  return axios.request({
    url: '/student/getStudentName',
    data,
    method: 'post'
  })
}

export const courseTableData = (pageSize, currentPage,searchText) => {
  //alert(2)
  const data = qs.stringify({
    //orderByClause:'createTime DESC',
    pageSize,
    currentPage,
    name:searchText,
    cname:searchText
  })
  return axios.request({
    url: '/course/openCourseTable',
    data,
    method: 'post'
  })
}
export const teacherArrTableData = (userId,tableCurrentPage) => {
  var courseId = userId;
  var currentPage = tableCurrentPage;
  const data = qs.stringify({
    courseId,
    pageSize:5,
    currentPage
    //name:searchText
  })
  return axios.request({
    url: '/course/teacherArrTableData',
    data,
    method: 'post'
  })
}

export const studenrArrTableData = (userId,tableCurrentPage) => {
  var courseId = userId;
  var currentPage = tableCurrentPage;
  const data = qs.stringify({
    courseId,
    pageSize:5,
    currentPage
    //name:searchText
  })
  return axios.request({
    url: '/course/studenrArrTableData',
    data,
    method: 'post'
  })
}

export const appoinPeople = (appoinId,courseId,state) => {
  const data = qs.stringify({
    appoinId,
    courseId,
    state
    //name:searchText
  })
  return axios.request({
    url: '/course/appoinPeople',
    data,
    method: 'post'
  })
}
//保存班级
export const addCourse = (formData,targetKeys) => {
  console.log(JSON.stringify(formData))
  const data = qs.stringify({
    className:formData.className,
    cname:formData.cname,
    remark:formData.remark,
    teacherIds:targetKeys
  },{ indices: false })
  return axios.request({
    url: '/course/addCourse',
    data,
    method: 'post'
  })
}
//保存班级
export const updateCourse = (formData,targetKeys) => {
  console.log(JSON.stringify(formData))
  const data = qs.stringify({
    id:formData.id,
    className:formData.className,
    cname:formData.cname,
    remark:formData.remark,
    teacherIds:targetKeys
  },{ indices: false })
  return axios.request({
    url: '/course/updateCourse',
    data,
    method: 'post'
  })
}

//查询消息数量
export const selectNewsCount = () => {
 
  return axios.request({
    url: '/news/selectNewsCount',
    //data,
    method: 'post'
  })
}

export const newsTableData = (pageSize, currentPage,startTime,endTime) => {
  //alert(2)
  const data = qs.stringify({
    orderByClause:'createTime DESC',
    pageSize,
    currentPage,
    startTime, 
    endTime
  })
  return axios.request({
    url: '/news/openNewsTable',
    data,
    method: 'post'
  })
}













export const getDragList = () => {
  return axios.request({
    url: 'get_drag_list',
    method: 'get'
  })
}

export const errorReq = () => {
  return axios.request({
    url: 'error_url',
    method: 'post'
  })
}

export const saveErrorLogger = info => {
  return axios.request({
    url: 'save_error_logger',
    data: info,
    method: 'post'
  })
}
