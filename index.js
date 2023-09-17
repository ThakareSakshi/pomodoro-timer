

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


        
      };
  
      this.interval = null;
      this.remainingSeconds = 25*60;
      this.updateInterfaceTime();
  
      this.el.control.addEventListener("click", () => {
        if (this.interval === null) {
          this.start();
        } else {
          this.stop();
        }
      });
      this.el.shortB.addEventListener("click", () => {
        this.remainingSeconds = 5*60;
        this.updateInterfaceTime();
        document.getElementById("hero-section").style.backgroundColor = "rgb(247,195,152)";
      });
      this.el.longB.addEventListener("click", () => {
        this.remainingSeconds = 15*60;
        this.updateInterfaceTime();
        document.getElementById("hero-section").style.backgroundColor = "rgb(168,216,167)";

      });
      this.el.pomodoro.addEventListener("click", () => {
        this.remainingSeconds = 25*60;
        this.updateInterfaceTime();
        document.getElementById("hero-section").style.backgroundColor = "rgb(200,221,248)";

      });
  
      this.el.reset.addEventListener("click", () => {
        const inputMinutes = prompt("Enter number of minutes:");
  
        if (inputMinutes < 60) {
          this.stop();
          this.remainingSeconds = inputMinutes * 60;
          this.updateInterfaceTime();
        }
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
        this.el.control.innerHTML = `<span class="material-icons">play_arrow</span>`;
        this.el.control.classList.add("timer__btn--start");
        this.el.control.classList.remove("timer__btn--stop");
      } else {
        this.el.control.innerHTML = `<span class="material-icons">pause</span>`;
        this.el.control.classList.add("timer__btn--stop");
        this.el.control.classList.remove("timer__btn--start");
      }
    }
  
    start() {
      if (this.remainingSeconds === 0) return;
  
      this.interval = setInterval(() => {
        this.remainingSeconds--;
        this.updateInterfaceTime();
  
        if (this.remainingSeconds === 0) {
          
          var audio = new Audio('./mixkit-data-scaner-2847.wav');
         audio.play();
         this.stop();
        }
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
      <button class="btn timer__btn--short" >Short Break</button>
      <button class="btn timer__btn--long">Long Break</button>
  </div>
            <div class="time">
            <span class="timer__part timer__part--minutes">00</span>
            <span> Min</span>
            <span class="timer__part">:</span>
             <span class="timer__part timer__part--seconds">00</span>
             <span> Sec </span>
            </div>
            <div class="timer-toggle-btn">
            <button type="button" class="timer__btn timer__btn--control timer__btn--start">
            <span class="material-icons">play_arrow</span>
            </button>
            <button type="button" class="timer__btn timer__btn--reset">
            <span class="material-icons">timer</span>
            </button>
             </div>
            </div>
          `;
    }
   
    // shortBreak(){
    //     this.remainingSeconds = 5* 60;
    //     this.updateInterfaceTime();
    // }
  }

  
  
  new Timer(
      document.querySelector(".timer")
  );

