const Duration = (duration) => {
    if (duration.toString().split(' ').length == 2) {
        return duration
    }
    if (duration.toString().split(' ').length == 4) {
        return duration;
    }//bug fixed
    if (duration >= 60) {
        const hrs = Math.floor(duration / 60);
        const mins = duration % 60;
        return `${hrs} hrs ${mins} mins`;
    } else {
        return `${duration} mins`;
    }
};

const reverseDuration = (durationString) => {
    const arr = durationString.split(' ');
    if (arr.length == 4) {
        return parseInt(arr[0]) * 60 + parseInt(arr[2]);
    } else if (arr.length == 2) {
        return parseInt(arr[0]);
    }
}

export default { Duration, reverseDuration }