"""create notes table

Revision ID: cf8324b0d50e
Revises: 
Create Date: 2023-02-13 10:33:30.529750

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'cf8324b0d50e'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
            "notes",
            sa.Column("id", sa.Integer, primary_key=True),
            sa.Column("text", sa.String),
            sa.Column("completed", sa.Boolean)
    )


def downgrade() -> None:
    op.drop_table("notes")
