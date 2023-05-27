from django.contrib import admin
from .models import Profile, Item, Room, Message

# Register your models here.
admin.site.register(Profile)
admin.site.register(Item)
admin.site.register(Room)
admin.site.register(Message)