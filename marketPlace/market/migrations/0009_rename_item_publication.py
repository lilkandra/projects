# Generated by Django 4.2 on 2023-04-26 21:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('market', '0008_remove_item_category_remove_item_location_and_more'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Item',
            new_name='Publication',
        ),
    ]