document.addEventListener("DOMContentLoaded", function () {

    const quizForm = document.getElementById("quizForm");
    const quizResult = document.getElementById("quizResult");

    const studentForm = document.getElementById("studentForm");
    const formMessage = document.getElementById("formMessage");

    const subjectSelect = document.getElementById("subject");
    const topicSelect = document.getElementById("topic");

    const progressFill = document.querySelector(".progress-fill");
    const progressText = document.querySelector(".progress-text");
    const progressBar = document.querySelector(".progress-bar");

    const assessmentCard =
        document.getElementById("assessmentCard");

    const strongTopics =
        document.getElementById("strongTopics");

    const averageTopics =
        document.getElementById("averageTopics");

    const weakTopics =
        document.getElementById("weakTopics");


  

    const topics = {

        compiler: [
            {
                value: "lexical",
                text: "Lexical Analysis"
            },
            {
                value: "syntax",
                text: "Syntax Analysis"
            },
            {
                value: "parsing",
                text: "Parsing"
            }
        ],

        ds: [
            {
                value: "arrays",
                text: "Arrays"
            },
            {
                value: "stacks",
                text: "Stacks"
            },
            {
                value: "queues",
                text: "Queues"
            }
        ],

        dbms: [
            {
                value: "sql",
                text: "SQL"
            },
            {
                value: "normalization",
                text: "Normalization"
            },
            {
                value: "transactions",
                text: "Transactions"
            }
        ],

        java: []

    };


 

    const correctAnswers = {

        q1: "tokens",
        q2: "lifo",
        q3: "sql"

    };


   

    loadStudentData();

    loadSavedProgress();


   

    subjectSelect.addEventListener(
        "change",
        function () {

            populateTopics(subjectSelect.value);

        }
    );


    function populateTopics(subject) {

        topicSelect.innerHTML =
            '<option value="">--Select Topic--</option>';


        const selectedTopics =
            topics[subject] || [];


        selectedTopics.forEach(function (topic) {

            const option =
                document.createElement("option");

            option.value = topic.value;

            option.textContent = topic.text;

            topicSelect.appendChild(option);

        });

    }



    studentForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const studentData = {

                name:
                    document.getElementById("name")
                        .value.trim(),

                email:
                    document.getElementById("email")
                        .value.trim(),

                phone:
                    document.getElementById("phone")
                        .value.trim(),

                subject:
                    subjectSelect.value,

                topic:
                    topicSelect.value,

                difficulty:
                    document.getElementById("difficulty")
                        .value.trim()

            };


            localStorage.setItem(
                "studentData",
                JSON.stringify(studentData)
            );


            formMessage.textContent =
                "Student details saved successfully.";

            formMessage.style.color =
                "#24734d";

        }
    );


    

    function loadStudentData() {

        const savedData =
            localStorage.getItem("studentData");


        if (!savedData) {
            return;
        }


        const studentData =
            JSON.parse(savedData);


        document.getElementById("name").value =
            studentData.name || "";

        document.getElementById("email").value =
            studentData.email || "";

        document.getElementById("phone").value =
            studentData.phone || "";

        document.getElementById("difficulty").value =
            studentData.difficulty || "";


        if (studentData.subject) {

            subjectSelect.value =
                studentData.subject;

            populateTopics(
                studentData.subject
            );

            topicSelect.value =
                studentData.topic || "";

        }

    }


 

    quizForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            let score = 0;

            let answered = 0;


            Object.keys(correctAnswers).forEach(
                function (question) {

                    const selected =
                        document.querySelector(
                            `input[name="${question}"]:checked`
                        );


                    if (selected) {

                        answered++;


                        if (
                            selected.value ===
                            correctAnswers[question]
                        ) {

                            score++;

                        }

                    }

                }
            );


         

            if (answered < 3) {

                showQuizResult(
                    "Please answer all three questions before submitting the quiz.",
                    "error"
                );

                return;

            }


            const percentage =
                Math.round((score / 3) * 100);


            const status =
                getPerformanceStatus(percentage);


            saveProgress(
                percentage,
                status
            );


            updateProgress(
                percentage
            );


            updateTopicStatus(
                "Lexical Analysis",
                status
            );


            showQuizResult(
                createResultMessage(
                    score,
                    percentage,
                    status
                ),
                getResultType(status)
            );


            updateAssessment(
                score,
                percentage,
                status
            );

        }
    );


  
    function getPerformanceStatus(percentage) {

        if (percentage >= 80) {

            return "strong";

        }

        if (percentage >= 50) {

            return "average";

        }

        return "weak";

    }


 

    function createResultMessage(
        score,
        percentage,
        status
    ) {

        if (status === "strong") {

            return `
                Excellent! You scored
                ${score}/3 (${percentage}%).
                You have a strong understanding of the concepts.
            `;

        }


        if (status === "average") {

            return `
                Good progress! You scored
                ${score}/3 (${percentage}%).
                Review the notes once more and try again.
            `;

        }


        return `
            You scored ${score}/3 (${percentage}%).
            Review the study notes and practice the concepts again.
        `;

    }


   
    function getResultType(status) {

        if (status === "strong") {
            return "success";
        }

        if (status === "average") {
            return "warning";
        }

        return "error";

    }


  

    function showQuizResult(
        message,
        type
    ) {

        quizResult.innerHTML =
            message;

        quizResult.className =
            "quiz-result show " + type;

    }




    function updateProgress(value) {

        progressFill.style.width =
            value + "%";


        progressText.textContent =
            value + "% completed";


        progressBar.setAttribute(
            "aria-valuenow",
            value
        );

    }


  
    function updateTopicStatus(
        topic,
        status
    ) {

        removeTopic(
            strongTopics,
            topic
        );

        removeTopic(
            averageTopics,
            topic
        );

        removeTopic(
            weakTopics,
            topic
        );


        let targetList;


        if (status === "strong") {

            targetList = strongTopics;

        } else if (status === "average") {

            targetList = averageTopics;

        } else {

            targetList = weakTopics;

        }


        const item =
            document.createElement("li");

        item.textContent =
            topic;

        item.dataset.topic =
            topic;


        targetList.appendChild(item);

    }


  

    function removeTopic(
        list,
        topic
    ) {

        const items =
            list.querySelectorAll("li");


        items.forEach(function (item) {

            if (
                item.dataset.topic === topic
            ) {

                item.remove();

            }

        });

    }




    function updateAssessment(
        score,
        percentage,
        status
    ) {

        let heading;
        let message;
        let icon;


        if (status === "strong") {

            heading =
                "Strong Performance";

            message =
                `Excellent work! You scored ${score}/3.
                Your current learning performance is strong.
                Keep practicing to maintain your progress.`;

            icon = "✓";

        } else if (status === "average") {

            heading =
                "Keep Improving";

            message =
                `You scored ${score}/3.
                You have a basic understanding, but some revision
                will help improve your performance.`;

            icon = "~";

        } else {

            heading =
                "Needs More Practice";

            message =
                `You scored ${score}/3.
                Review the study notes and focus on the topics
                you find difficult before attempting the quiz again.`;

            icon = "!";

        }


        assessmentCard.innerHTML = `

            <div class="assessment-icon">
                ${icon}
            </div>

            <div>

                <h3>
                    ${heading}
                </h3>

                <p>
                    ${message}
                </p>

                <p>
                    Current Score:
                    <strong>${percentage}%</strong>
                </p>

            </div>

        `;

    }


   

    function saveProgress(
        percentage,
        status
    ) {

        const progressData = {

            percentage:
                percentage,

            status:
                status

        };


        localStorage.setItem(
            "studyProgress",
            JSON.stringify(progressData)
        );

    }


 

    function loadSavedProgress() {

        const savedProgress =
            localStorage.getItem(
                "studyProgress"
            );


        if (!savedProgress) {
            return;
        }


        const progress =
            JSON.parse(savedProgress);


        updateProgress(
            progress.percentage
        );


        updateTopicStatus(
            "Lexical Analysis",
            progress.status
        );

    }

});
