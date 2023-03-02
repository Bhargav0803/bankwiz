# Generated by Django 4.1.7 on 2023-02-25 17:22

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Bank",
            fields=[
                ("bankid", models.AutoField(primary_key=True, serialize=False)),
                ("bankname", models.CharField(max_length=500)),
                ("location", models.CharField(blank=True, max_length=500, null=True)),
                ("pincode", models.IntegerField(blank=True, null=True)),
            ],
        ),
    ]
