<template>
  <div class="app-container">
    <search-grid
      :columns="tableHeader"
      :add-btn="true"
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
      :field-btn="false"
      @renderData="renderData"
    >


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
  data() {
    return {
      This: this,
      loading: false,
      addVisible: false,
      editVisible: false,
      dialogVisible: false,
      search: {},
      type: { index: false, pagination: true, operationColumn: true, multi: false },
      operationWidth: 160,
      tableInfo: { pageNum: 1, pageSize: 10, pageCount: 0 },
      tableData: [],
      tableHeader: [
        { titleName: 'ID', fieldName: 'id', width: '70px' },
        { titleName: '排序', fieldName: 'sort', width: '70px' },
        { titleName: '菜单名称', fieldName: 'menu_name', width: '150px', search: 'input' },
        { titleName: '菜单类型', fieldName: 'menu_type', width: '120', tag: true, tagRule: { 1: ['模块菜单'], 2: ['接口功能', 'danger'] }},
        { titleName: '菜单路由', fieldName: 'menu_url', width: '200px' },
        { titleName: '备注', fieldName: 'remark', width: '500px' },
        { titleName: '状态', fieldName: 'status', switch: true, fixed: true },
        { titleName: '创建时间', fieldName: 'create_at', width: '160px' }
      ],
      title: '菜单'
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
    }
  }
}
</script>
