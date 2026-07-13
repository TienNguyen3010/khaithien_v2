import sqlite3
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
MIGRATIONS = sorted((ROOT / "drizzle").glob("*.sql"))
SEED = ROOT / "db" / "seed.sql"


def main() -> None:
    migration_sql = "\n".join(
        migration.read_text(encoding="utf-8").replace(
            "--> statement-breakpoint", ""
        )
        for migration in MIGRATIONS
    )
    seed_sql = SEED.read_text(encoding="utf-8")

    database = sqlite3.connect(":memory:")
    database.execute("PRAGMA foreign_keys=ON")
    database.executescript(migration_sql)
    database.executescript(seed_sql)

    table_count = database.execute(
        """
        SELECT count(*)
        FROM sqlite_master
        WHERE type = 'table' AND name NOT LIKE 'sqlite_%'
        """
    ).fetchone()[0]
    service_count = database.execute("SELECT count(*) FROM services").fetchone()[0]
    setting_count = database.execute(
        "SELECT count(*) FROM site_settings"
    ).fetchone()[0]
    role_count = database.execute("SELECT count(*) FROM admin_roles").fetchone()[0]
    foreign_key_errors = database.execute("PRAGMA foreign_key_check").fetchall()

    lead_table_count = database.execute(
        "SELECT count(*) FROM sqlite_master WHERE type = 'table' AND name IN ('contacts', 'leads', 'project_briefs', 'consents', 'lead_activities', 'lead_attributions')"
    ).fetchone()[0]
    translation_table_count = database.execute(
        "SELECT count(*) FROM sqlite_master WHERE type = 'table' AND name IN ('page_translations', 'service_translations', 'project_translations')"
    ).fetchone()[0]

    assert table_count == 37, f"Expected 37 tables, found {table_count}"
    assert service_count == 4, f"Expected 4 services, found {service_count}"
    assert setting_count == 5, f"Expected 5 settings, found {setting_count}"
    assert role_count == 5, f"Expected 5 roles, found {role_count}"
    assert lead_table_count == 6, f"Expected canonical lead tables, found {lead_table_count}"
    assert translation_table_count == 3, f"Expected translation tables, found {translation_table_count}"
    assert not foreign_key_errors, foreign_key_errors

    print(
        f"TABLES={table_count} SERVICES={service_count} "
        f"SETTINGS={setting_count} ROLES={role_count} "
        f"FK_ERRORS={len(foreign_key_errors)}"
    )


if __name__ == "__main__":
    main()
