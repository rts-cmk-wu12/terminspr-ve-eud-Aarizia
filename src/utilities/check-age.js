export default function checkAge(minAge, maxAge, userAge) {

    if (!minAge || !maxAge) return true;
    if (!userAge) return false;

    if (userAge < minAge || userAge > maxAge) return false;

    return true;
}