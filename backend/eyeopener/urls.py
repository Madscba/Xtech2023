from django.contrib import admin
from django.urls import path, include
from users.views import logout
from rest_framework_simplejwt import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('auth/user/login', views.TokenObtainPairView.as_view(), name ='token_obtain_pair'),
    path('auth/user/refresh', views.TokenRefreshView.as_view(), name ='token_refresh'),
    path('auth/user/logout', logout),
]
