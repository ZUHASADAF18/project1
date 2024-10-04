// Fetch job listings from db.json
async function fetchJobs() {
    const response = await fetch('db.json');
    const data = await response.json();
    return data.jobs;
}

// Load initial job listings
async function loadJobs() {
    const jobList = document.getElementById('jobList');
    jobList.innerHTML = '';
    
    const jobs = await fetchJobs();
    jobs.forEach((job) => {
        const jobItem = document.createElement('li');
        jobItem.innerHTML = `
            <strong>${job.title}</strong> at <em>${job.company}</em>
            <p>${job.description.substring(0, 100)}...</p>
        `;
        jobItem.onclick = () => viewJobDetails(job);
        jobList.appendChild(jobItem);
    });
}

// Filter job listings based on search input
async function filterJobs() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const jobs = await fetchJobs();
    
    const filteredJobs = jobs.filter(job => 
        job.title.toLowerCase().includes(searchInput) || 
        job.company.toLowerCase().includes(searchInput)
    );
    
    const jobList = document.getElementById('jobList');
    jobList.innerHTML = '';
    
    filteredJobs.forEach(job => {
        const jobItem = document.createElement('li');
        jobItem.innerHTML = `
            <strong>${job.title}</strong> at <em>${job.company}</em>
            <p>${job.description.substring(0, 100)}...</p>
        `;
        jobItem.onclick = () => viewJobDetails(job);
        jobList.appendChild(jobItem);
    });
}

// View job details and navigate to job.html
function viewJobDetails(job) {
    localStorage.setItem('selectedJob', JSON.stringify(job));
    window.location.href = 'job.html';
}

// Add a new job (Admin-only functionality)
async function addJob(event) {
    event.preventDefault();

    const job = {
        id: Date.now(),
        title: document.getElementById('jobTitle').value,
        company: document.getElementById('companyName').value,
        location: document.getElementById('location').value,
        ctc: document.getElementById('ctc').value,
        hrContact: document.getElementById('hrContact').value,
        description: document.getElementById('jobDescription').value,
        requirements: document.getElementById('jobRequirements').value.split('\n'),
        responsibilities: document.getElementById('responsibilities').value,
        benefits: document.getElementById('benefits').value,
        applyLink: document.getElementById('applyLink').value
    };

    const jobs = await fetchJobs();
    jobs.push(job);

    localStorage.setItem('jobs', JSON.stringify(jobs));
    alert('Job added successfully!');
    window.location.href = 'index.html';
}

// Initialize the job portal
document.addEventListener('DOMContentLoaded', loadJobs);