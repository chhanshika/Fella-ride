import { useMemo, useState } from "react";
import "./App.css";

const communities = [
  {
    id: "manipal",
    name: "Manipal Community",
    icon: "🎓",
    members: 1248,
    drivers: 186,
    passengers: 742,
    description:
      "Students, alumni and staff building a shared mobility network.",
    routes: [
      ["Manipal", "Bengaluru", 42],
      ["Manipal", "Whitefield", 28],
      ["Manipal", "Airport", 17],
    ],
  },
  {
    id: "work",
    name: "Work Circle",
    icon: "💼",
    members: 684,
    drivers: 94,
    passengers: 391,
    description: "A mobility circle for people commuting to work.",
    routes: [
      ["Electronic City", "Koramangala", 31],
      ["Whitefield", "Indiranagar", 24],
      ["HSR", "Electronic City", 18],
    ],
  },
  {
    id: "north",
    name: "North Bengaluru",
    icon: "🏙️",
    members: 936,
    drivers: 121,
    passengers: 512,
    description: "Neighbourhood mobility across North Bengaluru.",
    routes: [
      ["Yelahanka", "Hebbal", 36],
      ["Hebbal", "Manyata", 29],
      ["Airport", "Yelahanka", 21],
    ],
  },
  {
    id: "whitefield",
    name: "Whitefield Residents",
    icon: "🏠",
    members: 2840,
    drivers: 312,
    passengers: 1680,
    description: "Neighbourhood rides for Whitefield residents and families.",
    routes: [
      ["Whitefield", "Marathahalli", 48],
      ["Whitefield", "KR Puram", 37],
      ["Whitefield", "ITPL", 61],
    ],
  },
  {
    id: "tech",
    name: "Bengaluru Tech Circle",
    icon: "💻",
    members: 3412,
    drivers: 428,
    passengers: 2190,
    description: "A professional mobility network for Bengaluru tech workers.",
    routes: [
      ["Koramangala", "Whitefield", 52],
      ["HSR", "Electronic City", 44],
      ["Indiranagar", "Manyata", 33],
    ],
  },
  {
    id: "alumni",
    name: "Bengaluru Alumni Network",
    icon: "🎓",
    members: 1926,
    drivers: 205,
    passengers: 1108,
    description: "Alumni from colleges and universities connecting beyond campus.",
    routes: [
      ["Manipal", "Bengaluru", 45],
      ["Whitefield", "Airport", 22],
      ["Koramangala", "HSR", 39],
    ],
  },
  {
    id: "electronic",
    name: "Electronic City Work Circle",
    icon: "🏢",
    members: 2318,
    drivers: 274,
    passengers: 1544,
    description: "Shared rides for the Electronic City work corridor.",
    routes: [
      ["Electronic City", "Bommasandra", 42],
      ["Electronic City", "HSR", 51],
      ["Silk Board", "Electronic City", 58],
    ],
  },
  {
    id: "hsr",
    name: "HSR Community",
    icon: "🌿",
    members: 2190,
    drivers: 246,
    passengers: 1290,
    description: "Local mobility for HSR Layout residents and commuters.",
    routes: [
      ["HSR", "Koramangala", 47],
      ["HSR", "Silk Board", 56],
      ["HSR", "Electronic City", 62],
    ],
  },
  {
    id: "airport",
    name: "Bengaluru Airport Commuters",
    icon: "✈️",
    members: 1684,
    drivers: 188,
    passengers: 1002,
    description: "Ride circles connecting Bengaluru with Kempegowda Airport.",
    routes: [
      ["Indiranagar", "Airport", 29],
      ["Yelahanka", "Airport", 41],
      ["Whitefield", "Airport", 34],
    ],
  },
  {
    id: "clubs",
    name: "College Clubs & Organizations",
    icon: "🤝",
    members: 1462,
    drivers: 154,
    passengers: 916,
    description: "Clubs, societies and student groups creating shared mobility circles.",
    routes: [
      ["Campus", "City Center", 35],
      ["Campus", "Hostels", 54],
      ["Campus", "Railway Station", 28],
    ],
  },
];

const catalysts = [
  {
    id: 1,
    name: "Aarav",
    avatar: "A",
    score: 92,
    from: "Bannerghatta",
    to: "Vega City",
    date: "Tomorrow",
    time: "3:30 PM",
    passengers: 7,
    seats: 2,
    routeOverlap: 91,
    scheduleOverlap: 84,
    reliability: 98,
    reason:
      "Aarav's voluntarily shared route currently has the strongest potential to unlock compatible connections in this community.",
  },
  {
    id: 2,
    name: "Ananya",
    avatar: "A",
    score: 87,
    from: "Manipal",
    to: "Bengaluru",
    date: "Tomorrow",
    time: "7:00 AM",
    passengers: 5,
    seats: 3,
    routeOverlap: 88,
    scheduleOverlap: 81,
    reliability: 96,
    reason:
      "Ananya's regular morning route overlaps with several Fellaz who currently have limited ride options.",
  },
  {
    id: 3,
    name: "Karthik",
    avatar: "K",
    score: 81,
    from: "Whitefield",
    to: "Indiranagar",
    date: "Tomorrow",
    time: "8:15 AM",
    passengers: 4,
    seats: 3,
    routeOverlap: 84,
    scheduleOverlap: 78,
    reliability: 94,
    reason:
      "Karthik can potentially connect a growing commuter cluster that currently has more passengers than drivers.",
  },
];

const matches = [
  {
    name: "Ananya",
    avatar: "A",
    score: 94,
    detail: "Same route · Same departure window",
  },
  {
    name: "Karthik",
    avatar: "K",
    score: 89,
    detail: "91% route overlap · 10 min difference",
  },
  {
    name: "Rahul",
    avatar: "R",
    score: 86,
    detail: "87% route overlap · Verified Fellaz",
  },
];

const DEFAULT_PREFERENCES = {
  language: "English",
  walkDistance: "Up to 1 km",
  accessibility: "None",
  visualAssistance: false,
  hearingAssistance: false,
  highContrast: false,
  largeText: false,
  voiceAssistance: true,
  visualAlerts: true,
  petFriendly: true,
};

function Metric({ label, value, change }) {
  return (
    <div className="metric-card">
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{change}</small>
    </div>
  );
}

function preferencesLanguageCode(language) {
  const codes = {
    English: "en-IN",
    "ಕನ್ನಡ": "kn-IN",
    "हिन्दी": "hi-IN",
    "தமிழ்": "ta-IN",
    "తెలుగు": "te-IN",
    "മലയാളം": "ml-IN",
    "मराठी": "mr-IN",
  };
  return codes[language] || "en-IN";
}

function App() {
  const [page, setPage] = useState("home");
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [joined, setJoined] = useState(["manipal"]);
  const [showRide, setShowRide] = useState(false);
  const [rideCreated, setRideCreated] = useState(false);
  const [selectedRide, setSelectedRide] = useState(null);
  const [selectedCatalyst, setSelectedCatalyst] = useState(catalysts[0]);
  const [joinedMatch, setJoinedMatch] = useState(null);
  const [showDiscover, setShowDiscover] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState(DEFAULT_PREFERENCES);

  const [rides, setRides] = useState([
    {
      from: "Bannerghatta",
      to: "Vega City",
      when: "Today · 3:30 PM",
      seats: 2,
      driver: "Rahul",
    },
    {
      from: "Manipal",
      to: "Bengaluru",
      when: "Tomorrow · 7:00 AM",
      seats: 1,
      driver: "Ananya",
    },
    {
      from: "Whitefield",
      to: "Indiranagar",
      when: "Tomorrow · 8:15 AM",
      seats: 3,
      driver: "Karthik",
    },
  ]);

  const community = useMemo(
    () => communities.find((c) => c.id === selectedCommunity),
    [selectedCommunity]
  );

  const go = (next) => {
    setPage(next);
    setSelectedCommunity(null);
  };

  const openCommunity = (id) => {
    setSelectedCommunity(id);
  };

  const handleCreateRide = (ride) => {
    setRides((oldRides) => [ride, ...oldRides]);
    setShowRide(false);
    setRideCreated(true);
    setPage("rides");
  };

  return (
    <div
      className={`shell ${preferences.highContrast ? "high-contrast" : ""} ${
        preferences.largeText ? "large-text" : ""
      }`}
    >
      <header className="topbar">
        <button className="brand" onClick={() => go("home")}>
          <span className="brand-mark">🦋</span>
          <span>
            <strong>FellaRide</strong>
            <small>one ride starts the ripple</small>
          </span>
        </button>

        <nav className="main-nav">
          <button
            className={page === "home" ? "nav-active" : ""}
            onClick={() => go("home")}
          >
            Home
          </button>

          <button
            className={page === "catalyst" ? "nav-active catalyst-nav" : ""}
            onClick={() => go("catalyst")}
          >
            🧠 Catalyst
          </button>

          <button
            className={page === "communities" ? "nav-active" : ""}
            onClick={() => go("communities")}
          >
            Communities
          </button>

          <button
            className={page === "rides" ? "nav-active" : ""}
            onClick={() => go("rides")}
          >
            Rides
          </button>

          <button
            className={page === "ripple" ? "nav-active" : ""}
            onClick={() => go("ripple")}
          >
            Ripple
          </button>
        </nav>

        <button className="profile-mini" onClick={() => go("profile")}>
          <span>S</span>
          <strong>Sanvika</strong>
        </button>
      </header>

      <main>
        {page === "home" && (
          <HomePage
            onCatalyst={() => go("catalyst")}
            onCommunities={() => go("communities")}
            onCreate={() => setShowRide(true)}
          />
        )}

        {page === "catalyst" && (
          <CatalystPage
            selectedCatalyst={selectedCatalyst}
            setSelectedCatalyst={setSelectedCatalyst}
            onOpportunity={() => setPage("opportunity")}
            preferences={preferences}
          />
        )}

        {page === "opportunity" && (
          <OpportunityPage
            catalyst={selectedCatalyst}
            onStart={() => setShowRide(true)}
            onBack={() => setPage("catalyst")}
          />
        )}

        {page === "communities" && !community && (
          <CommunitiesPage
            joined={joined}
            setJoined={setJoined}
            onOpen={openCommunity}
            onDiscover={() => setShowDiscover(true)}
          />
        )}

        {page === "communities" && community && (
          <CommunityDetail
            community={community}
            joined={joined}
            setJoined={setJoined}
            onBack={() => setSelectedCommunity(null)}
          />
        )}

        {page === "rides" && (
          <RidesPage
            rides={rides}
            onCreate={() => setShowRide(true)}
            onView={(ride) => setSelectedRide(ride)}
          />
        )}

        {page === "ripple" && (
          <RipplePage
            rideCreated={rideCreated}
            joinedMatch={joinedMatch}
            onCatalyst={() => go("catalyst")}
          />
        )}

        {page === "profile" && (
          <ProfilePage
            preferences={preferences}
            onEdit={() => setShowPreferences(true)}
          />
        )}
      </main>

      {selectedRide && (
        <RideDetails
          ride={selectedRide}
          preferences={preferences}
          onClose={() => setSelectedRide(null)}
          onJoin={() => {
            setJoinedMatch("Ananya");
            setSelectedRide(null);
            setPage("ripple");
          }}
        />
      )}

      {showDiscover && (
        <CommunityDiscoveryModal
          communities={communities}
          joined={joined}
          setJoined={setJoined}
          onOpen={openCommunity}
          onClose={() => setShowDiscover(false)}
        />
      )}

      {showPreferences && (
        <PreferencesModal
          preferences={preferences}
          setPreferences={setPreferences}
          onClose={() => setShowPreferences(false)}
        />
      )}

      {showRide && (
        <CreateRideModal
          catalyst={selectedCatalyst}
          onClose={() => setShowRide(false)}
          onCreate={handleCreateRide}
        />
      )}

      {rideCreated && (
        <div className="toast">
          <span>🦋</span>
          <div>
            <strong>Ride created</strong>
            <small>Your ripple has started.</small>
          </div>
          <button onClick={() => setRideCreated(false)}>×</button>
        </div>
      )}
    </div>
  );
}

/* ---------------- HOME ---------------- */

function HomePage({ onCatalyst, onCommunities, onCreate }) {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="pulse-dot" />
            COMMUNITY MOBILITY
          </div>

          <h1>
            Don't just find a ride.
            <br />
            <em>Start one.</em>
          </h1>

          <p>
            FellaRide finds the people whose next small action can unlock
            meaningful connections across a community.
          </p>

          <div className="hero-actions">
            <button
              className="secondary large voice-demo-button"
              onClick={() => {
                if (typeof window !== "undefined" && "speechSynthesis" in window) {
                  window.speechSynthesis.cancel();
                  const utterance = new SpeechSynthesisUtterance(
                    "FellaRide found seven compatible Fellaz and a ninety two percent catalyst opportunity."
                  );
                  utterance.lang = preferencesLanguageCode("English");
                  window.speechSynthesis.speak(utterance);
                }
              }}
            >
              🔊 Hear this
            </button>

            <button className="primary large" onClick={onCatalyst}>
              Find my catalyst potential →
            </button>

            <button className="secondary large" onClick={onCreate}>
              Create a ride
            </button>
          </div>

          <div className="trust-line">
            🔒 Based only on information you've chosen to share.
          </div>
        </div>

        <div className="hero-visual">
          <div className="orbit-card">
            <div className="orbit-title">
              <span>🧠</span>
              <div>
                <small>AI CATALYST ENGINE</small>
                <strong>Finding the next connection</strong>
              </div>
            </div>

            <div className="orbit">
              <span className="orbit-node node-one">7</span>
              <span className="orbit-node node-two">4</span>
              <span className="orbit-node node-three">3</span>
              <div className="orbit-center">
                <span>🦋</span>
                <strong>92%</strong>
                <small>potential</small>
              </div>
            </div>

            <div className="orbit-bottom">
              <span>7 compatible Fellaz</span>
              <button onClick={onCatalyst}>View →</button>
            </div>
          </div>
        </div>
      </section>

      <section className="home-stats">
        <Metric label="Community Fellaz" value="1,248" change="+18 this week" />
        <Metric label="Active drivers" value="186" change="+12 this week" />
        <Metric label="Connections made" value="3,842" change="+21% this month" />
        <Metric label="Community health" value="78%" change="Growing" />
      </section>

      <section className="how-section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">THE FELLA EFFECT</p>
            <h2>One small action can change the network.</h2>
          </div>
          <button className="text-button" onClick={onCommunities}>
            Explore communities →
          </button>
        </div>

        <div className="process-grid">
          <Process number="01" icon="🧠" title="Discover" text="AI finds potential catalysts." />
          <Process number="02" icon="💬" title="Activate" text="A contextual prompt gives them a reason to act." />
          <Process number="03" icon="🚗" title="Connect" text="One ride creates meaningful interactions." />
          <Process number="04" icon="🦋" title="Ripple" text="Connections create more rides and drivers." />
        </div>
      </section>
    </div>
  );
}

function Process({ number, icon, title, text }) {
  return (
    <div className="process-card">
      <small>{number}</small>
      <span>{icon}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

/* ---------------- CATALYST ---------------- */

function CatalystPage({
  selectedCatalyst,
  setSelectedCatalyst,
  onOpportunity,
  preferences,
}) {
  return (
    <div className="page-content catalyst-page">
      <section className="page-title catalyst-title">
        <div>
          <p className="section-kicker">AI CATALYST ENGINE</p>
          <h1>Find the person who can start the next ripple.</h1>
          <p>
            FellaRide looks for actions that can unlock the most compatible
            connections inside a community.
          </p>
        </div>

        <div className="engine-status">
          <span className="status-dot" />
          Engine active
        </div>
      </section>

      <section className="catalyst-layout">
        <div className="catalyst-main">
          <div className="section-label-row">
            <div>
              <span className="section-kicker">POTENTIAL CATALYSTS</span>
              <h2>Who can unlock the next connection?</h2>
            </div>
            <span className="community-pill">🎓 Manipal Community</span>
          </div>

          <div className="catalyst-list">
            {catalysts.map((person) => (
              <button
                className={`catalyst-card ${
                  selectedCatalyst.id === person.id ? "catalyst-selected" : ""
                }`}
                key={person.id}
                onClick={() => setSelectedCatalyst(person)}
              >
                <span className="person-avatar">{person.avatar}</span>

                <div className="catalyst-info">
                  <div className="person-name-row">
                    <strong>{person.name}</strong>
                    <span className="verified">✓ Verified</span>
                  </div>

                  <span className="route-text">
                    {person.from} <b>→</b> {person.to}
                  </span>

                  <div className="mini-facts">
                    <span>👥 {person.passengers} potential Fellaz</span>
                    <span>🕐 {person.scheduleOverlap}% time overlap</span>
                  </div>
                </div>

                <div className="catalyst-score">
                  <strong>{person.score}%</strong>
                  <small>potential</small>
                </div>
              </button>
            ))}
          </div>
        </div>

        <aside className="catalyst-side">
          <div className="potential-card">
            <div className="potential-top">
              <div>
                <span className="section-kicker">CATALYST POTENTIAL</span>
                <h2>{selectedCatalyst.name}</h2>
              </div>

              <div className="big-score">
                {selectedCatalyst.score}
                <small>%</small>
              </div>
            </div>

            <p className="potential-description">
              {selectedCatalyst.reason}
            </p>

            <div className="score-bars">
              <ScoreBar label="Route overlap" value={selectedCatalyst.routeOverlap} />
              <ScoreBar label="Schedule overlap" value={selectedCatalyst.scheduleOverlap} />
              <ScoreBar label="Reliability" value={selectedCatalyst.reliability} />
            </div>

            <div className="opportunity-box">
              <span>NETWORK OPPORTUNITY</span>
              <strong>
                {selectedCatalyst.passengers} Fellaz could potentially connect
                through this route.
              </strong>
            </div>

            <div className="match-preference-box">
              <span>YOUR MATCHING PREFERENCES</span>
              <div>
                <b>🚶 {preferences.walkDistance}</b>
                <b>🌐 {preferences.language}</b>
                <b>{preferences.accessibility === "None" ? "✓ Flexible accessibility" : `♿ ${preferences.accessibility}`}</b>
              </div>
            </div>

            <button className="dark-wide" onClick={onOpportunity}>
              View opportunity →
            </button>
          </div>

          <div className="privacy-note">
            <span>🔒</span>
            <div>
              <strong>Privacy by design</strong>
              <p>
                Catalyst suggestions use only mobility information the user
                has voluntarily shared.
              </p>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}

function ScoreBar({ label, value }) {
  return (
    <div className="score-bar-row">
      <div>
        <span>{label}</span>
        <strong>{value}%</strong>
      </div>
      <div className="bar">
        <i style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

/* ---------------- OPPORTUNITY ---------------- */

function OpportunityPage({ catalyst, onStart, onBack }) {
  return (
    <div className="opportunity-page">
      <button className="back-button" onClick={onBack}>
        ← Back to Catalyst Engine
      </button>

      <section className="opportunity-hero">
        <div className="opportunity-copy">
          <span className="butterfly-large">🦋</span>

          <p className="section-kicker">YOUR OPPORTUNITY</p>

          <h1>
            You could start
            <br />
            the next <em>ripple.</em>
          </h1>

          <div className="unlock-number">
            <strong>{catalyst.passengers}</strong>
            <span>potential Fellaz</span>
          </div>

          <p>
            Your voluntarily shared route overlaps with people who are already
            looking for compatible travel.
          </p>

          <button className="primary large" onClick={onStart}>
            Start the ripple →
          </button>

          <button className="quiet-button">Not now</button>
        </div>

        <div className="opportunity-map">
          <div className="map-label start">YOUR ROUTE</div>

          <div className="route-map">
            <div className="map-place">
              <span className="map-dot" />
              <strong>{catalyst.from}</strong>
            </div>

            <div className="map-line">
              <div className="map-car">🚗</div>
              <span>{catalyst.time}</span>
            </div>

            <div className="map-place">
              <span className="map-dot" />
              <strong>{catalyst.to}</strong>
            </div>

            <div className="connection connection-one">👤</div>
            <div className="connection connection-two">👤</div>
            <div className="connection connection-three">👤</div>
            <div className="connection connection-four">👤</div>
            <div className="connection connection-five">👤</div>
          </div>

          <div className="map-caption">
            <span>7 compatible routes</span>
            <span>•</span>
            <span>84% schedule overlap</span>
          </div>
        </div>
      </section>

      <section className="why-section">
        <div>
          <p className="section-kicker">WHY YOU?</p>
          <h2>Your next action already fits your routine.</h2>
        </div>

        <div className="why-grid">
          <WhyCard icon="🛣️" value={`${catalyst.routeOverlap}%`} label="Route overlap" />
          <WhyCard icon="🕐" value={`${catalyst.scheduleOverlap}%`} label="Schedule overlap" />
          <WhyCard icon="👥" value={catalyst.passengers} label="Potential connections" />
          <WhyCard icon="✓" value={`${catalyst.reliability}%`} label="Reliability" />
        </div>
      </section>
    </div>
  );
}

function WhyCard({ icon, value, label }) {
  return (
    <div className="why-card">
      <span>{icon}</span>
      <strong>{value}</strong>
      <small>{label}</small>
    </div>
  );
}

/* ---------------- COMMUNITIES ---------------- */

function CommunitiesPage({ joined, setJoined, onOpen, onDiscover }) {
  const visibleCommunities = communities.slice(0, 3);

  return (
    <div className="page-content">
      <section className="page-title">
        <div>
          <p className="section-kicker">YOUR NETWORK</p>
          <h1>Fella Communities</h1>
          <p>
            Join the communities you belong to. Communities are where the first
            connections become a network.
          </p>
        </div>

        <button className="secondary" onClick={onDiscover}>
          ＋ Join community
        </button>
      </section>

      <div className="community-category-row">
        <span>🎓 Education</span>
        <span>💼 Work</span>
        <span>🏠 Residential</span>
        <span>🌆 Neighbourhoods</span>
        <span>🤝 Organizations</span>
      </div>

      <div className="community-grid">
        {visibleCommunities.map((c) => {
          const isJoined = joined.includes(c.id);

          return (
            <article className="community-card" key={c.id}>
              <div className="community-card-top">
                <span className="community-icon">{c.icon}</span>
                {isJoined && <span className="joined-badge">✓ Joined</span>}
              </div>

              <h2>{c.name}</h2>
              <p>{c.description}</p>

              <div className="community-metrics">
                <div>
                  <strong>{c.members.toLocaleString()}</strong>
                  <span>Fellaz</span>
                </div>
                <div>
                  <strong>{c.drivers}</strong>
                  <span>Drivers</span>
                </div>
                <div>
                  <strong>{c.passengers}</strong>
                  <span>Passengers</span>
                </div>
              </div>

              <button className="community-link" onClick={() => onOpen(c.id)}>
                Explore community →
              </button>

              {!isJoined && (
                <button
                  className="join-button"
                  onClick={() => setJoined((old) => [...old, c.id])}
                >
                  Join community
                </button>
              )}
            </article>
          );
        })}
      </div>

      <section className="community-discover-banner">
        <div>
          <p className="section-kicker">FIND YOUR PEOPLE</p>
          <h2>Looking for another community?</h2>
          <p>
            Search universities, workplaces, residential areas, alumni groups,
            neighbourhoods and organizations across FellaRide.
          </p>
        </div>
        <button className="primary" onClick={onDiscover}>
          Explore 10+ communities →
        </button>
      </section>
    </div>
  );
}

function CommunityDiscoveryModal({ communities, joined, setJoined, onOpen, onClose }) {
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLowerCase();

  const filtered = communities.filter((c) => {
    if (!normalized) return true;
    return `${c.name} ${c.description}`.toLowerCase().includes(normalized);
  });

  const toggleJoin = (id) => {
    setJoined((old) =>
      old.includes(id) ? old.filter((item) => item !== id) : [...old, id]
    );
  };

  const openAndClose = (id) => {
    onClose();
    onOpen(id);
  };

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="discover-modal" onMouseDown={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <div className="discover-head">
          <div>
            <p className="section-kicker">DISCOVER COMMUNITIES</p>
            <h2>Find your people.</h2>
            <p>
              Search by university, workplace, neighbourhood, alumni network or
              organization.
            </p>
          </div>
          <span className="discover-count">{communities.length} communities</span>
        </div>

        <label className="community-search">
          <span>🔍</span>
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search communities..."
            aria-label="Search communities"
          />
        </label>

        <div className="discover-list">
          {filtered.map((c) => {
            const isJoined = joined.includes(c.id);

            return (
              <article className="discover-row" key={c.id}>
                <span className="community-icon">{c.icon}</span>
                <div className="discover-info">
                  <strong>{c.name}</strong>
                  <span>{c.members.toLocaleString()} Fellaz · {c.description}</span>
                </div>
                <div className="discover-actions">
                  <button className="quiet-button" onClick={() => openAndClose(c.id)}>
                    View
                  </button>
                  <button
                    className={isJoined ? "joined-action" : "join-button"}
                    onClick={() => toggleJoin(c.id)}
                  >
                    {isJoined ? "✓ Joined" : "Join"}
                  </button>
                </div>
              </article>
            );
          })}

          {!filtered.length && (
            <div className="no-results">
              <span>🔎</span>
              <strong>No communities found</strong>
              <p>Try a city, college, workplace or neighbourhood name.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CommunityDetail({ community, joined, setJoined, onBack }) {
  const isJoined = joined.includes(community.id);

  return (
    <div className="page-content">
      <button className="back-button" onClick={onBack}>
        ← All communities
      </button>

      <section className="community-detail-hero">
        <span className="community-icon large-icon">{community.icon}</span>
        <div>
          <p className="section-kicker">FELLA COMMUNITY</p>
          <h1>{community.name}</h1>
          <p>{community.description}</p>
        </div>

        {!isJoined && (
          <button
            className="primary"
            onClick={() => setJoined([...joined, community.id])}
          >
            Join community
          </button>
        )}
      </section>

      <div className="detail-stats">
        <Metric label="Fellaz" value={community.members.toLocaleString()} change="+18 this week" />
        <Metric label="Drivers" value={community.drivers} change="Active" />
        <Metric label="Passengers" value={community.passengers} change="Looking for rides" />
        <Metric label="Community health" value="78%" change="Growing" />
      </div>

      <section className="route-section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">MOBILITY GRAPH</p>
            <h2>Active route circles</h2>
          </div>
        </div>

        <div className="route-grid">
          {community.routes.map((route, index) => (
            <div className="route-card" key={index}>
              <span className="route-number">0{index + 1}</span>
              <strong>
                {route[0]} <b>→</b> {route[1]}
              </strong>
              <span>{route[2]} active Fellaz</span>
              <div className="route-progress">
                <i style={{ width: `${Math.min(route[2] * 2, 100)}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ---------------- RIDES ---------------- */

function RidesPage({ onCreate, rides, onView }) {
  return (
    <div className="page-content">
      <section className="page-title">
        <div>
          <p className="section-kicker">MOBILITY</p>
          <h1>Your rides</h1>
          <p>Find a ride, offer a seat, or build a recurring ride circle.</p>
        </div>

        <button className="primary" onClick={onCreate}>
          ＋ Create ride
        </button>
      </section>

      <div className="ride-list">
        {rides.map((r, i) => (
          <div className="ride-item" key={i}>
            <div className="ride-route">
              <span>{r.from}</span>
              <i>→</i>
              <strong>{r.to}</strong>
            </div>

            <div className="ride-time">{r.when}</div>

            <div className="ride-driver">
              <span className="avatar">
                {r.driver?.charAt(0) || "S"}
              </span>
              {r.driver}
            </div>

            <div className="seat-pill">
              {r.seats} {r.seats === 1 ? "seat" : "seats"}
            </div>

            <button className="match-btn" onClick={() => onView(r)}>
              View →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function RideDetails({ ride, preferences, onClose, onJoin }) {
  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="ride-details" onMouseDown={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <span className="details-icon">🚗</span>
        <p className="section-kicker">RIDE DETAILS</p>

        <h2>
          {ride.from} <span>→</span> {ride.to}
        </h2>

        <div className="ride-detail-time">
          <strong>{ride.when}</strong>
          <span>{ride.seats} seats available</span>
        </div>

        <div className="driver-box">
          <span className="avatar">{ride.driver?.charAt(0) || "S"}</span>
          <div>
            <strong>{ride.driver}</strong>
            <small>✓ Verified Fella · 98% reliability</small>
          </div>
        </div>

        <div className="match-preview">
          <span>🤖</span>
          <div>
            <strong>AI found 7 potential matches</strong>
            <p>Routes, schedules and your FellaRide preferences are considered.</p>
            <div className="match-chips">
              <span>🚶 {preferences.walkDistance}</span>
              <span>🌐 {preferences.language}</span>
              <span>{preferences.accessibility === "None" ? "✓ Accessibility ready" : `♿ ${preferences.accessibility}`}</span>
            </div>
          </div>
        </div>

        <button className="dark-wide" onClick={onJoin}>
          Join this ride →
        </button>
      </div>
    </div>
  );
}

/* ---------------- RIPPLE ---------------- */

function RipplePage({ rideCreated, joinedMatch, onCatalyst }) {
  return (
    <div className="page-content ripple-page">
      <section className="ripple-header">
        <div>
          <p className="section-kicker">THE BUTTERFLY EFFECT</p>
          <h1>Your ripple is growing.</h1>
          <p>
            Every ride creates connections. Every connection can create another
            ride.
          </p>
        </div>

        <div className="health-pill">
          <span className="status-dot" />
          Community · Growing
        </div>
      </section>

      <section className="ripple-visual">
        <div className="ripple-center">
          <span>🦋</span>
          <strong>YOU</strong>
          <small>started the ripple</small>
        </div>

        <div className="ripple-ring ring-one">
          <span>👤</span>
          <span>👤</span>
          <span>👤</span>
        </div>

        <div className="ripple-ring ring-two">
          <span>👤</span>
          <span>👤</span>
          <span>👤</span>
          <span>👤</span>
        </div>

        <div className="ripple-ring ring-three">
          <span>🚗</span>
          <span>🚗</span>
        </div>
      </section>

      <div className="ripple-metrics">
        <Metric label="Rides started" value="1" change="Your action" />
        <Metric label="Connections" value="7" change="+7" />
        <Metric label="New opportunities" value="3" change="Potential" />
        <Metric label="Community health" value="78%" change="Growing" />
      </div>

      {joinedMatch && (
        <div className="success-banner">
          <span>🦋</span>
          <div>
            <strong>Connection made with {joinedMatch}!</strong>
            <p>Your first meaningful interaction has been created.</p>
          </div>
        </div>
      )}

      <section className="growth-section">
        <p className="section-kicker">COMMUNITY HEALTH</p>
        <h2>From seed to self-sustaining.</h2>

        <div className="health-track">
          <div className="health-step complete">
            <span>✓</span>
            <strong>Seeding</strong>
          </div>

          <div className="health-line active" />

          <div className="health-step current">
            <span>●</span>
            <strong>Growing</strong>
          </div>

          <div className="health-line" />

          <div className="health-step">
            <span>○</span>
            <strong>Self-sustaining</strong>
          </div>
        </div>

        <button className="text-button" onClick={onCatalyst}>
          Find another catalyst →
        </button>
      </section>
    </div>
  );
}

/* ---------------- PROFILE ---------------- */

function ProfilePage({ preferences, onEdit }) {
  return (
    <div className="page-content">
      <section className="profile-hero">
        <span className="profile-big">S</span>
        <div>
          <p className="section-kicker">YOUR FELLA PROFILE</p>
          <h1>Sanvika H.</h1>
          <p>Passenger · Driver · Ripple maker</p>

          <div className="profile-tags">
            <span>✓ Verified</span>
            <span>{preferences.petFriendly ? "🐾 Pet friendly" : "🐾 No pets"}</span>
            <span>♿ {preferences.accessibility === "None" ? "Accessibility aware" : preferences.accessibility}</span>
            <span>🌐 {preferences.language}</span>
          </div>
        </div>

        <button className="secondary" onClick={onEdit}>Edit preferences</button>
      </section>

      <div className="metric-grid">
        <Metric label="Rides completed" value="24" change="+6" />
        <Metric label="Connections" value="38" change="+12%" />
        <Metric label="Referrals" value="7" change="+3" />
        <Metric label="Reliability" value="98%" change="+2%" />
      </div>

      <section className="preferences-overview">
        <div className="section-heading">
          <div>
            <p className="section-kicker">YOUR PREFERENCES</p>
            <h2>FellaRide matches around what works for you.</h2>
          </div>
          <button className="text-button" onClick={onEdit}>Change →</button>
        </div>

        <div className="preference-grid">
          <PreferenceCard icon="🌐" title="Language" value={preferences.language} />
          <PreferenceCard icon="🚶" title="Walking" value={preferences.walkDistance} />
          <PreferenceCard icon="♿" title="Accessibility" value={preferences.accessibility} />
          <PreferenceCard icon="👁️" title="Visual assistance" value={preferences.visualAssistance ? "Enabled" : "Off"} />
          <PreferenceCard icon="🦻" title="Hearing assistance" value={preferences.hearingAssistance ? "Enabled" : "Off"} />
          <PreferenceCard icon="🐾" title="Pet rides" value={preferences.petFriendly ? "Preferred" : "Not preferred"} />
        </div>
      </section>
    </div>
  );
}

function PreferenceCard({ icon, title, value }) {
  return (
    <div className="preference-card">
      <span>{icon}</span>
      <div>
        <small>{title}</small>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

function PreferencesModal({ preferences, setPreferences, onClose }) {
  const update = (key, value) => setPreferences((old) => ({ ...old, [key]: value }));

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="preferences-modal" onMouseDown={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        <div className="modal-icon">♿</div>
        <p className="section-kicker">PERSONALISE YOUR MATCHES</p>
        <h2>What makes a journey work for you?</h2>
        <p className="modal-sub">
          FellaRide uses these preferences to make matching more comfortable and
          accessible. Choose only what you want to share.
        </p>

        <div className="preference-form-grid">
          <label>
            PREFERRED LANGUAGE
            <select value={preferences.language} onChange={(e) => update("language", e.target.value)}>
              {['English', 'ಕನ್ನಡ', 'हिन्दी', 'தமிழ்', 'తెలుగు', 'മലയാളം', 'मराठी'].map((language) => (
                <option key={language}>{language}</option>
              ))}
            </select>
          </label>

          <label>
            WALKING PREFERENCE
            <select value={preferences.walkDistance} onChange={(e) => update("walkDistance", e.target.value)}>
              {['No walking', 'Up to 500 m', 'Up to 1 km', 'Up to 2 km', 'I\'m flexible'].map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </label>

          <label>
            ACCESSIBILITY NEED
            <select value={preferences.accessibility} onChange={(e) => update("accessibility", e.target.value)}>
              {['None', 'Step-free pickup', 'Wheelchair-friendly', 'Mobility assistance', 'Other'].map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="toggle-list">
          <PreferenceToggle label="👁️ Visual assistance" description="Large text, high contrast and voice-friendly controls." checked={preferences.visualAssistance} onChange={(v) => update("visualAssistance", v)} />
          <PreferenceToggle label="🦻 Hearing assistance" description="Visual alerts and text-first ride updates." checked={preferences.hearingAssistance} onChange={(v) => update("hearingAssistance", v)} />
          <PreferenceToggle label="🔊 Voice assistance" description="Read important ride and match updates aloud." checked={preferences.voiceAssistance} onChange={(v) => update("voiceAssistance", v)} />
          <PreferenceToggle label="📳 Visual alerts" description="Keep important updates visible on screen." checked={preferences.visualAlerts} onChange={(v) => update("visualAlerts", v)} />
          <PreferenceToggle label="🔎 Larger text" description="Increase text size across FellaRide." checked={preferences.largeText} onChange={(v) => update("largeText", v)} />
          <PreferenceToggle label="◐ High contrast" description="Increase contrast for easier reading." checked={preferences.highContrast} onChange={(v) => update("highContrast", v)} />
          <PreferenceToggle label="🐾 Pet-friendly rides" description="Prefer matches that are comfortable with pets." checked={preferences.petFriendly} onChange={(v) => update("petFriendly", v)} />
        </div>

        <div className="preference-note">
          <strong>Why this matters</strong>
          <p>These settings can become matching signals alongside route, time, seats and reliability.</p>
        </div>

        <button className="dark-wide" onClick={onClose}>Save preferences →</button>
      </div>
    </div>
  );
}

function PreferenceToggle({ label, description, checked, onChange }) {
  return (
    <label className="toggle-row">
      <span>
        <strong>{label}</strong>
        <small>{description}</small>
      </span>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <i aria-hidden="true" />
    </label>
  );
}

/* ---------------- CREATE RIDE ---------------- */

function CreateRideModal({ onClose, onCreate, catalyst }) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const formatDateForInput = (date) =>
    date.toISOString().split("T")[0];

  const [from, setFrom] = useState(catalyst?.from || "Bannerghatta");
  const [to, setTo] = useState(catalyst?.to || "Vega City");
  const [date, setDate] = useState(formatDateForInput(tomorrow));
  const [time, setTime] = useState(catalyst?.time === "3:30 PM" ? "15:30" : "07:00");
  const [seats, setSeats] = useState(catalyst?.seats || 2);

  const handleCreate = () => {
    const selectedDate = new Date(`${date}T${time}`);

    const dateText = selectedDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    const timeText = selectedDate.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
    });

    onCreate({
      from: from.trim(),
      to: to.trim(),
      when: `${dateText} · ${timeText}`,
      seats: Number(seats),
      driver: "Sanvika",
    });
  };

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <div className="modal-icon">🦋</div>

        <p className="section-kicker">START A RIPPLE</p>

        <h2>Create a ride</h2>

        <p className="modal-sub">
          {catalyst
            ? `${catalyst.passengers} Fellaz could potentially connect through this ride.`
            : "Tell FellaRide where you're going. We'll find compatible Fellaz."}
        </p>

        <label>
          FROM
          <input
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="e.g. Bannerghatta"
          />
        </label>

        <label>
          TO
          <input
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="e.g. Vega City"
          />
        </label>

        <div className="form-grid">
          <label>
            DATE
            <input
              type="date"
              value={date}
              min={formatDateForInput(new Date())}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>

          <label>
            DEPARTURE TIME
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </label>
        </div>

        <label>
          SEATS AVAILABLE
          <input
            type="number"
            value={seats}
            min="1"
            max="6"
            onChange={(e) => setSeats(e.target.value)}
          />
        </label>

        <div className="activation-note">
          <span>🧠</span>
          <p>
            FellaRide will notify compatible, opted-in Fellaz — filtered by route,
            timing and preferences, not random users.
          </p>
        </div>

        <button className="dark-wide" onClick={handleCreate}>
          Create ride & start ripple →
        </button>
      </div>
    </div>
  );
}

export default App;