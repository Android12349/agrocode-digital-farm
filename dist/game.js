const initialStats = { harvest: 72, budget: 68, technology: 64, trust: 70 };

const statMeta = {
  harvest: { label: "Урожай", color: "#c7f36b" },
  budget: { label: "Бюджет", color: "#ffb15c" },
  technology: { label: "Технологии", color: "#6fc7ff" },
  trust: { label: "Команда", color: "#55d89f" }
};

const events = [
  {
    category: "КЛИМАТИЧЕСКИЙ РИСК", icon: "☀", title: "Засуха пришла на две недели раньше",
    description: "Прогноз обещает 18 дней без осадков. Запаса воды хватит только на половину полей, а новый урожай уже начал формироваться.",
    choices: [
      { title: "Поливать все поля понемногу", note: "Сохраним площадь, но рискуем качеством", effects: { harvest: -6, budget: -4, trust: 3 } },
      { title: "Сфокусироваться на лучших участках", note: "Меньше объём, выше предсказуемость", effects: { harvest: 7, budget: 2, trust: -5 } },
      { title: "Подключить прогнозную модель", note: "Дороже сейчас, полезнее в будущем", effects: { harvest: 4, budget: -9, technology: 10 } }
    ]
  },
  {
    category: "СБОЙ ИНФРАСТРУКТУРЫ", icon: "⌁", title: "Датчики влажности передают противоречивые данные",
    description: "Три сектора показывают критическую сухость, но снимки с дрона этого не подтверждают. Через час система запустит автоматический полив.",
    choices: [
      { title: "Остановить автоматику и проверить вручную", note: "Надёжно, но медленно", effects: { harvest: 2, budget: -3, trust: 5 } },
      { title: "Довериться датчикам", note: "Быстро и без дополнительных затрат", effects: { harvest: -10, budget: 4, technology: -5 } },
      { title: "Сверить данные с резервным контуром", note: "Инженерный подход", effects: { harvest: 5, budget: -5, technology: 7 } }
    ]
  },
  {
    category: "КИБЕРБЕЗОПАСНОСТЬ", icon: "◇", title: "Учётная запись агронома ведёт себя подозрительно",
    description: "Ночью из другого региона изменили настройки кормления и запросили выгрузку технологических карт. Производство пока работает штатно.",
    choices: [
      { title: "Заблокировать весь внешний доступ", note: "Безопасно, но остановит часть процессов", effects: { harvest: -5, technology: 5, trust: -2 } },
      { title: "Сбросить пароль и продолжить работу", note: "Минимальное вмешательство", effects: { budget: 2, technology: -8, trust: -3 } },
      { title: "Изолировать аккаунт и запустить аудит", note: "Контролируемый разбор инцидента", effects: { budget: -7, technology: 10, trust: 6 } }
    ]
  },
  {
    category: "ЛЮДИ И ПРОЦЕССЫ", icon: "◎", title: "Команда саботирует новое приложение",
    description: "Механизаторы продолжают вести журнал на бумаге. Они считают интерфейс сложным, а сбор данных — способом контролировать каждую минуту работы.",
    choices: [
      { title: "Сделать использование обязательным", note: "Быстрый запуск сверху вниз", effects: { technology: 8, trust: -12 } },
      { title: "Провести интервью и упростить сценарии", note: "Медленнее, зато вместе с пользователями", effects: { budget: -5, technology: 6, trust: 12 } },
      { title: "Оставить бумагу ещё на сезон", note: "Избежим конфликта сейчас", effects: { budget: 4, technology: -10, trust: 3 } }
    ]
  },
  {
    category: "РЫНОЧНАЯ ВОЗМОЖНОСТЬ", icon: "↗", title: "Ресторанная сеть готова купить весь урожай",
    description: "Покупатель предлагает контракт по хорошей цене, но требует стабильный объём и цифровую прослеживаемость каждой партии.",
    choices: [
      { title: "Подписать контракт немедленно", note: "Высокая прибыль, высокий риск", effects: { budget: 14, harvest: -7, trust: -3 } },
      { title: "Запустить пилот на одной культуре", note: "Проверим процесс на малом масштабе", effects: { budget: 6, technology: 7, harvest: 2 } },
      { title: "Отказаться до следующего сезона", note: "Сохраним привычную модель", effects: { budget: -3, trust: 2, technology: -2 } }
    ]
  },
  {
    category: "ТЕХНИЧЕСКИЙ ДОЛГ", icon: "⚙", title: "Система управления техникой больше не поддерживается",
    description: "Поставщик прекратил обновления. Миграция займёт месяц, а сезонные работы начнутся через три недели.",
    choices: [
      { title: "Обновить всё до начала сезона", note: "Рывок с риском срыва сроков", effects: { budget: -12, technology: 14, harvest: -4 } },
      { title: "Мигрировать поэтапно", note: "Баланс скорости и безопасности", effects: { budget: -7, technology: 8, trust: 5 } },
      { title: "Отложить ещё на год", note: "Экономия сегодня, уязвимость завтра", effects: { budget: 8, technology: -13 } }
    ]
  },
  {
    category: "КАЧЕСТВО ПРОДУКТА", icon: "✦", title: "Модель прогноза урожая ошиблась на 24%",
    description: "Из-за ошибки закуплено слишком много тары и транспорта. Команда предлагает скрыть экспериментальную функцию до следующего релиза.",
    choices: [
      { title: "Отключить модель без объяснений", note: "Проблема исчезнет из интерфейса", effects: { budget: -4, technology: -5, trust: -8 } },
      { title: "Показать диапазон и уровень уверенности", note: "Честный и полезный продукт", effects: { budget: -3, technology: 9, trust: 10 } },
      { title: "Оставить как есть и собрать больше данных", note: "Быстрее обучим модель", effects: { harvest: -6, technology: 5, trust: -5 } }
    ]
  },
  {
    category: "СТРАТЕГИЯ РАЗВИТИЯ", icon: "△", title: "Куда вложить прибыль сезона?",
    description: "После сложной смены у фермы появился ресурс для одного крупного проекта. Решение определит её развитие на ближайшие три года.",
    choices: [
      { title: "Роботизировать склад и логистику", note: "Эффективность и масштабирование", effects: { budget: -8, technology: 12, harvest: 4 } },
      { title: "Создать лабораторию агроданных", note: "Инвестиция в знания и эксперименты", effects: { budget: -10, technology: 15, trust: 3 } },
      { title: "Повысить устойчивость полей и команды", note: "Надёжность вместо быстрого роста", effects: { harvest: 10, budget: -6, trust: 10 } }
    ]
  }
];

const profiles = [
  { key: "technology", title: "Архитектор цифровой фермы", description: "Вы строите системы, которые переживают кризисы и становятся умнее после каждой ошибки. Технологии для вас — не витрина, а рабочий инструмент.", badge: "AI" },
  { key: "harvest", title: "Стратег урожая", description: "Вы держите фокус на главном результате и умеете выбирать решения, которые сохраняют производство даже в условиях неопределённости.", badge: "AG" },
  { key: "budget", title: "Агроэкономист-практик", description: "Вы замечаете стоимость каждого решения и умеете превращать ограниченные ресурсы в устойчивую бизнес-модель.", badge: "₽" },
  { key: "trust", title: "Лидер агротех-команды", description: "Вы внедряете изменения через доверие. Люди принимают ваши решения, потому что понимают их смысл и участвуют в процессе.", badge: "UX" }
];

let stats = { ...initialStats };
let currentEvent = 0;
let soundEnabled = true;

const screens = [...document.querySelectorAll(".screen")];
const metrics = document.querySelector("#metrics");
const choices = document.querySelector("#choices");

function showScreen(id) {
  screens.forEach((screen) => screen.classList.toggle("screen--active", screen.id === id));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function clamp(value) { return Math.max(0, Math.min(100, value)); }

function renderMetrics(deltas = {}) {
  metrics.innerHTML = Object.entries(statMeta).map(([key, meta]) => {
    const value = stats[key];
    const color = value < 30 ? "#ff716f" : meta.color;
    const delta = deltas[key] || 0;
    return `<div class="metric">
      <div class="metric-head"><span class="metric-name">${meta.label}</span><span class="metric-value">${value}</span></div>
      <div class="metric-track"><i style="width:${value}%;background:${color}"></i></div>
      <div class="metric-delta ${delta ? "show" : ""}">${delta > 0 ? "+" : ""}${delta || ""}</div>
    </div>`;
  }).join("");
  const min = Math.min(...Object.values(stats));
  document.querySelector("#status-copy").textContent = min < 25
    ? "Внимание: один из контуров близок к критическому состоянию."
    : min < 45 ? "Система стабильна, но запас устойчивости снижается." : "Системы фермы работают штатно.";
}

function renderEvent() {
  const event = events[currentEvent];
  document.querySelector("#event-counter").textContent = `СОБЫТИЕ ${String(currentEvent + 1).padStart(2, "0")} / ${String(events.length).padStart(2, "0")}`;
  document.querySelector("#progress-bar").style.width = `${((currentEvent + 1) / events.length) * 100}%`;
  document.querySelector("#event-icon").textContent = event.icon;
  document.querySelector("#event-category").textContent = event.category;
  document.querySelector("#event-title").textContent = event.title;
  document.querySelector("#event-description").textContent = event.description;
  choices.innerHTML = event.choices.map((choice, index) => `<button class="choice" type="button" data-choice="${index}">
    <span class="choice-index">0${index + 1}</span><strong>${choice.title}</strong><small>${choice.note}</small>
  </button>`).join("");
}

function choose(index) {
  const effects = events[currentEvent].choices[index].effects;
  Object.entries(effects).forEach(([key, value]) => { stats[key] = clamp(stats[key] + value); });
  renderMetrics(effects);
  choices.querySelectorAll("button").forEach((button) => { button.disabled = true; });
  window.setTimeout(() => {
    currentEvent += 1;
    if (currentEvent >= events.length || Object.values(stats).some((value) => value === 0)) finishGame();
    else { renderEvent(); renderMetrics(); }
  }, 650);
}

function startGame() {
  stats = { ...initialStats };
  currentEvent = 0;
  renderMetrics();
  renderEvent();
  showScreen("game-screen");
  document.querySelector("#rules-dialog").close();
}

function finishGame() {
  const total = Object.values(stats).reduce((sum, value) => sum + value, 0);
  const winner = Object.entries(stats).sort((a, b) => b[1] - a[1])[0][0];
  const profile = profiles.find((item) => item.key === winner);
  const score = Math.round(total / 4);
  const best = Math.max(Number(localStorage.getItem("agrocode-best") || 0), score);
  localStorage.setItem("agrocode-best", String(best));
  document.querySelector("#result-badge").textContent = profile.badge;
  document.querySelector("#result-title").textContent = profile.title;
  document.querySelector("#result-description").textContent = profile.description;
  document.querySelector("#result-stats").innerHTML = Object.entries(statMeta).map(([key, meta]) => `<div class="result-stat"><strong>${stats[key]}</strong><span>${meta.label}</span></div>`).join("");
  document.querySelector("#record-copy").textContent = score >= best ? `Новый личный рекорд: ${best} баллов` : `Результат: ${score} · Лучший: ${best}`;
  document.querySelector("#share-button").dataset.share = `Мой результат в «АгроКоде» — ${profile.title}, ${score}/100. Сможешь спасти цифровую ферму?`;
  showScreen("result-screen");
  window.parent?.postMessage({ type: "agrocode:finished", score, profile: profile.title, stats }, "*");
}

document.querySelector("#start-button").addEventListener("click", startGame);
document.querySelector("#dialog-start").addEventListener("click", startGame);
document.querySelector("#again-button").addEventListener("click", startGame);
document.querySelector("#restart-button").addEventListener("click", startGame);
document.querySelector("#how-button").addEventListener("click", () => document.querySelector("#rules-dialog").showModal());
document.querySelector("#dialog-close").addEventListener("click", () => document.querySelector("#rules-dialog").close());
choices.addEventListener("click", (event) => {
  const button = event.target.closest("[data-choice]");
  if (button) choose(Number(button.dataset.choice));
});

document.querySelector("#sound-toggle").addEventListener("click", (event) => {
  soundEnabled = !soundEnabled;
  event.currentTarget.textContent = soundEnabled ? "♪" : "×";
  event.currentTarget.setAttribute("aria-pressed", String(soundEnabled));
  event.currentTarget.setAttribute("aria-label", soundEnabled ? "Выключить звук" : "Включить звук");
});

document.querySelector("#share-button").addEventListener("click", async (event) => {
  const text = event.currentTarget.dataset.share;
  try {
    if (navigator.share) await navigator.share({ title: "АгроКод", text, url: location.href });
    else { await navigator.clipboard.writeText(`${text} ${location.href}`); showToast("Результат скопирован"); }
  } catch (error) {
    if (error.name !== "AbortError") showToast("Не удалось поделиться");
  }
});

function showToast(text) {
  const toast = document.querySelector("#toast");
  toast.textContent = text;
  toast.classList.add("toast--visible");
  window.setTimeout(() => toast.classList.remove("toast--visible"), 2200);
}

window.addEventListener("message", (event) => {
  if (event.data?.type === "agrocode:start") startGame();
});
