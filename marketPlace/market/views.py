from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.models import User, auth
from django.contrib.auth import logout
from django.contrib import messages
from django.http import HttpResponse, JsonResponse
from .models import Profile, Item, Room, Message
from django.contrib.auth.decorators import login_required
from .forms import UpdateProfileForm, UpdateUserForm, UpdateItemForm
from django.core import serializers
from django.db.models import Max, Min
from decimal import Decimal as D

# Create your views here.
def home(request):
    items = Item.objects.all()
    return render(request, 'home.html', {"items": items})

def login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        
        user = auth.authenticate(username=username, password=password)

        if user is not None:
            auth.login(request, user)
            return redirect('/')
        else:
            messages.info(request, 'Credentials invalid')
            return redirect('login')
    else:
        return render(request, 'login.html')
def signup(request):
    if request.method == 'POST':
        email = request.POST['email']
        username = request.POST['username']
        password = request.POST['password']
        password2 = request.POST['password2']
        if password == password2 and len(password)>4:
            if User.objects.filter(email=email).exists():
                messages.info(request, 'email already exists!')
                return redirect('sign-up')
            elif len(email)==0 or len(username)==0:
                messages.info(request, 'all fields are obligatory!')
                return redirect('sign-up')
            elif User.objects.filter(username=username).exists():
                messages.info(request, 'username already exists!')
                return redirect('sign-up')
            else:
                user = User.objects.create_user(email=email, username=username, password=password)
                user.save()
                return redirect ('login')
        else:
            messages.info(request, 'password is not the same!')
            return redirect('sign-up')
    else:
        return render(request, 'signup.html')
    
def log_out(request):
    logout(request)
    return redirect('/')

def help(request):
    return render(request, 'help.html')

@login_required
def profile(request, profile):
    user = User.objects.get(username=profile)
    account = Profile.objects.get(user=user)
    return render(request, 'profile.html', {
        'account': account
    })

@login_required
def edit(request, profile):
    if request.method == 'POST':
        user_form = UpdateUserForm(request.POST, instance=request.user)
        profile_form = UpdateProfileForm(request.POST, request.FILES, instance=request.user.profile)

        if user_form.is_valid() and profile_form.is_valid():
            user_form.save()
            profile_form.save()
            messages.success(request, 'Your profile is updated successfully')
            return redirect('/')
        else:
            messages.error(request, 'Invalid informations')
            return redirect('edit')
    else:
        user_form = UpdateUserForm(instance=request.user)
        profile_form = UpdateProfileForm(instance=request.user.profile)

    return render(request, 'edit.html', {'user_form': user_form, 'profile_form': profile_form})

def change_password(request, profile):
    if request.method == 'POST':
        old_pwd = request.POST['old_password']
        new_pwd1 = request.POST['new_password1']
        new_pwd2 = request.POST['new_password2']
        user = auth.authenticate(username = profile, password = old_pwd)
        if user is not None:
            if new_pwd1 == new_pwd2:
                user.set_password(new_pwd1)
                user.save()
                messages.success(request, 'Password changed successfully')
                return redirect('/')
            else:
                messages.info(request, 'Password is not the same!')
                return redirect('/' + profile + '/change_password')
        else:
            messages.error(request, 'Wrong password!')
            return redirect('/' + profile + '/change_password')
    else:
        return render(request, 'change_password.html')

@login_required
def items(request, profile):
    user = get_object_or_404(User, username=profile)
    creator = get_object_or_404(Profile, user=user)
    if user == request.user:
        items = Item.objects.filter(creator=creator)
        return render(request, 'items.html', {'items': items})

@login_required
def create_item(request):
    user = request.user
    profile = get_object_or_404(Profile, user=user)
    if request.method == 'POST':
        title = request.POST['title']
        price = request.POST['price']
        description = request.POST['description']
        photo = request.FILES['photo']
        category = request.POST['category']
        location = request.POST['location']
        item = Item.objects.create(title=title, price=price, description=description, creator=profile, photo=photo, category=category, location=location)
        item.save()
        return redirect(profile.user.username + '/items')
    else:
        return render(request, 'create_item.html')

def item(request, id):
    item = get_object_or_404(Item, id=id)
    return render(request, 'item.html', {'item': item})

def edit_item(request, id):
    item = get_object_or_404(Item, id=id)
    if item.creator.user == request.user:
        if request.method == 'POST':
            form = UpdateItemForm(request.POST, request.FILES, instance=item)
            if form.is_valid():
                form.save()
                messages.success(request, 'Your item is modified successfully')
                return redirect('/item/' + id)
            else:
                messages.error(request, 'Please Enter a valid informations')
                return redirect('edit')
        else:
            form = UpdateItemForm(instance=item)
            return render(request, 'edit_item.html', {'form': form, 'item': item})
        
def delete_item(request, id):
    item = get_object_or_404(Item, id=id)
    if item.creator.user == request.user:
        item.delete()
        messages.info(request, 'Item deleted successfully')
        return redirect('/' + request.user.username + '/items')

@login_required
def checkchat(request, id):
    item = get_object_or_404(Item, id=id)
    buyer = request.user.profile
    seller = item.creator
    if Room.objects.filter(item=item, buyer=buyer, seller=seller).exists():
        request.session['current'] = Room.objects.get(item=item, buyer=buyer, seller=seller).id
        return redirect('/chat')
    else:
        new_room = Room.objects.create(item=item, buyer=buyer, seller=seller)
        new_room.save()
        request.session['current'] = new_room.id
        return redirect('/chat')
    
def chat(request):
    current = request.session.get('current')
    profile = request.user.profile
    rooms = Room.objects.filter(buyer=profile) | Room.objects.filter(seller=profile) 
    return render(request, 'chat2.html', {'rooms': rooms, 'current': current})

def getmessages(request, id):
    request.session['current'] = id
    room = get_object_or_404(Room, id=id)
    messages = Message.objects.filter(room=room)
    item_title = room.item.title
    if (room.buyer == request.user.profile):
        user_title = room.seller.user.username
    else:
        user_title = room.buyer.user.username
    return JsonResponse({"messages":list(messages.values()), "item": item_title, "user": user_title})

def send(request):
    message = request.POST['message']
    room = get_object_or_404(Room, id=request.session['current'])
    new_message = Message.objects.create(value=message, user=request.user.username, room=room)
    new_message.save()
    return HttpResponse('Message sent successfully')

def change_curr(request, id):
    request.session['current'] = id
    return redirect('chat')

def search(request):
    term = request.POST['search-term']
    category = request.POST['category']
    location = request.POST['location']
    price_min = request.POST['price-min']
    price_max = request.POST['price-max']
    if not price_min:
        price_min = 0
    if not price_max:
        price_max = Item.objects.aggregate(Max('price'))['price__max']
    items = Item.objects.filter(price__range=(price_min, price_max))
    if term:
        items = items.filter(title=term)
    if not category == 'All':
        items = items.filter(category=category)
    if not location == 'All':
        items = items.filter(location=location)
    return render(request, 'home.html', {"items": items, "price": price_max})

def error404(request, exeption):
    return render(request, '404.html')





