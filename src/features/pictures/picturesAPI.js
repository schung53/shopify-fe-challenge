import { apiKey } from '../../util/config';

export function fetchPictures(startDate, endDate) {
    const nasaUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&start_date=${startDate}&end_date=${endDate}`;
    return fetch(nasaUrl)
        .then(
            (data) => data.json()
        );
}
