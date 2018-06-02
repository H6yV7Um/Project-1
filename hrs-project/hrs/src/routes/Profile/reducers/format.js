
import {SERVER} from 'config'
import moment from 'moment'
export const  formatEmployeeStatusData = (data)=>
{
    let current = []
    for(let i = 0; i< data.length; i++)
    {
        let id = ''
        if(data[i].selfie.length)
        {
            id = data[i].selfie[0]._id.$oid
        }
        let department = ''
        let employeeStatus = ''
        for(let val of data[i].department)
        {
          	department += val.label+' '      	
        }
        if(data[i].status == "passed")
      	{
      		employeeStatus = "通过面试"
      	}
      	else if(data[i].status == "admitted")
      	{
      		employeeStatus = "在职"
      	}
      	else if(data[i].status == "dimission")
      	{
      		employeeStatus = "离职"
      	}
        
        let isRegularizationdate = ''
        if(data[i].regularizationdate)
        {
            isRegularizationdate = data[i].regularizationdate
        }
        else{
            isRegularizationdate = "未转正"
        }
        current.push({
            key: i,
            employeeNumber: data[i].member_id,
            employeeStatus:employeeStatus,
            entryDate: data[i].entrydate,
            position:data[i].position,
            department:department,
            employeeType:data[i].type,
            name:data[i].name,
            regularizationdate:isRegularizationdate,
            id: id,
            user_id:data[i]._id.$oid

        })
      }
      return current
}

export const formatGetListNameData = (getListNameData)=>
{

    let current = []
    if(getListNameData.length)
    {
        for(let val of getListNameData)
        {
          current.push(val.name)
        }
    }
    return current 
}
const formatEditMemberData  = (fieldsGroup,getEmployeeDetailsData) => {
        let memberData={}
        let fileOfmemberData = {}
        for(let val of fieldsGroup)
        {
            for(let field of val.fields)
            {    
                
                if(field.type == "file")
                {
                   
                    let current = []
                    for(let val of getEmployeeDetailsData[field.namespace])
                    {   
                        current.push(val._id.$oid)
                    }
                    memberData[field.namespace] = current
                    fileOfmemberData[field.namespace] = []
                    for(let val of getEmployeeDetailsData[field.namespace])
                    {
                        fileOfmemberData[field.namespace].push({
                            "uid": val._id.$oid,
                            "url": SERVER+"organization/file/download/" + val._id.$oid,
                            "name": val.filename
                        }) 
                    }
                }
                else{

                        memberData[field.namespace] = getEmployeeDetailsData[field.namespace]                    
                }
            }
        }
        return {memberData:memberData,fileOfmemberData:fileOfmemberData}
    }
   
const  formatEditRemuneration = (getSocialSecurityData,getFundData,getProfileTaxesData,getSalaryData,salariesData,getEmployeeDetailsData) => {

        let remuneration ={}
       
            remuneration.insurance=getEmployeeDetailsData.insurance.$oid
        
            remuneration.fund=getEmployeeDetailsData.fund.$oid
       
            remuneration.taxes=getEmployeeDetailsData.taxes.$oid
       
            remuneration.salary=getEmployeeDetailsData.salary.$oid
       
        remuneration.salaries =[]
        for(let salary of getEmployeeDetailsData.salaries)
        {
            remuneration.salaries.push(salary)
        }
        
        return remuneration
    }
export const  formatGetEditEmployeeDetails = (id,data,fieldsGroup,getSocialSecurityData,getFundData,getProfileTaxesData,getSalaryData,salariesData) =>
{
    let current = {}
    for(let val of data)
    {
        if(val._id.$oid == id)
        {
            let memberDataAll = formatEditMemberData(fieldsGroup,val)
            let remuneration = formatEditRemuneration(getSocialSecurityData,getFundData,getProfileTaxesData,getSalaryData,salariesData,val)
            current["memberData"] = memberDataAll.memberData
            current["fileOfmemberData"] = memberDataAll.fileOfmemberData
            current["remuneration"] = remuneration
        }
    }
    return current
}

export const getOneEmployeeDetailsData = (id ,data) =>
{
    for(let val of data)
    {
        if(id == val._id.$oid)
        {
            return val
        }
    }
}

export const changeFileList = (fileOfmemberData,memberData,fileList,namespace) =>{
    let current = []
    let currentAll = []
    for(let val of fileList)
    {
        if(val.status)
        {
            if(val.status == 'done')
            {
                current.push(val.response.data[0].$oid)
                let url = SERVER+"organization/file/download/"+val.response.data[0].$oid
                val.url = url
                val.uid = val.response.data[0].$oid
                val.name = val.name
                currentAll.push(val)
            }
            else
            {
               currentAll.push(val) 
            }
        }
        else
        {
            current.push(val.uid)
            currentAll.push(val)
        }
    }
    let name = namespace
    memberData[name] = current
    fileOfmemberData[name] = currentAll
    return {"memberData": memberData,"fileOfmemberData":fileOfmemberData}
}