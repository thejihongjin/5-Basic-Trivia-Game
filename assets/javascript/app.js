var userAnswers = [];
var numCorrect = 0;
var numWrong = 0;
var numBlank = 0;

var intervalId;
var timeLeft = 100;
var triviaObj = [
    {
        question: '1. Who is the Hufflepuff house ghost?',
        options: ['Moaning Myrtle','Fat Friar','Grey Lady','Bloody Baron','Nearly Headless Nick'],
        answer: '1'
    },
    {
        question: '2. Which creatures pull the carriages that take students from the Hogwarts Express to the Castle?',
        options: ['hippogriffs','thestrals','centaurs','manticores'],
        answer: '1'
    },
    {
        question: '3. Dumbledore has a scar above his left knee that is a perfect map of what?',
        options: ['Hogwarts','The Ministry of Magic','Diagon Alley','The London Underground'],
        answer: '3'
    },
    {
        question: "4. What potion did Hermione brew in Moaning Myrtle's bathroom in her second year?",
        options: ['Veritaserum','Wolfsbane Potion','Polyjuice Potion','Felix Felicis','Amortentia'],
        answer: '2'
    },
    {
        question: '5. What does S.P.E.W. stand for?',
        options: ['Society for the Prosecution of Evil Wizards','Society for the Promotion of Elfish Welfare','Society for the Protection of Elderly Witches','Saving Persecuted Elves Willfully'],
        answer: '1'
    },
    {
        question: '6. Which spell is used to levitate objects?',
        options: ['Wingardium Leviosa','Alohomora','Petrificus Totalus','Locomotor Mortis','Expelliarmus'],
        answer: '0'
    },
    {
        question: "7. Which of these is NOT one of Hagrid's many pets?",
        options: ['Norbert(a)','Fluffy','Grawp','Aragog','Fang'],
        answer: '2'
    },
    {
        question: '8. Who was the headmaster of Hogwarts when the Chamber of Secrets was opened for the first time?',
        options: ['Albus Dumbledore','Phineas Nigellus Black','Rufus Scrimgeour','Armando Dippet'],
        answer: '3'
    },
    {
        question: '9. Which of these is NOT a candy that can be purchased at Honeydukes in Hogsmeade village?',
        options: ['Blood-Flavored Lollipops','Toothflossing Stringmints','Taffy Toads','Ice Mice'],
        answer: '2'
    },
    {
        question: "10. Who was the Potters' Secret Keeper?",
        options: ['Peter Pettigrew','Albus Dumbledore','Sirius Black','Remus Lupin'],
        answer: '0'
    }
];

$("#start").on("click", function() {
    $("#main-content").html("Time Remaining: <span id='time-left'>" + timeLeft + "</span> Seconds<br><br>");
    generateTriviaForm();
    $("#main-content").append("<button id='done'>Done</button>");
    intervalId = setInterval(decrement, 1000);
});

$("#main-content").on("click", "#done", function() {
    for (var i = 0; i < triviaObj.length; i++) {
        var radioName = "input[name='q"+ i +"']:checked";
        var radioValue = $(radioName).val();
        if (radioValue !== undefined) {
            userAnswers.push(radioValue);
        } else {
            userAnswers.push('');
        }
    }
    checkAnswers();
});

function decrement() {
    timeLeft--;
    $("#time-left").html(timeLeft);
    if (timeLeft === 0) {
        checkAnswers();
    }
}

function generateTriviaForm() {
    var formContainer = $("<form>");
    formContainer.addClass("container");

    for (var i = 0; i < triviaObj.length; i++) {
        var quizQuestion = $("<span>");
        $(quizQuestion).text(triviaObj[i].question);
        $(formContainer).append(quizQuestion);
        $(formContainer).append("<br>");

        for (var j = 0; j < triviaObj[i].options.length; j++) {
            var answerRadio = $("<input />");
            answerRadio.attr("type", "radio");
            answerRadio.attr("name", "q" + i); //to group radio selections together
            answerRadio.attr("id", "q" + i + "a" + j);
            answerRadio.attr("value", j);

            var answerLabel= $("<label>");
            answerLabel.attr("for", "q" + i + "a" + j);
            $(answerLabel).text(triviaObj[i].options[j]);

            $(formContainer).append(answerRadio);
            $(formContainer).append(answerLabel);
            $(formContainer).append("<br>");
        }

        $(formContainer).append("<br>");
    }
    
    $("#main-content").append(formContainer);
}

function checkAnswers() {
    clearInterval(intervalId);

    for (var i = 0; i < userAnswers.length; i++) {
        console.log("userAnswers[i] === " + userAnswers[i] + "   triviaObj[i].answer === " + triviaObj[i].answer);
        if (userAnswers[i] === '') {
            numBlank++;
        } else if (userAnswers[i] === triviaObj[i].answer) {
            numCorrect++;
        } else {
            numWrong++;
        }
    }

    $("#main-content").html("All Done!<br><br>Correct Answers: " + numCorrect + "<br>Incorrect Answers: " + numWrong + "<br>Unanswered: " + numBlank);
}