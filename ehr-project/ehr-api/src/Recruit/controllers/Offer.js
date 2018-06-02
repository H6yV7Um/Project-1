const Response = require('../../Response');
const Offer = require('../models/Offer');
const nodemailer = require('nodemailer');

exports.addOfferInfo = async ctx => {
    let data = ctx;
    if(ctx.app) data = ctx.request.body;

    let info = await Offer.findOne({user_id : data.data.userId});
    let transporter = null;
    let mailOptions = null;

    // console.log(info.user_email);
    // console.log(data.data.applicantName);

    //邮件处理
    transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: info.user_email,
            pass: info.user_email_pass
        }
    });

    mailOptions = mailOptions ? mailOptions : {
        from: info.user_email,
        // to: 'yangmengqing@nibirutech.com',
        to: data.data.applicantEmail,
        subject: '成都尼毕鲁科技股份有限公司（tap4fun）致【'+data.data.applicantName+'】的录用意向书',
        // text: 'Hello world ?',
        // html: 'hello' // html 内容
        html: '<table style="width:600px;border-spacing:0;margin:auto" border="0" cellspacing="0" cellpadding="0"><tbody><tr style="background:#000;"><td style="width:600px;text-align:center"><table style="width:540px;margin:auto;border-spacing:0;text-align:left;" border="0" cellspacing="0" cellpadding="0"><tbody><tr style="height:50px;"><td height="25" width="96.52" style="width:96.52px;height:25px;"><img border="0" style="display:block;border:none;height:25px;width:96.52px" src="https://webcn.tap4fun.com/cn/static/image/logo.png?version=1.0.20170907.2" alt="LOGO"></td><td style=" text-align:right;margin:0;font-size:14px;"><span style="text-decoration:none;font-size:14px;color:#fff;display:block;width:100%;">成都尼毕鲁科技股份有限公司</span></td></tr></tbody></table></td></tr><tr style="background:#ffaead;height:237px;padding:0;margin:0;"><td style="padding:0;"><div style="color: #fff;padding: 40px 0;font-size: 26px"><p style="padding: 0;margin: auto;line-height: 26px;text-align: center">录用意向书</p></div><div style="width:560px;margin:auto;color:#fff;padding:0;font-size:16px;"><p style="padding:0;margin:auto;line-height:16px;">尊敬的'+data.data.applicantName+'先生／女士，您好：</p></div><div style="width:560px;margin:auto;color:#fff;padding:26px 0;font-size:14px;"><p style="padding:0;margin:auto;line-height:1.5;letter-spacing:.1em;">&nbsp;&nbsp;&nbsp;&nbsp;tap4fun是一支快速发展、年轻有活力的国际化团队，我们诚挚的邀请您加入我们和我们一起追求梦想，打造极致产品。公司将为您提供众多职业晋升、培训发展的机会，希望我们能够一起成长，共同成就事业</p></div></td></tr><tr style="height:900px;padding:20px 0;margin:0;"><td style="padding:0;"><div style="width: 600px;margin: auto"><div style="width: 288px;height: 288px;float: left;border: 1px solid #ddd"><img style="width: 50px;padding: 20px 119px 10px 119px;border: 0" alt="LOGO" title="LOGO" src="https://webcn.tap4fun.com/cn/fstatic/info/info/image/fe/c5555ac6cc2b8fc2412e3b076ab6a1.png"><div style="margin-bottom: 40px;font-size: 18px;font-weight: bold;text-align: center">职位</div><p style="text-align: center;font-size: 14px;line-height: 22px;margin: 0">您的职位是<span style="color: #FF2305">'+data.data.applicantPosition+'</span></p><p style="text-align: center;font-size: 14px;line-height: 20px;margin: 0">所在的部门为<span style="color: #FF2305">'+data.data.applicantDepartment+'</span></p><p style="text-align: center;font-size: 14px;line-height: 20px;margin: 0">请您于<span style="color: #FF2305">'+data.data.applicantDate+''+data.data.applicantTime+'</span>到公司报道入职</p><p style="text-align: center;font-size: 14px;line-height: 20px;margin: 0">公司地址：<span style="color: #FF2305">'+data.data.companyLocation+'</span></p></div><div style="width: 288px;height: 288px;float: right;border: 1px solid #ddd"><img style="width: 50px;padding: 20px 119px 10px 119px;border: 0" alt="LOGO" title="LOGO" src="https://webcn.tap4fun.com/cn/fstatic/info/info/image/9f/3bd842be7730f0144232f3c1a3b264.png"><div style="font-size: 18px;font-weight: bold;text-align: center">薪酬福利</div><p style="text-align: center;margin: 8px 0 16px 0;font-size: 14px">税前固定月薪<span style="color: #FF2305">¥'+data.data.applicantPay+'</span></p><div style="padding: 0 8px"><p style="text-align: center;font-size: 12px;line-height: 20px;margin: 0">您的试用期为3-6个月，试用期间月薪为¥'+data.data.applicantPay+'。我们将按照国家规定标准缴纳社保、住房公积金。在您任职期间，公司将按照国家规定每月从您的薪金中代扣代缴个人所得税。</p><p style="text-align: center;font-size: 12px;line-height: 20px;margin: 0">您将享受国家规定的带薪年假和公司提供的其他福利。</p></div></div></div><div style="width: 600px;margin: auto"><div style="width: 288px;height: 288px;float: left;margin: 20px 0 0 0;border: 1px solid #ddd"><img style="width: 50px;padding: 20px 119px 10px 119px;border: 0" alt="LOGO" title="LOGO" src="https://webcn.tap4fun.com/cn/fstatic/info/info/image/3b/7b3b1b803c0828db948d0ccb2d9d84.png"><div style="font-size: 18px;font-weight: bold;text-align: center;">录用限制</div><p style="text-align: center;font-size: 14px;margin: 8px 0 16px 0">您的录用需满足以下条件：</p><p style="text-align: center;font-size: 12px;margin: 0;line-height: 20px">1.您的现任雇主已明确您的离任；</p><p style="text-align: center;font-size: 12px;margin: 0;line-height: 20px">2.您需授权且通过您的背景调查；</p><p style="text-align: center;font-size: 12px;margin: 0;line-height: 20px">3.您所提供的所有信息真实有效；</p><p style="text-align: center;font-size: 12px;margin: 0;line-height: 20px">4.您的体检结果符合国家及我司的相关要求；</p><p style="text-align: center;font-size: 12px;margin: 0;line-height: 20px">5.您没有记录在案的犯罪证据；</p></div><div style="width: 288px;height: 288px;float: right;margin: 20px 0 0 0;border: 1px solid #ddd"><img style="width: 50px;padding: 20px 119px 10px 119px;border: 0" alt="LOGO" title="LOGO" src="https://webcn.tap4fun.com/cn/fstatic/info/info/image/4f/4617326d674a108b547f4e6bd27ff1.png"><div style="font-size: 18px;font-weight: bold;text-align: center">入职提交材料</div><div style="padding: 8px 8px 0 8px"><p style="font-size: 12px;margin: 10px 0 0 0;line-height:16px;padding-left: 10px"><span style="margin-left: -10px;float: left">1.</span><span style="width: 100%">身份证、户口本、学历学位证书／技术证书，原件复印件各一份；</span></p><p style="font-size: 12px;margin:0;line-height:18px;padding-left: 10px"><span style="margin-left: -10px;float: left">2.</span><span style="width: 100%">离职证明原件；</span></p><p style="font-size: 12px;margin:0;line-height:18px;padding-left: 10px"><span style="margin-left: -10px;float: left">3.</span><span style="width: 100%">招商银行储蓄卡复印件（发工资用），可入职后在公司集体办理；</span></p><p style="font-size: 12px;margin:0;line-height:18px;padding-left: 10px"><span style="margin-left: -10px;float: left">4.</span><span style="width: 100%">原单位薪资证明（最近三月银行流水证明或工资条邮件）；</span></p><p style="font-size: 12px;margin:0;line-height:18px;padding-left: 10px"><span style="margin-left: -10px;float: left">5.</span><span style="width: 100%">无犯罪记录证明；</span></p></div></div></div><div style="width: 600px;margin: auto"><div style="width: 598px;height: 218px;float: right;margin: 20px 0 0 0;border: 1px solid #ddd"><img style="width: 60px;padding: 20px 269px 10px 269px;border: 0" alt="LOGO" title="LOGO" src="https://webcn.tap4fun.com/cn/fstatic/info/info/image/47/dc83e748a09b1686a3d701a9f9d2f4.png"><div style="font-size: 18px;font-weight: bold;text-align: center">保密信息</div><p style="text-align: center;font-size: 14px;margin: 12px 10px 0;line-height: 20px">所有在面试及正式到职日前本公司曾向您传递或沟通的信息、薪资等均被视为本公司的机密信息。无论在任何时候，此类信息都不能向第三方或未授权者披露，对此，公司保留追溯赔偿的法律权利。</p></div></div></td></tr><tr style="background:#fff;height:180px;padding:0;margin:0;"><td style="padding:0"><div style="width: 182px;height: 39px;margin: auto;padding-top:14px;border-bottom: 2px solid #EC1C22;cursor:pointer;border-radius: 8px;margin: auto;background: #ff3320"><a href="https://www.baidu.com" target="_blank" style="text-decoration: none"><span style="color: #fff;font-size: 18px;margin-left: 35.27px">点击接受offer</span></a></div><div style="padding-top: 20px"><p style="font-size: 14px;text-align: center">接受Offer后，将进行在线信息确认和登记，以便节省您在入职当天填写资料的时间。</p><p style="font-size: 12px;text-align: center;margin-bottom: 2px">链接有效期至【次日】24点，如按钮无法点击，请直接访问以下链接</p><p style="font-size: 12px;text-align: center;margin-top: 2px"><a target="_blank" style="text-decoration: none;color: #00B8FA">'+data.data.companyLink+'</p></div></td></tr><tr style="background:#000;"><td style="width:560px;text-align:center;"><table style="width:560px;margin:auto;border-spacing:0;text-align:left;" border="0" cellspacing="0" cellpadding="0"><tbody><tr style="height:60px;"><td height="50" width="300" style="width:300px;height:50px;"><div style="color: #fff;font-size: 12px;margin: 2px 0">联系人：'+data.data.companyContacts+'</div><div style="color: #fff;font-size: 12px;margin: 2px 0">联系电话：<a target="_blank" style="text-decoration: none;color: #fff">'+data.data.contactsTel+'</a></div></td><td height="50" width="300" style="width:300px;height:50px;clear: both"><div style="color: #fff;font-size: 12px;margin: 2px 0;text-align: right">成都尼毕鲁科技股份有限公司人力资源部</div><div style="color: #fff;font-size: 12px;margin: 2px 0;text-align: right">'+data.data.currentDate+'</div></td></tr></tbody></table></td></tr></tbody></table>'
    }

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log(info.response);
    });

    if(ctx.app)
    {
        Response.success(ctx, data);
    }
    else
    {
        return data;
    }
}


