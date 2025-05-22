# 🏏 Cricket Scoring App

A comprehensive real-time cricket scoring application built with React Native, Fastify, and MongoDB. Perfect for scoring matches from local club games to professional tournaments with live ball-by-ball updates and detailed analytics.

## 📱 Features

### Core Features
- **Real-time Ball-by-Ball Scoring** - Live updates for every delivery
- **Multi-format Support** - T20, ODI, and Test matches
- **Team & Player Management** - Complete player profiles and team rosters
- **Live Match Updates** - WebSocket-powered real-time scoring
- **Detailed Statistics** - Comprehensive batting and bowling analytics
- **Match Commentary** - Ball-by-ball commentary system
- **Offline Support** - Score matches without internet connectivity

### Advanced Features
- **Partnership Tracking** - Real-time partnership statistics
- **Fall of Wickets** - Detailed wicket progression
- **Over-by-Over Analysis** - Detailed over breakdown
- **Player Performance Analytics** - Career statistics and match records
- **Match Predictions** - Run rate and target calculations
- **Multi-User Scoring** - Multiple scorers for the same match
- **Export Capabilities** - Export scorecards and statistics

## 🛠 Technology Stack

### Frontend
- **React Native** - Cross-platform mobile development
- **React Navigation** - Navigation and routing
- **React Native Vector Icons** - Beautiful icons
- **React Native Async Storage** - Local data persistence
- **Socket.IO Client** - Real-time communication

### Backend
- **Bun Runtime** - Ultra-fast JavaScript runtime
- **Fastify** - High-performance web framework
- **MongoDB** - NoSQL database for flexible cricket data
- **Mongoose** - MongoDB object modeling
- **Socket.IO** - Real-time bidirectional communication
- **JWT** - Secure authentication
- **Bcrypt** - Password hashing

## 🚀 Quick Start

### Prerequisites
- [Bun](https://bun.sh) (v1.0.0 or higher)
- [MongoDB](https://www.mongodb.com/) (v5.0 or higher)
- [React Native CLI](https://reactnative.dev/docs/environment-setup)
- [Android Studio](https://developer.android.com/studio) or [Xcode](https://developer.apple.com/xcode/)

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/cricket-scoring-app.git
cd cricket-scoring-app
```

#### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies with Bun
bun install

# Copy environment variables
cp .env.example .env

# Edit the .env file with your configuration
nano .env
```

#### 3. Frontend Setup
```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install
# or
yarn install

# For iOS (macOS only)
cd ios && pod install && cd ..
```

#### 4. Database Setup
```bash
# Start MongoDB (if running locally)
mongod

# Create database and collections
# The app will automatically create collections on first run
```

## ⚙️ Configuration

### Environment Variables (.env)
```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/cricket_scoring_app
MONGODB_TEST_URI=mongodb://localhost:27017/cricket_scoring_test

# Authentication
JWT_SECRET=your_super_secure_jwt_secret_key_here
JWT_EXPIRES_IN=7d

# Real-time Configuration
SOCKET_IO_CORS_ORIGIN=http://localhost:3000

# File Upload Configuration
MAX_FILE_SIZE=5242880  # 5MB
UPLOAD_PATH=./uploads

# Rate Limiting
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW=900000  # 15 minutes

# Logging
LOG_LEVEL=info
LOG_FILE=./logs/app.log
```

### MongoDB Configuration
```javascript
// config/database.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};
```

## 🏃‍♂️ Running the Application

### Development Mode

#### Start Backend Server
```bash
cd backend
bun run dev
# Server runs on http://localhost:3000
```

#### Start React Native App
```bash
cd frontend

# For Android
npx react-native run-android

# For iOS (macOS only)
npx react-native run-ios

# Or start Metro bundler separately
npx react-native start
```

### Production Mode

#### Backend Deployment
```bash
cd backend

# Build the application
bun run build

# Start production server
bun run start
```

#### Frontend Build
```bash
cd frontend

# Build for Android
npx react-native run-android --variant=release

# Build for iOS
npx react-native run-ios --configuration=Release
```

## 📊 Database Schema

### Core Collections

#### Matches Collection
```javascript
{
  _id: ObjectId,
  matchNumber: String,
  teams: {
    team1: { teamId, name, shortName, playingXI },
    team2: { teamId, name, shortName, playingXI }
  },
  matchDetails: {
    date: Date,
    venue: String,
    matchType: "T20" | "ODI" | "Test",
    totalOvers: Number,
    status: "upcoming" | "live" | "completed"
  },
  innings: [{
    inningsNumber: Number,
    battingTeam: { teamId, name },
    bowlingTeam: { teamId, name },
    score: { runs, wickets, overs, balls, extras },
    ballByBall: [{ /* detailed ball data */ }]
  }],
  result: { winner, resultType, margin }
}
```

#### Teams Collection
```javascript
{
  _id: ObjectId,
  teamName: String,
  shortName: String,
  logoUrl: String,
  captain: { playerId, name },
  players: [{ playerId, name, role, battingStyle, bowlingStyle }],
  createdAt: Date
}
```

#### Players Collection
```javascript
{
  _id: ObjectId,
  name: String,
  teams: [ObjectId],
  role: "batsman" | "bowler" | "all-rounder" | "wicket-keeper",
  battingStyle: "right-hand" | "left-hand",
  bowlingStyle: String,
  careerStats: { matches, runs, wickets, catches }
}
```

## 🔌 API Documentation

### Authentication Endpoints
```
POST   /api/auth/register    - Register new user
POST   /api/auth/login       - User login
POST   /api/auth/refresh     - Refresh JWT token
POST   /api/auth/logout      - User logout
```

### Match Endpoints
```
GET    /api/matches          - Get all matches
POST   /api/matches          - Create new match
GET    /api/matches/:id      - Get specific match
PUT    /api/matches/:id      - Update match details
DELETE /api/matches/:id      - Delete match
POST   /api/matches/:id/score - Update ball-by-ball score
GET    /api/matches/:id/stats - Get match statistics
```

### Team Endpoints
```
GET    /api/teams            - Get all teams
POST   /api/teams            - Create new team
GET    /api/teams/:id        - Get specific team
PUT    /api/teams/:id        - Update team details
DELETE /api/teams/:id        - Delete team
GET    /api/teams/:id/players - Get team players
```

### Player Endpoints
```
GET    /api/players          - Get all players
POST   /api/players          - Create new player
GET    /api/players/:id      - Get specific player
PUT    /api/players/:id      - Update player details
DELETE /api/players/:id      - Delete player
GET    /api/players/:id/stats - Get player statistics
```

### Live Match Endpoints
```
GET    /api/live/matches     - Get live matches
GET    /api/live/match/:id   - Get live match state
WebSocket /ws               - Real-time match updates
```

## 🎮 Usage Examples

### Creating a New Match
```javascript
// API call to create match
const matchData = {
  teams: {
    team1: { teamId: "team1_id", playingXI: [...players] },
    team2: { teamId: "team2_id", playingXI: [...players] }
  },
  matchDetails: {
    date: new Date(),
    venue: "Stadium Name",
    matchType: "T20",
    totalOvers: 20
  },
  toss: {
    winner: "team1_id",
    decision: "bat"
  }
};

const response = await fetch('/api/matches', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(matchData)
});
```

### Scoring a Ball
```javascript
// Score update payload
const ballData = {
  over: 1,
  ballInOver: 1,
  bowler: { playerId: "bowler_id", name: "Bowler Name" },
  batsman: { playerId: "batsman_id", name: "Batsman Name" },
  nonStriker: { playerId: "nonstriker_id", name: "Non-striker Name" },
  delivery: {
    runs: 4,
    isBoundary: true,
    isWide: false,
    isNoBall: false
  },
  wicket: { isWicket: false },
  commentary: "Beautiful cover drive for four!"
};

// Send score update
await fetch(`/api/matches/${matchId}/score`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(ballData)
});
```

### Real-time Updates (WebSocket)
```javascript
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

// Join match room
socket.emit('join_match', { matchId: 'match_123' });

// Listen for score updates
socket.on('score_update', (data) => {
  console.log('New score:', data.currentScore);
  updateUI(data);
});

// Send score update
socket.emit('score_update', {
  matchId: 'match_123',
  ballData: { /* ball data */ }
});
```

## 🧪 Testing

### Backend Testing
```bash
cd backend

# Run all tests
bun test

# Run specific test file
bun test tests/matches.test.js

# Run tests with coverage
bun test --coverage

# Run integration tests
bun test:integration
```

### Frontend Testing
```bash
cd frontend

# Run Jest tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run E2E tests (if configured)
npm run test:e2e
```

### Sample Test Cases
```javascript
// tests/matches.test.js
describe('Match API', () => {
  test('should create a new match', async () => {
    const matchData = { /* test data */ };
    const response = await request(app)
      .post('/api/matches')
      .send(matchData)
      .expect(201);
    
    expect(response.body.success).toBe(true);
  });
  
  test('should update match score', async () => {
    const ballData = { /* ball data */ };
    const response = await request(app)
      .post(`/api/matches/${matchId}/score`)
      .send(ballData)
      .expect(200);
    
    expect(response.body.data.innings[0].score.runs).toBeGreaterThan(0);
  });
});
```

## 📱 React Native Components

### Key Components Structure
```
src/
├── components/
│   ├── Scoring/
│   │   ├── ScoreBoard.js
│   │   ├── BallInput.js
│   │   └── OverSummary.js
│   ├── Match/
│   │   ├── MatchCard.js
│   │   ├── MatchDetails.js
│   │   └── TeamSelector.js
│   └── Stats/
│       ├── PlayerStats.js
│       ├── MatchStats.js
│       └── Charts.js
├── screens/
│   ├── HomeScreen.js
│   ├── ScoringScreen.js
│   ├── MatchScreen.js
│   └── StatsScreen.js
├── services/
│   ├── api.js
│   ├── socket.js
│   └── storage.js
└── utils/
    ├── cricketUtils.js
    └── formatters.js
```

## 🚀 Deployment

### Backend Deployment (Digital Ocean/AWS/Railway)
```bash
# Using Docker
docker build -t cricket-scoring-backend .
docker run -p 3000:3000 cricket-scoring-backend

# Using PM2 with Bun
bun install -g pm2
pm2 start ecosystem.config.js
```

### Mobile App Deployment

#### Android Play Store
```bash
cd frontend/android
./gradlew bundleRelease
# Upload AAB file to Play Console
```

#### iOS App Store
```bash
cd frontend
npx react-native run-ios --configuration=Release
# Archive and upload via Xcode
```

### Database Deployment
```bash
# MongoDB Atlas (Cloud)
# Update MONGODB_URI in production environment

# Or self-hosted MongoDB
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

## 🔧 Performance Optimization

### Backend Optimizations
- **Bun Runtime**: 3x faster than Node.js
- **Database Indexing**: Optimized queries for real-time data
- **Connection Pooling**: Efficient MongoDB connections
- **Caching**: Redis for frequently accessed data
- **Rate Limiting**: Prevent API abuse

### Frontend Optimizations
- **React Native Performance**: Optimized FlatLists and animations
- **Image Optimization**: Compressed team logos and player photos
- **State Management**: Efficient Redux/Context usage
- **Bundle Size**: Code splitting and lazy loading

### Database Performance
```javascript
// Essential indexes for cricket data
db.matches.createIndex({ "teams.team1.teamId": 1, "teams.team2.teamId": 1 });
db.matches.createIndex({ "matchDetails.date": -1 });
db.matches.createIndex({ "matchDetails.status": 1 });
db.matches.createIndex({ "innings.ballByBall.batsman.playerId": 1 });
db.players.createIndex({ "name": "text" });
```

## 🛡️ Security

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (Admin, Scorer, Viewer)
- Password hashing with bcrypt
- Rate limiting on sensitive endpoints

### Data Protection
- Input validation and sanitization
- MongoDB injection prevention
- CORS configuration
- Secure headers with Helmet.js

### Privacy Considerations
- User data encryption
- GDPR compliance features
- Data retention policies
- Secure API communication (HTTPS)

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Make your changes
4. Add tests for new functionality
5. Run tests (`bun test`)
6. Commit changes (`git commit -am 'Add new feature'`)
7. Push to branch (`git push origin feature/new-feature`)
8. Create a Pull Request

### Code Style
- Use ESLint and Prettier for code formatting
- Follow React Native best practices
- Write descriptive commit messages
- Add JSDoc comments for functions

### Reporting Issues
- Use GitHub Issues for bug reports
- Include steps to reproduce
- Provide system information
- Add screenshots for UI issues

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Cricket scoring rules and formats
- Open source community
- React Native community
- MongoDB community
- Fastify contributors

## 📞 Support

### Documentation
- [API Documentation](./docs/api.md)
- [Database Schema](./docs/database.md)
- [Deployment Guide](./docs/deployment.md)

### Community
- [GitHub Discussions](https://github.com/yourusername/cricket-scoring-app/discussions)
- [Discord Server](https://discord.gg/cricket-scoring)
- [Stack Overflow Tag](https://stackoverflow.com/questions/tagged/cricket-scoring-app)

### Contact
- **Email**: support@cricketscoring.app
- **Twitter**: [@CricketScoringApp](https://twitter.com/CricketScoringApp)
- **Website**: [www.cricketscoring.app](https://www.cricketscoring.app)

---

## 🎯 Roadmap

### Version 2.0 (Upcoming)
- [ ] Tournament management system
- [ ] Advanced analytics dashboard  
- [ ] Video highlights integration
- [ ] Social media sharing
- [ ] Multi-language support

### Version 2.1
- [ ] AI-powered match predictions
- [ ] Voice commentary features
- [ ] Integration with cricket APIs
- [ ] Advanced statistics export
- [ ] Custom scoring formats

### Version 3.0 (Future)
- [ ] Live streaming integration
- [ ] Augmented reality features
- [ ] Machine learning insights
- [ ] Fantasy cricket integration
- [ ] Blockchain-based verification

---

**Happy Scoring! 🏏**

*Built with ❤️ for the cricket community*