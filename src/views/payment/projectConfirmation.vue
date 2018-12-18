<template>
    <div id="box" style="margin-top: 30px;">
        <div style="margin:0 80px ; border-bottom: 2px solid #4c4c4c;">
            <img src="../../assets/images/logo.jpg" alt="" style="margin-bottom: 1px;">
        </div>

        <center><h3 class="name">西部证券股份有限公司</h3>
            <h3 class="name">专家咨询业务项目确认表</h3></center>
        <p style="margin-left: 80px; font-weight: 600;">项目编号：
            {{logcall.projectId}}</p>
        <!--<caption align="top" style="margin-left: 30px; float:left"; width="100%" > </caption>-->
        <table width="80%" border="1" align="center" valign="middle"
               style="border: 2px solid #000; text-align: center;">

            <tr>
                <td colspan="4" align="center" style="font-weight: 700; height: 25px;">一、项目基本信息</td>
            </tr>
            <tr>
                <td width="25%">客户名称</td>
                <td width="25%">{{logcall.client}}
                </td>
                <td width="25%">合同编号</td>
                <td width="25%" contentEditable="true" v-on:blur="updateData()"
                    id="projectOrderId">
                    {{logcall.id}}
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
                <td>意向咨询服务日期</td>
                <td colspan="3" class="fuwutime" id="projectOrderStart" v-on:blur="updateData()" contentEditable="true">

                    {{logcall.projectOrderStart}}

                </td>
            </tr>
            <tr>
                <td style="height: 100px;">咨询项目概述</td>
                <td colspan="3" class="projectTopic" id="projectOrderTopic" v-on:blur="updateData()"
                    contentEditable="true">
                    {{logcall.projectOrderTopic}}
                </td>
            </tr>
            <tr>
                <td style="height: 70px;">经办人</td>

                <td colspan="3" class="father">
                    <span class="son">签名:</span>
                    <img style="height: 80px; float: left; margin-left: 50px;"
                         :src="logcall.sign"
                         alt="">
                    <span class="time">{{nowDate}}</span>

                </td>
            </tr>
            <tr>
                <td colspan="4" align="center" style="height: 25px;font-weight: 700; ">二、专家基本信息</td>
            </tr>

            <tr>
                <td>专家姓名</td>
                <td>{{logcall.expertName }}</td>
                <td>专家编号</td>
                <td>{{logcall.expertId}}</td>

            </tr>
            <tr>
                <td>专家邮箱</td>
                <td>{{logcall.expertEmail}}</td>
                <td>联系电话</td>
                <td class="mobileNumber" contentEditable="true" v-on:blur="updateData()" id="projectOrderMobileNumber">
                    {{logcall.projectOrderMobileNumber}}
                </td>
            </tr>
            <tr>

                <td>所属行业</td>
                <td class="editone" col="industryID" object="expert" :id="logcall.expertId">
                    {{logcall.expertIndustry}}
                </td>
                <td>所属公司</td>
                <td>{{logcall.expertCompany || ''}}</td>

            </tr>

            <tr>
                <td>任职职位</td>
                <td>{{logcall.jobTitle ||''}}</td>
                <td>任职状态</td>
                <td>{{logcall.jobStatus || ''}}</td>
            </tr>
            <tr>
                <td style="height: 50px;">可能存在利益冲突的任何第三方关系</td>
                <td colspan="3" class="relationship" contentEditable="true" v-on:blur="updateData()"
                    id="projectOrderRelationship" style="text-align: left;">
                    {{logcall.projectOrderRelationship}}
                </td>
            </tr>

            <tr>
                <td style="height: 50px;">其他信息</td>
                <td colspan="3" class="information" id="projectOrderInformation" v-on:blur="updateData()"
                    contentEditable="true" style="text-align: left;">
                    {{logcall.projectOrderInformation}}
                </td>
            </tr>

            <tr>
                <td colspan="4" align="center" style="height: 25px;font-weight: 700; ">三、专家劳务费</td>
            </tr>

            <tr>
                <td rowspan="2">专家劳务费</td>
                <td colspan="3">
                    小写金额 ：{{logcall.needtoPay}} 元
                </td>
            </tr>

            <tr>

                <td colspan="3">
                    大写金额： {{logcall.needtoPayChinese}} 圆
                </td>
            </tr>


            <tr>
                <td style="height: 30px;">备注：</td>
                <td colspan="4" style="height: 60px; text-align: left;" contentEditable="true" v-on:blur="updateData()"
                    id="projectOrderRemarks">
                    {{logcall.projectOrderRemarks}}
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

    table {
        border-spacing: 0;
        border-collapse: collapse;
    }

    table tr td {
        padding: 5px 5px;
    }

    td, th {
        display: table-cell;
        vertical-align: inherit;
    }

</style>
<script>
  import {getProjectConfirmation, updateProjectConfirmation} from '@/api/payment';
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
        updateProjectConfirmation({
          id: this.id,
          projectOrderId: document.getElementById('projectOrderId').innerText,
          projectOrderStart: document.getElementById('projectOrderStart').innerText,
          projectOrderTopic: document.getElementById('projectOrderTopic').innerText,
          projectOrderRelationship: document.getElementById('projectOrderRelationship').innerText,
          projectOrderInformation: document.getElementById('projectOrderInformation').innerText,
          projectOrderRemarks: document.getElementById('projectOrderRemarks').innerText,
          projectOrderMobileNumber: document.getElementById('projectOrderMobileNumber').innerText,
        }).then(res => {
          if (res.status === 200) {
            this.$message.success("保存成功");
          }
        });
      },
      getData () {
        var that = this;
        let id = that.$route.params.id;
        getProjectConfirmation(id)
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
