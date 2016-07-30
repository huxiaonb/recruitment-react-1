'use strict';
var mongoose = require('mongoose');
var CompanyInfoSegment = mongoose.model('CompanyInfoSegment');
var CompanyTemplate = mongoose.model('CompanyTemplate');
var Dictionary = mongoose.model('Dictionary');
var _ = require('lodash');
var request = require('request');

exports.companyIndex = function (req, res) {
  Dictionary.find({'category': '公司信息类型'}).then(function (types) {
    CompanyTemplate.find({}).then(function (companyTemplates) {
      var urlMaps = [];
      _.forEach(types, function (type) {
        var companyTemplate = _.find(companyTemplates, {'type': type.value});
        var urlMap = {
          'type': type.value
        };
        if (!_.isEmpty(companyTemplate)) {
          urlMap.url = companyTemplate.url;
        } else {
          urlMap.url = '/weChat/company/'+type.value;
        }
        urlMaps.push(urlMap);
      });
      res.render('server/weChat/views/companyIndex', {'urlMaps':urlMaps});
    });
  });
  /*CompanyTemplate.find({},function(err, companyTemplates){
   var url = {};
   var companyTemplate = _.find(companyTemplates,{'type':'companyIntroduction'});
   if(!_.isEmpty(companyTemplate)){
   url.companyIntroduction = companyTemplate.url;
   }else{
   url.companyIntroduction = '/weChat/company/companyIntroduction';
   }

   companyTemplate = _.find(companyTemplates,{'type':'companyEnvironment'});
   if(!_.isEmpty(companyTemplate)){
   url.companyEnvironment = companyTemplate.url;
   }else{
   url.companyEnvironment = '/weChat/company/companyEnvironment';
   }

   companyTemplate = _.find(companyTemplates,{'type':'companyActivities'});
   if(!_.isEmpty(companyTemplate)){
   url.companyActivities = companyTemplate.url;
   }else{
   url.companyActivities = '/weChat/company/companyActivities';
   }

   companyTemplate = _.find(companyTemplates,{'type':'companyWelfare'});
   if(!_.isEmpty(companyTemplate)){
   url.companyWelfare = companyTemplate.url;
   }else{
   url.companyWelfare = '/weChat/company/companyWelfare';
   }

   companyTemplate = _.find(companyTemplates,{'type':'promotionIntroduction'});
   if(!_.isEmpty(companyTemplate)){
   url.promotionIntroduction = companyTemplate.url;
   }else{
   url.promotionIntroduction = '/weChat/company/promotionIntroduction';
   }

   res.render('server/weChat/views/companyIndex',url);
   });*/
};

exports.companyIntroduction = function (req, res) {
  if (!_.isEmpty(req.params.segmentType)) {
    CompanyInfoSegment.find({'type': req.params.segmentType}, null, {'sort': {'sequence': 1}}, function (err, companyInfoSegments) {
      res.render('server/weChat/views/companyIntroduction', {
        segmentType : req.params.segmentType,
        companyInfoSegments: companyInfoSegments,
        isFlow: _.result(_.first(companyInfoSegments), 'isFlow')
      });
    });
  } else {
    res.status(404).render('server/core/views/404');
  }
};

exports.homePage = function (req, res) {
  console.log('getWechatOpenId');
  console.log(req.query.code);
  if(!req.query.code){
    console.log('no code exist in requset.');
    CompanyTemplate.find({'type': '招聘行程'}, function (err, companyTemplates) {
      res.render('server/weChat/views/homePage', {recruitmentProcessUrl: _.result(_.first(companyTemplates), 'url')});
    });
  } else{
    console.log('wechat code exists');
    request.get({
      url: 'https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=wx0655e3fe5574fa9b&corpsecret=ucvJB2i75K4K2HOI7z18EUIeF_t1VHTlfCbSFtb4ez_mo9QSuqnxi_0o5j6iYwkH',
      json: true
    },function(error, response, body){
      if(!error && response.statusCode == 200){
        var access_token = body.access_token;
        console.log(access_token);
        var url = 'https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo?access_token='+access_token+'&code='+req.query.code;
        console.log(url);
        request.get({
          url: url,
          json: true
        },function(error, response, userInfoBody){
          if(!error && response.statusCode == 200) {
            console.log(userInfoBody);
            var openId = '';
            if(!!userInfoBody){
              if(!!userInfoBody.UserId && !userInfoBody.OpenId){
                var criteria = {
                  userid: userInfoBody.UserId,
                  agentid: 4
                };
                request.post({
                  url:'https://qyapi.weixin.qq.com/cgi-bin/user/convert_to_openid?access_token=' + access_token,
                  body: criteria,
                  json: true
                },function(error, response, convertResult){
                  if(!error && response.statusCode == 200) {
                    console.log(convertResult);
                    openId = convertResult.openid;
                    if(!req.session.openId){
                      req.session.openId = openId;
                    }
                  }
                  renderHomePage(req, res);
                });
              } /*else if(!userInfoBody.UserId && !!userInfoBody.OpenId){
               openId = userInfoBody.OpenId;
               }*/
              console.log('openId is: ' + openId);
            }
          } else{
            renderHomePage(req, res);
          }
        });

      } else{
        renderHomePage(req, res);
      }
    });
  }
};

function renderHomePage(req, res) {
  CompanyTemplate.find({'type': '招聘行程'}, function (err, companyTemplates) {
    res.render('server/weChat/views/homePage', {recruitmentProcessUrl: _.result(_.first(companyTemplates), 'url')});
  });
}
