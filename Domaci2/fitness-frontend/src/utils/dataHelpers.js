/**
 * Pomoćne funkcije za rukovanje podacima iz API odgovora
 * Pružaju tolerantno čitanje polja koja mogu imati različita imena ili nedostajati
 */

// ============ CILJEVI (GOALS) ============

/**
 * Vraća naziv cilja, sa fallback vrednošću ako nedostaje
 */
export function getGoalTitle(goal) {
  return goal?.title ?? goal?.name ?? goal?.goal ?? "";
}

/**
 * Vraća opis cilja
 */
export function getGoalDescription(goal) {
  return goal?.description ?? "/";
}

/**
 * Vraća ciljni datum (rok)
 */
export function getGoalTargetDate(goal) {
  return goal?.target_date ?? goal?.due_date ?? goal?.deadline ?? goal?.targetDate ?? null;
}

/**
 * Vraća ime korisnika kome pripada cilj
 */
export function getGoalUserName(goal) {
  return goal?.user?.name ?? goal?.user_name ?? goal?.userId ?? goal?.user_id ?? "-";
}

/**
 * Vraća status cilja
 */
export function getGoalStatus(goal) {
  return goal?.status ?? "-";
}

// ============ VEŽBE (EXERCISES) ============

/**
 * Vraća ime workout-a povezanog sa vežbom, ili njegov ID ako ime ne postoji
 */
export function getExerciseWorkoutName(exercise) {
  return exercise?.workout?.name ?? (exercise?.workout_id != null ? `#${exercise.workout_id}` : "-");
}

// ============ OPŠTE FUNKCIJE ============

/**
 * Vraća nenegativan broj ili null
 */
export function parseNonNegativeNumber(value) {
  const num = Number(value);
  return !isNaN(num) && num >= 0 ? num : null;
}
