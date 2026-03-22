# Results Framework

<VideoEmbed title="04 · Setting your impact statement" />

<VideoEmbed title="05 · Adding outcomes and outputs" />

<VideoEmbed title="06 · Linking indicators to your results chain" />

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
