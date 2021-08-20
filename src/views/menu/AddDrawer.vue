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
    initDrawer() {
      this.$nextTick(() => {
        this.$refs.add_or_edit.init()
      })
    },
    refreshList(item) {
      this.$parent.addVisible = false
    }
  }
}
</script>

