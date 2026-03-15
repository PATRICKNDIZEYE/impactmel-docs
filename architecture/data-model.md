# Data Model

## Entity Hierarchy

```
Organization
  └── Program (one org has many programs)
       ├── Donor (many-to-many via ProgramDonor)
       └── Project (one program has many projects)
            ├── ProjectIndicator (maps Indicator → Project)
            │    └── IndicatorReport (per period, per indicator, per project)
            ├── Activity (links to Output result node)
            │    └── ActivityParticipant → Participant
            │                              └── HouseholdMember
            ├── BudgetLine
            ├── ReportingPeriod (project-level periods)
            └── Report (assembled donor report)
                  └── ReportSection

ResultNode (tree)
  Impact → Outcome → Output → [Activity]

Indicator (definition)
  └── IndicatorDisaggregation
  └── IndicatorReport (values per period/project)

Form (data collection)
  └── FormField (with conditional logic)
  └── FormSubmission
       └── FormAnswer
```

---

## Core Tables

### organizations

| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| name | varchar | Display name |
| code | varchar | Short slug, unique |
| logo_url | varchar | Optional |
| created_at | timestamptz | |

### programs

| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| org_id | uuid | FK → organizations |
| name | varchar | |
| description | text | |
| start_date | date | |
| end_date | date | |
| status | enum | `active`, `completed`, `draft` |

### projects

| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| program_id | uuid | FK → programs |
| name | varchar | |
| budget | decimal | Total budget |
| currency | varchar | ISO 4217 |
| start_date | date | |
| end_date | date | |
| status | enum | `active`, `completed`, `draft`, `suspended` |

### indicators

| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| org_id | uuid | FK → organizations |
| name | varchar | |
| code | varchar | Short identifier |
| unit | varchar | e.g. `people`, `%`, `USD` |
| aggregation_method | enum | `sum`, `average`, `latest`, `min`, `max` |
| is_formula | boolean | Computed from other indicators |
| formula | text | Expression if is_formula = true |
| result_node_id | uuid | FK → result_nodes (optional) |

### indicator_reports

Actual values submitted per indicator, per project, per period.

| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| indicator_id | uuid | FK → indicators |
| project_id | uuid | FK → projects |
| reporting_period_id | uuid | FK → reporting_periods (nullable for custom) |
| value | decimal | Reported value |
| target | decimal | Period target |
| narrative | text | Qualitative notes |
| status | enum | `draft`, `submitted`, `approved`, `rejected` |
| submitted_by | uuid | FK → users |
| approved_by | uuid | FK → users |

### reporting_periods

| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| project_id | uuid | FK → projects |
| label | varchar | e.g. "Q1 2026" |
| start_date | date | |
| end_date | date | |
| is_locked | boolean | Prevents further edits |

### reports

Assembled donor reports.

| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| project_id | uuid | FK → projects |
| title | varchar | |
| report_type | enum | `quarterly`, `annual`, `ad_hoc` |
| start_date | date | Custom date range |
| end_date | date | |
| share_token | uuid | Nullable; set when shared |
| share_expires_at | timestamptz | Optional expiry |
| status | enum | `draft`, `published` |

### result_nodes

Implements the logical framework tree.

| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| org_id | uuid | FK → organizations |
| program_id | uuid | FK → programs |
| parent_id | uuid | FK → result_nodes (self-ref) |
| level | enum | `impact`, `outcome`, `output` |
| title | varchar | |
| description | text | |
| order_index | int | Sort order within parent |

---

## Key Relationships

```
Organization  1──N  Program
Program       1──N  Project
Program       N──M  Donor         (via program_donors)
Project       N──M  Indicator     (via project_indicators)
Indicator     1──N  IndicatorReport
Project       1──N  ReportingPeriod
Project       1──N  Activity
Activity      1──N  ActivityParticipant
Participant   1──N  HouseholdMember
Project       1──N  BudgetLine
Project       1──N  Report
Form          1──N  FormSubmission
FormSubmission N──1 IndicatorReport  (optional link)
```
