import axios from 'axios';

export function getBugs() {
  return axios.get(`https://bugbook-server.herokuapp.com/bugs`);
}

export function getBug(bugId) {
  return axios.get(`https://bugbook-server.herokuapp.com/bugs/${bugId}`);
}

export function createBug({ reportedBy, title, status }) {
  return axios.post(`https://bugbook-server.herokuapp.com/bugs`, {
    reportedBy,
    title,
    status,
  });
}

export function updateBug({ id, reportedBy, title, status }) {
  return axios.put(`https://bugbook-server.herokuapp.com/bugs/${id}`, {
    reportedBy,
    title,
    status,
  });
}
