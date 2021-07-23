<template>

  <el-table-column
    :align="align && column.align"
    :header-align="headerAlign && column.headerAlign"
    :label="column.titleName"
    :min-width="column.minWidth"
    :prop="column.fieldName"
    :resizable="resizable"
    :show-overflow-tooltip="true"
    :sortable="column.sortable"
    :width="column.width"
    :fixed="column.fixed === true?'right':column.fixed"
    class="TreeGridColumn"
    label-class-name="labelClass"
  >

    <!--当存在多级表头时递归渲染组件-->
    <template v-if="Array.isArray(column.children) && column.children.length > 0">
      <tree-grid-column
        :column="item"
        :data="data"
        :key="index"
        v-for="(item, index) in column.children"
      >
      </tree-grid-column>
    </template>

    <!--相关表头数据，包括可以自定义表头-->
    <template slot="header" slot-scope="scope">
      <!--表头插槽-->
      <slot :column="column" :index="scope.$index" :name="column.fieldName  + '_header'" :row="scope.row" :scope="scope"
            v-if="column.header_slot"></slot>
      <!--默认-->
      <span v-else>{{column.titleName}}</span>
    </template>
    <!--相关列数据-->
    <!--没有多级表头/最后一级则正常渲染列数据-->
    <template slot-scope="scope" v-if="!Array.isArray(column.children)">
      <!--对应插槽-->
      <slot :column="column" :index="scope.$index" :name="column.fieldName  + '_body'" :row="scope.row" :scope="scope"
            v-if="column.body_slot"></slot>

      <!--tag标签渲染-->
        <el-tag v-else-if="column.tag" :type=" column.tagRule?column.tagRule[scope.row[column.fieldName]][1] : '' ">
          {{column.tagRule?column.tagRule[scope.row[column.fieldName]][0] : scope.row[column.fieldName]}}
        </el-tag>
      <!--switch开关渲染-->

      <el-switch v-else-if="column.switch"
        v-model="scope.row[column.fieldName]"
        :active-value="1"
        :inactive-value="0"
        :disabled="column.switchDisable"
                 @change="switchChange($event,scope.row,column.fieldName)"
      >
      </el-switch>
      <!--表格列内容渲染 文字-->


      <span v-else>
            {{scope.row[column.fieldName]}}
      </span>
    </template>
  </el-table-column>
</template>

<script>

  export default {
    name: 'TreeGridColumn',
    props: {
      data: {
        type: Array,
        default () {
          return []
        }
      },
      // 表格对应表头对象
      column: {
        type: Object,
        default () {
          return {}
        }
      },
      // 对应列是否可以通过拖动改变宽度（需要在 el-table 上设置 border 属性为真）
      resizable: {
        type: Boolean,
        default() {
          return true;
        }
      },
      //表格对齐方式 left/center/right
      align: {
        type: String,
        default() {
          return 'left';
        }
      },
      //表头对齐方式 left/center/right
      headerAlign: {
        type: String,
        default() {
          return 'left';
        }
      }
    },
    data () {
      return {}
    },
    created () {
    },
    methods: {
      //  分页当前页变化
      switchChange (val,row,field) {
        //        console.log(`当前页: ${val}`);
        console.log(val);
        console.log(row);
        console.log(field);
        this.$emit('switchChange',{val,row,field})
      },

    }
  }

</script>

<style lang="scss">

</style>
