export const latestSort = (a, b) => {
    const dateA = a.date;
    const dateB = b.date;

    if (dateA < dateB) return 1;
    else if (dateA > dateB) return -1;
    return 0;
};

