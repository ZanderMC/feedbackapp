function getErrorMessage(body, status) {
    const apiError = body?.error;
    if (!apiError || typeof apiError.message !== "string") {
        return `La solicitud falló (HTTP ${status}).`;
    }

    const details = Array.isArray(apiError.details)
        ? apiError.details
            .map((detail) => {
                if (typeof detail?.message !== "string") return null;
                const path = Array.isArray(detail.path)
                    ? detail.path.join(".")
                    : typeof detail.path === "string"
                        ? detail.path
                        : "";
                return path ? `${path}: ${detail.message}` : detail.message;
            })
            .filter(Boolean)
        : [];

    return details.length
        ? `${apiError.message}: ${details.join("; ")}`
        : apiError.message;
}

export async function apiRequest(url, options) {
    let response;
    try {
        response = await fetch(url, options);
    } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
            throw error;
        }
        throw new Error(
            "No se pudo conectar con el servidor. Comprueba que la API esté disponible.",
            { cause: error },
        );
    }

    if (response.status === 204) return null;

    let body;
    try {
        body = await response.json();
    } catch {
        if (response.ok) {
            throw new Error("El servidor devolvió una respuesta no válida.");
        }
    }

    if (!response.ok) {
        throw new Error(getErrorMessage(body, response.status));
    }

    return body;
}
