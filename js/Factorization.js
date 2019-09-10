

/* NAME: Shachar Israeli and Esti Kolin
 * ID: 203713094  and  205429145
 * DATE: 08/09/2018
 */

var Factorization = (function () {

  var initModule = function () {
    $(".calculate").click(calcClickListener);
    $(".clear").click(clearClickListener);
  };

  var calcClickListener = function (e) {
    var numToCheck = $(".scan-number").val();       // take the input

    var okFlag = checkNumber(numToCheck);        //positive and whole

    if (okFlag) {
      if (isPrime(numToCheck)) {
        htmlAnswer("prime", numToCheck);
      } else {
        var primeFactorization = getFactorization(numToCheck);
        Factorization.answer.initModule($(".answer"), {
          factorization: primeFactorization
        });
      }
    } else {
      htmlAnswer("error");
    }
  };

  var clearClickListener = function (e) {
    $(".scan-number").val("");   // delete the input
    $(".tree-check")[0].checked = false;   // unchecked
    $("#tree").fadeOut("slow");
    $("#resText").fadeOut("slow");
    $("h2").fadeOut();
    $("h3").fadeOut();
  };

  function htmlAnswer(text, num) {
    if (text == "error") {
      var html =
        "Answer:<h2>Error, works only with whole & positive number!</h2>";
      $(".answer").html(html);
    } else if (text == "prime") {
      if (num == 1)
        var html = "Answer:<h3>" + num + " doesn't have Factorization</h3>";
      else
        var html =
          "Answer:<h3>" +
          num +
          " is already a Prime number. doesn't have Factorization</h3>";

      $(".answer").html(html);
    }
  }

  function nextPrime(rNum) {   // give the next prime ye
    for (var i = rNum + 1; ; i++) {
      if (isPrime(i)) {
        return i;
      }
    }
  }

  function isPrime(value) {       // will retrun if number is prime or not
    for (var i = 2; i < value; i++) {
      if (value % i === 0) {
        return false;
      }
    }
    return true;
  }

  function getFactorization(n) {           // return array with the factorizations
    var factors = [];
    var p = 2;

    if (n == 1) return [1, 1];

    while (n > 1) {
      if (isPrime(n)) {
        var toAdd = [n, 1];
        factors.push(toAdd);
        return factors;
      }

      var temp = n / p;
      if (temp % 1 == 0) {
        var toAdd = [p, 0]; // add the origin word.
        while (temp % 1 == 0) {
          toAdd[1]++;
          temp = temp / p;
        }
        factors.push(toAdd);
        n = n / Math.pow(p, toAdd[1]); // return it to be whole number after the inside while.
      } else {
        p = nextPrime(p);
      }
    }
    return factors;
  }

  function checkNumber(value) {
    return value > 0 && value % 1 == 0;
  }

  return { initModule: initModule };
})();


$(document).ready(function () {
  Factorization.initModule();
});
