<template>
  <div class="app-container">
    <search-grid
      :columns="tableHeader"
      :add-btn="true"
      :export-btn="true"
    />

    <tree-grid
      ref="tree_grid"
      :columns="tableHeader"
      :data-source="tableData"
      :operation-width="operationWidth"
      :info="tableInfo"
      :loading="loading"
      :type="type"
      :border="true"
      :edit-btn="true"
      :del-btn="true"
      :field-btn="true"
      @renderData="renderData"
    >
      <template slot="name_header" slot-scope="{ scope, row }">学员姓名</template>
      <template slot="name_body" slot-scope="{ scope, row, column }">    <span>{{ row[column.fieldName] }}-{{ row.id }}</span>  </template>

      <template slot="operation_slot" slot-scope="{scope, row }">
        <el-button v-if="checkAuth(This,'table/editField')" size="mini" type="primary" @click="editField(scope.row)">修改</el-button>
      </template>

    </tree-grid>
    <add-drawer v-if="addVisible" ref="add_drawer" />
    <edit-drawer v-if="editVisible" ref="edit_drawer" />
    <edit-field v-if="dialogVisible" ref="edit_field" />
  </div>
</template>
<script>
import { getList } from '@/api/table'
import TreeGrid from '@/components/TreeGrid/vue/TreeGrid'
import SearchGrid from '@/components/TreeGrid/vue/SearchGrid'
import AddOrUpdate from '@/components/TreeGrid/vue/ShowDialog'
import request from '@/utils/request'
import AddDrawer from '@/views/table/AddDrawer'
import EditDrawer from '@/views/table/EditDrawer'
import EditField from '@/views/table/EditField'

export default {
  components: { TreeGrid, SearchGrid, AddDrawer, EditDrawer, EditField },
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
      This: this,
      loading: false,
      addVisible: false,
      editVisible: false,
      dialogVisible: false,
      search: {},
      type: { index: true, pagination: true, operationColumn: true, multi: true },
      operationWidth: 300,
      tableInfo: { pageNum: 1, pageSize: 10, total: 3 },
      tableData: [],
      tableHeader: [
        { titleName: '学员姓名', fieldName: 'name', search: 'input' },
        { titleName: '年龄', fieldName: 'age', tag: true },
        { titleName: '性别', fieldName: 'sex', tag: true, tagRule: { 1: ['男'], 2: ['女', 'danger'], 0: ['未知', 'warning'] }},
        { titleName: '手机号码', fieldName: 'phone', width: '120px' },
        { titleName: '身份证号码', fieldName: 'id_code', width: '180px' },
        { titleName: '归属驾校', fieldName: 'school_name', width: '200px' },
        { titleName: '驾校地址', fieldName: 'school_address', width: '500px' },
        { titleName: '学员状态', fieldName: 'status', switch: true, fixed: true, search: 'select', options: { 0: '禁用', 1: '正常' }},
        { titleName: '创建时间', fieldName: 'create_time', width: '160px', search: 'time' }
      ],
      title: '表格',
      fieldData: {
        text: { 0: '开启', 1: '关闭' },
        field: 'status'
      }
    }
  },
  created() {
    this.renderData()
  },
  mounted() {
  },
  methods: {
    renderData() {
      this.renderPage(this)
    },
    // switchEvent(switchObj) {
    //   console.log('ok')
    //   //        console.log(`当前页: ${val}`)
    //   console.log(switchObj)
    // },
    editField(obj) {
      console.log(obj)
      console.log('editField')
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.edit_field.initDialog()
      })
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
