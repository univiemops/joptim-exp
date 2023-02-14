"""create results table

Revision ID: dc051e3ceea7
Revises: cf8324b0d50e
Create Date: 2023-02-14 11:26:24.955058

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'dc051e3ceea7'
down_revision = 'cf8324b0d50e'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "results",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("result", sa.JSON),
    )


def downgrade():
    op.drop_table("results")
