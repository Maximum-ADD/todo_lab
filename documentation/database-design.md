# Database Design

## Rationale

Two tables instead of one: `topics` was split out from `tasks` so a topic name is
stored exactly once, referenced by id rather than repeated as a string on every task
row. This is a standard normalization move — without it, sorting/filtering by topic
would depend on exact string matches across every task ("Software Design" vs.
"software design" would silently become two different topics), and renaming a topic
would mean updating every task row instead of one.

Task columns map directly onto the brief's required fields (Title, Description, Due
Date, Topic) plus the fields needed to satisfy the brief's behavioural rules: `status`
is a fixed enum (not a fourth "overdue" state, per the brief), `archived_at` implements
archive-not-delete, and `created_at`/`updated_at` exist so persistence and "edit
survives reload" are independently verifiable rather than just claimed.

## Tables

### `tasks`

| Column        | Type      | Constraints                                                    | Notes |
|---------------|-----------|-----------------------------------------------------------------|-------|
| `id`          | INTEGER   | PRIMARY KEY AUTOINCREMENT                                        | |
| `title`       | TEXT      | NOT NULL                                                         | |
| `description` | TEXT      |                                                                   | Nullable — a task may have no description |
| `due_date`    | TEXT      | NOT NULL                                                         | ISO 8601 date string (`YYYY-MM-DD`), no time component — see note below |
| `topic_id`    | INTEGER   | NOT NULL, REFERENCES `topics(id)`                                | Foreign key. A task always has exactly one topic |
| `status`      | TEXT      | NOT NULL, DEFAULT `'Todo'`, CHECK (status IN ('Todo','In-Progress','Complete')) | Fixed enum, not user-customisable, per the brief |
| `archived_at` | TEXT      | NULL by default                                                  | NULL = active. Non-null timestamp = archived. Implements "archive, never delete" |
| `created_at`  | TEXT      | NOT NULL, DEFAULT `datetime('now')`                              | |
| `updated_at`  | TEXT      | NOT NULL, DEFAULT `datetime('now')`                              | Set on every edit; used to verify "edit survives reload" |

Indexed on `status`, `due_date`, and `topic_id`, matching the three ways the brief
requires the list to be sortable.

### `topics`

| Column | Type    | Constraints                | Notes |
|--------|---------|------------------------------|-------|
| `id`   | INTEGER | PRIMARY KEY AUTOINCREMENT    | |
| `name` | TEXT    | NOT NULL, UNIQUE              | The `UNIQUE` constraint is what makes "find or create" safe — inserting a duplicate name fails at the database level rather than relying on application code to catch it |

There's no separate topic-management screen. A topic comes into existence the first
time a task is created or edited with that name (`findOrCreateTopicId`), and is never
deleted — a topic can end up with zero tasks referencing it if all its tasks are
retitled to a different topic, and that's fine; it just stops appearing in sort output.

## Relationships

One topic can describe many tasks, or none. One task has exactly one topic
(`tasks.topic_id → topics.id`, one-to-many from `topics` to `tasks`). Deleting a topic
is not something the application does — there is no delete path for topics — so the
question of what happens to a task if its topic were removed doesn't arise in practice.

## Derived values (deliberately NOT stored)

Nothing in this section is a column. Each value below is computed at read time from
`due_date`, `status`, and `archived_at`, via a single shared helper
(`daysUntilDue()` in `src/lib/date.ts`) that both the overdue check and the due-flag
logic call — so there is exactly one implementation of "how many calendar days until
this is due," not two definitions that could quietly disagree with each other.

- **Overdue**: `due_date` is in the past (by calendar day, not exact timestamp) AND
  `status != 'Complete'` AND `archived_at IS NULL`.
- **Due today**: `due_date` is today's calendar date, and the task isn't archived or
  complete.
- **Due tomorrow**: `due_date` is exactly one calendar day from now.
- **Due in a week**: `due_date` is within the next 7 calendar days (and doesn't already
  match today/tomorrow).

Comparison is by calendar day rather than exact timestamp because `due_date` is
deliberately date-only (`<input type="date">`), not a timestamp — a task due "today"
doesn't become overdue at some specific hour, it becomes overdue the next calendar day.
This means the app can't currently express "overdue as of 2pm today"; that's an
accepted scope limitation, not an oversight, and would require storing time-of-day on
`due_date` to change.

## Example queries

```sql
-- Active tasks, sorted by due date, with topic name resolved
SELECT tasks.*, topics.name AS topic_name
FROM tasks
JOIN topics ON topics.id = tasks.topic_id
WHERE tasks.archived_at IS NULL
ORDER BY tasks.due_date ASC;

-- Archive a task (never DELETE)
UPDATE tasks SET archived_at = datetime('now') WHERE id = ?;
```

---
This document was reviewed and edited with the assistance of: Claude-Web[Claude Sonnet 5]