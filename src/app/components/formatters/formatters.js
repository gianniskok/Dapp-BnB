const humanReadableUnixTimestamp = (timestampInt) => {
    return new Date(timestampInt * 1000);
}

const humanReadableApartmentState = (escrowState) => {
    if (apartmentState === 0) {
        return "Rent";
    } else if (apartmentState === 1) {
        return "Locked";
    } else if (apartmentState === 2) {
        return "Release";
    } else if (apartmentState === 3) {
        return "Closed";
    } else if (apartmentState === 4) {
        return "Complete";
    }
}

export {
    humanReadableUnixTimestamp,
    humanReadableApartmentState,
}