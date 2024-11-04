        console.log("hello worlds");
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Initialize map
        const map = L.map('map').setView([20, 0], 2);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Add markers for player locations
        const players = [
            { name: "Sachin Tendulkar", lat: 19.0760, lng: 72.8777 },
            { name: "Shane Warne", lat: -37.8136, lng: 144.9631 },
            { name: "Brian Lara", lat: 10.6918, lng: -61.2225 },
            { name: "Jacques Kallis", lat: -33.9249, lng: 18.4241 }
        ];

        players.forEach(player => {
            L.marker([player.lat, player.lng])
                .bindPopup(player.name)
                .addTo(map);
        });

        // Voting system
        let votes = {
            1: 0,
            2: 0,
            3: 0
        };

        function vote(playerId) {
            votes[playerId]++;
            alert("Thank you for voting!");
        }

        function submitStory() {
            const story = document.querySelector('textarea').value;
            if (story.trim()) {
                alert("Thank you for sharing your story!");
                document.querySelector('textarea').value = '';
            } else {
                alert("Please write your story before submitting.");
            }
        }

        // Add animation class to player cards when they come into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        });

        document.querySelectorAll('.player-card, .match-card').forEach((card) => {
            card.style.opacity = 0;
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s, transform 0.5s';
            observer.observe(card);
        });