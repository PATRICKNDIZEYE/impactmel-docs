# Results Framework

## Watch it done

<div class="video-track__grid">
  <VideoEmbed src="/videos/10-choose-framework-type.mp4" title="10 · Choose your framework structure" duration="30s" />
  <VideoEmbed src="/videos/11-build-results-chain.mp4" title="11 · Build your results chain from impact down" duration="65s" />
  <VideoEmbed src="/videos/12-drag-reorder-results.mp4" title="12 · Reorder results with drag and drop" duration="15s" />
  <VideoEmbed src="/videos/13-move-result-between-parents.mp4" title="13 · Move a result to a different parent" duration="21s" />
  <VideoEmbed src="/videos/14-link-indicators-to-results.mp4" title="14 · Link indicators to your results" duration="28s" />
  <VideoEmbed src="/videos/15-switch-framework-type.mp4" title="15 · Switch framework type without losing data" duration="23s" />
</div>

## Overview

The Results Framework is the logical backbone of ImpactMEL. It models the causal chain from field activities to long-term development impact using a tree of **Result Nodes**.

```
Impact
  └── Outcome 1
       ├── Output 1.1
       │    └── Activity A  (linked to Output)
       └── Output 1.2
            └── Activity B
```

Every indicator and activity can be linked to a node in this tree, giving you a complete picture of what is contributing to each result.

---

## Result Node Levels

| Level | Description | Example |
|---|---|---|
| **Impact** | Long-term change in people's lives | "Improved water security in rural Rwanda" |
| **Outcome** | Medium-term behavioral or institutional change | "Communities adopt safe hygiene practices" |
| **Output** | Direct deliverables from project activities | "500 households have access to clean water points" |

Activities are linked to Output nodes — they describe the work done to produce an output.

### Framework structures

Each project chooses one of three structures, stored as `framework_type` on the project. All three share the storage model above — the structure drives the vocabulary and nesting rules the builder enforces:

| Structure | Vocabulary | Nesting rules |
|---|---|---|
| `results_framework` | Impact / Outcome / Output | Single impact; outcomes under impact; outputs under outcomes |
| `logframe` | Goal / Purpose / Output | Single goal; purposes under goal; outputs under purposes |
| `theory_of_change` | Impact / Outcome / Output | Outcomes may nest under outcomes (intermediate outcomes) |

Switching structure only relabels — no data migration occurs. See the [user manual page](/user-manual/results-framework) for the builder walkthrough.

---

## Data Structure

```ts
ResultNode {
  id: uuid
  orgId: uuid
  programId: uuid
  parentId: uuid | null   // null for Impact nodes (roots)
  level: 'impact' | 'outcome' | 'output'
  title: string
  description: text
  orderIndex: number      // sort order within parent
}
```

---

## Building a Results Framework

### Via the UI

1. Navigate to **Results Framework** in the sidebar
2. Click **Add Impact** to create a root node
3. Click the **+** button on any node to add child outcomes/outputs
4. Drag nodes to reorder them
5. Click a node to edit its title and description

### Via the API

```http
POST /orgs/:orgId/programs/:programId/result-nodes
{
  "level": "outcome",
  "parentId": "impact-node-uuid",
  "title": "Communities adopt safe hygiene practices",
  "description": "..."
}
```

---

## Linking Indicators to Result Nodes

When creating or editing an indicator, set `resultNodeId` to pin it to an Output or Outcome:

```http
PATCH /orgs/:orgId/indicators/:id
{ "resultNodeId": "output-node-uuid" }
```

In reports, indicators are grouped by their result node, making it clear which outputs are on track.

---

## Linking Activities to Result Nodes

Activities are linked to Output nodes via `outputId`:

```http
POST /orgs/:orgId/projects/:projectId/activities
{
  "title": "Community training session",
  "outputId": "output-node-uuid",
  ...
}
```

---

## API Reference

| Method | Path | Description |
|---|---|---|
| GET | `/orgs/:orgId/programs/:programId/result-nodes` | List all nodes (tree) |
| POST | `/orgs/:orgId/programs/:programId/result-nodes` | Create a node |
| PATCH | `/orgs/:orgId/result-nodes/:id` | Update node |
| DELETE | `/orgs/:orgId/result-nodes/:id` | Delete node (cascades children) |
| PATCH | `/orgs/:orgId/result-nodes/reorder` | Bulk reorder nodes |
