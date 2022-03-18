var calculatedTipAmount = 0;
var calculatedTotal = 0;
var bill = 0;
var people = 1;
var chosenTip = 0;


//when any input is changed run calculations
$("input").change( function() {

  // when custom button used set tip amount. treats non-numerical entries as empty
  if ($(this).attr("type") === "text") {
    $("button").removeClass("selected");
    var customEntry = $(".custom-button").val();
    customEntry = customEntry.replace(/\D/g,'');
    if (customEntry === "") {
      customEntry = 0;
    };
    chosenTip = customEntry;
  };
  runCalculations();
});



// when any tip button is clicked  update value of tipAmount and change styles
$("button").click(function(event) {
  $("button").removeClass("selected");
  $(this).addClass("selected");
  chosenTip = $(this).text();
  chosenTip = Number(chosenTip.slice(0, -1));

  runCalculations();
});

// when reset button is clicked update everything to default state
$(".reset-button").click(function(){
  calculatedTipAmount = 0;
  calculatedTotal = 0;
  bill = 0;
  people = 1;
  chosenTip = 0;

  $("button").removeClass("selected");
  $(".reset-button").removeClass("active");

  $(".tip-answer").text("$0.00");
  $(".total-answer").text("$0.00");

  $("label").css("visibility", "hidden");
  $(".number-people").removeClass("error0");

});

//when input clicked remove default text
$(".resetable").click(function(){
  $(this).attr("value", "");
});

// get bill and number of people, calc, update answer text, and make reset button look active
function runCalculations() {
  bill = Number($(".bill").val());
  people = Number($(".number-people").val());

//check for 0 error
  if (people === 0) {
    $("label").css("visibility", "visible");
    $(".number-people").addClass("error0");
  } else {
    calculate(bill, people, chosenTip);

    $(".tip-answer").text("$"+calculatedTipAmount);
    $(".total-answer").text("$"+calculatedTotal);

    $(".reset-button").addClass("active");
  }
};

// Math
function calculate(dollars, numberPeople, tipPercent) {
  var tipTotal= dollars*(tipPercent/100);
  calculatedTipAmount = (tipTotal/numberPeople).toFixed(2);
  calculatedTotal = ((dollars+tipTotal)/numberPeople).toFixed(2);
}
