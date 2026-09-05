# HeatShield-AI
SIH 2026 PS26083
# 🌡️ HeatShield

### Extreme Heatwave Early Warning & Human Thermal Stress Platform

**A heatwave warning system that looks beyond temperature.**

> **40°C doesn't mean the same thing everywhere — or for everyone.**

HeatShield combines weather, humidity, wind, radiation, satellite data and population vulnerability to answer a more useful question:

### **"How dangerous is the heat for people in this area?"**

<p align="center">

<a href="#-how-it-works">
  <img src="https://img.shields.io/badge/How%20It%20Works-2ea44f?style=for-the-badge" />
</a>
<a href="#-features">
  <img src="https://img.shields.io/badge/Features-ff9800?style=for-the-badge" />
</a>
<a href="#-architecture">
  <img src="https://img.shields.io/badge/Architecture-6f42c1?style=for-the-badge" />
</a>
<a href="#-getting-started">
  <img src="https://img.shields.io/badge/Run%20Locally-0969da?style=for-the-badge" />
</a>

</p>

---

## 👀 Why did we build this?

Most heat alerts still revolve around one number:

**Temperature.**

But the human body doesn't experience temperature in isolation.

Consider:

```text
40°C + 20% humidity
        ↓
Hot and dry

40°C + 70% humidity
        ↓
Much harder for the body to cool itself
```

Now add:

* strong solar radiation
* low wind
* several consecutive hot days
* high night-time temperatures
* an elderly population
* outdoor workers
* densely populated neighborhoods

The risk changes significantly.

That's where HeatShield comes in.

---

# 🚨 What HeatShield does

HeatShield takes environmental data and turns it into a **human-centred heat risk score**.

```text
                    WEATHER DATA
                         │
          ┌──────────────┼──────────────┐
          ↓              ↓              ↓
     Temperature     Humidity         Wind
          │              │              │
          └──────────────┼──────────────┘
                         ↓
                  Solar Radiation
                         │
                         ↓
              ┌────────────────────┐
              │ Thermal Stress     │
              │ Engine             │
              │                    │
              │ WBGT / UTCI / HI   │
              └─────────┬──────────┘
                        ↓
               Human Thermal
                Stress Index
                        │
             ┌──────────┴──────────┐
             ↓                     ↓
      Population Data         Historical Data
             │                     │
             └──────────┬──────────┘
                        ↓
                AI / ML Models
                        ↓
          ┌─────────────┼─────────────┐
          ↓             ↓             ↓
       Heat Risk    Hospital Risk   Mortality Risk
          │             │             │
          └─────────────┼─────────────┘
                        ↓
                  GIS DASHBOARD
                        ↓
             🚨 ACTIONABLE ALERTS
```

---

# 🗺️ The main idea

Instead of giving a city one generic warning:

> 🔴 **Delhi: Extreme Heat**

HeatShield can show something closer to:

```text
┌─────────────────────────────────────────┐
│           CITY HEAT RISK                │
├─────────────┬─────────────┬─────────────┤
│   WARD 01   │   WARD 02   │   WARD 03   │
│     🟢      │     🟡      │     🟠      │
├─────────────┼─────────────┼─────────────┤
│   WARD 04   │   WARD 05   │   WARD 06   │
│     🟠      │     🔴      │     🔴      │
├─────────────┼─────────────┼─────────────┤
│   WARD 07   │   WARD 08   │   WARD 09   │
│     🟡      │     🟠      │     🟣      │
└─────────────┴─────────────┴─────────────┘
```

Click a ward → see **why it is risky**.

---

# 🎛️ Dashboard

The dashboard is designed around a simple principle:

### Don't make the user understand the data first.

### Make the data understandable immediately.

The main screen contains:

**🌡️ Current Conditions**

```text
Temperature       42.1°C
Humidity           68%
Wind               8 km/h
Solar Radiation   720 W/m²
```

**🔥 Thermal Stress**

```text
WBGT              34.8°C
UTCI              45.2°C
Heat Index        56.1°C

Overall Risk      🔴 EXTREME
```

**🏥 Health Impact**

```text
Hospital Risk     HIGH
Mortality Risk    VERY HIGH

High-risk wards   12
```

**⏱️ Forecast**

```text
Today       🔴
Tomorrow    🔴
+2 Days     🟠
+3 Days     🟠
+4 Days     🟡
```

---

# ✨ UI interactions

The frontend is designed to feel more like an actual monitoring product than a static dashboard.

### Ward hover

Hovering over a ward gives a quick summary:

```text
┌─────────────────────────────┐
│ Ward 05                     │
│                             │
│ Temperature       42.7°C    │
│ Humidity           71%      │
│ HTSI               89/100   │
│                             │
│ 🔴 EXTREME RISK             │
│                             │
│ Elderly density     HIGH    │
│ Outdoor exposure    HIGH    │
└─────────────────────────────┘
```

### Ward click

Clicking opens a detailed panel containing:

* Current weather
* 5-day forecast
* WBGT
* UTCI
* Heat Index
* Human Thermal Stress Index
* Vulnerability score
* Mortality risk
* Hospitalization risk
* Recommended actions

### Smooth transitions

The actual web application uses:

* map transitions
* animated risk changes
* expandable cards
* chart animations
* hover states
* loading skeletons
* alert animations
* smooth sidebar transitions

So the interface doesn't feel like a collection of disconnected charts.

---

# 🔥 Human Thermal Stress Index

We wanted one number that is easy to understand while still being backed by multiple environmental factors.

Our **HTSI** combines:

```text
Temperature
     +
Relative Humidity
     +
Wind
     +
Solar Radiation
     +
Night-time Heat
     +
Exposure Duration
```

into a normalized risk score.

```text
0          25          50          75         100
│-----------│-----------│-----------│-----------│
🟢           🟡          🟠          🔴          🟣
Low       Moderate      High      Very High    Extreme
```

The index is not intended to replace established thermal indices. Instead, it acts as a **decision layer** that combines environmental stress with local vulnerability.

---

# 🌡️ Thermal indices

HeatShield calculates three important metrics.

### WBGT

Useful for understanding **occupational heat stress**.

Especially relevant for:

* construction workers
* farmers
* delivery workers
* traffic police
* sanitation workers
* street vendors

### UTCI

Provides a broader estimate of human thermal stress using temperature, humidity, wind and radiant heat.

### Heat Index

Useful for communicating how hot the conditions may feel to people.

Using all three gives us a better picture than simply displaying the air temperature.

---

# 👥 Heat affects people differently

This is one of the most important parts of the project.

A heat map alone isn't enough.

We also map **who is likely to be more vulnerable**.

### Vulnerability layers

```text
👴 Elderly population
👶 Children & infants
👷 Outdoor workers
🏘️ Dense settlements
🌳 Low green-cover areas
🏙️ Urban heat islands
🏠 Limited cooling access
```

For example:

```text
Ward A

Temperature: 41.5°C
HTSI:        74

      vs.

Ward B

Temperature: 41.5°C
HTSI:        74
Elderly:     HIGH
Outdoor work: HIGH
Dense area:  HIGH

→ Ward B gets higher overall health priority.
```

Same temperature.

Different risk.

---

# 🌙 Don't ignore the night

One feature we particularly wanted to include was **night-time heat**.

A hot afternoon followed by a relatively cool night is very different from:

```text
Day       42°C
Night     34°C
Day       42°C
Night     34°C
Day       43°C
Night     35°C
```

When nights remain hot, people get less opportunity to recover.

HeatShield therefore tracks:

* minimum temperature
* consecutive hot nights
* night-time thermal stress
* cumulative heat exposure

---

# 🤖 3–5 Day Health Forecast

The interesting part isn't only knowing the current risk.

We want to know what's coming.

The prediction engine uses historical and forecast data to estimate:

### Heat risk

```text
Today       88 🔴
Tomorrow    91 🔴
Day 3       84 🔴
Day 4       71 🟠
Day 5       58 🟠
```

### Potential health-system pressure

```text
Hospital admissions     ↑
Emergency calls         ↑
Ambulance demand        ↑
Cooling requirements    ↑
```

This gives hospitals and city authorities time to prepare instead of reacting after the spike has already happened.

---

# 🧠 Explainable predictions

We don't want a model to simply say:

> **"Risk = 87."**

The dashboard should also explain:

```text
WHY IS THIS WARD EXTREME?

Temperature             ████████████████  31%
Humidity                ███████████       22%
Night-time heat         ███████           15%
Elderly population      ██████            12%
Outdoor exposure        █████             10%
Urban heat island       ████               6%
Historical impact       ██                 4%
```

This makes the system much more useful to an administrator who needs to decide **what to do next**.

---

# 🚨 From warning → action

This is where the project moves beyond being a dashboard.

Suppose the system detects:

```text
HTSI              91
Vulnerability     HIGH
Duration          3+ days
Hospital Risk     HIGH
```

The system can recommend:

```text
🚨 Activate Heat Action Plan

✓ Open cooling centres
✓ Increase drinking-water availability
✓ Shift outdoor work hours
✓ Alert vulnerable residents
✓ Prepare hospital beds
✓ Increase ambulance readiness
✓ Monitor power demand
```

The important idea is:

> **Risk should lead to action.**

---

# 📱 Alert example

A citizen shouldn't receive a complicated scientific report.

They might receive:

```text
🔴 EXTREME HEAT ALERT

Your area is expected to experience
dangerous heat conditions today.

Avoid strenuous outdoor activity during
peak afternoon hours.

Drink water regularly and check on
elderly family members.

Nearest cooling centre:
2.1 km away
```

Authorities get a much more detailed version containing the underlying metrics and recommended actions.

---

# 🏥 Hospital view

Hospitals can have a completely different dashboard.

```text
┌──────────────────────────────────────┐
│ HEALTH SYSTEM STATUS                 │
├──────────────────────────────────────┤
│                                      │
│ Expected ED Demand       ↑ 21%       │
│ Heat-related cases       ↑ 18%       │
│ Ambulance demand         ↑ 24%       │
│                                      │
│ High-risk wards          12          │
│                                      │
│ ⚠ Prepare additional capacity       │
└──────────────────────────────────────┘
```

The same underlying data can therefore serve completely different users.

---

# 🏛️ Government / Municipal View

The municipal dashboard focuses on decisions.

For example:

```text
TODAY'S PRIORITY AREAS

🔴 Ward 05
   Extreme heat + high vulnerability

🔴 Ward 06
   Extreme heat + high outdoor exposure

🟠 Ward 09
   Persistent night-time heat

ACTION STATUS

Cooling centres       7 / 10 opened
Water points          18 / 20 active
Hospital alerts       ✓ Sent
Worker advisory       ✓ Sent
Public SMS             ✓ Sent
```

This also gives authorities a way to track whether recommended actions were actually taken.

---

# 🛰️ Satellite + IoT

Weather stations don't exist on every street.

To improve spatial resolution, the system can combine:

```text
Weather Stations
       +
IoT Sensors
       +
Satellite Land Surface Temperature
       +
Spatial Interpolation
```

This helps identify urban heat pockets that can be missed by conventional station-based forecasts.

---

# 🏙️ Urban Heat Island Detection

Cities can trap heat because of:

* concrete
* asphalt
* buildings
* low vegetation
* limited airflow

Satellite-derived land surface temperature can help identify these areas.

Example:

```text
                 HOTTER
                   🔴
             ███████████
           ███████████████
          █████████████████
           ███████████████
             ███████████

             COOLER
          🌳 🌳 🌳 🌳 🌳
```

This information becomes another input to the vulnerability and exposure models.

---

# 🏗️ Architecture

```text
┌───────────────────────────────────────────────┐
│                 DATA SOURCES                  │
│                                               │
│ Weather │ Satellite │ IoT │ Health │ Census  │
└───────────────────────┬───────────────────────┘
                        ↓
┌───────────────────────────────────────────────┐
│              DATA INGESTION                   │
│        APIs • ETL • Validation • Storage      │
└───────────────────────┬───────────────────────┘
                        ↓
┌───────────────────────────────────────────────┐
│              PROCESSING LAYER                 │
│                                               │
│ WBGT │ UTCI │ HI │ HTSI │ GIS │ Features     │
└───────────────────────┬───────────────────────┘
                        ↓
┌───────────────────────────────────────────────┐
│                ML ENGINE                      │
│                                               │
│ Heat Forecast │ Mortality │ Hospital Demand  │
└───────────────────────┬───────────────────────┘
                        ↓
┌───────────────────────────────────────────────┐
│             DECISION ENGINE                   │
│                                               │
│ Risk → Alert → Recommended Action             │
└───────────────────────┬───────────────────────┘
                        ↓
        ┌───────────────┼────────────────┐
        ↓               ↓                ↓
     Dashboard        API          Alert System
        ↓               ↓          SMS / WhatsApp
   Authorities      Hospitals       Citizens
```

---

# 🛠️ Tech Stack

We're keeping the architecture practical and modular.

### Frontend

```text
React / Next.js
TypeScript
Tailwind CSS
Mapbox / Leaflet
Recharts / Plotly
```

### Backend

```text
Python
FastAPI
REST APIs
WebSockets
```

### Data / ML

```text
Python
NumPy
Pandas
GeoPandas
Scikit-learn
XGBoost / LightGBM
```

### GIS

```text
PostgreSQL
PostGIS
GeoServer
Mapbox / Leaflet
Raster processing
```

### Infrastructure

```text
Docker
Cloud deployment
Scheduled pipelines
API services
Monitoring
```

---

# 📂 Project Structure

```text
heatshield/
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── maps/
│   ├── charts/
│   └── animations/
│
├── backend/
│   ├── api/
│   ├── models/
│   ├── services/
│   └── database/
│
├── ml/
│   ├── preprocessing/
│   ├── thermal_indices/
│   ├── mortality/
│   ├── hospitalization/
│   └── forecasting/
│
├── gis/
│   ├── ward_data/
│   ├── satellite/
│   └── spatial_processing/
│
├── data/
│   ├── weather/
│   ├── demographics/
│   └── health/
│
├── docs/
│
└── README.md
```

---

# 🚀 Getting Started

Clone the repository:

```bash
git clone https://github.com/your-username/heatshield.git

cd heatshield
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

Start the backend:

```bash
uvicorn main:app --reload
```

The dashboard will then be available locally.

---

# 🔌 Example API

```http
GET /api/v1/wards/{ward_id}/risk
```

Example response:

```json
{
  "ward": "WARD_05",
  "temperature": 42.1,
  "humidity": 68,
  "wbgt": 34.8,
  "utci": 45.2,
  "htsi": 89,
  "heat_risk": "EXTREME",
  "mortality_risk": "VERY_HIGH",
  "hospitalization_risk": "HIGH",
  "forecast_days": 5
}
```

The API is designed so that municipal systems, hospital dashboards and mobile applications can consume the same risk information.

---

# 🎯 What we want to achieve

The long-term goal isn't to build another weather app.

It's to create a system where:

```text
Weather forecast
      ↓
Human thermal stress
      ↓
Local vulnerability
      ↓
Health impact prediction
      ↓
Early warning
      ↓
Real-world intervention
```

A city should be able to identify:

**Where is the danger?**

**Who is most vulnerable?**

**How severe could the health impact be?**

**What should we do before it happens?**

---

# 🏆 Why this project matters

Heatwaves are not just meteorological events.

They affect:

* public health
* hospitals
* emergency services
* electricity demand
* drinking-water demand
* outdoor workers
* elderly people
* children
* urban infrastructure

So the solution shouldn't live inside a weather dashboard either.

It needs to connect **weather + people + health + geography + action.**

That's what HeatShield is trying to build.

---

# 🔮 What's next?

Some features we're planning to push further:

* [ ] Live IoT sensor ingestion
* [ ] Satellite-based heat maps
* [ ] More accurate ward-level interpolation
* [ ] Mortality forecasting using historical health data
* [ ] Hospital admission forecasting
* [ ] Personalized heat-risk scores
* [ ] WhatsApp/SMS integration
* [ ] Cooling-centre routing
* [ ] Power-demand forecasting
* [ ] Automated heat-action-plan triggers
* [ ] Response tracking
* [ ] Multi-city deployment

---

# ❤️ The idea in one sentence

> **HeatShield turns weather data into human health intelligence — helping cities understand not just how hot it will be, but where the heat will hurt people most and what they can do before it happens.**

---

<p align="center">

### 🌡️ Predict the heat.

### 👥 Find the vulnerable.

### 🚨 Act before the impact.

**Built for a safer, more heat-resilient India.**
**Developed by NexAura**
</p>

---

<p align="center">
  <sub>HeatShield • Heat-Health Early Warning System</sub>
</p>
