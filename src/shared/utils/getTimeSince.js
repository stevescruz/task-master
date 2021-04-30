function getTimeSince(date) {
    const utcDate = (new Date(date)).valueOf();
    const utcCurrentDate = (new Date()).valueOf();

    let seconds = Math.floor((utcCurrentDate - utcDate) / 1000);
    let interval = seconds / 31536000;

    if (interval > 1) {
        const years = Math.floor(interval); 
        return `${years}y`;
    }

    interval = seconds / 2628288;

    if (interval > 1) {
        const months = Math.floor(interval);
        return `${months}m`;
    }

    interval = seconds / 86400;

    if (interval > 1) {
        const days = Math.floor(interval);
        return `${days}d`;
    }

    interval = seconds / 3600;

    if (interval > 1) {
        const hours = Math.floor(interval);
        return `${hours}h`;
    }

    interval = seconds / 60;

    if (interval > 1) {
        const minutes = Math.floor(interval);
        return `${minutes}min`;
    }

    seconds = Math.floor(seconds);  
        return `${seconds}s`;
}

module.exports = getTimeSince;