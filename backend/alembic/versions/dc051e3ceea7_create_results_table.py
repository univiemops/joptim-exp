"""create results table

Revision ID: dc051e3ceea7
Revises: 
Create Date: 2023-02-14 11:26:24.955058

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "dc051e3ceea7"
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "results",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("xid", sa.String),
        sa.Column("result", sa.JSON),
    )

    op.create_table(
        "notes",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("xid", sa.String, primary_key=True),
        sa.Column("text", sa.String),
        sa.Column("completed", sa.Boolean),
    )


def downgrade():
    op.drop_table("results")
    op.drop_table("notes")
