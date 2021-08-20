<template>
  <div id="add-or-edit-drawer" :style="'top:'+top" v-if="showDrawer">
    <!-- 内容主体区域 -->
    <el-drawer
      ref="drawer"
      :title="title"
      :visible.sync="showDrawer"
      direction="ltr"
      custom-class="add-or-edit-drawer"
      size="40%"
      :append-to-body="false"
      :modal-append-to-body="false"
    >
      <el-form ref="formData" label-width="80px">
        <slot name="form_area"></slot>
      </el-form>
      <form-create :rule="rule" v-model="fApi" :option="options"/>
      <div class="drawer-footer">
        <slot name="btn_area"></slot>
        <el-button size="small" v-if="add" type="success" @click="onAdd">添 加</el-button>
        <el-button size="small" v-if="edit" type="primary" @click="onEdit">编 辑</el-button>
        <el-button size="small" @click="showDrawer = false">关 闭</el-button>
      </div>
    </el-drawer>

  </div>
</template>

<script>
import request from '@/utils/request'

export default {
  name: 'AddOrEdit',
  props: {
    title: String,
    add: {
      type: Boolean,
      default() {
        return false
      }
    },
    edit: {
      type: Boolean,
      default() {
        return false
      }
    },
    options: {
      type: Object,
      default() {
        return {
          submitBtn: false,
          resetBtn: false
        }
      }
    },
    rule: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      showDrawer: false,
      fApi: {}
    }
  },
  computed: {
    top() {
      return this.$store.state.settings.fixedHeader ? '84px' : '0px'
    }
  },
  methods: {
    async init() {
      this.showDrawer = true
    },
    onAdd() {
      console.log('add!')
      let path
      const _this = this
      if (typeof (this.$parent.path) == 'undefined') {
        const pathArr = _this.$route.path.split('/')
        path = pathArr[pathArr.length - 2] + '/add'
      } else {
        path = _this.$parent.path
      }
      _this.renderFunc(_this, path)
    },
    onEdit() {
      console.log('edit!')
      let path
      const _this = this
      if (typeof (this.$parent.path) === 'undefined') {
        const pathArr = _this.$route.path.split('/')
        path = pathArr[pathArr.length - 2] + '/edit'
      } else {
        path = _this.$parent.path
      }
      _this.renderFunc(_this, path)
    },
    renderFunc(_this, path) {
      _this.fApi.validate((valid, fail) => {
        if (valid) {
          console.log('success')
          request.post(path, _this.fApi.form).then(res => {
            if (res.code === 0) {
              // 渲染当前页
              _this.$message.success(res.msg)
              _this.showDrawer = false
              _this.$parent.$parent.renderData()
            } else {
              _this.$message.error(res.msg)
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-drawer__wrapper{
  position: absolute;
}
.el-drawer__wrapper .drawer-footer{
  padding: 12px;
  position: absolute;
  bottom: 0;
  right: 0;
}
.el-drawer__body .el-form{
  padding: 0 10px;
  position: absolute;
  bottom: 80px;
  top: 70px;
  margin: auto;
  overflow-y: auto;
}

</style>
<style>
#add-or-edit-drawer{
  position:absolute;
  top:0;
  bottom:0;
  left:0;
  right:0;
  margin:auto

}
#add-or-edit-drawer .v-modal{
  position:absolute;
}
.add-or-edit-drawer .el-form-item__label{
  width:100px !important;
}
.add-or-edit-drawer .el-form-item__content{
  margin-left:100px !important;
}
</style>
