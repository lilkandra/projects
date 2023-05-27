from django import forms
from django.contrib.auth.forms import SetPasswordForm
from django.contrib.auth.models import User
from .models import Profile, Item


class UpdateUserForm(forms.ModelForm):
    username = forms.CharField(max_length=100, required=True, widget=forms.TextInput(attrs={'class': 'form-control'}))
    email = forms.EmailField(required=True, widget=forms.TextInput(attrs={'class': 'form-control'}))

    class Meta:
        model = User
        fields = ['username', 'email']


class UpdateProfileForm(forms.ModelForm):
    CHOICES = (
        ('', ''),
        ('Tunis', 'Tunis'),
        ('Ariana', 'Ariana'),
        ('Ben Arous', 'Ben Arous'),
        ('Manouba', 'Manouba'),
        ('Nabeul', 'Nabeul'),
        ('Zaghouan', 'Zaghouan'),
        ('Bizerte', 'Bizerte'),
        ('Beja', 'Beja'),
        ('Jendouba', 'Jendouba'),
        ('Kef', 'Kef'),
        ('Seliana', 'Seliana'),
        ('Sousse', 'Sousse'),
        ('Monastir', 'Monastir'),
        ('Mahdia', 'Mahdia'),
        ('Sfax', 'Sfax'),
        ('Kairouan', 'Kairouan'),
        ('Kasserine', 'Kasserine'),
        ('Sidi Bouzid', 'Sidi Bouzid'),
        ('Gabes', 'Gabes'),
        ('Mednine', 'Mednine'),
        ('Tataouine', 'Tataouine'),
        ('Gafsa', 'Gafsa'),
        ('Tozeur', 'Tozeur'),
        ('Kebili', 'Kebili')
    )
    photo = forms.ImageField(widget=forms.FileInput(attrs={'class': 'form-control'}))
    address = forms.ChoiceField(widget=forms.Select(attrs={'class': 'form-select'},), required=False, choices=CHOICES, initial='')
    phone_number = forms.CharField(required=False, widget=forms.TextInput(attrs={'class': 'form-control', 'type': 'number'}))

    class Meta:
        model = Profile
        fields = ['photo', 'address', 'phone_number']
    
class UpdateItemForm(forms.ModelForm):
    CHOICES = (
        ('', ''),
        ('Electronics', 'Electronics'),
        ('Clothing', 'Clothing'),
        ('Music', 'Music'),
        ('House', 'House'),
        ('Sport', 'Sport'),
        ('Other', 'Other')
    )
    CHOICES2 = (
        ('', ''),
        ('Tunis', 'Tunis'),
        ('Ariana', 'Ariana'),
        ('Ben Arous', 'Ben Arous'),
        ('Manouba', 'Manouba'),
        ('Nabeul', 'Nabeul'),
        ('Zaghouan', 'Zaghouan'),
        ('Bizerte', 'Bizerte'),
        ('Beja', 'Beja'),
        ('Jendouba', 'Jendouba'),
        ('Kef', 'Kef'),
        ('Seliana', 'Seliana'),
        ('Sousse', 'Sousse'),
        ('Monastir', 'Monastir'),
        ('Mahdia', 'Mahdia'),
        ('Sfax', 'Sfax'),
        ('Kairouan', 'Kairouan'),
        ('Kasserine', 'Kasserine'),
        ('Sidi Bouzid', 'Sidi Bouzid'),
        ('Gabes', 'Gabes'),
        ('Mednine', 'Mednine'),
        ('Tataouine', 'Tataouine'),
        ('Gafsa', 'Gafsa'),
        ('Tozeur', 'Tozeur'),
        ('Kebili', 'Kebili')
    )
    title = forms.CharField(required=True, widget=forms.TextInput(attrs={'class': 'form-control'}))
    description = forms.CharField(required=False, widget=forms.Textarea(attrs={'class': 'form-control'}))
    price = forms.CharField(required=True, widget=forms.TextInput(attrs={'class': 'form-control', 'type': 'number'}))
    photo = forms.ImageField(widget=forms.FileInput(attrs={'class': 'form-control'}))
    category = forms.ChoiceField(widget=forms.Select(attrs={'class': 'form-select'},), required=False, choices=CHOICES, initial='')
    location = forms.ChoiceField(widget=forms.Select(attrs={'class': 'form-select'},), required=False, choices=CHOICES2, initial='')
    class Meta:
        model = Item
        fields = ['title', 'description', 'price', 'photo', 'category', 'location']
