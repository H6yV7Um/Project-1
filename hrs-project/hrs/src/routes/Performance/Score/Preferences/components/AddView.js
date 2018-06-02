import React, {Component, PropTypes} from 'react'
import { Link } from 'react-router'
import { Form, Layout, Button, Input, InputNumber, Icon, Row, Col, Radio, DatePicker, Checkbox} from 'antd'
import moment from 'moment'
import OrganizationTreeSelect from 'components/OrganizationTreeSelect'
const FormItem = Form.Item
const RadioGroup = Radio.Group
const RangePicker = DatePicker.RangePicker
const CheckboxGroup = Checkbox.Group
class AddView extends Component 
{
    constructor(props)
    {
        super(props)
        this.state = 
        {
            Preferences:
            {
                "_id":"",
                "title":"",
                "remark":"",
                "start":5,
                "end":2,
                "cycle":"quarter",
                "avoid":true,
                "options":[
                    {
                        "_id":"",
                        "name":"",
                        "upper":"",
                        "lower":""
                    }
                ],
                "objects":[],
                "performanceType":[]
            },
            formItemLayout:
            {
                labelCol: 
                {
                    sm: { span: 2 }
                },
                wrapperCol: 
                {
                    sm: { span: 12 }
                },
            },
            formItemLayoutWithOutLabel : 
            {
                wrapperCol: 
                {
                    sm: { span: 12, offset: 2 },
                }
            }
        }
        
    }
    static propTypes =
    {
        data: React.PropTypes.object.isRequired,
        save: React.PropTypes.func.isRequired,
        toggle: React.PropTypes.func.isRequired
    }
    componentWillMount() {
        if(this.props.data.key != "" && this.props.method=='update')
        {
            const Preferences = {...this.props.data.addPreferences}
            this.setState({...this.state, "Preferences": Preferences})
        }
    }
    componentDidMount() {

    }
    verify(e)
    {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {})
        for(let i=0;i<this.state.Preferences.options.length;i++)
        {
            if(!this.state.Preferences.options[i].name)
            {
                this.props.form.setFields({
                    ['items_'+i]:{
                        errors:[new Error('选项名称不能为空。')],
                        value: ''
                    }
                })
                return false
            }
            else
            {
                this.props.form.setFields({
                    ['items_'+i]:{
                        errors:null,
                    }
                })
            }
            if(this.state.Preferences.options[i].upper<=this.state.Preferences.options[i].lower)
            {
                this.props.form.setFields({
                    ['items_'+i]:{
                        errors:[new Error('最高分数不能小于或等于最低分数。')]
                    }
                })
                return false
            }
            else
            {
                this.props.form.setFields({
                    ['items_'+i]:{
                        errors:null
                    }
                })
            }
        }
        switch(this.state.Preferences.cycle)
        {
            case "quarter":
                if(this.state.Preferences.start <= this.state.Preferences.end)
                {
                    this.props.form.setFields({
                        ['start']:{
                            errors:[new Error('开始日期不能晚于或等于截止日期。')]
                        }
                    })
                    return false
                }
                else
                {
                    this.props.form.setFields({
                        ['start']:{
                            errors:null
                        }
                    })
                }
            break
            case "monthly":
                if(this.state.Preferences.start <= this.state.Preferences.end)
                {
                    this.props.form.setFields({
                        ['start']:{
                            errors:[new Error('开始日期不能晚于或等于截止日期。')]
                        }
                    })
                    return false
                }
                else
                {
                    this.props.form.setFields({
                        ['start']:{
                            errors:null
                        }
                    })
                }
            break
            case "weekly":
                if(this.state.Preferences.start >= this.state.Preferences.end)
                {
                    this.props.form.setFields({
                        ['weekstart']:{
                            errors:[new Error('开始日期不能晚于或等于截止日期。')]
                        }
                    })
                    return false
                }
                else
                {
                    this.props.form.setFields({
                        ['weekstart']:{
                            errors:null
                        }
                    })
                }
            break
            case "day":
                if(!this.state.Preferences.start)
                {
                    this.props.form.setFields({
                        ['date']:{
                            errors:[new Error('起止日期不能为空。')]
                        }
                    })
                    return false
                }
                else
                {
                    this.props.form.setFields({
                        ['date']:{
                            errors:null
                        }
                    })
                }
            break
        }
        this.props.save(this.state.Preferences._id,this.state.Preferences.title, this.state.Preferences.remark, this.state.Preferences.cycle,
                       this.state.Preferences.start, this.state.Preferences.end, this.state.Preferences.avoid, this.state.Preferences.objects,
                       this.state.Preferences.options, this.state.Preferences.performanceType)
    }
    render()
    {
        const formItemLayout = {...this.state.formItemLayout}
        const formItemLayoutWithOutLabel = {...this.state.formItemLayoutWithOutLabel}
        const { getFieldDecorator } = this.props.form
        const scoreType = [
                    { label: '上级给下级评分', value: '0' },
                    { label: '上级给下级部门评分', value: '1'}
                    ]
        return (
            <Form style={{marginTop:20}} onSubmit={(e)=>{this.verify(e)}}>
                <FormItem
                {...formItemLayout}
                label="标题"
                hasFeedback
                >
                {
                    getFieldDecorator('title', 
                    {
                        initialValue: this.state.Preferences.title,
                        rules: [
                        {
                            required: true,
                            message: '请输入评分标题'
                        }
                    ],
                    })
                    (
                        <Input onChange={(e)=>{
                            let Preferences = {...this.state.Preferences}
                            Preferences.title = e.target.value
                            this.setState({...this.state, Preferences})
                        }} />
                    )}
                </FormItem>
                <FormItem
                {...formItemLayout}
                label="描述"
                >
                {
                    getFieldDecorator('remark', 
                    {
                        initialValue: this.state.Preferences.remark,
                    })
                    (
                        <Input type="textarea" autosize={{ minRows: 2, maxRows: 6 }} onChange={(e)=>{
                            let Preferences = {...this.state.Preferences}
                            Preferences.remark = e.target.value
                            this.setState({...this.state, Preferences})
                        }} />
                    )}
                </FormItem>
                <FormItem
                {...formItemLayout}
                required={true}
                label="周期"
                >
                    <RadioGroup onChange={(e)=>{
                            let Preferences = {...this.state.Preferences}
                            Preferences.cycle = e.target.value
                            switch(Preferences.cycle)
                            {
                                case "quarter":
                                    Preferences.start = 5
                                    Preferences.end = 2
                                break
                                case "monthly":
                                    Preferences.start = 5
                                    Preferences.end = 2
                                break
                                case "weekly":
                                    Preferences.start = 1
                                    Preferences.end = 5
                                break
                                case "day":
                                    Preferences.start = ''
                                    Preferences.end = ''
                                break
                            }
                            this.setState({...this.state, Preferences})
                        }} value={this.state.Preferences.cycle}>
                        <Radio value="quarter">季度</Radio>
                        <Radio value="monthly">月度</Radio>
                        <Radio value="weekly">周度</Radio>
                        <Radio value="day">一次性</Radio>
                    </RadioGroup>
                </FormItem>
                {this.getTimestamp()}
                <FormItem
                    {...formItemLayout}
                    label="评分类型"
                    required={true}
                >
                {
                getFieldDecorator('performanceType', 
                {
                    rules: [
                        {
                            required: true,
                            message: '请选择评分类型'
                        }
                    ],
                    initialValue:this.state.Preferences.performanceType
                })
                (
                    <CheckboxGroup  options={scoreType} onChange={(e)=>{
                        let Preferences = {...this.state.Preferences}
                        Preferences.performanceType = e
                        this.setState({...this.state, Preferences})
                        }} />
                )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="评分对象"
                    required={true}
                >
                {
                getFieldDecorator('users', 
                {
                initialValue:this.state.Preferences.objects,
                rules: [
                    {
                        required: true,
                        message: '请选择评分对象'
                    }
                ],
                })
                (
                    <OrganizationTreeSelect data = {this.state.Preferences.objects} treeData={this.props.data.data} onChange={(e )=>{
                        let Preferences = {...this.state.Preferences}
                        Preferences.objects = e
                        this.setState({...this.state, Preferences})
                        }} />
                )}
                </FormItem>
                {this.loopItems()}
                <FormItem
                label=""
                {...formItemLayoutWithOutLabel}
                >

                <Button type="dashed" style={{ width: '60%' }} onClick={()=>{
                        let Preferences = {...this.state.Preferences}
                        Preferences.options.push(
                            {
                                "_id":"",
                                "name":"",
                                "upper":"",
                                "lower":""
                            }
                        )
                        this.setState({...this.state, Preferences})
                    }}>
                    <Icon type="plus" />增加选项
                </Button>
                </FormItem>
                <FormItem {...formItemLayoutWithOutLabel}>
                    <Button type="primary" size="large" loading={this.props.data.addLoading} htmlType="submit">提交</Button>
                    <Button size="large" style={{ marginLeft: 8 }} onClick={()=>{this.props.toggle('list')}}>返回</Button>
                </FormItem>
            </Form>
        )
    }
    getTimestamp()
    {
        const formItemLayout = {... this.state.formItemLayout}
        const { getFieldDecorator } = this.props.form
        const rangeConfig = {
            rules: [{ type: 'array', required: true, message: '请选择起止日期' }],
        }
        if(this.state.Preferences.cycle=='monthly')
        {
            return (
                <div>
                <FormItem
                {...formItemLayout}
                label="避开周末"
                required={true}
                >
                    <RadioGroup onChange={(e)=>{
                            let Preferences = {...this.state.Preferences}
                            Preferences.avoid = e.target.value
                            this.setState({...this.state, Preferences})
                        }} value={this.state.Preferences.avoid}>
                        <Radio value={true}>是</Radio>
                        <Radio value={false}>否</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem {...formItemLayout}
                required={true}
                label="开始日期">
                {
                    getFieldDecorator('start')
                    (
                        <span>
                            <InputNumber min={1} max={28} defaultValue={this.state.Preferences.start} onChange={(e)=>{
                                let Preferences = {...this.state.Preferences}
                                Preferences.start = e
                                this.setState({...this.state, Preferences})
                            }} />（倒数天数）
                        </span>
                    )
                }
                </FormItem>
                <FormItem
                {...formItemLayout}
                required={true}
                label="截止日期"
                >
                {
                    getFieldDecorator('end')
                    (
                        <span>
                            <InputNumber min={1} max={27} defaultValue={this.state.Preferences.end} onChange={(e)=>{
                            let Preferences = {...this.state.Preferences}
                            Preferences.end = e
                            this.setState({...this.state, Preferences})
                        }} />（倒数天数）
                        </span>
                    )
                }
                </FormItem>
                </div>
            )
        }
        else if(this.state.Preferences.cycle=='quarter')
        {
            return (
                <div>
                <FormItem
                {...formItemLayout}
                required={true}
                label="避开周末"
                >
                    <RadioGroup onChange={(e)=>{
                            let Preferences = {...this.state.Preferences}
                            Preferences.avoid = e.target.value
                            this.setState({...this.state, Preferences})
                        }} value={this.state.Preferences.avoid}>
                        <Radio value={true}>是</Radio>
                        <Radio value={false}>否</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem {...formItemLayout}
                required={true}
                label="开始日期">
                {
                    getFieldDecorator('start')
                    (
                        <span>
                            <InputNumber min={1} max={90} defaultValue={this.state.Preferences.start} onChange={(e)=>{
                                let Preferences = {...this.state.Preferences}
                                Preferences.start = e
                                this.setState({...this.state, Preferences})
                            }} />（倒数天数）
                        </span>
                    )
                }
                </FormItem>
                <FormItem
                {...formItemLayout}
                required={true}
                label="截止日期"
                >
                {
                    getFieldDecorator('end')
                    (
                        <span>
                            <InputNumber min={1} max={89} defaultValue={this.state.Preferences.end} onChange={(e)=>{
                                let Preferences = {...this.state.Preferences}
                                Preferences.end = e
                                this.setState({...this.state, Preferences})
                            }} />（倒数天数）
                        </span>
                    )
                }
                </FormItem>
                </div>
            )
        }
        else if(this.state.Preferences.cycle=='weekly')
        {
            return (
                <div>
                <FormItem
                {...formItemLayout}
                required={true}
                label="开始日期"
                >
                {
                    getFieldDecorator('weekstart',{
                            initialValue: this.state.Preferences.start,
                            getValueFromEvent:(e)=>{
                                let Preferences = {...this.state.Preferences}
                                Preferences.start = e.target.value
                                this.setState({...this.state, Preferences})
                                return e.target.value
                            }
                    })
                    (
                    <RadioGroup>
                        <Radio value={1}>星期一</Radio>
                        <Radio value={2}>星期二</Radio>
                        <Radio value={3}>星期三</Radio>
                        <Radio value={4}>星期四</Radio>
                        <Radio value={5}>星期五</Radio>
                        <Radio value={6}>星期六</Radio>
                        <Radio value={7}>星期天</Radio>
                    </RadioGroup>
                    )
                }
                </FormItem>
                <FormItem
                {...formItemLayout}
                label="截止日期"
                >
                {
                    getFieldDecorator('weekend',{
                        initialValue: this.state.Preferences.end,
                        getValueFromEvent:(e)=>{
                                let Preferences = {...this.state.Preferences}
                                Preferences.end = e.target.value
                                this.setState({...this.state, Preferences})
                                return e.target.value
                            }
                    })
                    (
                        <RadioGroup>
                            <Radio value={1}>星期一</Radio>
                            <Radio value={2}>星期二</Radio>
                            <Radio value={3}>星期三</Radio>
                            <Radio value={4}>星期四</Radio>
                            <Radio value={5}>星期五</Radio>
                            <Radio value={6}>星期六</Radio>
                            <Radio value={7}>星期天</Radio>
                        </RadioGroup>
                    )
                }
                </FormItem>
                </div>
            )
        }
        return (
            <div>
        <FormItem
        {...formItemLayout}
        required={true}
        label="起止日期"
        >
        {
                getFieldDecorator('date',{
                    initialValue: this.state.Preferences.start ? [moment(this.state.Preferences.start, "YYYY-MM-DD"), moment(this.state.Preferences.end, "YYYY-MM-DD")] : [],
                    getValueFromEvent:(e)=>{
                        let Preferences = {...this.state.Preferences}
                        Preferences.start = e[0].format("YYYY-MM-DD")
                        Preferences.end = e[1].format("YYYY-MM-DD")
                        this.setState({...this.state, Preferences})
                        return e
                    }
                })
                (
                <RangePicker />
                )
        }
        </FormItem>
        </div>
        )
    }
    loopItems()
    {
        const { getFieldDecorator } = this.props.form
        const items = [...this.state.Preferences.options]
        return items.map((item, index)=>{
            const formItemLayout = index ===0 ? {...this.state.formItemLayout} : {...this.state.formItemLayoutWithOutLabel}
            return (
            <FormItem
                {...formItemLayout}
                label={index===0? '评分选项' : ''}
                hasFeedback
                key={"items_"+index}
                >
                {
                getFieldDecorator('items_'+index, 
                {})
                    (
                    <div>
                            <Row gutter={16}>
                                <Col span={10}>
                                    <Input placeholder="选项名称" value={item.name} onChange={(e)=>{
                                        item.name = e.target.value
                                        let Preferences = {...this.state.Preferences}
                                        Preferences.options = items
                                        this.setState({...this.state, Preferences})
                                    }} />
                                </Col>
                                <Col span={5}>
                                    <InputNumber min={0} max={100} step={0.01} placeholder="最低分数" value={item.lower} onChange={(e)=>{
                                        item.lower = e
                                        let Preferences = {...this.state.Preferences}
                                        Preferences.options = items
                                        this.setState({...this.state, Preferences})
                                    }} />
                                </Col>
                                <Col span={5}><InputNumber min={0} max={100} step={0.01} placeholder="最高分数" value={item.upper} onChange={(e)=>{
                                    item.upper = e
                                    let Preferences = {...this.state.Preferences}
                                    Preferences.options = items
                                    this.setState({...this.state, Preferences})
                                }} /></Col>
                                <Col span={4}>
                                    <Button icon="delete" disabled={items.length === 1} onClick={() => {
                                        this.props.form.setFields({
                                                ['items_'+index]:{
                                                    errors:null
                                                }
                                            })
                                        let Preferences = {...this.state.Preferences}
                                        Preferences.options.splice(index, 1)
                                        this.setState({...this.state, Preferences})
                                    }} />
                                </Col>
                            </Row>
                        </div>
                    )
                }
            </FormItem>
            )
        })
    }
}

AddView = Form.create()(AddView)

export default AddView
