window.onload = function () {
  const userID = "235425034141827072";
  let lastSpotifyStart = null;
  let lastActivityId = null;
  let lastActivityType = null;
  let lastActivityDetails = null;
  let spotifyTimer = null;
  let spotifyTrackUrl = ''
  function fetchAndUpdate() {
    fetch(`https://api.lanyard.rest/v1/users/${userID}`)
      .then(response => response.json())
      .then(w => {
        const data = w.data;
        const info = data.discord_user;
        const usernameElement = document.getElementById('username');
        const displayname = document.getElementById('userdisplay');
        const avatarElement = document.getElementById('avatar');
        const statusIndicator = document.getElementById('status-indicator');
        const activityContainer = document.getElementById('activity-container');
        const progressBar = document.querySelector('.activity-progress');
        const zzz = document.getElementById('zzz');

        usernameElement.textContent = info.username;
        displayname.textContent = info.display_name;
        avatarElement.src = info.avatar
          ? `https://cdn.discordapp.com/avatars/${info.id}/${info.avatar}.${info.avatar.startsWith("a_") ? 'gif' : 'png'}?size=512`
          : "https://cdn.discordapp.com/embed/avatars/5.png";

        statusIndicator.className = `status-${data.discord_status}`;
        if (data.discord_status == "offline"){
          zzz.classList.remove('hidden');
        }else{
          zzz.classList.add('hidden');
        }

        const spotifyActivity = data.activities?.find(a => a.name === "Spotify");
        const otherActivity = data.activities?.find(a => a.name !== "Spotify");
        if (spotifyActivity) {
          if (lastActivityDetails !== spotifyActivity.details) {
            lastActivityDetails = spotifyActivity.details;
            activityContainer.classList.remove('hidden');
            progressBar.style.display = 'flex';
            const coverId = spotifyActivity.assets.large_image.split(':')[1];
            document.getElementById('activity-icon').src = `https://i.scdn.co/image/${coverId}`;
            document.getElementById('activity-name').textContent = spotifyActivity.details || '';
            document.getElementById('activity-details').textContent = spotifyActivity.state || '';
            spotifyTrackUrl = `https://open.spotify.com/track/${spotifyActivity.sync_id}`;
            const startTimestamp = spotifyActivity.timestamps.start;
            const endTimestamp = spotifyActivity.timestamps.end;
            const totalDuration = endTimestamp - startTimestamp;
            if (spotifyTimer) {
              clearInterval(spotifyTimer);
            }
            function updateProgress() {
              const now = Date.now();
              const elapsed = now - startTimestamp;
              const percent = Math.min((elapsed / totalDuration) * 100, 100);
              document.getElementById('progress-filled').style.width = `${percent}%`;
              const currentMin = Math.floor(elapsed / 60000);
              const currentSec = Math.floor((elapsed % 60000) / 1000);
              const totalMin = Math.floor(totalDuration / 60000);
              const totalSec = Math.floor((totalDuration % 60000) / 1000);
              document.getElementById('progress-start').textContent = `${currentMin}:${currentSec.toString().padStart(2, '0')}`;
              document.getElementById('progress-end').textContent = `${totalMin}:${totalSec.toString().padStart(2, '0')}`;
            }
            updateProgress();
            spotifyTimer = setInterval(updateProgress, 1000);
          }
        } else {
          if (lastActivityDetails !== null) {
            lastActivityDetails = null;
            clearInterval(spotifyTimer);
            activityContainer.classList.add('hidden');
            progressBar.style.display = 'none';
            document.getElementById('activity-icon').src = '';
            document.getElementById('activity-name').textContent = '';
            document.getElementById('activity-details').textContent = '';
            document.getElementById('activity-state').textContent = '';
          }
        }
        if (otherActivity) {
          if (lastActivityId !== otherActivity.id || lastActivityType !== "other") {
            lastActivityId = otherActivity.id; 
            lastActivityType = "other"; 
            lastSpotifyStart = null; 
            clearInterval(spotifyTimer); 
            activityContainer.classList.remove('hidden');
            progressBar.style.display = 'none'; 
            const activityIcon = document.getElementById('activity-icon');
            if (otherActivity.assets && otherActivity.assets.large_image) {
              activityIcon.style.display = 'block';
              activityIcon.src = `https://cdn.discordapp.com/app-assets/${otherActivity.application_id}/${otherActivity.assets.large_image}.png`;
            } else {
              activityIcon.style.display = 'none';
            }
            document.getElementById('activity-name').textContent = otherActivity.name || '';
            document.getElementById('activity-details').textContent = otherActivity.details || '';
            document.getElementById('activity-state').textContent = otherActivity.state || '';
          }
        } else {
          if (lastActivityType !== null) {
            lastActivityId = null;
            lastActivityType = null;
            lastSpotifyStart = null;
            clearInterval(spotifyTimer);
            activityContainer.classList.add('hidden');
            progressBar.style.display = 'none';
            document.getElementById('activity-icon').src = '';
            document.getElementById('activity-name').textContent = '';
            document.getElementById('activity-details').textContent = '';
            document.getElementById('activity-state').textContent = '';
          }
        }
        avatarElement.style.opacity = 0;
        avatarElement.onload = function () {
          avatarElement.style.transition = 'opacity 0.5s ease-in-out';
          avatarElement.style.opacity = 1;
        };
      })
      .catch(error => console.error('Error fetching user data:', error));
  }
  fetchAndUpdate();
  setInterval(fetchAndUpdate, 2000);
  const activityNameElement = document.getElementById('activity-name');
  activityNameElement.addEventListener('click', function() {
    if (spotifyTrackUrl) {
      window.open(spotifyTrackUrl, '_blank');
    } else {
      alert('Unable to fetch the Spotify track URL.');
    }
  });
};
