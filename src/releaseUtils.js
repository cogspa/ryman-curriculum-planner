import { config } from './curriculum.js';

function parseLocal(str) {
  const [y, m, d] = str.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function findTuesdayOnOrAfter(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = (2 - day + 7) % 7;
  d.setDate(d.getDate() + diff);
  return d;
}

export function getWeekMonday(weekNum, startDateStr) {
  const startDate = startDateStr || localStorage.getItem('cp-start-date') || config.startDate;
  const start = parseLocal(startDate);
  const firstTue = findTuesdayOnOrAfter(start);
  const tue = addDays(firstTue, (weekNum - 1) * 7);
  const monday = new Date(tue);
  monday.setDate(monday.getDate() - 1);
  monday.setHours(0, 0, 0, 0);
  return monday;
}

export function getActiveRole() {
  try {
    const authRole = localStorage.getItem('cp-auth-role') || 'student';
    const viewAsStudent = localStorage.getItem('cp-view-as-student') === 'true';
    if (authRole === 'admin' && viewAsStudent) {
      return 'student';
    }
    return authRole;
  } catch {
    return 'student';
  }
}

export function isWeekReleased(weekNum, startDateStr) {
  const role = getActiveRole();
  if (role === 'admin') return true;
  
  // Explicitly hide Week 5 for students until explicit approval
  if (Number(weekNum) === 5) return false;

  const monday = getWeekMonday(weekNum, startDateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return today >= monday;
}

export function isNewPillActive(weekNum, startDateStr) {
  try {
    const nextWeekMonday = getWeekMonday(weekNum + 1, startDateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today < nextWeekMonday;
  } catch {
    return true;
  }
}
