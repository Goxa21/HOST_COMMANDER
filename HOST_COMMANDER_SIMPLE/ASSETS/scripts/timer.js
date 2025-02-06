class Timer {
    constructor(cfg = {}) {
        this.d_months = document.querySelector('.months .counter_value');
        this.d_days = document.querySelector('.days .counter_value');
        this.d_hours = document.querySelector('.hours .counter_value');
        this.d_minutes = document.querySelector('.minutes .counter_value');
        this.d_seconds = document.querySelector('.seconds .counter_value');
        this.targetDateTime = new Date();

        this.targetDateTime.setFullYear(2025);
        this.targetDateTime.setMonth(6);
        this.targetDateTime.setDate(12);
        this.targetDateTime.setHours(14);
        this.targetDateTime.setMinutes(10);
        this.targetDateTime.setSeconds(0);

        this.startDate = new Date();
        this.Init(this);
    }

    Init(THIS = this) {
        THIS.Update(THIS);
        console.log(this);
    }

    Update(THIS = this) {
        THIS.startDate = new Date();
        let r_months = THIS.targetDateTime.getMonth() - THIS.startDate.getMonth();
        let r_days = THIS.targetDateTime.getDate() - THIS.startDate.getDate();
        let r_hours = THIS.targetDateTime.getHours() - THIS.startDate.getHours();
        let r_minutes = THIS.targetDateTime.getMinutes() - THIS.startDate.getMinutes();
        let r_seconds = THIS.targetDateTime.getSeconds() - THIS.startDate.getSeconds();
        if (r_seconds < 0) {
            r_seconds = r_seconds + 60;
            r_minutes--;
        }
        if (r_minutes < 0) {
            r_minutes = r_minutes + 60;
            r_hours--;
        }
        if (r_hours < 0) {
            r_hours = r_hours + 24;
            r_days--;
        }
        if (r_days < 0) {
            r_days = r_days + 24;
            r_months--;
        }
        if (r_seconds < 10) {
            r_seconds = '0' + r_seconds;
        }
        if (r_minutes < 10) {
            r_minutes = '0' + r_minutes;
        }
        if (r_hours < 10) {
            r_hours = '0' + r_hours;
        }
        THIS.d_months.innerHTML = r_months;
        THIS.d_days.innerHTML = r_days;
        THIS.d_hours.innerHTML = r_hours;
        THIS.d_minutes.innerHTML = r_minutes;
        THIS.d_seconds.innerHTML = r_seconds;
        setTimeout(THIS.Update, 1000, THIS);
    }
}
let timer = new Timer();