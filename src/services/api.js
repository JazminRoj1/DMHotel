const API_BASE_URL = "http://localhost:3001/api"

class ApiClient {
    constructor(baseURL) {
        this.baseURL = baseURL
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`
        const token = localStorage.getItem("token")

        const config = {
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
                ...options.headers,
            },
            ...options,
        }

        if (config.body && typeof config.body === "object") {
            config.body = JSON.stringify(config.body)
        }

        try {
            const response = await fetch(url, config)

            // Intentar parsear JSON, pero manejar casos donde no hay contenido
            let data = {}
            const contentType = response.headers.get("content-type")
            if (contentType && contentType.includes("application/json")) {
                data = await response.json()
            }

            if (!response.ok) {
                throw new Error(data.message || `HTTP error! status: ${response.status}`)
            }

            return { data, status: response.status }
        } catch (error) {
            console.error("API Request Error:", error)
            throw {
                response: {
                    data: { message: error.message },
                    status: error.status || 500,
                },
            }
        }
    }

    get(endpoint, options = {}) {
        return this.request(endpoint, { method: "GET", ...options })
    }

    post(endpoint, body, options = {}) {
        return this.request(endpoint, { method: "POST", body, ...options })
    }

    put(endpoint, body, options = {}) {
        return this.request(endpoint, { method: "PUT", body, ...options })
    }

    delete(endpoint, options = {}) {
        return this.request(endpoint, { method: "DELETE", ...options })
    }
}

export const apiClient = new ApiClient(API_BASE_URL)

// Funciones de utilidad para endpoints específicos
export const authAPI = {
    login: (email, password) => apiClient.post("/auth/login", { email, password }),
    register: (userData) => apiClient.post("/auth/register", userData),
    getProfile: () => apiClient.get("/auth/me"),
    updateProfile: (userData) => apiClient.put("/auth/profile", userData),
}

export const roomsAPI = {
    getAll: () => apiClient.get("/rooms"),
    getById: (id) => apiClient.get(`/rooms/${id}`),
    create: (roomData) => apiClient.post("/rooms", roomData),
    update: (id, roomData) => apiClient.put(`/rooms/${id}`, roomData),
    delete: (id) => apiClient.delete(`/rooms/${id}`),
    checkAvailability: (id, fechaInicio, fechaFin) =>
        apiClient.get(`/rooms/${id}/availability?fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}`),
}

export const reservationsAPI = {
    getAll: () => apiClient.get("/reservations"),
    getById: (id) => apiClient.get(`/reservations/${id}`),
    create: (reservationData) => apiClient.post("/reservations", reservationData),
    update: (id, reservationData) => apiClient.put(`/reservations/${id}`, reservationData),
    cancel: (id) => apiClient.delete(`/reservations/${id}`),
}

export const eventsAPI = {
    getAll: () => apiClient.get("/events"),
    getById: (id) => apiClient.get(`/events/${id}`),
    create: (eventData) => apiClient.post("/events", eventData),
    update: (id, eventData) => apiClient.put(`/events/${id}`, eventData),
    delete: (id) => apiClient.delete(`/events/${id}`),
    register: (id) => apiClient.post(`/events/${id}/register`),
    unregister: (id) => apiClient.delete(`/events/${id}/register`),
    getAttendees: (id) => apiClient.get(`/events/${id}/attendees`),
}

export const reportsAPI = {
    getDashboard: () => apiClient.get("/reports/dashboard"),
    getIncome: (year, month) => apiClient.get(`/reports/income?year=${year}&month=${month}`),
    getOccupancy: (fechaInicio, fechaFin) =>
        apiClient.get(`/reports/occupancy?fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}`),
    getEvents: (year, month) => apiClient.get(`/reports/events?year=${year}&month=${month}`),
}

export const publicAPI = {
    getRooms: () => apiClient.get("/public/rooms"),
    getEvents: () => apiClient.get("/public/events"),
    checkRoomAvailability: (id, fechaInicio, fechaFin) =>
        apiClient.get(`/public/rooms/${id}/availability?fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}`),
    getHotelInfo: () => apiClient.get("/public/hotel-info"),
}
