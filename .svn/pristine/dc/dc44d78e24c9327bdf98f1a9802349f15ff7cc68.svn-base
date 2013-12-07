/*! Password Strength - v0.1.0 - 2013-08-03
* https://github.com/mukimov/jquery-password-strength
* Copyright (c) 2013 Shukhrat Mukimov; Licensed MIT */
(function($) {
  $.DIGITS = /\d/g;
  $.CHARS = /[a-z]/g;
  $.UPPER_CHARS = /[A-Z]/g;
  $.SYMBOLS = /[!,@,#,$,%,^,&,*,?,_,~]/g;

  $.Rule = function(pattern, min, message){
    this.pattern = pattern;
    this.message = message;
    this.min = min;
  };

  $.Rule.prototype.apply = function(password){
    return password.match(this.pattern);
  };

  $.PasswordMeterEngine = (function() {
    var score = 0, ratio = 1, messages = [];
    return {
      messages: {
        get: function(){
          return messages;
        },
        set: function(m){
          messages.push(m);
        },
        clear: function(){
          messages = [];
        }
      },
      measure: function(password, rules){
        var self = this;
        ratio += rules.length;
        $.each(rules, function(i, rule){
          var ruleResult = rule.apply(password);
          if(ruleResult && ruleResult.length >= rule.min){
            score += 100 / ratio;
          }else{
            if(ruleResult){
              self.messages.set(ruleResult.length + rule.message );
            }else{
              self.messages.set(rule.min + " " + rule.message + " mas");
            }
          }
        });
        return score;
      },
      lowerUpper: function(password, minLower, minUpper){
        var matches;
        if((matches = password.match(/[a-z]/g)) && matches.length < minLower){
          return false;
        }
        if((matches = password.match(/[A-Z]/g)) && matches.length < minUpper){
          return false;
        }
        return true;
      },
      //Checks if a string has repetitive chars inside.
      //repetitions(1, 'tt') => (true) minimum 1 repetitive chars
      //repetitions(1, 'tt') => (false) minimum 2 repetitive chars
      repetitions: function(pLen, str) {
        var res = "", repeated;
        for(var i = 0; i < str.length; i++) {
          repeated = true;

          for(var j = 0; j < pLen && (j + i + pLen) < str.length; j++){
            repeated = repeated && (str.charAt(j + i) === str.charAt(j + i + pLen));
          }
          if(j < pLen){ repeated = false; }
          if(repeated){
            i += pLen - 1;
            repeated = false;
          }
          else{
            res += str.charAt(i);
          }
        }
        return (str.length - res.length) * 1 > 0;
      },
      //Joins strings with delimeter and last delimeter
      //conjoin({ delimeter: " ", last: "and " }, "first", "second", "third") => first second and third
      conjoin: function(opts, values){
        var result = "",
            delimeter = opts["delimeter"] || " ",
            lastDelim = opts["last"] || " y ",
            dot = opts["dot"] || "",
            lastEl = values.length - 1;
        if(values.length < 2){
          return values[0] + dot;
        }
        for(var i = 0; i < lastEl; i++){
          result += values[i];
          if(i < lastEl - 1){
            result += delimeter;
          }
        }
        result += lastDelim + values[lastEl];
        return result + dot;
      }
    };
  }());
  $.fn.passStrength = function(options) {
    var defaults, appendFn;
    defaults = {
      minLength: 5,
      appendTo : ".help",
      messages: ".messages",
      rules: {
        minDigits:      2,
        minSymbols:     1,
        minChars:       1,
        minUpperChars:  2,
        hasRepetitionInPassword: true //experimental
      },
      poorPass: {
        class: "poorPass",
        text: ""
      },
      weakPass: {
        class: "weakPass",
        text: ""
      },
      goodPass: {
        class: "goodPass",
        text: ""
      },
      strongPass: {
        class: "strongPass",
        text: ""
      }
    };
    $.extend(true, defaults, options);
    $.rules = [
      new $.Rule($.DIGITS, defaults.rules.minDigits, "digitos"),
      new $.Rule($.SYMBOLS, defaults.rules.minSymbols, "simbolo"),
      new $.Rule($.CHARS, defaults.rules.minChars, "caracter"),
      new $.Rule($.UPPER_CHARS, defaults.rules.minUpperChars, "mayusculas")
    ];
    appendFn = function(cssClass, text) {
      $(defaults.appendTo)
      .addClass(cssClass)
      .text(text);
    };
    return this.each(function() {
      var $this = $(this), score, $messages = $(defaults.messages);
      $this.keyup(function(){
        $.PasswordMeterEngine.messages.clear();
        $messages.text("");
        if($this.val().length >= defaults.minLength){
          score = $.PasswordMeterEngine.measure($this.val(), $.rules);
          if(score > 100){ score = 100; }
          if(score < 30){
            appendFn(defaults.poorPass.class, defaults.poorPass.text);
          }else if(score < 50){
            appendFn(defaults.weakPass.class, defaults.weakPass.text);
          }else if(score < 70){
            appendFn(defaults.goodPass.class, defaults.goodPass.text);
          }else{
            appendFn(defaults.strongPass.class, defaults.strongPass.text);
          }
        }else{
          $.PasswordMeterEngine.messages.set(" mas caracteres. Minimo " + defaults.minLength);
        }
        if($.PasswordMeterEngine.messages.get().length > 0){
          $messages.text("Por favor incorpora " + $.PasswordMeterEngine
          .conjoin({delimeter: ", ", dot: ". "}, $.PasswordMeterEngine.messages.get()));
        }
        if(defaults.rules.hasRepetitionInPassword){
          if($.PasswordMeterEngine.repetitions(1, $this.val())){
            $messages.text($messages.text() + ("Se detecto repeticion."));
          }
        }
      });
    });
  };
}(jQuery));
