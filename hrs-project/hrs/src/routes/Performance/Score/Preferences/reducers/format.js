export const format = (formatData=[],data)=>{
    for (let i=0 ; i < data.length;  i++)
    {
        formatData.push({
            'key':data[i]._id.$oid,
            'title':data[i].title,
            'cycle':data[i].cycle,
            'startDate':data[i].start,
            'endDate':data[i].end
        })
    }
    return formatData
}
export const getAddPreferences = (key,data) =>{
    for(let val of getAddPreferencesDataBack(data))
    {
        if(key  == val._id.$oid){
            return val
        }
    }

}
export const getAddPreferencesData = (data)=>{
    for(let key of data)
    {
        if(key.cycle == 'quarter')
        {
            key.cycle = '季度'
        }
        else if(key.cycle == 'monthly')
        {
            key.cycle = '月度'
        }
        else if(key.cycle == 'weekly')
        {
            key.cycle = '周度'
        }
        else if(key.cycle == 'day')
        { 
           key.cycle = 'day'
            let startDate = new Date(key['start'].$date)
            let endDate = new Date(key['end'].$date)
            key['start'] = startDate.getFullYear()+'-'+(startDate.getMonth()+1)+'-'+(startDate.getDay()+1)
            key['end'] = endDate.getFullYear()+'-'+(endDate.getMonth()+1)+'-'+(endDate.getDay()+1)
        }
    }
    return data
}
export const getAddPreferencesDataBack = (data)=>{
    for(let key of data)
    {
        if(key.cycle == '季度')
        {
            key.cycle = 'quarter'
            
        }
        else if(key.cycle == '月度')
        {
            key.cycle = 'monthly'
           
        }
        else if(key.cycle == '周度')
        {
            key.cycle = 'weekly'
        }
        else if(key.cycle == '一次性')
        { 
            key.cycle = '一次性'
            let start = Date.parse(new Date(key['start']))/1000;
            let end =  Date.parse(new Date(key['end']))/1000;
            key['start'].$date = start
            key['end'].$date = end 
        }
    }
    return data
}
export const getRemovePreferencesData = (data,key)=>{
    for(let i =0 ;i < data.length ; i++)
    {
        if(data[i]._id.$oid == key)
        {
            data.splice(i,1)
        }
    }
    return data
}
export const getRemovePreferences = (data,key)=>{
    for(let i =0 ;i < data.length ; i++)
    {
        if(data[i].key == key)
        {
            data.splice(i,1)
        }
    }
    return data
}