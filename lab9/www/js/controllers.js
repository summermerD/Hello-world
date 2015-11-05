angular.module('starter.controllers', ['ionic', 'ui.router', 'starter.services'])

.controller('DashCtrl', function($scope,MongoRESTService, $state) {
    $scope.pageClass = 'validate';  
    $scope.validate = function(username, password){
        console.log("inside login function");
        var result = MongoRESTService.validate(username, password, function(result){
            console.log(result);
            if(result.length == 1){
                window.location.assign("#/tab/dash/DiabetesDetector");
                sessionStorage.setItem("username", result["0"].username);
                sessionStorage.setItem("password", result["0"].password);
               sessionStorage.setItem("userID", result["0"]._id.$oid); 
                console.log(result["0"].username);
                console.log(result["0"].password);
                console.log(result["0"]._id.$oid);
            }
            else $scope.msg ="Incorrect username or password!";
        document.getElementById("username").value="";
        document.getElementById("password").value="";   
        });           
    }
})



  
    .controller('Upd', function($scope,MongoRESTService, $state) {
        var name=sessionStorage.getItem("username");
        var psd=sessionStorage.getItem("password");
        var id=sessionStorage.getItem("userID");
    $scope.update = function(newPassword){
        console.log("inside update function");
        console.log(id);
        var result = MongoRESTService.update(name, psd, id,newPassword, function(result){
            $scope.msg ="Password has been updated!";
            document.getElementById("update").value="";
           
        });           
    }
    
        $scope.delete = function(){
        console.log("inside delete function");
            MongoRESTService.delete(id,function(){
            $scope.msg ="Account has been deleted!";             
            });
        };    
})
        

.controller('DiaDet', function($scope, $http){
    $scope.diaDetectLogic = function(diaData1,diaData2) {
        // Do some computation..
        var diaValue1=parseFloat(diaData1);
        console.log(diaValue1);
        var diaValue2=parseFloat(diaData2);
        console.log(diaValue2);
        
        // Extend an existing object with a method from another
        function augment( receivingClass, givingClass ) {
    // only provide certain methods
    if ( arguments[2] ) {
        for ( var i = 2, len = arguments.length; i < len; i++ ) {
            receivingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]];
        }
    }
    // provide all methods
    else {
        for ( var methodName in givingClass.prototype ) {
            // check to make sure the receiving class doesn't
            // have a method of the same name as the one currently
            // being processed
            if ( !Object.hasOwnProperty.call(receivingClass.prototype, methodName) ) {
                receivingClass.prototype[methodName] = givingClass.prototype[methodName];
            }
            
            // Alternatively (check prototype chain as well):
            // if ( !receivingClass.prototype[methodName] ) {
            //      receivingClass.prototype[methodName] = givingClass.prototype[methodName];
            // }
        }
    }
        }
        
        var Minxin=function(){}
        Minxin.prototype={
            changeClass: function(){
            return{
                "classNameForResult": "card",
                "classNameForSuggestion": "bar bar-footer bar-balanced" 
                }
            }

        };
        
        
        
        function nonNumber(){
            this.non="Please enter the values correctly."    
        
        }
        
        function normal(){
           this.normalV="normal"
            
        }
        
        function IFG(){
            this.IFGV =  "Impaired fasting glycaemia glucose: more commonly known as pre-diabetes refers to a condition in which the fasting blood glucose level is consistently elevated above what is considered normal levels; however, it is not high enough to be diagnosed as diabetes mellitus."
                
        }
        
        function IGT(){
            this.IGTV="Impaired glucose tolerance(IGT): is a pre-diabetic state of hyperglycemia that is associated with insulin resistance and increased risk of cardiovascular pathology. IGT may precede type 2 diabetes mellitus by many years. IGT is also a risk factor for mortality." 
        }
        
        function diabetes(){
            this.diabetesV="Diabetes mellitus: A positive result, in the absence of unequivocal high blood sugar, should be confirmed by a repeat of any of the above methods on a different day. It is preferable to measure a fasting glucose level because of the ease of measurement and the considerable time commitment of formal glucose tolerance testing, which takes two hours to complete and offers no prognostic advantage over the fasting test.According to the current definition, two fasting glucose measurements above 126 mg/dl (7.0 mmol/l) is considered diagnostic for diabetes mellitus." 

        }
        
        var Singleton = (function(){
            augment(normal, Minxin);
            augment(IFG, Minxin);
            augment(IGT, Minxin);
            augment(diabetes, Minxin);
            var instance=Minxin();
            return{
                getInstance:function(){
                    return instance;
                }        
            }    
        
        })();
        
        
        if (isNaN(diaValue1) || isNaN(diaValue2)){
        var nonNaN=new nonNumber();
            return {
                "classNameForResult":nonNaN.changeClass().classNameForResult,
                "classNameForSuggestion":nonNaN.changeClass().classNameForSuggestion,
                "results":nonNan.non
            }
            
        }

        
        console.log("record the parameters");
        $http({
            method: 'PUT',
             url: 'https://api.mongolab.com/api/1/databases/ase/collections/users/'+ sessionStorage.getItem("userID")+'?apiKey=TFqu35e8BmE9SBB3fRgCe6MpqUcqKWBi',
            data: JSON.stringify({
                 "$set" : { 
                     "sugarFast" : diaValue1,
                     "sugar2H": diaValue2 } 
            }),
            contentType: "application/json"
        }).success (function(data) { 
            console.log(data);

        })
        
        
        if(diaValue1<110 && diaValue2<140){
            var normalValue=new normal();
            console.log(normalValue.normalV);
            var request=Singleton.getInstance();
            return {
                "classNameForResult":normalValue.changeClass().classNameForResult,
                "classNameForSuggestion":normalValue.changeClass().classNameForSuggestion,
                "results":normalValue.normalV
            }
            
        }
        
          if(diaValue1<126 && diaValue1>=110 && diaValue2<140){
              var IFGValue=new IFG();
              var request=Singleton.getInstance();
                return {
                    "classNameForResult":IFGValue.changeClass().classNameForResult,
                    "classNameForSuggestion":IFGValue.changeClass().classNameForSuggestion,
                    "results":IFGValue.IFGV
            }    
                   
          }
             
            if(diaValue1<126 && diaValue2>=140 && diaValue2<200){
                var IGTValue=new IGT();
                var request=Singleton.getInstance();
                return {
                    "classNameForResult":IGTValue.changeClass().classNameForResult,
                    "classNameForSuggestion":IGTValue.changeClass().classNameForSuggestion,
                    "results":IGTValue.IGTV
                }    
            }
               
              if (diaValue1>=126 || diaValue2>=200){
                  var diabetesValue=new diabetes();
                  var request=Singleton.getInstance();
                  return {
                    "classNameForResult":diabetesValue.changeClass().classNameForResult,
                    "classNameForSuggestion":diabetesValue.changeClass().classNameForSuggestion,
                    "results":diabetesValue.diabetesV
                  }   
              }
    }
              
    $scope.diaDetectView = function(style) {
        document.getElementById("result").className = style["classNameForResult"];      document.getElementById("suggestion").className=style["classNameForSuggestion"];
        console.log(style["classNameForSuggestion"]);
        document.getElementById("result").innerHTML=style["results"];
        
        
//        $cordovaToast
//        .show("Detection is recorded", 'short', 'center')
//        .then(function(success) {
//            console.log('Success');
//        }, function (error) {
//            console.log('Error');
//        });

    }
    $scope.clearSearch = function () {
        $scope.diaData1 = "";
        $scope.diaData2 = "";
    };
})


.controller('RegistCtrl', function($scope, MongoRESTService){
    $scope.createAccount = function(data){
    MongoRESTService.register(
        data,
        function(data) {
            console.log(data._id);
        document.getElementById("username").value="";
        document.getElementById("password").value="";
        document.getElementById("Email").value="";
            $scope.msg ="Account has been created!";
        }
    );       
}
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

