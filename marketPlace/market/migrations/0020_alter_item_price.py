# Generated by Django 4.2 on 2023-05-24 14:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('market', '0019_alter_item_price'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='price',
            field=models.PositiveIntegerField(),
        ),
    ]
