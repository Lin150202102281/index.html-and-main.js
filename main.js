// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ubim from "ubim"
import $ from 'jquery'
//var navigationImg=require('./assets/map_navigation.svg')
//npm install vue-touch@next --save引入vue-touch
//webpack要使用import
import VueTouch from 'vue-touch'
Vue.use(VueTouch, {name: 'v-touch'})

var rcamera, rid, rposition, rtype;
Vue.config.productionTip = false;
var clipflag = 0, measureflag = 0,measureflag1 = 0, classflag = 0,professionflag=0,storeyflag=0,getstoreyflag=0,walkflag=0,flyflag=0;
var getobject=[];
var d1={
  "canvas":{
    "width":"1700",
    "height":"850"
},
"camera":{
    "position":[
        "12393.348207039173",
        "-44714.730832390735",
        "37589.116476430216"
    ],
    "focus":[
        "17085.14714365086",
        "13925.76291612792",
        "-5155.662571156393"
    ],
    "type":"Cyclovergence"
},
"extra":[
    {
        "name":"clippingBoxGeometry",
        "boxMax":[
            "83626.46875",
            "65268.1328125",
            "10339.821829557555"
        ],
        "boxMin":[
            "-49783.37890625",
            "-65494.4765625",
            "-4794.171875"
        ]
    }
],
"isClipMode":"true"
}
getobject.push(d1);
//getobject.push(d2);
var rightaction;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  data(){
    return {
        navigationImg:require('./assets/map_navigation.svg')
    }
  },
  
  mounted: function () {
      //进入页面初始化模型
      ubim.initialize({
        "container": "app",//模型渲染的所指的div的id
        "viewcube": "abb",//视角模型渲染所指的div的id
        "url": "http://devmodel.u-bim.com:8099",
        "model_id": "5ca1db0aadf1832725279701"
        //测试环境url:http://devmodel.u-bim.com:8099

        //"model_id":巨大模型："5ce39762adf183a7ec78224c" 

        //学校模型："5ce7adb6adf183e3280875f6"

        //小模型："5ca1db0aadf1832725279701"

        //好世界3605:"5cac6432adf1837ac85f804b"

        //南沙少年宫模型："5cb44772adf1838d48001638"

        //模型解析错误测试.ifc:"5cc551c9adf1839d50485ab1"

        //机电-5F-new-20180427.ifc:"5cc552c7adf183a08825b601"

        //1F建筑.ifc:"5cc5524aadf1839f3a45917a"

        //正式环境url:http://model.u-bim.com:8098
        //"model_id":大模型:"5ca1ad96adf183b126322aac"
      },function(){},function(){}, function(){}
    );

    document.getElementById("app").oncontextmenu = function () {


      ubim.instanceOperation({
        "action": rightaction
      })
      if (rightaction == "relation") {
        rcamera = ubim.instanceOperation({ "action": rightaction }).camera;
        rid = ubim.instanceOperation({ "action": rightaction }).id;
        rposition = ubim.instanceOperation({ "action": rightaction }).position;
        rtype = ubim.instanceOperation({ "action": rightaction }).type;
        ubim.markerOperation({
          "action": "create",     //代表创建构件关联文件的标志
          "markers": [rcamera, rid, rposition, rtype]
        })
      }
    }

    document.onkeydown = function (event) {
      var e = event || window.event;
      if (e && e.keyCode == 27) { // 按 Esc,推出视点操作
        ubim.viewPointMode({
          "action": "close",
          "container": "app"
        }, function () { });
      } else if (e && e.keyCode == 8) {//按退格,撤销操作

          ubim.viewPointMode({
            "action": "recall",
            "container": "app"
          }, function () { });

      } else if (e && e.keyCode == 13) {//按回车,保存视点
          ubim.viewPointMode({
            "action": "save",
            "container": "app"
          }, function (data) {
            getobject.push(data)
          });
        }
    };

//如果是移动端就把右边三个与视点有关的按钮显示出来
    if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))){
      $(control).css('display','block');
    }
  },

  methods: {
    rotatemove: function () {
      AllDo();
      ubim.switchCamera({
        "type": 0,  //切换到环转模式
      })
    },

    walkmove: function () {
       if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))){
          AllDo();
          if(walkflag%2==0){
          $(walkcontrol).css('display','block')
          $(app).unbind('touchstart')
          //$(app).unbind('touchstart')
          $(app).bind('touchstart',function(event){
         
            ubim.switchCamera({
              "type": 2,  //切换到漫游模式
              "cursor": {
                "x": event.originalEvent.touches [0].pageX,
                "y": event.originalEvent.touches [0].pageY,
              },           //漫游模式特有参数，代表初始选点
              "touchEvent":{
                "forward":document.getElementById('btnD1'), 
                "left": document.getElementById('btnD2'), 
                "right": document.getElementById('btnD3'), 
                "back": document.getElementById('btnD4')
              }
            }) 
        
        })
       
      }else{
        ubim.switchCamera({
          "type": 0,  //切换到环转模式
        })
      }
      walkflag++;
    }else{ 
      if(walkflag%2==0){
      $(app).bind('click',function(event){
        ubim.switchCamera({
          "type": 2,  //切换到漫游模式
          "cursor": {
            "x": event.originalEvent.layerX,
            "y": event.originalEvent.layerY,
          }           //漫游模式特有参数，代表初始选点 
        })     
      })
      }else{
        ubim.switchCamera({
          "type": 0,  //切换到环转模式
        })
      }
      walkflag++;     
      }
    },

    flymove: function () {
      if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))){
        AllDo();

        if(flyflag%2==0){
          $(flyRightControl).css('display','block');
          $(flyLeftControl).css('display','block')      
            ubim.switchCamera({
              "type": 1,  //切换到飞行模式
              "touchEvent":{
                "forward":document.getElementById('btnD5'), 
                "left": document.getElementById('btnD6'), 
                "right": document.getElementById('btnD7'), 
                "back": document.getElementById('btnD8'),
                "up": document.getElementById('btnD9'),
                "down": document.getElementById('btnD10')
                            }   
            })
        }else{
          ubim.switchCamera({
            "type": 0,  //切换到环转模式
          })
        }
        flyflag++;
     }else{
        if(flyflag%2==0){
          ubim.switchCamera({
            "type": 1,  //切换到飞行模式
          })
        }else{
          ubim.switchCamera({
            "type": 0,  //切换到环转模式
          })
        }
        flyflag++;
     }
    },


    clipmode: function () {
        ubim.setClipMode({
          "action": "on"
        });
    },
    Xclipmode: function () {
        ubim.setClipMode({
          "action": "on",
          "type":'xAxis'
        });
    },
    Yclipmode: function () {
        ubim.setClipMode({
          "action": "on",
          "type":'yAxis'
        });
    },
    Zclipmode: function () {
        ubim.setClipMode({
          "action": "on",
          "type":'zAxis'
        });
     
    },

    closeClipMode: function () {
        ubim.setClipMode({
          "action": "off"
        });
    },

    righthidden: function () {
      rightaction = "hidden";

    },

    rightshowall: function () {
      rightaction = "showAll";
    },

    rightisolation: function () {
      rightaction = "isolation";
    },

    rightshowcenter: function () {
      rightaction = "center";
    },

    rightrelation: function () {
      rightaction = "relation";
    },

    rightcancel:function(){

      rightaction = "remove";
    },

    back: function () {
      ubim.setDefaultView();
    },
    //正常测量
    measure: function () {
      if (measureflag % 2 == 0) {
        ubim.measureMode({ "action": "on"}, function (data) {
          //alert("x方向距离为：" + data.x);
        });
        measureflag++;
      }else {
        ubim.measureMode({ "action": "off" }, function () {});
        measureflag++;
      }

    },
    //垂直测量
    verticalmeasure: function () {
      if (measureflag1 % 2 == 0) {
        console.log(1)
        ubim.measureMode({ "action": "on","type":'vertical' }, function (data) {
          
        });
        measureflag1++;
      }else {
        ubim.measureMode({ "action": "off" }, function () {});
        measureflag1++;
      }

    },

    getstoreynavigation: function () {
      var arr=ubim.getStoreyMaps();
      if(getstoreyflag%2==0){
        $(add).css('display','block')
        $(navigationImg).css('display','block')
        ubim.storeyNavigation({
          "action": "get",
          "container": "add",         //代表渲染容器
          "pointer": "navigationImg",    //代表小地图中指明当前位置的图标
          "map":arr[0].name        //需要渲染的楼层平面图的名称
        })
        getstoreyflag++;
      }else{
        $(add).css('display','none')
        $(navigationImg).css('display','none')
        getstoreyflag++;
      } 
    },
    
    //创建视点
    createdraw: function () {
      ubim.viewPointMode({
        "action": "create",     //代表创建svg标签
        "container": "app"      //代表svg的容器div,仅在创建时提供
      }, function (){});
    },

    //画方框
    drawRect: function () {
      ubim.viewPointMode({
        "action": "drawRect",
        "container": "app"
      }, function (){});

    },

    //画椭圆
    drawEllipse: function () {  
      ubim.viewPointMode({
        "action": "drawEllipse",
        "container": "app"
      }, function () { });
    },

//画箭头
    drawArrow: function () {
      ubim.viewPointMode({
        "action": "drawArrow",
        "container": "app"
      }, function () { });
    },


    //画输入框
    drawText: function () {
      ubim.viewPointMode({
        "action": "drawText",
        "container": "app"
      }, function () { });
    },

    //画画笔
    drawPath: function () {
      ubim.viewPointMode({
        "action": "drawPath",
        "container": "app"
      }, function () { });

    },


      pointmanagersaveS:function(){
        ubim.viewPointMode({
          "action": "save",
          "container": "app"
        },function (data) {
          getobject.push(data)
        });
      },
      pointmanagercloseS:function(){
       
        ubim.viewPointMode({
          "action": "close",
          "container": "app"
        }, function () { });
      },
      pointmanagerbackS:function(){
      
        ubim.viewPointMode({
          "action": "recall",
          "container": "app"
        }, function () { });
      },


    getpoint1: function () {

      ubim.viewPointMode({
        "action": "get",        //代表重绘svg图
        "data": getobject[0],  //代表保存视点时的数据（不需要base64的img图）
        "container": "app"      //代表svg的容器div
      }, function () {})

    }, 
    getpoint2: function () {
      
     
     
      ubim.viewPointMode({
        "action": "get",        //代表重绘svg图
        "data": getobject[1],  //代表保存视点时的数据（不需要base64的img图）
        "container": "app"      //代表svg的容器div
      }, function () {})

     

    },
    getpoint3: function () {
     
     
      ubim.viewPointMode({
        "action": "get",        //代表重绘svg图
        "data": getobject[2],  //代表保存视点时的数据（不需要base64的img图）
        "container": "app"      //代表svg的容器div
      }, function () {})

    },
    getpoint4: function () {


      ubim.viewPointMode({
        "action": "get",        //代表重绘svg图
        "data": getobject[3],  //代表保存视点时的数据（不需要base64的img图）
        "container": "app"      //代表svg的容器div
      }, function () {})



     

    },
    getpoint5: function () {

    
      ubim.viewPointMode({
        "action": "get",        //代表重绘svg图
        "data": getobject1,  //代表保存视点时的数据（不需要base64的img图）
        "container": "app"      //代表svg的容器div
      }, function () {})
     

    },

    getpoint6: function () {
 
      ubim.viewPointMode({
        "action": "get",        //代表重绘svg图
        "data": getobject[5],  //代表保存视点时的数据（不需要base64的img图）
        "container": "app"      //代表svg的容器div
      }, function () {})

    },
    modelCancel:function(){
      ubim.viewPointMode({
        "action": "release",        //代表重绘svg图
        "data": getobject[0],  //代表保存视点时的数据（不需要base64的img图）
        "container": "app"      //代表svg的容器div
      }, function () {})
    },

   

    setClassVisible: function () {
      
      var arr = ubim.getClassifiedData({ "type": "classes" });
      for (var i = 0; i < 10; i++) {
        arr.pop();
      }
      if (classflag % 2 == 0) {
        //for(var i=0;i<arr.length;i++){}
        ubim.setVisibleByType({
          "type": "class",
          "keys": arr,
          "visible": false
        })
        classflag++;
      } else {
        ubim.setVisibleByType({
          "type": "class",
          "keys": arr,
          "visible": true
        })
        classflag++;
      }

    },
    
    setProfessionVisible: function () {

      var arr = ubim.getClassifiedData({ "type": "professions" });
      console.log(arr)

      for (var i = 0; i < 10; i++) {
        arr.pop();
      } 
      console.log(arr)

      if (professionflag % 2 == 0) {
        ubim.setVisibleByType({
          "type": "profession",
          "keys": arr,
          "visible": false
        })
        professionflag++;
      } else {
        ubim.setVisibleByType({
          "type": "profession",
          "keys": arr,
          "visible": true
        })
        professionflag++;
      }

    },

    setStoreyVisible: function () {
      var arr = ubim.getClassifiedData({ "type": "storeys" });
    

      var temp={
        top:'',
        bottom:''
      }
      
      
      if (storeyflag % 2 == 0) {
        temp.top='03 - Floor';
        temp.bottom='02 - Floor';
        //console.log(arr)
       // console.log(temp.top)
        //console.log(temp.bottom)
        ubim.setVisibleByType({
          "type": "storey",
          "keys": temp,
          "visible": false
        })
        storeyflag++;
      } else {
        temp.top='无限制';
        temp.bottom='无限制';
        ubim.setVisibleByType({

          "type": "storey",
          "keys": temp,
          "visible": true
        })
        storeyflag++;
      }
    },

    modelinfo: function () {
      ubim.getModelInfo("http://devmodel.u-bim.com:8099", "5c99fe4aadf1835cba60f367", function (data) {
        alert("模型面数量为：" + data.faceCnt + "  模型构件数量为：" + data.instanceCnt + "  模型顶点数量为：" + data.vertexCnt)

      })
    }
  }
})


function AllDo(){//每一个功能事件执行之前都执行一下
  $(app).unbind('click');
  $(app).unbind('touchstart');
  $(walkcontrol).css('display','none');
  $(flyRightControl).css('display','none');
  $(flyLeftControl).css('display','none');
}