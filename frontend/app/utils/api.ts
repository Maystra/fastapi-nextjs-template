import { useAuthStore } from "@/app/store/authStore";

export async function apiRequest<T>(endpoint: string, options: RequestInit = {}) {
	const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
	const token = useAuthStore.getState().authStorage?.access_token;

	const headers = new Headers(options.headers);

	if (token) {
		headers.set("Authorization", `Bearer ${token}`);
	}

	// Set appropriate Content-Type if not already set
	if (!headers.has("Content-Type")) {
		if (options.body instanceof URLSearchParams) {
			headers.set("Content-Type", "application/x-www-form-urlencoded");
		} else if (options.body instanceof Blob) {
			headers.set("Content-Type", "application/octet-stream");
		} else if (typeof options.body === "string") {
			try {
				JSON.parse(options.body); // Check if it's a JSON string
				headers.set("Content-Type", "application/json");
			} catch {
				headers.set("Content-Type", "text/plain");
			}
		} else if (options.body && typeof options.body === "object") {
			headers.set("Content-Type", "application/json");
			options.body = JSON.stringify(options.body); // Ensure the body is a JSON string
		}
	}

	const res = await fetch(`${baseUrl}${endpoint}`, {
		...options,
		headers,
	});

	if (!res.ok) {
		const answer = await res.json();
		const error_message = answer.detail || answer.message || answer.error || answer;
		throw new Error(error_message);
	}

	const contentType = res.headers.get("Content-Type");

	if (contentType?.includes("application/json")) {
		return res.json() as Promise<T>;
	} else if (contentType?.includes("text/")) {
		return res.text() as unknown as T;
	} else if (contentType?.includes("application/octet-stream")) {
		return res.blob() as unknown as T;
	} else {
		return res as unknown as T;
	}
}
