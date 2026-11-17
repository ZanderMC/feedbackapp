const VOTER_ID_STORAGE_KEY = "zandev-feedback-voter-id";
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function getVoterId() {
    const storedId = window.localStorage.getItem(VOTER_ID_STORAGE_KEY);
    if (storedId && UUID_PATTERN.test(storedId)) {
        return storedId;
    }

    const voterId = window.crypto.randomUUID();
    window.localStorage.setItem(VOTER_ID_STORAGE_KEY, voterId);
    return voterId;
}
