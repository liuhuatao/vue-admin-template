<template>
  <div id="box" style="margin-top: 30px;">
    <div style="margin:0 80px ; border-bottom: 2px solid #4c4c4c;">
      <img src="../../assets/images/logo.jpg" alt="" style="margin-bottom: 1px;"/>
    </div>
    <center><h3 class="name">西部证券股份有限公司</h3>
      <h3 class="name">专家咨询业务劳务费确认表</h3></center>
    <p style="margin-left: 80px; font-weight: 600;">项目编号：
      {{logcall.projectId}}</p>
    <!--<caption align="top" style="float:left" width="100%" > </caption>
-->
    <table width="80%" border="1" align="center" valign="middle"
           style="border: 2px solid #000; text-align: center;">

      <tr>
        <td colspan="4" align="center" style="font-weight: 700; height: 25px;">一、项目基本信息</td>
      </tr>
      <tr>
        <td width="25%">客户名称</td>
        <td width="25%">
          {{logcall.client}}
        </td>
        <td width="25%">合同编号</td>
        <td width="25%" contentEditable="true" v-on:blur="updateData()"
            id="projectPayId">
          {{logcall.id}}
        </td>

      </tr>
      <tr>
        <td width="25%">专家姓名</td>
        <td width="25%">
          {{logcall.expertName}}
        </td>
        <td width="25%">专家编号</td>
        <td width="25%">
          {{logcall.expertId}}
        </td>
      </tr>
      <tr>
        <td width="25%">专家邮箱</td>
        <td width="25%">
          {{logcall.expertEmail}}
        </td>
        <td width="25%">专家联系电话</td>
        <td width="25%" contentEditable="true" v-on:blur="updateData()" id="projectPayMobileNumber">
          {{logcall.expertMobile}}
        </td>
      </tr>
      <tr>
        <td>付费事由</td>
        <td colspan="3" class="editone" col="consultationType" object="expert_consultation"
            id="<%= pageData.objectData.id %>">
                    <span style="width: 33%; display: inline-block;"><input
                      :checked="logcall.type=='1'" disabled name="Fruit"
                      type="checkbox" value="电话"/>咨询服务</span>
          <span style="width: 33%; display: inline-block;"><input
            :checked="logcall.type=='2'" disabled name="Fruit"
            type="checkbox" value="其他"/>推荐</span>

        </td>
      </tr>
      <tr>
        <td>咨询服务日期</td>
        <td colspan="3" contentEditable="true" v-on:blur="updateData()" id="projectPayStart">
          {{logcall.projectStart}}
        </td>
      </tr>
      <tr>
        <td>咨询方式</td>
        <td colspan="3">
                    <span style="width: 22%; display: inline-block;"><input
                      :checked="logcall.consultationType=='面见'" name="Fruit"
                      type="checkbox" disabled value="面见"/>面见</span>
          <span style="width: 22%; display: inline-block;"><input
            :checked="logcall.consultationType=='电话'" name="Fruit"
            type="checkbox" disabled value="电话"/>电话</span>
          <span style="width: 22%; display: inline-block;"><input
            :checked="logcall.consultationType=='面见'&&logcall.consultationType=='电话'"
            name="Fruit" type="checkbox" disabled value="其他"/>其他</span>
          <!--<span style="width: 22%; display: inline-block;"><input name="Fruit" type="checkbox" value="面谈"/>面谈</span>-->
          <!--<span style="width: 22%; display: inline-block;"><input name="Fruit" type="checkbox" value="电话"/>电话</span>-->
          <!--<span style="width: 22%; display: inline-block;"><input checked="checked" name="Fruit"-->
          <!--type="checkbox" value="其他"/>其他</span>-->
        </td>
      </tr>
      <tr>
        <td>咨询效果概述</td>
        <td colspan="3" contentEditable="true" v-on:blur="updateData()" id="projectPayEffect">
          {{logcall.projectEffect}}
        </td>
      </tr>
      <tr>
        <td colspan="4" align="center" style="font-weight: 700; height: 25px;">二、劳务费信息</td>
      </tr>

      <tr>
        <td>咨询时长</td>
        <td colspan="3">{{logcall.clientReportedDuration}}分</td>
      </tr>
      <tr>
        <td rowspan="2">专家劳务费</td>
        <td colspan="3">
          大写金额：{{logcall.needtoPayChinese}} 圆
        </td>
      </tr>
      <tr>

        <td colspan="3">
          小写金额 ：{{logcall.needtoPay}} 元
        </td>
      </tr>
      <tr>
        <td rowspan="2">劳务费总计</td>
        <td colspan="3">
          大写金额： {{logcall.needtoPayChinese}} 圆
        </td>
      </tr>
      <tr>

        <td colspan="3">
          小写金额 ： {{logcall.needtoPay}} 元
        </td>
      </tr>

      <tr>
        <td colspan="4" align="center" style="font-weight: 700; height: 25px;">三、专家支付信息</td>
      </tr>
      <tr>
        <td width="25%">专家账号</td>
        <td width="25%">{{logcall.expertBankAccount}}</td>
        <td width="25%">身份证号</td>
        <td width="25%"> {{logcall.expertIdnumber}}</td>

      </tr>
      <tr>
        <td width="25%">收款人姓名</td>
        <td width="25%">{{logcall.expertName}}</td>
        <td width="25%">开户银行</td>
        <td width="25%"> {{logcall.expertBank + logcall.expertBankDetail}}</td>

      </tr>
      <tr>
        <td style="height: 70px;">经办人</td>

        <td colspan="3" class="father">
          <span class="son">签名:</span>
          <img style="height: 80px; float: left; margin-left: 50px;"
               v-if="logcall.sign"
               :src="logcall.sign"
               alt="">
          <span class="time">{{nowDate}}</span>

        </td>
      </tr>
      <tr>
        <td style="height: 70px;">审核人</td>
        <td colspan="3" class="father">
          <span class="son">签名:</span>
          <img style="height: 80px; float: left; margin-left: 50px;"
               v-if="logcall.sign"
               :src="logcall.sign"
               alt="">
          <span class="time">{{nowDate}}</span>

        </td>
      </tr>
      <tr>
        <td style="height: 30px;">备注：</td>
        <td colspan="4" style="height: 60px; text-align: left;" contentEditable="true" v-on:blur="updateData()"
            id="projectPayRemarks">
          {{logcall.projectRemarks}}
        </td>
      </tr>
    </table>


  </div>
</template>
<style>
  .app-main {
    overflow-y: auto;
  }

  #box {
    width: 800px;
    margin: 0 auto;
  }

  .name {
    color: #3c3c3c;
    font-weight: 600;
    margin: 10px 0;
    font-size: 20px;
  }

  .father {
    position: relative;
  }

  .son {
    position: absolute;
    top: 5px;
    left: 5px;
  }

  .time {
    position: absolute;
    right: 5px;
    bottom: 5px;
  }

  table tr td {
    padding: 5px 5px;
  }

  table {
    border-spacing: 0;
    border-collapse: collapse;
  }

  td, th {
    display: table-cell;
    vertical-align: inherit;
  }

</style>
<script>
  import {getPaymentConfirmation, updatePaymentConfirmation} from '@/api/payment';
  import moment from 'moment';

  export default {
    name: 'Error500',
    data () {
      return {
        id: '',
        nowDate: moment().format('YYYY年MM月DD号'),
        tokenString: '',
        token: '',
        logcall: {},
      }
    },
    methods: {
      backPage () {
        this.$router.go(-1);
      },
      updateData () {
        updatePaymentConfirmation({
          id: this.id,
          projectPayId: document.getElementById('projectPayId').innerText,
          projectPayStart: document.getElementById('projectPayStart').innerText,
          projectPayEffect: document.getElementById('projectPayEffect').innerText,
          projectPayRemarks: document.getElementById('projectPayRemarks').innerText,
          projectPayMobileNumber: document.getElementById('projectPayMobileNumber').innerText,
        }).then(res => {
          if (res.status === 200) {
            this.$message.success("保存成功");
          }
        });
      },
      getData () {
        var that = this;
        let id = that.$route.params.id;
        getPaymentConfirmation(id)
          .then(res => {
            if (res.status === 200) {
              this.logcall = res.data;
              console.log(this.logcall)
            }
          });
      },
    },
    created () {
      this.getData();
    }
  }
</script>
