class Timer {
    constructor(root) {
      root.innerHTML = Timer.getHTML();
  
      this.el = {
        minutes: root.querySelector(".timer__part--minutes"),
        seconds: root.querySelector(".timer__part--seconds"),
        control: root.querySelector(".timer__btn--control"),
        reset: root.querySelector(".timer__btn--reset"),
        shortB: root.querySelector(".timer__btn--short"),
        longB: root.querySelector(".timer__btn--long"),
        pomodoro: root.querySelector(".timer__btn--pomodoro"),
        timer: root.querySelector(".timer-block")
      };
  
      this.interval = null;
      this.settings = {
        sessionDuration: 25 * 60,  // Default session duration in seconds
        breakDuration: 5 * 60,    // Default break duration in seconds
        longBreakAfter: 4,        // Default number of Pomodoros before a long break
        longBreakDuration: 15 * 60 // Default long break duration in seconds
      };
      this.remainingSeconds = this.settings.sessionDuration;
      this.updateInterfaceTime();
  
      this.el.control.addEventListener("click", () => {
        if (this.interval === null) {
          this.start();
        } else {
          this.stop();
        }
      });
  
      this.el.shortB.addEventListener("click", () => {
        this.remainingSeconds = this.settings.breakDuration;
        this.updateInterfaceTime();
        document.body.style.backgroundColor = "rgb(57,112,151)";
       
        document.getElementById("timer-block").style.backgroundColor="#4D7FA2";
        
        
      });
  
      this.el.longB.addEventListener("click", () => {
        this.remainingSeconds = this.settings.longBreakDuration;
        this.updateInterfaceTime();
        document.body.style.backgroundColor = "rgb(56,133,138)";
        document.getElementById("timer-block").style.backgroundColor="rgb(76,145,150)";
        
      });
  
      this.el.pomodoro.addEventListener("click", () => {
        this.remainingSeconds = this.settings.sessionDuration;
        this.updateInterfaceTime();
        document.body.style.backgroundColor = "rgb(186,73,73)";
        document.getElementById("timer-block").style.backgroundColor="rgb(193,92,92)";
        
      });
  
  
    }
  
    updateInterfaceTime() {
      const minutes = Math.floor(this.remainingSeconds / 60);
      const seconds = this.remainingSeconds % 60;
  
      this.el.minutes.textContent = minutes.toString().padStart(2, "0");
      this.el.seconds.textContent = seconds.toString().padStart(2, "0");
    }
  
    updateInterfaceControls() {
      if (this.interval === null) {
        this.el.control.innerHTML = `<span >Start</span>`;
        this.el.control.classList.add("timer__btn--start");
        this.el.control.classList.remove("timer__btn--stop");
      } else {
        this.el.control.innerHTML = `<span >pause</span>`;
        this.el.control.classList.add("timer__btn--stop");
        this.el.control.classList.remove("timer__btn--start");
      }
    }
  
    start() {
      if (this.remainingSeconds === 0 || this.remainingSeconds<=0) {
        alert("check time again");
        return;
      };
  
      this.interval = setInterval(() => {
        
        
        // this.remainingSeconds--;
        this.updateInterfaceTime();
        if (this.remainingSeconds === 0 || this.remainingSeconds<=0) {
          var audio = new Audio('./mixkit-data-scaner-2847.wav');
          audio.play();
          this.stop();
          if (this.settings.breakDuration > 0) {
            this.sendNotification("Take a Break", {
              body: "It's time for a short break!",
            });
          } else {
            this.sendNotification("Start a New Pomodoro", {
              body: "Time to start a new Pomodoro session!",
            });
          }
        }
        this.remainingSeconds--;
      }, 1000);
  
      this.updateInterfaceControls();
    }
  
    stop() {
      clearInterval(this.interval);
      this.interval = null;
      this.updateInterfaceControls();
    }
  
    static getHTML() {
      return `
      <div class="time-btn">
      <button class="btn timer__btn--pomodoro">Pomodoro</button>
      <button class="btn timer__btn--short">Short Break</button>
      <button class="btn timer__btn--long">Long Break</button>
    </div>
      <div class="time">
      <span class="timer__part timer__part--minutes">00</span>
      
      <span class="timer__part">:</span>
      <span class="timer__part timer__part--seconds">00</span>
      
      </div>
      <div class="timer-toggle-btn">
      <button type="button" class="timer__btn timer__btn--control timer__btn--start">
      Start
      </button>
      <!-- <button type="button" class="timer__btn timer__btn--reset">
      <span class="material-icons">timer</span>
      </button>-->
      </div>
    `;
    }
  
    setSettings(sessionDuration, breakDuration, longBreakAfter, longBreakDuration) {
      this.settings.sessionDuration = sessionDuration * 60;
      this.settings.breakDuration = breakDuration * 60;
      this.settings.longBreakAfter = longBreakAfter;
      this.settings.longBreakDuration = longBreakDuration * 60;
      this.remainingSeconds = this.settings.sessionDuration;
      this.updateInterfaceTime();
    }
    sendNotification(title, options) {
      const notificationPermission = document.getElementById(
        "notificationPermission"
        
      );
  
      if (notificationPermission.checked) {
        if (Notification.permission === "granted") {
          const notification = new Notification(title, options);
          console.log("Notification displayed:", notification);
        } else {
          console.error("Notification permission not granted.");
        }
      }
    }
  }
  
  const timer = new Timer(document.querySelector(".timer"));
  
  // Function to open the settings popup and set the input values based on current settings
  function openSettings() {
    const { sessionDuration, breakDuration, longBreakAfter, longBreakDuration } = timer.settings;
  
    document.getElementById("sessionDuration").value = sessionDuration / 60;
    document.getElementById("breakDuration").value = breakDuration / 60;
    document.getElementById("longBreakAfter").value = longBreakAfter;
    document.getElementById("longBreakDuration").value = longBreakDuration / 60;
  
    document.getElementById("settingsPopup").style.display = "flex";
  }
  
  // Function to save the settings from the popup and update the timer
  function saveSettings() {
    const sessionDuration = parseInt(document.getElementById("sessionDuration").value);
    const breakDuration = parseInt(document.getElementById("breakDuration").value);
    const longBreakAfter = parseInt(document.getElementById("longBreakAfter").value);
    const longBreakDuration = parseInt(document.getElementById("longBreakDuration").value);
  
    timer.setSettings(sessionDuration, breakDuration, longBreakAfter, longBreakDuration);
  
    document.getElementById("settingsPopup").style.display = "none";
  }
  function closeSettings() {
    document.getElementById("settingsPopup").style.display = "none";
}
