# Generated by Django 4.2 on 2023-04-26 18:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('market', '0004_item_category_item_location_alter_item_creator'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='category',
            field=models.CharField(max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='item',
            name='creator',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='item',
            name='location',
            field=models.CharField(max_length=30, null=True),
        ),
    ]
