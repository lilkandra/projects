from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.home, name='home'),
    path('login', views.login, name='login'),
    path('sign-up', views.signup, name='sign-up'),
    path('logout', views.log_out, name="logout"),
    path('help', views.help, name="help"),
    path('<str:profile>/', views.profile, name="profile"),
    path('<str:profile>/edit', views.edit, name="edit"),
    path('<str:profile>/change_password', views.change_password, name="change_password"),
    path('<str:profile>/items', views.items, name="items"),
    path('create_item', views.create_item, name="create_item"),
    path('item/<str:id>', views.item, name="item"),
    path('item/<str:id>/edit', views.edit_item, name="edit_item"),
    path('delete/<str:id>', views.delete_item, name="delete_item"),
    path('item/<str:id>/checkchat', views.checkchat, name="checkchat"),
    path('chat', views.chat, name="chat"),
    path('getmessages/<str:id>/', views.getmessages, name='getmessages'),
    path('send', views.send, name="send"),
    path('change_curr/<str:id>', views.change_curr, name="change_curr"),
    path('search', views.search, name="search"),

] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

handler404 = 'market.views.error404'