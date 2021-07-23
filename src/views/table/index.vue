<template>
  <div class="app-container">
    <tree-grid
      :columns="tableHeader"
      :dataSource="tableData"
      :info="tableInfo"
      :loading="loading"
      :type="{index:true,pagination:true,operationColumn:true}"
      :border="true"
      :delBtn="true"
      @pageChange="pageChange"
      @switchChange="switchChange"
      @delEvent="delEvent"
      @editEvent="editEvent"
    >
      <template slot="name_header" slot-scope="{scope,row,column}">学员姓名</template>
      <template slot="name_body" slot-scope="{scope,row,column}">    <span>{{row[column.fieldName]}}-{{row.id}}</span>  </template>




    </tree-grid>
    <el-drawer
      title="我嵌套了 Form !"
      :visible.sync="dialog"
      direction="ltr"
      custom-class="demo-drawer"
      ref="drawer"
    >

    </el-drawer>
  </div>



</template>

<script>
import { getList } from '@/api/table'
import TreeGrid from '@/components/TreeGrid/vue/TreeGrid'

export default {
  components: { TreeGrid },
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
      dialog:false,
      loading: false,
      tableHeader: [
        { titleName: '姓名', fieldName: 'name'},
        { titleName: '年龄', fieldName: 'age',tag:true },
        { titleName: '性别', fieldName: 'sex',tag:true,tagRule:{1:['男'],2:['女','danger'],3:['未知','warning']} },
        { titleName: '手机号码', fieldName: 'phone',width:'120px' },
        { titleName: '身份证号码', fieldName: 'id_code',width:'180px' },
        { titleName: '归属驾校', fieldName: 'school_name',width:'200px' },
        { titleName: '驾校地址', fieldName: 'school_address',width:'500px' },
        { titleName: '状态', fieldName: 'status',switch:true,fixed:true },
        { titleName: '创建时间', fieldName: 'create_time',width:'160px'},
      ],
      tableData: [
        {'id': 1, 'name': '邱缘',sex:3, 'age': 31, 'phone': '13987321031', 'id_code': '342425198929112001', 'school_name': '嘻哈驾校', 'school_address': '合肥市蜀山区创新大道100号', 'status': 1, 'create_time': '2021-04-2 11:10:01' },
        {'id': 1, 'name': '邱缘',sex:2, 'age': 31, 'phone': '13987321031', 'id_code': '342425198929112001', 'school_name': '嘻哈驾校', 'school_address': '合肥市蜀山区创新大道100号', 'status': 1, 'create_time': '2021-04-2 11:10:01' },
        {'id': 1, 'name': '邱缘',sex:1, 'age': 31, 'phone': '13987321031', 'id_code': '342425198929112001', 'school_name': '嘻哈驾校', 'school_address': '合肥市蜀山区创新大道100号', 'status': 1, 'create_time': '2021-04-2 11:10:01' }

      ],
      tableInfo: { pageNum: 2, pageSize: 10, total: 3 }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      // this.loading = true
      // getList().then(response => {
      //   this.list = response.data.items
      //   this.listLoading = false
      // })
    },
    switchChange (switchObj) {
      console.log("ok");
      //        console.log(`当前页: ${val}`);
      console.log(switchObj);
    },
    pageChange(pageNum,pageSize){
      console.log(pageNum)
      console.log("zzz");
    },
    editEvent(obj){
      console.log(obj);
      // this.dialog = true;
      console.log("修改成功")

    },
    delEvent(obj){
      console.log(obj);
      console.log("删除成功")
    },
  }
}
</script>
