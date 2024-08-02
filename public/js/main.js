const token = localStorage.getItem('token');
const decodedToken = jwt_decode(token);
const userId = decodedToken.userId

document.addEventListener('DOMContentLoaded', () => {

    // Set up event listeners for profile update
    const updateProfileForm = document.getElementById('update-profile-form');
    if (updateProfileForm) {
        updateProfileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('profile-name').value;
            const email = document.getElementById('profile-email').value;
            const careerGoals = document.getElementById('career-goals').value;
            updateProfile(name, email, careerGoals);
        });
    }

    // Set up event listeners for job application logging
    const jobApplicationForm = document.getElementById('job-application-form');
    if (jobApplicationForm) {
        jobApplicationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const companyName = document.getElementById('company-name').value;
            const jobTitle = document.getElementById('job-title').value;
            const applicationDate = document.getElementById('application-date').value;
            const document = document.getElementById('document').files[0];
            logJobApplication(companyName, jobTitle, applicationDate, document);
        });
    }

    // Set up event listeners for setting reminders
    const reminderForm = document.getElementById('reminder-form');
    if (reminderForm) {
        reminderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const reminderText = document.getElementById('reminder-text').value;
            const reminderDate = document.getElementById('reminder-date').value;
            setReminder(reminderText, reminderDate);
        });
    }

    // Set up event listeners for adding company information
    const companyForm = document.getElementById('company-form');
    if (companyForm) {
        companyForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const companyName = document.getElementById('company-name-info').value;
            const companyInfo = document.getElementById('company-info').value;
            addCompanyInformation(companyName, companyInfo);
        });
    }

    // Set up event listeners for adding notes to job applications
    const noteForm = document.getElementById('note-form');
    if (noteForm) {
        noteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const applicationId = document.getElementById('application-id').value;
            const noteText = document.getElementById('note-text').value;
            addNoteToApplication(applicationId, noteText);
        });
    }

    // Set up event listeners for searching and filtering job applications
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const searchTerm = document.getElementById('search-term').value;
            const filterStatus = document.getElementById('filter-status').value;
            searchAndFilterApplications(searchTerm, filterStatus);
        });
    }
});

// Function to handle profile update
async function updateProfile(name, email, careerGoals) {
    try {
        const response = await axios.post(`/profile/${userId}`, { name, email, careerGoals }, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
        });
        if (response.data.success) {
            alert('Profile updated successfully');
        } else {
            alert('Profile update failed!')
        }
        
    } catch (error) {
        console.error('Error updating profile:', error);
        alert('Profile update failed');
    }
}

// Function to handle job application logging
async function logJobApplication(companyName, jobTitle, applicationDate, document) {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('company_name', companyName);
    formData.append('job_title', jobTitle);
    formData.append('application_date', applicationDate);
    if (document) {
        formData.append('document', document);
    }

    try {
        await axios.post('/applications', formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        alert('Job application logged successfully');
    } catch (error) {
        console.error('Error logging job application:', error);
        alert('Job application logging failed');
    }
}

// Function to handle setting reminders
async function setReminder(reminderText, reminderDate) {
    const token = localStorage.getItem('token');
    try {
        await axios.post('/reminders', { reminder_text: reminderText, reminder_date: reminderDate }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        alert('Reminder set successfully');
    } catch (error) {
        console.error('Error setting reminder:', error);
        alert('Setting reminder failed');
    }
}

// Function to handle adding company information
async function addCompanyInformation(companyName, companyInfo) {
    const token = localStorage.getItem('token');
    try {
        await axios.post('/companies', { company_name: companyName, company_info: companyInfo }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        alert('Company information saved successfully');
    } catch (error) {
        console.error('Error saving company information:', error);
        alert('Saving company information failed');
    }
}

// Function to handle adding notes to job applications
async function addNoteToApplication(applicationId, noteText) {
    const token = localStorage.getItem('token');
    try {
        await axios.post('/notes', { application_id: applicationId, note_text: noteText }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        alert('Note added successfully');
    } catch (error) {
        console.error('Error adding note:', error);
        alert('Adding note failed');
    }
}

// Function to handle searching and filtering job applications
async function searchAndFilterApplications(searchTerm, filterStatus) {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get('/search', {
            params: { search_term: searchTerm, filter_status: filterStatus },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = response.data;
        console.log('Search results:', data);
        // Display search results on the page
    } catch (error) {
        console.error('Error during search:', error);
        alert('Search failed');
    }
}
