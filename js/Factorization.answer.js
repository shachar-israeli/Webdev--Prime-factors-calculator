
/* NAME: Shachar Israeli and Esti Kolin
 * ID: 203713094  and  205429145
 * DATE: 08/09/2018
 */


Factorization.answer = (function () {

  var html = "Answer:" + "<div id = 'resText'></div>";  // the div that the answer will be in it
  var container, factorization;

  var initModule = function ($container, params) {
    container = $container;
    factorization = params.factorization;

    var tree = $(".tree-check")[0].checked;
    if (tree) {
      html += "<div id = 'tree'></div>";   // the table will be inside this 1
    }

    container.html(html);
    showResults();

    if (tree) {
      showTree();       // show table
    }
  };

  var showResults = function () {
    var res = $("#resText");
    var primeFactorization =
      "<div class= 'title-inside'> <br/> The Prime Factorization is:<br/></div>";
    var exponentialForm =
      "<div class= 'title-inside'><br/> In Exponential Form is:<br/></div>";

    for (var i = 0; i < factorization.length; i++) {
      for (var j = 0; j < factorization[i][1]; j++) {
        primeFactorization += factorization[i][0];
        if (j != factorization[i][1] - 1) {
          primeFactorization += " x ";
        }
      }
      exponentialForm += factorization[i][0] + "<sup>" + factorization[i][1] + "</sup>";
      if (i != factorization.length - 1) {
        primeFactorization += " x ";            // just show the result in a way of num x num x etc
        exponentialForm += " x ";
      }
    }
    $("#resText").hide();
    res.html(primeFactorization + exponentialForm);
    $("#resText").fadeIn(500);
  };

  var arrayForTree = function () {
    var allTheFactors = [];
    for (var i = 0; i < factorization.length; i++) {
      for (var j = 0; j < factorization[i][1]; j++) {
        allTheFactors.push(factorization[i][0]);
      }
    }
    var arrayTree = [];
    var num = Number($(".scan-number").val());
    var i;
    for (i = 0; i < allTheFactors.length - 1; i++) {
      arrayTree.push(num);
      arrayTree.push(
        "<div class= 'factors'>" + allTheFactors[i] + "</div>"
      );
      num = num / allTheFactors[i];
    }
    arrayTree.push(
      "<div class= 'factors'>" + allTheFactors[i] + "</div>"
    );

    return arrayTree;
  };

  var showTree = function () {
    var res = $("#tree");
    var tree = " <br/> Prime Factor Tree<br/>";
    var counter = 0;
    for (var i = 0; i < factorization.length; i++) {
      counter += factorization[i][1];
    }

    var arrayTree = arrayForTree();
    var n = 0; // number in array
    var rows = 2 * counter - 1;
    var cols = counter + 1;

    var PlaceToPutNum = 0;
    var PlaceToPutArrows = 1;

    var numberOfDigit = arrayTree[0].toString().length;
    if (numberOfDigit < 3)   // that the arrows will have enough place in the width.
      numberOfDigit = 4;
    var widthForTable = (numberOfDigit * 9) + "px";

    tree += "<table>";
    for (var i = 0; i < rows; i++) {
      tree += "<tr>";

      for (var j = 0; j < cols; j++) {
        if (i == 0 && j == 1) {
          tree +=
            "<td><div class= 'input-number'>" + arrayTree[n] + "</div></td>"; // will be the input number
          n++;
        } else if (
          i % 2 == 0 &&
          i != 0 &&
          (j == PlaceToPutNum || j == PlaceToPutNum + 2)   // the factors in left and the divided in right
        ) {
          tree += "<td>" + arrayTree[n] + "</td>";
          n++;
        } else if (i % 2 == 1 && j == PlaceToPutArrows) {
          tree += "<td>" + "&#8601 &#8600;" + "</td>";     // 2 arrows
        } else {
          tree += "<td></td>";       // nothing just space
        }
      }
      if (i % 2 == 0 && i != 0) {
        PlaceToPutNum++;
      }
      if (i % 2 == 1) {
        PlaceToPutArrows++;
      }
      tree += "</tr>";
    }
    tree += "</table>";

    res.hide();
    res.html(tree);
    $("td").css("width", widthForTable);   // make the background of all the factors in the same width
    res.fadeIn(2000);
  };

  return { initModule: initModule };
})();
