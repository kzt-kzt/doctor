<style>
    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>
<template>
  <div>
  	<Card class="mb-10">
    	<Row>
    		<Col span="12">
    			<h3>医生管理二</h3>
    		</Col>
    		<Col span="12" class="text-right">
          <component2 v-if="Super">
            <Button type="primary" @click='addItem'class="mr-10">新建</Button>
          </component2>
				  <component2 v-if="Super">
            <Button type="error" @click="myDelete">删除</Button>
          </component2>
    		</Col>
    	</Row>
  	</Card>
    <Card>
		<Row style="margin-bottom: 10px;">
          <span>日期范围：</span>
          <DatePicker style="width:160px" type="date" format="yyyy-MM-dd" :value='startTime' @on-change='myStartTime' placeholder="开始日期"></DatePicker>
          <span>~</span>
          <DatePicker style="width:160px;margin-right:20px;" type="date" format="yyyy-MM-dd" :value='endTime' @on-change='myEndTime' placeholder="结束日期"></DatePicker>
          <span>关键字：</span>
          <Input placeholder="请输入姓名" v-model.trim='searchText' style="width:200px;margin-right:20px;"></Input>
          <Button type="primary" @click='search'>搜索</Button>
		</Row>
        <Table size="large" @on-selection-change="selectOption" stripe ref="selection" :columns="tableCol" :data="tableData">
        </Table>
        <!--<Page class='mt-10 text-right' :total="total" :current='currentPage' :page-size='pageSize' @on-change="changePage" @on-page-size-change="changeSize" show-sizer show-total/>-->
        <Page class='mt-10 text-right':total="total" :current='pageNum' :page-size='pageSize' @on-change='changePage' @on-page-size-change='changeSize' show-total show-sizer></Page>
    </Card>
    <Modal
      v-model="saveItem"
      :title="itemTitle"
      @on-cancel='closeSaveItem'>
      <Form ref="formData" :model="formData" :label-width="80">
        <input type="hidden" name='id' v-model="formData.id">
        <FormItem label="姓名">
            <Input v-model="formData.name" placeholder="请填写您的姓名" :maxlength="10"></Input>
        </FormItem>
        <span style="color: red;margin-left: 80px;font-size:5px">*手机号为您的登录账号*</span>
        <FormItem label="手机号">
            <Input v-model="formData.phone" placeholder="请填写您的手机号码" :maxlength="11"></Input>
        </FormItem>
        <FormItem label="品论">
            <Input v-model="formData.remark" placeholder="请填写品论" :maxlength="11"></Input>
        </FormItem>
          <FormItem label="部门" >
             <Row>
                <Col span="12" style="padding-right:10px">
                    <Select v-model="formData.department" filterable>
                        <Option v-for="item in coursesList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </Col>
            </Row>
          </FormItem>
      </Form>
      <div slot="footer">
          <Button type="default"  @click="closeSaveItem">关闭</Button>
          <Button type="primary" :disabled='saveItemStatu'  @click="saveItemOk">确认</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { hasOneOf } from '@/libs/tools'
import { getAllDoctor,doctorTableData,addDoctor,updateDoctor,commentDel,getDoctorName} from '@/api/data'
export default {
  data () {
    return {
    	startTime: '', // 日期初始化
    	endTime: '', 	// 日期初始化
    	searchText: '',	// 搜索内容初始化
      pageSize:10,
      pageNum:1,
      total:1,


      formData:{},      //表单信息
      addUser:true,   //是否为新增用户

    	upLoadPic: false,		// 照片上传模态框
      picture:[],          //照片上传
      teacherId:0,        //照片上传参数

      saveItem:false,     //保存操作框
      saveItemStatu:false,     //保存点击状态
      itemTitle:'新建医生',   //保存操作框title

    	selectItemArr: [],		// 选中项目id
      tableCol: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '手机号',
          key: 'phone'

        },
        {
          title: '品论',
          key: 'remark'
        },
        {
          title: '部门',
          key: 'department',
          render: (h, params) => {
            // console.log("++++++"+JSON.stringify(params))
            var oName = params.row;
            return h('div', [
              h('span', {}, oName.type)
            ])
          }
        },
        {
          width:100,
          title: '操作',
          key: 'examineStatus',
          checkAccess: ['superAdmin'],
          render: (h, params) => {
            console.log()
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'large',
                  disabled:this.viewAccessTeacher
                },
                on: {
                  click: () => {
                    let getData = JSON.parse(JSON.stringify(this.tableData[params.index]));
                    this.formData = getData;

                    this.itemTitle = '编辑医生信息';
                    if(this.formData.detail.length>0){
                      for(var j in this.formData.detail){
                        this.targetKeys.push(this.formData.detail[j].id);
                      }
                    }
                    
                    this.addUser = false;
                    this.saveItem = true;
                    if(this.cityList.length>=1){
                      return;
                    };
                    getAllDoctor(this.pageNum,this.pageSize).then(res => {
                      console.log(res)
                      if(res.data.success){
                        this.cityList = res.data.result.dateDepartment.list;
                        var arrr = {}
                        for(var i = 0; i<this.cityList.length;i++){
                          arrr = {name:this.cityList[i].type,id:this.cityList[i].id}
                      this.coursesList.push(arrr)
                    }
                      }else {
                        this.$Message.warning({
                          content:res.data.errorMsg
                        })
                      }
                    })
                  }
                }
              }, '编辑')
            ])
          },

        }
      ],
      tableData: [],

      // 图片上传
      defaultList: [
          /*{
              'name': '98310050-e068-4417-973b-6e3160179084.jpg',
              'url': 'http://localhost:8081/picture/98310050-e068-4417-973b-6e3160179084.jpg'
          },
          {
              'name': 'bc7521e033abdd1e92222d733590f104',
              'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
          }*/
      ],
      imgName: '',
      picShow: false,
      uploadList: [],
      cityList: [],
      coursesList: [],
      targetKeys: [],
      listStyle: {
          width: '150px',
          height: '200px'
      }
    }
  },
  methods: {
    async pageInit(){
      doctorTableData(this.pageNum,this.pageSize).then(res => {
        if(res.data.success){
          this.total = res.data.result.date.total;
          this.tableData = res.data.result.date.list;
        }else if(res.data.errorMsg){
          this.$Message.warning({
            content:res.data.errorMsg
          })
        }
      })
    },
    changePage(page){
      this.pageNum = page;
      console.log( this.pageNum)
      console.log(this.pageSize)
      this.pageInit();
    },
    changeSize(size){
      this.pageSize = size;
      this.pageNum = 1;
      console.log(this.pageSize)
      this.pageInit();
    },
    addItem(){
      this.formData = {};
      this.itemTitle = '添加医生';
      this.addUser = true;
      this.saveItem = true;
      if(this.cityList.length>=1){
        return;
      };
      getAllDoctor(this.pageNum,this.pageSize).then(res => {
      	console.log(res)
        if(res.data.success){
	        this.cityList = res.data.result.dateDepartment.list;
	        var arrr = {}
	        for(var i = 0; i<this.cityList.length;i++){
	         	arrr = {name:this.cityList[i].type,id:this.cityList[i].id}
				this.coursesList.push(arrr)
			}
        }else {
          this.$Message.warning({
            content:res.data.errorMsg
          })
        }
      })
    },
   /* closeUpload(){
      alert(1);
      this.upLoadPic = false;
      this.defaultList=[];
      this.uploadList=[];
    },*/
    // 关闭保存项目模态框
    closeSaveItem(){
      this.formData = {};
      this.saveItem = false;
      this.targetKeys=[];
    },
    saveItemOk(){
      var that = this;
      var formData = this.formData;
      //console.log(JSON.stringify(formData))
      if(!formData.name){
        this.$Message.warning({
          content:'请填写您的姓名！'
        });
        return;
      }
      if(this.addUser){
        addDoctor(this.formData).then(res => {
          if(res.data.result && res.data.result.error){
            this.$Message.warning({
              content:res.data.result.error
            })
            return;
          }else if(res.data.success){
            this.$Message.success({
              content:'保存用户成功'
            });
            that.saveItem = false;
            that.pageInit();
          }else if(res.data.errorMsg){
            this.$Message.warning({
              content:res.data.errorMsg
            })
          }
          that.saveItemStatu = false;
        })
      }else{
        this.saveItemStatu = true;
        updateDoctor(this.formData).then(res => {
          console.log(this.formData)
          // var that = this;
          that.saveItemStatu = false;
          if(res.data.success){
            this.$Message.success({
              content:'修改用户成功'
            });
            that.saveItem = false;
            that.pageInit();
          }else if(res.data.errorMsg){
            this.$Message.warning({
              content:res.data.errorMsg
            })
          }
        })
      }
    },
  	// 选中项
  	selectOption (selection, row) {
  		this.selectItemArr = []
  		for (let item of selection) {
        this.selectItemArr.push(item.id)
	    }
  	},
  	// 删除
  	myDelete () {
  	var selectItemArr = this.selectItemArr
      if(selectItemArr.length<1){
        this.$Message.warning({
          content:'请选择项目！'
        })
        return;
      }
      // console.log(selectItemArr)
      commentDel("/doctor/delDoctor",selectItemArr).then(res => {
        console.log(selectItemArr)
        if(res.data.success){
          this.selectItemArr=[];
          this.pageInit();
          this.$Message.success({
            content:'删除成功！'
          });
        }else if(res.data.errorMsg){
          this.$Message.warning({
            content:res.data.errorMsg
          })
        }

        // this.tableData = res.data.result.data.pageList;
      })
  	},
  	// 开始日期
  	myStartTime (newTime) {
  		this.startTime = newTime
  	},
  	// 结束日期
  	myEndTime (newTime) {
  		this.endTime = newTime
  	},
  	// 搜索
  	search () {
      var name = this.searchText
      console.log(name)
     getDoctorName(name,this.pageNum,this.pageSize).then(res => {
       console.log(res)
      if(res.data.success){
        this.total = res.data.result.searchDate.total;
//      console.log(res)
        this.tableData = res.data.result.searchDate.list;
      }else if(res.data.errorMsg){
        this.$Message.warning({
          content:res.data.errorMsg
        })
      }
      // this.searchText=""
    })
  	},
    handleChange(newTargetKeys) {
        this.targetKeys = newTargetKeys;
    },
    render (item) {
        return item.label;
    },
    reloadMockData () {
        this.transfer = this.getMockData();
        this.targetKeys = this.getTargetKeys();
    }

  },
  mounted () {
    // 初始化
    doctorTableData(this.pageNum,this.pageSize).then(res => {
      if(res.data.success){
        this.total = res.data.result.date.total;
//      console.log(res)
        this.tableData = res.data.result.date.list;
      }else if(res.data.errorMsg){
        this.$Message.warning({
          content:res.data.errorMsg
        })
      }
    })
    // 图片上传
    // this.uploadList = this.$refs.upload.fileList;
  },
  computed: { 
    access () {
      return this.$store.state.user.access
    },
    //所有权限
    viewAccessAll () {
      return hasOneOf(['superAdmin', 'doctor_category','doctor'], this.access)
    },
    //部分权限
    viewAccessTeacher () {
      return hasOneOf(['teacher','doctor'], this.access)
    },
    Super () {
      return hasOneOf(['superAdmin'], this.access)
    }
  }
}
</script>
