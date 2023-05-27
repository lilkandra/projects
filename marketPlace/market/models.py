from django.db import models
from django.contrib.auth.models import User
from datetime import datetime

# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    photo = models.ImageField(default='default.jpg')
    address = models.CharField(max_length=500)
    phone_number = models.CharField(max_length=11)
    def __str__(self):
        return self.user.username
    
class Item(models.Model):
    title = models.CharField(max_length=20)
    price = models.PositiveIntegerField()
    description = models.CharField(max_length=1000)
    creator = models.ForeignKey(Profile, on_delete=models.CASCADE, unique=False)
    photo = models.ImageField(default='pub_default-img.gif')
    category = models.CharField(max_length=1000, default='')
    location = models.CharField(max_length=100, default='')
class Room(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    buyer = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='buyer')
    seller = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='seller')

class Message(models.Model):
    value = models.CharField(max_length=100000)
    user = models.CharField(max_length=1000, default='')
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    date = models.DateTimeField(default=datetime.now, blank=True)