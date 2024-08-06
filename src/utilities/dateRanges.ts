export function getMonthRange(date: Date): Date[]{
    const currentYear: number = date.getFullYear();
    const currentMonth: number = date.getMonth();
    const firstDateOfMonth: Date = new Date(currentYear, currentMonth);
    // This is the day before of the current month
    const endDateOfMonth: Date = new Date(currentYear, currentMonth + 1, 0);

    return [firstDateOfMonth, endDateOfMonth];
}
