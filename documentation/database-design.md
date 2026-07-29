# Database Design

> Fill in the "Rationale" lines yourself once the schema is final — the rubric rewards
> specific, accurate reasoning, not just a listed schema.

## Tables

### `tasks`

| Column        | Type      | Constraints                          | Notes |
|---------------|-----------|---------------------------------------|-------|
| `id`          | INTEGER   | PRIMARY KEY AUTOINCREMENT             | |
| `title`       | TEXT      | NOT NULL                              | |
| `description` | TEXT      |                                        | Nullable — a task may have no description |
| `due_date`    | TEXT      | NOT NULL                              | Stored as ISO 8601 string (SQLite has no native DATE type) |
| `topic`       | TEXT      | NOT NULL                              | Free text or FK to a `topics` table — decide and document which |
| `status`      | TEXT      | NOT NULL, CHECK (status IN ('Todo','In-Progress','Complete')) | Fixed enum, not user-customisable, per brief |
| `archived_at` | TEXT      | NULL by default                       | NULL = active. Non-null timestamp = archived. This is how "archive not delete" is implemented |
| `created_at`  | TEXT      | NOT NULL, DEFAULT CURRENT_TIMESTAMP   | |
| `updated_at`  | TEXT      | NOT NULL                              | Set on every edit, used to prove "edit survives reload" |

## Relationships

- [Describe here once decided: is `topic` a free-text column, or a foreign key to a
  separate `topics` table? Either is defensible — but the rubric explicitly penalizes
  modelling topic/status "inconsistently with the documented design," so whichever you
  pick, this doc and the schema must agree.]

## Derived values (deliberately NOT stored)

- **Overdue**: a task is overdue if `due_date < now()` AND `status != 'Complete'` AND
  `archived_at IS NULL`. This is computed at query/read time, never written to a column
  or treated as a fourth status — the brief is explicit that overdue is an indicator,
  not a status.

## Example queries

```sql
-- Active tasks, sorted by due date
SELECT * FROM tasks WHERE archived_at IS NULL ORDER BY due_date ASC;

-- Archive a task (never DELETE)
UPDATE tasks SET archived_at = CURRENT_TIMESTAMP WHERE id = ?;
```
This Markdown template was generated with Claude-Web(Sonnet-5)