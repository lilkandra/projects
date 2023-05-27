# Generated by Django 4.2 on 2023-04-26 21:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('market', '0009_rename_item_publication'),
    ]

    operations = [
        migrations.CreateModel(
            name='Pub_photo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('photo', models.ImageField(default='pub_default-img.gif', upload_to='')),
            ],
        ),
        migrations.AddField(
            model_name='publication',
            name='photos',
            field=models.ManyToManyField(to='market.pub_photo'),
        ),
    ]
