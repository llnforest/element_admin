import request from '@/utils/request'
export function checkAuth(_this, path) {
  return true
  if (_this.$store.state.permission.auth.indexOf(path) === -1) {
    return false
  } else {
    return true
  }
}

export function renderHeader(_this) {
  let headerPath = ''
  if (typeof (_this.indexPath) !== 'undefined') {
    headerPath = _this.indexPath
  } else {
    const pathArr = _this.$route.path.split('/')
    console.log(pathArr)
    headerPath = pathArr[pathArr.length - 2] + '/header'
  }
  request.post(headerPath, {}).then(res => {
    // eslint-disable-next-line eqeqeq
    if (res.code === 0) {

      _this.tableHeader = [
        { titleName: '学员姓名', fieldName: 'name', search: 'input' },
        { titleName: '年龄', fieldName: 'age', tag: true },
        { titleName: '性别', fieldName: 'sex', tag: true, tagRule: { 1: ['男'], 2: ['女', 'danger'], 0: ['未知', 'warning'] }},
        { titleName: '手机号码', fieldName: 'phone', width: '120px' },
        { titleName: '身份证号码', fieldName: 'id_code', width: '180px' },
        { titleName: '归属驾校', fieldName: 'school_name', width: '200px' },
        { titleName: '驾校地址', fieldName: 'school_address', width: '500px' },
        { titleName: '学员状态', fieldName: 'status', switch: true, fixed: true, search: 'select', options: { 0: '禁用', 1: '正常' }},
        { titleName: '创建时间', fieldName: 'create_time', width: '160px', search: 'time' }
      ]
    } else {
      _this.$message.error('网络异常')
    }
  })
}

export function renderPage(_this) {
  console.log(_this.search)
  console.log(_this.tableInfo)

  // const searchData = _this.search
  // searchData.page_num = _this.tableInfo.pageNum
  // searchData.page_size = _this.tableInfo.pageSize
  Object.assign(_this.search, _this.tableInfo)
  let listPath = ''
  if (typeof (_this.listPath) !== 'undefined') {
    listPath = _this.indexPath
  } else {
    const pathArr = _this.$route.path.split('/')
    console.log(pathArr)

    listPath = pathArr[pathArr.length - 2] + '/list'
  }
  _this.loading = true
  request.post(listPath, _this.search).then(res => {
    _this.loading = false
    // eslint-disable-next-line eqeqeq
    if (res.code === 0) {
      _this.tableData = res.data.list
      if (typeof (res.data.total) === 'undefined') {
        _this.tableInfo.pageCount = res.data.pageCount
        console.log(_this.tableInfo.pageCount)
      } else {
        _this.tableInfo.total = res.data.total
      }
      _this.tableData = res.data.list
      // _this.tableData = [
      //   { 'id': 1, 'name': '邱缘', sex: 0, 'age': 'good', 'phone': '13987321031', 'id_code': '342425198929112001', 'school_name': '嘻哈驾校', 'school_address': '合肥市蜀山区创新大道100号', 'status': 1, 'create_time': '2021-04-2 11:10:01' },
      //   { 'id': 1, 'name': '邱缘', sex: 0, 'age': 'bad', 'phone': '13987321031', 'id_code': '342425198929112001', 'school_name': '嘻哈驾校', 'school_address': '合肥市蜀山区创新大道100号', 'status': 0, 'create_time': '2021-04-2 11:10:01' },
      //   { 'id': 1, 'name': '邱缘', sex: 1, 'age': 'good', 'phone': '13987321031', 'id_code': '342425198929112001', 'school_name': '嘻哈驾校', 'school_address': '合肥市蜀山区创新大道100号', 'status': 1, 'create_time': '2021-04-2 11:10:01' }
      //
      // ]
    } else {
      _this.$message.error('网络异常')
    }
  })
}
