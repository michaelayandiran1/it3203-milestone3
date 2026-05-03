/* ============================================================
   IT 3203 Project Milestone #3 – Responsive and Mobile Web Design
   script.js – Single external JavaScript file
   Author: Michael Olaide Ayandiran
   ============================================================ */

/* ── Hamburger Navigation Toggle ──────────────────────────────
   RESPONSIVE DESIGN PRINCIPLE: Hamburger menu for mobile.
   On small screens the full nav takes too much vertical space.
   A toggle button shows/hides the links panel, and receives
   ARIA attributes so screen readers understand the state.
   ─────────────────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", function () {

  const toggleBtn = document.getElementById("nav-toggle");
  const navLinks  = document.getElementById("nav-links");

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener("click", function () {
      const isOpen = navLinks.classList.toggle("open");
      // Update ARIA for accessibility
      toggleBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      // Update visible icon
      toggleBtn.textContent = isOpen ? "✕" : "☰";
    });

    // Close menu when a link is tapped (prevents sticky-open on mobile)
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        toggleBtn.setAttribute("aria-expanded", "false");
        toggleBtn.textContent = "☰";
      });
    });
  }
});

/* ── Quiz Logic ────────────────────────────────────────────────
   Evaluates answers, displays per-question feedback,
   shows final score and PASS/FAIL result.
   ─────────────────────────────────────────────────────────── */

/**
 * submitQuiz()
 * Reads form values, compares to correct answers,
 * and writes result HTML into #quiz-result.
 */
function submitQuiz() {
  let score = 0;
  let feedback = "";

  // -- Question 1: Fill-in-the-blank --
  // Correct answer: keywords (or a phrase containing "keyword")
  const q1 = document.getElementById("q1");
  if (q1) {
    const val = q1.value.trim().toLowerCase();
    if (val.includes("keyword") || val.includes("key word")) {
      score++;
      feedback += buildFeedback(1, true, "");
    } else {
      feedback += buildFeedback(1, false, "Correct answer: <em>keywords</em>");
    }
  }

  // -- Question 2: Single select radio --
  // Correct: meta description
  const q2 = document.querySelector('input[name="q2"]:checked');
  if (q2 && q2.value === "meta") {
    score++;
    feedback += buildFeedback(2, true, "");
  } else {
    feedback += buildFeedback(2, false, "Correct answer: <em>Meta description</em>");
  }

  // -- Question 3: Single select radio --
  // Correct: HTTPS
  const q3 = document.querySelector('input[name="q3"]:checked');
  if (q3 && q3.value === "https") {
    score++;
    feedback += buildFeedback(3, true, "");
  } else {
    feedback += buildFeedback(3, false, "Correct answer: <em>HTTPS</em>");
  }

  // -- Question 4: Single select radio --
  // Correct: It slows page load and hurts SEO
  const q4 = document.querySelector('input[name="q4"]:checked');
  if (q4 && q4.value === "slow") {
    score++;
    feedback += buildFeedback(4, true, "");
  } else {
    feedback += buildFeedback(4, false, "Correct answer: <em>It slows page load and hurts SEO</em>");
  }

  // -- Question 5: Checkboxes – select all that apply --
  // Correct selections: "alt" and "responsive"
  const selected = Array.from(document.querySelectorAll(".q5:checked")).map(cb => cb.value);
  const correct5 = selected.includes("alt") && selected.includes("responsive") && selected.length === 2;
  if (correct5) {
    score++;
    feedback += buildFeedback(5, true, "");
  } else {
    feedback += buildFeedback(5, false, "Correct answers: <em>Alt text on images</em> and <em>Responsive design</em>");
  }

  // -- Final result --
  const passed = score >= 3;
  const resultBox = document.getElementById("quiz-result");
  if (resultBox) {
    resultBox.innerHTML =
      `<div class="card ${passed ? "highlight" : ""}">
         <h2 style="color:${passed ? "var(--clr-success)" : "var(--clr-error)"}">
           ${passed ? "✓ PASS" : "✗ FAIL"}
         </h2>
         <p><strong>Score: ${score} / 5</strong></p>
         <hr style="margin:0.75rem 0; border-color:var(--clr-border)">
         ${feedback}
       </div>`;
    // Scroll result into view on mobile
    resultBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}

/**
 * buildFeedback(questionNum, isCorrect, hint)
 * Returns an HTML string for a single question result.
 */
function buildFeedback(num, isCorrect, hint) {
  const icon   = isCorrect ? "✓" : "✗";
  const cls    = isCorrect ? "result-correct" : "result-wrong";
  const hintHTML = hint ? ` — ${hint}` : "";
  return `<p class="${cls}">${icon} Question ${num}${hintHTML}</p>`;
}

/**
 * resetQuiz()
 * Clears all inputs and wipes the result panel.
 */
function resetQuiz() {
  const form = document.getElementById("quiz-form");
  if (form) form.reset();
  const result = document.getElementById("quiz-result");
  if (result) result.innerHTML = "";
}
