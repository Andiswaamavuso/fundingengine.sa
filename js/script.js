
    const mobileMenu = document.getElementById("mobileMenu");
    const navLinks = document.getElementById("navLinks");

    mobileMenu.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });


    let currentSection = 1;

const totalSections = 5;


/* =========================================
   NAVIGATION
========================================= */

function nextSection() {

    const current = document.getElementById(
        "section" + currentSection
    );

    const inputs = current.querySelectorAll(
        'input[type="radio"]'
    );

    const questionNames = [
        ...new Set(
            Array.from(inputs).map(input => input.name)
        )
    ];

    for (const name of questionNames) {

        const answered = current.querySelector(
            `input[name="${name}"]:checked`
        );

        if (!answered) {

            alert("Please answer all questions before continuing.");

            return;
        }
    }


    if (currentSection < totalSections) {

        current.classList.remove("active");

        currentSection++;

        document.getElementById(
            "section" + currentSection
        ).classList.add("active");

        updateProgress();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
}


function previousSection() {

    if (currentSection > 1) {

        document.getElementById(
            "section" + currentSection
        ).classList.remove("active");

        currentSection--;

        document.getElementById(
            "section" + currentSection
        ).classList.add("active");

        updateProgress();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
}


/* =========================================
   PROGRESS
========================================= */

function updateProgress() {

    const percent =
        Math.round(
            (currentSection / totalSections) * 100
        );

    document.getElementById(
        "progressText"
    ).textContent =
        `Step ${currentSection} of ${totalSections}`;

    document.getElementById(
        "progressPercent"
    ).textContent =
        `${percent}%`;

    document.getElementById(
        "progressFill"
    ).style.width =
        `${percent}%`;
}


/* =========================================
   SCORE CALCULATION
========================================= */

function calculateScore() {

    const current =
        document.getElementById(
            "section" + currentSection
        );

    const inputs =
        current.querySelectorAll(
            'input[type="radio"]'
        );

    const questionNames = [
        ...new Set(
            Array.from(inputs).map(input => input.name)
        )
    ];

    for (const name of questionNames) {

        const answered = current.querySelector(
            `input[name="${name}"]:checked`
        );

        if (!answered) {

            alert(
                "Please answer all questions before viewing your score."
            );

            return;
        }
    }


    /* Financial Health: Q1-Q3 */

    const financialScore =
        getScore("q1") +
        getScore("q2") +
        getScore("q3");


    /* Risk & Credibility: Q4-Q6 */

    const riskScore =
        getScore("q4") +
        getScore("q5") +
        getScore("q6");


    /* Credit History: Q7-Q8 */

    const creditScore =
        getScore("q7") +
        getScore("q8");


    /* Management: Q9-Q10 */

    const managementScore =
        getScore("q9") +
        getScore("q10");


    /* Business Plan: Q11-Q13 */

    const businessPlanScore =
        getScore("q11") +
        getScore("q12") +
        getScore("q13");


    /* Total */

    const totalScore =
        financialScore +
        riskScore +
        creditScore +
        managementScore +
        businessPlanScore;


    /* Display scores */

    document.getElementById(
        "totalScore"
    ).textContent = totalScore;


    document.getElementById(
        "financialScore"
    ).textContent = financialScore;


    document.getElementById(
        "riskScore"
    ).textContent = riskScore;


    document.getElementById(
        "creditScore"
    ).textContent = creditScore;


    document.getElementById(
        "managementScore"
    ).textContent = managementScore;


    document.getElementById(
        "businessPlanScore"
    ).textContent = businessPlanScore;


    /* Progress bars */

    setBar(
        "financialBar",
        financialScore,
        25
    );

    setBar(
        "riskBar",
        riskScore,
        25
    );

    setBar(
        "creditBar",
        creditScore,
        15
    );

    setBar(
        "managementBar",
        managementScore,
        15
    );

    setBar(
        "businessPlanBar",
        businessPlanScore,
        20
    );


    /* Pillar feedback */

    document.getElementById(
        "financialFeedback"
    ).textContent =
        getPillarFeedback(financialScore, 25);


    document.getElementById(
        "riskFeedback"
    ).textContent =
        getPillarFeedback(riskScore, 25);


    document.getElementById(
        "creditFeedback"
    ).textContent =
        getPillarFeedback(creditScore, 15);


    document.getElementById(
        "managementFeedback"
    ).textContent =
        getPillarFeedback(managementScore, 15);


    document.getElementById(
        "businessPlanFeedback"
    ).textContent =
        getPillarFeedback(businessPlanScore, 20);


    /* Overall status */

    setOverallStatus(totalScore);


    /* Recommendations */

    generateRecommendations({
        financial: financialScore,
        risk: riskScore,
        credit: creditScore,
        management: managementScore,
        businessPlan: businessPlanScore
    });


    /* Hide assessment */

    for (
        let i = 1;
        i <= totalSections;
        i++
    ) {

        document.getElementById(
            "section" + i
        ).classList.remove("active");
    }


    document.getElementById(
        "progressContainer"
    ).style.display = "none";


    document.getElementById(
        "results"
    ).style.display = "block";


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================
   GET RADIO SCORE
========================================= */

function getScore(questionName) {

    const selected =
        document.querySelector(
            `input[name="${questionName}"]:checked`
        );

    return selected
        ? Number(selected.value)
        : 0;
}


/* =========================================
   PROGRESS BAR
========================================= */

function setBar(id, score, maximum) {

    const percentage =
        (score / maximum) * 100;

    document.getElementById(
        id
    ).style.width =
        `${percentage}%`;
}


/* =========================================
   PILLAR FEEDBACK
========================================= */

function getPillarFeedback(score, maximum) {

    const percentage =
        (score / maximum) * 100;


    if (percentage < 40) {

        return "This is an area that should be prioritised before seeking funding.";

    }


    if (percentage < 70) {

        return "There is a reasonable foundation, but strengthening this area could improve your funding readiness.";

    }


    return "This is currently one of the stronger areas of your funding profile.";

}


/* =========================================
   OVERALL STATUS
========================================= */

function setOverallStatus(score) {

    const status =
        document.getElementById(
            "scoreStatus"
        );

    const description =
        document.getElementById(
            "scoreDescription"
        );


    if (score < 40) {

        status.textContent =
            "Needs Improvement";

        description.textContent =
            "Your assessment highlights several areas that should be strengthened before approaching funders.";

    }

    else if (score < 60) {

        status.textContent =
            "Developing";

        description.textContent =
            "Your business has some funding foundations in place, but there are important areas that could be improved.";

    }

    else if (score < 80) {

        status.textContent =
            "Funding Ready";

        description.textContent =
            "Your business demonstrates a solid level of funding readiness, although there may still be areas worth strengthening.";

    }

    else {

        status.textContent =
            "Strong Funding Profile";

        description.textContent =
            "Your assessment indicates strong foundations across the key areas measured.";

    }

}


/* =========================================
   RECOMMENDATIONS
========================================= */

function generateRecommendations(scores) {

    const recommendation =
        document.getElementById(
            "recommendation"
        );


    const areas = [

        {
            name: "Financial Health",
            score: scores.financial,
            maximum: 25,
            recommendations: [
                "Improve the consistency and visibility of your revenue.",
                "Work towards stronger and more consistent profit margins.",
                "Keep complete, up-to-date financial statements and management accounts."
            ]
        },

        {
            name: "Risk & Credibility",
            score: scores.risk,
            maximum: 25,
            recommendations: [
                "Ensure your business registration and compliance requirements are up to date.",
                "Maintain a dedicated business bank account.",
                "Create and organise a complete funding documentation pack."
            ]
        },

        {
            name: "Credit History",
            score: scores.credit,
            maximum: 15,
            recommendations: [
                "Build a stronger business credit profile through responsible use of credit.",
                "Prioritise the settlement of overdue accounts and outstanding obligations.",
                "Maintain a clean repayment history going forward."
            ]
        },

        {
            name: "Management & Leadership",
            score: scores.management,
            maximum: 15,
            recommendations: [
                "Document important operational processes.",
                "Strengthen management systems and internal controls.",
                "Clearly document the experience and responsibilities of the management team."
            ]
        },

        {
            name: "Business Plan & Growth",
            score: scores.businessPlan,
            maximum: 20,
            recommendations: [
                "Develop a detailed business plan.",
                "Prepare realistic 12–36 month financial projections.",
                "Clearly explain how funding will be deployed and what measurable outcomes it should achieve."
            ]
        }

    ];


    /*
       Sort areas from weakest to strongest.
       This ensures the most important
       improvement areas appear first.
    */

    areas.sort(
        (a, b) =>
            (a.score / a.maximum) -
            (b.score / b.maximum)
    );


    let html =
        "<p><strong>Your priority areas:</strong></p>";

    html += "<ul>";


    /*
       Show the three weakest areas.
    */

    areas.slice(0, 3).forEach(area => {

        const percentage =
            Math.round(
                (area.score / area.maximum) * 100
            );


        html += `
            <li>
                <strong>${area.name}</strong>
                (${percentage}%)
                <ul>
        `;


        area.recommendations
            .slice(0, 2)
            .forEach(item => {

                html += `
                    <li>${item}</li>
                `;

            });


        html += `
                </ul>
            </li>
        `;

    });


    html += "</ul>";


    /*
       General recommendation based
       on the overall score.
    */

    const total =
        areas.reduce(
            (sum, area) => sum + area.score,
            0
        );


    html += "<p>";


    if (total < 40) {

        html +=
            "<strong>Recommended focus:</strong> Strengthen the fundamentals of your business before actively pursuing external funding.";

    }

    else if (total < 60) {

        html +=
            "<strong>Recommended focus:</strong> Address your weakest areas first, particularly financial records, credit, compliance and funding documentation.";

    }

    else if (total < 80) {

        html +=
            "<strong>Recommended focus:</strong> Your foundation is developing well. Focus on strengthening the lowest-scoring pillars and preparing a lender/investor-ready funding package.";

    }

    else {

        html +=
            "<strong>Recommended focus:</strong> Maintain your current foundations and ensure your financial information, projections and funding proposal are fully prepared before approaching funders.";

    }


    html += "</p>";


    recommendation.innerHTML =
        html;

}


/* =========================================
   RETAKE ASSESSMENT
========================================= */

function restartAssessment() {

    /*
       Reset all answers.
    */

    document
        .querySelectorAll(
            'input[type="radio"]'
        )
        .forEach(input => {

            input.checked = false;

        });


    /*
       Reset section.
    */

    document
        .querySelectorAll(".section")
        .forEach(section => {

            section.classList.remove("active");

        });


    currentSection = 1;


    document
        .getElementById("section1")
        .classList.add("active");


    /*
       Reset progress.
    */

    document
        .getElementById("progressContainer")
        .style.display = "block";


    updateProgress();


    /*
       Hide results.
    */

    document
        .getElementById("results")
        .style.display = "none";


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================
   INITIALISE
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateProgress();

        document
            .getElementById("results")
            .style.display = "none";

    }
);
