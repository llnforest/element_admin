<template>
  <div class="search_grid" ref="search_grid">
    <el-form :inline="true" :model="search" label-width="80px" size="small">
      <template v-for="(column, index) in columns">
        <el-form-item :label="column.titleName" v-if="column.search === 'input'">
          <el-input class="search-item" v-model="search[column.fieldName]" :placeholder="'请输入' + column.titleName"></el-input>
        </el-form-item>
        <el-form-item :label="column.titleName" v-else-if="column.search === 'select'">
          <el-select class="search-item" v-model="search[column.fieldName]" :placeholder="'请选择' + column.titleName">
            <el-option
              v-for="(item,selectKey) in column.options"
              :key="selectKey"
              :label="item"
              :value="selectKey">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="column.titleName" v-else-if="column.search === 'time'">
          <el-date-picker
            class="search-item"
            v-model="search[column.fieldName]"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            align="right">
          </el-date-picker>
        </el-form-item>
      </template>
      <el-form-item>
        <el-button size="small" type="primary" @click="searchEvent" v-if="searchBtn">搜索</el-button>
        <el-button size="small" type="danger" @click="exportEvent" v-if="exportBtn && checkAuth(this,'table/export')">导出</el-button>
        <el-button size="small" type="success" @click="addEvent" v-if="addBtn && checkAuth(this,'table/add')">添加</el-button>
        <slot name="btn_area"></slot>
      </el-form-item>
    </el-form>

  </div>
</template>
<script>

export default {
  name: 'SearchGrid',
  props: {
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
    //  这是相应的字段展示，查询
    search: {
      type: Object,
      default() {
        if (typeof (this.$parent.search) == 'object') {
          return this.$parent.search
        } else {
          return {}
        }
      }
    },
    addBtn: {
      type: Boolean,
      default() {
        return true
      }
    },
    addPath: {
      type: String,
      default() {
        const pathArr = this.$route.path.split('/')
        return pathArr[pathArr.length - 2] + '/add'
      }
    },
    exportBtn: {
      type: Boolean,
      default() {
        return false
      }
    },
    searchBtn: {
      type: Boolean,
      default() {
        let _default = false
        this.columns.forEach((item, index) => {
          if (typeof (item.search) !== 'undefined') {
            _default = true
          }
        })
        return _default
      }
    }
  },
  data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一年',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 365)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  methods: {
    searchEvent() {
      this.$parent.tableInfo.pageNum = 1
      this.$parent.renderData()
    },
    exportEvent() {
      if (typeof (this.$parent.exportEvent) === 'undefined') {
        this.$parent.exportEvent()
      } else {
        // TODO
        this.$router.push({ path: 'output' })
      }
    },
    addEvent() {
      this.$parent.addVisible = true
      this.$nextTick(() => {
        this.$parent.$refs.add_drawer.title = '新增' + this.$parent.title
        this.$parent.$refs.add_drawer.initDrawer()
      })
    }
  }

}
</script>
<style lang="scss">
  .el-form-item{
    margin-bottom:6px;
  }
  .el-form-item__label{
    font-weight: 100;
    padding: 0 8px 0 0;
  }

</style>
