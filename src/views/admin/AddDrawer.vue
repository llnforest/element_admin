<template>
  <add-or-edit
    ref="add_or_edit"
    :title="title"
    :add="true"
    :rule="rule"
    @refreshFather="refreshList"
  >
    <template slot="form_area">
    </template>
    <template slot="btn_area">
    </template>
  </add-or-edit>

</template>

<script>

import AddOrEdit from '@/components/TreeGrid/vue/AddOrEdit'
import request from "@/utils/request";

export default {
  name: 'AddDrawer',
  components: { AddOrEdit },
  props: {
  },
  data() {
    return {
      title: '',
      rule: [
        {
          type: 'input',
          field: 'nickname',
          title: '人员昵称',
          value: '',
          on: {
            'on-change': function(){
              console.log('value 发生变化')
            }
          },
          validate: [
            {
              'trigger': 'blur',
              'mode': 'required',
              'message': '',
              'required': true,
              'type': 'string'
            }
          ]
        },
        {
          type: 'input',
          field: 'phone',
          title: '手机号码',
          value: '',
          validate: [
            {
              'trigger': 'blur',
              'mode': 'required',
              'message': '',
              'required': true,
              'type': 'number'
            }
          ]
        },
        {
          type: 'input',
          field: 'username',
          title: '登录账号',
          value: '',
          validate: [
            {
              'trigger': 'blur',
              'mode': 'required',
              'message': '',
              'required': true,
              'type': 'string'
            }
          ]
        },
        {
          type: 'input',
          field: 'password',
          title: '登录密码',
          value: '',
          validate: [
            {
              'trigger': 'blur',
              'mode': 'required',
              'message': '',
              'required': true,
              'type': 'string'
            }
          ]
        },
        {
          type: 'select',
          field: 'school_id',
          title: '选择驾校',
          value: '',
          on: {
            'change': this.schoolIdChange
          },
          props: {
            filterable: true,
            remote: true,
            remoteMethod: this.remoteMethod
          },
          options: [
          ],
          validate: [
            {
              trigger: 'change',
              mode: 'required',
              message: '',
              required: true,
              type: 'number'
            }
          ]
        },
        {
          type: 'checkbox',
          field: 'label',
          title: '所属权限',
          value: [],
          options: [
          ]
        },
      ]
    }
  },
  created() {
    // this.renderData()
  },
  methods: {
    schoolIdChange(val) {
      const _this = this
      request.post('index/getRoleListByLabel', { keywords: val }).then(res => {
        if (res.code === 0) {
          // 渲染当前页
          _this.rule[5].options = res.data
        }
      })
    },
    remoteMethod(val) {
      const _this = this
      request.post('index/getSchoolListByLabel', { keywords: val }).then(res => {
        if (res.code === 0) {
          // 渲染当前页
          _this.rule[4].options = res.data
        }
      })
    },
    renderData() {
      const _this = this
      console.log(_this.$refs.add_or_edit)
      _this.$refs.add_or_edit.fApi.on('school_id-on-change', (val) => {
        console.log(val)
      })
    },
    initDrawer() {
      const _this = this
      _this.$nextTick(() => {
        _this.$refs.add_or_edit.init()
        // console.log(this.$refs.add_or_edit)
        // console.log(this.$refs.add_or_edit._data.fApi)
        // this.renderData()
        // _this.$refs.add_or_edit.fApi.on('school_id-on-change', (val) => {
        //   console.log(val)
        // })
      })
    },
    refreshList(item) {
      this.$parent.addVisible = false
    }
  }
}
</script>

