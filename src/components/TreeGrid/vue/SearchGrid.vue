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
            align="right">
          </el-date-picker>
        </el-form-item>
      </template>
      <el-button size="small" type="primary" @click="searchEvent">搜索</el-button>
      <el-button size="small" type="danger">导出</el-button>
      <el-button size="small" type="success">添加</el-button>
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
        }]
      },

    }
  },
  methods: {
    searchEvent() {
      this.$parent.renderData()
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
