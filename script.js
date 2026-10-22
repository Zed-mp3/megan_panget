
"use strict";

/* PERSONAL SETTINGS */
const SECRET_PIN = "100428";

// Boyfriend's birthday: October 28, 2004
const BIRTHDAY_DAY = 28;
const BIRTHDAY_MONTH = 10;
const BIRTHDAY_YEAR = 2004;

/* PAGE NAVIGATION */
const pageIds = [
  "passwordPage",
  "calendarPage",
  "birthdayPage",
  "galleryPage",
  "letterPage"
];

function showPage(pageId) {
  if (!pageIds.includes(pageId)) {
    console.error("Page not found:", pageId);
    return;
  }

  pageIds.forEach(function (id) {
    const page = document.getElementById(id);

    if (page) {
      page.hidden = id !== pageId;
    }
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

/* SIX-DIGIT SECRET PIN */
const pinForm = document.getElementById("pinForm");
const pinInput = document.getElementById("pinInput");
const pinError = document.getElementById("pinError");

pinInput.addEventListener("input", function () {
  pinInput.value = pinInput.value.replace(/\D/g, "").slice(0, 6);
  pinError.textContent = "";
});

pinForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const enteredPin = pinInput.value.trim();

  if (!/^\d{6}$/.test(enteredPin)) {
    pinError.textContent = "Please enter a 6-digit PIN.";
    return;
  }

  if (enteredPin === SECRET_PIN) {
    pinError.textContent = "";
    showPage("calendarPage");
  } else {
    pinError.textContent = "Wrong PIN! Try again, my love. 💙";
    pinInput.value = "";
    pinInput.focus();
  }
});

/* NEXT BUTTONS */
document.querySelectorAll("[data-next]").forEach(function (button) {
  button.addEventListener("click", function () {
    showPage(button.getAttribute("data-next"));
  });
});

/* BACK BUTTONS */
document.querySelectorAll("[data-back]").forEach(function (button) {
  button.addEventListener("click", function () {
    showPage(button.getAttribute("data-back"));
  });
});

/* BIRTHDAY CALENDAR */
function createCalendar() {
  const heading = document.getElementById("calendarMonth");
  const daysContainer = document.getElementById("calendarDays");
  const dateText = document.getElementById("birthdayDateText");

  const birthday = new Date(
    BIRTHDAY_YEAR,
    BIRTHDAY_MONTH - 1,
    BIRTHDAY_DAY
  );

  // Validate the birthday date.
  if (
    birthday.getFullYear() !== BIRTHDAY_YEAR ||
    birthday.getMonth() !== BIRTHDAY_MONTH - 1 ||
    birthday.getDate() !== BIRTHDAY_DAY
  ) {
    heading.textContent = "Check Birthday Settings";
    dateText.textContent = "Please check the date in script.js.";
    return;
  }

  // Display October 2004.
  heading.textContent = birthday.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric"
  });

  daysContainer.innerHTML = "";

  // Find the weekday of October 1, 2004.
  const firstDay = new Date(
    BIRTHDAY_YEAR,
    BIRTHDAY_MONTH - 1,
    1
  ).getDay();

  // Find the number of days in October 2004.
  const totalDays = new Date(
    BIRTHDAY_YEAR,
    BIRTHDAY_MONTH,
    0
  ).getDate();

  // Create empty spaces before the first day.
  for (let i = 0; i < firstDay; i++) {
    const blank = document.createElement("span");
    blank.setAttribute("aria-hidden", "true");
    daysContainer.appendChild(blank);
  }

  // Generate all the dates in the calendar.
  for (let day = 1; day <= totalDays; day++) {
    const dayElement = document.createElement("span");
    dayElement.textContent = day;

    // Highlight his birthday: October 28.
    if (day === BIRTHDAY_DAY) {
      dayElement.classList.add("birthday-day");
      dayElement.title = "Your special day! 💙";
      dayElement.setAttribute("aria-label", "Birthday: October 28");
    }

    daysContainer.appendChild(dayElement);
  }

  // Show the complete birthday date.
  dateText.textContent = birthday.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}

createCalendar();

/* BIRTHDAY CELEBRATION */
const wishButton = document.getElementById("wishButton");
const celebrationMessage = document.getElementById("celebrationMessage");

let celebrationTimer;

wishButton.addEventListener("click", function () {
  celebrationMessage.hidden = false;

  clearTimeout(celebrationTimer);

  celebrationTimer = setTimeout(function () {
    celebrationMessage.hidden = true;
  }, 3500);

  // Falling hearts and birthday confetti.
  const emojis = ["🎈", "🎈", "🎈", "🎈", "🎈", "🎈"];

  for (let i = 0; i < 25; i++) {
    const confetti = document.createElement("span");

    confetti.textContent =
      emojis[Math.floor(Math.random() * emojis.length)];

    confetti.style.position = "fixed";
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.top = "-30px";
    confetti.style.zIndex = "20";
    confetti.style.pointerEvents = "none";
    confetti.style.fontSize = "22px";

    document.body.appendChild(confetti);

    const horizontalMovement = (Math.random() - 0.5) * 160;
    const duration = 1800 + Math.random() * 1800;

    const animation = confetti.animate(
      [
        {
          transform: "translate(0, 0) rotate(0deg)",
          opacity: 1
        },
        {
          transform:
            "translate(" + horizontalMovement + "px, 100vh) rotate(600deg)",
          opacity: 0
        }
      ],
      {
        duration: duration,
        easing: "ease-in",
        fill: "forwards"
      }
    );

    animation.onfinish = function () {
      confetti.remove();
    };
  }
});

/* START AGAIN */
const restartButton = document.getElementById("restartButton");

restartButton.addEventListener("click", function () {
  pinInput.value = "";
  pinError.textContent = "";
  celebrationMessage.hidden = true;

  clearTimeout(celebrationTimer);

  showPage("passwordPage");
});

/* START AT THE PIN SCREEN */
showPage("passwordPage");
