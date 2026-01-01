# PillarX Database Design

This directory contains the database design artifacts for the PillarX Dashboard system.

## Files

- `schema.sql`: Contains the full PostgreSQL DDL for creating the necessary tables (Users, Sessions, Activities, Projects, Components). 
- `app.db.placeholder`: A dummy file acting as a placeholder for a future SQLite database.

## How to use after export

1. **Renaming/Editing**: You can modify `schema.sql` to fit your specific database engine (MySQL, PostgreSQL, or SQLite).
2. **Execution**:
   - For **PostgreSQL**: `psql -U your_user -d your_db -f db/schema.sql`
   - For **SQLite**: `sqlite3 app.db < db/schema.sql`
3. **Integration**: Update the backend logic in `server.js` (or your chosen backend) to replace the in-memory mock data with real database queries using a library like `pg`, `mysql2`, or `sqlite3`.

## Notes
- AI Studio does not execute SQL files. The current application uses `localStorage` and React state for demonstration purposes within the browser.