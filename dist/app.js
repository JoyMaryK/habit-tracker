"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Habit {
    constructor() { }
    addHabit(event) {
        return __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            console.log("I'm in");
            const habitInput = document.querySelector("#habit-name");
            const habitInputValue = habitInput.value;
            const habitStartDateInput = document.querySelector("#start-date");
            const habitStartDateValue = habitStartDateInput.value;
            const addedHabit = { "habitName": habitInputValue, "startDate": habitStartDateValue };
            console.log(addedHabit);
            yield fetch(' http://localhost:3000/habit', {
                method: 'POST',
                body: JSON.stringify(addedHabit),
                headers: {
                    "Content-Type": "application/json"
                }
            });
        });
    }
    getHabits() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch("http://localhost:3000/habit");
            const allHabits = yield response.json();
            // console.log(carts);
            let html = ``;
            allHabits.forEach((item) => {
                let startdate = new Date(item.startDate);
                let date2 = new Date("2023-04-28");
                let diff = date2.getTime() - startdate.getTime();
                let diffDays = Math.ceil(diff / (1000 * 3600 * 24));
                console.log(diffDays);
                let htmlItem = `<div class="habit">
        <h3 class="habit-name">${item.habitName}</h3>
        <p>Start Date: ${item.startDate}</p>
        <p>Days: ${diffDays}</p>
     </div>`;
                html += htmlItem;
            });
            const habitsRender = document.querySelector(".habits");
            habitsRender.innerHTML = html;
        });
    }
}
const habit = new Habit();
const addBt = document.querySelector("#add-habit");
addBt.addEventListener("click", habit.addHabit);
habit.getHabits();
//console.log( Date());
