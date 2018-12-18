<template>
  <div>
    <div class="app-container">
      <el-form>
        <el-form-item>
          <el-row :gutter="20">
            <el-col :span="4">
              <el-input type="text" size="small" style="width: 100%" placeholder="请输入关键词" v-model="searchWord">
              </el-input>
            </el-col>
            <el-col :span="4">
              <el-date-picker size="small" style="width: 100%" v-model="startDate"></el-date-picker>
            </el-col>
            <el-col :span="4">
              <el-date-picker size="small" style="width: 100%" v-model="endDate"></el-date-picker>
            </el-col>
            <el-col :span="12">
              <el-button size="small" @click="search()">搜索</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-row :gutter="20">
            <el-col :span="1">
              <el-checkbox :indeterminate="isIndeterminate" size="small" v-model="checkAll"
                           @change="handleCheckAllChange">全选
              </el-checkbox>
            </el-col>
            <el-col :span="19">
              <el-checkbox-group v-model="checkedStatus" @change="handleCheckedChange" size="small">
                <el-checkbox v-for="(status,index) in statusArray" :label="status" :key="index">{{status}}</el-checkbox>
              </el-checkbox-group>
            </el-col>
            <el-col :span="2">
              <el-button size="small" style="float: right;width: 100%" @click="startMergeAllPDF()">批量生成文件</el-button>
            </el-col>
            <el-col :span="2">
              <el-button size="small" style="float: right;width: 100%" @click="updateAllLogcallStatus()">批量提交审核
              </el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <!-- /.box-header -->
          <el-table :data="logcallList" @selection-change="handleSelectionChange" border style="width: 100%">
            <el-table-column
              type="selection"
              width="38px">
            </el-table-column>
            <el-table-column prop="consultationType" label="咨询类型" width="180">
            </el-table-column>
            <el-table-column prop="date" label="日期" width="180">
            </el-table-column>
            <el-table-column prop="expertName" label="专家" width="120px">
            </el-table-column>
            <el-table-column prop="projectId" label="项目编号">
            </el-table-column>
            <el-table-column prop="projectName" label="项目名称" width="120px">
            </el-table-column>
            <el-table-column prop="pm" label="PM">
            </el-table-column>
            <el-table-column prop="client" label="客户">
            </el-table-column>
            <el-table-column prop="status" label="状态">
            </el-table-column>
            <el-table-column prop="time" label="时长">
            </el-table-column>
            <el-table-column prop="payType" label="付费类型">
            </el-table-column>
            <el-table-column prop="payMoney" label="支付金额" width="120px">
            </el-table-column>
            <el-table-column prop="clientInvoiceName" label="账户" width="160px">
            </el-table-column>

            <el-table-column prop="address" label="操作" width="220px">
              <template slot-scope="scope">
                <el-button @click="relateAccount(scope.row)" type="text" size="small">关联账户</el-button>
                <el-button type="text" size="small" v-if="scope.row.mergePdfUrl">查看文件</el-button>
                <el-button type="text" size="small" @click="showPayModal = true;handleMergeTableData(scope.row)"
                           v-if="!(scope.row.clientInvoiceName && scope.row.status === '待申请付款')">生成文件
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item>
          <div class="block">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="page"
              :page-sizes="[10,20,50,100,200,400]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="count">
            </el-pagination>
          </div>
        </el-form-item>
      </el-form>
    </div>


    <el-dialog title="生成付费文件" :visible.sync="showPayModal">
      <el-table :data="mergeTableData" border style="width: 100%">
        <el-table-column prop="name" label="名称">
        </el-table-column>
        <el-table-column prop="filePath" label="位置" width="200px">
        </el-table-column>
        <el-table-column prop="fileType" label="类型" width="160px">
        </el-table-column>
        <el-table-column label="操作" width="220px">
          <template slot-scope="scope">
            <a class="btn btn-default btn-sm" target="_blank" :href="scope.row.filePath">查看</a>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showPayModal = false">取 消</el-button>
        <el-button type="primary" @click="startMergePDF(mergeTableData)">生成</el-button>
      </div>
    </el-dialog>

    <el-dialog title="关联账户" width="33.3%" :visible.sync="showRelateAccountModal">
      <el-select v-model="account" style="width: 100%" placeholder="请选择" filterable>
        <el-option
          v-for="item in relationAccountList"
          :key="item.id"
          :label="item.clientInvoiceName"
          :value="item.clientInvoiceName">
        </el-option>
      </el-select>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showRelateAccountModal = false">取 消</el-button>
        <el-button type="primary" @click="updateRelaitionAccount(account)">关联</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style scoped>
  .inline-button {
    display: inline-block
  }
</style>

<script>
  import {getLogcallList, mergePDF, updateLogcallStatus, getRelationAccount, relationAccount} from '@/api/payment'
  import moment from 'moment'

  export default {
    name: 'logcall',
    components: {},
    data () {
      return {
        page: 1,
        count: 0,
        pageSize: 10,
        checkAll: true,
        showPayModal: false,
        showRelateAccountModal: false,
        isIndeterminate: true,
        relationAccountList: [],
        statusArray: ['新建', '待审核', '被退回', '待发起付费', '付费进行中', '付费完成'],
        checkedStatus: [],
        logcallList: [],
        multipleSelection: [],
        searchWord: '',
        mergeTableData: [],
        logcall: {},
        account: '',
        endDate: moment().format('YYYY-MM-DD'),
        startDate: moment().subtract(30, 'days').format('YYYY-MM-DD')
      }
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
              this.logcallList = res.data.data;
              this.count = res.data.count;
              console.log(this.logcallList)
            }
          });
      },
      handleCheckAllChange (val) {
        this.checkedStatus = val ? this.statusArray : [];
        this.isIndeterminate = false;
      },
      handleCheckedChange (value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.statusArray.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.statusArray.length;
      },
      handleSelectionChange (val) {
        this.multipleSelection = val;
      },
      handleSizeChange (val) {
        this.pageSize = val;
      },
      handleCurrentChange (val) {
        this.page = val;
        this.getData();
      },
      handleMergeTableData: function (item) {
        let mergeTableData = [{
          'id': item.id,
          'name': '专家咨询业务确认表',
          'filePath': '/projectConfirmation',
          'fileType': '自动生成'
        }, {
          'id': item.id,
          'name': '专家咨询业务劳务费确认表',
          'filePath': '/paymentConfirmation',
          'fileType': '自动生成'
        }]

        let displine = item.displine;
        if (displine) {
          mergeTableData.push({
            id: item.id,
            name: item.expertName + '合作协议.pdf',
            filePath: displine,
            fileType: '已生成'
          });
        }
        let tutor = item.tutor;
        if (tutor) {
          mergeTableData.push({
            id: item.id,
            name: item.expertName + '合规教程.pdf',
            filePath: tutor,
            fileType: '已生成'
          });
        }

        let acceptionAttachment = item.acceptionAttachment;
        if (acceptionAttachment) {
          mergeTableData.push({
            id: item.id,
            name: item.expertName + '邀请邮件.pdf',
            filePath: acceptionAttachment,
            fileType: '已生成'
          });
        }
        this.mergeTableData = mergeTableData;
        return mergeTableData;
      },
      startMergePDF: function (params) {
        mergePDF(params)
          .then(res => {
            if (res.status === 200) {
              console.log(res);
              this.showPayModal = false;
              this.getData();
              this.$message.success("合并成功");
            }
          });
      },
      startMergeAllPDF: function () {
        let logcallList = this.multipleSelection;
        if (logcallList.length > 0) {
          let mergeTableList = logcallList.map(item => this.handleMergeTableData(item))
          mergePDF(mergeTableList)
            .then(res => {
              if (res.status === 200) {
                console.log(res);
                this.getData();
                this.$message.success("生成文件成功!");
              }
            });
        } else {
          this.$alert('请先选择!')
        }
      },
      relateAccount: function (item) {
        let that = this;
        this.showRelateAccountModal = true;
        that.logcall = item;
        let params = JSON.stringify({client: item.client});
        getRelationAccount(params).then(res => {
          if (res.status === 200) {
            console.log(res);
            this.relationAccountList = res.data;
          }
        });
      },
      updateLogcallStatus: function (id, status) {
        this.$confirm('您确定要提交审核吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {id: id, status: status};
          updateLogcallStatus(params).then(res => {
            if (res.status === 200) {
              console.log(res);
              this.getData();
              this.$message.success("操作成功");
            }
          });
        }).catch(() => {

        });
      },
      updateAllLogcallStatus: function () {
        let ids = [];
        this.multipleSelection.forEach(item => {
          ids.push(item.id);
        })
        if (ids.length > 0) {
          let params = {ids: ids, status: status};
          updateLogcallStatus(params).then(res => {
            if (res.status === 200) {
              console.log(res);
              this.getData();
              this.$message.success("操作成功");
            }
          });
        } else {
          this.$alert('请先选择！');
        }
      },
      updateRelaitionAccount: function (account) {
        let params = {id: this.logcall.id, account: account};
        relationAccount(params).then(res => {
          if (res.status === 200) {
            console.log(res);
            this.showRelateAccountModal = false;
            this.$message.success("操作成功");
            this.getData();
          }
        });
      }
    },
    created () {
      this.getData();
      this.checkedStatus = this.statusArray;
    }
  }
</script>

