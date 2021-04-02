function getTimeSince(date) {
    const utcDate = (new Date(date)).valueOf();
    const utcCurrentDate = (new Date()).valueOf();

    let seconds = Math.floor((utcCurrentDate - utcDate) / 1000);
    let interval = seconds / 31536000;

    if (interval > 1) {
        const years = Math.floor(interval); 
        return `${years} year${years !== 1 ? 's' : ''}`;
    }

    interval = seconds / 2628288;

    if (interval > 1) {
        const months = Math.floor(interval);
        return `${months} month${months !== 1 ? 's' : ''}`;
    }

    interval = seconds / 86400;

    if (interval > 1) {
        const days = Math.floor(interval);
        return `${days} day${days !== 1 ? 's' : ''}`;
    }

    interval = seconds / 3600;

    if (interval > 1) {
        const hours = Math.floor(interval);
        return `${hours} hour${hours !== 1 ? 's' : ''}`;
    }

    interval = seconds / 60;

    if (interval > 1) {
        const minutes = Math.floor(interval);
        return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
    }

    seconds = Math.floor(seconds);  
        return `${seconds} second${seconds !== 1 ? 's' : ''}`;
}

module.exports = getTimeSince;