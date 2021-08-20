<template>
  <div id="show-dialog" :style="'top:'+top" v-if="showDialog">
    <!-- 内容主体区域 -->
    <el-dialog
      :title="title"
      :close-on-click-modal="false"
      :visible.sync="showDialog"
      :width="width"
      :show-close="true"
      :center="true"
      :modal-append-to-body="false"
      custom-class="show-dialog"
      >
      <el-form ref="formData" label-width="80px">
        <slot name="form_area"></slot>
      </el-form>
      <form-create :rule="rule" v-model="fApi" :option="options"/>
      <template slot="footer">
          <slot name="btn_area"></slot>
          <el-button size="mini" v-if="sureBtn && checkAuth(this,path)" type="success" @click="sureEvent">确 认</el-button>
          <el-button size="mini" @click="showDialog = false">关 闭</el-button>
      </template>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: 'ShowDialog',
  props: {
    title: {
      type: String,
      default() {
        return ''
      }
    },
    sureBtn: {
      type: Boolean,
      default() {
        return true
      }
    },
    width: {
      type: String,
      default() {
        return '40%'
      }
    },
    path: {
      type: String,
      default() {
        return ''
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
      showDialog: false,
      fApi: {},
    }
  },
  computed: {
    top() {
      return this.$store.state.settings.fixedHeader ? '84px' : '0px'
    }
  },
  methods: {
    async init() {
      this.showDialog = true
    },
    // 关闭对话框触发
    sureEvent() {
      // 子组件调用父组件方法，并传递参数
      this.fApi.validate((valid, fail) => {
        if (valid) {
          console.log('ok')
          this.$emit('sureEvent')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-dialog__wrapper{
  position: absolute;
}
</style>
<style>
#show-dialog{
  position:absolute;
  top:0;
  bottom:0;
  left:0;
  right:0;
  margin:auto

}
#show-dialog .v-modal{
  position: absolute;
}
.show-dialog .el-form-item__label{
  width:80px !important;
}
.show-dialog .el-form-item__content{
  margin-left:80px !important;
}
</style>
