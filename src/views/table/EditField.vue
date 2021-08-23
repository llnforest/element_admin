<template>
  <ShowDialog
    ref="show_dialog"
    :title="title"
    :path="path"
    :rule="rule"
    @refreshFather="refreshList"
  >
    <template slot="form_area">
    </template>
    <template slot="btn_area">
    </template>
  </ShowDialog>

</template>

<script>

import ShowDialog from '@/components/TreeGrid/vue/ShowDialog'

export default {
  name: 'EditField',
  components: { ShowDialog },
  props: {
  },
  data() {
    return {
      title: '修改字段',
      path: 'table/editField',
      rule: [
        {
          type: 'input',
          field: 'goods_name',
          title: '商品名称',
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
          field: 'goods_name2',
          title: '商品名称',
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
          field: 'goods_name1',
          title: '商品名称',
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
          type: 'checkbox',
          field: 'label',
          title: '标签',
          value: [],
          options: [
            { label: '好用', value: 0 },
            { label: '快速', value: 1 },
            { label: '高效', value: 2 },
            { label: '全能', value: 3 },
          ]
        },
      ]
    }
  },
  methods: {
    initDialog() {
      this.$nextTick(() => {
        this.$refs.show_dialog.init()
      })
    },
    refreshList(item) {
      this.$parent.dialogVisible = false
    },
    sureEvent() {
      console.log('sureEvent')
    }
  }
}
</script>

