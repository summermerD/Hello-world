// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('DiaDet', function($scope){
    $scope.diaDetectLogic = function(diaData1,diaData2) {
        // Do some computation..
        var diaValue1=parseFloat(diaData1);
        console.log(diaValue1);
        var diaValue2=parseFloat(diaData2);
        console.log(diaValue2);
        if(diaValue1<110 && diaValue2<140){
        return {
            "classNameForResult": "card",
            "classNameForSuggestion": "bar bar-footer bar-balanced",
            "results": "Normal"
        }
        }
          if(diaValue1<126 && diaValue1>=110 && diaValue2<140)
              return{
            "classNameForResult": "card",
            "classNameForSuggestion": "bar bar-footer bar-balanced",
            "results": "Impaired fasting glycaemia glucose: more commonly known as pre-diabetes refers to a condition in which the fasting blood glucose level is consistently elevated above what is considered normal levels; however, it is not high enough to be diagnosed as diabetes mellitus."                  
    }
            if(diaValue1<126 && diaValue2>=140 && diaValue2<200)
                return{
                "classNameForResult": "card",
            "classNameForSuggestion": "bar bar-footer bar-balanced",
            "results":"Impaired glucose tolerance(IGT): is a pre-diabetic state of hyperglycemia that is associated with insulin resistance and increased risk of cardiovascular pathology. IGT may precede type 2 diabetes mellitus by many years. IGT is also a risk factor for mortality."    
                    
                }
              if (diaValue1>=126 || diaValue2>=200)
                  return{
                  "classNameForResult": "card",
            "classNameForSuggestion": "bar bar-footer bar-balanced",
            "results":"Diabetes mellitus: A positive result, in the absence of unequivocal high blood sugar, should be confirmed by a repeat of any of the above methods on a different day. It is preferable to measure a fasting glucose level because of the ease of measurement and the considerable time commitment of formal glucose tolerance testing, which takes two hours to complete and offers no prognostic advantage over the fasting test.According to the current definition, two fasting glucose measurements above 126 mg/dl (7.0 mmol/l) is considered diagnostic for diabetes mellitus."
                  }
                  }
              
    $scope.diaDetectView = function(style) {
        document.getElementById("result").className = style["classNameForResult"];      document.getElementById("suggestion").className=style["classNameForSuggestion"];
        console.log(style["classNameForSuggestion"]);
        document.getElementById("result").innerHTML=style["results"];

    }

        
        
});
