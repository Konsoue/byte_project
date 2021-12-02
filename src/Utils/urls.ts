
const urlPrefix = '/api'

// 登陆接口
export const loginUrl: string = urlPrefix + "/user/login"

export type IstatisticsUrlProps = {
  getDataByDay: string;
  getDataByHou: string;
  getDataByXun: string;
  getDataByMonth: string;
  getDataBySeason: string;
  getDataByYear: string;
  getSiteList: string;
  getCityList: string;
  getCountyList: string;
  searchSite: string;
  getStatisticData: string
  getVisibleStatistics: string
  getScopeOrPoint: string
  getScope: string
}

// 统计数据页面接口
export const statisticsUrl: IstatisticsUrlProps = {
  getDataByDay: urlPrefix + '/data/getDataByDay',
  getDataByHou: urlPrefix + '/data/getDataByHou',
  getDataByXun: urlPrefix + '/data/getDataByXun',
  getDataByMonth: urlPrefix + '/data/getDataByMonth',
  getDataBySeason: urlPrefix + '/data/getDataBySeason',
  getDataByYear: urlPrefix + '/data/getDataByYear',
  getSiteList: urlPrefix + '/task/getSiteList',
  getCityList: urlPrefix + '/task/getCityList',
  getCountyList: urlPrefix + '/task/getCountyList',
  searchSite: urlPrefix + '/task/searchSite',
  getStatisticData: urlPrefix + '/data/getStatisticData', // 获取通用的统计数据
  getVisibleStatistics: urlPrefix + '/statistics/getVisibleStatistics', // 获取用户可见的任务
  getScopeOrPoint: urlPrefix + '/statistics/getScopeOrPoint', // 获取统计项目查询位置某个层次(市/区/站点)涉及的所有地点
  getScope: urlPrefix + '/scope/getScope', // 搜索范围
}


export type IuserManagementProps = {
  getUserList: string,
  getDepartmentTree: string,
  getRoleList: string,
  addUser: string,
  updateUser: string,
  deleteUser: string,
  importUser: string,
  exportUser: string,
  exportUserTemplate: string
}
// 用户管理接口
export const userManagementUrl: IuserManagementProps = {
  getUserList: urlPrefix + '/user/getUserList', // 获取用户列表
  getDepartmentTree: urlPrefix + '/department/getDepartmentTree', // 获取部门树
  getRoleList: urlPrefix + '/role/getRoleList', // 获取角色列表
  addUser: urlPrefix + '/user/addUser', // 添加用户
  updateUser: urlPrefix + '/user/updateUser', // 更新用户
  deleteUser: urlPrefix + '/user/deleteUser', // 删除用户 
  importUser: urlPrefix + '/user/importUser', // 导入用户Exel文件
  exportUser: urlPrefix + '/user/exportUser', // 导出用户excel
  exportUserTemplate: urlPrefix + '/user/exportUserTemplate' // 获取导入用户的excel的模板
}
// 站点信息接口
export const siteUrl: string = urlPrefix + "/task/getSiteList"
// 汛期相关接口
export const floodSeasonUrls = {
  getFloodSeasonList: urlPrefix + '/floodSeason/getFloodSeasonList',  // 获取汛期列表
  addFloodSeason: urlPrefix + '/floodSeason/addFloodSeason',          // 添加汛期
  deleteFloodSeason: urlPrefix + '/floodSeason/deleteFloodSeason',    // 删除汛期
  exportFloodSeason: urlPrefix + '/floodSeason/exportFloodSeason',    // 导出汛期
  exportFloodSeasonTemplate: urlPrefix + '/floodSeason/exportFloodSeasonTemplate', // 导出汛期模板
  importFloodSeason: urlPrefix + '/floodSeason/importFloodSeason',    // 导入汛期
  updateFloodSeason: urlPrefix + '/floodSeason/updateFloodSeason',    // 更新汛期
}

// 角色管理url接口
export const roleManagementUrls = {
  getRoleList: urlPrefix + '/role/getRoleList',
  updateUserRole: urlPrefix + '/role/updateUserRole'
}

// 任务页面的接口
export const taskPageUrl = {
  getStatisticsList: '/api/statistics/getStatisticsList', // 获取任务列表信息
  deleteStatistics: '/api/statistics/deleteStatistics', //删除统计项目
  addStatistics: '/api/statistics/addStatistics', //添加统计项目
  updateStatistics: '/api/statistics/updateStatistics', // 更新统计项目
  getJobAbility: '/api/statistics/getJobAbility',
  getScope: '/api/scope/getScope',
  getUserList: '/api/user/getUserList', // 获取用户列表
  getStatisticsHistory: '/api/statistics/getStatisticsHistory' // 查询任务历史记录
}

// 部门管理页面
export const departmentManagementUrl = {
  getDepartmentTree: "/api/department/getDepartmentTree", //获取部门树
  getDepartmentList: '/api/department/getDepartmentList', // 获取部门列表
  deleteDepartment: '/api/department/deleteDepartmentBatch', // 删除部门
  addDepartment: '/api/department/addDepartment', // 添加部门
  updateDepartment: '/api/department/updateDepartment' // 更新部门
}
// 注册相关接口
export const registerUrl = {
  getDepartmentTree: urlPrefix + '/department/getDepartmentTree',  // 获取部门树
  registerUser: urlPrefix + '/user/register',  // 注册用户
}

// 我的申请相关接口
export const applicationUrl = {
  apply: urlPrefix + '/apply/apply',                    // 申请
  cloneApply: urlPrefix + '/apply/cloneApply',          // 克隆申请
  deleteApply: urlPrefix + '/apply/deleteApply',        // 删除申请
  getMyApplyList: urlPrefix + '/apply/getMyApplyList',  // 获取我的申请列表
  recallApply: urlPrefix + '/apply/recallApply',        // 撤回申请
  submitApply: urlPrefix + '/apply/submitApply',        // 提交申请
  updateApply: urlPrefix + '/apply/updateApply',        // 更新申请表
  getApplyDetail: urlPrefix + '/apply/getApplyDetail',  // 获取申请表单详情
  checkFamiliarApply: urlPrefix + '/apply/checkFamiliarApply' // 检查相似申请
}

export const approvalUrl = {
  getMyApproveList: urlPrefix + '/apply/getMyApproveList', //获取列表
  approveApply: urlPrefix + '/apply/approveApply', // 申请审批
  getApplyDetail: urlPrefix + '/apply/getApplyDetail', //获取详情
  recallApply: urlPrefix + '/apply/recallApprove', // 撤回审批
}

// 与文件上传下载相关的接口
export const fileUrl = {
  upload: urlPrefix + '/file/upload',     // 上传文件
  download: urlPrefix + '/file/download', // 文件下载
  requestDownload: urlPrefix + '/file/requestDownload',  // 请求 token（可设置时效）
}

// 数据可视化图表接口
export const graphUrl = {
  temperatureKLineDiagram: '/api/graph/temperatureKLineDiagram',      // 温度K线图
  siteSectionRainCount: '/api/graph/siteSectionRainCount',      // 某段时间和雨量在某个区间的雨量分布
  siteRainCount: '/api/graph/siteRainCount',      // 某站点日雨量分布
  monthAverageTemperatureCount: '/api/graph/monthAverageTemperatureCount',      // 31天每天平均温度箱形图
  monthTemperatureCount: '/api/graph/monthTemperatureCount',      // 31天内温度折线图
  yearTemperatureCount: '/api/graph/yearTemperatureCount',      // 温度折线图
  yearlyTemperatureCount: '/api/graph/yearlyTemperatureCount',      // 历年温度折线图
  rainfallStereogram: '/api/graph/rainfallStereogram',      // 雨量立体图
  seasonAndMonthAndXunRainCount: '/api/graph/seasonAndMonthAndXunRainCount',      // 年度雨量时间分布饼图
  weekAndHourRainCount: '/api/graph/weekAndHourRainCount',      // 环形散点图
  seasonAndMonthRainCount: '/api/graph/seasonAndMonthRainCount',      // 季、月雨量
  weekRainCount: '/api/graph/weekRainCount',      // 过去一周的雨量
  monthRainCount: '/api/graph/monthRainCount',      // 31天雨量分布
  yearRainCount: '/api/graph/yearRainCount',      // 降雨量时间曲线（从1月1日到今天）
  yearlyRainCount: '/api/graph/yearlyRainCount',      // 历年雨量累计
  temperatureStereoHistogram: '/api/graph/temperatureStereoHistogram', // 温度立体图
  citiesYearTemperature: '/api/graph/citiesYearTemperature', // 温度综合图
  citiesYearRain: '/api/graph/citiesYearRain', // 雨量综合图
}

export const messageManagerUrls = {
  updateSendMessage: "/api/shortMessage/updateSendMessage", // 更新短信信息
  importPhoneNumberExcel: "/api/shortMessage/importPhoneNumberExcel", // 短信信息模板
  getSendMessageHistory: "/api/shortMessage/getSendMessageHistory", // 查看发送成功的任务执行历史
  getMessageJobStatus: "/api/shortMessage/getMessageJobStatus", // 查看短信任务信息状态
  getAllTarget: "/api/shortMessage/getAllTarget", // 分页查看可发送对象
  exportPhoneNumberTemplate: "/api/shortMessage/exportPhoneNumberTemplate", // 导出手机号信息模板
  deleteSendMessage: "/api/shortMessage/deleteSendMessage", // 停止短信定时任务
  deletePhoneNumberMessage: "/api/shortMessage/deletePhoneNumberMessage", // 批量删除可发送对象
  addSendMessage: "/api/shortMessage/addSendMessage" // 添加/启动 发送短信任务
}