<template>
  <div class="tree_grid" ref="tree_grid">
    <div class="table-wrapper">
      <!--表格-->
      <el-table
        :border="border"
        :cell-class-name="handleCellClassName"
        :cell-style="handleCellStyle"
        :data="data"
        :highlight-current-row="type.single"
        :max-height="maxHeight"
        :row-key="rowKey"
        :row-style="handleRowStyle"
        :show-summary="type.showSummary"
        :span-method="handleSpan"
        :stripe="stripe"
        :summary-method="handleSummary"
        :show-header="true"
        @current-change="handleCurrentChange"
        @header-click="handleheaderClick"
        @row-click="handleRowClick"
        @row-dblclick="handleRowDblclick"
        @selection-change="handleSelectionChange"
        @sort-change="sortChange"
        class="table"
        header-row-class-name="table_header"
        ref="table"
        size="medium"
        v-loading="loading"
      >
        <!--左侧序号等列-->
        <!--序号-->
        <el-table-column
          :align="align"
          :header-align="headerAlign"
          :resizable="resizable"
          label="序号"
          type="index"
          v-if="type.index && data && data.length"
          width="70"
        >
        </el-table-column>
        <!--是否多选-->
        <el-table-column
          :align="align"
          :header-align="headerAlign"
          :resizable="resizable"
          type="selection"
          v-if="type.multi && data && data.length"
          width="55"
        >
        </el-table-column>
        <!--左侧序号等列-->

        <!--表格内容-->
        <template v-if="data && data.length">
          <tree-grid-column
            :align="align"
            :column="column"
            :data="data"
            :header-align="headerAlign"
            :key="index"
            :resizable="resizable"
            @switchEvent="switchEvent"
            v-for="(column, index) in columns"
            >

            <template :slot="column.fieldName + '_header'" slot-scope="{scope,index}">
              <slot
                :column="column"
                :index="index"
                :name="column.fieldName  + '_header'"
                :row="scope.row"
                :scope="scope"></slot>
            </template>

            <template :slot="column.fieldName + '_body'" slot-scope="{scope,index}">
              <slot
                :column="column"
                :index="index"
                :name="column.fieldName  + '_body'"
                :row="scope.row"
                :scope="scope"></slot>
            </template>
          </tree-grid-column>

          <!--操作列-->
          <el-table-column
            :align="align"
            :header-align="headerAlign"
            :resizable="resizable"
            :width="operationWidth"
            fixed="right"
            label="操作"
            v-if="type.operationColumn && data && data.length"
          >
            <template slot-scope="scope">
              <el-button size="small" type="primary" v-if="editBtn" @click="editEvent(scope.row)">编辑</el-button>
              <el-button size="small" :type="scope.row[fieldData.field] == Object.keys(fieldData.text)[0]? 'success':'danger' " v-if="fieldBtn && Object.keys(fieldData).length !== 0" @click="fieldEvent(scope.row)">
                {{ fieldData.text[scope.row[fieldData.field]] }}
              </el-button>
              <slot :index="scope.$index" :row="scope.row" :scope="scope" name="operation_slot"></slot>
              <el-button size="small" v-if="delBtn" @click="delEvent(scope.row,scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </template>

      </el-table>
    </div>

    <!--分页-->
    <el-pagination
      :current-page="info.pageNum"
      :page-size="info.pageSize"
      :page-sizes="[2,10,20,50,100]"
      :total="info.total"
      @current-change="currentChange"
      @size-change="sizeChange"
      class="pagination"
      layout="total, sizes, prev, pager, next, jumper"
      next-text="下一页"
      prev-text="上一页"
      ref="pagination"
      v-if="type.pagination"
    >
    </el-pagination>

  </div>
</template>
<script>

import TreeGridColumn from './TreeGridColumn'
import request from '@/utils/request'

export default {
  name: 'TreeGrid',
  components: { TreeGridColumn },
  props: {
    indexPath: {
      type: String,
      default() {
        if (typeof (this.$parent.indexPath) == 'string') {
          return this.$parent.indexPath
        } else {
          const pathArr = this.$route.path.split('/')
          return pathArr[pathArr.length - 2] + '/index'
        }
      }
    },
    editBtn: {
      type: Boolean,
      default() {
        return true
      }
    },
    editPath: {
      type: String,
      default() {
        if (typeof (this.$parent.editPath) == 'string') {
          return this.$parent.editPath
        } else {
          const pathArr = this.$route.path.split('/')
          return pathArr[pathArr.length - 2] + '/edit'
        }
      }
    },
    delBtn: {
      type: Boolean,
      default() {
        return true
      }
    },
    delPath: {
      type: String,
      default() {
        if (typeof (this.$parent.delPath) == 'string') {
          return this.$parent.delPath
        } else {
          const pathArr = this.$route.path.split('/')
          return pathArr[pathArr.length - 2] + '/del'
        }
      }
    },
    fieldBtn: {
      type: Boolean,
      default() {
        return false
      }
    },
    fieldPath: {
      type: String,
      default() {
        if (typeof (this.$parent.fieldPath) == 'string') {
          return this.$parent.fieldPath
        } else {
          const pathArr = this.$route.path.split('/')
          return pathArr[pathArr.length - 2] + '/editField'
        }
      }
    },
    fieldData: {
      type: Object,
      default() {
        if (typeof (this.$parent.fieldData) == 'object') {
          return this.$parent.fieldData
        } else {
          return {}
        }
      }
    },
    switchPath: {
      type: String,
      default() {
        if (typeof (this.$parent.fieldPath) == 'string') {
          return this.$parent.fieldPath
        } else {
          const pathArr = this.$route.path.split('/')
          return pathArr[pathArr.length - 2] + '/editField'
        }
      }
    },
    //  表格loading状态
    loading: {
      type: Boolean,
      default() {
        return false
      }
    },
    //  这是相应的字段展示，表头
    columns: {
      type: Array,
      default() {
        return []
      }
    },
    //  这是数据源，内容
    dataSource: {
      type: Array,
      default() {
        return []
      }
    },
    //  表格分页相关数据
    info: {
      type: Object,
      default() {
        return { pageNum: 1, pageSize: 10, total: 0 }
      }
    },
    //  是否带有纵向边框
    border: {
      type: Boolean,
      default() {
        return false
      }
    },
    //  是否为斑马纹 table
    stripe: {
      type: Boolean,
      default() {
        return false
      }
    },
    //  对应列是否可以通过拖动改变宽度（需要在 el-table 上设置 border 属性为真）
    resizable: {
      type: Boolean,
      default() {
        return true
      }
    },
    //  pagination：显示分页，multi：多选，single：单选
    //  operationColumn：是否显示操作列
    //  showSummary：是否设置表格的合计行
    //  index：普通索引
    type: {
      type: Object,
      default() {
        return {
          pagination: true,
          multi: false,
          single: false,
          operationColumn: false,
          showSummary: false
        }
      }
    },
    //  Table 的最大高度
    maxHeight: {
      type: [String, Number],
      default() {
        return '100%'
      }
    },
    //  行数据的 Key，用来优化 Table 的渲染；在使用 reserve-selection 功能与显示树形数据时，该属性是必填的
    rowKey: {
      type: [Function, String]
    },
    //  单选表格默认选中行
    currentRow: {
      type: Object,
      default() {
        return null
      }
    },
    //  操作列的宽度
    operationWidth: {
      type: Number,
      default() {
        return 145
      }
    },
    //  自定义排序方法回调
    sortChangeFun: {
      type: Function,
      default() {

      }
    },
    // 表格对齐方式 left/center/right
    align: {
      type: String,
      default() {
        return 'left'
      }
    },
    // 表头对齐方式 left/center/right
    headerAlign: {
      type: String,
      default() {
        return 'left'
      }
    },
    //  行class回调方法
    handleRowClassName: {
      type: Function,
      default({ row, column, rowIndex, columnIndex }) {
      }
    },
    //  列class回调方法
    handleCellClassName: {
      type: Function,
      default({ row, column, rowIndex, columnIndex }) {
      }
    },
    //  行style回调方法
    handleRowStyle: {
      type: Function,
      default({ row, column, rowIndex, columnIndex }) {
      }
    },
    //  列style回调方法
    handleCellStyle: {
      type: Function,
      default({ row, column, rowIndex, columnIndex }) {
      }
    },
    // 合并行或列
    handleSpan: {
      type: Function,
      default({ row, column, rowIndex, columnIndex }) {
      }
    },
    // 当前行点击
    handleRowClick: {
      type: Function,
      default(row, column, event) {
      }
    },
    //  当前行双击
    handleRowDblclick: {
      type: Function,
      default(row, event) {
      }
    },
    //  合计相关处理函数
    handleSummary: {
      type: Function,
      default(param) {
        const { columns, data } = param
        const sums = []
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计'
            return
          }
          const values = data.map(item => Number(item[column.property]))
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0)
            //  sums[index] += ' 元'
          } else {
            sums[index] = 'N/A'
          }
        })
        return sums
      }
    }
  },
  data() {
    return {}
  },
  computed: {
    //  格式化数据源
    data() {
      const me = this
      return me.dataSource
    }
  },
  created() {

  },
  mounted() {
  },
  updated() {
    const _this = this
    if (_this.currentRow) {
      setTimeout(() => {
        _this.$refs.table.setCurrentRow(_this.currentRow)
      }, 50)
    }
  },
  methods: {
    //  分页每页条数变化
    sizeChange(val) {
      this.info.pageSize = val
      this.pageChange()
    },
    //   分页当前页变化
    currentChange(val) {
      if (val === this.info.pageNum) {
        return
      }
      this.info.pageNum = val
      this.pageChange()
    },
    pageChange() {
      this.$emit('renderData')
    },
    //   表格当前行发生变化（用于单选）
    handleCurrentChange(val) {
      this.$emit('singleSelection', val)
    },
    //   表格选项发生改变（用于多选）
    handleSelectionChange(val) {
      this.$emit('multipleSelection', val)
    },
    //  表格头标题点击
    handleheaderClick(column, event) {
    },
    //  当表格的排序条件发生变化的时候会触发该事件{ column, prop, order }
    sortChange({ column, prop, order }) {
      if (column) {
        if (order.indexOf('asc') > -1) {
          this.info.sortField = prop
          this.info.sortType = 'ASC'
        } else if (order.indexOf('desc') > -1) {
          this.info.sortField = prop
          this.info.sortType = 'DESC'
        }
      } else {
        this.info.sortField = ''
        this.info.sortType = ''
      }

      this.sortChangeFun()
    },

    // 修改事件
    editEvent(param) {
      console.log('edit')
      //         console.log(`当前页: ${val}`)
      console.log(param)
      this.$emit('editEvent', param)
    },
    // 删除事件
    delEvent(param, index) {
      console.log('del')
      this.loading = true
      if (this.$listeners['delEvent']) {
        this.$emit('delEvent', param)
      } else {
        const _this = this
        request.post(this.delPath, { id: param.id }).then(res => {
          // eslint-disable-next-line eqeqeq
          if (res.code === 0) {
            _this.$message.success('删除成功')
            _this.dataSource.splice(index, 1)
            // 渲染当前页 TODO
          } else {
            _this.$message.error('删除失败')
          }
        })
      }
    },
    // 单个字段修改事件
    fieldEvent(param) {
      console.log('fieldEvent')
      //         console.log(`当前页: ${val}`)
      if (this.$listeners['fieldEvent']) {
        this.$emit('fieldEvent', param)
      } else {
        const _this = this
        const other_value = param[_this.fieldData.field]
        let value = ''
        try {
          Object.keys(_this.fieldData.text).forEach((item, index) => {
            // eslint-disable-next-line eqeqeq
            if (other_value != item) {
              value = parseInt(item)
              throw new Error('EndIterative')
            }
          })
        } catch (e) {
          if (e.message !== 'EndIterative') throw e
        }
        request.post(this.fieldPath, { id: param.id, field: _this.fieldData.field, value: value }).then(res => {
          const btnText = _this.fieldData.text[param[_this.fieldData.field]]
          // eslint-disable-next-line eqeqeq
          if (res.code === 0) {
            _this.$message.success(btnText + '成功')
            // 渲染当前页
            param[_this.fieldData.field] = value
          } else {
            _this.$message.error(btnText + '失败')
          }
        })
      }
    },
    //  开关控件改变
    switchEvent(param) {
      console.log('switchEvent')
      //         console.log(`当前页: ${val}`)
      if (this.$listeners['switchEvent']) {
        this.$emit('switchEvent', param)
      } else {
        const _this = this
        request.post(this.switchPath, { id: param.row.id, field: param.field, value: param.val }).then(res => {
          // eslint-disable-next-line eqeqeq
          if (res.code === 0) {
            _this.$message.success('操作成功')
          } else {
            _this.$message.error('操作失败')
          }
        })
      }
    }
  }
}
</script>
<style lang="scss">
  .ms_tree_space {
    position: relative;
    top: 1px;
    display: inline-block;
    font-family: 'Glyphicons Halflings';
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    /*width: 18px;*/
    width: 14px;
    height: 14px;

    &::before {
      content: ""
    }
  }

  .el-select-dropdown__item {
    display: inherit;
    margin-left: 0;
    margin-right: 0;
  }

  .tree_grid {
    height: 100%;

    .table-wrapper {
      height: calc(100% - 50px);
    }

    /*width: auto !important*/

    .table {
      /*height: calc(100% - 50px)*/
      /*width: auto !important*/
      /*当前表头表格行类名*/
      .table_header {
        /*background-color: #EBEBEB*/
      }

      /*当前表头列标题的自定义类名*/
      .labelClass {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      /*当前表格body滚动条内容*/
      .el-table__body-wrapper {
        /*overflow-y: auto*/
      }
    }

    /*分页组件样式*/
    .pagination {
      text-align: right;
      padding-top: 20px;
    }

  }

</style>
