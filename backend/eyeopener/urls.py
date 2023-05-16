from django.contrib import admin
from django.urls import path, include
from . import views
from rest_framework_simplejwt import views as jwt_views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('prediction/', include('prediction.urls')),
    path('users/', include('users.urls')),
    path('auth/user/login/', jwt_views.TokenObtainPairView.as_view(), name ='token_obtain_pair'),
    path('auth/user/refresh/', jwt_views.TokenRefreshView.as_view(), name ='token_refresh')
]
