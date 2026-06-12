const API_BASE = "http://localhost:8080/api/bugs";

const form = document.getElementById("bug-form");
const statusFilter = document.getElementById("status-filter");
const bugsBody = document.getElementById("bugs-body");
const bugCount = document.getElementById("bug-count");
const toast = document.getElementById("toast");
const historyModal = document.getElementById("history-modal");
const historyList = document.getElementById("history-list");
const metricTotal = document.getElementById("metric-total");
const metricOpen = document.getElementById("metric-open");
const metricFixed = document.getElementById("metric-fixed");
const metricCritical = document.getElementById("metric-critical");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const bug = {
        title: document.getElementById("title").value.trim(),
        description: document.getElementById("description").value.trim(),
        severity: document.getElementById("severity").value,
        assignedTo: document.getElementById("assignedTo").value.trim(),
        status: "OPEN"
    };

    if (!bug.title) {
        showToast("Bug title is required.");
        return;
    }

    try {
        await fetch(API_BASE, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bug)
        });

        form.reset();
        document.getElementById("severity").value = "MEDIUM";
        showToast("Bug added successfully.");
        loadBugs();
    } catch (error) {
        showToast("Cannot add bug. Check if Spring Boot is running.");
    }
});

statusFilter.addEventListener("change", loadBugs);

async function loadBugs() {
    const selectedStatus = statusFilter.value;

    try {
        const response = await fetch(API_BASE);
        const bugs = await response.json();
        const visibleBugs = selectedStatus ? bugs.filter((bug) => bug.status === selectedStatus) : bugs;

        updateMetrics(bugs);
        renderBugs(visibleBugs);
        bugCount.textContent = `${visibleBugs.length} bug(s) shown`;
    } catch (error) {
        bugsBody.innerHTML = '<tr><td colspan="7" class="empty">Backend not connected. Start Spring Boot first.</td></tr>';
        bugCount.textContent = "Backend offline";
        updateMetrics([]);
    }
}

function updateMetrics(bugs) {
    metricTotal.textContent = bugs.length;
    metricOpen.textContent = bugs.filter((bug) => bug.status === "OPEN").length;
    metricFixed.textContent = bugs.filter((bug) => bug.status === "FIXED").length;
    metricCritical.textContent = bugs.filter((bug) => bug.severity === "CRITICAL").length;
}

function renderBugs(bugs) {
    if (bugs.length === 0) {
        bugsBody.innerHTML = '<tr><td colspan="7" class="empty">No bugs found.</td></tr>';
        return;
    }

    bugsBody.innerHTML = bugs.map((bug) => `
        <tr>
            <td data-label="ID">#${bug.id}</td>
            <td data-label="Bug">
                <span class="bug-title">${escapeHtml(bug.title)}</span>
                <span class="bug-description">${escapeHtml(bug.description || "No description")}</span>
            </td>
            <td data-label="Severity"><span class="badge ${bug.severity}">${formatEnum(bug.severity)}</span></td>
            <td data-label="Status">
                <select class="status-select" onchange="updateStatus(${bug.id}, this.value)">
                    <option value="OPEN" ${bug.status === "OPEN" ? "selected" : ""}>Open</option>
                    <option value="IN_PROGRESS" ${bug.status === "IN_PROGRESS" ? "selected" : ""}>In Progress</option>
                    <option value="FIXED" ${bug.status === "FIXED" ? "selected" : ""}>Fixed</option>
                    <option value="REJECTED" ${bug.status === "REJECTED" ? "selected" : ""}>Rejected</option>
                </select>
            </td>
            <td data-label="Assigned">${escapeHtml(bug.assignedTo || "Unassigned")}</td>
            <td data-label="Created">${formatDate(bug.createdAt)}</td>
            <td data-label="Actions" class="action-buttons">
                <button class="secondary-button" onclick="showHistory(${bug.id})">History</button>
                <button class="danger-button" onclick="deleteBug(${bug.id})">Delete</button>
            </td>
        </tr>
    `).join("");
}

async function updateStatus(id, status) {
    try {
        const response = await fetch(`${API_BASE}/${id}`);
        const bug = await response.json();
        bug.status = status;

        await fetch(`${API_BASE}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bug)
        });

        showToast("Status updated.");
        loadBugs();
    } catch (error) {
        showToast("Could not update status.");
    }
}

async function deleteBug(id) {
    const confirmed = confirm("Delete this bug?");
    if (!confirmed) {
        return;
    }

    try {
        await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
        showToast("Bug deleted.");
        loadBugs();
    } catch (error) {
        showToast("Could not delete bug.");
    }
}

async function showHistory(id) {
    historyModal.classList.add("show");
    historyModal.setAttribute("aria-hidden", "false");
    historyList.innerHTML = '<p class="empty">Loading history...</p>';

    try {
        const response = await fetch(`${API_BASE}/${id}/history`);
        const history = await response.json();

        if (history.length === 0) {
            historyList.innerHTML = '<p class="empty">No history found.</p>';
            return;
        }

        historyList.innerHTML = history.map((item) => `
            <article class="history-item">
                <strong>${formatEnum(item.action)}</strong>
                <span>${formatDateTime(item.actionTime)}</span>
                <p>${escapeHtml(item.details)}</p>
            </article>
        `).join("");
    } catch (error) {
        historyList.innerHTML = '<p class="empty">Could not load history.</p>';
    }
}

function closeHistory() {
    historyModal.classList.remove("show");
    historyModal.setAttribute("aria-hidden", "true");
}

function formatDate(value) {
    if (!value) {
        return "-";
    }

    return new Date(value).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}

function formatDateTime(value) {
    if (!value) {
        return "-";
    }

    return new Date(value).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}

function formatEnum(value) {
    return value.replace("_", " ");
}

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2500);
}

loadBugs();
