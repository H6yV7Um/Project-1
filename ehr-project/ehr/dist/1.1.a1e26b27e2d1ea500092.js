webpackJsonp([1],{894:function(e,t,_){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=_(6),s=a(u),T=_(380),E={data:{},isFetch:null};t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:E,t=arguments[1],_=e;switch(t.type){case T.ACTION_TYPES.PERFORMANCE_LOVE_FEEDBACK_DETAIL_GET:_.isFetch=!1,_.data=t.data;break;case"REQUEST_"+T.ACTION_TYPES.PERFORMANCE_LOVE_FEEDBACK_DETAIL_GET:_.isFetch=!0;break;case"FAIL_"+T.ACTION_TYPES.PERFORMANCE_LOVE_FEEDBACK_DETAIL_GET:_.isFetch=!1}return(0,s.default)({},_)}},898:function(e,t,_){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=_(6),s=a(u),T=_(382),E={data:{},isFetch:null};t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:E,t=arguments[1],_=e;switch(t.type){case T.ACTION_TYPES.PERFORMANCE_OKR_FEEDBACK_DETAIL_GET:_.isFetch=!1,_.data=t.data;break;case"REQUEST_"+T.ACTION_TYPES.PERFORMANCE_OKR_FEEDBACK_DETAIL_GET:_.isFetch=!0;break;case"FAIL_"+T.ACTION_TYPES.PERFORMANCE_OKR_FEEDBACK_DETAIL_GET:_.isFetch=!1}return(0,s.default)({},_)}},913:function(e,t,_){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=_(6),s=a(u),T=_(385),E={result:[]};t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:E,t=arguments[1],_=e;switch(t.type){case T.ACTION_TYPES.PERSONALCENTER_CHECKIN_RECORD_ADD:_.result=t.data}return(0,s.default)({},_)}},917:function(e,t,_){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=_(6),s=a(u),T=_(387),E={jobTypes:[]};t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:E,t=arguments[1],_=e;switch(t.type){case T.ACTION_TYPES.RECRUITMENT_CAMPUS_INDEX_GET_JOBSTYPES:_.jobTypes=t.data;break;case"FAIL_"+T.ACTION_TYPES.RECRUITMENT_CAMPUS_INDEX_GET_JOBSTYPES:_.jobTypes=[]}return(0,s.default)({},_)}},919:function(e,t,_){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=_(6),s=a(u),T=_(388),E={job:[]};t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:E,t=arguments[1],_=e;switch(t.type){case T.ACTION_TYPES.RECRUITMENT_CAMPUS_RECRUITMENTDETAIL_GET_JOBSDETAIL:var a=!0,u={id:t.request.jobId,detail:t.data};_.job.map(function(e){e.id==u.id?a=!1:""}),a?_.job.push(u):""}return(0,s.default)({},_)}},921:function(e,t,_){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=_(6),s=a(u),T=_(389),E={jobs:[]};t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:E,t=arguments[1],_=e,a=!0,u=null;switch(t.type){case T.ACTION_TYPES.RECRUITMENT_CAMPUS_RECRUITMENTLIST_GET_JOBSLIST:u={id:t.request.jobTypeId,detail:t.data},_.jobs.map(function(e){e.id==u.id?a=!1:""}),a?_.jobs.push(u):"";break;case"FAIL_"+T.ACTION_TYPES.RECRUITMENT_CAMPUS_RECRUITMENTLIST_GET_JOBSLIST:u={id:t.request.jobTypeId,detail:null},_.jobs.map(function(e){e.id==u.id?a=!1:""}),a?_.jobs.push(u):""}return(0,s.default)({},_)}},925:[1941,391],927:[1941,392],929:[1941,393],931:[1941,394],943:function(e,t,_){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=_(6),s=a(u),T=_(400),E={cvInfo:null};t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:E,t=arguments[1],_=e;switch(t.type){case T.ACTION_TYPES.RECRUIT_RECRUITLIST_GET_CRAWLING_CV_BY_ID:_.cvInfo=t.data}return(0,s.default)({},_)}},945:function(e,t,_){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=_(6),s=a(u),T=_(401),E={hrs:null};t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:E,t=arguments[1],_=e;switch(t.type){case T.ACTION_TYPES.RECRUIT_DD_BACKSTAGE_GET_HRCONTACT:_.hrs=t.data}return(0,s.default)({},_)}},947:function(e,t,_){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=_(6),s=a(u),T=_(402),E={jobs:null,jobType:null};t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:E,t=arguments[1],_=e;switch(t.type){case T.ACTION_TYPES.RECRUIT_DD_BACKSTAGE_JOB_GET_JOB:_.jobs=t.data;break;case T.ACTION_TYPES.RECRUIT_DD_BACKSTAGE_JOB_GET_JOB_TYPE:_.jobType=t.data}return(0,s.default)({},_)}},949:function(e,t,_){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=_(6),s=a(u),T=_(403),E={jobType:null};t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:E,t=arguments[1],_=e;switch(t.type){case T.ACTION_TYPES.RECRUIT_DD_BACKSTAGE_JOBTYPE_GET_JOB_TYPE:_.jobType=t.data}return(0,s.default)({},_)}},953:function(e,t,_){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=_(6),s=a(u),T=_(405),E={userList:null,fetchGetuser:null,hasuserData:null,jobs:null,hrs:null,jobTypes:null,isEmpty:null};t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:E,t=arguments[1],_=e;switch(t.type){case"REQUEST_"+T.ACTION_TYPES.RECRUIT_DD_INTERVIEW_USERLIST_GET_WECHATUSER:t.request.isClear&&(_.userList=null),_.isEmpty=!1,_.hasuserData=!0,_.fetchGetuser=!0;break;case T.ACTION_TYPES.RECRUIT_DD_INTERVIEW_USERLIST_GET_WECHATUSER:_.isEmpty=0==t.data.userList.length,_.hasuserData=!!t.data.hasuserData,_.userList=_.userList?_.userList.concat(t.data.userList):_.userList=t.data.userList,_.fetchGetuser=!1;break;case T.ACTION_TYPES.RECRUIT_DD_INTERVIEW_USERLIST_GET_JOBS:_.jobs=t.data;break;case T.ACTION_TYPES.RECRUIT_DD_INTERVIEW_USERLIST_GET_HRCONTACT:_.hrs=t.data;break;case T.ACTION_TYPES.RECRUIT_DD_INTERVIEW_USERLIST_GET_JOB_TYPE:_.jobTypes=t.data;break;case T.ACTION_TYPES.RECRUIT_DD_INTERVIEW_USERLIST_CHANGE_STATE:_.userList.map(function(e){e.openid==t.request.openid&&(e.state=t.request.state)});break;case T.ACTION_TYPES.RECRUIT_DD_INTERVIEW_USERLIST_SEND_MSG:_.userList.map(function(e){if(e.openid==t.request.queryData.openid)switch(t.request.queryData.interviewtype){case"技术面试":e.state=20;break;case"综合面试":e.state=30;break;case"终面":e.state=40}})}return(0,s.default)({},_)}},955:function(e,t,_){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=_(6),s=a(u),T=_(406),E={feedbackStatus:null,isFetch:null};t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:E,t=arguments[1],_=e;switch(t.type){case T.ACTION_TYPES.RECRUIT_OFFER_INFO_ADD:_.isFetch=!1,_.feedbackStatus=t.data;break;case"REQUEST_"+T.ACTION_TYPES.RECRUIT_OFFER_INFO_ADD:_.isFetch=!0;break;case"FAIL_"+T.ACTION_TYPES.RECRUIT_OFFER_INFO_ADD:_.isFetch=!1}return(0,s.default)({},_)}},957:[1942,407],959:[1942,408],961:function(e,t,_){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=_(6),s=a(u),T=_(409),E={itemList:[],fetchGetAllCourseraList:!1,fetchGetDepartment:!1,count:0,department:[],type:0,isclear:!0};t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:E,t=arguments[1],_=e;switch(t.type){case"REQUEST_"+T.ACTION_TYPES.TRAIN_COURSERA_GET_ALL_COURSERA_LIST:_.fetchGetAllCourseraList=!0,_.isclear&&(_.count=0,_.type=0,_.itemList=[]),_.isclear=!0;break;case"FAIL_"+T.ACTION_TYPES.TRAIN_COURSERA_GET_ALL_COURSERA_LIST:_.fetchGetAllCourseraList=!1;break;case T.ACTION_TYPES.TRAIN_COURSERA_GET_ALL_COURSERA_LIST:_.fetchGetAllCourseraList=!1,_.itemList=t.data.data,_.count=t.data.count;break;case"REQUEST_"+T.ACTION_TYPES.TRAIN_COURSERA_CHART_GET_DEPARTMENT:_.fetchGetDepartment=!0;break;case"FAIL_"+T.ACTION_TYPES.TRAIN_COURSERA_CHART_GET_DEPARTMENT:_.fetchGetDepartment=!1;break;case T.ACTION_TYPES.TRAIN_COURSERA_CHART_GET_DEPARTMENT:_.fetchGetDepartment=!1,_.department=t.data;break;case T.ACTION_TYPES.TRAIN_COURSERA_CHART_CHANGE_TYPE:_.type=t.index;break;case T.ACTION_TYPES.TRAIN_COURSERA_CHART_CLEAR:_.isclear=!1}return(0,s.default)({},_)}},971:function(e,t,_){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=_(6),s=a(u),T=(_(414),{});t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:T,t=arguments[1],_=e;return t.type,(0,s.default)({},_)}},975:[1943,416],977:[1943,417],1942:function(e,t,_,a){"use strict";function u(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var s=_(6),T=u(s),E=_(a),r={cv:null,isFetch:!1,jobs:null};t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:r,t=arguments[1],_=e;switch(t.type){case E.ACTION_TYPES.SUBSCRIPTION_PERSONALCENTER_GET_CV:t.data.length>0&&(_.cv=t.data[0],_.isFetch=!0);break;case"FAIL_"+E.ACTION_TYPES.SUBSCRIPTION_PERSONALCENTER_GET_CV:_.isFetch=!0;break;case E.ACTION_TYPES.SUBSCRIPTION_PERSONALCENTER_ADD_CV:t.data.length>0&&(_.cv=t.data[0],_.isFetch=!0);break;case E.ACTION_TYPES.SUBSCRIPTION_PERSONALCENTER_GET_JOB:_.jobs=t.data}return(0,T.default)({},_)}},1943:function(e,t,_,a){"use strict";function u(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var s=_(6),T=u(s),E=_(a),r={loginMessage:null};t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:r,t=arguments[1],_=e;switch(t.type){case E.ACTION_TYPES.USER_LOGINDD_LOGIN:_.loginMessage="登录成功~";break;case"FAIL_"+E.ACTION_TYPES.USER_LOGINDD_LOGIN:_.loginMessage=t.status.message}return(0,T.default)({},_)}}});