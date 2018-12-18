<template>
  <div>
    <div class="row">
      <div style="width: 12%;float: left;" class="box-padding">
        <div class="box box-solid">
          <div class="box-header with-border" style="height: 50px;border-top: 3px solid #d2d6de;">
            <div class="row form-group">
              <div class="col-md-12">
                <div class="input-group input-group-sm">
                  <input type="text" class="form-control pull-right" placeholder="Search" v-model="searchPayBatchName">
                  <div class="input-group-btn">
                    <button type="submit" class="btn btn-default btn-sm" @click="searchPayBatch()">
                      <i class="fa fa-search"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="box-body no-padding" style="">
            <ul class="nav nav-pills nav-stacked" style="max-height: 600px;overflow:auto">
              <li :class="payBatchName===item.payBatchName?'actived':''"
                  v-for="item in payBatchList"><a href="#"
                                                  @click="getData(item)">
                {{item.payBatchName}}
                <span class="label label-primary pull-right" style="min-width: 35px">{{item.logcallCount}}</span></a>
              </li>
            </ul>
          </div>
          <!-- /.box-body -->
        </div>
      </div>
      <div style="float: right;width: 88%;" class="box-padding">
        <div class="col-xs-12">
          <div class="box">
            <div class="box-header" style="margin-top: 10px">
              <div class="row form-group">
                <div class="col-md-12">
                  <div class="inline-div">
                    <p>批次号：{{payBatch.payBatchName}}</p>
                  </div>
                  <div class="inline-div">
                    <p>付费记录：{{count}}条</p>
                  </div>
                  <div class="inline-div">
                    <p>总支付金额：{{count}}RMB</p>
                  </div>
                  <div class="inline-button" style="float: right;">
                    <div class="box-tools">
                      <a class="btn btn-default btn-sm" href="javascript:;" @click="lockPayBatch()"><i
                        class="fa fa-lock"></i>
                        锁定批次
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-12">
                  <div style="border-top: 1px solid #f4f4f4;">
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="input-group input-group-sm" style="width: 240px;float: left;">
                    <input type="text" class="form-control pull-right" placeholder="Search" v-model="searchWord">
                    <div class="input-group-btn">
                      <button type="submit" class="btn btn-default btn-sm" @click="search()">
                        <i class="fa fa-search"></i>
                      </button>
                    </div>
                  </div>
                  <div style="float: right;">
                    <div class="inline-button">
                      <div class="box-tools">
                        <div class="btn-group">
                          <button type="button" class="btn btn-default btn-sm" data-toggle="dropdown">确认付费结果</button>
                          <button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown">
                            <span class="caret"></span>
                            <span class="sr-only">Toggle Dropdown</span>
                          </button>
                          <ul class="dropdown-menu" role="menu">
                            <li><a href="javascript:;" class="btn-sm" @click="updatelogcallList('付费成功')">付费成功</a></li>
                            <li><a href="javascript:;" class="btn-sm" @click="updatelogcallList('付费失败')">付费失败</a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div class="inline-button">
                      <div class="box-tools">
                        <a class="btn btn-default btn-sm" href="javascript:;" @click="packageToFinance">打包给财务</a>
                      </div>
                    </div>
                    <div class="inline-button">
                      <div class="box-tools">
                        <a class="btn btn-default btn-sm" href="javascript:;" @click="packageToOut">打包给外包</a>
                      </div>
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
                  <th>时长</th>
                  <th>支付金额</th>
                  <th>状态</th>
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
                  <td><span v-text="item.time"></span></td>
                  <td><span v-text="item.payMoney"></span></td>
                  <td><span v-text="item.status"></span></td>
                </tr>
                </tbody>
              </table>
              <pagination v-model="page" :perPage="10" :records="count" @paginate="getData(payBatch)"></pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .inline-button {
    display: inline-block
  }

  .box-padding {
    padding: 15px;
    padding-left: 15px;
    padding-right: 15px
  }

  .inline-div {
    display: inline-block;
    padding-right: 30px;
  }

  .nav-stacked > li.actived > a, .nav-stacked > li.actived > a:hover {
    background: transparent;
    color: #444;
    border-top: 0;
    border-left-color: #3c8dbc;
  }

  .dropdown-menu {
    min-width: 120px;
  }
</style>
<script>
  import {
    getLogcallList,
    getPayBatchList,
    updatePayBatch,
    updatePayment,
    packageToFinance,
    packageToOut
  } from '@/api/payment'
  import moment from 'moment'

  export default {
    name: 'pay',
    data () {
      return {
        page: 1,
        count: 0,
        checked: true,
        isCheckedLogcall: false,
        logcallList: [],
        payBatchList: [],
        payBatchName: '',
        payBatch: {},
        searchPayBatchName: '',
        searchWord: '',
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
        console.log(data)
        this.getData(this.payBatch);
      },
      searchPayBatch: function () {
        let that = this;
        let data = {};
        data.searchPayBatchName = that.searchPayBatchName;
        console.log(data)
        getPayBatchList(data).then(res => {
          if (res.status === 200) {
            this.payBatchList = res.data;
            console.log(this.payBatchList)
          }
        });
      },
      getData: function (item) {
        this.payBatch = item;
        this.payBatchName = item.payBatchName;
        let params = {payBatchName: item.payBatchName};
        getLogcallList(params)
          .then(res => {
            if (res.status === 200) {
              this.isCheckedLogcall = false;
              if (res.data && res.data.data) {
                this.logcallList = res.data.data;
              }
              if (res.data && res.data.count) {
                this.count = res.data.count
              }
              console.log(this.logcallList)
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
      lockPayBatch: function () {
        updatePayBatch({id: this.payBatch.id, status: 'locked'}).then(res => {
          if (res.status === 200) {
            this.getData(this.payBatch);
            this.$message.success("锁定成功!");
          }
        })
      },
      updatelogcallList: function (status) {
        let ids = [];
        this.logcallList.forEach(item => {
          if (item.checked) {
            ids.push(item.id);
          }
        })
        if (ids.length > 0) {
          let params = {ids: ids, status: status};
          updatePayment(params).then(res => {
            if (res.status === 200) {
              this.getData(this.payBatch);
              this.$message.success("操作成功!");
            }
          });
        } else {
          this.$alert('请先选择')
        }
      },
      packageToOut () {
        //打包给外包
        let ids = [];
        this.logcallList.forEach(item => {
          if (item.checked) {
            ids.push(item.id);
          }
        })
        if (ids.length > 0) {
          let params = {ids: ids};
          packageToOut(params).then(res => {
            if (res.status === 200) {
              this.$message.success("操作成功!");
            }
          });
        } else {
          this.$alert('请先选择!')
        }
      },
      packageToFinance () {
        //打包给外包
        let ids = [];
        this.logcallList.forEach(item => {
          if (item.checked) {
            ids.push(item.id);
          }
        })
        if (ids.length > 0) {
          let params = {ids: ids};
          packageToFinance(params).then(res => {
            if (res.status === 200) {
              this.$message.success("操作成功!");
            }
          });
        } else {
          this.$alert('请先选择')
        }
      },
      getPayBatch () {
        getPayBatchList().then(res => {
          if (res.status === 200) {
            this.payBatchList = res.data;
            if (this.payBatchList && this.payBatchList.length > 0) {
              this.getData(this.payBatchList[0])
            }
            console.log(this.payBatchList)
          }
        });
      }
    },
    created () {
      this.getPayBatch();
    }
  }
</script>

