<template>
  <div>
    <div class="col-xs-12">
      <div class="box">
        <div class="box-header" style="margin-top: 10px">
          <div class="row form-group">
            <div class="col-md-2">
              <div class="input-group input-group-sm">
                <input type="text" class="form-control pull-right" placeholder="Search" v-model="searchWord">
                <div class="input-group-btn">
                  <button type="submit" class="btn btn-default" @click="search()">
                    <i class="fa fa-search"></i>
                  </button>
                </div>
              </div>
            </div>
            <div class="col-md-2">
              <div class="input-group input-group-sm">
                <div class="input-group-addon">
                  <i class="fa fa-calendar"></i>
                </div>
                <date-picker class="input-group-sm" v-model="startDate" style="width: 100%"></date-picker>
              </div>
              <!-- /.input group -->
            </div>
            <div class="col-md-2">
              <div class="input-group input-group-sm">
                <div class="input-group-addon">
                  <i class="fa fa-calendar"></i>
                </div>
                <date-picker class="input-group-sm" v-model="endDate" style="width: 100%"></date-picker>
              </div>
              <!-- /.input group -->
            </div>
            <div class="col-md-3">
              <div class="input-group input-group-sm">
                <button type="submit" class="btn btn-default btn-sm" @click="search()">
                  <i class="fa fa-search"></i> 搜索
                </button>
              </div>
              <!-- /.input group -->
            </div>
          </div>
          <div class="row form-group">
            <div class="col-md-3">
              <div class="checkbox-inline">
                <input type="checkbox" v-model="checked" @change="changeAllChecked()">
                全部
              </div>
              <div class="checkbox-inline"  v-for="status in statusArray">
                <input type="checkbox" :value="status" v-model="checkedStatusArray" @change="changeChecked()">
                <span>{{status}}</span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-3">
              <div class="inline-button">
                <div class="box-tools">
                  <a class="btn btn-default btn-sm"
                     @click="updateAllLogcallStatus('待发起付款')">批量审核通过</a>
                </div>
              </div>
              <div class="inline-button">
                <div class="box-tools">
                  <a class="btn btn-default btn-sm"  data-toggle="modal"
                     data-target="#modal-join-payBatch">加入付费批次</a>
                </div>
              </div>
              <div class="inline-button">
                <div class="box-tools">
                  <a class="btn btn-default btn-sm" data-toggle="modal"
                     data-target="#modal-create-payBatch">生成付费批次</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- /.box-header -->
        <div class="box-body table-responsive">
          <table class="table table-bordered">
            <tbody>
            <tr class="header">
              <th>
                <input type="checkbox" v-model="isCheckedLogcall" @change="changeAllLogcall()">
              </th>
              <th>咨询类型</th>
              <th>日期</th>
              <th>专家</th>
              <th>项目编号</th>
              <th>项目名称</th>
              <th>PM</th>
              <th>客户</th>
              <th>状态</th>
              <th>时长</th>
              <th>付费类型</th>
              <th>支付金额</th>
              <th>账户</th>
              <th>操作</th>
            </tr>
            <tr v-show="logcallList.length==0">
              <td colspan="7">
                没有查到符合条件的记录
              </td>
            </tr>
            <tr v-for="item in logcallList">
              <td><input type="checkbox" v-model="item.checked" @change="changeAllChecked()"></td>
              <td><span v-text="item.consultationType"></span></td>
              <td><span v-text="item.date"></span></td>
              <td><span v-text="item.expertName"></span></td>
              <td><span v-text="item.projectId"></span></td>
              <td><span v-text="item.projectName"></span></td>
              <td><span v-text="item.pm"></span></td>
              <td><span v-text="item.client"></span></td>
              <td><span v-text="item.status"></span></td>
              <td><span v-text="item.time"></span></td>
              <td><span v-text="item.payType"></span></td>
              <td><span v-text="item.payMoney"></span></td>
              <td><span v-text="item.clientInvoiceName"></span></td>
              <td>
                <span v-if="item.mergePdfUrl"> <a class="btn btn-default btn-sm"
                                                  :href="item.mergePdfUrl">查看文件</a></span>
                <a class="btn btn-default btn-sm" href="#" @click="approveLogcallStatus(item.id)">通过</a>
                <a class="btn btn-default btn-sm" href="#" @click="logcall=item" data-toggle="modal"
                   data-target="#modal-reject">拒绝</a>
              </td>
            </tr>
            </tbody>
          </table>
          <pagination v-model="page" :perPage="10" :records="count" @paginate="getData" v-if="count"></pagination>
        </div>
      </div>
      <div class="modal fade" id="modal-reject">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title">拒绝理由</h4>
            </div>
            <div class="modal-body">
              <input type="text" class="form-control" placeholder="Enter ..." v-model="reason">
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default pull-left" data-dismiss="modal">取消</button>
              <button type="button" class="btn btn-primary" @click="rejectLogcallStatus(logcall.id)">拒绝</button>
            </div>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>
      <div class="modal fade" id="modal-join-payBatch">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title">拒绝理由</h4>
            </div>
            <div class="modal-body">
              <v-select :label="'payBatchName'" :options="payBatchList" v-model="payBatch" style="width: 100%;"
                        v-if="payBatchList.length>0">
              </v-select>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default pull-left" data-dismiss="modal">取消</button>
              <button type="button" class="btn btn-primary" @click="joinPayBatch()">提交</button>
            </div>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>
      <div class="modal fade" id="modal-create-payBatch">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title">生成付费批次并加入该批次</h4>
            </div>
            <div class="modal-body">
              <input type="text" class="form-control" placeholder="Enter ..." v-model="payBatchName">
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default pull-left" data-dismiss="modal">取消</button>
              <button type="button" class="btn btn-primary" @click="createPayBatch()">提交</button>
            </div>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>
    </div>
  </div>
</template>
<style scoped>
  .inline-button {
    width: 30%;
    display: inline-block
  }
</style>
<script>
  import {
    getLogcallList,
    updateRejectReason,
    updateLogcallStatus,
    getPayBatchList,
    joinPayBatch,
    createPayBatch
  } from '@/api/payment'
  import moment from 'moment'

  export default {
    name: 'audit',
    data () {
      return {
        checked: true,
        page: 1,
        count: 0,
        reason: '',
        isCheckedLogcall: false,
        logcallList: [],
        statusArray: [],
        payBatchList: [],
        payBatchName: '',
        payBatchId: null,
        payBatch:{},
        logcall: {},
        searchWord: '',
        checkedStatusArray: [],
        endDate: moment().format('YYYY-MM-DD'),
        startDate: moment().subtract(30, 'days').format('YYYY-MM-DD')
      }
    },
    components: {
      pagination: pagination
    },
    mounted () {
    },
    methods: {
      search: function () {
        let that = this;
        let data = {};
        data.searchWord = that.searchWord;
        data.startDate = that.startDate;
        data.endDate = that.endDate;
        data.statusArray = that.checkedStatusArray;
        console.log(data)
        this.getData();
        console.log(that.checkedStatusArray)
      },
      getData: function () {
        let option = {};
        getLogcallList(option)
          .then(res => {
            if (res.status === 200) {
              this.isCheckedLogcall = false;
              this.logcallList = res.data.data;
              this.count = res.data.count;
              console.log(this.logcallList)
              getPayBatchList().then(res => {
                this.payBatchList = res.data;
                this.payBatch = this.payBatchList[0]
              });
            }
          });
      },
      changeAllChecked: function () {
        if (this.checked) {
          this.checkedStatusArray = this.statusArray;
        } else {
          this.checkedStatusArray = []
        }
      },
      changeAllLogcall: function () {
        if (this.isCheckedLogcall) {
          this.logcallList.map(item => item.checked = true)
        } else {
          this.logcallList.map(item => item.checked = false)
        }
      },
      changeChecked: function () {
        if (this.checkedStatusArray === this.statusArray) {
          this.checked = true;
        } else {
          this.checked = false;
        }
      },
      updateAllLogcallStatus: function (ids, status) {
        if (ids.length > 0) {
          let params = {ids: ids, status: status};
          updateLogcallStatus(params).then(res => {
            if (res.status === 200) {
              this.$message.success("操作成功!");
              this.getData();
            }
          });
        }
      },
      approveAllLogcallStatus: function () {
        //批量审核通过
        let ids = [];
        this.logcallList.forEach(item => {
          if (item.checked) {
            ids.push(item.id);
          }
        })
        if (ids.length > 0) {
          this.updateAllLogcallStatus(ids, '待发起付款');
        }
      },
      approveLogcallStatus: function (id) {
        // 单个审核通过
        let ids = [id];
        this.updateAllLogcallStatus(ids, '待发起付款');
      },
      rejectLogcallStatus: function (id) {
        // 拒绝审核通过
        // 拒绝审核理由
        let params = {};
        params.id = id;
        params.reason = this.reason;
        updateRejectReason(params).then(res => {
          if (res.status === 200) {
            let ids = [id];
            this.updateAllLogcallStatus(ids, '待申请付款');
            $('#modal-reject').modal('hide');
          }
        });

      },
      joinPayBatch: function () {
        let ids = [];
        this.logcallList.forEach(item => {
          if (item.checked) {
            ids.push(item.id);
          }
        })
        if (ids.length > 0) {
          let params = {};
          params.ids = ids;
          params.payBatchId = this.payBatchId;
          joinPayBatch(params).then(res => {
            if (res.status === 200) {
              $('#modal-join-payBatch').modal('hide');
              this.$message.success("操作成功!");
              this.getData();
            }
          });
        } else {
          this.$alert('请先选择!')
        }
      },
      createPayBatch: function () {
        let ids = [];
        this.logcallList.forEach(item => {
          if (item.checked) {
            ids.push(item.id);
          }
        })
        if (ids.length > 0) {
          let params = {};
          params.payBatchName = this.payBatchName;
          createPayBatch(params).then(res => {
            if (res.status === 200) {
              params.ids = ids;
              params.payBatchId = res.data.payBatchId;
              joinPayBatch(params).then(res => {
                if (res.status === 200) {
                  $('#modal-create-payBatch').modal('hide');
                  this.$message.success("操作成功!");
                  this.getData();
                }
              });
            }
          });
        } else {
          this.$alert('请先选择!')
        }
      }
    },
    created () {
      this.statusArray = ['待审核', '待发起付费'];
      this.checkedStatusArray = this.statusArray;
      this.getData();
    }
  }
</script>

