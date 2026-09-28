
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

    
/* =====================================
   SETTINGS
===================================== */

const totalSections = 6;

let currentSection = 1;


/* =====================================
   NAVIGATION
===================================== */

function showSection(sectionNumber) {

    document.querySelectorAll(".section").forEach(section => {
        section.classList.remove("active");
    });

    const section = document.getElementById("section" + sectionNumber);

    if (section) {
        section.classList.add("active");
    }

    currentSection = sectionNumber;

    updateProgress();

    window.scrollTo({
        top: document.querySelector(".fundability-card").offsetTop - 30,
        behavior: "smooth"
    });
}


function nextSection() {

    if (!validateSection()) {
        return;
    }

    if (currentSection < totalSections) {

        showSection(currentSection + 1);

    }

}


function previousSection() {

    if (currentSection > 1) {

        showSection(currentSection - 1);

    }

}


/* =====================================
   VALIDATION
===================================== */

function validateSection() {

    /* Validate lead details */

    if (currentSection === 1) {

        const fullName =
            document.getElementById("fullName").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const businessName =
            document.getElementById("businessName").value.trim();


        if (!fullName || !email || !phone || !businessName) {

            alert("Please complete all fields before continuing.");

            return false;

        }


       const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            alert("Please enter a valid email address.");

            return false;
            

        }


        return true;

    }


    const section =
        document.getElementById("section" + currentSection);

    const questions =
        section.querySelectorAll(".question");

    let valid = true;


    questions.forEach(question => {

        const checked =
            question.querySelector("input:checked");

        if (!checked) {

            valid = false;

            question.style.borderLeft = "3px solid #ef4444";
            question.style.paddingLeft = "12px";

        } else {

            question.style.borderLeft = "";
            question.style.paddingLeft = "";

        }

    });


    if (!valid) {

        alert("Please answer all questions before continuing.");

        return false;

    }


    return true;

}


/* =====================================
   PROGRESS
===================================== */

function updateProgress() {

    const percent =
        (currentSection / totalSections) * 100;

    document.getElementById("progressFill").style.width =
        percent + "%";

    document.getElementById("progressPercent").innerText =
        Math.round(percent) + "%";

    document.getElementById("progressText").innerText =
        "Step " + currentSection + " of " + totalSections;

}


/* =====================================
   GET ANSWER
===================================== */

function getValue(question) {

    const selected =
        document.querySelector(
            'input[name="' + question + '"]:checked'
        );

    return selected
        ? parseInt(selected.value)
        : 0;

}


/* =====================================
   CALCULATE SCORE
===================================== */

function calculateScore() {

    if (!validateSection()) {
        return;
    }


    const financial =
        getValue("q1") +
        getValue("q2") +
        getValue("q3");


    const risk =
        getValue("q4") +
        getValue("q5") +
        getValue("q6");


    const credit =
        getValue("q7") +
        getValue("q8");


    const management =
        getValue("q9") +
        getValue("q10");


    const businessPlan =
        getValue("q11") +
        getValue("q12") +
        getValue("q13");


    const total =
        financial +
        risk +
        credit +
        management +
        businessPlan;


    generateResults(
        total,
        financial,
        risk,
        credit,
        management,
        businessPlan
    );


    /*
       IMPORTANT:
       Submit the lead and score to FormSubmit.
    */

    submitToFormSubmit(
        total,
        financial,
        risk,
        credit,
        management,
        businessPlan
    );

}


/* =====================================
   GENERATE RESULTS
===================================== */

function generateResults(
    total,
    financial,
    risk,
    credit,
    management,
    businessPlan
) {

    document.querySelectorAll(".section").forEach(section => {
        section.style.display = "none";
    });

    document.getElementById("progressContainer").style.display =
        "none";

    document.getElementById("intro").style.display =
        "none";

    document.getElementById("results").style.display =
        "block";


    document.getElementById("totalScore").innerText =
        total;


    document.getElementById("financialScore").innerText =
        financial;

    document.getElementById("riskScore").innerText =
        risk;

    document.getElementById("creditScore").innerText =
        credit;

    document.getElementById("managementScore").innerText =
        management;

    document.getElementById("businessPlanScore").innerText =
        businessPlan;


    document.getElementById("financialBar").style.width =
        (financial / 25 * 100) + "%";

    document.getElementById("riskBar").style.width =
        (risk / 25 * 100) + "%";

    document.getElementById("creditBar").style.width =
        (credit / 15 * 100) + "%";

    document.getElementById("managementBar").style.width =
        (management / 15 * 100) + "%";

    document.getElementById("businessPlanBar").style.width =
        (businessPlan / 20 * 100) + "%";


    generateRecommendation(total);

    generateRisks(
        financial,
        risk,
        credit,
        management,
        businessPlan
    );

    generateFundingTypes(
        total,
        financial,
        risk,
        credit,
        management,
        businessPlan
    );

    generateActionPlan(
        financial,
        risk,
        credit,
        management,
        businessPlan
    );


    window.scrollTo({
        top: document.querySelector(".fundability-card").offsetTop - 20,
        behavior: "smooth"
    });

}


/* =====================================
   RECOMMENDATION
===================================== */

function generateRecommendation(score) {

    const status =
        document.getElementById("scoreStatus");

    const description =
        document.getElementById("scoreDescription");

    const recommendation =
        document.getElementById("recommendation");


    status.className = "score-status";


    if (score <= 39) {

        status.innerText =
            "Not Fundable";

        status.classList.add("red");

        description.innerText =
            "Your business currently has significant funding readiness gaps.";

        recommendation.innerHTML =
            "<strong>Recommendation:</strong> Focus on strengthening the fundamentals of your business before submitting funding applications. Prioritise financial records, compliance, creditworthiness and a clear funding strategy.";

    }

    else if (score <= 59) {

        status.innerText =
            "Emerging Fundability";

        status.classList.add("orange");

        description.innerText =
            "Your business shows potential but has important areas that should be improved.";

        recommendation.innerHTML =
            "<strong>Recommendation:</strong> Your business may qualify for certain funding opportunities, but improving your weaker areas could significantly strengthen your application and expand your funding options.";

    }

    else if (score <= 79) {

        status.innerText =
            "Funding Ready";

        status.classList.add("yellow");

        description.innerText =
            "Your business meets many of the characteristics funders look for.";

        recommendation.innerHTML =
            "<strong>Recommendation:</strong> You are approaching a strong funding position. Focus on closing the remaining gaps, preparing a professional funding pack and targeting funding opportunities that match your business.";

    }

    else {

        status.innerText =
            "Highly Fundable";

        status.classList.add("green");

        description.innerText =
            "Your business demonstrates strong funding readiness.";

        recommendation.innerHTML =
            "<strong>Recommendation:</strong> Your business appears well positioned to approach suitable lenders, investors and grant providers. Your priority should now be matching your business with the right funding source and presenting a compelling funding case.";

    }

}


/* =====================================
   RISKS
===================================== */

function generateRisks(
    financial,
    risk,
    credit,
    management,
    businessPlan
) {

    const list =
        document.getElementById("riskList");

    list.innerHTML = "";


    const risks = [];


    if (financial < 15) {

        risks.push(
            "Financial health is below the recommended level. Your revenue, profitability or financial reporting may need strengthening."
        );

    }


    if (risk < 15) {

        risks.push(
            "Business credibility and documentation may not yet meet the expectations of many funders."
        );

    }


    if (credit < 9) {

        risks.push(
            "Your business credit profile or repayment history may limit some funding options."
        );

    }


    if (management < 9) {

        risks.push(
            "Management experience, systems or operational processes could be strengthened."
        );

    }


    if (businessPlan < 12) {

        risks.push(
            "Your business plan, projections or funding strategy may require further development."
        );

    }


    if (risks.length === 0) {

        risks.push(
            "No major weaknesses were identified by this scorecard. Continue maintaining strong financial, operational and funding documentation."
        );

    }


    risks.forEach(riskItem => {

        const li =
            document.createElement("li");

        li.innerText =
            riskItem;

        list.appendChild(li);

    });

}


/* =====================================
   FUNDING TYPES
===================================== */

function generateFundingTypes(
    total,
    financial,
    risk,
    credit,
    management,
    businessPlan
) {

    const container =
        document.getElementById("fundingTypes");

    container.innerHTML = "";


    const types = [];


    if (total >= 60 && financial >= 15 && credit >= 7) {

        types.push("Business Loans");

    }


    if (businessPlan >= 12 && management >= 8) {

        types.push("Equity / Investment");

    }


    if (risk >= 15 && businessPlan >= 10) {

        types.push("Grants");

    }


    if (total >= 40) {

        types.push("Alternative Funding");

    }


    if (types.length === 0) {

        types.push("Funding Readiness Preparation");

    }


    types.forEach(type => {

        const tag =
            document.createElement("div");

        tag.className =
            "funding-tag";

        tag.innerText =
            type;

        container.appendChild(tag);

    });

}


/* =====================================
   ACTION PLAN
===================================== */

function generateActionPlan(
    financial,
    risk,
    credit,
    management,
    businessPlan
) {

    const list =
        document.getElementById("actionList");

    list.innerHTML = "";


    const actions = [];


    if (financial < 20) {

        actions.push(
            "Strengthen your financial records, bookkeeping, profitability tracking and cash-flow management."
        );

    }


    if (risk < 20) {

        actions.push(
            "Ensure your business registration, compliance documents, bank account and supporting business documents are up to date."
        );

    }


    if (credit < 12) {

        actions.push(
            "Review your business credit profile and establish a consistent repayment history."
        );

    }


    if (management < 12) {

        actions.push(
            "Document key operational processes and strengthen management systems and controls."
        );

    }


    if (businessPlan < 16) {

        actions.push(
            "Develop a lender/investor-ready business plan with realistic 12–36 month financial projections."
        );

        actions.push(
            "Create a clear funding allocation plan showing exactly how capital will be used and how it will generate business growth."
        );

    }


    if (actions.length === 0) {

        actions.push(
            "Maintain your current financial and operational standards while identifying funding opportunities aligned with your growth strategy."
        );

        actions.push(
            "Prepare a professional funding application pack and begin targeting suitable funding providers."
        );

    }


    actions.forEach(action => {

        const li =
            document.createElement("li");

        li.innerText =
            action;

        list.appendChild(li);

    });

}


/* =====================================
   FORMSUBMIT
===================================== */


function submitToFormSubmit(
    total,
    financial,
    risk,
    credit,
    management,
    businessPlan
) {

    const form = document.createElement("form");

    form.method = "POST";

    form.action = "https://formsubmit.co/fundingengine.sa@gmail.com";

    form.style.display = "none";


    /* =====================================
       EMAIL CONFIGURATION
    ===================================== */

    addHiddenInput(
        form,
        "_subject",
        "New Funding Engine™ Fundability Assessment"
    );

    addHiddenInput(
        form,
        "_captcha",
        "false"
    );

    addHiddenInput(
        form,
        "_template",
        "table"
    );


    /* =====================================
       LEAD INFORMATION
    ===================================== */

    addHiddenInput(
        form,
        "Full Name",
        document.getElementById("fullName").value
    );

    addHiddenInput(
        form,
        "Email Address",
        document.getElementById("email").value
    );

    addHiddenInput(
        form,
        "Phone Number",
        document.getElementById("phone").value
    );

    addHiddenInput(
        form,
        "Business Name",
        document.getElementById("businessName").value
    );


    /* =====================================
       OVERALL SCORE
    ===================================== */

    addHiddenInput(
        form,
        "OVERALL FUNDABILITY SCORE",
        total + " / 100"
    );


    /* =====================================
       PILLAR SCORES
    ===================================== */

    addHiddenInput(
        form,
        "Financial Health Score",
        financial + " / 25"
    );

    addHiddenInput(
        form,
        "Risk & Credibility Score",
        risk + " / 25"
    );

    addHiddenInput(
        form,
        "Credit History Score",
        credit + " / 15"
    );

    addHiddenInput(
        form,
        "Management & Leadership Score",
        management + " / 15"
    );

    addHiddenInput(
        form,
        "Business Plan & Growth Score",
        businessPlan + " / 20"
    );


    /* =====================================
       INDIVIDUAL ANSWERS
    ===================================== */

    for (let i = 1; i <= 13; i++) {

        const answer = document.querySelector(
            'input[name="q' + i + '"]:checked'
        );

        if (answer) {

            addHiddenInput(
                form,
                "Question " + i + " Score",
                answer.value
            );

        }
    }


    /* =====================================
       SUBMIT
    ===================================== */

    document.body.appendChild(form);

    form.submit();
}


/* =====================================
   CREATE HIDDEN INPUT
===================================== */

function addHiddenInput(form, name, value) {

    const input = document.createElement("input");

    input.type = "hidden";

    input.name = name;

    input.value = value;

    form.appendChild(input);
}


/* =====================================
   RESTART
===================================== */

function restartAssessment() {

    document.querySelectorAll(
        "input[type='radio']"
    ).forEach(input => {

        input.checked = false;

    });


    document.getElementById("results").style.display =
        "none";

    document.getElementById("progressContainer").style.display =
        "block";

    document.getElementById("intro").style.display =
        "block";


    document.querySelectorAll(".section").forEach(section => {

        section.style.display = "";

    });


    currentSection = 1;

    showSection(1);

}


/* =====================================
   INITIALISE
===================================== */

updateProgress();
