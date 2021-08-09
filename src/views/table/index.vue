<template>
  <div class="app-container">
    <search-grid
      :columns="tableHeader"
    >
    </search-grid>

    <tree-grid
      ref="tree_grid"
      :columns="tableHeader"
      :data-source="tableData"
      :operation-width="operationWidth"
      :info="tableInfo"
      :loading="loading"
      :type="{index:true,pagination:true,operationColumn:true}"
      :border="true"
      :edit-btn="true"
      :del-btn="true"
      :field-btn="true"
      @renderData="renderData"
      @switchChange="switchChange"
    >
      <template slot="name_header" slot-scope="{ scope, row }">学员姓名</template>
      <template slot="name_body" slot-scope="{ scope, row, column }">    <span>{{ row[column.fieldName] }}-{{ row.id }}</span>  </template>
      <template slot="operation_slot" slot-scope="{scope, row }">
        <el-button size="small" type="primary" @click="editField(scope.row)">修改</el-button>
      </template>

    </tree-grid>
    <el-drawer
      ref="drawer"
      title="我嵌套了 Form !"
      :visible.sync="dialog"
      direction="ltr"
      custom-class="demo-drawer"
    />
  </div>

</template>

<script>
import { getList } from '@/api/table'
import TreeGrid from '@/components/TreeGrid/vue/TreeGrid'
import SearchGrid from '@/components/TreeGrid/vue/SearchGrid'
import request from '@/utils/request'
import { renderHeader, renderData } from '@/utils/utils'

export default {
  components: { TreeGrid, SearchGrid },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      dialog: false,
      loading: false,
      operationWidth: 300,
      fieldData: {
        text: { 0: '开启', 1: '关闭' },
        field: 'status'
      },
      search: {
        // value1: '',
        // value2: '',
        // input: '',
        // value: '',
      },
      tableHeader: [],
      tableData: [],
      tableInfo: { pageNum: 1, pageSize: 10, total: 3 }
    }
  },
  created() {
    console.log(this.$route.path)
    this.renderHeader()
  },
  mounted() {
    this.renderData()
  },
  methods: {
    renderHeader() {
      renderHeader(this)
    },
    renderData() {
      var _this = this
      request.post('table/list', {}).then(res => {
        // eslint-disable-next-line eqeqeq
        if (res.code === 0) {
          _this.tableData = [
            { 'id': 1, 'name': '邱缘', sex: 0, 'age': 'good', 'phone': '13987321031', 'id_code': '342425198929112001', 'school_name': '嘻哈驾校', 'school_address': '合肥市蜀山区创新大道100号', 'status': 1, 'create_time': '2021-04-2 11:10:01' },
            { 'id': 1, 'name': '邱缘', sex: 0, 'age': 'bad', 'phone': '13987321031', 'id_code': '342425198929112001', 'school_name': '嘻哈驾校', 'school_address': '合肥市蜀山区创新大道100号', 'status': 0, 'create_time': '2021-04-2 11:10:01' },
            { 'id': 1, 'name': '邱缘', sex: 1, 'age': 'good', 'phone': '13987321031', 'id_code': '342425198929112001', 'school_name': '嘻哈驾校', 'school_address': '合肥市蜀山区创新大道100号', 'status': 1, 'create_time': '2021-04-2 11:10:01' },
            { 'id': 1, 'name': '邱缘', sex: 1, 'age': 'good', 'phone': '13987321031', 'id_code': '342425198929112001', 'school_name': '嘻哈驾校', 'school_address': '合肥市蜀山区创新大道100号', 'status': 1, 'create_time': '2021-04-2 11:10:01' }
          ]

        } else {
          _this.$message.error('网络异常')
        }
      })
      console.log(1)
      // renderData(this)
      // this.tableData = [
      //   { 'id': 1, 'name': '邱缘', sex: 0, 'age': 'good', 'phone': '13987321031', 'id_code': '342425198929112001', 'school_name': '嘻哈驾校', 'school_address': '合肥市蜀山区创新大道100号', 'status': 1, 'create_time': '2021-04-2 11:10:01' },
      //   { 'id': 1, 'name': '邱缘', sex: 0, 'age': 'bad', 'phone': '13987321031', 'id_code': '342425198929112001', 'school_name': '嘻哈驾校', 'school_address': '合肥市蜀山区创新大道100号', 'status': 0, 'create_time': '2021-04-2 11:10:01' },
      //   { 'id': 1, 'name': '邱缘', sex: 1, 'age': 'good', 'phone': '13987321031', 'id_code': '342425198929112001', 'school_name': '嘻哈驾校', 'school_address': '合肥市蜀山区创新大道100号', 'status': 1, 'create_time': '2021-04-2 11:10:01' }
      //
      // ]
      console.log(this.tableData)
    },
    switchChange(switchObj) {
      console.log('ok')
      //        console.log(`当前页: ${val}`)
      console.log(switchObj)
    },
    editField(obj) {
      // this.$refs.tree_grid.renderPage()
      console.log(obj)
      console.log('editField')
    },
    // editEvent(obj) {
    //   console.log(obj)
    //   // this.dialog = true;
    //   console.log('修改成功')
    // },
    delEvent(obj) {
      console.log('ok')
    }
  }
}
</script>
