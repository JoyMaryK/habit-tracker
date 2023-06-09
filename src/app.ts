class Habit {
  constructor() {}

  async addHabit(event: Event) {
    event.preventDefault();

    const habitInput = document.querySelector("#habit-name") as HTMLInputElement;
    const habitInputValue = habitInput.value;
    const habitStartDateInput = document.querySelector("#start-date") as HTMLInputElement;
    const habitStartDateValue = habitStartDateInput.value;

    const addedHabit: {} = {"habitName": habitInputValue,  "startDate": habitStartDateValue};

    await fetch(" http://localhost:3000/habit", {
      method: "POST",
      body: JSON.stringify(addedHabit),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async getHabits() {
    const response = await fetch("http://localhost:3000/habit");
    const allHabits = await response.json();

    let html = ``;
    allHabits.forEach((item: { startDate: string; habitName: string }) => {
      let startdate = new Date(item.startDate);
      let date2 = new Date();
      let diff = date2.getTime() - startdate.getTime();
      let diffDays = Math.ceil(diff / (1000 * 3600 * 24));

      let htmlItem = `<div class="habit">
        <h3 class="habit-name">${item.habitName}</h3>
        <p>Start Date: ${item.startDate}</p>
        <p>Days: ${diffDays}</p>
     </div>`;
      html += htmlItem;
    });
    const habitsRender = document.querySelector(".habits") as HTMLDivElement;

    habitsRender.innerHTML = html;
  }
}

const habit = new Habit();
const addBt = document.querySelector("#add-habit") as HTMLButtonElement;
addBt.addEventListener("click", habit.addHabit);

habit.getHabits();
