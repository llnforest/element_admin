<template>
  <add-or-edit
    ref="add_or_edit"
    :title="title"
    :edit="true"
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
  name: 'EditDrawer',
  components: { AddOrEdit },
  props: {
  },
  data() {
    return {
      title: '',
      rule: [
        {
          type: 'input',
          field: 'name',
          title: '商品名称',
          value: 'form-create',
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
          value: [0, 1, 2, 3],
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
    initDrawer(param) {
      this.rule.forEach((item, index) => {
        if (typeof (param[item.field]) !== 'undefined') {
          item.value = param[item.field]
        }
      })
      console.log(param)
      this.$nextTick(() => {
        this.$refs.add_or_edit.init()
      })
    },
    refreshList(item) {
      this.$parent.editVisible = false
    }
  }
}
</script>

